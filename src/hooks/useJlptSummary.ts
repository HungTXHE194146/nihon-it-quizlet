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
import { listStoredExams, listAttempts } from '../lib/jlpt/db';
import { pendingReviewIdsOf } from '../lib/jlpt/attemptLogic';
import { useJlptOwner } from './useJlptOwner';

export interface JlptExamBrief {
  id: string;
  title: string;
  level: string;
  reviewed: boolean;
  updatedAt: number;
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
}

const EMPTY: JlptSummary = {
  loading: false,
  exams: [],
  running: null,
  last: null,
  pendingReview: null,
  submittedCount: 0,
};

export function useJlptSummary(): JlptSummary {
  const { ownerId, claimEpoch } = useJlptOwner();
  const [summary, setSummary] = useState<JlptSummary>({ ...EMPTY, loading: true });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [storedExams, attempts] = await Promise.all([
          listStoredExams(),
          listAttempts(ownerId),
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

        setSummary({
          loading: false,
          exams: storedExams
            .map((e) => ({
              id: e.exam.id,
              title: e.exam.title,
              level: e.exam.level,
              reviewed: e.reviewed,
              updatedAt: e.updatedAt,
            }))
            .sort((a, b) => b.updatedAt - a.updatedAt),
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
