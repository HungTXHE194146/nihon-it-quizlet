import { createSessionToken, buildSetCookie } from '../_lib/auth';
import { authenticate } from '../_lib/users';
import { hitRateLimit, clientKey } from '../_lib/rateLimit';
import { jsonResponse } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

/** 10 lần thử / 15 phút cho mỗi IP — thoải mái cho người gõ nhầm, quá chậm để dò mật khẩu. */
const MAX_ATTEMPTS = 10;
const WINDOW_SEC = 15 * 60;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405);

  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  if (typeof body.username !== 'string' || typeof body.password !== 'string') {
    return jsonResponse({ error: 'missing_credentials', message: 'Thiếu tên đăng nhập hoặc mật khẩu.' }, 400);
  }

  const limit = await hitRateLimit(`login:${clientKey(req)}`, MAX_ATTEMPTS, WINDOW_SEC);
  if (limit.blocked) {
    return jsonResponse(
      { error: 'too_many_attempts', message: 'Thử sai quá nhiều lần. Đợi ít phút rồi thử lại.' },
      429
    );
  }

  let user;
  try {
    user = await authenticate(body.username, body.password);
  } catch (e) {
    // Thiếu biến môi trường / KV chưa cấu hình — lỗi phía server, không phải lỗi người dùng.
    return jsonResponse({ error: 'server_misconfigured', message: String(e) }, 500);
  }

  if (!user) return jsonResponse({ error: 'invalid_credentials', message: 'Sai tên đăng nhập hoặc mật khẩu.' }, 401);

  const token = await createSessionToken({ id: user.id, username: user.username });
  return new Response(JSON.stringify({ ok: true, user: { id: user.id, username: user.username } }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'set-cookie': buildSetCookie(token),
    },
  });
}
