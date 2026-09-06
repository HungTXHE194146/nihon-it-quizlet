/**
 * Wrapper mỏng quanh KV (Upstash Redis) — nơi duy nhất trong repo import '@vercel/kv'.
 *
 * Vì sao không `export { kv } from '@vercel/kv'` cho gọn: client mặc định của thư viện chỉ
 * đọc đúng cặp biến `KV_REST_API_URL` / `KV_REST_API_TOKEN` của Vercel KV đời đầu. Tạo
 * database qua Vercel Marketplace (Upstash) thì biến được bơm vào lại tên
 * `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`, và mọi route sẽ chết với thông báo
 * khó hiểu dù database đã kết nối đúng. Ở đây nhận cả hai cách đặt tên.
 *
 * Client dựng LƯỜI (lần dùng đầu tiên) chứ không dựng lúc import, để lỗi thiếu cấu hình
 * hiện ra thành một Response 500 có thông báo rõ ràng thay vì làm sập cả function lúc nạp.
 */

import { createClient } from '@vercel/kv';

type KvClient = ReturnType<typeof createClient>;

let client: KvClient | null = null;

function getClient(): KvClient {
  if (client) return client;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      'Chưa nối kho dữ liệu KV. Trong Vercel: tab Storage > tạo database Redis/KV > Connect ' +
        'Project, rồi Redeploy. Cần có KV_REST_API_URL + KV_REST_API_TOKEN (hoặc ' +
        'UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) trong Environment Variables.'
    );
  }

  client = createClient({ url, token });
  return client;
}

/**
 * Đúng những lệnh Redis mà web này dùng — liệt kê tường minh thay vì mở nguyên client, để
 * nhìn một chỗ là biết ứng dụng đụng tới KV bao nhiêu, và để đổi nền lưu trữ về sau chỉ
 * phải viết lại chừng này hàm.
 */
export const kv = {
  get: <T>(key: string): Promise<T | null> => getClient().get<T>(key),
  /** Trả về null khi dùng `{ nx: true }` mà khoá đã tồn tại — cách createUser() biết
   * username bị người khác giành mất mà không cần đọc trước rồi ghi sau. */
  set: (key: string, value: unknown, opts?: { nx: true }): Promise<string | null> =>
    (opts ? getClient().set(key, value, opts) : getClient().set(key, value)) as Promise<
      string | null
    >,
  del: (key: string): Promise<number> => getClient().del(key),
  sadd: (key: string, member: string): Promise<number> => getClient().sadd(key, member),
  scard: (key: string): Promise<number> => getClient().scard(key),
  incr: (key: string): Promise<number> => getClient().incr(key),
  expire: (key: string, seconds: number): Promise<number> => getClient().expire(key, seconds),
};

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
