# 008 — Bản đồ chẩn đoán nhóm theo 問題 ở màn kết quả

- **Ưu tiên:** P1
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Tài liệu thiết kế (`docs/jlpt-practice-test-research.md` mục 5.3, mục 8.8) nhấn mạnh bản đồ
chẩn đoán ở màn kết quả phải **nhóm theo 問題** để nhìn một cái thấy ngay cụm câu hỏi nào yếu
(ví dụ toàn sai ở nhóm 文法形式, nhưng đúng hết ở nhóm 語彙).

Thực tế, `JlptExamRunner.tsx` view `results` render bản đồ chẩn đoán bằng:
```
attempt.questionIds.map((qId, i) => ...)
```
— một hàng phẳng theo **đúng thứ tự làm bài**, không nhóm theo `問題` (`mondai`). Muốn biết
"tôi yếu nhóm nào" phải tự nhẩm bằng mắt.

Đáng chú ý: đúng logic nhóm này **đã được viết** ở nơi khác trong cùng file — view `taking`,
khối "Phiếu trả lời" (`showAnswerSheet`), lặp qua `stored.exam.groups` rồi lọc câu theo
`g.mondai` (~dòng 500 trong file). Chỉ cần tái dùng đúng cách nhóm đó cho bản đồ chẩn đoán ở
màn kết quả.

## Việc cần làm

1. Ở view `results`, thay vòng lặp phẳng bằng vòng lặp theo `stored.exam.groups` (giống khối
   "Phiếu trả lời" ở view `taking`), mỗi nhóm hiện tiêu đề (`g.mondai` hoặc nhãn tiếng Việt dễ
   đọc hơn nếu có) rồi tới các ô vuông đúng/sai/bỏ trắng của câu thuộc nhóm đó.
2. Giữ nguyên chú thích màu đã có ("Xanh = đúng · Đỏ = sai · Viền đứt = bỏ trắng").
3. Cân nhắc thêm dòng tổng kết ngắn mỗi nhóm (ví dụ "3/8 đúng") để không phải tự đếm ô vuông.

## Tiêu chí hoàn thành

- [ ] Bản đồ chẩn đoán ở màn kết quả hiện các câu được nhóm theo `問題`, không còn là một
      hàng phẳng theo thứ tự làm bài.
- [ ] Nhìn vào thấy ngay nhóm nào yếu nhất mà không cần đếm thủ công.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — view `results` (bản đồ chẩn đoán) và view
  `taking` (khối "Phiếu trả lời" — nơi có sẵn logic nhóm cần tái dùng).

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Việc nhỏ, giá trị cao, code mẫu đã có sẵn trong
  cùng file — ưu tiên làm sớm trong nhóm P1.
