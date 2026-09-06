import { kv, KEYS } from '../_lib/kv';
import { requireUser, jsonResponse } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * GET    -> danh sách đề JLPT đã nhập (khớp JlptImportFile ở mục 11.3 của tài liệu).
 * POST   -> thêm/ghi đè một đề (body = nguyên file JSON đã bóc từ tools/jlpt-import/).
 * DELETE ?id=... -> xoá một đề.
 *
 * Đề là KHO CHUNG cho mọi tài khoản, cố ý không tách theo người dùng: đề là học liệu, một
 * người nhập thì cả nhóm luyện được — thứ riêng tư của mỗi người là tiến độ (api/progress.ts),
 * không phải nội dung câu hỏi.
 *
 * Đổi lại, mỗi đề ghi nhớ `ownerId` của người đã nhập và chỉ người đó mới xoá/sửa được: kho
 * chung không có nghĩa là ai cũng được phép xoá công sức của người khác. Đề nhập từ trước khi
 * có tài khoản không mang ownerId — coi như của chung, ai cũng dọn được.
 */
interface StoredExamPayload {
  exam?: { id?: unknown };
  ownerId?: string;
  ownerName?: string;
}

export default async function handler(req: Request): Promise<Response> {
  const user = await requireUser(req);
  if (user instanceof Response) return user;

  if (req.method === 'GET') {
    const ids = (await kv.get<string[]>(KEYS.examIndex)) ?? [];
    if (ids.length === 0) return jsonResponse([], 200);
    const exams = await Promise.all(ids.map((id) => kv.get(KEYS.exam(id))));
    return jsonResponse(exams.filter((e) => e !== null), 200);
  }

  if (req.method === 'POST') {
    let body: StoredExamPayload | null;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: 'invalid_body' }, 400);
    }
    const id = body?.exam?.id;
    if (typeof id !== 'string' || id.length === 0) {
      return jsonResponse({ error: 'missing_exam_id', message: 'Thiếu body.exam.id' }, 400);
    }

    const existing = await kv.get<StoredExamPayload>(KEYS.exam(id));
    const denied = ownershipDenied(existing, user.id);
    if (denied) return denied;

    // ownerId do server gán từ cookie, không lấy từ body — nếu tin body thì ai cũng tự nhận
    // mình là chủ đề của người khác.
    await kv.set(KEYS.exam(id), { ...body, ownerId: user.id, ownerName: user.username });
    const ids = (await kv.get<string[]>(KEYS.examIndex)) ?? [];
    if (!ids.includes(id)) await kv.set(KEYS.examIndex, [...ids, id]);

    return jsonResponse({ ok: true, id }, 200);
  }

  if (req.method === 'DELETE') {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return jsonResponse({ error: 'missing_id' }, 400);

    const existing = await kv.get<StoredExamPayload>(KEYS.exam(id));
    const denied = ownershipDenied(existing, user.id);
    if (denied) return denied;

    await kv.del(KEYS.exam(id));
    const ids = (await kv.get<string[]>(KEYS.examIndex)) ?? [];
    await kv.set(
      KEYS.examIndex,
      ids.filter((x) => x !== id)
    );
    return jsonResponse({ ok: true }, 200);
  }

  return jsonResponse({ error: 'method_not_allowed' }, 405);
}

/** null = được phép; Response 403 = đề này của người khác. */
function ownershipDenied(existing: StoredExamPayload | null, userId: string): Response | null {
  if (!existing) return null; // đề mới, hoặc đã bị xoá rồi
  if (!existing.ownerId) return null; // đề từ thời chưa có tài khoản: của chung
  if (existing.ownerId === userId) return null;
  return jsonResponse(
    {
      error: 'forbidden',
      message: `Đề này do ${existing.ownerName ?? 'người khác'} nhập, bạn không sửa/xoá được.`,
    },
    403
  );
}
