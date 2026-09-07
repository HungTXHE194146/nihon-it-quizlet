# Kho đề JLPT (nguồn thật, có version control)

Thư mục này là **bản gốc lâu dài** của mọi đề JLPT đã nhập vào web — mỗi file `.json` là một
đề, y hệt định dạng dán vào màn `#/jlpt/import`.

## Vì sao thư mục này tồn tại

Đề JLPT hiện sống ở hai nơi, cả hai đều **không đáng tin cậy làm bản gốc duy nhất**:

- **IndexedDB của trình duyệt** — mất khi người dùng xoá dữ liệu site, đổi máy, hoặc cài lại
  trình duyệt. Không version, không backup.
- **Vercel KV (kho chung)** — tầng miễn phí, không có sao lưu tự động; xoá nhầm (hoặc lỗi ở
  route xoá) là mất vĩnh viễn, không có "thùng rác" để khôi phục.

Vì admin (chủ dự án) sẽ tự tay nhập đề cho cả nhóm dùng — chứ không phải "ai nhập nấy nhớ" —
việc mất đề là mất công sức của người quản trị, không phải rủi ro cá nhân của một người dùng.
Thư mục này là chỗ giữ **bản sao thật**, có lịch sử qua `git log`, khôi phục được bất cứ lúc
nào bằng `git checkout` — độc lập hoàn toàn với KV và IndexedDB.

## Quy trình hiện tại (thủ công, cho tới khi làm xong ticket 015)

1. Nhận/soạn được một đề JSON (tự soạn, nhờ AI soạn theo mẫu ở `#/jlpt/import`, hoặc nguồn khác).
2. Lưu file vào đây: `data/jlpt-exams/<exam.id>.json` (xem quy tắc đặt tên bên dưới).
3. Dán/tải đúng file đó vào màn `#/jlpt/import` trên web đang chạy (bằng tài khoản đăng
   nhập) để đề thực sự vào tay người học — **bước 2 không tự động đẩy lên KV**, hai bước là
   độc lập với nhau cho tới khi ticket 015 được làm.
4. Commit file JSON vào git cùng một lượt.

> Ticket [`docs/tickets/015-nap-de-jlpt-tu-thu-muc-repo.md`](../../docs/tickets/015-nap-de-jlpt-tu-thu-muc-repo.md)
> đề xuất việc bỏ bước 3 (web tự nạp đề từ đúng thư mục này lúc khởi động) — chưa làm, đang chờ quyết định thiết kế.

## Quy tắc đặt tên file

`<exam.id>.json` — trùng khớp `exam.id` bên trong file, để không bao giờ có hai file khác tên
nhưng cùng id (gây lẫn lộn khi đối chiếu với KV). Gợi ý đặt `exam.id` theo dạng
`<level>-<nguồn>-<số thứ tự>`, ví dụ: `n3-official-sample-01.json`, `n3-ai-soan-03.json`.

## Định dạng file

Đúng interface `JlptImportFile` ở [`src/lib/jlpt/schema.ts`](../../src/lib/jlpt/schema.ts) —
đây là nguồn sự thật cho hình dạng dữ liệu, đừng chép lại schema ra đây rồi để hai bản lệch
nhau. Tóm tắt các trường bắt buộc:

```jsonc
{
  "formatVersion": 1,
  "exam": {
    "id": "n3-vi-du-01",       // trùng tên file (không có .json)
    "level": "N3",
    "title": "Đề N3 ví dụ 01",
    "source": "user-provided", // "original" | "official-sample" | "user-provided"
    "blocks": [ /* TimedBlock[] — các khối tính giờ, xem mục 10 của docs/jlpt-practice-test-research.md */ ]
  },
  "groups": [ /* MondaiGroup[] — nhóm câu theo 問題, có instruction */ ],
  "questions": [ /* JlptQuestion[] — từng câu hỏi */ ],
  "passages": [ /* tuỳ chọn — Passage[], chỉ cần khi có câu 読解 dùng chung đoạn văn */ ]
}
```

Trước khi lưu vào đây, nên đã chạy qua `validateImportFile` (tức là đã dán thử vào
`#/jlpt/import` và không còn lỗi đỏ) — thư mục này không tự kiểm tra định dạng.

## Không phải chỗ cho

- Tiến độ làm bài (`JlptAttempt`) — đó là dữ liệu riêng từng người, sống trong IndexedDB,
  không thuộc kho đề chung.
- Sổ tay lỗi (`MistakeEntry`) — tương tự, riêng từng người.
- File audio 聴解 — chưa có chỗ chứa, xem ticket
  [`014-audio-nghe-hieu.md`](../../docs/tickets/014-audio-nghe-hieu.md).
