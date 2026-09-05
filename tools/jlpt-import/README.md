# Công cụ nhập đề JLPT (chạy cục bộ — không commit nội dung đề)

## An toàn trước tiên — đọc mục này trước

Đề thi ở đây có bản quyền. Toàn bộ pipeline dưới đây **chỉ chạy trên máy bạn**:

- Đặt PDF/audio gốc vào `jlpt-source/` (đã có trong `.gitignore`, không bao giờ vào git).
- Kết quả bóc tách nằm ở `tools/jlpt-import/output/` (cũng đã ignore).
- Không có bước nào trong script này ghi vào `src/data/`. Muốn dùng, bạn tự nhập file JSON
  ở `output/` vào app qua màn `#/jlpt/import` (mục 11 của
  `docs/jlpt-practice-test-research.md`) — dữ liệu đó ở lại trong IndexedDB của trình duyệt bạn.
- Nếu sau này muốn *chia sẻ công khai* đề đã bóc, đó là quyết định pháp lý của riêng bạn.

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

## Trạng thái hiện tại

`inspect_pdf.py` và xử lý audio (giải nén rar, đo thời lượng) đã chạy được ngay.

`extract_exam.py` (tách 問題 / câu hỏi / đáp án từ PDF) và `answer_key.py` (đọc file đáp án
tổng hợp) đang là **khung sườn cần một file mẫu thật để hoàn thiện** — cấu trúc text-layer của
PDF đề thi (thứ tự đọc, cách ngắt dòng, có giữ được gạch chân hay không) khác nhau tuỳ nguồn
phát hành, nên không đoán mù được. Xem TODO trong từng file.

Sau khi có bản chạy thử trên 1 thư mục thật, hai điều **luôn cần làm tay**:

1. **Lời giải cho từng phương án** (`choices[].note`) — PDF đề thi không có, phải tự viết hoặc
   nhờ AI soạn theo mẫu lời nhắc ở mục 11.9 rồi dán đè vào JSON.
2. Soát lại các câu 読解/聴解 phức tạp mà script tách sai (luôn có, không có gì tách hoàn hảo).
