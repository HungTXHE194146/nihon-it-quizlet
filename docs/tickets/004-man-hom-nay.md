# 004 — Màn "Hôm nay": một CTA duy nhất mỗi ngày

- **Ưu tiên:** P0
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** 002, 003 (cần dữ liệu "bài chưa mổ xẻ" và "lỗi JLPT cần ôn" mà hai ticket đó
  làm cho đọc được — xem ghi chú "Có thể làm trước" bên dưới nếu muốn bắt đầu sớm hơn)

## Bối cảnh

Câu hỏi gốc của chủ dự án khi giao việc này: *"Làm sao để giúp tôi không phải suy nghĩ mà
biết hôm nay phải học gì, học như nào."* Hiện trang chủ (`Homepage.tsx`) có **hai lối đi song
song, không liên quan nhau**:

- Khối "Ôn N3 hôm nay" — chỉ biết về thẻ SRS từ vựng/Kanji (`statsFor(N3_SCOPE)`), không biết
  gì về JLPT.
- Khối "Phòng thi JLPT" — chỉ hiện số đề, bài đang làm dở (`running`), điểm lần gần nhất. Không
  liên quan gì tới khối N3 ở trên, không tự gợi ý "nên làm gì tiếp".

Người học phải tự quyết định bấm vào cái nào — đúng cái mà câu hỏi này muốn xoá bỏ.

## Việc cần làm

Dựng một khối duy nhất, ưu tiên cao nhất trên trang chủ, tổng hợp **tất cả việc tồn đọng**
thành **một** hành động được đề xuất rõ ràng, theo thứ tự ưu tiên (tham khảo
`docs/jlpt-practice-test-research.md` mục 4 — Zeigarnik effect: việc dở dang phải được nhắc
trước; mục 4.7 — peak-end rule):

1. **Có bài JLPT đã nộp nhưng chưa mổ xẻ xong** (cần ticket 002 cung cấp dữ liệu này) → ưu
   tiên cao nhất, vì đây là việc dở dang cụ thể, có deadline tâm lý (càng để lâu càng quên bối
   cảnh lúc làm bài).
2. **Có lỗi JLPT cần ôn lại** (nếu ticket 005 — thẻ SRS cho câu hỏi JLPT — đã xong, dùng
   `isDue` như thẻ thường; nếu chưa, tạm thời bỏ qua nhánh này).
3. **Có thẻ N3 (từ vựng/Kanji) đến hạn ôn** → dùng `buildReviewQueue`/`statsFor(N3_SCOPE)` đã
   có sẵn.
4. **Không có gì tồn đọng** → gợi ý một hành động khởi động nhẹ: học thẻ N3 mới, hoặc bắt đầu
   một phiên JLPT cỡ "nhấm nháp" (5 phút) nếu đã có đề trong kho.

Khối này thay thế (hoặc đứng trên, làm nổi bật hơn) hai khối rời rạc hiện tại — không nhất
thiết phải xoá "Ôn N3 ngay" / "Phòng thi JLPT", nhưng phải có **một** điểm bắt đầu rõ ràng ở
trên cùng, không bắt người học so sánh hai lựa chọn ngang hàng.

## Có thể làm trước (không cần chờ 002/003 xong)

Có thể dựng khung + nhánh 3 và 4 trước (chỉ cần dữ liệu N3 đã có sẵn), để lại chỗ trống/TODO
rõ ràng cho nhánh 1 và 2, miễn là khi 002/003 xong thì cắm dữ liệu vào không phải viết lại
toàn bộ khối.

## Tiêu chí hoàn thành

- [ ] Trang chủ có một khối duy nhất, thứ tự ưu tiên đúng như trên, dẫn thẳng tới đúng hành
      động (không phải màn chọn lựa).
- [ ] Việc dở dang (bài chưa mổ xẻ) luôn được nhắc, không im lặng biến mất nếu người học không
      chủ động vào xem.
- [ ] Không tạo thêm quyết định mới cho người dùng phải cân nhắc — nếu cả 2 nhánh đều có việc
      (vd vừa có bài chưa mổ xẻ vừa có thẻ N3 đến hạn), khối vẫn chỉ đề xuất **một** hành động
      chính, việc còn lại có thể hiện dạng phụ/nhỏ hơn.

## File / vùng code liên quan

- `src/components/Homepage.tsx` — nơi dựng khối này.
- `src/hooks/useJlptSummary.ts` — mở rộng để trả về thêm "số bài chưa mổ xẻ xong" (cần ticket
  002 làm trước hoặc làm cùng).
- `src/hooks/useProgress.tsx` — `statsFor`, `buildReviewQueue` (N3 đã dùng được ngay).

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, trả lời trực tiếp câu hỏi "làm sao không phải nghĩ"
  của chủ dự án.
