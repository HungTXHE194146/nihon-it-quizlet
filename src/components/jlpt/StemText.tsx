import React from 'react';

interface FuriganaEntry {
  text: string;
  reading: string;
}

interface Segment {
  text: string;
  reading?: string;
  underline: boolean;
}

/**
 * Cắt `stem` thành các đoạn liên tiếp, mỗi đoạn biết mình có furigana (đọc trên `<ruby>`)
 * và/hoặc có bị gạch chân hay không — để một chữ Hán vừa có furigana vừa nằm trong đoạn gạch
 * chân (câu 言い換え/用法) vẫn hiện đúng cả hai, không cái nào đè mất cái kia.
 *
 * `furigana[].text` là NGUYÊN VĂN đoạn chữ Hán trong `stem` (không phải chỉ số vị trí), nên
 * phải tự dò vị trí bằng `indexOf` — khớp MỌI lần xuất hiện của cùng một từ trong câu (một từ
 * lặp lại thì đọc lại vẫn là cách đọc đó), và bỏ qua nếu trùng vùng đã có furigana khác nhận
 * trước đó (đề lỗi hiếm gặp: hai mục furigana cùng trỏ vào một vùng ký tự).
 */
function buildSegments(stem: string, furigana: FuriganaEntry[] | undefined, underline: [number, number] | undefined): Segment[] {
  const claimed: [number, number][] = [];
  const overlapsClaimed = (start: number, end: number) => claimed.some(([a, b]) => start < b && end > a);

  const matches: { start: number; end: number; reading: string }[] = [];
  for (const f of furigana ?? []) {
    if (!f.text) continue;
    let from = 0;
    while (true) {
      const idx = stem.indexOf(f.text, from);
      if (idx === -1) break;
      const end = idx + f.text.length;
      if (!overlapsClaimed(idx, end)) {
        matches.push({ start: idx, end, reading: f.reading });
        claimed.push([idx, end]);
      }
      from = idx + 1;
    }
  }
  matches.sort((a, b) => a.start - b.start);

  const validUnderline =
    underline && underline[0] >= 0 && underline[1] <= stem.length && underline[0] < underline[1]
      ? underline
      : null;
  const [uFrom, uTo] = validUnderline ?? [-1, -1];

  const segments: Segment[] = [];

  /** Đoạn văn bản THƯỜNG (không furigana) — vẫn có thể bị gạch chân một phần, nên cắt tiếp
   * theo giao với [uFrom, uTo) giống hệt StemText bản cũ. */
  const pushPlain = (from: number, to: number) => {
    if (from >= to) return;
    if (uFrom === -1) {
      segments.push({ text: stem.slice(from, to), underline: false });
      return;
    }
    const preEnd = Math.min(to, Math.max(from, uFrom));
    if (from < preEnd) segments.push({ text: stem.slice(from, preEnd), underline: false });
    const midStart = Math.max(from, uFrom);
    const midEnd = Math.min(to, uTo);
    if (midStart < midEnd) segments.push({ text: stem.slice(midStart, midEnd), underline: true });
    const postStart = Math.max(from, uTo);
    if (postStart < to) segments.push({ text: stem.slice(postStart, to), underline: false });
  };

  let cursor = 0;
  for (const m of matches) {
    pushPlain(cursor, m.start);
    // Một đoạn có furigana thì gạch chân CẢ đoạn nếu nó chạm vùng gạch chân, dù chỉ một phần —
    // gạch chân nửa chữ bên dưới dấu đọc trông vỡ hình, và trong thực tế furigana luôn trùng
    // khít hẳn hoặc nằm hẳn ngoài đoạn gạch chân, phần giao lửng chỉ là lý thuyết.
    const underlineWhole = uFrom !== -1 && m.start < uTo && m.end > uFrom;
    segments.push({ text: stem.slice(m.start, m.end), reading: m.reading, underline: underlineWhole });
    cursor = m.end;
  }
  pushPlain(cursor, stem.length);

  return segments;
}

/**
 * Thân câu hỏi JLPT: gạch chân đúng đoạn mà đề chỉ định (`stemUnderline`), và hiện furigana
 * trên chữ Hán khó nếu đề có kèm (`furigana`, tuỳ chọn — ticket 012, tắt theo mặc định, xem
 * `ProgressSettings.jlptFuriganaEnabled` ở useProgress.tsx).
 *
 * Tách riêng vì cả phòng thi lẫn sổ tay lỗi đều phải hiện câu hỏi y hệt nhau — người học
 * mở lại một câu trong sổ tay phải thấy đúng thứ mình đã thấy lúc làm bài, kể cả chỗ gạch
 * chân (với 問題 dạng 言い換え/用法 thì chỗ gạch chân CHÍNH LÀ đề bài).
 */
export const StemText: React.FC<{
  stem?: string;
  underline?: [number, number];
  furigana?: FuriganaEntry[];
}> = ({ stem, underline, furigana }) => {
  if (!stem) return null;

  if (!furigana || furigana.length === 0) {
    if (!underline) return <span>{stem}</span>;
    const [from, to] = underline;
    if (from < 0 || to > stem.length || from >= to) return <span>{stem}</span>;
    return (
      <span>
        {stem.slice(0, from)}
        <span className="underline decoration-2 decoration-indigo-500 font-black">{stem.slice(from, to)}</span>
        {stem.slice(to)}
      </span>
    );
  }

  const segments = buildSegments(stem, furigana, underline);
  return (
    <span>
      {segments.map((seg, i) => {
        const inner = seg.reading ? (
          <ruby>
            {seg.text}
            <rt className="text-[0.55em]">{seg.reading}</rt>
          </ruby>
        ) : (
          seg.text
        );
        return seg.underline ? (
          <span key={i} className="underline decoration-2 decoration-indigo-500 font-black">
            {inner}
          </span>
        ) : (
          <React.Fragment key={i}>{inner}</React.Fragment>
        );
      })}
    </span>
  );
};
