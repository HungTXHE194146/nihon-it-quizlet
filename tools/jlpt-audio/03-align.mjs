// Bước 3 của pipeline audio: khớp kết quả nhận dạng (bước 2) với transcript chuẩn trong exam.json
// để có mốc thời gian từng câu và từng dòng thoại, rồi xuất ra file đề nhập được vào app.
//
// Chạy:  node tools/jlpt-audio/03-align.mjs [--only n3-2025-07]
//
// Đầu vào : data/N3_my_AI_generated_practice_exam/<đề>/exam.json
//           data/_audio_build/asr/<examId>.json          (bước 2)
//           data/_audio_build/dist/<examId>.<hash>.mp3   (bước 1)
// Đầu ra  : data/_audio_build/exams/<examId>.json        (JlptImportFile có audio — nhập qua #/jlpt/import)
//           data/_audio_build/align-report.json
//
// Cách khớp: với từng câu theo đúng thứ tự trong băng, tìm đoạn chữ nhận dạng giống transcript
// của câu đó nhất (fitting alignment — cả transcript phải khớp, còn chuỗi nhận dạng được bỏ qua
// đầu/cuối tuỳ ý), bắt đầu từ chỗ câu trước kết thúc. Chữ Whisper nghe sai vài chỗ chỉ làm giảm
// điểm khớp chứ không làm lệch mốc, vì mốc lấy từ những ký tự khớp được xung quanh.

import fs from 'node:fs';
import path from 'node:path';
import { BUILD_ROOT, listReadyExams } from './lib.mjs';

const args = process.argv.slice(2);
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : null;

const CHOUKAI = new Set(['kadai_rikai', 'point_rikai', 'gaiyou_rikai', 'hatsuwa_hyougen', 'sokuji_outou']);
/** Dưới mức này thì báo "nên nghe soát" — cùng ngưỡng với LOW_ALIGN_CONFIDENCE ở src/lib/jlpt/validate.ts. */
const LOW_CONFIDENCE = 0.6;

// ─── Chuẩn hoá chữ để so khớp ─────────────────────────────────────────

/** Katakana → hiragana, bỏ dấu câu/khoảng trắng, NFKC (số và chữ La-tinh full-width → ASCII). */
function normChar(ch) {
  const c = ch.normalize('NFKC');
  if (/[\s、。，．,.!?！？「」『』（）()【】…・:：;；~〜ー―-]/.test(c)) return '';
  const code = c.charCodeAt(0);
  if (code >= 0x30a1 && code <= 0x30f6) return String.fromCharCode(code - 0x60);
  return c.toLowerCase();
}

/** Chuẩn hoá cả chuỗi, kèm vị trí ký tự gốc của từng ký tự sau chuẩn hoá. */
function normWithMap(text) {
  let out = '';
  const map = [];
  for (let i = 0; i < text.length; i += 1) {
    const n = normChar(text[i]);
    for (const ch of n) {
      out += ch;
      map.push(i);
    }
  }
  return { text: out, map };
}

/** "男：お疲れ様です。" → "お疲れ様です。" — tên người nói không được đọc lên trong băng. */
function stripSpeaker(line) {
  return line.replace(/^\s*[^：:\s]{1,6}[：:]\s*/, '');
}

// ─── Fitting alignment ────────────────────────────────────────────────

const MATCH = 2;
const MISMATCH = -1;
const GAP_REF = -2; // ký tự transcript không có trong chữ nhận dạng (Whisper nghe sót)
const GAP_HYP = -1; // ký tự nhận dạng thừa giữa chừng (tiếng "N番", câu hỏi đọc lặp…)

/**
 * Khớp TOÀN BỘ `ref` vào một đoạn con của `hyp[from, to)`.
 * Trả về vị trí trong `hyp` cho từng ký tự của `ref` (-1 = không khớp) và điểm chuẩn hoá 0..1.
 */
