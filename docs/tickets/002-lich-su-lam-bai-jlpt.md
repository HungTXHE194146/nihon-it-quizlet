# 002 — Lịch sử làm bài JLPT: xem lại, tiếp tục mổ xẻ dở

- **Ưu tiên:** P0
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Ở màn kết quả (`JlptExamRunner.tsx`, view `results`), nếu còn câu sai thì có 2 nút: "Bắt đầu
mổ xẻ" hoặc nút phụ xám "Để sau" (`onExit`). Bấm "Để sau" thoát về `onExit` (danh sách đề),
và **không có đường nào quay lại** — vào lại đúng đề đó chỉ đưa thẳng vào `lobby` để bắt đầu
một lượt làm bài **mới**. Attempt cũ (status `submitted`, có `scorePercent`, có
`reviewedQuestionIds: []`) vẫn nằm trong IndexedDB nhưng không ai đọc lại nó.

Đây là lỗ hổng nghiêm trọng nhất tìm được trong buổi audit: tài liệu thiết kế gốc
(`docs/jlpt-practice-test-research.md`, mục 5.3.1) nói rõ nếu chọn "để sau" thì **"phải tạo
một việc dở dang hiện rõ trên trang chủ"** — hiện tại không có gì cả, "để sau" = "không bao
giờ".

Ngoài ra, phát hiện thêm một lỗ hổng dữ liệu liên quan: `finishOneReview()` chỉ ghi
`attempt.reviewedQuestionIds` **một lần duy nhất, ở cuối cùng** (trong `finishAttempt()`),
không cập nhật tăng dần sau mỗi câu mổ xẻ xong. Nghĩa là nếu người học mổ xẻ được 5/12 câu rồi
thoát giữa chừng, không có cách nào biết "đã mổ xẻ xong 5 câu, còn 7 câu" — phải làm lại từ đầu
hoặc bỏ dở vĩnh viễn.

## Việc cần làm

1. **Sửa `finishOneReview()` để ghi nhận tiến độ mổ xẻ tăng dần**, không chỉ ở cuối cùng —
   mỗi lần xong 1 câu (bước 4 → `putMistake` xong) thì `persistAttempt` với
   `reviewedQuestionIds: [...attempt.reviewedQuestionIds, currentWrongQuestion.id]` ngay, để
   thoát giữa chừng vẫn giữ được tiến độ mổ xẻ.
2. **`JlptExamRunner` phải nhận biết được các attempt cũ khi mở lại một đề:**
   - Nếu có attempt `status === 'submitted'` với `reviewedQuestionIds.length <
     score.wrongQuestionIds.length` (còn câu chưa mổ xẻ) → ở `lobby`, thêm một lối vào riêng
     (khác nút "Bắt đầu làm bài") để nhảy thẳng vào `results` (dùng lại `scoreAttempt` tính từ
     attempt đã lưu) rồi từ đó vào `review`, **bỏ qua các câu đã có trong
     `reviewedQuestionIds`**.
   - Nếu attempt `status === 'reviewed'` (đã mổ xẻ xong hết) → cho xem lại kết quả ở chế độ
     chỉ đọc (không cho làm lại review, chỉ xem điểm + bản đồ chẩn đoán).
3. **Màn danh sách ("Đề đã nhập" ở `JlptImportScreen.tsx`, hoặc khối "Phòng thi JLPT" ở
   `Homepage.tsx`)** phải hiện được: đề này có bài đang làm dở (`running`), có bài đã nộp
   nhưng còn câu chưa mổ xẻ, hay đã mổ xẻ xong hết lần gần nhất — không chỉ hiện mỗi
   `scorePercent` như hiện tại.
4. Cân nhắc thêm (không bắt buộc để đóng ticket, nhưng nên làm cùng lúc vì cùng vùng code):
   một màn "Lịch sử làm bài" liệt kê **mọi** attempt đã nộp của **mọi** đề (không chỉ đề đang
   mở), sắp theo thời gian — hiện tại `listAttempts(ownerId)` đã trả về đúng thứ cần, chỉ
   thiếu UI hiển thị.

## Tiêu chí hoàn thành

- [x] Bấm "Để sau" ở màn kết quả rồi quay lại đúng đề đó → có đường vào lại mổ xẻ nốt các câu
      còn thiếu, không phải làm lại từ đầu.
- [x] Thoát giữa chừng lúc đang mổ xẻ (ví dụ mổ xẻ xong 5/12 câu) → mở lại đúng đề → tiếp tục
      từ câu thứ 6, không lặp lại 5 câu đã xong.
