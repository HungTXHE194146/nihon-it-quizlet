import { checkPassword, createSessionToken, buildSetCookie } from '../_lib/auth';
import { jsonResponse } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405);

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  if (typeof body.password !== 'string' || body.password.length === 0) {
    return jsonResponse({ error: 'missing_password' }, 400);
  }

  let ok: boolean;
  try {
    ok = await checkPassword(body.password);
  } catch (e) {
    // Thiếu biến môi trường — lỗi cấu hình, không phải lỗi người dùng. Báo rõ để dễ sửa.
    return jsonResponse({ error: 'server_misconfigured', message: String(e) }, 500);
  }

  if (!ok) return jsonResponse({ error: 'wrong_password' }, 401);

  const token = await createSessionToken();
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'set-cookie': buildSetCookie(token),
    },
  });
}
