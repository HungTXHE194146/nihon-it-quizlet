/**
 * Tóm tắt tình hình JLPT của người đang đăng nhập, đủ để trang chủ vẽ khu "Phòng thi JLPT"
 * mà không phải mở màn hình nhập đề: có bao nhiêu đề, đang dở bài nào, lần thi gần nhất
 * được bao nhiêu phần trăm.
 *
 * Đề nằm trong IndexedDB (kho chung của máy), lượt làm bài lọc theo tài khoản — xem
 * src/lib/jlpt/db.ts. Mọi lỗi đọc đều nuốt và trả về tóm tắt rỗng: trang chủ phải hiện
 * được ngay cả khi trình duyệt chặn IndexedDB.
 */

import { useEffect, useState } from 'react';
import { listStoredExams, listAttempts, listMistakes } from '../lib/jlpt/db';
import { pendingReviewIdsOf } from '../lib/jlpt/attemptLogic';
import { useJlptOwner } from './useJlptOwner';

/**
 * Đề này đang ở đâu trong hành trình của NGƯỜI HỌC — thứ tự cũng chính là thứ tự ưu tiên
 * hiện ở trang chủ.
 *
 * Trước đây danh sách đề chỉ được sắp theo `updatedAt` (lúc NHẬP đề vào máy), một con số
 * không nói gì về người học: đề mới nhập luôn đứng đầu kể cả khi đang có một đề khác làm dở.
 */
export type JlptExamState =
  | 'running'         // đang làm dở, chưa nộp
  | 'pending-review'  // đã nộp, còn câu sai chưa mổ xẻ
  | 'fresh'           // chưa từng đụng tới
  | 'done';           // đã nộp và mổ xẻ xong

export const EXAM_STATE_ORDER: Record<JlptExamState, number> = {
  running: 0,
  'pending-review': 1,
  fresh: 2,
  done: 3,
};

export interface JlptExamBrief {
  id: string;
  title: string;
  level: string;
  reviewed: boolean;
  updatedAt: number;
  state: JlptExamState;
  /** Số lượt đã nộp của đề này. */
  attemptCount: number;
  /** % đúng của lượt nộp gần nhất (null với lượt cũ chưa chốt sẵn điểm). */
  lastPercent: number | null;
  /** Thời điểm nộp gần nhất, 0 nếu chưa nộp lần nào. */
  lastAt: number;
  /** Số câu sai còn chờ mổ xẻ, cộng dồn mọi lượt của đề này. */
  pendingCount: number;
  /** Với đề đang làm dở: đã trả lời bao nhiêu / tổng bao nhiêu câu của phiên đó. */
  progress: { answered: number; total: number } | null;
  /**
   * "Đang làm tới phần nào" — nhãn khối tính giờ của lượt gần nhất (`mode === 'section'`),
   * hoặc cỡ phiên khi không gắn với khối cụ thể.
   */
  lastScopeLabel: string | null;
}

export interface JlptSummary {
  loading: boolean;
  exams: JlptExamBrief[];
  /** Bài đang làm dở (nếu có) — lối vào quan trọng nhất, luôn ưu tiên hiện trước. */
  running: { attemptId: string; examId: string; examTitle: string } | null;
  /** Lần nộp bài gần nhất; `percent` có thể null với lượt làm từ trước khi web chốt sẵn điểm. */
  last: { examId: string; examTitle: string; percent: number | null; at: number } | null;
  /**
   * Bài đã nộp nhưng còn câu sai CHƯA mổ xẻ — việc dở dang đáng nhắc nhất, vì mổ xẻ mới là
   * chỗ tạo ra học tập thật (mục 5.3 của tài liệu thiết kế), còn nộp bài chỉ là lấy dữ liệu.
   *
   * Đếm được mà không cần nạp nội dung đề nhờ `wrongQuestionIds` chốt sẵn lúc nộp; lượt làm
   * từ trước khi có trường đó sẽ không đếm được và bị bỏ qua ở đây (chấp nhận được: chúng đã
   * cũ, và người học vẫn vào lại được qua sảnh của từng đề).
   */
  pendingReview: { examId: string; examTitle: string; pendingCount: number } | null;
  submittedCount: number;
  /** Số lượt nộp trong 7 ngày gần nhất, và trong đó bao nhiêu lượt là trọn đề — lộ trình
   * (src/lib/roadmap.ts) dùng để biết chỉ tiêu luyện đề của tuần này đã đạt chưa. */
  submittedThisWeek: number;
  fullAttemptsThisWeek: number;
  /**
   * Số câu đã mổ xẻ xong và nằm trong sổ tay lỗi JLPT.
   *
   * Đây là lối vào duy nhất tới công sức người học bỏ ra ở bước 4 (tự viết quy tắc); không
   * đếm ở đây thì trang chủ không có cớ gì để dẫn họ quay lại đọc.
   */
  mistakeCount: number;
}

