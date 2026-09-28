# 006 — Áp dụng đủ ma trận độ chắc chắn × đúng-sai vào lịch ôn

- **Ưu tiên:** P1
- **Trạng thái:** Xong
- **Phụ thuộc:** 005 (cần có thẻ SRS riêng cho câu hỏi JLPT thì ma trận mới có chỗ áp dụng đầy
  đủ — hiện tại tín hiệu chỉ chảy vào thẻ từ vựng qua `linkedItemKey`)

## Bối cảnh

Màn làm bài JLPT bắt người học chọn mức độ chắc chắn cho mỗi câu đã trả lời (`Chắc` /
`Phân vân` / `Đoán` — `CONFIDENCE_OPTIONS` trong `JlptExamRunner.tsx`). Tài liệu thiết kế
(`docs/jlpt-practice-test-research.md` mục 6.4) quy định **6 ô** xử lý khác nhau:

| Ô ma trận | Trạng thái khởi đầu đề xuất |
|---|---|
| Sai + chắc chắn | `ease` giảm mạnh hơn thường lệ; ôn lại trong ngày, rồi 1 ngày |
| Sai + phân vân | Như thẻ sai bình thường hiện tại |
| Sai + đoán | Vào hàng thẻ mới, không tính là "lapse" |
| Đúng + đoán | Ép `interval` về 1 ngày dù trả lời đúng |
| Đúng + phân vân | `interval` × 0.6 |
| Đúng + chắc chắn | Bình thường |

Thực tế code (`src/lib/jlpt/attemptLogic.ts`, hàm `srsSignalForMatrix`) **chỉ cài đúng 1
trong 6 ô**: "Đúng + đoán" → coi như sai. Năm ô còn lại rơi về xử lý mặc định của
`review()` trong `src/lib/srs.ts` như một câu trả lời nhị phân bình thường — tức là bấm "Chắc"
hay "Đoán" không tạo khác biệt gì tới lịch ôn, dù UI vẫn cho chọn.

## Việc cần làm

