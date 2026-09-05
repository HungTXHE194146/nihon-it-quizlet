import { verifySessionToken, parseCookie, sessionCookieName } from '../_lib/auth';

export const config = { runtime: 'edge' };

/**
 * Route DUY NHẤT không bị chặn bởi requireAuth — để client tự hỏi "tôi đã đăng nhập
 * chưa?" mà không kích hoạt lỗi 401 trên một endpoint dữ liệu thật.
 */
export default async function handler(req: Request): Promise<Response> {
  const cookie = parseCookie(req.headers.get('cookie'), sessionCookieName());
  const authenticated = await verifySessionToken(cookie);
  return new Response(JSON.stringify({ authenticated }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
