# 014 — Audio 聴解 (nghe hiểu)

- **Ưu tiên:** P1
- **Trạng thái:** Đang làm — code xong, chờ tải file lên R2 và soát mốc thời gian
- **Phụ thuộc:** —

## Quyết định (chủ dự án chốt ngày 2026-09-14)

| Câu hỏi | Chốt | Vì sao |
|---|---|---|
| Nguồn audio | **Băng thật** của 12 đề đã extract (7/2010, 7/2020–12/2025) | TTS một giọng làm bài nghe dễ hơn thật → tự tin giả (mục 7.4) |
| Lưu ở đâu | **Cloudflare R2, bucket đóng**; link ký tạm 6 giờ qua `/api/jlpt/audio`, phải đăng nhập | Đề có bản quyền, web đang mở đăng ký; R2 miễn phí băng thông |
| Mốc thời gian từng câu | **Tự động**: faster-whisper nhận dạng → khớp với transcript trong `exam.json` | 12 × 28 = 336 câu, đánh tay không bền; có thêm mốc từng dòng thoại |
| Màn thi hiện gì | **Giống đề giấy thật**: không hiện câu hỏi; 問題3–5 chỉ có nút số | Hiện chữ = biến bài nghe thành bài đọc |

## Thiết kế học

### A. Lần thi đầu — khoá như phòng thi (`useLockedListening.ts`, `ListeningControls.tsx`)

- Cổng vào phần nghe: nói luật trước, **tải trọn file về máy** (Cache Storage) rồi mới cho bắt
  đầu, có nút thử loa. Đã cấm tua thì không được để mạng giật giữa bài.
- Băng chạy liền; không tạm dừng/tua/đổi tốc độ — chặn cả nút tua trên màn khoá, tai nghe
  (Media Session) và mọi cú tua không do app gây ra.
- Câu hỏi tự chuyển theo băng; câu đã nghe qua sửa được đáp án, câu chưa tới thì khoá.
- Hết băng → 30 giây tô nốt phiếu → tự nộp. Trọn đề: đồng hồ chỉ canh phần đọc; sang phần nghe
  (hoặc hết giờ phần đọc) thì phần đọc bị thu lại.
- Bị gián đoạn (F5, rút tai nghe, cuộc gọi): phát lại **từ đầu câu đang dở**, câu đó bị gắn
  `heardTwice` để lúc mổ xẻ biết.
- Phiên "Nghe nhanh" ở sảnh: 問題5 即時応答 (~5 phút), cùng luật băng.

### B. Mổ xẻ — mở khoá theo bậc thang (`ChoukaiReplayPanel.tsx`)

Bước 1 (đoán lại) chỉ cho nghe lại đoạn của câu; người học tự mở thêm bậc khi cần. Bậc cao
nhất đã mở lưu vào `MistakeEntry.listenHintLevel` — đó chính là chẩn đoán:

| Bậc | Được dùng | Tới bậc này mới đúng → |
|---|---|---|
| 1 | Nghe lại, tua được | nghe sót / mất tập trung |
| 2 | + nghe 0.85×/0.7×, lặp dòng | chưa theo kịp tốc độ |
| 3 | + lời thoại (chưa có đáp án) | chưa nhận ra âm, hoặc thiếu từ |

Bước 3 trở đi: lời thoại kiểu karaoke (dòng đang phát được tô, bấm dòng để nhảy, lặp dòng),
đoạn chứa căn cứ cho đáp án được tô xanh (`transcriptAnswerSpan`, suy từ lời giải).
Mini-quiz và màn ôn SRS (`JlptReviewSession.tsx`) cũng phát băng trước, chữ chỉ hiện sau khi
trả lời.

## Dữ liệu

- `JlptExam.audio: JlptAudioTrack[]` — `key` trên R2 (không phải URL), `durationSec`, `bytes`.
- `JlptQuestion.audioSegment` — `start` (tiếng "N番"), `speechEnd`, `end`, `lines[]`, `confidence`.
- `JlptAttempt.listening` — `resumeAt`, `started`, `finished`; `JlptAttempt.tasteMondai`.
- `validate.ts` kiểm tra mốc, cảnh báo câu chưa căn mốc / độ khớp thấp.

Pipeline tạo dữ liệu: [`tools/jlpt-audio/README.md`](../../tools/jlpt-audio/README.md).
Cấu hình R2: [`api/README.md`](../../api/README.md), mục "Kho audio 聴解".

## Tiêu chí hoàn thành

- [x] Chủ dự án đã chọn hướng — ghi ở trên.
- [x] Câu hỏi 聴解 phát được băng trong lúc làm bài, khoá tua.
- [x] Mổ xẻ + ôn SRS nghe lại được, có lời thoại theo bậc.
- [ ] Tạo bucket R2 + đặt biến môi trường trên Vercel (chủ dự án làm — cần tài khoản Cloudflare).
- [ ] Chạy đủ 4 bước pipeline cho 12 đề, soát các câu độ khớp thấp.
- [ ] Nhập 12 đề đã gắn audio qua `#/jlpt/import`, thử trọn một lượt thi + mổ xẻ trên điện thoại.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, kế thừa câu hỏi mở chưa trả lời từ tài liệu thiết
  kế gốc. Chưa có quyết định.
- 2026-09-14: Chốt 4 quyết định ở trên. Làm pipeline `tools/jlpt-audio` (nén → nhận dạng → khớp
  mốc → tải lên), API ký link R2, chế độ thi khoá tua, bậc thang nghe lại khi mổ xẻ và ôn SRS.
