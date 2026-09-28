# Công cụ nhập đề JLPT (chạy cục bộ — không commit nội dung đề)

## Riêng tư trước tiên — đọc mục này trước

Đề ở đây do AI sinh riêng cho việc học của một người, không có ý định chia sẻ với ai khác.
Toàn bộ pipeline dưới đây vì thế **chỉ chạy trên máy bạn** và không đẩy nội dung lên repo công
khai — không phải vì vấn đề bản quyền, mà vì đây là lựa chọn riêng tư của bạn:

- Đặt PDF/audio gốc vào `jlpt-source/` (đã có trong `.gitignore`, không bao giờ vào git).
- Kết quả bóc tách nằm ở `tools/jlpt-import/output/` (cũng đã ignore).
- Không có bước nào trong script này ghi vào `src/data/`. Muốn dùng, bạn tự nhập file JSON
  ở `output/` vào app qua màn `#/jlpt/import` (mục 11 của
  `docs/jlpt-practice-test-research.md`).
- Nơi lưu cuối cùng (IndexedDB của trình duyệt, hay một DB riêng có xác thực) đang được bàn ở
  mục "Kiến trúc lưu trữ" bên dưới — xem trước khi build nếu bạn quan tâm việc này.

## Cấu trúc thư mục nguồn kỳ vọng

```
jlpt-source/
  answer_key.xlsx (hoặc .csv)      ← 1 file tổng hợp đáp án nhiều năm
  2025-07/
    exam.pdf                       ← đề thi, có text layer
    transcript.pdf                 ← lời thoại phần nghe, có text layer
    listening.mp3                  ← hoặc listening.rar chứa 1 file .mp3
  2024-12/
    ...
```

Tên file trong mỗi thư mục linh hoạt — script tự dò theo đuôi file, chỉ cần **mỗi thư mục có
đúng 2 PDF và đúng 1 file âm thanh** (mp3 hoặc rar).

## Các bước

```bash
# 1) Chỉ để xem cấu trúc PDF thật trông ra sao (không sinh dữ liệu câu hỏi)
python3 tools/jlpt-import/inspect_pdf.py jlpt-source/2025-07/exam.pdf

# 2) Bóc một thư mục thành JSON theo schema
python3 tools/jlpt-import/build_exam.py jlpt-source/2025-07 \
    --answer-key jlpt-source/answer_key.xlsx \
    --level N3 \
    --out tools/jlpt-import/output/n3-2025-07.json

# 3) Bóc tất cả các thư mục cùng lúc
python3 tools/jlpt-import/build_exam.py jlpt-source --answer-key jlpt-source/answer_key.xlsx --all
```

## Trạng thái hiện tại — đã kiểm bằng 1 đề N3 thật (7/2010)

| Phần | Kết quả | Ghi chú |
|---|---|---|
| 文字・語彙 (問題1,2,3,5) | ✅ Tách đúng, kể cả đáp án đánh số fullwidth １２３４ | Python `\d`/`int()` xử lý fullwidth digit sẵn, không cần chuyển đổi tay |
| 文字・語彙 問題4 (đề mẫu này) | ⚠ Dính vào 問題3 | **Lỗi có thật trong PDF nguồn**: thiếu hẳn dòng tiêu đề "問題4". Script tự phát hiện số 問題 bị nhảy cóc và in cảnh báo, không tự đoán mù |
| 文法形式・表記・言い換え (câu đơn, 4 đáp án 1 dòng) | ✅ Tách đúng | |
| 読解 (đoạn văn dùng chung nhiều câu) | ❌ Chưa tách đúng | Đúng như mục 7.3 dự đoán — cần một parser riêng nhận diện đoạn văn (`Passage`), chưa làm trong bản này |
| 聴解 問題1, 問題2 (có in đáp án chữ) | ✅ Tách đúng | Câu hiện `stem="番"` vì đề bài chỉ có trong audio, chỉ đáp án được in |
| 聴解 問題3,4,5 (概要理解/発話表現/即時応答) | ❌ Không có gì để tách | **Không phải lỗi** — đề in đúng dòng "問題用紙に何も印刷されていません" (không in gì cả). Nội dung chỉ có trong file transcript PDF + audio, phải lấy từ đó |

`inspect_pdf.py` và xử lý audio (giải nén rar, đo thời lượng) đã chạy được, kể cả với file
`.rar` thật (cần `unrar`/`unrar-free`, cài bằng `apt-get install unrar-free`).

`answer_key.py` mới test bằng bảng tính tự tạo, **chưa test với file tổng hợp nhiều năm thật
của bạn** — gửi kèm để tôi chỉnh `_COLUMN_ALIASES` cho khớp tên cột thật.

Sau khi bóc xong, hai điều **luôn cần làm tay** bất kể script tốt đến đâu:

1. **Lời giải cho từng phương án** (`choices[].note`) — PDF đề thi không có, phải tự viết hoặc
   nhờ AI soạn theo mẫu lời nhắc ở mục 11.9 rồi dán đè vào JSON.
2. Toàn bộ phần 読解 và 聴解 問題3-5 — soát/nhập tay cho tới khi có parser riêng cho đoạn văn
   và cho transcript.
