# 011 — Nhập nhiều đề JLPT cùng lúc (multi-file)

- **Ưu tiên:** P2
- **Trạng thái:** Xong
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

- [x] Chọn hoặc kéo-thả nhiều file `.json` cùng lúc → thấy được danh sách kết quả kiểm tra
      từng file trước khi lưu.
- [x] Nhập được tất cả đề hợp lệ bằng một thao tác, không phải lặp lại "Kiểm tra → Nhập" cho
      từng đề.
- [x] Một file bị lỗi định dạng không cản trở việc nhập các file còn lại.

## File / vùng code liên quan

- `src/components/jlpt/JlptImportScreen.tsx` — toàn bộ phần dán/tải file, `handleFile`,
  `runValidate`, `handleSave`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, theo yêu cầu trực tiếp của chủ dự án (tự import đề
  cho mọi người, cần nhập được nhiều đề một lượt thay vì từng cái một).
- 2026-09-10: Làm xong. Thêm `multiple` cho `<input type="file">`, kéo-thả nhận toàn bộ
  `e.dataTransfer.files` thay vì chỉ `[0]`. Điểm vào chung `handleFiles()`: **đúng 1 file** vẫn
  đi nguyên luồng cũ (đổ vào ô dán, xem trước chi tiết câu 1, sửa tay được) — cố ý không đụng,
  vì đó vẫn là luồng chính khi sửa/soát một đề. **2+ file** mới chuyển sang màn danh sách mới
  (state `batchFiles`, kiểu `BatchFileResult[]`): đọc song song từng file → `parseImportJSON` →
  `validateImportFile`, mỗi file một dòng hiện tên file, trạng thái (hợp lệ/lỗi kèm chi tiết
  lỗi/đã nhập/lưu thất bại), rồi nút "Nhập tất cả đề hợp lệ (N)" gọi `handleSaveBatch()` — lưu
  **tuần tự** từng đề hợp lệ (`toStoredExam` → `putStoredExam` → đồng bộ server nếu đã đăng
  nhập, giống hệt `handleSave` cũ), một đề lưu lỗi không chặn các đề còn lại (bọc try/catch
  riêng từng vòng lặp, ghi lỗi vào đúng dòng đó).

  Quyết định phạm vi (không nằm trong "việc cần làm" gốc, ghi rõ để không ai tưởng là thiếu):
  - `existing` (đề trùng id để merge) tra từ một `Map` cập nhật dần TRONG lúc lưu, không phải
    snapshot `exams` tĩnh từ đầu batch — để hai file trùng id trong CÙNG một lượt kéo-thả vẫn
    nối đúng vào nhau (file sau ghi đè đúng lên bản file trước vừa lưu), không chỉ trùng với
    đề đã có sẵn trong kho từ trước.
  - Batch KHÔNG chạy `suggestLinkedItemKeys` (dò thẻ SRS tương ứng) như luồng 1-file — quét cả
    kho từ vựng cho mỗi đề, hàng chục đề cùng lúc sẽ chậm rõ rệt, trong khi đây chỉ là gợi ý
    không bắt buộc. Ai cần khớp SRS kỹ cho một đề cụ thể vẫn nhập lại đúng đề đó qua ô dán
    1-file như cũ.
  - Đề nhập theo lượt batch luôn `reviewed: false` (chưa kiểm) — không có checkbox "đã tự soát
    lại" cho từng đề như luồng 1-file, đánh dấu "đã kiểm" hàng loạt sẽ là nói dối.

  **Đã kiểm:** `npx tsc -b` và `npx oxlint` trên `JlptImportScreen.tsx` sạch. **Chưa kiểm bằng
  UI thật**: cần đăng nhập + có vài file `.json` đề JLPT hợp lệ (và ít nhất một file cố ý sai
  định dạng để test tiêu chí 3) để kéo-thả/chọn thử — không dựng kịp bộ file mẫu trong phiên
  này (`data/jlpt-exams/` chưa có đề mẫu nào, xem ticket 015). Ai test tay cần xác nhận: (1)
  thả đúng 1 file vẫn ra luồng cũ như trước giờ, (2) thả 2+ file ra đúng danh sách trạng thái
  từng dòng, (3) "Nhập tất cả đề hợp lệ" bỏ qua file lỗi mà vẫn nhập xong các file hợp lệ khác.
