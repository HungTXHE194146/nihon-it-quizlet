/**
 * Wrapper mỏng quanh Vercel KV — nơi duy nhất trong repo import '@vercel/kv'.
 *
 * Cần tạo KV store thật trong Vercel Dashboard trước khi các route dùng file này chạy
 * được (xem api/README.md). Ở đây không che giấu lỗi thiếu cấu hình — để lộ ra ngay
 * dưới dạng lỗi rõ ràng thay vì âm thầm trả dữ liệu rỗng.
 */

export { kv } from '@vercel/kv';

export const KEYS = {
  /**
   * Blob tiến độ toàn cục thời còn một-người-dùng. KHÔNG route nào ghi vào đây nữa; nó chỉ
   * được đọc đúng một lần để chuyển cho tài khoản đầu tiên đăng ký (api/auth/register.ts),
   * nhờ vậy dữ liệu học cũ không mất khi chuyển sang mô hình nhiều tài khoản.
   */
  legacyProgress: 'nihonit:progress',

  /** Tập username (đã hạ chữ thường) của mọi tài khoản — dùng SET để thêm/đếm nguyên tử. */
  userSet: 'nihonit:users',
  user: (usernameLower: string): string => `nihonit:user:${usernameLower}`,

  /** Tiến độ học tách riêng theo từng tài khoản — trái tim của phần nhiều người dùng. */
  progress: (userId: string): string => `nihonit:u:${userId}:progress`,

  /**
   * Đề JLPT là KHO CHUNG, cố ý không tách theo người dùng: đề là học liệu (một người nhập,
   * cả nhóm luyện), không phải dữ liệu cá nhân. Chỉ có tiến độ làm bài mới là của riêng ai.
   * Quyền xoá vẫn giới hạn ở người đã nhập đề đó — xem api/jlpt/exams.ts.
   */
  examIndex: 'nihonit:jlpt:examIndex',
  exam: (id: string): string => `nihonit:jlpt:exam:${id}`,

  /** Bộ đếm chống dò mật khẩu, tự hết hạn — xem api/_lib/rateLimit.ts. */
  rate: (bucket: string): string => `nihonit:rl:${bucket}`,
} as const;
