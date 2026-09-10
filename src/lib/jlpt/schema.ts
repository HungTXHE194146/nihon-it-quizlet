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

/** 読解: nhiều câu cùng trỏ về một đoạn văn (mục 7.3 và mục 10). */
export interface Passage {
  id: string;
  level: JlptLevel;
  kind: 'tan' | 'chuu' | 'chou' | 'jouhou';
  text: string;
  source?: string;
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
  /** Tuỳ chọn — chỉ cần khi có câu 読解 dùng chung đoạn văn. */
  passages?: Passage[];
}

/** Một đề đã lưu — gói cả file nhập gốc lẫn thông tin quản lý để hiện trong danh sách. */
export interface StoredJlptExam {
  exam: JlptExam;
  questions: JlptQuestion[];
  passages: Passage[];
  /** Đề do AI sinh chưa được người kiểm lại thì đánh dấu, không tính vào thống kê tiến bộ (mục 11.9). */
  reviewed: boolean;
  importedAt: number;
  updatedAt: number;
}

// ─── Lượt làm bài (mục 10) ───────────────────────────────────────────

export type Confidence = 'sure' | 'unsure' | 'guess';

export interface JlptAnswer {
  questionId: string;
  chosenIndex: number | null;
  confidence: Confidence;
  flagged: boolean;
  timeSpentMs: number;
  changeCount: number;
}

export type AttemptStatus = 'running' | 'paused' | 'submitted' | 'reviewing' | 'reviewed' | 'abandoned';
export type AttemptMode = 'taste' | 'section' | 'full';

export interface JlptAttempt {
  id: string;
  examId: string;
  level: JlptLevel;
  status: AttemptStatus;
  mode: AttemptMode;
  /**
   * Khối tính giờ đã chọn khi `mode === 'section'` (và nhãn của nó, chốt sẵn).
   *
   * Chốt nhãn ngay lúc tạo lượt để trang chủ trả lời được câu "mình đang làm tới phần nào
   * của đề" mà KHÔNG phải nạp nội dung đề (mỗi đề cả trăm KB, trang chủ liệt kê nhiều đề
   * cùng lúc) — cùng lý do với `scorePercent`/`wrongQuestionIds`.
   */
  blockId?: string;
  blockLabel?: string;
  /** Câu hỏi thuộc phiên này, theo đúng thứ tự làm bài (phụ thuộc mode). */
  questionIds: string[];
  startedAt: number;
  submittedAt?: number;
  /**
   * Hạn nộp bài (epoch ms), tính lúc `createAttempt()` từ tổng phút của (các) khối tính giờ
   * liên quan — xem `attemptLogic.ts`. `undefined` = không có áp lực thời gian gắt (mode
   * `taste`, mục 5.1: phiên "nhấm nháp" cố ý không đếm ngược). Lưu thẳng vào attempt (không
   * tính lại mỗi lần mở màn) để F5/đóng tab quay lại vẫn tính đúng giờ còn lại, giống cách
   * `ExamSession.tsx` lưu `deadline` vào phiên đang làm dở của mình.
   */
  deadline?: number;
  answers: Record<string, JlptAnswer>;
  predictedPercent?: number;
  reviewedQuestionIds: string[];
  /**
   * Chủ sở hữu lượt làm bài: id tài khoản, hoặc null/thiếu = làm ở chế độ khách.
   *
   * Đề là kho chung nhưng LƯỢT LÀM BÀI là của riêng từng người, kể cả khi nhiều người
   * dùng chung một trình duyệt — xem src/lib/jlpt/db.ts.
   */
  ownerId?: string | null;
  /** % đúng lúc nộp bài, chốt sẵn để trang chủ khỏi phải nạp lại cả đề để tính điểm. */
  scorePercent?: number;
  /**
   * Các câu làm sai, chốt sẵn lúc nộp bài.
   *
   * Cùng lý do với `scorePercent`: biết "còn bao nhiêu câu chưa mổ xẻ" (hiệu số với
   * `reviewedQuestionIds`) mà không phải nạp lại cả đề — trang chủ và danh sách đề cần con
   * số này cho mọi đề cùng lúc. Lượt làm bài từ trước khi có trường này sẽ thiếu, khi đó
   * phải tính lại bằng `scoreAttempt()` — xem `wrongIdsOf()` trong attemptLogic.ts.
   */
  wrongQuestionIds?: string[];
}

