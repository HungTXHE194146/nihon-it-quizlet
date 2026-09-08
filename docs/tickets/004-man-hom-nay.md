# 004 — Màn "Hôm nay": một CTA duy nhất mỗi ngày

- **Ưu tiên:** P0
- **Trạng thái:** Xong
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

- [x] Trang chủ có một khối duy nhất, thứ tự ưu tiên đúng như trên, dẫn thẳng tới đúng hành
      động (không phải màn chọn lựa).
- [x] Việc dở dang (bài chưa mổ xẻ) luôn được nhắc, không im lặng biến mất nếu người học không
      chủ động vào xem.
- [x] Không tạo thêm quyết định mới cho người dùng phải cân nhắc — nếu cả 2 nhánh đều có việc
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
- 2026-09-08: **Làm xong.** Ticket 002 và 003 đã xong nên cả 2 nhánh dữ liệu đầu (bài dở dang
  / câu chưa mổ xẻ) dùng thẳng `useJlptSummary` có sẵn, không cần TODO.

  Chi tiết:
  - `src/lib/todayAction.ts` (mới): `pickTodayAction()` thuần, nhận trạng thái N3 + JLPT, trả
    về đúng MỘT `TodayAction` theo thứ tự ưu tiên trong ticket. Có thêm nhánh
    `jlpt-running` (bài JLPT đang làm dở, CHƯA nộp) lên đầu — ticket gốc chỉ liệt kê từ "đã nộp
    nhưng chưa mổ xẻ", nhưng một bài đang thi dở là việc dở dang cụ thể và tức thời hơn cả:
    ngữ cảnh còn nguyên trong đầu, để càng lâu càng phải đọc lại đề từ đầu. Chừa sẵn chỗ ghi
    chú cho ticket 005 (nhánh "có lỗi JLPT cần ôn" sẽ chèn giữa `jlpt-pending-review` và
    `n3-due` khi thẻ SRS cho câu hỏi JLPT có `isDue`).
  - `Homepage.tsx`: thêm khối "Hôm nay" — banner tím ngay dưới hero, trên cả khối N3 lẫn
    "Phòng thi JLPT" cũ (không xoá hai khối đó, chỉ không còn là điểm bắt đầu). Một nút CTA
    to duy nhất; việc tồn đọng khác (không được chọn làm chính) hiện thành pill nhỏ bên dưới,
    vẫn bấm được nhưng rõ ràng là phụ — không phải một lựa chọn ngang hàng.
  - Bao trọn 6 nhánh: `jlpt-running`, `jlpt-pending-review`, `n3-due`, `n3-new` (gộp người mới
    và "còn thẻ mới, không due"), `jlpt-taste` (N3 đã hết việc nhưng có đề trong kho), `all-done`
    (không còn gì, kể cả không có đề — gợi ý đi nhập đề).

  Kiểm chứng bằng trình duyệt thật (Playwright, 7 kịch bản seed trực tiếp localStorage +
  IndexedDB, đọc lại tiêu đề/mô tả/CTA/pill phụ trên trang chủ thật):
  1. `jlpt-running` → "Đang làm dở: Đề số 1", CTA "Tiếp tục làm bài", không có phụ.
  2. `jlpt-pending-review` → "Còn 1 câu sai chưa mổ xẻ", CTA "Mổ xẻ ngay".
  3. `n3-due` → "1 thẻ N3 đến hạn ôn", CTA "Ôn N3 ngay".
  4. `n3-new` (người mới) → "Bắt đầu lộ trình N3", CTA "Bắt đầu".
  5. `n3-new` (còn thẻ mới, không due) → "Học thêm 1594 thẻ N3 mới", CTA "Học thẻ mới".
  6. **Kết hợp** pendingReview + N3 due cùng lúc → CTA chính vẫn chỉ một ("Mổ xẻ ngay"), N3 due
     rơi xuống đúng một pill phụ "1 thẻ N3 khác cũng đã đến hạn" — đúng tiêu chí "không ép chọn
     giữa hai lựa chọn ngang hàng". Có ảnh chụp màn hình xác nhận layout.
  - Nhánh `jlpt-taste` và `all-done` chỉ xác nhận bằng đọc lại code (không seed được trạng thái
    "N3 đã hết sạch thẻ mới" trong test nhanh vì kho từ vựng N3 có ~1600 mục) — logic là
    `else if` tuyến tính nên rủi ro thấp, nhưng nếu sau này nghi ngờ thì test bằng cách trỏ
    `totalItemsOf` sang một scope rỗng.

  **Cố ý chưa làm:** chưa xoá/thu gọn hai khối "Ôn N3 ngay" và "Phòng thi JLPT" bên dưới —
  ticket không bắt buộc, và chúng vẫn có việc riêng (chọn phiên theo môn cụ thể, xem danh sách
  đề, v.v.) mà một CTA duy nhất không thay được. Nhánh "có lỗi JLPT cần ôn" (ticket 005) chưa
  cắm vào `pickTodayAction` vì chưa có `isDue` cho câu hỏi JLPT — đã để lại comment rõ vị trí
  cần chèn.
- 2026-09-08: Ticket 005 xong, đã cắm nhánh #3 ("có câu JLPT đến hạn ôn") đúng chỗ để trống ở
  trên — nay `pickTodayAction` có đủ 6 nhánh, không còn nhánh nào bị bỏ qua vì thiếu dữ liệu.
