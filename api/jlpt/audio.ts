import { requireUser, jsonResponse } from '../_lib/requireAuth';
import { presignR2, r2ConfigFromEnv } from '../_lib/r2';

export const config = { runtime: 'edge' };

/**
 * GET ?key=choukai/<examId>.<hash>.mp3 -> { url, expiresAt }: link tải file nghe 聴解, ký tạm.
 *
 * File nghe là đề thật (có bản quyền) nên KHÔNG để công khai: kho R2 đóng hoàn toàn, chỉ tài
 * khoản đã đăng nhập mới xin được link, và link tự hết hạn. Trình duyệt tải thẳng từ R2 bằng
 * link đó — Vercel chỉ ký, không chuyển tiếp byte nào.
 *
 * Hạn 6 giờ: đủ dài để tải xong rồi làm trọn khối 聴解 40 phút kể cả mạng chậm, đủ ngắn để
 * một link lỡ bị chia sẻ ra ngoài cũng không dùng được lâu. Bản tải về được giữ trong Cache
 * Storage của trình duyệt (xem src/lib/jlpt/audio.ts), nên hết hạn link không làm gián đoạn bài.
 */

/** Chỉ ký đúng dạng khoá mà tools/jlpt-audio tạo ra — không thành "ký hộ bất cứ file nào trong kho". */
const KEY_PATTERN = /^choukai\/[a-z0-9][a-z0-9-]{0,80}\.[a-f0-9]{8}\.mp3$/;
const LINK_TTL_SEC = 6 * 60 * 60;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') return jsonResponse({ error: 'method_not_allowed' }, 405);

  const user = await requireUser(req);
  if (user instanceof Response) return user;

  const key = new URL(req.url).searchParams.get('key') ?? '';
  if (!KEY_PATTERN.test(key)) {
    return jsonResponse({ error: 'invalid_key', message: `Khoá file nghe không hợp lệ: "${key}".` }, 400);
  }

  const cfg = r2ConfigFromEnv();
  if (!cfg) {
    return jsonResponse(
      {
        error: 'audio_not_configured',
        message: 'Server chưa được cấu hình kho audio (thiếu biến R2_*). Xem mục R2 trong api/README.md.',
      },
      503
    );
  }

  const url = await presignR2(cfg, 'GET', key, LINK_TTL_SEC);
  return new Response(JSON.stringify({ url, expiresAt: Date.now() + LINK_TTL_SEC * 1000 }), {
    status: 200,
    headers: { 'content-type': 'application/json', 'cache-control': 'private, no-store' },
  });
}
