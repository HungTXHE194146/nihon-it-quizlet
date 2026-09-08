# 013 — Ngày thi mục tiêu + đếm ngược + phân bổ khối lượng ôn

- **Ưu tiên:** P3
- **Trạng thái:** Chưa bắt đầu
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

- [ ] Đặt được ngày thi, lưu đúng theo tài khoản/khách (không lẫn giữa các tài khoản trên cùng
      máy — xem cách `useProgress.tsx` đã tách khoá localStorage theo tài khoản).
- [ ] Trang chủ hiện đếm ngược tới ngày đó.
- [ ] Khối "Hôm nay" (ticket 004) đọc được mốc này và thay đổi gợi ý theo khoảng cách còn lại
      (không bắt buộc phải là logic phức tạp — chỉ cần *có* ảnh hưởng thấy được).

## File / vùng code liên quan

- `src/hooks/useProgress.tsx` (`ProgressSettings`, `updateSettings`)
- `src/components/Homepage.tsx`
- Ticket 004 (nơi tiêu thụ)

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Ưu tiên thấp, làm sau khi khối "Hôm nay" (004) đã
  có hình hài — làm trước sẽ không có chỗ nào để cắm dữ liệu vào.
