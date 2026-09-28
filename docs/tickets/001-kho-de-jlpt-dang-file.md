# 001 — Kho đề JLPT dạng file trong repo (backup + nguồn thật)

- **Ưu tiên:** P0
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Đề JLPT hiện chỉ sống ở IndexedDB (trình duyệt) và Vercel KV (kho chung) — cả hai đều không
có backup/version. Chủ dự án sẽ tự tay nhập đề cho cả nhóm dùng, nên mất đề là mất công sức
quản trị, không phải rủi ro của riêng một người dùng.

## Việc đã làm

Tạo `data/jlpt-exams/` với `README.md` quy định:
- Mỗi đề là một file `<exam.id>.json`, đúng định dạng `JlptImportFile` (`src/lib/jlpt/schema.ts`).
- Quy trình: lưu file vào đây → dán/tải cùng nội dung đó vào `#/jlpt/import` trên web đang
  chạy để đề thực sự tới tay người học → commit.
- Hai bước (lưu file repo / đẩy lên KV qua UI) **độc lập nhau, không tự động** cho tới khi
  ticket 015 được làm.

## Tiêu chí hoàn thành

- [x] Thư mục `data/jlpt-exams/` tồn tại với `README.md` giải thích quy ước.
- [x] README trỏ đúng tới `src/lib/jlpt/schema.ts` làm nguồn sự thật cho định dạng (không
      chép lại schema thành hai bản dễ lệch nhau).
- [x] README nói rõ giới hạn hiện tại (không tự nạp vào app) và trỏ sang ticket 015.

## Ngoài phạm vi

- Không xây cơ chế tự nạp file vào app — đó là ticket 015 (đang Chặn, chờ quyết định thiết kế).
- Không validate file JSON bằng script — validate vẫn làm bằng cách dán vào `#/jlpt/import`
  (dùng `validateImportFile` đã có).

## Nhật ký

- 2026-09-07: Tạo thư mục + README theo yêu cầu trực tiếp của chủ dự án ("tôi sẽ tự import đề
  cho mọi người, cần 1 chỗ để lưu lại đống đề đó"). Đánh dấu Xong.
