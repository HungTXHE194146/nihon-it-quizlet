/**
 * Chỉ mục phẳng toàn bộ câu hỏi / thẻ từ vựng của mọi môn học.
 *
 * Tiến độ SRS và sổ tay câu sai cần tra ngược từ một khoá đã lưu về nội dung câu hỏi,
 * kể cả khi người dùng đang không mở môn đó. Id trong dữ liệu chỉ duy nhất trong phạm vi
 * từng môn, nên khoá lưu trữ luôn là composite `subjectId::itemId`.
 */

import { subjects } from '../data/subjects';
import type { StudyItem } from '../data/lessons';

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

export const allItems: IndexedItem[] = [];
export const itemByKey = new Map<string, IndexedItem>();

for (const subject of subjects) {
  for (const lesson of subject.lessons) {
    for (const section of lesson.sections) {
      for (const item of section.items) {
        const entry: IndexedItem = {
          key: cardKey(subject.id, item.id),
          item,
          subjectId: subject.id,
          subjectTitle: subject.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          sectionId: section.id,
          sectionTitle: section.title,
          sectionType: section.type,
        };
        allItems.push(entry);
        itemByKey.set(entry.key, entry);
      }
    }
  }
}

/** Ngôn ngữ đọc của một môn: dùng cho phát âm và cho nhãn giao diện. */
export function subjectLang(subjectId: string): 'ja' | 'en' {
  return subjectId === 'jfe301' ? 'en' : 'ja';
}
