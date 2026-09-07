# 006 — Áp dụng đủ ma trận độ chắc chắn × đúng-sai vào lịch ôn

- **Ưu tiên:** P1
- **Trạng thái:** Chưa bắt đầu
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

- [ ] Cả 6 ô trong bảng trên đều có xử lý khác nhau, kiểm chứng được bằng cách gọi hàm với dữ
      liệu giả và so `interval`/`ease`/`due` ra đúng như bảng.
- [ ] Không phá vỡ hành vi `review()` khi gọi từ luồng N3 thường (thẻ từ vựng/Kanji vẫn ôn y
      hệt trước — không được vô tình đổi công thức chung).
- [ ] Ghi rõ trong code (comment) tại sao mỗi ô lại xử lý như vậy, trỏ về mục 6.4 của tài liệu
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
