import { createSessionToken, buildSetCookie, verifyPassword, hashPassword } from '../_lib/auth';
import { getUser, normalizeUsername, validatePassword } from '../_lib/users';
import { hitRateLimit, clientKey } from '../_lib/rateLimit';
import { requireUser, jsonResponse } from '../_lib/requireAuth';
import { kv, KEYS } from '../_lib/kv';

export const config = { runtime: 'edge' };

/** Cùng hạn mức với đăng nhập: route này cũng nhận mật khẩu hiện tại nên cũng dò được. */
const MAX_ATTEMPTS = 10;
const WINDOW_SEC = 15 * 60;

/**
 * POST {currentPassword, newPassword} -> đổi mật khẩu của chính người đang đăng nhập.
 *
 * KHÔNG có đường khôi phục khi quên mật khẩu: không email, không câu hỏi bí mật, không
 * admin reset. Muốn đổi thì phải biết mật khẩu cũ. Đây là lựa chọn có ý thức cho một web
 * học nhóm nhỏ — thêm luồng khôi phục nghĩa là thêm email, thêm token, thêm chỗ hỏng; ai
 * quên thì tạo tài khoản mới bằng mã mời rồi nạp lại tiến độ từ file JSON đã xuất.
 *
 * Lưu ý: đổi mật khẩu KHÔNG làm hết hiệu lực cookie đang có trên các máy khác (token đã ký
 * không tra lại KV mỗi request). Muốn đá sạch mọi phiên thì đổi AUTH_SECRET rồi deploy lại.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405);

  const session = await requireUser(req);
  if (session instanceof Response) return session;

  let body: { currentPassword?: unknown; newPassword?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  if (typeof body.currentPassword !== 'string') {
    return jsonResponse({ error: 'missing_current_password', message: 'Thiếu mật khẩu hiện tại.' }, 400);
  }
  const newPasswordError = validatePassword(body.newPassword);
  if (newPasswordError) return jsonResponse({ error: 'invalid_password', message: newPasswordError }, 400);
  const newPassword = body.newPassword as string;

  if (newPassword === body.currentPassword) {
    return jsonResponse(
      { error: 'same_password', message: 'Mật khẩu mới trùng mật khẩu cũ — đổi làm gì?' },
      400
    );
  }

  const limit = await hitRateLimit(`chpw:${clientKey(req)}`, MAX_ATTEMPTS, WINDOW_SEC);
  if (limit.blocked) {
    return jsonResponse(
      { error: 'too_many_attempts', message: 'Thử sai quá nhiều lần. Đợi ít phút rồi thử lại.' },
      429
    );
  }

  const usernameLower = normalizeUsername(session.username);
  const user = await getUser(usernameLower);
  if (!user) {
    // Cookie còn hạn nhưng tài khoản đã bị xoá thẳng trong KV.
    return jsonResponse({ error: 'unknown_user', message: 'Tài khoản không còn tồn tại.' }, 401);
  }

  if (!(await verifyPassword(body.currentPassword, user.passwordHash))) {
    return jsonResponse({ error: 'wrong_password', message: 'Mật khẩu hiện tại không đúng.' }, 401);
  }

  await kv.set(KEYS.user(usernameLower), { ...user, passwordHash: await hashPassword(newPassword) });

  // Cấp cookie mới cho chính máy vừa đổi: hạn 90 ngày tính lại từ bây giờ.
  const token = await createSessionToken({ id: user.id, username: user.username });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'set-cookie': buildSetCookie(token) },
  });
}
