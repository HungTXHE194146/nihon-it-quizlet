# 007 — Đồng hồ đếm giờ + tự nộp bài JLPT

- **Ưu tiên:** P1
- **Trạng thái:** Chưa bắt đầu
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

1. Thêm trường `deadline?: number` (epoch ms) vào `JlptAttempt` (`src/lib/jlpt/schema.ts`),
   tính lúc `createAttempt()` (`src/lib/jlpt/attemptLogic.ts`):
   - Mode `full`: tổng `minutes` của mọi block trong `stored.exam.blocks`.
   - Mode `section`: `minutes` của đúng block đã chọn (`blockId`).
   - Mode `taste`: tài liệu thiết kế mô tả đây là phiên ~5 phút không có áp lực thời gian gắt —
     cân nhắc **không** đặt deadline cứng cho mode này (chỉ hiện đồng hồ đếm lên, không đếm
     ngược/không tự nộp), hoặc đặt một mốc mềm rất rộng rãi. Quyết định này ảnh hưởng UX, ghi
     lại lựa chọn vào Nhật ký khi làm.
2. Ở view `taking` (`JlptExamRunner.tsx`), thêm đồng hồ đếm ngược (tham khảo pattern
   `setInterval` + state `now` trong `ExamSession.tsx`, **không copy nguyên** vì cấu trúc dữ
   liệu khác — `JlptAttempt` không có sẵn field tương đương, phải tự thêm như trên).
3. Tự động gọi `submit()` khi hết giờ, giống `ExamSession.tsx` đang làm.
4. Cảnh báo gần hết giờ (ví dụ còn 5 phút) — có thể tham khảo cách `ExamSession.tsx` đổi màu
   đồng hồ, không bắt buộc giống hệt.

## Tiêu chí hoàn thành

- [ ] Mode `full` và `section` có đồng hồ đếm ngược hiển thị rõ trong lúc làm bài.
- [ ] Hết giờ tự động nộp bài, không cần người học bấm gì.
- [ ] Đóng tab/F5 giữa chừng rồi quay lại vẫn tính đúng giờ còn lại (không reset lại từ đầu).
- [ ] Quyết định về mode `taste` (có đếm ngược cứng hay không) được ghi rõ trong Nhật ký.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` (view `taking`, `startAttempt`, `submit`)
- `src/lib/jlpt/attemptLogic.ts` (`createAttempt`)
- `src/lib/jlpt/schema.ts` (`JlptAttempt`, `TimedBlock`)
- Tham khảo cách làm đã có: `src/components/ExamSession.tsx`

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX.
