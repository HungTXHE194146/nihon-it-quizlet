# 009 — Hiện lại đoạn văn (passage) khi mổ xẻ câu đọc hiểu

- **Ưu tiên:** P2
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Câu 読解 (đọc hiểu) dùng chung một đoạn văn (`Passage`) cho nhiều câu hỏi. Ở view `taking`
(`JlptExamRunner.tsx`), đoạn văn được hiện đúng — có khối `passage && (...)` render
`passage.text` phía trên câu hỏi.

Ở view `review` (mổ xẻ), phần này **bị bỏ sót**: chỉ render `currentWrongQuestion.stem`, không
có dòng nào tra `currentWrongQuestion.passageId` để hiện lại đoạn văn. Người học mổ xẻ một câu
đọc hiểu mà không thấy lại đoạn văn gốc — phải tự nhớ lại nội dung, hoặc mổ xẻ "mù" chỉ dựa vào
câu hỏi trơ trọi.

## Việc cần làm

Sao chép đúng cách tra + render `passage` đã có ở view `taking` (biến `passage`, tính bằng
`currentQuestion.passageId ? stored?.passages.find(...) : undefined`) sang view `review`,
dùng `currentWrongQuestion` thay cho `currentQuestion`.

## Tiêu chí hoàn thành

- [ ] Mổ xẻ một câu có `passageId` → thấy lại đúng đoạn văn liên quan, ở cả 4 bước
      (reviewStep 1-4), không chỉ bước đầu.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — biến `passage` (view `taking`), view `review`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Lỗi nhỏ, sửa nhanh, nhưng ảnh hưởng trực tiếp chất
  lượng mổ xẻ câu đọc hiểu.
