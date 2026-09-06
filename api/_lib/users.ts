/**
 * Hồ sơ tài khoản trong KV.
 *
 * Không có bảng/quan hệ như CSDL thật — mỗi tài khoản là một bản ghi JSON dưới khoá
 * `nihonit:user:<username thường>`, cộng thêm một SET chứa mọi username để đếm và biết ai
 * là người đăng ký đầu tiên. Với vài chục người dùng thì thế là đủ; đổi sang Postgres về
 * sau chỉ cần thay đúng file này vì phần còn lại chỉ làm việc với `user.id`.
 */

import { kv, KEYS } from './kv';
import { hashPassword, verifyPassword } from './auth';

export interface UserRecord {
  id: string;
  /** Giữ nguyên hoa/thường lúc đăng ký, chỉ để hiển thị. */
  username: string;
  /** Khoá tra cứu: "An" và "an" là cùng một tài khoản, tránh hai người trùng tên nhìn giống hệt nhau. */
  usernameLower: string;
  passwordHash: string;
  createdAt: number;
}

const USERNAME_RE = /^[a-zA-Z0-9._-]{3,24}$/;
const MIN_PASSWORD_LENGTH = 8;

/** Trả về thông báo lỗi (tiếng Việt, hiện thẳng cho người dùng) hoặc null nếu hợp lệ. */
export function validateUsername(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.trim().length === 0) return 'Thiếu tên đăng nhập.';
  if (!USERNAME_RE.test(raw.trim())) {
    return 'Tên đăng nhập chỉ gồm chữ, số, dấu chấm, gạch dưới hoặc gạch ngang, dài 3–24 ký tự.';
  }
  return null;
}

export function validatePassword(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw.length === 0) return 'Thiếu mật khẩu.';
  if (raw.length < MIN_PASSWORD_LENGTH) return `Mật khẩu phải dài ít nhất ${MIN_PASSWORD_LENGTH} ký tự.`;
  if (raw.length > 200) return 'Mật khẩu quá dài.';
  return null;
}

export function normalizeUsername(raw: string): string {
  return raw.trim().toLowerCase();
}

export async function getUser(usernameLower: string): Promise<UserRecord | null> {
  return (await kv.get<UserRecord>(KEYS.user(usernameLower))) ?? null;
}

/**
 * Tạo tài khoản mới. Trả về `taken` nếu username đã có.
 *
 * Ghi bằng `nx: true` (chỉ ghi khi khoá chưa tồn tại) thay vì "đọc rồi ghi": hai người bấm
 * đăng ký cùng một tên trong cùng một khoảnh khắc thì đúng một người thắng, người kia nhận
 * `taken` — chứ không phải người sau lặng lẽ ghi đè mật khẩu của người trước.
 */
export async function createUser(
  username: string,
  password: string
): Promise<{ ok: true; user: UserRecord; isFirstUser: boolean } | { ok: false; reason: 'taken' }> {
  const usernameLower = normalizeUsername(username);
  const record: UserRecord = {
    id: crypto.randomUUID(),
    username: username.trim(),
    usernameLower,
    passwordHash: await hashPassword(password),
    createdAt: Date.now(),
  };

  const written = await kv.set(KEYS.user(usernameLower), record, { nx: true });
  if (written === null) return { ok: false, reason: 'taken' };

  await kv.sadd(KEYS.userSet, usernameLower);
  const count = await kv.scard(KEYS.userSet);

  return { ok: true, user: record, isFirstUser: count === 1 };
}

/**
 * Băm giả để kiểm tra khi username không tồn tại. Không mật khẩu nào khớp được với nó;
 * mục đích duy nhất là làm ca "sai tên" tốn thời gian ngang ca "sai mật khẩu", để không ai
 * dò ra được username nào có thật chỉ bằng cách đo thời gian trả lời.
 */
const DUMMY_HASH =
  'pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

/** Trả về hồ sơ nếu đúng mật khẩu, null nếu sai tên HOẶC sai mật khẩu — hai ca cố ý không
 * phân biệt được từ bên ngoài. */
export async function authenticate(username: string, password: string): Promise<UserRecord | null> {
  const user = await getUser(normalizeUsername(username));
  if (!user) {
    await verifyPassword(password, DUMMY_HASH);
    return null;
  }
  const ok = await verifyPassword(password, user.passwordHash);
  return ok ? user : null;
}
