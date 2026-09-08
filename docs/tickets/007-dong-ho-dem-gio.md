# 007 — Đồng hồ đếm giờ + tự nộp bài JLPT

- **Ưu tiên:** P1
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Lobby của `JlptExamRunner.tsx` hiện chỉ **hiện thông tin** số phút mỗi khối
(`stored.exam.blocks.map(b => b.minutes)`) chứ không đếm ngược, không cảnh báo, không tự nộp
bài khi hết giờ. Trong khi đó, phòng thi mô phỏng của môn IT (`src/components/ExamSession.tsx`)
**đã có sẵn** đầy đủ: tính `deadline` lúc bắt đầu, `setInterval` cập nhật đồng hồ mỗi giây, tự
gọi submit khi `now >= deadline`, và lưu `deadline` vào bài đang làm dở để F5/đóng tab vẫn giữ
đúng giờ còn lại (xem `ExamSession.tsx`, các state `deadline`, `now`, effect `setInterval`).

Luyện thi JLPT mà không có áp lực thời gian là luyện sai kỹ năng — thi thật luôn có giới hạn
giờ nghiêm ngặt theo từng khối.

## Việc cần làm

1. [x] Thêm trường `deadline?: number` (epoch ms) vào `JlptAttempt` (`src/lib/jlpt/schema.ts`),
   tính lúc `createAttempt()` (`src/lib/jlpt/attemptLogic.ts`):
   - Mode `full`: tổng `minutes` của mọi block trong `stored.exam.blocks`.
   - Mode `section`: `minutes` của đúng block đã chọn (`blockId`).
   - Mode `taste`: **quyết định — không đặt deadline** (`undefined`), xem Nhật ký.
2. [x] Ở view `taking` (`JlptExamRunner.tsx`), thêm đồng hồ đếm ngược.
3. [x] Tự động gọi `submit()` khi hết giờ, giống `ExamSession.tsx` đang làm.
4. [x] Cảnh báo gần hết giờ (còn ≤5 phút, cùng ngưỡng với `ExamSession.tsx`).

## Tiêu chí hoàn thành

