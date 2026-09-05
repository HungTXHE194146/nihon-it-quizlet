import { kv, KEYS } from '../_lib/kv';
import { requireAuth, jsonResponse } from '../_lib/requireAuth';

export const config = { runtime: 'edge' };

/**
 * GET    -> danh sách đề JLPT đã nhập (khớp JlptImportFile ở mục 11.3 của tài liệu).
 * POST   -> thêm/ghi đè một đề (body = nguyên file JSON đã bóc từ tools/jlpt-import/).
 * DELETE ?id=... -> xoá một đề.
 */
export default async function handler(req: Request): Promise<Response> {
  const denied = await requireAuth(req);
  if (denied) return denied;

  if (req.method === 'GET') {
    const ids = (await kv.get<string[]>(KEYS.examIndex)) ?? [];
    if (ids.length === 0) return jsonResponse([], 200);
    const exams = await Promise.all(ids.map((id) => kv.get(KEYS.exam(id))));
    return jsonResponse(exams.filter((e) => e !== null), 200);
  }

  if (req.method === 'POST') {
    let body: { exam?: { id?: unknown } } | null;
    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: 'invalid_body' }, 400);
    }
    const id = body?.exam?.id;
    if (typeof id !== 'string' || id.length === 0) {
      return jsonResponse({ error: 'missing_exam_id', message: 'Thiếu body.exam.id' }, 400);
    }

    await kv.set(KEYS.exam(id), body);
    const ids = (await kv.get<string[]>(KEYS.examIndex)) ?? [];
    if (!ids.includes(id)) await kv.set(KEYS.examIndex, [...ids, id]);

    return jsonResponse({ ok: true, id }, 200);
  }

  if (req.method === 'DELETE') {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return jsonResponse({ error: 'missing_id' }, 400);

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