- [x] Đề đã mổ xẻ xong hết vẫn xem lại được kết quả (chỉ đọc).
- [x] Không có console error / crash khi `stored` hoặc `questionsById` chưa sẵn sàng lúc dựng
      lại `score` từ một attempt cũ.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — toàn bộ máy trạng thái `view`, đặc biệt effect
  nạp dữ liệu đầu file (dòng ~101-126), `startReview`/`finishOneReview`/`finishAttempt`.
- `src/lib/jlpt/db.ts` — `listAttempts`, `putAttempt` (đã có sẵn, có thể không cần sửa).
- `src/lib/jlpt/attemptLogic.ts` — `scoreAttempt` (dùng lại để tính điểm từ attempt đã lưu,
  không cần tính lại từ đầu).
- `src/components/Homepage.tsx`, `src/hooks/useJlptSummary.ts` — nơi hiện đang hiện
  "Lần thi gần nhất", có thể cần mở rộng để phản ánh trạng thái mổ xẻ dở.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX luồng JLPT. Chưa có ai bắt đầu.
- 2026-09-08: **Làm xong toàn bộ mục 1-3.** Chi tiết:
  - `JlptAttempt` có thêm `wrongQuestionIds` (chốt lúc nộp, cùng lý do với `scorePercent`):
    nhờ đó đếm được "còn bao nhiêu câu chưa mổ xẻ" mà không phải nạp nội dung đề — trang chủ
    và danh sách đề cần con số này cho nhiều đề cùng lúc.
  - `attemptLogic.ts` có 3 hàm thuần dùng chung: `wrongIdsOf`, `pendingReviewIdsOf`,
    `isFullyReviewed` (đều nhận `questionsById` tuỳ chọn để lượt cũ thiếu `wrongQuestionIds`
    vẫn tính lại được).
  - `finishOneReview()` ghi `reviewedQuestionIds` **tăng dần** sau mỗi câu; `finishAttempt()`
    chỉ đánh dấu `reviewed` khi thật sự không còn câu nào chờ (trước đây ghi đè cả loạt, nói
    dối là đã mổ xẻ hết).
  - `JlptExamRunner` giữ **cả danh sách** lượt làm bài của đề (`attempts`) thay vì chỉ
    running + last; sảnh có 3 lối vào tách bạch: làm tiếp bài dở / mổ xẻ nốt N câu / xem lại
    kết quả lần trước. `openResults()` dựng lại `score` từ lượt đã lưu bằng `scoreAttempt`.
  - Hàng đợi mổ xẻ (`reviewQueue`) chốt một lần lúc bắt đầu và **chỉ chứa câu chưa mổ xẻ** —
    quay lại lần sau đếm "1/2" chứ không phải "10/12".
  - Màn kết quả: so sánh với đúng lượt **liền trước lượt đang xem** (trước đây luôn lấy lượt
    gần nhất, nên mở lại chính nó sẽ ra "lần trước 72% → lần này 72%"); có cờ
    `resultsAreRevisit` để đổi lời chào khi xem lại bài cũ.
  - Trang chủ (`useJlptSummary` + `Homepage`) nhắc "Còn N câu sai chưa mổ xẻ"; danh sách đề
    (`JlptImportScreen`) có badge "Đang làm dở" / "Còn N câu chưa mổ xẻ" / "Đã mổ xẻ xong".
  - **Mục 4 (màn lịch sử liệt kê MỌI lượt của MỌI đề) cố ý chưa làm** — mọi việc người học
    làm tiếp được đều đã nổi lên ở trang chủ + sảnh từng đề, một màn danh sách nữa sẽ trùng
    lặp. Nếu sau này muốn xem tiến bộ theo thời gian (biểu đồ điểm qua các lần) thì mở ticket
    riêng, đừng nhét vào đây.
  - Kiểm chứng bằng trình duyệt thật (Playwright, hai kịch bản đầy đủ): nộp bài → "Để sau" →
    trang chủ + danh sách đề đều nhắc → vào lại mổ xẻ 1/3 câu → bỏ ngang → còn đúng 2 câu và
    tiếp tục từ **câu số 2** (không lặp câu 1) → mổ xẻ nốt → trạng thái trong IndexedDB thành
    `reviewed(2/2)` → sảnh chuyển sang "Xem lại kết quả lần trước", màn kết quả chỉ còn nút
    "Xong", trang chủ thôi nhắc.
