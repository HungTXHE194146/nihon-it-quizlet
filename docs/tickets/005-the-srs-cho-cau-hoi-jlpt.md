# 005 — Thẻ SRS cho chính câu hỏi JLPT (không cần `linkedItemKey`)

- **Ưu tiên:** P1
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Tài liệu thiết kế (`docs/jlpt-practice-test-research.md` mục 8.11) nêu rõ điểm khác biệt cốt
lõi so với Bunpro: *"bắt kiến thức đó quay lại đúng lúc sắp quên"*. Thực tế hiện tại, câu sai
chỉ được đưa vào lịch ôn (SRS) khi có `linkedItemKey` — một khoá thẻ từ vựng trùng
**chính xác** `term` với kho Mimi N3 / Kanji Master N3 (`src/lib/jlpt/linkSuggest.ts`, dò khi
nhập đề; hoặc gán tay lúc soạn JSON).

Hệ quả: chỉ câu 文字・語彙 (từ vựng) có cơ hội nối vào SRS. Câu 文法 (ngữ pháp), 読解 (đọc
hiểu), 聴解 (nghe) — chiếm phần lớn một đề JLPT thật — **không bao giờ được lên lịch ôn lại**,
dù người học vừa mổ xẻ kỹ và tự viết quy tắc cho nó (bước 4 mổ xẻ).

## Việc cần làm (cần quyết định kiến trúc trước khi code)

Mục tiêu: chính câu hỏi JLPT (không phải một thẻ từ vựng "gần giống") phải có trạng thái SRS
riêng, dùng lại đúng thuật toán ở `src/lib/srs.ts` (SM-2) — tài liệu mục 6.4 nói rõ **không
nên dựng hệ thứ hai**.

Trở ngại kiến trúc chính: `src/hooks/useProgress.tsx` (`buildReviewQueue`) và
`src/lib/itemIndex.ts` (`itemByKey`) được thiết kế quanh giả định "mọi khoá thẻ đều tra được
ra nội dung từ `itemByKey`", vốn chỉ được nạp từ dữ liệu bài học tĩnh (`src/data/lessons.ts` và
tương đương) — **không** từ đề JLPT nằm trong IndexedDB (nạp lười theo từng `examId`, không có
sẵn toàn bộ trong bộ nhớ).

Hai hướng khả thi (chọn 1, hoặc đề xuất khác nếu thấy hợp lý hơn khi bắt tay vào):

1. **Luồng ôn JLPT riêng, không đi qua `StudySession`/`itemByKey`.** Thẻ SRS vẫn dùng chung
   `data.cards` (namespace khoá kiểu `jlpt::<questionId>` thay vì `subjectId::itemId`), nhưng
   màn ôn là một component riêng trong khu vực JLPT, tự `getStoredExam(examId)` để lấy nội
   dung câu hỏi cần ôn (không cần `itemByKey`). `buildReviewQueue` cần biết bỏ qua khoá
   `jlpt::` khi build hàng đợi N3 thường (và ngược lại, có hàm riêng lọc đúng khoá `jlpt::`
   đến hạn).
2. **Đăng ký câu hỏi JLPT vào `itemByKey` khi đề được nạp**, giống cách
   `registerSubjectItems` làm với bài học thường — để tái dùng nguyên `StudySession`. Rủi ro:
   `itemByKey`/`StudySession` được thiết kế cho thẻ từ vựng/trắc nghiệm đơn giản, không có khái
   niệm `passage` (đoạn văn dùng chung nhiều câu) hay cấu trúc nhóm `問題` — cần đánh giá có
   đủ dùng không hay UI sẽ thiếu ngữ cảnh khi ôn.

Bất kể chọn hướng nào, cần sửa:
- `JlptExamRunner.tsx` — `submit()` hiện chỉ gọi `recordReview(key, ...)` khi `linkedKeyFor()`
  tìm được thẻ từ vựng khớp; cần gọi thêm (hoặc thay bằng) một đường ghi nhận SRS cho chính
  `questionId`, không phụ thuộc `linkedItemKey`.
- `src/lib/jlpt/attemptLogic.ts` — `srsSignalForMatrix` đang trả về `boolean` đơn giản; xem
  ticket 006 để mở rộng thành tín hiệu chi tiết hơn (làm sau ticket này).

## Tiêu chí hoàn thành

- [ ] Một câu 文法/読解/聴解 làm sai, mổ xẻ xong, thì sau đó xuất hiện lại trong một hàng đợi
      ôn tập nào đó (không cần phải trùng từ vựng với Mimi/Kanji Master).
- [ ] Thẻ SRS của câu hỏi JLPT dùng đúng công thức trong `src/lib/srs.ts`, không viết lại
      thuật toán.
- [ ] Không phá vỡ luồng ôn N3 hiện có (thẻ từ vựng/Kanji vẫn hoạt động y hệt trước).
- [ ] Quyết định kiến trúc (hướng 1 hay 2, hay hướng khác) được ghi lại vào Nhật ký ticket này
      trước khi code lan rộng, để phiên sau không phải đoán lại.

## File / vùng code liên quan

- `src/lib/srs.ts`, `src/hooks/useProgress.tsx`, `src/lib/itemIndex.ts`
- `src/components/jlpt/JlptExamRunner.tsx` (`submit`, `linkedKeyFor`)
- `src/lib/jlpt/attemptLogic.ts`, `src/lib/jlpt/linkSuggest.ts`

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Đây là ticket kiến trúc nặng nhất trong nhóm P1 —
  nên đọc kỹ cả hai hướng đề xuất trước khi bắt đầu, và chốt hướng đi ngay từ đầu phiên làm
  việc, ghi lại tại đây.
