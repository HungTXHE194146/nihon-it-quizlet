/**
 * Xác thực theo TÀI KHOẢN: mỗi người một username + mật khẩu riêng, phiên đăng nhập là
 * một cookie HttpOnly có chữ ký mang theo id người dùng.
 *
 * Trước đây web chỉ có MỘT mật khẩu dùng chung cho MỘT người (mọi dữ liệu nằm chung một
 * blob). Nay nhiều người dùng chung một bản deploy, nên mỗi request phải trả lời được
 * "ai đang gọi" — id đó là thứ dùng để tách khoá dữ liệu trong KV (xem api/_lib/kv.ts).
 *
 * Vẫn dùng Web Crypto (`crypto.subtle`) thay vì Node `crypto` để cùng một logic chạy được
 * trên cả Edge runtime lẫn Node runtime của Vercel Functions.
 *
 * Mô hình mối đe doạ: trình duyệt không bao giờ nói chuyện thẳng với KV/DB, chỉ gọi các
 * route trên cùng domain đã deploy. Cookie chỉ được KÝ chứ không mã hoá — bên trong chỉ có
 * id/username và hạn dùng, không có gì bí mật; điều cần bảo đảm là không giả mạo được.
 */

const COOKIE_NAME = 'jlpt_auth';
const SESSION_DAYS = 90;
/** Số vòng PBKDF2. Đủ chậm để dò mật khẩu offline tốn kém, đủ nhanh cho Edge runtime. */
const PBKDF2_ITERATIONS = 100_000;

export interface SessionUser {
  id: string;
  username: string;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      'Thiếu biến môi trường AUTH_SECRET. Đặt trong Vercel Project Settings > Environment ' +
        'Variables — một chuỗi ngẫu nhiên dài, ví dụ sinh bằng: openssl rand -hex 32'
    );
  }
  return secret;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (const b of view) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array<ArrayBuffer> {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  // Kiểu trả về khai báo tường minh Uint8Array<ArrayBuffer> (thay vì mặc định
  // Uint8Array<ArrayBufferLike> của TS 5.7+) để khớp BufferSource mà
  // crypto.subtle.verify() đòi hỏi.
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** So sánh hai chuỗi byte theo thời gian không đổi (không thoát sớm ở byte đầu khác nhau). */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ─── Băm mật khẩu ────────────────────────────────────────────────────

/**
 * Băm mật khẩu bằng PBKDF2-SHA256 với muối ngẫu nhiên riêng cho từng tài khoản.
 *
 * Chuỗi trả về tự mang đủ tham số để kiểm tra lại về sau
 * (`pbkdf2$<số vòng>$<muối>$<băm>`), nên đổi PBKDF2_ITERATIONS trong tương lai vẫn xác
 * thực được các tài khoản đăng ký trước đó.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await deriveBits(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(bits)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;

  try {
    const salt = fromBase64Url(parts[2]);
    const expected = fromBase64Url(parts[3]);
    const actual = new Uint8Array(await deriveBits(password, salt, iterations));
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

async function deriveBits(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number
): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  return crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, 256);
}

// ─── Phiên đăng nhập ─────────────────────────────────────────────────

interface SessionPayload {
  uid: string;
  name: string;
  /** Hết hạn, epoch giây. */
  exp: number;
}

/**
 * Token dạng "<payload base64url>.<chữ ký base64url>".
 *
 * Payload mang theo id người dùng để mọi route biết ngay chủ sở hữu dữ liệu mà không phải
 * tra KV thêm một lần cho mỗi request.
 */
export async function createSessionToken(user: SessionUser): Promise<string> {
  const payload: SessionPayload = {
    uid: user.id,
    name: user.username,
    exp: Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60,
  };
  const encoded = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await hmacKey(getSecret());
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(encoded));
  return `${encoded}.${toBase64Url(sig)}`;
}

/**
 * Trả về người dùng của phiên, hoặc null nếu token thiếu/sai chữ ký/hết hạn.
 *
 * Cookie kiểu cũ (chỉ có hạn dùng, không có id người dùng) sẽ rơi vào null — đúng ý muốn:
 * sau khi chuyển sang nhiều tài khoản, không còn khái niệm "đã đăng nhập mà không biết là ai".
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionUser | null> {
  if (!token) return null;
  const dot = token.indexOf('.');
  if (dot < 0) return null;
  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!encoded || !sig) return null;

  try {
    const key = await hmacKey(getSecret());
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64Url(sig),
      new TextEncoder().encode(encoded)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encoded))) as SessionPayload;
    if (typeof payload?.uid !== 'string' || typeof payload?.name !== 'string') return null;
    if (!Number.isFinite(payload.exp) || payload.exp < Math.floor(Date.now() / 1000)) return null;

    return { id: payload.uid, username: payload.name };
  } catch {
    return null;
  }
}

// ─── Mã mời (giữ web ở chế độ riêng tư) ──────────────────────────────

/**
 * Đăng ký KHÔNG mở tự do: người mới phải nhập đúng mã mời thì mới tạo được tài khoản.
 *
 * Lý do: bản deploy này nằm trên domain công khai. Nếu ai vào cũng đăng ký được thì web
 * trở thành dịch vụ mở cho người lạ — đúng thứ mà thiết kế cũ (một mật khẩu chung) cố
 * tránh. Mã mời giữ nguyên tính riêng tư đó nhưng cho phép nhiều tài khoản.
 *
 * Dùng lại `JLPT_ACCESS_PASSWORD` nếu chưa đặt `SIGNUP_CODE`, để bản deploy đang chạy
 * không phải cấu hình lại gì vẫn đăng ký được ngay bằng mật khẩu cũ.
 */
export function signupCodeConfigured(): boolean {
  return Boolean(process.env.SIGNUP_CODE || process.env.JLPT_ACCESS_PASSWORD);
}

export async function checkSignupCode(candidate: string): Promise<boolean> {
  const expected = process.env.SIGNUP_CODE || process.env.JLPT_ACCESS_PASSWORD;
  if (!expected) {
    throw new Error(
      'Chưa mở đăng ký: đặt biến môi trường SIGNUP_CODE (mã mời) trong Vercel Project ' +
        'Settings > Environment Variables rồi deploy lại.'
    );
  }
  // Băm hai vế trước khi so sánh: luôn đúng 32 byte bất kể độ dài mã gốc, nên vòng lặp
  // so khớp chạy đúng 32 bước — không có đường thoát sớm để đo thời gian mà đoán ký tự.
  const enc = new TextEncoder();
  const a = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(candidate)));
  const b = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(expected)));
  return timingSafeEqual(a, b);
}

// ─── Cookie ──────────────────────────────────────────────────────────

export function parseCookie(header: string | null | undefined, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 0) continue;
    const k = part.slice(0, eq).trim();
    if (k === name) return decodeURIComponent(part.slice(eq + 1).trim());
  }
  return undefined;
}

export function sessionCookieName(): string {
  return COOKIE_NAME;
}

export function buildSetCookie(token: string): string {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}
