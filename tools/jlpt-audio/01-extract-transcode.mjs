// Bước 1 của pipeline audio: giải nén RAR rồi hạ dung lượng MP3.
//
// Chạy:  node tools/jlpt-audio/01-extract-transcode.mjs [--force] [--only n3-2025-07]
//
// Đầu vào : data/N3_my_AI_generated_practice_exam/<thư mục có exam.json>/*.rar
// Đầu ra  : data/_audio_build/dist/<examId>.<hash8>.mp3   (mono 48 kbps, đã cân âm lượng)
//           data/_audio_build/build-report.json
//
// Vì sao mono 48 kbps: nội dung là hội thoại một kênh, không có nhạc. Nghe thử ở mức này
// không phân biệt được với bản gốc, nhưng file nhỏ đi ~63% — quan trọng vì audio phải
// nằm trong Cache Storage để chạy offline, và quota đó rất dễ bị trình duyệt thu hồi.
//
// Vì sao có loudnorm: 12 đề đến từ nhiều nguồn số hoá khác nhau nên âm lượng chênh nhau.
// Người học chỉnh volume một lần rồi làm liên tiếp nhiều đề, không nên phải chỉnh lại.

import fs from 'node:fs';
import path from 'node:path';
import {
  BUILD_ROOT, ffprobeJson, findUnrar, hhmmss, listReadyExams, mb,
  requireTool, run, runFfmpeg, sha256Short,
} from './lib.mjs';

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : null;

requireTool('ffmpeg');
requireTool('ffprobe');

const rawDir = path.join(BUILD_ROOT, 'raw');
const distDir = path.join(BUILD_ROOT, 'dist');
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

const exams = listReadyExams().filter((e) => !only || e.examId === only);
if (exams.length === 0) {
  console.error(only ? `Không có đề nào khớp --only ${only}` : 'Không tìm thấy đề nào có exam.json');
  process.exit(1);
}

console.log(`Xử lý ${exams.length} đề đã extract.\n`);

const report = [];
let totalIn = 0;
let totalOut = 0;

for (const exam of exams) {
  process.stdout.write(`${exam.examId}  `);

  // Nguồn ưu tiên: MP3 đã giải nén sẵn trong thư mục đề (3 đề đang ở trạng thái này).
  // Không có thì mới bung RAR ra thư mục làm việc, để không rải file vào thư mục đề gốc.
  let source = exam.mp3 ? path.join(exam.dir, exam.mp3) : null;

  if (!source) {
    if (!exam.rar) {
      console.log('BỎ QUA — không có .rar lẫn .mp3');
      report.push({ examId: exam.examId, status: 'no-audio-source' });
      continue;
    }
    const examRawDir = path.join(rawDir, exam.examId);
    fs.mkdirSync(examRawDir, { recursive: true });

    const existing = fs.readdirSync(examRawDir).find((f) => f.toLowerCase().endsWith('.mp3'));
    if (existing && !force) {
      source = path.join(examRawDir, existing);
    } else {
      const { exe, kind } = findUnrar();
      const rarPath = path.join(exam.dir, exam.rar);
      // Cả UnRAR lẫn 7z đều nhận đường dẫn có dấu cách và ký tự tiếng Việt khi truyền
      // qua mảng đối số (không đi qua shell), nên không cần quote thủ công.
      const argv = kind === '7z'
        ? ['e', '-y', `-o${examRawDir}`, rarPath, '*.mp3', '-r']
        : ['e', '-y', rarPath, '*.mp3', `${examRawDir}${path.sep}`];
      run(exe, argv);
      const found = fs.readdirSync(examRawDir).find((f) => f.toLowerCase().endsWith('.mp3'));
      if (!found) {
        console.log('LỖI — bung RAR xong không thấy .mp3');
        report.push({ examId: exam.examId, status: 'no-mp3-in-rar' });
        continue;
      }
      source = path.join(examRawDir, found);
    }
  }

  const probeIn = ffprobeJson(source);
  const durationSec = Number(probeIn.format.duration);
  const bytesIn = Number(probeIn.format.size);

  // Đặt tên tạm rồi mới đổi theo hash: hash phải tính trên nội dung ĐÃ nén,
  // vì đó mới là thứ được tải về và cache. Tên có hash cho phép cache vĩnh viễn
  // (immutable) và tự vô hiệu khi ta encode lại.
  const tmpOut = path.join(distDir, `${exam.examId}.tmp.mp3`);
  runFfmpeg('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-i', source,
    '-vn',                                        // bỏ ảnh bìa nếu file có nhúng
    '-ac', '1',                                   // hội thoại: stereo không mang thêm thông tin
    '-ar', '32000',                               // 32 kHz đủ cho giọng nói, để lame dồn bit vào dải thoại
    '-b:a', '48k',
    '-codec:a', 'libmp3lame',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
    '-map_metadata', '-1',                        // xoá tag nguồn, tránh rò tên file gốc ra client
    tmpOut,
  ]);

  const hash = sha256Short(tmpOut);
  const finalName = `${exam.examId}.${hash}.mp3`;
  const finalPath = path.join(distDir, finalName);

  // Dọn bản encode cũ của cùng đề (hash khác) để thư mục dist luôn đúng một file mỗi đề.
  for (const f of fs.readdirSync(distDir)) {
    // Chừa file tạm ra: nó cũng khớp tiền tố + đuôi .mp3 và chính là bản sắp được đổi tên.
    if (f.startsWith(`${exam.examId}.`) && f !== finalName && f !== path.basename(tmpOut) && f.endsWith('.mp3')) {
      fs.rmSync(path.join(distDir, f));
    }
  }
  fs.renameSync(tmpOut, finalPath);

  const bytesOut = fs.statSync(finalPath).size;
  totalIn += bytesIn;
  totalOut += bytesOut;

  const saved = ((1 - bytesOut / bytesIn) * 100).toFixed(0);
  console.log(
    `${hhmmss(durationSec)}  ${mb(bytesIn)} → ${mb(bytesOut)}  (-${saved}%)  ${finalName}`,
  );

  report.push({
    examId: exam.examId,
    title: exam.title,
    file: finalName,
    hash,
    durationSec: Number(durationSec.toFixed(3)),
    bytes: bytesOut,
    bytesOriginal: bytesIn,
    choukaiCount: exam.choukaiCount,
    status: 'ok',
  });
}

fs.writeFileSync(
  path.join(BUILD_ROOT, 'build-report.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), exams: report }, null, 2)}\n`,
);

const ok = report.filter((r) => r.status === 'ok');
console.log(
  `\n${ok.length}/${exams.length} đề xong.  ${mb(totalIn)} → ${mb(totalOut)}` +
    (totalIn ? `  (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)` : ''),
);
console.log(`Output: ${distDir}`);
