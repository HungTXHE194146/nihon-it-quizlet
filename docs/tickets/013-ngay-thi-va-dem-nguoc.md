# 013 — Ngày thi mục tiêu + đếm ngược + phân bổ khối lượng ôn

- **Ưu tiên:** P3
- **Trạng thái:** Xong
- **Phụ thuộc:** 004 (khối "Hôm nay" là nơi tiêu thụ thông tin ngày thi để điều chỉnh gợi ý)

## Bối cảnh

Không có nơi nào trong app biết người học **thi ngày nào**. Thiếu mốc này thì mọi lời khuyên
"hôm nay nên học bao nhiêu" đều tuỳ tiện — không phân biệt được người còn 3 tháng với người
còn 3 ngày.

## Việc cần làm

1. Thêm một trường ngày thi mục tiêu vào cấu hình cá nhân — gợi ý:
   `ProgressSettings.jlptExamDate?: string` (ISO date) trong `src/hooks/useProgress.tsx`, đi
   theo đúng tài khoản/khách như các cài đặt khác hiện có (`ttsAutoplay`, `dailyNewLimit`...).
2. Một chỗ để đặt/sửa ngày này — có thể ở modal cài đặt hiện có trong `StudySession.tsx`, hoặc
   một chỗ mới ở trang chủ gần khối "Hôm nay" (ticket 004).
3. Hiện đếm ngược (ví dụ "còn 42 ngày tới kỳ thi") ở trang chủ.
4. Dùng mốc này để điều chỉnh đề xuất ở khối "Hôm nay" (ticket 004) — ví dụ: càng gần ngày
   thi, càng ưu tiên làm đề JLPT trọn vẹn (mode `full`) hơn là "nhấm nháp"; hoặc tăng ngưỡng
   cảnh báo nếu còn nhiều lỗi JLPT chưa mổ xẻ mà ngày thi đã gần.

## Tiêu chí hoàn thành

- [x] Đặt được ngày thi, lưu đúng theo tài khoản/khách (`ProgressSettings.examDate`, đi qua
      `updateSettings` nên tự động theo đúng khoá localStorage của từng tài khoản).
- [x] Trang chủ hiện đếm ngược tới ngày đó.
- [x] Khối "Hôm nay" (ticket 004) đọc được mốc này và thay đổi gợi ý theo khoảng cách còn lại.

## File / vùng code liên quan

- `src/lib/roadmap.ts` — **toàn bộ ý đồ sư phạm nằm ở đây**, hàm thuần, không đụng React
- `src/components/RoadmapPanel.tsx` — bảng lộ trình ở trang chủ
- `src/hooks/useProgress.tsx` (`ProgressSettings.examDate`, `DailyStat.newCards`)
- `src/lib/todayAction.ts` (tham số `phase`)
- `src/components/Homepage.tsx` (nơi ráp lại)

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Ưu tiên thấp, làm sau khi khối "Hôm nay" (004) đã
  có hình hài — làm trước sẽ không có chỗ nào để cắm dữ liệu vào.
- 2026-09-10: **Xong**, và làm rộng hơn ticket gốc: chủ dự án hỏi thẳng "thiết kế roadmap từ
  giờ tới ngày thi để người học chỉ cần follow theo", nên phần "đếm ngược" chỉ là một dòng
  trong đó.

  **Chia 4 chặng theo số ngày còn lại** (không theo ngày cố định, để đổi ngày thi là lộ trình
  tự tính lại): >56 ngày → Nền tảng · 29-56 → Tăng tốc · 8-28 → Luyện đề · 0-7 → Chốt hạ.
  Ba nguyên tắc đằng sau, chép lại đầu `roadmap.ts`:

  1. **Thẻ mới dừng trước ngày thi 14 ngày** (`NEW_CUTOFF_DAYS`). Thẻ học lần đầu cần vài vòng
     nhắc lại (1 ngày → 6 ngày → ...) mới thành trí nhớ dài hạn; nạp thêm ở tuần cuối chỉ tạo
     cảm giác bận rộn. Chặng "Chốt hạ" vì vậy tự bỏ hẳn mục học thẻ mới, và `pickTodayAction`
     cũng bỏ qua nhánh `n3-new` ở chặng đó.
  2. **Làm đề sớm, không để dành.** Chặng nào cũng có chỉ tiêu đề, chỉ khác cỡ phiên: nhấm
     nháp → một khối tính giờ → trọn đề. Đề là dụng cụ chẩn đoán, không phải bài kiểm tra
     cuối khoá.
  3. **Nợ cũ chặn việc mới.** Danh sách "hôm nay" xếp cố định: mổ xẻ câu sai tồn → ôn thẻ đến
     hạn → ôn câu JLPT đến hạn → học thẻ mới → chỉ tiêu đề của tuần.

  **Nhịp thẻ mới được tính chứ không đoán:** `suggestedDailyNew = số thẻ chưa học / số ngày
  tới mốc ngừng nạp`. Với 1896 thẻ N3 và ~72 ngày là ~27 thẻ/ngày, trong khi `dailyNewLimit`
  mặc định là 20 — nên lộ trình cảnh báo thẳng "nhịp hiện tại không kịp phủ hết giáo trình"
  kèm nút đặt hạn mức đúng bằng con số cần. Không có cảnh báo này thì người học vẫn tick đủ
  việc mỗi ngày mà tới ngày thi vẫn còn vài trăm thẻ chưa từng nhìn thấy.

  `examDate` mặc định `2026-12-05` để lộ trình chạy được ngay từ lần mở đầu tiên; sửa được
  ngay trên bảng lộ trình. **Lưu ý cho lần sau:** JLPT chính thức luôn rơi vào Chủ nhật đầu
  tiên của tháng 7 và tháng 12 — tháng 12/2026 là **6/12** (5/12 là thứ Bảy). Giữ nguyên
  5/12 theo yêu cầu của chủ dự án; nếu đó là nhầm lẫn thì chỉ cần sửa lại trên trang chủ,
  không phải sửa code.
