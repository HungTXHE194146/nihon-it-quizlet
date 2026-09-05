/**
 * Cổng xác thực đơn giản: một mật khẩu dùng chung, ký thành cookie HttpOnly.
 *
 * Chỉ một người dùng, không cần tài khoản/OAuth — độ phức tạp đó không tương xứng với
 * bài toán. Dùng Web Crypto (`crypto.subtle`) thay vì Node `crypto` để cùng một logic
 * chạy được trên cả Edge runtime lẫn Node runtime của Vercel Functions.
 *
 * Mô hình mối đe doạ: trình duyệt không bao giờ nói chuyện thẳng với KV/DB, chỉ gọi
 * các route dưới đây trên cùng domain đã deploy — nên với mạng công ty, việc này không
 * khác gì mở một trang web bình thường.
 */

const COOKIE_NAME = 'jlpt_auth';
const SESSION_DAYS = 90;

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

function toBase64Url(bytes: ArrayBuffer): string {
  let bin = '';
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
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

/** Token dạng "<hết-hạn-epoch-giây>.<chữ ký base64url>". Không mã hoá, chỉ ký — không có
 * gì bí mật bên trong token nên không cần mã hoá, chỉ cần không giả mạo được. */
export async function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
  const key = await hmacKey(getSecret());
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(String(exp)));
  return `${exp}.${toBase64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 0) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!expStr || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;

  try {
    const key = await hmacKey(getSecret());
    return await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64Url(sig),
      new TextEncoder().encode(expStr)
    );
  } catch {
    return false;
  }
}

/**
 * So khớp mật khẩu theo thời gian không đổi.
 *
 * Băm cả hai vế trước khi so sánh: vế nào cũng ra đúng 32 byte bất kể độ dài mật khẩu
 * gốc, nên vòng lặp XOR-diff bên dưới luôn chạy đúng 32 bước — không có đường thoát sớm
 * nào để kẻ tấn công đo thời gian mà đoán ra ký tự đúng.
 */
export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = process.env.JLPT_ACCESS_PASSWORD;
  if (!expected) {
    throw new Error('Thiếu biến môi trường JLPT_ACCESS_PASSWORD.');
  }
  const enc = new TextEncoder();
  const a = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(candidate)));
  const b = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(expected)));

  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

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
