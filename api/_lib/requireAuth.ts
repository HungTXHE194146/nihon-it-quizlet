import { verifySessionToken, parseCookie, sessionCookieName } from './auth';

export function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Chặn ở đầu mọi route đụng tới dữ liệu riêng tư (tiến độ, đề JLPT).
 * Trả về Response 401 nếu chưa đăng nhập, hoặc null nếu đã xác thực — cho đi tiếp.
 */
export async function requireAuth(req: Request): Promise<Response | null> {
  const cookie = parseCookie(req.headers.get('cookie'), sessionCookieName());
  const authed = await verifySessionToken(cookie);
  if (!authed) return jsonResponse({ error: 'unauthorized' }, 401);
  return null;
}
