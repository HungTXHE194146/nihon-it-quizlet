# 011 — Nhập nhiều đề JLPT cùng lúc (multi-file)

- **Ưu tiên:** P2
- **Trạng thái:** Chưa bắt đầu
- **Phụ thuộc:** —

## Bối cảnh

Chủ dự án sẽ tự tay nhập đề cho cả nhóm dùng (không phải "ai nhập nấy" như thiết kế ban đầu),
nghĩa là số lượng đề nhập một lượt có thể là hàng chục file. Màn `JlptImportScreen.tsx` hiện
chỉ nhận **một** file mỗi lần (input file không có `multiple`, `handleFile(file: File)` xử lý
đúng 1 file, textarea dán JSON cũng chỉ chứa được 1 đề). Nhập 20 đề là 20 lượt
dán/kiểm tra/lưu thủ công.

## Việc cần làm

1. Thêm `multiple` cho `<input type="file">`, và kéo-thả cũng nên nhận nhiều file cùng lúc
   (`e.dataTransfer.files` hiện chỉ lấy `files?.[0]`).
2. Xử lý tuần tự từng file: đọc → `parseImportJSON` → `validateImportFile` → nếu hợp lệ thì
   `putStoredExam` (+ đồng bộ server nếu đã đăng nhập, giống `handleSave` hiện có).
3. Cần một màn xem trước dạng danh sách (thay vì xem trước 1 đề như hiện tại) — mỗi file một
   dòng: tên đề, số câu, trạng thái (hợp lệ / có lỗi kèm chi tiết), rồi một nút "Nhập tất cả
   đề hợp lệ".
4. File nào lỗi thì báo rõ lỗi của **đúng file đó**, không chặn các file hợp lệ khác — không
   được để một file lỗi làm hỏng cả lượt nhập.

## Tiêu chí hoàn thành

- [ ] Chọn hoặc kéo-thả nhiều file `.json` cùng lúc → thấy được danh sách kết quả kiểm tra
      từng file trước khi lưu.
- [ ] Nhập được tất cả đề hợp lệ bằng một thao tác, không phải lặp lại "Kiểm tra → Nhập" cho
      từng đề.
- [ ] Một file bị lỗi định dạng không cản trở việc nhập các file còn lại.

## File / vùng code liên quan

- `src/components/jlpt/JlptImportScreen.tsx` — toàn bộ phần dán/tải file, `handleFile`,
  `runValidate`, `handleSave`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, theo yêu cầu trực tiếp của chủ dự án (tự import đề
  cho mọi người, cần nhập được nhiều đề một lượt thay vì từng cái một).
