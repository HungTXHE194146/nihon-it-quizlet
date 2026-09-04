import type { Lesson } from './lessons';
import { subjectMeta, findSubjectMeta } from './subjectMeta';
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

/** Nạp toàn bộ các môn — dùng cho phiên ôn gộp và sổ tay câu sai. */
export async function loadAllSubjects(): Promise<Lesson[]> {
  const all = await Promise.all(subjectMeta.map((s) => loadSubjectLessons(s.id)));
  return all.flat();
}

export function areAllSubjectsLoaded(): boolean {
  return subjectMeta.every((s) => cache.has(s.id));
}

/** Toàn bộ bài học của các môn đã nạp, dùng để dựng ngay khi cache còn nóng. */
export function getAllLoadedLessons(): Lesson[] {
  return subjectMeta.flatMap((s) => cache.get(s.id) ?? []);
}
