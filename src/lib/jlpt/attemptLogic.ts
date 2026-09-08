/**
 * Logic thuần cho một lượt làm bài — tách khỏi component để dễ kiểm tra và đọc.
 * Theo mục 5.1 (chọn cỡ phiên), 5.3 (chấm theo phần), và 6.3 (ma trận chắc chắn × đúng/sai).
 */

import type {
  JlptExam,
  JlptQuestion,
  JlptAttempt,
  AttemptMode,
  ScoringSection,
  Confidence,
} from './schema';
import { review, withIntervalDays, dropEaseExtra, asFreshLearning } from '../srs';
import type { CardState } from '../srs';

/** Cỡ phiên mặc định là NHỎ NHẤT theo mục 5.1 — hạ chi phí khởi động. */
export const DEFAULT_ATTEMPT_MODE: AttemptMode = 'taste';

/** Câu hỏi thuộc phiên, theo mode đã chọn. `blockId` chỉ cần khi mode = 'section'. */
export function questionIdsForMode(exam: JlptExam, mode: AttemptMode, blockId?: string): string[] {
  if (mode === 'full') return exam.questionIds;

  if (mode === 'section' && blockId) {
    const block = exam.blocks.find((b) => b.id === blockId);
    if (!block) return exam.questionIds;
    const mondaiInBlock = new Set(block.mondai);
    return exam.groups.filter((g) => mondaiInBlock.has(g.mondai)).flatMap((g) => g.questionIds);
  }

  // 'taste': chỉ nhóm 問題 đầu tiên — vài câu, đủ để thử mà không tốn nhiều thời gian.
  return exam.groups[0]?.questionIds ?? exam.questionIds.slice(0, 5);
}

