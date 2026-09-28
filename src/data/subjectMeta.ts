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

/**
 * Nhánh học: web xoay quanh việc thi N3 (từ vựng, Kanji, đề JLPT); các môn IT/tiếng Anh
 * vẫn giữ nguyên nhưng lùi xuống hàng phụ trên trang chủ.
 */
export type SubjectTrack = 'n3' | 'it';

export interface SubjectMeta {
  id: string;
  track: SubjectTrack;
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
    id: 'mimi-n3-goi',
    track: 'n3',
    title: 'Mimi Kara Oboeru N3 Goi',
    japaneseTitle: '耳から覚える N3 語彙 (Chủ đề 1 - 12)',
    description:
      'Từ vựng N3 chuẩn giáo trình Mimi Kara Oboeru trọn bộ 12 chủ đề (Bài 1: 人間, Bài 2: 暮らし, Bài 3: 交通, Bài 4: 仕事,...). Vào học Flashcard trực tiếp!',
    category: 'Tiếng Nhật N3',
    icon: 'languages',
    gradient: 'from-emerald-600 to-teal-600',
    badge: 'Trọn bộ 12 Bài',
    totalLessons: 12,
    // Cập nhật theo bộ từ vựng 880 từ (12 Unit, đúng giáo trình) — xem Nhật ký ticket sửa lỗi
    // merge upstream 2026-09-08.
    totalItems: 880,
    isAvailable: true,
    isFlashcardOnly: true,
  },
  {
    id: 'kanji-master-n3',
    track: 'n3',
    title: 'Kanji Master N3',
    japaneseTitle: '漢字マスター N3 (Chương 1 - 10)',
    description:
      'Giáo trình Kanji Master N3 chuyên sâu, trọn bộ 10 chương. Luyện tập các chữ Kanji (âm Hán, số nét, cách đọc) và học từ vựng đi kèm bằng Flashcard sinh động.',
    category: 'Chữ Hán N3',
    icon: 'award',
    gradient: 'from-rose-600 to-red-600',
    badge: 'Chương 1 - 10',
    // Cập nhật theo dữ liệu mở rộng thêm Chương 1, 2, 9, 10 (47 bài, đúng
    // kanjiMasterN3Lessons.length) — xem Nhật ký ticket sửa lỗi merge upstream 2026-09-08.
    totalLessons: 47,
    totalItems: 846,
    isAvailable: true,
  },
  {
    id: 'try-n3',
    track: 'n3',
    title: 'TRY! N3 - Ngữ Pháp Tiếng Nhật',
    japaneseTitle: 'TRY! 日本語能力試験 N3 文法から伸ばす日本語',
    description:
      'Giáo trình Ngữ pháp N3 kinh điển theo phương pháp ngữ cảnh (Chương 1: Lần đầu leo núi Phú Sĩ). Học mẫu câu, cấu trúc, ví dụ song ngữ và luyện bài tập trắc nghiệm củng cố.',
    category: 'Ngữ pháp N3',
    icon: 'languages',
    gradient: 'from-blue-600 via-indigo-600 to-sky-600',
    badge: 'Chương 1',
    totalLessons: 1,
    totalItems: 170,
    isAvailable: true,
  },
  {
    id: 'nihon-it',
    track: 'it',
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
    id: 'jfe301',
    track: 'it',
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
  {
    id: 'eng-grade9-hw',
    track: 'it',
    title: 'Tiếng Anh Lớp 9 - Bài Tập Về Nhà & Từ Vựng',
    japaneseTitle: 'Grade 9 English Vocabulary & Homework',
    description:
      'Học từ vựng Tiếng Anh Lớp 9 linh hoạt theo 2 chế độ phân loại song song: Theo Chủ đề (Topic) và Theo Từ loại (Danh từ, Động từ, Tính từ,...). Tích hợp Flashcard và Bài tập Trắc nghiệm củng cố.',
    category: 'Tiếng Anh Lớp 9',
    icon: 'globe',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    badge: 'Lớp 9',
    totalLessons: 12,
    totalItems: 728,
    isAvailable: true,
  },
];

/**
 * Phạm vi học: một môn cụ thể, `'n3'` (gộp mọi môn thuộc nhánh N3) hay `'all'`.
 *
 * `'n3'` là "môn ảo": không có card riêng trên trang chủ và không có dữ liệu bài học của
 * riêng nó, nhưng đi qua được mọi chỗ nhận subjectId — nhờ vậy người luyện thi N3 ôn một
 * lượt cả từ vựng lẫn Kanji thay vì phải vào từng môn.
 */
export type SubjectScope = string | 'all' | 'n3';

export const N3_SCOPE = 'n3';

export function subjectsOfTrack(track: SubjectTrack): SubjectMeta[] {
  return subjectMeta.filter((s) => s.track === track);
}

export function isN3Subject(subjectId: string): boolean {
  return findSubjectMeta(subjectId)?.track === 'n3';
}

/** Môn ảo cho nhánh N3 — số liệu cộng dồn từ các môn N3 thật. */
export const n3ScopeMeta: SubjectMeta = {
  id: N3_SCOPE,
  track: 'n3',
  title: 'Luyện thi N3',
  japaneseTitle: 'N3 総合 (語彙 + 漢字)',
  description: 'Ôn gộp toàn bộ từ vựng và Kanji N3 theo lịch nhắc lại ngắt quãng.',
  category: 'Tiếng Nhật N3',
  icon: 'languages',
  gradient: 'from-emerald-600 to-teal-600',
  get totalLessons() {
    return subjectsOfTrack('n3').reduce((acc, s) => acc + s.totalLessons, 0);
  },
  get totalItems() {
    return subjectsOfTrack('n3').reduce((acc, s) => acc + s.totalItems, 0);
  },
  isAvailable: true,
};

export function findSubjectMeta(id: string): SubjectMeta | undefined {
  if (id === N3_SCOPE) return n3ScopeMeta;
  return subjectMeta.find((s) => s.id === id);
}

/** Khoá thẻ của môn này có nằm trong phạm vi đang xét không. */
export function subjectInScope(subjectId: string, scope: SubjectScope): boolean {
  if (scope === 'all') return true;
  if (scope === N3_SCOPE) return isN3Subject(subjectId);
  return subjectId === scope;
}

/** Tổng số thẻ/câu hỏi của một phạm vi (một môn, nhánh N3, hay tất cả). */
export function totalItemsOf(scope: SubjectScope): number {
  if (scope === 'all') return subjectMeta.reduce((acc, s) => acc + s.totalItems, 0);
  if (scope === N3_SCOPE) return subjectsOfTrack('n3').reduce((acc, s) => acc + s.totalItems, 0);
  return findSubjectMeta(scope)?.totalItems ?? 0;
}
