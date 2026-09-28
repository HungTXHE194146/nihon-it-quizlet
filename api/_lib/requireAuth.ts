import { verifySessionToken, parseCookie, sessionCookieName } from './auth';
import type { SessionUser } from './auth';

export function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** Ai đang gọi request này (hoặc null nếu chưa đăng nhập). Dùng cho route công khai
 * (/api/auth/status) — route dữ liệu thì dùng requireUser() bên dưới. */
export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const cookie = parseCookie(req.headers.get('cookie'), sessionCookieName());
  return verifySessionToken(cookie);
}

/**
 * Chặn ở đầu mọi route đụng tới dữ liệu riêng tư (tiến độ, đề JLPT).
 *
 * Trả về `SessionUser` khi đã đăng nhập, hoặc một `Response` 401 để route trả thẳng ra.
 * Route gọi kiểu:
 *
 *     const user = await requireUser(req);
 *     if (user instanceof Response) return user;
 *
 * Trả về CHÍNH người dùng (chứ không phải boolean như bản một-người-dùng trước đây) vì mọi
 * khoá dữ liệu bây giờ đều phải gắn với `user.id`.
 */
export async function requireUser(req: Request): Promise<SessionUser | Response> {
  const user = await getSessionUser(req);
  if (!user) return jsonResponse({ error: 'unauthorized' }, 401);
  return user;
}
