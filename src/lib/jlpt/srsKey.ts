/**
 * Khoá SRS cho chính câu hỏi JLPT — dùng lại nguyên `data.cards`/`recordReview()` của
 * `useProgress.tsx` (thuật toán SM-2 ở `src/lib/srs.ts`), không dựng hệ thứ hai (mục 6.4
 * tài liệu thiết kế: "không nên dựng hệ thứ hai").
 *
 * Trước ticket này, câu sai chỉ vào lịch ôn khi trùng CHÍNH XÁC một thẻ từ vựng có sẵn
 * (`linkedItemKey`, xem linkSuggest.ts) — nghĩa là câu 文法/読解/聴解 (phần lớn một đề thật)
 * không bao giờ được lên lịch ôn lại dù người học đã mổ xẻ kỹ. Giải pháp: cho chính câu hỏi
 * một khoá thẻ riêng, độc lập với việc có nối được từ vựng hay không.
 *
 * `questionId` chỉ duy nhất TRONG PHẠM VI MỘT ĐỀ (xem schema.ts) — hai đề khác nhau có thể
 * cùng dùng "q1" — nên khoá phải mang cả `examId`, nếu không thẻ SRS của câu "q1" đề A sẽ bị
 * đè bởi câu "q1" đề B.
 *
 * `subjectIdFromKey()` (itemIndex.ts) tách khoá theo dấu "::" ĐẦU TIÊN, nên khoá dạng
 * `jlpt::<examId>::<questionId>` vẫn tách ra "jlpt" làm phần subjectId — cố ý, để mọi nơi lọc
 * theo subjectId đều thấy các thẻ này KHÔNG thuộc môn nào (`subjectInScope('jlpt', 'n3')` là
 * false, đúng ý). Riêng scope `'all'` khớp MỌI subjectId vô điều kiện nên vẫn phải chặn tay
 * bằng `isJlptCardKey()` ở useProgress.tsx — xem ghi chú tại các hàm build..Queue/statsFor ở đó.
 */

const JLPT_CARD_PREFIX = 'jlpt::';

export function jlptCardKey(examId: string, questionId: string): string {
  return `${JLPT_CARD_PREFIX}${examId}::${questionId}`;
}

export function isJlptCardKey(key: string): boolean {
  return key.startsWith(JLPT_CARD_PREFIX);
}

export interface ParsedJlptCardKey {
  examId: string;
  questionId: string;
}

/** Ngược lại của `jlptCardKey()`. `null` nếu `key` không phải khoá thẻ JLPT hợp lệ. */
export function parseJlptCardKey(key: string): ParsedJlptCardKey | null {
  if (!isJlptCardKey(key)) return null;
  const rest = key.slice(JLPT_CARD_PREFIX.length);
  const sep = rest.indexOf('::');
  if (sep === -1) return null;
  return { examId: rest.slice(0, sep), questionId: rest.slice(sep + 2) };
}
