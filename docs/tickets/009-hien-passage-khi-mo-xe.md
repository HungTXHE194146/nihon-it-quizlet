# 009 — Hiện lại đoạn văn (passage) khi mổ xẻ câu đọc hiểu

- **Ưu tiên:** P2
- **Trạng thái:** Xong
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

- [x] Mổ xẻ một câu có `passageId` → thấy lại đúng đoạn văn liên quan, ở cả 4 bước
      (reviewStep 1-4), không chỉ bước đầu.
- [x] Mini-quiz kết thúc phiên (bước 7) cũng hiện đoạn văn — nếu không thì bước "kết thúc
      bằng cảm giác thắng" lại thành câu đố mù với mọi câu 読解.
- [x] Màn ôn câu JLPT đến hạn (`JlptReviewSession.tsx`) cũng hiện đoạn văn — cùng lỗi, ở một
      màn hình khác, mà ticket gốc chưa nhìn tới.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — biến `passage` (view `taking`), view `review`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Lỗi nhỏ, sửa nhanh, nhưng ảnh hưởng trực tiếp chất
  lượng mổ xẻ câu đọc hiểu.
- 2026-09-10: **Xong.** Thêm `passageOf()` trong `JlptExamRunner.tsx` (dùng chung cho view
  `review` và `miniquiz`) và trường `passageText` trên `ReviewItem` của `JlptReviewSession.tsx`.
  Phạm vi mở rộng hơn ticket gốc: lỗi này không chỉ ở view `review` mà còn ở mini-quiz và ở
  hàng đợi ôn JLPT đến hạn — cả ba đều bắt trả lời câu 読解 mà không cho nhìn đoạn văn.
  Nhân tiện vá luôn một lỗ hổng cùng họ: `JlptQuestion.explanation` tồn tại trong schema và
  trong mọi file đề nhưng chỉ được hiện ở sổ tay lỗi, tức là bị giấu đi đúng lúc người học
  cần nó nhất (bước 3 mổ xẻ, và sau khi trả lời ở màn ôn). Giờ hiện ở cả hai chỗ.