// ─── Sổ tay lỗi riêng cho JLPT (mục 6.2-6.4) ─────────────────────────

export type MistakeCause = 'goi' | 'bunpou' | 'kanji' | 'dokkai' | 'choukai' | 'wana' | 'bat_can' | 'het_gio';

export const MISTAKE_CAUSES: { code: MistakeCause; label: string; hint: string }[] = [
  { code: 'goi', label: 'Không biết từ', hint: 'Thiếu từ vựng' },
  { code: 'bunpou', label: 'Không nắm ngữ pháp', hint: 'Chưa biết, hoặc lẫn hai mẫu gần nghĩa' },
  { code: 'kanji', label: 'Sai chữ Hán', hint: 'Đọc sai âm, nhầm chữ giống nhau' },
  { code: 'dokkai', label: 'Hiểu sai đoạn văn', hint: 'Đọc lướt, bỏ sót từ nối, hiểu ngược ý' },
  { code: 'choukai', label: 'Nghe sót / nghe nhầm', hint: 'Không kịp, nhầm âm gần giống' },
  { code: 'wana', label: 'Dính bẫy đề', hint: 'Đáp án "trông có vẻ đúng"' },
  { code: 'bat_can', label: 'Bất cẩn', hint: 'Biết mà chọn nhầm' },
  { code: 'het_gio', label: 'Không kịp giờ', hint: 'Chưa kịp đọc đã phải đoán' },
];

export interface MistakeEntry {
  id: string;
  /** Chủ sở hữu — cùng quy ước với JlptAttempt.ownerId. */
  ownerId?: string | null;
  questionId: string;
  examId: string;
  attemptId: string;
  createdAt: number;
  cause: MistakeCause;
  confidenceAtAnswer: Confidence;
  chosenIndex: number | null;
  reattemptIndex?: number | null;
  myRule?: string;
  myExample?: string;
  /** Khoá thẻ SRS liên quan, nếu câu này (hoặc đáp án đúng) nối được với thẻ đã có. */
  srsKey?: string;
}

// ─── Báo lỗi nội dung câu hỏi (đề do AI soạn có thể sai — vd. gạch chân lệch) ────────

export type ReportIssueType = 'underline' | 'answer' | 'typo' | 'other';

export const REPORT_ISSUE_TYPES: { code: ReportIssueType; label: string }[] = [
  { code: 'underline', label: 'Gạch chân sai vị trí' },
  { code: 'answer', label: 'Đáp án hoặc lời giải sai' },
  { code: 'typo', label: 'Lỗi chính tả / nội dung câu hỏi' },
  { code: 'other', label: 'Khác' },
];

/**
 * Một câu bị người học báo lỗi trong lúc làm bài — KHÔNG gắn với tài khoản (đề dùng chung
 * cả máy, lỗi nội dung là thuộc tính của đề, không phải của người học), khác với
 * `MistakeEntry` (sổ tay lỗi CỦA một người). Mục đích duy nhất: gom lại để xuất thành lời
 * nhắc cho một AI khác sửa trực tiếp trên JSON gốc — xem `buildFixPrompt` (aiPrompt.ts).
 */
export interface QuestionReport {
  id: string;
  examId: string;
  questionId: string;
  createdAt: number;
  issueType: ReportIssueType;
  note: string;
  /** Chụp lại `stem` lúc báo lỗi — báo cáo vẫn đọc hiểu được dù đề bị sửa/xoá sau đó. */
  stemSnapshot?: string;
}
