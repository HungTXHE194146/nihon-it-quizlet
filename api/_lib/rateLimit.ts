/**
 * Hạn mức chống dò mật khẩu, đếm trong KV theo cửa sổ thời gian trượt-thô.
 *
 * Vì sao bây giờ mới cần: thời một-mật-khẩu-chung, bí mật đó do chủ web tự sinh (dài, ngẫu
 * nhiên). Nay mỗi người tự đặt mật khẩu của mình — mật khẩu do người thật nghĩ ra thì yếu
 * hơn nhiều, nên đường đăng nhập phải có phanh.
 *
 * Nếu KV lỗi, hàm này CHO QUA thay vì chặn: sự cố hạ tầng không nên khoá cửa người dùng
 * hợp lệ ra ngoài.
 */

import { kv, KEYS } from './kv';

export interface RateLimitResult {
  blocked: boolean;
  retryAfterSec: number;
}

export async function hitRateLimit(
  bucket: string,
  limit: number,
  windowSec: number
): Promise<RateLimitResult> {
  try {
    const key = KEYS.rate(bucket);
    const count = await kv.incr(key);
    // Chỉ lần tăng đầu tiên mới đặt hạn — nếu đặt lại mỗi lần, kẻ dò liên tục sẽ tự đẩy
    // cửa sổ về sau mãi mãi và bộ đếm không bao giờ hết hạn.
    if (count === 1) await kv.expire(key, windowSec);
    return { blocked: count > limit, retryAfterSec: windowSec };
  } catch {
    return { blocked: false, retryAfterSec: 0 };
  }
}

/** Định danh thô của người gọi để gom bộ đếm. Có thể trùng nhau khi nhiều người sau cùng
 * một NAT — chấp nhận được vì hạn mức đặt rộng rãi so với nhịp gõ của người thật. */
export function clientKey(req: Request): string {
  const ip =
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
  return ip.replace(/[^a-zA-Z0-9.:_-]/g, '');
}
