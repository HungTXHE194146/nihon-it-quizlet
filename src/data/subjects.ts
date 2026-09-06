import { lessons as nihonItLessons } from './lessons';
import { mimiN3Lessons } from './mimiN3FullData';
import { tryN3Lessons } from './tryN3Data';
import { jfe301Lessons } from './jfe301Data';
import { kanjiMasterN3Lessons } from './kanjiMasterN3Data';
import { allEngGrade9Lessons } from './engGrade9Data';
import type { Lesson } from './lessons';

export interface Subject {
  id: string;
  title: string;
  japaneseTitle?: string;
  description: string;
  category: string;
  icon: 'code' | 'languages' | 'globe' | 'database' | 'award';
  gradient: string;
  badge?: string;
  lessons: Lesson[];
  totalLessons: number;
  totalItems: number;
  isAvailable: boolean;
  isFlashcardOnly?: boolean;
}

export const subjects: Subject[] = [
  {
    id: 'try-n3',
    title: 'TRY! N3 - Ngữ Pháp Tiếng Nhật',
    japaneseTitle: 'TRY! 日本語能力試験 N3 文法から伸ばす日本語',
    description: 'Giáo trình Ngữ pháp N3 kinh điển theo phương pháp ngữ cảnh (Chương 1: Lần đầu leo núi Phú Sĩ). Học mẫu câu, cấu trúc, ví dụ song ngữ và luyện bài tập trắc nghiệm củng cố やっみよう!.',
    category: 'Ngữ pháp N3',
    icon: 'languages',
    gradient: 'from-blue-600 via-indigo-600 to-sky-600',
    badge: 'Mới - TRY! N3',
    lessons: tryN3Lessons,
    totalLessons: tryN3Lessons.length,
    totalItems: tryN3Lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
  },
  {
    id: 'eng-grade9-hw',
    title: 'Tiếng Anh Lớp 9 - Bài Tập Về Nhà & Từ Vựng',
    japaneseTitle: 'Grade 9 English Vocabulary & Homework',
    description: 'Học từ vựng Tiếng Anh Lớp 9 linh hoạt theo 2 chế độ phân loại song song: Theo Chủ đề (Topic) và Theo Từ loại (Danh từ, Động từ, Tính từ,...). Tích hợp Flashcard và Bài tập Trắc nghiệm củng cố.',
    category: 'Tiếng Anh Lớp 9',
    icon: 'globe',
    gradient: 'from-amber-500 via-orange-600 to-red-600',
    badge: 'Mới - Lớp 9',
    lessons: allEngGrade9Lessons,
    totalLessons: allEngGrade9Lessons.length,
    totalItems: allEngGrade9Lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
  },
  {
    id: 'nihon-it',
    title: 'JIT401 - Tiếng Nhật Chuyên Ngành CNTT',
    japaneseTitle: 'IT日本語 & 専門用語',
    description: 'Tổng hợp 20 bài học từ vựng, ngữ pháp, trắc nghiệm và bài giảng lý thuyết chuyên sâu về Công nghệ thông tin tiếng Nhật.',
    category: 'Tiếng Nhật & IT',
    icon: 'code',
    gradient: 'from-indigo-600 to-purple-600',
    badge: 'Phổ biến',
    lessons: nihonItLessons,
    totalLessons: nihonItLessons.length,
    totalItems: nihonItLessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
  },
  {
    id: 'mimi-n3-goi',
    title: 'Mimi Kara Oboeru N3 Goi',
    japaneseTitle: '耳から覚える N3 語彙 (Unit 1 - 12)',
    description: 'Từ vựng N3 chuẩn giáo trình Mimi Kara Oboeru trọn bộ 12 Unit (Unit 1: Danh từ A, Unit 2: Động từ A,... đến Unit 12: Phó từ & Liên từ). Vào học Flashcard trực tiếp!',
    category: 'Tiếng Nhật N3',
    icon: 'languages',
    gradient: 'from-emerald-600 to-teal-600',
    badge: 'Trọn bộ 12 Unit (880 từ)',
    lessons: mimiN3Lessons,
    totalLessons: mimiN3Lessons.length,
    totalItems: mimiN3Lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
    isFlashcardOnly: true,
  },
  {
    id: 'kanji-master-n3',
    title: 'Kanji Master N3',
    japaneseTitle: '漢字マスター N3 (Chương 1-10)',
    description: 'Giáo trình Kanji Master N3 chuyên sâu. Luyện tập các chữ Kanji (âm Hán, số nét, cách đọc) và học từ vựng đi kèm bằng Flashcard sinh động.',
    category: 'Chữ Hán N3',
    icon: 'award',
    gradient: 'from-rose-600 to-red-600',
    badge: 'Chương 1-10',
    lessons: kanjiMasterN3Lessons,
    totalLessons: kanjiMasterN3Lessons.length,
    totalItems: kanjiMasterN3Lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
  },
  {
    id: 'jfe301',
    title: 'JFE301 - English for IT',
    japaneseTitle: 'English IT Terminology',
    description: 'Ôn tập tiếng Anh chuyên ngành IT gồm 6 chương: Introduction, Computer Systems, System Development, Management, Network Technology, Database Technology.',
    category: 'Tiếng Anh IT',
    icon: 'globe',
    gradient: 'from-sky-600 to-blue-600',
    badge: '6 Chương',
    lessons: jfe301Lessons,
    totalLessons: jfe301Lessons.length,
    totalItems: jfe301Lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0),
    isAvailable: true,
  }
];


