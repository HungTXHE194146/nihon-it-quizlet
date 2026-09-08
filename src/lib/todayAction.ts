/**
 * Quyết định MỘT hành động duy nhất cho khối "Hôm nay" ở trang chủ.
 *
 * Trả lời thẳng câu hỏi chủ dự án đặt ra khi giao ticket 004: "Làm sao để giúp tôi không phải
 * suy nghĩ mà biết hôm nay phải học gì". Trước ticket này trang chủ có hai lối đi ngang hàng
 * (ôn N3 / phòng thi JLPT) không liên quan nhau — người học phải tự cân nhắc. Hàm này gộp mọi
 * việc tồn đọng thành một thứ tự ưu tiên cố định, theo mục 4.3 (Zeigarnik: việc dở dang phải
 * được nhắc trước, và chỉ nhắc việc GẦN NHẤT — nhắc cả đống thì gây tê liệt chứ không tạo sức
 * căng) và mục 4.7 (peak-end) của docs/jlpt-practice-test-research.md.
 *
 * Thứ tự ưu tiên (dừng ở nhánh đầu tiên khớp):
 * 1. Đang có bài JLPT làm dở (chưa nộp) — việc dở dang cụ thể nhất, còn nguyên ngữ cảnh trong
 *    đầu, để càng lâu càng phải đọc lại đề từ đầu.
 * 2. Đã nộp bài nhưng còn câu chưa mổ xẻ — mổ xẻ mới là chỗ tạo ra học tập thật (nộp bài chỉ
 *    là lấy dữ liệu), càng để lâu càng quên bối cảnh lúc làm sai.
 * 3. Có câu hỏi JLPT đến hạn ôn lại (ticket 005 — SRS riêng cho câu hỏi JLPT, không cần trùng
 *    từ vựng với Mimi/Kanji Master).
 * 4. Có thẻ N3 (từ vựng/Kanji) đến hạn ôn — lịch ôn ngắt quãng đã tính sẵn, đây là việc "phải
 *    làm" gần nhất kể cả khi không có gì dở dang.
 * 5. Không có gì tồn đọng — gợi ý khởi động nhẹ: học thẻ N3 mới (người mới hoặc còn thẻ mới),
 *    hoặc một phiên JLPT cỡ "nhấm nháp" nếu đã có đề nhưng thẻ N3 cũng hết.
 * 6. Thật sự không còn gì để gợi ý (đã thuộc hết N3, không có đề nào) — ăn mừng, không ép học.
 */

export interface N3TodayInput {
  due: number;
  newCards: number;
  isNewLearner: boolean;
  firstSessionSize: number;
}

export interface JlptTodayInput {
  running: { examId: string; examTitle: string } | null;
  pendingReview: { examId: string; examTitle: string; pendingCount: number } | null;
  /**
   * Số câu hỏi JLPT đã đến hạn ôn lại (khoá `jlpt::` trong `data.cards`, xem
   * `useProgress().buildJlptReviewQueue()` — ticket 005). Trước ticket 005 nhánh này luôn
   * bằng 0 (chưa có SRS riêng cho câu hỏi JLPT).
   */
  reviewDueCount: number;
  /** Đề gần cập nhật nhất trong kho — dùng làm gợi ý "nhấm nháp" khi không còn việc gì khác. */
  mostRecentExam: { examId: string; examTitle: string } | null;
}

export type TodayAction =
  | { kind: 'jlpt-running'; examId: string; examTitle: string }
  | { kind: 'jlpt-pending-review'; examId: string; examTitle: string; pendingCount: number }
  | { kind: 'jlpt-review-due'; count: number }
  | { kind: 'n3-due'; count: number }
  | { kind: 'n3-new'; count: number; isNewLearner: boolean }
  | { kind: 'jlpt-taste'; examId: string; examTitle: string }
  | { kind: 'all-done' };

export function pickTodayAction(n3: N3TodayInput, jlpt: JlptTodayInput): TodayAction {
  if (jlpt.running) {
    return { kind: 'jlpt-running', examId: jlpt.running.examId, examTitle: jlpt.running.examTitle };
  }
  if (jlpt.pendingReview) {
    return {
      kind: 'jlpt-pending-review',
      examId: jlpt.pendingReview.examId,
      examTitle: jlpt.pendingReview.examTitle,
      pendingCount: jlpt.pendingReview.pendingCount,
    };
  }
  if (jlpt.reviewDueCount > 0) {
    return { kind: 'jlpt-review-due', count: jlpt.reviewDueCount };
  }
  if (n3.due > 0) {
    return { kind: 'n3-due', count: n3.due };
  }
  if (n3.isNewLearner || n3.newCards > 0) {
    return {
      kind: 'n3-new',
      count: n3.isNewLearner ? n3.firstSessionSize : n3.newCards,
      isNewLearner: n3.isNewLearner,
    };
  }
  if (jlpt.mostRecentExam) {
    return { kind: 'jlpt-taste', examId: jlpt.mostRecentExam.examId, examTitle: jlpt.mostRecentExam.examTitle };
  }
  return { kind: 'all-done' };
}
