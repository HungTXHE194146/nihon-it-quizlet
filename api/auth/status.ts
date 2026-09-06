import { signupCodeConfigured } from '../_lib/auth';
import { getSessionUser } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * Route DUY NHẤT không bị chặn bởi requireUser — để client tự hỏi "tôi là ai?" mà không
 * kích hoạt lỗi 401 trên một endpoint dữ liệu thật.
 *
 * `signupOpen` cho giao diện biết có nên hiện ô "Tạo tài khoản" hay không: nếu bản deploy
 * chưa đặt mã mời thì đăng ký chắc chắn thất bại, đừng mời người dùng bấm vào ngõ cụt.
 */
export default async function handler(req: Request): Promise<Response> {
  const user = await getSessionUser(req);
  return new Response(
    JSON.stringify({
      authenticated: user !== null,
      user,
      signupOpen: signupCodeConfigured(),
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
