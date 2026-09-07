# 002 — Lịch sử làm bài JLPT: xem lại, tiếp tục mổ xẻ dở

- **Ưu tiên:** P0
- **Trạng thái:** Chưa bắt đầu
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

- [ ] Bấm "Để sau" ở màn kết quả rồi quay lại đúng đề đó → có đường vào lại mổ xẻ nốt các câu
      còn thiếu, không phải làm lại từ đầu.
- [ ] Thoát giữa chừng lúc đang mổ xẻ (ví dụ mổ xẻ xong 5/12 câu) → mở lại đúng đề → tiếp tục
      từ câu thứ 6, không lặp lại 5 câu đã xong.
- [ ] Đề đã mổ xẻ xong hết vẫn xem lại được kết quả (chỉ đọc).
- [ ] Không có console error / crash khi `stored` hoặc `questionsById` chưa sẵn sàng lúc dựng
      lại `score` từ một attempt cũ (cần `useMemo`/effect tính lại `score` từ attempt đã lưu,
      không chỉ từ state `score` vốn chỉ được set ngay sau khi vừa `submit()`).

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