const EMPTY: JlptSummary = {
  loading: false,
  exams: [],
  running: null,
  last: null,
  pendingReview: null,
  submittedCount: 0,
  submittedThisWeek: 0,
  fullAttemptsThisWeek: 0,
  mistakeCount: 0,
};

const MODE_LABELS: Record<string, string> = {
  taste: 'Nhấm nháp',
  section: 'Một khối',
  full: 'Trọn đề',
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function useJlptSummary(): JlptSummary {
  const { ownerId, claimEpoch } = useJlptOwner();
  const [summary, setSummary] = useState<JlptSummary>({ ...EMPTY, loading: true });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [storedExams, attempts, mistakes] = await Promise.all([
          listStoredExams(),
          listAttempts(ownerId),
          listMistakes(ownerId),
        ]);
        if (cancelled) return;

        const titleOf = (examId: string) =>
          storedExams.find((e) => e.exam.id === examId)?.exam.title ?? examId;

        const running = attempts.find((a) => a.status === 'running') ?? null;
        const submitted = attempts
          .filter((a) => a.status !== 'running' && a.submittedAt)
          .sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0));
        const latest = submitted[0];

        // Không truyền questionsById: ở đây cố ý KHÔNG nạp nội dung đề (mỗi đề cả trăm KB,
        // trang chủ có thể có nhiều đề). Lượt cũ thiếu wrongQuestionIds sẽ ra 0 và bị bỏ qua.
        const pending = submitted.find((a) => pendingReviewIdsOf(a).length > 0);

        const weekAgo = Date.now() - WEEK_MS;
        const recent = submitted.filter((a) => (a.submittedAt ?? 0) >= weekAgo);

        const briefs: JlptExamBrief[] = storedExams.map((e) => {
          const mine = attempts.filter((a) => a.examId === e.exam.id);
          const run = mine.find((a) => a.status === 'running') ?? null;
          const done = mine
            .filter((a) => a.status !== 'running' && a.submittedAt)
            .sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0));
          const latestOfExam = done[0];
          const pendingCount = done.reduce((sum, a) => sum + pendingReviewIdsOf(a).length, 0);
          const scopeSource = run ?? latestOfExam;

          const state: JlptExamState = run
            ? 'running'
            : pendingCount > 0
            ? 'pending-review'
            : done.length === 0
            ? 'fresh'
            : 'done';

          return {
            id: e.exam.id,
            title: e.exam.title,
            level: e.exam.level,
            reviewed: e.reviewed,
            updatedAt: e.updatedAt,
            state,
            attemptCount: done.length,
            lastPercent: latestOfExam?.scorePercent ?? null,
            lastAt: latestOfExam?.submittedAt ?? 0,
            pendingCount,
            progress: run
              ? {
                  answered: Object.values(run.answers).filter((a) => a.chosenIndex !== null).length,
                  total: run.questionIds.length,
                }
              : null,
            lastScopeLabel: scopeSource
              ? scopeSource.blockLabel ?? MODE_LABELS[scopeSource.mode] ?? null
              : null,
          };
        });

        // Sắp theo việc người học cần làm tiếp, KHÔNG theo lúc đề được nhập vào máy. Cùng
        // nhóm thì đề đụng gần đây nhất lên trước (đề chưa làm thì lấy lúc nhập làm mốc).
        briefs.sort(
          (a, b) =>
            EXAM_STATE_ORDER[a.state] - EXAM_STATE_ORDER[b.state] ||
            Math.max(b.lastAt, b.updatedAt) - Math.max(a.lastAt, a.updatedAt)
        );

        setSummary({
          loading: false,
          exams: briefs,
          running: running
            ? { attemptId: running.id, examId: running.examId, examTitle: titleOf(running.examId) }
            : null,
          last: latest
            ? {
                examId: latest.examId,
                examTitle: titleOf(latest.examId),
                percent: latest.scorePercent ?? null,
                at: latest.submittedAt ?? 0,
              }
            : null,
          pendingReview: pending
            ? {
                examId: pending.examId,
                examTitle: titleOf(pending.examId),
                pendingCount: pendingReviewIdsOf(pending).length,
              }
            : null,
          submittedCount: submitted.length,
          submittedThisWeek: recent.length,
          fullAttemptsThisWeek: recent.filter((a) => a.mode === 'full').length,
          mistakeCount: mistakes.length,
        });
      } catch {
        if (!cancelled) setSummary(EMPTY);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ownerId, claimEpoch]);

  return summary;
}
