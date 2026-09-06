import { kv, KEYS } from './_lib/kv';
import { requireUser, jsonResponse } from './_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * GET  -> trả về blob tiến độ CỦA NGƯỜI ĐANG ĐĂNG NHẬP (hoặc null nếu chưa từng đồng bộ).
 * PUT  -> ghi đè toàn bộ blob của chính người đó (client tự quyết định khi nào ghi — xem
 *         hợp nhất theo thời gian ở useProgress.tsx phía client, server không tự hợp nhất
 *         field nào).
 *
 * Khoá KV gắn với `user.id` nên hai người dùng chung một bản deploy không bao giờ đọc/ghi
 * đè lên tiến độ của nhau; id lấy từ cookie đã ký, KHÔNG lấy từ tham số client gửi lên —
 * nếu không thì ai cũng có thể đọc tiến độ người khác chỉ bằng cách đổi query string.
 */
export default async function handler(req: Request): Promise<Response> {
  const user = await requireUser(req);
  if (user instanceof Response) return user;

  if (req.method === 'GET') {
    const data = await kv.get(KEYS.progress(user.id));
    return jsonResponse(data ?? null, 200);
  }

  if (req.method === 'PUT') {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: 'invalid_body' }, 400);
    }
    if (typeof body !== 'object' || body === null) {
      return jsonResponse({ error: 'invalid_body' }, 400);
    }

    // Dấu thời gian phía server — nguồn sự thật để hai máy so sánh bản nào mới hơn,
    // không dùng đồng hồ máy khách (có thể lệch giờ giữa hai máy).
    const stamped = { ...(body as Record<string, unknown>), _serverUpdatedAt: Date.now() };
    await kv.set(KEYS.progress(user.id), stamped);
    return jsonResponse({ ok: true, updatedAt: stamped._serverUpdatedAt }, 200);
  }

  return jsonResponse({ error: 'method_not_allowed' }, 405);
}
