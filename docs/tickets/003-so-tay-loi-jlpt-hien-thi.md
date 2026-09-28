# 003 — Sổ tay lỗi JLPT: hiển thị được, gộp với sổ tay câu sai

- **Ưu tiên:** P0
- **Trạng thái:** Xong
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

- [x] `listMistakes(ownerId)` được gọi và hiển thị ở ít nhất một màn hình có thể vào được từ
      điều hướng chính (không phải code chết).
- [x] Xem được `myRule`/`myExample` người học tự viết, gắn với đúng câu hỏi gốc.
- [x] Có ít nhất một dạng tổng hợp theo `cause` (biểu đồ, bảng, hay danh sách đếm — tự chọn
      hình thức, miễn trả lời được "sai vì gì nhiều nhất").
- [x] Đề bị xoá khỏi máy không làm crash màn hình — chỉ ẩn phần nội dung câu hỏi, giữ nguyên
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
- 2026-09-08: **Làm xong.** Chọn phương án (a) — thêm tab vào `#/mistakes` chứ không dựng màn
  riêng. Lý do: người học chỉ nên có MỘT chỗ để hỏi "điểm yếu của tôi ở đâu"; hai màn riêng
  thì phải nhớ điểm yếu nào nằm ở màn nào. Nhưng vẫn tách thành hai tab chứ không trộn chung
  một danh sách, vì bộ lọc theo môn và nút "học lại N câu" của thẻ SRS vô nghĩa với
  `MistakeEntry` (không có `subjectId`, không có lịch ôn).

  Chi tiết đã làm:
  - `src/components/jlpt/JlptMistakeList.tsx` (mới): gọi `listMistakes(ownerId)`, chỉ nạp
    những đề thật sự có mục trong sổ tay (`getStoredExam` theo từng `examId` riêng biệt, chứ
    không `listStoredExams()` — mỗi đề cả trăm KB).
  - `src/lib/jlpt/mistakeStats.ts` (mới): `countByCause` + `causeLabel` + `CONFIDENCE_LABELS`,
    thuần, tách khỏi component.
  - Tab nằm trên URL (`#/mistakes?tab=jlpt`) chứ không phải state trong component: cần dẫn
    thẳng từ trang chủ vào, và ticket 004 sẽ cần đúng đường dẫn này.
  - Nhờ tab nằm trên URL, `App.tsx` bỏ luôn việc nạp ~1 MB dữ liệu bài học khi mở tab JLPT
    (`requiredSubject = null`) — tab đó không đụng tới `itemByKey`.
  - Lối vào: nút "Sổ tay lỗi JLPT (N)" ở khối "Phòng thi JLPT" trên trang chủ; `useJlptSummary`
    có thêm `mistakeCount`.
  - `StemText` tách ra `src/components/jlpt/StemText.tsx` để sổ tay và phòng thi hiện câu hỏi
    y hệt nhau (kể cả chỗ gạch chân — với 問題 dạng 言い換え thì chỗ gạch chân chính là đề bài).
  - Mỗi mục hiện: nguyên nhân, mức chắc chắn lúc làm bài, tên đề (bấm được để mở lại đề),
    câu hỏi gốc + 4 phương án có đánh dấu đáp án đúng / phương án đã chọn, kết quả chọn lại
    lúc mổ xẻ, lời giải của đề (thu gọn), và quy tắc/ví dụ người học tự viết.
  - Lọc: theo đề, theo mức `confidenceAtAnswer`, bấm vào một nguyên nhân trong biểu đồ để lọc,
    và ô tìm kiếm chạy trên cả câu hỏi lẫn ghi chú cá nhân.
  - Thống kê nguyên nhân tính TRÊN phạm vi đề đang lọc, không phải luôn trên toàn bộ — hỏi
    "trong đề này tôi hay sai vì gì" cũng phải trả lời được.

  Kiểm chứng bằng trình duyệt thật (Playwright, không mock UI): làm một đề 3 câu sai cả 3 với
  ba mức chắc chắn khác nhau → mổ xẻ đủ 3 câu với hai nguyên nhân khác nhau + quy tắc/ví dụ tự
  viết → trang chủ hiện "Sổ tay lỗi JLPT (3)" → bấm vào ra đúng tab, thống kê "Nhiều nhất: Sai
  chữ Hán (2/3 câu · 67%)", cả 3 quy tắc và ví dụ hiện đúng chỗ, lọc theo nguyên nhân/mức chắc
  chắn/tìm kiếm đều đúng một mục → xoá đề khỏi IndexedDB rồi mở lại: hiện "Đề đã bị xoá khỏi
  máy", ghi chú còn nguyên, thống kê vẫn chạy, không có console error. Thêm một lượt riêng kiểm
  tra tách theo tài khoản: u1 không thấy ghi chú của u2 và ngược lại.

  **Cố ý chưa làm:** chưa cho sửa/xoá một mục trong sổ tay, và chưa nối `srsKey` để bấm từ sổ
  tay sang thẳng thẻ SRS tương ứng (thẻ SRS chỉ có khi tab kia đã nạp dữ liệu môn). Nếu muốn
  thì mở ticket riêng, đừng nhét vào đây.