function fitAlign(ref, hyp, from, to) {
  const n = ref.length;
  const m = to - from;
  const W = m + 1;
  const tb = new Uint8Array((n + 1) * W); // 1 = chéo, 2 = lên (bỏ ký tự ref), 3 = trái (bỏ ký tự hyp)
  let prev = new Float32Array(W); // hàng 0 toàn 0: được bắt đầu ở bất kỳ đâu trong hyp
  let cur = new Float32Array(W);

  for (let i = 1; i <= n; i += 1) {
    cur[0] = prev[0] + GAP_REF;
    tb[i * W] = 2;
    const rc = ref.charCodeAt(i - 1);
    for (let j = 1; j <= m; j += 1) {
      const diag = prev[j - 1] + (rc === hyp.charCodeAt(from + j - 1) ? MATCH : MISMATCH);
      const up = prev[j] + GAP_REF;
      const left = cur[j - 1] + GAP_HYP;
      if (diag >= up && diag >= left) {
        cur[j] = diag;
        tb[i * W + j] = 1;
      } else if (up >= left) {
        cur[j] = up;
        tb[i * W + j] = 2;
      } else {
        cur[j] = left;
        tb[i * W + j] = 3;
      }
    }
    [prev, cur] = [cur, prev];
  }

  // Được kết thúc ở bất kỳ đâu trong hyp.
  let bestJ = 0;
  for (let j = 1; j <= m; j += 1) if (prev[j] > prev[bestJ]) bestJ = j;

  const pos = new Int32Array(n).fill(-1);
  let matches = 0;
  let i = n;
  let j = bestJ;
  while (i > 0) {
    const t = tb[i * W + j];
    if (t === 1) {
      if (ref.charCodeAt(i - 1) === hyp.charCodeAt(from + j - 1)) {
        pos[i - 1] = from + j - 1;
        matches += 1;
      }
      i -= 1;
      j -= 1;
    } else if (t === 2) {
      i -= 1;
    } else {
      j -= 1;
    }
  }
  return { pos, score: n > 0 ? prev[bestJ] / (MATCH * n) : 0, matchRatio: n > 0 ? matches / n : 0 };
}

// ─── Chuỗi nhận dạng có mốc thời gian từng ký tự ─────────────────────

function buildHyp(asr) {
  let text = '';
  const tStart = [];
  const tEnd = [];
  const wordStarts = [];
  for (const seg of asr.segments) {
    for (const w of seg.words) {
      const n = normWithMap(w.word).text;
      if (!n) continue;
      wordStarts.push({ at: text.length, start: w.start, end: w.end, word: w.word });
      for (let k = 0; k < n.length; k += 1) {
        const a = w.start + ((w.end - w.start) * k) / n.length;
        const b = w.start + ((w.end - w.start) * (k + 1)) / n.length;
        text += n[k];
        tStart.push(a);
        tEnd.push(b);
      }
    }
  }
  return { text, tStart, tEnd, words: wordStarts };
}

// ─── Dựng chuỗi tham chiếu cho một câu ───────────────────────────────

/**
 * Các "dòng" được đọc trong băng cho một câu, theo đúng thứ tự đọc. Dòng thật (có trong
 * transcript, sẽ được hiện cho người học) mang `lineIndex`; dòng phụ (câu hỏi đọc lặp lại, lựa
 * chọn đọc to) chỉ để khớp mốc cho chuẩn, `lineIndex = -1`.
 */
function spokenLines(q, transcriptLines) {
  const real = transcriptLines.map((text, lineIndex) => ({ text: stripSpeaker(text), lineIndex }));
  const has = (s) => normWithMap(transcriptLines.join('')).text.includes(normWithMap(s).text);
  const extra = (text) => ({ text, lineIndex: -1 });

  if ((q.mondai === 'kadai_rikai' || q.mondai === 'point_rikai') && q.stem && !has(q.stem)) {
    // Băng đọc: tình huống → câu hỏi → hội thoại → câu hỏi lần nữa.
    return [...real.slice(0, 1), extra(q.stem), ...real.slice(1), extra(q.stem)];
  }
  const out = [...real];
  if (q.stem && !has(q.stem)) out.unshift(extra(q.stem));
  for (const c of q.choices) if (c.text && !has(c.text)) out.push(extra(c.text));
  return out;
}

