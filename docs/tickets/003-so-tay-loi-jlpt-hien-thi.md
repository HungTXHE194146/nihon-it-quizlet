# 003 — Sổ tay lỗi JLPT: hiển thị được, gộp với sổ tay câu sai

- **Ưu tiên:** P0
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Bước 4 của quy trình mổ xẻ (`JlptExamRunner.tsx`, `reviewStep === 4`) bắt người học tự viết
"quy tắc bằng lời của chính mình" + "một câu ví dụ tự đặt" — đây là bước có giá trị học tập
cao nhất trong cả quy trình mổ xẻ theo tài liệu thiết kế (mục 6.2, 6.1: chống "cảm giác thông
thạo giả"). Dữ liệu được lưu đúng, qua `putMistake()` vào bảng `mistakes` trong IndexedDB
(`src/lib/jlpt/db.ts`), có đủ trường: `cause` (1 trong 8 nguyên nhân), `confidenceAtAnswer`,
`myRule`, `myExample`, `srsKey`.

**Đã grep toàn bộ repo: `listMistakes()` (hàm đọc lại các bản ghi này) không được gọi ở bất kỳ
component/hook nào.** Người học viết xong 12 quy tắc rồi không bao giờ nhìn thấy lại chúng.
Màn "Sổ tay câu sai" hiện có (`#/mistakes`, component `MistakeNotebook.tsx`) chỉ đọc
`data.cards` (thẻ SRS từ vựng), hoàn toàn không biết tới sự tồn tại của `MistakeEntry`.

## Việc cần làm

1. Quyết định vị trí hiển thị (tự chọn 1 trong 2, hoặc đề xuất khác nếu thấy hợp lý hơn):
   - (a) Thêm một tab/section mới trong `MistakeNotebook.tsx` cho "Câu sai từ đề JLPT", tách
     biệt với danh sách thẻ SRS hiện có (vì `MistakeEntry` không có khái niệm `subjectId`
     giống thẻ SRS, không khớp bộ lọc theo môn hiện tại).
   - (b) Một màn riêng trong khu vực JLPT (ví dụ liên kết từ khối "Phòng thi JLPT" ở trang
     chủ), độc lập với `/mistakes`.
2. Với mỗi `MistakeEntry` cần hiển thị được **nội dung câu hỏi gốc** (không chỉ ghi chú cá
   nhân) — phải `getStoredExam(entry.examId)` rồi tra `entry.questionId` trong
   `stored.questions` để lấy `stem`/`choices`. Xử lý rõ ràng trường hợp đề đã bị xoá khỏi máy
   (chỉ còn hiện được ghi chú cá nhân, không hiện được câu hỏi gốc).
3. Nên **gộp/thống kê theo `cause`** (8 loại: `goi`, `bunpou`, `kanji`, `dokkai`, `choukai`,
   `wana`, `bat_can`, `het_gio` — xem `MISTAKE_CAUSES` trong `src/lib/jlpt/schema.ts`) để trả
   lời được câu "tôi hay sai vì lý do gì nhất" — đây là insight mà dữ liệu đã có sẵn nhưng
   chưa ai tổng hợp.
4. Cho lọc theo đề (`examId`) và có thể theo mức `confidenceAtAnswer`.

## Tiêu chí hoàn thành

- [ ] `listMistakes(ownerId)` được gọi và hiển thị ở ít nhất một màn hình có thể vào được từ
      điều hướng chính (không phải code chết).
- [ ] Xem được `myRule`/`myExample` người học tự viết, gắn với đúng câu hỏi gốc.
- [ ] Có ít nhất một dạng tổng hợp theo `cause` (biểu đồ, bảng, hay danh sách đếm — tự chọn
      hình thức, miễn trả lời được "sai vì gì nhiều nhất").
- [ ] Đề bị xoá khỏi máy không làm crash màn hình — chỉ ẩn phần nội dung câu hỏi, giữ nguyên
      ghi chú cá nhân.

## File / vùng code liên quan

- `src/lib/jlpt/db.ts` — `listMistakes`, `putMistake`.
- `src/lib/jlpt/schema.ts` — `MistakeEntry`, `MISTAKE_CAUSES`.
- `src/components/MistakeNotebook.tsx` — sổ tay câu sai hiện có (từ vựng), tham khảo cách lọc
  đã làm nếu chọn phương án (a).
- `src/components/jlpt/JlptExamRunner.tsx` — nơi sinh ra `MistakeEntry` (`finishOneReview`).

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Đây là phát hiện lớn thứ hai (sau ticket 002) —
  dữ liệu người học tốn công tạo ra không có đường đọc lại.
