/**
 * Sổ đăng ký phẳng các câu hỏi / thẻ từ vựng đã được nạp.
 *
 * Tiến độ SRS và sổ tay câu sai cần tra ngược từ khoá đã lưu về nội dung câu hỏi.
 * Dữ liệu từng môn được nạp động nên chỉ mục này lớn dần: `subjectLoader` gọi
 * `registerSubjectItems` mỗi khi một môn được tải xong.
 *
 * Id chỉ duy nhất trong phạm vi từng môn, nên khoá lưu trữ luôn là `subjectId::itemId`.
 */

import type { Lesson, StudyItem } from '../data/lessons';

export interface IndexedItem {
  key: string;
  item: StudyItem;
  subjectId: string;
  subjectTitle: string;
  lessonId: number;
  lessonTitle: string;
  sectionId: string;
  sectionTitle: string;
  sectionType: 'vocabulary' | 'multiple_choice';
}

export function cardKey(subjectId: string, itemId: string): string {
  return `${subjectId}::${itemId}`;
}

/** Tách phần mã môn ra khỏi khoá thẻ, dùng khi chưa nạp dữ liệu của môn đó. */
export function subjectIdFromKey(key: string): string {
  const idx = key.indexOf('::');
  return idx === -1 ? '' : key.slice(0, idx);
}

export const itemByKey = new Map<string, IndexedItem>();

const registered = new Set<string>();

/** Đưa toàn bộ mục của một môn vào chỉ mục. Gọi lại nhiều lần là vô hại. */
export function registerSubjectItems(
  subjectId: string,
  subjectTitle: string,
  lessons: Lesson[]
): void {
  if (registered.has(subjectId)) return;
  registered.add(subjectId);

  for (const lesson of lessons) {
    for (const section of lesson.sections) {
      for (const item of section.items) {
        const entry: IndexedItem = {
          key: cardKey(subjectId, item.id),
          item,
          subjectId,
          subjectTitle,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          sectionId: section.id,
          sectionTitle: section.title,
          sectionType: section.type,
        };
        itemByKey.set(entry.key, entry);
      }
    }
  }
}

export function isSubjectIndexed(subjectId: string): boolean {
  return registered.has(subjectId);
}

/** Ngôn ngữ đọc của một môn: dùng cho phát âm và cho nhãn giao diện. */
export function subjectLang(subjectId: string): 'ja' | 'en' {
  return subjectId === 'jfe301' ? 'en' : 'ja';
}