function newAttemptId(): string {
  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createAttempt(exam: JlptExam, mode: AttemptMode, blockId?: string): JlptAttempt {
  return {
    id: newAttemptId(),
    examId: exam.id,
    level: exam.level,
    status: 'running',
    mode,
    questionIds: questionIdsForMode(exam, mode, blockId),
    startedAt: Date.now(),
    answers: {},
    reviewedQuestionIds: [],
  };
}

export interface SectionScore {
  section: ScoringSection;
  correct: number;
  total: number;
}

export interface AttemptScore {
  totalCorrect: number;
  totalQuestions: number;
  bySection: SectionScore[];
  wrongQuestionIds: string[];
  unansweredQuestionIds: string[];
}

const SECTION_LABELS: Record<ScoringSection, string> = {
  gengo_chishiki: '言語知識（文字・語彙・文法）',
  dokkai: '読解',
  choukai: '聴解',
};
export { SECTION_LABELS };

export function scoreAttempt(attempt: JlptAttempt, questionsById: Map<string, JlptQuestion>): AttemptScore {
  const bySectionMap = new Map<ScoringSection, SectionScore>();
  const wrongQuestionIds: string[] = [];
  const unansweredQuestionIds: string[] = [];
  let totalCorrect = 0;

  for (const qId of attempt.questionIds) {
    const q = questionsById.get(qId);
    if (!q) continue;

    if (!bySectionMap.has(q.scoringSection)) {
      bySectionMap.set(q.scoringSection, { section: q.scoringSection, correct: 0, total: 0 });
    }
    const bucket = bySectionMap.get(q.scoringSection)!;
    bucket.total += 1;

    const answer = attempt.answers[qId];
    if (!answer || answer.chosenIndex === null) {
      unansweredQuestionIds.push(qId);
      continue;
    }
    if (answer.chosenIndex === q.answerIndex) {
      bucket.correct += 1;
      totalCorrect += 1;
    } else {
      wrongQuestionIds.push(qId);
    }
  }

  return {
    totalCorrect,
    totalQuestions: attempt.questionIds.length,
    bySection: Array.from(bySectionMap.values()),
    wrongQuestionIds,
    unansweredQuestionIds,
  };
}

// ─── Tiến độ mổ xẻ của một lượt làm bài ──────────────────────────────

/**
 * Các câu đã làm sai của một lượt.
 *
 * Ưu tiên bản đã chốt sẵn lúc nộp (`attempt.wrongQuestionIds`) để nơi gọi không cần cầm theo
 * nội dung đề — trang chủ và danh sách đề cần con số này cho nhiều đề cùng lúc, nạp cả đề chỉ
 * để đếm câu sai thì quá đắt. Lượt làm bài cũ (nộp trước khi có trường đó) thì tính lại từ đề,
 * nên vẫn nhận `questionsById` làm tham số tuỳ chọn.
 *
 * Trả về mảng rỗng khi không đủ dữ liệu để biết — nơi gọi tự quyết định coi đó là "chưa rõ"
 * hay "không có câu sai nào".
 */
export function wrongIdsOf(
  attempt: JlptAttempt,
  questionsById?: Map<string, JlptQuestion>
): string[] {
  if (attempt.wrongQuestionIds) return attempt.wrongQuestionIds;
  if (!questionsById) return [];
  return scoreAttempt(attempt, questionsById).wrongQuestionIds;
}

/** Câu sai còn CHƯA mổ xẻ. Đây là "việc dở dang" mà trang chủ phải nhắc (mục 4.3, 5.3.1). */
export function pendingReviewIdsOf(
  attempt: JlptAttempt,
  questionsById?: Map<string, JlptQuestion>
): string[] {
  const done = new Set(attempt.reviewedQuestionIds);
  return wrongIdsOf(attempt, questionsById).filter((id) => !done.has(id));
}

/** Lượt đã nộp và đã mổ xẻ hết câu sai chưa? Lượt đang làm dở (`running`) luôn là chưa. */
export function isFullyReviewed(
  attempt: JlptAttempt,
  questionsById?: Map<string, JlptQuestion>
): boolean {
  if (attempt.status === 'running') return false;
  return pendingReviewIdsOf(attempt, questionsById).length === 0;
}

/** "Sai + chắc chắn" là dấu hiệu hiểu sai tận gốc (mục 6.3) — giảm ease thêm để thẻ quay lại
 * sớm hơn một lỗi phân vân bình thường. */
const CONFIDENT_MISTAKE_EXTRA_EASE_DROP = 0.15;

/** "Đúng + phân vân": vẫn tăng khoảng ôn, nhưng dè dặt hơn mức bình thường (mục 6.4: ×0.6). */
const UNSURE_CORRECT_INTERVAL_FACTOR = 0.6;

/**
 * Áp ma trận độ chắc chắn × đúng-sai (mục 6.3, 6.4 tài liệu thiết kế) lên MỘT thẻ SRS.
 *
 * Chỉ chỉnh TRẠNG THÁI KHỞI ĐẦU sau khi `review()` (SM-2 chuẩn, `src/lib/srs.ts`) đã chạy —
 * không dựng thuật toán ôn tập thứ hai (mục 6.4: "không nên dựng hệ thứ hai"). Đúng 6 ô xử lý
 * khác nhau, đừng "sửa" cho giống nhau hết — đây là chủ ý:
 *
 * | Ô | Vì sao xử lý vậy |
 * |---|---|
 * | Sai + chắc chắn  | Hiểu sai tận gốc — `ease` giảm thêm để quay lại sớm hơn lỗi thường. |
 * | Sai + phân vân   | Lỗi bình thường — dùng nguyên `review(false)`, không chỉnh gì thêm. |
 * | Sai + đoán       | Chưa từng học, không phải "quên" — không tính lapse, coi như học lần đầu (`asFreshLearning`). |
 * | Đúng + đoán      | DƯƠNG TÍNH GIẢ, nguy hiểm nhất (mục 6.3) — ép ôn lại sau đúng 1 ngày dù vừa trả lời đúng. |
 * | Đúng + phân vân  | Chưa thật chắc — tăng khoảng ôn dè dặt hơn (×0.6) thay vì đầy đủ. |
 * | Đúng + chắc chắn | Bình thường — dùng nguyên `review(true)`. |
 */
export function applyConfidenceMatrix(
  prev: CardState | undefined,
  wasCorrect: boolean,
  confidence: Confidence,
  now = Date.now()
): CardState {
  if (!wasCorrect) {
    if (confidence === 'guess') return asFreshLearning(prev, now);
    const card = review(prev, false, now);
    return confidence === 'sure' ? dropEaseExtra(card, CONFIDENT_MISTAKE_EXTRA_EASE_DROP) : card;
  }

  const card = review(prev, true, now);
  if (confidence === 'guess') return withIntervalDays(card, 1, now);
  if (confidence === 'unsure') {
    const scaled = Math.max(1, Math.round(card.interval * UNSURE_CORRECT_INTERVAL_FACTOR));
    return withIntervalDays(card, scaled, now);
  }
  return card;
}