1. `src/lib/srs.ts` hiện chỉ nhận `correct: boolean`. Cần mở rộng để cho phép các biến thể:
   - Ép `interval` về một giá trị cụ thể sau khi tính (dùng cho "Đúng + đoán", "Đúng + phân
     vân").
   - Giảm `ease` mạnh hơn mức mặc định (dùng cho "Sai + chắc chắn").
   - Đưa thẳng về trạng thái "thẻ mới" thay vì tăng `lapses` (dùng cho "Sai + đoán").

   Cân nhắc: có thể làm bằng cách `review()` trả về card như cũ, rồi một hàm riêng
   `applyConfidenceAdjustment(card, cell)` chỉnh lại sau — tránh sửa chữ ký `review()` làm ảnh
   hưởng luồng ôn N3 hiện có (chỗ này đang chạy ổn, đừng động vào nếu không cần).

2. `srsSignalForMatrix` (hoặc hàm thay thế) phải trả về đủ thông tin để áp cả 6 ô, không chỉ
   `boolean`.

3. Điểm gọi trong `JlptExamRunner.tsx` (`submit()`) cần truyền đủ `(wasCorrect, confidence)`
   vào đúng hàm mới — hiện đã truyền `confidence` nhưng hàm nhận chỉ dùng nó cho 1 nhánh.

## Tiêu chí hoàn thành

- [x] Cả 6 ô trong bảng trên đều có xử lý khác nhau, kiểm chứng được bằng cách gọi hàm với dữ
      liệu giả và so `interval`/`ease`/`due` ra đúng như bảng.
- [x] Không phá vỡ hành vi `review()` khi gọi từ luồng N3 thường (thẻ từ vựng/Kanji vẫn ôn y
      hệt trước — không được vô tình đổi công thức chung).
- [x] Ghi rõ trong code (comment) tại sao mỗi ô lại xử lý như vậy, trỏ về mục 6.4 của tài liệu
      thiết kế — để người sau không tưởng là bug rồi "sửa" về giống nhau hết.

## File / vùng code liên quan

- `src/lib/srs.ts`
- `src/lib/jlpt/attemptLogic.ts` (`srsSignalForMatrix`)
- `src/components/jlpt/JlptExamRunner.tsx` (`submit`)
- `docs/jlpt-practice-test-research.md` mục 6.3, 6.4

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Chờ ticket 005 xong (thẻ SRS riêng cho câu hỏi
  JLPT) mới nên bắt đầu — nếu không, ma trận vẫn chỉ áp được lên thẻ từ vựng như hiện tại,
  không giải quyết được gốc vấn đề.
- 2026-09-08: **Làm xong.** `review()` trong `src/lib/srs.ts` giữ NGUYÊN, không sửa chữ ký lẫn
  logic — chỉ thêm 3 hàm chỉnh sau (`withIntervalDays`, `dropEaseExtra`, `asFreshLearning`),
  hoàn toàn không có luồng nào khác gọi tới nên không ảnh hưởng N3/vocab.

  - `attemptLogic.ts`: xoá `srsSignalForMatrix` (hàm cũ chỉ cài 1/6 ô, ép Đúng+Đoán thành
    boolean sai), thay bằng `applyConfidenceMatrix(prev, wasCorrect, confidence, now)` — nhận
    thẳng `CardState` cũ, trả `CardState` mới đã áp đúng ô, dùng lại `review()` làm nền cho 4/6
    ô (2 ô còn lại — Sai+chắc chắn dùng `review(false)` rồi `dropEaseExtra`; Sai+đoán dùng hẳn
    `asFreshLearning` thay vì `review()`).
  - **`recordReview()` trong `useProgress.tsx` phải sửa** (ticket không liệt kê file này, nhưng
    không có cách nào áp ma trận mà không chạm vào chỗ duy nhất cầm cả `prev.cards[key]` lẫn
    `setData`): thêm tham số thứ 3 TUỲ CHỌN `confidence?: Confidence`. Bỏ qua thì chạy đúng
    `srsReview()` như cũ — 3 điểm gọi 2-tham-số hiện có (`StudySession`, `ExamSession`,
    `JlptReviewSession`) không đổi một dòng nào và không đổi hành vi. Chỉ `JlptExamRunner.submit()`
    truyền tham số thứ 3, và truyền cho CẢ khoá `jlpt::` lẫn thẻ từ vựng nối được (`linkedKeyFor`)
    — trước đây `srsSignalForMatrix` chỉ ảnh hưởng đúng 1 ô, giờ ma trận đầy đủ nên áp luôn cho
    thẻ từ vựng thay vì chỉ câu hỏi JLPT.
  - `MIN_EASE`/`DAY_MS` dùng lại nguyên từ `srs.ts`, không định nghĩa lại hằng số ở nơi khác.

  Kiểm chứng:
  1. **Đơn vị (esbuild bundle `attemptLogic.ts`, chạy bằng node, không qua trình duyệt):** gọi
     `applyConfidenceMatrix` với cùng một thẻ gốc cho cả 6 ô, so khớp từng bảng ở mục 6.4 —
     Sai+chắc chắn giảm ease SÂU HƠN Sai+phân vân (2.15 so với 2.30); Sai+đoán không tăng
     `lapses` (0 so với 1 của Sai+phân vân) và `due` = ngay bây giờ; Đúng+đoán ép `interval`
     về đúng 1 (so với 25 ngày của Đúng+chắc chắn cùng thẻ gốc); Đúng+phân vân =
     `round(interval_gốc × 0.6)` = 15 so với 25.
  2. **Trình duyệt thật, nộp một đề thật** (không mock logic): 3 câu, chọn lần lượt Đúng+Đoán /
     Sai+Chắc / Sai+Đoán, đọc thẳng `data.cards` trong `localStorage` sau khi nộp — kết quả
     khớp đúng dự đoán (interval=1, ease giảm sâu hơn -0.2 mặc định, lapses=0 và due~ngay).
  3. Mở một phiên `StudySession` ôn từ vựng N3 thật — dựng được bình thường, không crash, xác
     nhận đường gọi 2-tham-số không bị ảnh hưởng.

  **Cố ý chưa làm:** chưa có UI hiển thị lý do "vì sao thẻ này lại ôn sớm/muộn hơn bình
  thường" (ví dụ nhãn "ép do đoán đúng" trong sổ tay lỗi hay màn ôn) — mục 6.3/6.4 chỉ yêu cầu
  đúng hành vi lịch ôn, không yêu cầu hiển thị lý do; nếu sau này muốn thêm thì đọc lại
  `applyConfidenceMatrix` để biết ô nào đã được áp cho một thẻ cụ thể (hiện không lưu lại "đã
  bị chỉnh bởi ô nào" trong `CardState`, chỉ có kết quả cuối).
