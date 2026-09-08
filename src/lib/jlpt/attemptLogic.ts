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

/**
 * Góc dưới-phải của ma trận mục 6.3 ("Đúng + Đoán") là dương tính giả — nguy hiểm nhất, vì hệ
 * thống sẽ tưởng người học đã biết. `recordReview()` hiện có chỉ nhận đúng/sai nhị phân, nên áp
 * dụng đúng MỘT điều chỉnh khả thi mà không phải dựng thêm hệ thống: coi trường hợp này như sai
 * để SRS không tin nhầm và bắt ôn lại sớm. Các ô còn lại của ma trận dùng nguyên tín hiệu thật.
 */
export function srsSignalForMatrix(wasCorrect: boolean, confidence: Confidence): boolean {
  if (wasCorrect && confidence === 'guess') return false;
  return wasCorrect;
}
