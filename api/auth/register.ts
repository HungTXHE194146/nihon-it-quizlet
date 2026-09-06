import { checkSignupCode, createSessionToken, buildSetCookie } from '../_lib/auth';
import { createUser, validateUsername, validatePassword } from '../_lib/users';
import { hitRateLimit, clientKey } from '../_lib/rateLimit';
import { jsonResponse } from '../_lib/requireAuth';
import { kv, KEYS } from '../_lib/kv';

export const config = { runtime: 'edge' };

/** 5 tài khoản / giờ cho mỗi IP: đủ để cả nhà đăng ký một lượt, không đủ để spam. */
const MAX_SIGNUPS = 5;
const WINDOW_SEC = 60 * 60;

/**
 * POST {username, password, code} -> tạo tài khoản mới và đăng nhập luôn.
 *
 * `code` là mã mời (SIGNUP_CODE, mặc định lấy JLPT_ACCESS_PASSWORD cũ) — xem giải thích
 * trong api/_lib/auth.ts về việc vì sao đăng ký không mở tự do.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405);

  let body: { username?: unknown; password?: unknown; code?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, 400);
  }

  const usernameError = validateUsername(body.username);
  if (usernameError) return jsonResponse({ error: 'invalid_username', message: usernameError }, 400);
  const passwordError = validatePassword(body.password);
  if (passwordError) return jsonResponse({ error: 'invalid_password', message: passwordError }, 400);
  const username = (body.username as string).trim();
  const password = body.password as string;

  const limit = await hitRateLimit(`signup:${clientKey(req)}`, MAX_SIGNUPS, WINDOW_SEC);
  if (limit.blocked) {
    return jsonResponse(
      { error: 'too_many_attempts', message: 'Tạo tài khoản quá nhiều lần. Thử lại sau.' },
      429
    );
  }

  let codeOk: boolean;
  try {
    codeOk = await checkSignupCode(typeof body.code === 'string' ? body.code : '');
  } catch (e) {
    return jsonResponse({ error: 'signup_closed', message: String(e) }, 500);
  }
  if (!codeOk) return jsonResponse({ error: 'invalid_code', message: 'Mã mời không đúng.' }, 403);

  let created;
  try {
    created = await createUser(username, password);
  } catch (e) {
    return jsonResponse({ error: 'server_misconfigured', message: String(e) }, 500);
  }
  if (!created.ok) {
    return jsonResponse({ error: 'username_taken', message: 'Tên đăng nhập này đã có người dùng.' }, 409);
  }

  await claimLegacyProgress(created.user.id, created.isFirstUser);

  const token = await createSessionToken({ id: created.user.id, username: created.user.username });
  return new Response(
    JSON.stringify({ ok: true, user: { id: created.user.id, username: created.user.username } }),
    {
      status: 200,
      headers: { 'content-type': 'application/json', 'set-cookie': buildSetCookie(token) },
    }
  );
}

/**
 * Chuyển blob tiến độ toàn cục của thời một-người-dùng sang cho tài khoản ĐẦU TIÊN đăng ký.
 *
 * Không có bước này thì người đang dùng web hôm nay sẽ thấy tiến độ đã đồng bộ của mình
 * "biến mất" ngay sau khi tạo tài khoản. Chỉ làm cho người đầu tiên, và chỉ khi tài khoản
 * đó chưa có tiến độ riêng — người thứ hai trở đi bắt đầu từ con số không, đúng như mong đợi.
 *
 * Bản gốc được giữ nguyên (không xoá) để còn đường lùi nếu có sự cố.
 */
async function claimLegacyProgress(userId: string, isFirstUser: boolean): Promise<void> {
  if (!isFirstUser) return;
  try {
    const legacy = await kv.get(KEYS.legacyProgress);
    if (!legacy) return;
    const existing = await kv.get(KEYS.progress(userId));
    if (existing) return;
    await kv.set(KEYS.progress(userId), legacy);
  } catch {
    // Đăng ký vẫn phải thành công dù việc chuyển dữ liệu cũ có trục trặc: người dùng còn
    // nút "Nạp tiến độ" từ file JSON để tự khôi phục.
  }
}
