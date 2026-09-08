import type { Lesson } from './lessons';
import { subjectMeta, findSubjectMeta, subjectsOfTrack, N3_SCOPE } from './subjectMeta';
import { registerSubjectItems } from '../lib/itemIndex';

/**
 * Nạp động dữ liệu bài học theo từng môn.
 *
 * Bốn file dữ liệu cộng lại gần 1 MB sau khi minify. Nạp hết ngay từ đầu chỉ để vẽ
 * trang chủ là lãng phí, nên mỗi môn nằm trong một chunk riêng và chỉ tải khi cần.
 */
const LOADERS: Record<string, () => Promise<Lesson[]>> = {
  'nihon-it': () => import('./lessons').then((m) => m.lessons),
  'mimi-n3-goi': () => import('./mimiN3FullData').then((m) => m.mimiN3Lessons),
  'kanji-master-n3': () => import('./kanjiMasterN3Data').then((m) => m.kanjiMasterN3Lessons),
  jfe301: () => import('./jfe301Data').then((m) => m.jfe301Lessons),
  'try-n3': () => import('./tryN3Data').then((m) => m.tryN3Lessons),
  // EngGrade9Selector tự nạp riêng dữ liệu của nó (đã nằm trong chunk lazy của chính nó) để
  // vẽ hai chế độ phân loại song song — đăng ký lại ở đây để route /study chung
  // (StudySession qua activeLessons) và việc gộp phạm vi 'all' vẫn thấy được môn này.
  'eng-grade9-hw': () => import('./engGrade9Data').then((m) => m.allEngGrade9Lessons),
};

const cache = new Map<string, Lesson[]>();
const inFlight = new Map<string, Promise<Lesson[]>>();

/** Dữ liệu môn này đã nằm sẵn trong bộ nhớ chưa. */
export function isSubjectLoaded(subjectId: string): boolean {
  return cache.has(subjectId);
}

export function getLoadedLessons(subjectId: string): Lesson[] {
  return cache.get(subjectId) ?? [];
}

export async function loadSubjectLessons(subjectId: string): Promise<Lesson[]> {
  const cached = cache.get(subjectId);
  if (cached) return cached;

  const pending = inFlight.get(subjectId);
  if (pending) return pending;

  const loader = LOADERS[subjectId];
  if (!loader) return [];

  const promise = loader()
    .then((lessons) => {
      cache.set(subjectId, lessons);
      inFlight.delete(subjectId);

      const meta = findSubjectMeta(subjectId);
      if (meta) {
        registerSubjectItems(subjectId, meta.title, lessons);

        if (import.meta.env.DEV) {
          // Số liệu trên trang chủ là hằng số tĩnh; cảnh báo sớm khi dữ liệu đã đổi.
          const items = lessons.reduce(
            (acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0),
            0
          );
          if (items !== meta.totalItems || lessons.length !== meta.totalLessons) {
            console.warn(
              `[subjectMeta] "${subjectId}" lệch số liệu: thực tế ${lessons.length} bài / ${items} mục, ` +
                `khai báo ${meta.totalLessons} bài / ${meta.totalItems} mục. Hãy cập nhật src/data/subjectMeta.ts.`
            );
          }
        }
      }
      return lessons;
    })
    .catch((err) => {
      inFlight.delete(subjectId);
      throw err;
    });

  inFlight.set(subjectId, promise);
  return promise;
}

/**
 * Các môn THẬT nằm trong một phạm vi: `'all'`, `'n3'` (nhánh luyện thi N3), hoặc chính một
 * mã môn. Phiên ôn gộp và sổ tay câu sai đi qua đây nên chỉ cần nạp đúng phần cần thiết —
 * ôn N3 không phải kéo theo gần 1 MB dữ liệu của các môn IT.
 */
export function subjectIdsInScope(scope: string): string[] {
  if (scope === 'all') return subjectMeta.map((s) => s.id);
  if (scope === N3_SCOPE) return subjectsOfTrack('n3').map((s) => s.id);
  return [scope];
}

/** Nạp dữ liệu của cả một phạm vi — phiên ôn gộp N3 cần cả từ vựng lẫn Kanji. */
export async function loadScopeLessons(scope: string): Promise<Lesson[]> {
  const ids = subjectIdsInScope(scope);
  const all = await Promise.all(ids.map((id) => loadSubjectLessons(id)));
  return all.flat();
}

export function isScopeLoaded(scope: string): boolean {
  return subjectIdsInScope(scope).every((id) => cache.has(id));
}

export function getLoadedScopeLessons(scope: string): Lesson[] {
  return subjectIdsInScope(scope).flatMap((id) => cache.get(id) ?? []);
}

