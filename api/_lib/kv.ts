/**
 * Wrapper mỏng quanh Vercel KV — nơi duy nhất trong repo import '@vercel/kv'.
 *
 * Cần tạo KV store thật trong Vercel Dashboard trước khi các route dùng file này chạy
 * được (xem api/README.md). Ở đây không che giấu lỗi thiếu cấu hình — để lộ ra ngay
 * dưới dạng lỗi rõ ràng thay vì âm thầm trả dữ liệu rỗng.
 */

export { kv } from '@vercel/kv';

export const KEYS = {
  /** Một blob JSON duy nhất, cùng hình dạng với thứ đang lưu ở localStorage hôm nay. */
  progress: 'nihonit:progress',
  /** Danh sách id các đề JLPT đã nhập, để không phải liệt kê toàn bộ key trong KV. */
  examIndex: 'nihonit:jlpt:examIndex',
  exam: (id: string): string => `nihonit:jlpt:exam:${id}`,
} as const;
