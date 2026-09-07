# 010 — Giảm chi phí mổ xẻ (tạm dừng/tiếp tục, rút gọn bước)

- **Ưu tiên:** P2
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** 002 (cần dữ liệu "mổ xẻ dở" ghi nhận tăng dần mới có gì để tạm dừng/tiếp tục)

## Bối cảnh

Quy trình mổ xẻ hiện tại là 4 bước bắt buộc cho **mỗi** câu sai, không có nút bỏ qua, không
lưu giữa chừng (trước ticket 002) — 12 câu sai = 48 lượt tương tác liên tục, đúng lúc người
học vừa mệt sau một bài thi dài. Tài liệu thiết kế coi "tỉ lệ mổ xẻ" (`reviewed`/`submitted`)
là chỉ số quan trọng nhất (mục 13), nhưng chưa có cơ chế nào giảm chi phí thực hiện nó.

Đây là **ticket mang tính đề xuất/thiết kế**, không có một cách làm "đúng" duy nhất — người
nhận ticket cần cân nhắc và có thể trao đổi với chủ dự án trước khi code diện rộng.

## Việc cần cân nhắc (chọn 1 hoặc kết hợp, không bắt buộc làm hết)

1. **Tạm dừng giữa chừng, tiếp tục sau** — phụ thuộc ticket 002 đã ghi `reviewedQuestionIds`
   tăng dần; chỉ cần thêm nút "Tạm dừng, mổ xẻ tiếp sau" ở view `review`, thoát về mà không
   mất tiến độ (khác với hiện tại: thoát ngang view `review` không có nút thoát rõ ràng nào cả
   — kiểm tra lại xem có đường thoát nào không, nếu không thì đây cũng là một lỗ hổng cần vá).
2. **Rút gọn bước cho câu ít giá trị học** — ví dụ: câu "Sai + Đoán" (theo ma trận ở ticket
   006) có thể cho phép bỏ qua bước 2-4 nhanh hơn (vì đằng nào cũng không nhớ lý do chọn), tập
   trung công sức vào câu "Sai + Chắc chắn" (sai mà tưởng mình đúng — đáng mổ xẻ kỹ nhất).
3. **Giới hạn số câu mổ xẻ một lượt** — ví dụ tối đa 5 câu/lượt, phần còn lại hẹn "mổ xẻ tiếp"
   ở lần mở app kế tiếp (cần khối "Hôm nay" ở ticket 004 để nhắc việc còn lại).

## Tiêu chí hoàn thành

Vì đây là ticket đề xuất, tiêu chí hoàn thành do người nhận việc tự đặt ra khi chọn hướng đi,
nhưng tối thiểu phải:
- [ ] Có ít nhất một cách giảm được số lượt tương tác bắt buộc cho một phiên mổ xẻ nhiều câu
      sai (>8 câu), so với hiện tại (4 bước × mọi câu, không thể tắt).
- [ ] Không hạ thấp chất lượng mổ xẻ cho câu quan trọng nhất (sai + chắc chắn).
- [ ] Ghi rõ hướng đã chọn và lý do vào Nhật ký.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — view `review`, `finishOneReview`, `startReview`.
- `docs/jlpt-practice-test-research.md` mục 4 (tâm lý giữ chân), mục 6 (quy trình mổ xẻ),
  mục 13 (chỉ số "tỉ lệ mổ xẻ").

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, dạng đề xuất — cần cân nhắc trước khi code diện
  rộng, không phải "cứ làm theo checklist".
