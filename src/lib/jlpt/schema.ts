/**
 * Mô hình dữ liệu đề JLPT — khớp mục 10 và định dạng nhập ở mục 11.3 của
 * docs/jlpt-practice-test-research.md. Đừng sửa các type này mà không đọc lại tài liệu đó,
 * vì file nhập do AI khác soạn ở ngoài repo cũng phải khớp đúng hình dạng này.
 */

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type ScoringSection = 'gengo_chishiki' | 'dokkai' | 'choukai';

export const MONDAI_TYPES = [
  'kanji_yomi', 'hyouki', 'bunmyaku_kitei', 'iikae_ruigi', 'youhou',
  'bunpou_keishiki', 'bun_no_kumitate', 'bunshou_no_bunpou',
  'naiyou_tan', 'naiyou_chuu', 'naiyou_chou', 'jouhou_kensaku',
  'kadai_rikai', 'point_rikai', 'gaiyou_rikai', 'hatsuwa_hyougen', 'sokuji_outou',
] as const;
export type MondaiType = (typeof MONDAI_TYPES)[number];

export interface TimedBlock {
  id: string;
  label: string;
  labelEn?: string;
  minutes: number;
  mondai: MondaiType[];
}

export interface MondaiGroup {
  mondai: MondaiType;
  instruction: string;
  questionIds: string[];
}

export interface JlptExam {
  id: string;
  level: JlptLevel;
  title: string;
  blocks: TimedBlock[];
  groups: MondaiGroup[];
  questionIds: string[];
  source: 'original' | 'official-sample' | 'user-provided';
}

export interface JlptChoice {
  text: string;
  note?: string;
  linkedItemKey?: string;
}

export interface JlptQuestion {
  id: string;
  level: JlptLevel;
  mondai: MondaiType;
  scoringSection: ScoringSection;
  stem?: string;
  stemUnderline?: [number, number];
  choices: JlptChoice[];
  answerIndex: number;
  explanation?: string;
  furigana?: { text: string; reading: string }[];
  passageId?: string;
  audioId?: string;
  transcript?: string;
  transcriptAnswerSpan?: [number, number];
  grammarPoint?: string;
  confusableWith?: string[];
  vocabIds?: string[];
  kanjiChars?: string[];
}

/** Hình dạng của một file nhập (dán JSON / tải file), theo mục 11.3. */
export interface JlptImportFile {
  formatVersion: 1;
  exam: {
    id: string;
    level: JlptLevel;
    title: string;
    source?: 'original' | 'official-sample' | 'user-provided';
    blocks: TimedBlock[];
  };
  groups: MondaiGroup[];
  questions: JlptQuestion[];
}

/** Một đề đã lưu — gói cả file nhập gốc lẫn thông tin quản lý để hiện trong danh sách. */
export interface StoredJlptExam {
  exam: JlptExam;
  questions: JlptQuestion[];
  /** Đề do AI sinh chưa được người kiểm lại thì đánh dấu, không tính vào thống kê tiến bộ (mục 11.9). */
  reviewed: boolean;
  importedAt: number;
  updatedAt: number;
}
