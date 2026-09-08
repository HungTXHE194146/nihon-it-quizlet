/**
 * Thống kê thuần trên sổ tay lỗi JLPT — tách khỏi component để dễ đọc và kiểm tra.
 *
 * Giá trị của sổ tay lỗi không nằm ở việc liệt kê lại từng câu (bảng kết quả đã làm việc
 * đó), mà ở chỗ trả lời được câu hỏi người học không tự trả lời nổi: "tôi hay sai vì lý do
 * gì nhất?" — mục 6.2/6.4 của docs/jlpt-practice-test-research.md. Dữ liệu để trả lời đã
 * được ghi sẵn ở bước 2 của quy trình mổ xẻ (`cause`), chỉ thiếu chỗ gộp lại.
 */

import { MISTAKE_CAUSES } from './schema';
import type { MistakeEntry, MistakeCause, Confidence } from './schema';

const CAUSE_BY_CODE = new Map(MISTAKE_CAUSES.map((c) => [c.code, c]));

export function causeLabel(code: MistakeCause): string {
  return CAUSE_BY_CODE.get(code)?.label ?? code;
}

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  sure: 'Chắc',
  unsure: 'Phân vân',
  guess: 'Đoán',
};

export interface CauseCount {
  code: MistakeCause;
  label: string;
  hint: string;
  count: number;
  /** Phần trăm trên tổng số mục đang xét, đã làm tròn — chỉ dùng để vẽ thanh và hiện chữ. */
  percent: number;
}

/**
 * Đếm số lần mắc theo từng nguyên nhân, nhiều nhất trước.
 *
 * Chỉ giữ nguyên nhân có ít nhất một lần: một danh sách 8 dòng mà 6 dòng bằng 0 làm loãng
 * đúng thứ cần nhìn. Cùng một câu bị sai ở hai lượt làm bài khác nhau sẽ là hai bản ghi và
 * được đếm hai lần — đó là chủ ý, sai đi sai lại chính là tín hiệu cần thấy.
 */
export function countByCause(entries: MistakeEntry[]): CauseCount[] {
  const total = entries.length;
  const tally = new Map<MistakeCause, number>();
  for (const e of entries) tally.set(e.cause, (tally.get(e.cause) ?? 0) + 1);

  return MISTAKE_CAUSES.map((c) => {
    const count = tally.get(c.code) ?? 0;
    return {
      code: c.code,
      label: c.label,
      hint: c.hint,
      count,
      percent: total > 0 ? Math.round((count / total) * 100) : 0,
    };
  })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}
