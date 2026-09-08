# 014 — Audio 聴解 (nghe hiểu)

- **Ưu tiên:** P3
- **Trạng thái:** Chặn (cần quyết định)
- **Phụ thuộc:** —

## Chặn bởi

Đây vốn đã là câu hỏi mở **chưa được trả lời từ chính tài liệu thiết kế gốc**
(`docs/jlpt-practice-test-research.md`, mục 16, câu hỏi số 2: *"⛔ Audio 聴解 — chặn giai đoạn
8"*). Cần chủ dự án quyết định trước khi code, vì các lựa chọn đánh đổi rất khác nhau:

1. **Không làm phần nghe** — chấp nhận app chỉ luyện 3/4 phần thi (文字語彙, 文法, 読解), bỏ
   聴解. Rẻ nhất, nhưng thiếu 1/3 điểm số thật của kỳ thi.
2. **Tự thu âm / thuê thu âm** cho từng đề nhập — chất lượng cao nhất nhưng tốn công theo từng
   đề, không mở rộng được nhanh (đi ngược lại việc "tự import đề cho mọi người" ở quy mô lớn).
3. **TTS (giọng đọc máy)** — app đã có tích hợp Web Speech API cho từ vựng
   (`src/lib/tts.ts`). Có thể tận dụng để đọc `transcript` của câu 聴解 thay vì cần file audio
   thật. Rẻ, nhanh mở rộng, nhưng giọng máy không giống người thi thật (nhịp điệu, ngữ điệu tự
   nhiên của hội thoại tiếng Nhật thật rất khác TTS).
4. **Nguồn audio có sẵn** (nếu tìm được nguồn hợp pháp để dùng) — cần chủ dự án xác nhận nguồn
   trước.

## Bối cảnh kỹ thuật (đã sẵn, chờ quyết định ở trên)

Schema đã có sẵn chỗ cho việc này (`src/lib/jlpt/schema.ts`, `JlptQuestion`):
```ts
audioId?: string;
transcript?: string;
transcriptAnswerSpan?: [number, number];
```
Không có route/component nào đọc các trường này. `scoringSection: 'choukai'` cũng đã có trong
enum `ScoringSection` và được tính điểm riêng ở `attemptLogic.ts` (`SECTION_LABELS`) — nghĩa
là **phần chấm điểm đã sẵn sàng cho 聴解**, chỉ thiếu phần phát được audio/transcript trong lúc
làm bài.

## Việc cần làm (sau khi có quyết định)

1. Nếu chọn hướng TTS: thêm nút phát trong view `taking` của `JlptExamRunner.tsx`, gọi
   `speak(question.transcript, { lang: 'ja', rate })` (xem cách `VocabularyCard.tsx` dùng
   `src/lib/tts.ts` làm mẫu). Cân nhắc: có nên cho tua lại/nghe lại nhiều lần hay giới hạn số
   lần nghe (thi thật thường chỉ nghe 1 lần) — đây cũng là một quyết định UX cần chốt.
2. Nếu chọn hướng file audio thật: cần thêm chỗ lưu file (khác hẳn `data/jlpt-exams/` vốn chỉ
   chứa JSON văn bản — file âm thanh nặng hơn nhiều, cần cân nhắc lưu ở đâu, có nên đưa vào
   git hay dùng nơi lưu trữ khác).
3. Cập nhật `docs/jlpt-practice-test-research.md` mục 16 — đánh dấu câu hỏi này đã được trả
   lời, không còn là "chặn".

## Tiêu chí hoàn thành

- [ ] Chủ dự án đã chọn 1 trong các hướng trên (hoặc hướng khác) — ghi quyết định vào Nhật ký.
- [ ] Câu hỏi 聴解 phát được nội dung nghe trong lúc làm bài.
- [ ] Màn kết quả tính điểm phần 聴解 đúng như các phần khác (hạ tầng chấm điểm đã có sẵn,
      không cần sửa).

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, kế thừa câu hỏi mở chưa trả lời từ tài liệu thiết
  kế gốc. Chưa có quyết định.
