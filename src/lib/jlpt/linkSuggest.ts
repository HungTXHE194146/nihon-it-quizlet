/**
 * Dò `linkedItemKey` còn thiếu bằng cách khớp `text` của phương án với thẻ đã có trong kho
 * (Mimi N3 + Kanji Master N3) — theo mục 11.3: "ứng dụng tự thử dò theo text trong kho thẻ
 * hiện có và đề xuất khớp ở màn xem trước".
 *
 * Chỉ khớp CHÍNH XÁC theo `term` sau khi trim — dò mờ (fuzzy) dễ gán nhầm thẻ, mà gán nhầm còn
 * tệ hơn không gán, vì nó kéo nhầm thẻ vào hàng ôn của người học.
 */

import { loadSubjectLessons } from '../../data/subjectLoader';
import { itemByKey, cardKey } from '../itemIndex';
import type { JlptQuestion } from './schema';

const LINKABLE_SUBJECTS = ['mimi-n3-goi', 'kanji-master-n3'];

let termIndex: Map<string, string> | null = null;

async function buildTermIndex(): Promise<Map<string, string>> {
  if (termIndex) return termIndex;
  await Promise.all(LINKABLE_SUBJECTS.map((id) => loadSubjectLessons(id)));

  const map = new Map<string, string>();
  for (const [key, entry] of itemByKey) {
    if (!LINKABLE_SUBJECTS.includes(entry.subjectId)) continue;
    const term = entry.item.term?.trim();
    if (term && !map.has(term)) map.set(term, key);
  }
  termIndex = map;
  return map;
}

export interface LinkSuggestions {
  /** questionId -> choiceIndex -> khoá thẻ đề xuất (chỉ cho phương án đang thiếu linkedItemKey). */
  suggestions: Map<string, Map<number, string>>;
  matchedCount: number;
  totalChoiceCount: number;
}

export async function suggestLinkedItemKeys(questions: JlptQuestion[]): Promise<LinkSuggestions> {
  const index = await buildTermIndex();
  const suggestions = new Map<string, Map<number, string>>();
  let matchedCount = 0;
  let totalChoiceCount = 0;

  for (const q of questions) {
    q.choices.forEach((choice, i) => {
      totalChoiceCount += 1;
      if (choice.linkedItemKey) {
        matchedCount += 1;
        return;
      }
      const key = index.get(choice.text.trim());
      if (key) {
        matchedCount += 1;
        if (!suggestions.has(q.id)) suggestions.set(q.id, new Map());
        suggestions.get(q.id)!.set(i, key);
      }
    });
  }

  return { suggestions, matchedCount, totalChoiceCount };
}

/** Dùng lại `cardKey` để component không phải import riêng từ itemIndex. */
export { cardKey };
