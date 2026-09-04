import type { Lesson } from './lessons';

/**
 * Thông tin mô tả môn học, tách khỏi dữ liệu bài học.
 *
 * Trang chủ chỉ cần chừng này để vẽ danh sách môn, nhờ vậy lần vào trang đầu tiên
 * không phải tải ~945 KB dữ liệu của cả 4 môn. Dữ liệu bài học được nạp động
 * qua `subjectLoader.ts` khi người dùng thực sự mở một môn.
 *
 * `totalLessons` / `totalItems` vì thế là con số tĩnh; khi dữ liệu của một môn được nạp,
 * `subjectLoader` sẽ đối chiếu lại và cảnh báo trong console nếu lệch (chỉ ở chế độ dev).
 */
export interface SubjectMeta {
  id: string;
  title: string;
  japaneseTitle?: string;
  description: string;
  category: string;
  icon: 'code' | 'languages' | 'globe' | 'database' | 'award';
  gradient: string;
  badge?: string;
  totalLessons: number;
  totalItems: number;
  isAvailable: boolean;
  isFlashcardOnly?: boolean;
}

/** Kiểu môn học đã kèm dữ liệu bài, dùng sau khi nạp xong. */
export interface Subject extends SubjectMeta {
  lessons: Lesson[];
}

export const subjectMeta: SubjectMeta[] = [
  {
    id: 'nihon-it',
    title: 'JIT401 - Tiếng Nhật Chuyên Ngành CNTT',
    japaneseTitle: 'IT日本語 & 専門用語',
    description:
      'Tổng hợp 20 bài học từ vựng, ngữ pháp, trắc nghiệm và bài giảng lý thuyết chuyên sâu về Công nghệ thông tin tiếng Nhật.',
    category: 'Tiếng Nhật & IT',
    icon: 'code',
    gradient: 'from-indigo-600 to-purple-600',
    badge: 'Phổ biến',
    totalLessons: 20,
    totalItems: 1054,
    isAvailable: true,
  },
  {
    id: 'mimi-n3-goi',
    title: 'Mimi Kara Oboeru N3 Goi',
    japaneseTitle: '耳から覚える N3 語彙 (Chủ đề 1 - 12)',
    description:
      'Từ vựng N3 chuẩn giáo trình Mimi Kara Oboeru trọn bộ 12 chủ đề (Bài 1: 人間, Bài 2: 暮らし, Bài 3: 交通, Bài 4: 仕事,...). Vào học Flashcard trực tiếp!',
    category: 'Tiếng Nhật N3',
    icon: 'languages',
    gradient: 'from-emerald-600 to-teal-600',
    badge: 'Trọn bộ 12 Bài',
    totalLessons: 12,
    totalItems: 1066,
    isAvailable: true,
    isFlashcardOnly: true,
  },
  {
    id: 'kanji-master-n3',
    title: 'Kanji Master N3',
    japaneseTitle: '漢字マスター N3 (Chương 3, 4, 5 & 6)',
    description:
      'Giáo trình Kanji Master N3 chuyên sâu. Luyện tập các chữ Kanji (âm Hán, số nét, cách đọc) và học từ vựng đi kèm bằng Flashcard sinh động.',
    category: 'Chữ Hán N3',
    icon: 'award',
    gradient: 'from-rose-600 to-red-600',
    badge: 'Chương 3, 4, 5 & 6',
    totalLessons: 30,
    totalItems: 529,
    isAvailable: true,
  },
  {
    id: 'jfe301',
    title: 'JFE301 - English for IT',
    japaneseTitle: 'English IT Terminology',
    description:
      'Ôn tập tiếng Anh chuyên ngành IT gồm 6 chương: Introduction, Computer Systems, System Development, Management, Network Technology, Database Technology.',
    category: 'Tiếng Anh IT',
    icon: 'globe',
    gradient: 'from-sky-600 to-blue-600',
    badge: '6 Chương',
    totalLessons: 6,
    totalItems: 440,
    isAvailable: true,
  },
];

export function findSubjectMeta(id: string): SubjectMeta | undefined {
  return subjectMeta.find((s) => s.id === id);
}

/** Tổng số thẻ/câu hỏi của một môn, hoặc của tất cả khi truyền "all". */
export function totalItemsOf(subjectId: string | 'all'): number {
  if (subjectId === 'all') return subjectMeta.reduce((acc, s) => acc + s.totalItems, 0);
  return findSubjectMeta(subjectId)?.totalItems ?? 0;
}
