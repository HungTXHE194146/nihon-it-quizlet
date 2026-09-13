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
  /** File nghe 聴解 (nếu đề đã có audio) — xem `JlptAudioTrack`. */
  audio?: JlptAudioTrack[];
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
  /** 聴解: trỏ tới `JlptAudioTrack.id` của đề (một file nghe liền cho cả khối). */
  audioId?: string;
  /** 聴解: lời thoại, mỗi dòng một câu nói (tách bằng "\n") — chỉ hiện SAU khi đã trả lời. */
  transcript?: string;
  /** Khoảng ký tự [từ, tới) trong `transcript` chứa căn cứ cho đáp án — tô sáng lúc mổ xẻ. */
  transcriptAnswerSpan?: [number, number];
  /** 聴解: vị trí của câu này trong file nghe. Thiếu = đề chưa căn mốc, phát audio không được. */
  audioSegment?: AudioSegment;
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

// ─── 聴解: file nghe và mốc thời gian ────────────────────────────────

/**
 * Một file nghe liền cho cả khối 聴解 — đúng như băng thi thật (hướng dẫn, ví dụ, 問題1…5,
 * khoảng lặng chọn đáp án), không cắt nhỏ theo câu. Lúc thi phát liền từ đầu tới cuối; lúc
 * mổ xẻ thì nhảy tới `AudioSegment` của từng câu trong chính file này.
 */
export interface JlptAudioTrack {
  id: string;
  /**
   * Khoá object trên kho audio R2, vd. "choukai/n3-2020-12.3f9a1c2b.mp3" — KHÔNG phải URL.
   * Kho đóng hoàn toàn; link tải được ký tạm qua /api/jlpt/audio cho tài khoản đã đăng nhập.
   * Tên có hash nội dung nên bản đã tải về máy dùng được mãi, encode lại là tự đổi khoá.
   */
  key: string;
  durationSec: number;
  bytes: number;
}

/** Mốc (giây) của một dòng lời thoại — cùng thứ tự với các dòng của `JlptQuestion.transcript`. */
export interface AudioLine {
  start: number;
  end: number;
}

/**
 * Vị trí một câu 聴解 trong file nghe (giây, tính từ đầu file): start ≤ speechEnd ≤ end.
 * Sinh tự động bởi tools/jlpt-audio (nhận dạng giọng nói rồi khớp với transcript).
 */
export interface AudioSegment {
  /** Tiếng "N番" — lúc thi, màn hình chuyển sang câu này đúng mốc này. */
  start: number;
  /** Hết phần nói — nghe lại lúc mổ xẻ dừng ở đây, không bắt ngồi chờ khoảng lặng chọn đáp án. */
  speechEnd: number;
  /** Hết khoảng lặng chọn đáp án (thường trùng `start` của câu kế tiếp). */
  end: number;
  /** Mốc từng dòng của `transcript`; `null` = dòng đó không căn được mốc. */
  lines?: (AudioLine | null)[];
  /** Độ khớp 0–1 của bước căn mốc tự động. Thấp = nên nghe soát lại trước khi tin. */
  confidence?: number;
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
    /** Tuỳ chọn — file nghe 聴解 đã tải lên kho audio. */
    audio?: JlptAudioTrack[];
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
  /**
   * 聴解: bài bị gián đoạn đúng lúc đang nghe câu này, nên khi quay lại câu này được phát lại
   * từ đầu — tức là người học đã nghe nó hơn một lần. Kết quả vẫn tính, nhưng mổ xẻ cần biết.
   */
  heardTwice?: boolean;
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
  /**
   * Phiên nhấm nháp nhắm vào một nhóm 問題 cụ thể thay vì nhóm đầu tiên của đề — dùng cho phiên
   * nghe ngắn 問題5 即時応答 (mục 7.4 tài liệu thiết kế).
   */
  tasteMondai?: MondaiType;
  /**
   * Tiến độ phát file nghe ở chế độ thi (khoá tua). Chỉ chốt MỐC ĐẦU CÂU đang nghe, không
   * ghi từng giây: bị gián đoạn thì quay lại phát từ đầu câu đó, không phát nối giữa đoạn hội
   * thoại — nghe nửa sau của một đoạn hội thoại thì không trả lời được gì.
   */
  listening?: {
    /** Giây trong file nghe sẽ phát tiếp khi quay lại. */
    resumeAt: number;
    /** Đã sang phần nghe (chế độ trọn đề): các câu phần đọc bị khoá, giống thu bài đọc ở đề thật. */
    started: boolean;
    /** File đã phát hết — chỉ còn nộp bài. */
    finished?: boolean;
  };
}

// ─── Sổ tay lỗi riêng cho JLPT (mục 6.2-6.4) ─────────────────────────

export type MistakeCause = 'goi' | 'bunpou' | 'kanji' | 'dokkai' | 'choukai' | 'wana' | 'bat_can' | 'het_gio' | 'doan_mo';

export const MISTAKE_CAUSES: { code: MistakeCause; label: string; hint: string }[] = [
  { code: 'goi', label: 'Không biết từ', hint: 'Thiếu từ vựng' },
  { code: 'bunpou', label: 'Không nắm ngữ pháp', hint: 'Chưa biết, hoặc lẫn hai mẫu gần nghĩa' },
  { code: 'kanji', label: 'Sai chữ Hán', hint: 'Đọc sai âm, nhầm chữ giống nhau' },
  { code: 'dokkai', label: 'Hiểu sai đoạn văn', hint: 'Đọc lướt, bỏ sót từ nối, hiểu ngược ý' },
  { code: 'choukai', label: 'Nghe sót / nghe nhầm', hint: 'Không kịp, nhầm âm gần giống' },
  { code: 'wana', label: 'Dính bẫy đề', hint: 'Đáp án "trông có vẻ đúng"' },
  { code: 'bat_can', label: 'Bất cẩn', hint: 'Biết mà chọn nhầm' },
  { code: 'het_gio', label: 'Không kịp giờ', hint: 'Chưa kịp đọc đã phải đoán' },
  // Không phải một "nguyên nhân" hiểu theo nghĩa 7 dòng trên (thiếu kiến thức gì cụ thể) — đây
  // là tự nhận đã đoán mò ngay từ lúc làm bài (`Confidence: 'guess'`), nên bước 2 mổ xẻ tự gán
  // sẵn nhãn này khi rút gọn quy trình (ticket 010 hướng 2). Vẫn thêm vào danh sách chọn thủ
  // công ở bước 2, vì "tôi cũng chẳng nhớ vì sao chọn" là một câu trả lời trung thực, có thật.
  { code: 'doan_mo', label: 'Đoán mò', hint: 'Không nhớ lý do — chọn đại lúc làm bài' },
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
  /**
   * 聴解: bậc trợ giúp cao nhất đã mở trước khi đoán lại ở bước 1 mổ xẻ — 1 = chỉ nghe lại,
   * 2 = nghe chậm/lặp đoạn, 3 = xem lời thoại. Bậc cần tới chính là chẩn đoán: nghe lại lần
   * hai đã đúng thì lỗi nằm ở tập trung/tốc độ, phải đọc chữ mới hiểu thì lỗi nằm ở nhận âm.
   */
  listenHintLevel?: 1 | 2 | 3;
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