- [x] Mode `full` và `section` có đồng hồ đếm ngược hiển thị rõ trong lúc làm bài.
- [x] Hết giờ tự động nộp bài, không cần người học bấm gì.
- [x] Đóng tab/F5 giữa chừng rồi quay lại vẫn tính đúng giờ còn lại (không reset lại từ đầu).
- [x] Quyết định về mode `taste` (có đếm ngược cứng hay không) được ghi rõ trong Nhật ký.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` (view `taking`, `startAttempt`, `submit`)
- `src/lib/jlpt/attemptLogic.ts` (`createAttempt`)
- `src/lib/jlpt/schema.ts` (`JlptAttempt`, `TimedBlock`)
- Tham khảo cách làm đã có: `src/components/ExamSession.tsx`

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX.
- 2026-09-08: **Làm xong.**

  **Quyết định mode `taste`:** KHÔNG đặt deadline (kể cả mốc mềm). Lý do: mục 5.1 mô tả đây là
  cỡ phiên nhỏ nhất, mục đích là hạ chi phí khởi động ("thử trước khi cam kết") — gắn bất kỳ
  đồng hồ nào, kể cả một mốc rộng rãi, vẫn ngầm nói "đây cũng là một bài thi có deadline", đi
  ngược lại đúng mục đích của cỡ phiên này. `deadline` chỉ tồn tại (khác `undefined`) khi
  `mode` là `full` hoặc `section` — kiểm tra `attempt.deadline !== undefined` là đủ để biết có
  nên vẽ đồng hồ hay không, không cần biết `mode` ở chỗ khác.

  Chi tiết:
  - `src/lib/format.ts` (mới): tách `formatClock()` ra khỏi `ExamSession.tsx` (trước đây định
    nghĩa riêng ở đó) thành hàm dùng chung — `JlptExamRunner.tsx` cần đúng logic y hệt, viết
    lại một bản thứ hai thì hai nơi dễ lệch nhau (ví dụ ngưỡng hiện giờ khi <1 tiếng).
  - `attemptLogic.ts`: `createAttempt()` tính `deadline` qua `timedMinutesFor()` — tổng phút
    các khối (`full`) hoặc phút đúng khối đã chọn (`section`), `null` cho `taste`.
  - `JlptExamRunner.tsx`: hai effect tách biệt như `ExamSession.tsx` đã làm — một chỉ tick
    `now` mỗi giây (deps `[view]`, không phụ thuộc `attempt` để khỏi tạo/huỷ `setInterval` mỗi
    câu trả lời), một kiểm tra `now >= attempt.deadline` rồi gọi `submit()`. `submit()` phải
    đổi từ hàm thường sang `useCallback([attempt, stored, questionsById, recordReview])` —
    nếu không, effect tự động nộp sẽ đóng gói một bản `attempt` CŨ (thiếu câu vừa chọn) tại
    thời điểm effect được tạo, và nộp nhầm bài thiếu câu khi chạm giờ. Do `submit` giờ được
    tạo lại theo đúng `attempt`, effect luôn thấy bản mới nhất.
  - Bảo vệ khỏi nộp hai lần: effect kiểm tra thêm `attempt.status === 'running'` — sau khi
    `submit()` chạy, `persistAttempt()` cập nhật `attempt.status` thành `'submitted'` ngay
    trong cùng lượt render, nên lần kiểm tra kế tiếp tự bỏ qua.
  - Cảnh báo gần hết giờ: cùng ngưỡng ≤5 phút và cùng kiểu (nền hồng + `animate-pulse`) như
    `ExamSession.tsx`, để hai phòng thi trong app nhất quán.
  - **Cải thiện ngoài yêu cầu ticket:** `ExamSession.tsx` từ chối khôi phục một phiên đã hết
    hạn (`if (saved.deadline > 0 && saved.deadline <= Date.now()) return null` — coi như
    không có gì, MẤT câu trả lời đã làm). `JlptExamRunner` không copy hành vi đó: một lượt
    JLPT quay lại sau khi đã hết hạn vẫn được `resume()` bình thường, và hiệu ứng tự nộp
    (`now >= attempt.deadline`) kích hoạt gần như ngay lập tức, chấm điểm đúng những câu đã
    trả lời thay vì âm thầm xoá — dữ liệu người học phải giữ, không được vứt.

  Kiểm chứng bằng trình duyệt thật (Playwright, không mock UI):
  1. Mode "Nhấm nháp" — xác nhận không có đồng hồ nào hiện ra lúc làm bài.
  2. Mode "Trọn đề" với 2 khối × 1 phút — đồng hồ hiện đúng ~2:00 (lệch 1 giây do độ trễ xử lý
     giữa lúc tạo lượt và lúc đọc màn hình, không phải lỗi).
  3. Mode "Từng khối" chọn đúng 1 khối 1 phút — đồng hồ hiện ~1:00, không phải tổng cả đề.
  4. Seed một lượt đang làm dở với hạn còn 6 giây (1 câu đã trả lời đúng, 1 câu bỏ trống) →
     đợi qua hạn → tự rời màn làm bài, sang màn kết quả, `status` trong IndexedDB thành
     `'submitted'` với `scorePercent: 50` (đúng 1/2, câu bỏ trống tính sai) — không cần bấm gì.
  5. Bắt đầu mode "Trọn đề", ghi lại số giây còn lại → đợi 3 giây → tải lại toàn trang (F5
     thật, không chỉ đổi hash) → vào lại qua "Tiếp tục bài đang làm dở" → số giây còn lại giảm
     đúng theo thời gian đã trôi qua, không reset về đủ giờ.
  6. Seed một lượt còn 4 phút → đồng hồ có cả lớp `bg-rose-*` lẫn `animate-pulse` (khẩn cấp).

  **Cố ý chưa làm:** chưa thêm âm thanh/rung khi cảnh báo gần hết giờ (ticket không yêu cầu);
  chưa cho phép người học tự tắt đồng hồ (mục 4.6 nói "tự chủ" gồm cả việc tắt đồng hồ, nhưng
  đó là hành vi đã có sẵn ở `ExamSession.tsx` từ trước ticket này — nếu muốn thêm cho cả JLPT
  thì nên gộp chung một ticket UI-tuỳ-chọn, không lẻ tẻ từng nơi).
