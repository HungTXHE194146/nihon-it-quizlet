# Pipeline audio 聴解 (chạy cục bộ — không commit file nghe hay nội dung đề)

Đưa băng nghe thật của các đề đã extract lên web, kèm mốc thời gian từng câu và từng dòng thoại.
Thiết kế học (thi khoá tua, mổ xẻ mở khoá theo bậc) ở
[`docs/tickets/014-audio-nghe-hieu.md`](../../docs/tickets/014-audio-nghe-hieu.md).

Chỉ xử lý thư mục đề **có `exam.json`** trong `data/N3_my_AI_generated_practice_exam/` (quy ước:
có `exam.json` = đã extract và soát). Mọi đầu ra nằm ở `data/_audio_build/` — đã ignore.

## Cài một lần

```bash
winget install --id Gyan.FFmpeg -e
python -m pip install faster-whisper
```

Mở lại terminal sau khi cài ffmpeg để PATH được nạp. Lần đầu chạy bước 2 sẽ tải model
`large-v3-turbo` (~1.6 GB) từ Hugging Face.

## Bốn bước

| Bước | Lệnh | Việc | Thời gian (i9-13900H, CPU) |
|---|---|---|---|
| 1 | `node tools/jlpt-audio/01-extract-transcode.mjs` | Lấy MP3 (giải nén RAR nếu cần) → mono 48 kbps, cân âm lượng, tên có hash | ~1 phút/đề, ~15 MB/đề |
| 2 | `python tools/jlpt-audio/02-transcribe.py` | Nhận dạng giọng nói, lấy mốc thời gian từng từ | ~20 phút/đề (1.9× thời gian thực) |
| 3 | `node tools/jlpt-audio/03-align.mjs` | Khớp với transcript trong `exam.json` → `audioSegment` từng câu, mốc từng dòng, tô đoạn chứa đáp án | vài giây |
| 4 | `node tools/jlpt-audio/04-upload.mjs` | Tải file nghe lên R2 (bỏ qua file đã có) | tuỳ mạng |

Bước nào cũng nhận `--only <examId>`; chạy lại bao nhiêu lần cũng được (bước 2 bỏ qua đề đã có
kết quả cùng hash + model, bước 4 bỏ qua file đã có trên kho). Encode lại ở bước 1 thì hash đổi,
phải chạy lại bước 2 và 3 cho đề đó.

Bước 4 cần 4 biến `R2_*` — cách tạo bucket, CORS và khoá: [`api/README.md`](../../api/README.md),
mục "Kho audio 聴解".

## Sau khi chạy xong

1. **Soát.** Bước 3 in ra câu nào khớp thấp ("nên soát") hoặc không khớp; chi tiết ở
   `data/_audio_build/align-report.json`. Đề 7/2010 thiếu transcript 5 câu 問題5 — bước 3 dựng
   lại từ câu nói + lựa chọn (`synthesizedTranscripts` trong báo cáo), nên đọc lại cho chắc.
2. **Nhập đề.** Vào `#/jlpt/import`, chọn nhiều file trong `data/_audio_build/exams/*.json`.
   Nhập đè lên đề cùng id là được — file này là `exam.json` gốc cộng thêm `exam.audio` và
   `audioSegment` cho từng câu nghe.
3. **Thử nhanh không cần R2.** `npm run dev` phát thẳng file ở `data/_audio_build/dist` (plugin dev
   trong `vite.config.ts`), nên có thể thử cả luồng thi + mổ xẻ trước khi cấu hình kho.

## Vì sao làm như vậy

- **Một file liền cho cả khối, không cắt theo câu:** lúc thi phải nghe đúng như băng thật (lời
  hướng dẫn, ví dụ, khoảng lặng chọn đáp án). Lúc mổ xẻ chỉ cần nhảy tới mốc của câu.
- **Nhận dạng để lấy mốc, không để lấy chữ:** transcript chuẩn đã có sẵn; Whisper nghe sai vài
  chữ chỉ làm giảm điểm khớp, không làm lệch mốc.
- **Nhận dạng trên chính file đã nén:** mốc thời gian khớp với file người học tải về.
