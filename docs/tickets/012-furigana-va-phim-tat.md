# 012 — Furigana + phím tắt khi làm bài JLPT

- **Ưu tiên:** P3
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Hai thiếu sót nhỏ, độc lập nhau, gộp chung một ticket vì cùng mức độ ưu tiên thấp và cùng vùng
code (`JlptExamRunner.tsx` view `taking`):

1. **Furigana:** `JlptQuestion.furigana?: { text: string; reading: string }[]` đã có trong
   schema (`src/lib/jlpt/schema.ts`) nhưng không được đọc/render ở bất kỳ đâu. Câu có Kanji khó
   không có cách hiện cách đọc bên trên.
2. **Phím tắt:** Các màn luyện tập khác trong app đều có phím tắt (`VocabularyCard`: Space/H/S/
   mũi tên; `ExamSession`: mũi tên chuyển câu, F đánh dấu cờ). `JlptExamRunner.tsx` view
   `taking` không có phím tắt nào — mọi thao tác (chọn đáp án, chuyển câu, đánh dấu cờ, mở
   phiếu trả lời) đều phải dùng chuột/chạm.

## Việc cần làm

1. Furigana: quyết định cách hiển thị (ruby text `<ruby>` HTML, hoặc chú thích trong ngoặc bên
   cạnh) rồi render trong `renderStem()` — cần xử lý vị trí furigana khớp đúng với từng đoạn
   `text` tương ứng trong `stem`, không chỉ nối chuỗi đơn giản.
2. Phím tắt gợi ý cho view `taking`: mũi tên trái/phải chuyển câu, số 1-4 chọn nhanh đáp án
   tương ứng, `F` đánh dấu cờ, phím mở/đóng phiếu trả lời. Tham khảo cách `StudySession.tsx`
   và `ExamSession.tsx` đã cài đặt (chú ý: phải bỏ qua khi focus đang ở input/textarea, xem
   pattern `e.target instanceof HTMLInputElement` đã dùng ở các nơi khác).

## Tiêu chí hoàn thành

- [ ] Câu hỏi có `furigana` hiện đúng cách đọc bên trên/cạnh đúng đoạn Kanji tương ứng.
- [ ] Làm bài JLPT dùng được phím tắt cho ít nhất: chuyển câu, chọn đáp án, đánh dấu cờ.
- [ ] Phím tắt không bị kích hoạt nhầm khi người dùng đang gõ vào một ô input khác (nếu có).

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — `renderStem`, view `taking`.
- Tham khảo: `src/components/VocabularyCard.tsx`, `src/components/ExamSession.tsx`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Ưu tiên thấp — làm sau khi các ticket P0/P1 xong.
