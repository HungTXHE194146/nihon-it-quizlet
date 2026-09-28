# 015 — Nạp đề JLPT từ thư mục repo (thay vì chỉ dựa vào KV)

- **Ưu tiên:** P2
- **Trạng thái:** Chặn (cần quyết định)
- **Phụ thuộc:** 001

## Chặn bởi

Cần chủ dự án chốt hướng kiến trúc trước khi code — hai lựa chọn đánh đổi khác hẳn nhau:

**Hướng A — Đóng gói tĩnh (build-time), giống cách `lessons.ts` hoạt động.**
Dùng `import.meta.glob('/data/jlpt-exams/*.json')` (Vite) để mọi file trong
`data/jlpt-exams/` được đóng gói thẳng vào bundle lúc build, tự có sẵn cho mọi người dùng ngay
khi mở web — **không cần** đăng nhập, không cần KV, không cần ai bấm "Nhập đề" nữa cho các đề
đã có trong repo.
- Ưu: đề "chính thức" luôn có sẵn, mọi bản deploy đều giống nhau, không phụ thuộc KV còn sống
  hay không, không tốn thao tác thủ công (bước 3 ở `data/jlpt-exams/README.md` biến mất).
- Nhược: mỗi lần thêm đề phải rebuild + deploy lại (không còn "nhập nóng" như hiện tại); tăng
  kích thước bundle theo số đề (đề JLPT đầy đủ có thể nặng, cần kiểm tra ảnh hưởng thời gian
  tải trang — xem cách `subjectLoader.ts` đang nạp lười dữ liệu bài học để tránh tải hết một
  lượt, nên áp dụng tương tự: nạp đề theo yêu cầu, không nạp hết mọi đề ngay từ đầu).
- Cần quyết định: đề "đóng gói sẵn" này có ghi đè lên đề cùng id đã có trên KV không, hay ưu
  tiên bản KV nếu đã tồn tại (để không mất được các sửa đổi thủ công qua UI)?

**Hướng B — Giữ nguyên mô hình hiện tại, thư mục chỉ là backup thủ công.**
Không code gì thêm — `data/jlpt-exams/` (ticket 001) chỉ là nơi lưu bản sao, việc đưa đề tới
tay người học vẫn qua `#/jlpt/import` như hiện tại. Ticket này đóng lại, đánh dấu "sẽ không
làm" nếu chủ dự án thấy quy trình thủ công đã đủ dùng.

## Bối cảnh

Ticket 001 đã tạo `data/jlpt-exams/` làm nơi lưu file JSON gốc, nhưng **chưa** nối nó vào
app — hai bước "lưu file vào repo" và "đề tới tay người học qua KV" hiện độc lập nhau, phải
làm tay cả hai. Ticket này chỉ tồn tại để ghi lại rằng đó là một khoảng trống có chủ đích,
chưa phải bug.

## Việc cần làm (chỉ sau khi có quyết định A/B ở trên)

Nếu chọn hướng A:
1. Viết hàm nạp đề từ `data/jlpt-exams/*.json` bằng `import.meta.glob`, validate bằng đúng
   `validateImportFile` đã có (đừng bỏ qua bước kiểm tra chỉ vì là đề "chính thức").
2. Quyết định thứ tự ưu tiên khi trùng `exam.id` giữa file tĩnh và KV (xem câu hỏi ở trên).
3. Cập nhật `JlptImportScreen.tsx` để danh sách đề phân biệt được "đề chính thức" (từ repo) và
   "đề tự nhập" (từ KV/IndexedDB) — ít nhất về mặt hiển thị, có thể khác về quyền xoá/sửa.
4. Cập nhật `data/jlpt-exams/README.md` — bỏ đoạn "bước 3 độc lập, không tự động" vì lúc đó nó
   không còn đúng nữa.

Nếu chọn hướng B: đóng ticket, không cần làm gì thêm.

## Tiêu chí hoàn thành

- [ ] Quyết định A/B đã được chốt và ghi vào Nhật ký.
- [ ] (Nếu A) Đề trong `data/jlpt-exams/` tự động có sẵn cho người học mà không cần ai
      bấm "Nhập đề" qua UI trước.
- [ ] (Nếu A) Không tải hết mọi đề ngay từ trang chủ — nạp theo yêu cầu, giống cách
      `subjectLoader.ts` đang làm với dữ liệu bài học.

## File / vùng code liên quan

- `data/jlpt-exams/` (ticket 001)
- `src/lib/jlpt/validate.ts` (`validateImportFile` — tái dùng, không viết lại)
- `src/data/subjectLoader.ts` (tham khảo mẫu nạp lười theo yêu cầu)
- `src/components/jlpt/JlptImportScreen.tsx`

## Nhật ký

- 2026-09-07: Ticket tạo cùng lúc với ticket 001, khi tạo kho đề dạng file. Chưa có quyết
  định — không tự ý chọn hướng khi bắt tay vào, hỏi chủ dự án trước.
