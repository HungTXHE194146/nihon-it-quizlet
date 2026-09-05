import { kv, KEYS } from './_lib/kv';
import { requireAuth, jsonResponse } from './_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * GET  -> trả về blob tiến độ đang lưu trên server (hoặc null nếu chưa từng đồng bộ).
 * PUT  -> ghi đè toàn bộ blob (client tự quyết định khi nào ghi — xem hợp nhất theo
 *         thời gian ở useProgress.tsx phía client, server không tự hợp nhất field nào).
 */
export default async function handler(req: Request): Promise<Response> {
  const denied = await requireAuth(req);
  if (denied) return denied;

  if (req.method === 'GET') {
    const data = await kv.get(KEYS.progress);
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
    await kv.set(KEYS.progress, stamped);
    return jsonResponse({ ok: true, updatedAt: stamped._serverUpdatedAt }, 200);
  }

  return jsonResponse({ error: 'method_not_allowed' }, 405);
}