function answerSpan(q) {
  const transcript = q.transcript ?? '';
  const note = q.choices[q.answerIndex]?.note ?? '';
  const quotes = [...note.matchAll(/[（(「]([^）)」]*[぀-ヿ一-鿿][^）)」]*)[）)」]/g)].map((m) => stripSpeaker(m[1]));
  const normT = normWithMap(transcript);
  for (const quote of quotes.sort((a, b) => b.length - a.length)) {
    const direct = transcript.indexOf(quote);
    if (quote.length >= 3 && direct >= 0) return [direct, direct + quote.length];
    const nq = normWithMap(quote).text;
    if (nq.length < 3) continue;
    const at = normT.text.indexOf(nq);
    if (at >= 0) return [normT.map[at], normT.map[at + nq.length - 1] + 1];
  }
  return undefined;
}

const round = (x) => Math.round(x * 100) / 100;

// ─── Chạy ─────────────────────────────────────────────────────────────

const exams = listReadyExams().filter((e) => !only || e.examId === only);
const outDir = path.join(BUILD_ROOT, 'exams');
fs.mkdirSync(outDir, { recursive: true });
const report = [];

for (const exam of exams) {
  const asrPath = path.join(BUILD_ROOT, 'asr', `${exam.examId}.json`);
  if (!fs.existsSync(asrPath)) {
    console.log(`${exam.examId}  BỎ QUA — chưa có kết quả nhận dạng (bước 2)`);
    continue;
  }
  const asr = JSON.parse(fs.readFileSync(asrPath, 'utf8'));
  const audioPath = path.join(BUILD_ROOT, 'dist', asr.audioFile);
  if (!fs.existsSync(audioPath)) {
    console.log(`${exam.examId}  BỎ QUA — không thấy ${asr.audioFile} (bước 1 đã encode lại?)`);
    continue;
  }

  const file = JSON.parse(fs.readFileSync(path.join(exam.dir, 'exam.json'), 'utf8'));
  const byId = new Map(file.questions.map((q) => [q.id, q]));
  const ordered = file.groups
    .filter((g) => CHOUKAI.has(g.mondai))
    .flatMap((g) => g.questionIds)
    .map((id) => byId.get(id))
    .filter(Boolean);

  const hyp = buildHyp(asr);
  const trackId = exam.examId;
  let cursor = 0;
  const aligned = [];
  const synthesized = [];

  for (const q of ordered) {
    // 即時応答/発話表現 thiếu transcript (vd. đề 7/2010): dựng lại từ câu nói + các lựa chọn —
    // đúng định dạng transcript của các đề khác — và ghi vào báo cáo để người soát biết.
    if (!q.transcript?.trim() && (q.mondai === 'sokuji_outou' || q.mondai === 'hatsuwa_hyougen') && q.stem) {
      q.transcript = [q.stem, ...q.choices.map((c, i) => `${i + 1} ${c.text}`)].join('\n');
      synthesized.push(q.id);
    }
    const transcriptLines = (q.transcript ?? '').split('\n');
    const lines = spokenLines(q, q.transcript ? transcriptLines : []);

    let ref = '';
    const refLine = [];
    lines.forEach((l, k) => {
      const n = normWithMap(l.text).text;
      ref += n;
      for (let c = 0; c < n.length; c += 1) refLine.push(k);
    });
    if (!ref) {
      aligned.push({ q, ok: false });
      continue;
    }

    const windowEnd = Math.min(hyp.text.length, cursor + ref.length * 4 + 4000);
    const { pos, score, matchRatio } = fitAlign(ref, hyp.text, cursor, windowEnd);
    const hits = [...pos].filter((p) => p >= 0);
    if (hits.length === 0) {
      aligned.push({ q, ok: false });
      continue;
    }
    const first = Math.min(...hits);
    const last = Math.max(...hits);
    cursor = last + 1;

    const lineTimes = transcriptLines.map(() => null);
    lines.forEach((l, k) => {
      if (l.lineIndex < 0) return;
      const idx = [];
      refLine.forEach((lineK, c) => lineK === k && pos[c] >= 0 && idx.push(pos[c]));
      const total = refLine.filter((lineK) => lineK === k).length;
      // Dòng khớp được quá ít ký tự thì mốc không đáng tin — để null, giao diện sẽ không cho bấm nhảy.
      if (idx.length === 0 || idx.length < total * 0.3) return;
      lineTimes[l.lineIndex] = {
        start: round(Math.max(0, hyp.tStart[Math.min(...idx)] - 0.15)),
        end: round(hyp.tEnd[Math.max(...idx)] + 0.35),
      };
    });

    // Lùi về tiếng "N番" ngay trước câu (trong vòng 6 giây) để câu bắt đầu đúng lúc băng gọi số.
    const firstTime = hyp.tStart[first];
    const bangWord = [...hyp.words]
      .reverse()
      .find((w) => w.at < first && w.start >= firstTime - 6 && /番|ばん/.test(w.word));

    aligned.push({
      q,
      ok: true,
      confidence: round(Math.max(0, Math.min(1, (score + matchRatio) / 2))),
      firstTime,
      lastTime: hyp.tEnd[last],
      numberCallTime: bangWord ? bangWord.start : null,
      lineTimes,
      lastHypIndex: last,
    });
  }

  // Chốt ranh giới: start / speechEnd / end.
  const results = [];
  aligned.forEach((a, k) => {
    if (!a.ok) {
      results.push({ id: a.q.id, status: 'unaligned' });
      return;
    }
    const prev = aligned.slice(0, k).reverse().find((x) => x.ok);
    const next = aligned.slice(k + 1).find((x) => x.ok);
    const prevSpeechEnd = prev ? prev.lastTime + 0.6 : 0;
    const start = round(Math.max(prevSpeechEnd, a.numberCallTime !== null ? a.numberCallTime - 0.3 : a.firstTime - 1.5));
    const speechEnd = round(a.lastTime + 0.6);
    // Hết khoảng lặng chọn đáp án = lúc băng bắt đầu nói tiếp (lời hướng dẫn nhóm sau, hoặc câu sau).
    const nextOnset = hyp.words.find((w) => w.at > a.lastHypIndex)?.start ?? asr.durationSec;
    const nextStart = next ? Math.max(next.numberCallTime !== null ? next.numberCallTime - 0.3 : next.firstTime - 1.5, speechEnd) : asr.durationSec;
    const end = round(Math.max(speechEnd, Math.min(nextOnset - 0.1, nextStart, asr.durationSec)));

    a.q.audioId = trackId;
    a.q.audioSegment = { start, speechEnd, end, lines: a.lineTimes, confidence: a.confidence };
    const span = answerSpan(a.q);
    if (span) a.q.transcriptAnswerSpan = span;
    results.push({
      id: a.q.id,
      status: a.confidence < LOW_CONFIDENCE ? 'low' : 'ok',
      confidence: a.confidence,
      start,
      speechEnd,
      end,
      linesTimed: a.lineTimes.filter(Boolean).length,
      lines: a.lineTimes.length,
      answerSpan: !!span,
    });
  });

  file.exam.audio = [
    {
      id: trackId,
      key: `choukai/${asr.audioFile}`,
      durationSec: round(asr.durationSec),
      bytes: fs.statSync(audioPath).size,
    },
  ];
  fs.writeFileSync(path.join(outDir, `${exam.examId}.json`), `${JSON.stringify(file, null, 2)}\n`);

  const ok = results.filter((r) => r.status === 'ok').length;
  const low = results.filter((r) => r.status === 'low');
  const unaligned = results.filter((r) => r.status === 'unaligned');
  const spans = results.filter((r) => r.answerSpan).length;
  console.log(
    `${exam.examId}  khớp tốt ${ok}/${results.length}` +
      (low.length ? `  · nên soát: ${low.map((r) => `${r.id.split('-').pop()}(${r.confidence})`).join(' ')}` : '') +
      (unaligned.length ? `  · KHÔNG khớp: ${unaligned.map((r) => r.id).join(' ')}` : '') +
      `  · tô đáp án ${spans}/${results.length}` +
      (synthesized.length ? `  · dựng transcript: ${synthesized.length}` : '')
  );
  report.push({ examId: exam.examId, audioFile: asr.audioFile, synthesizedTranscripts: synthesized, questions: results });
}

fs.writeFileSync(
  path.join(BUILD_ROOT, 'align-report.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), exams: report }, null, 2)}\n`
);
console.log(`\nĐề đã gắn audio: ${outDir}`);
