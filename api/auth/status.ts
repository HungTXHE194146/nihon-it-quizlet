import { signupCodeRequired } from '../_lib/auth';
import { getSessionUser } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * Route DUY NHẤT không bị chặn bởi requireUser — để client tự hỏi "tôi là ai?" mà không
 * kích hoạt lỗi 401 trên một endpoint dữ liệu thật.
 *
 * `signupCodeRequired` cho giao diện biết có phải hỏi mã mời hay không: mặc định đăng ký mở
 * tự do nên không hỏi gì cả; chỉ khi bản deploy đặt `SIGNUP_CODE` thì mới hiện thêm ô đó.
 */
export default async function handler(req: Request): Promise<Response> {
  const user = await getSessionUser(req);
  return new Response(
    JSON.stringify({
      authenticated: user !== null,
      user,
      signupCodeRequired: signupCodeRequired(),
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
