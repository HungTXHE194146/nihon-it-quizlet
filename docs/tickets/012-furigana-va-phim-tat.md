# 012 — Furigana + phím tắt khi làm bài JLPT

- **Ưu tiên:** P3
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Hai thiếu sót nhỏ, độc lập nhau, gộp chung một ticket vì cùng mức độ ưu tiên thấp và cùng vùng
code (`JlptExamRunner.tsx` view `taking`):

1. **Furigana:** `JlptQuestion.furigana?: { text: string; reading: string }[]` đã có trong
   schema (`src/lib/jlpt/schema.ts`) nhưng không được đọc/render ở bất kỳ đâu. Câu có Kanji khó
   không có cách hiện cách đọc bên trên.
2. **Phím tắt:** Các màn luyện tập khác trong app đều có phím tắt (`VocabularyCard`: Space/H/S/
   mũi tên; `ExamSession`: mũi tên chuyển câu, F đánh dấu cờ). `JlptExamRunner.tsx` view
   `taking` không có phím tắt nào — mọi thao tác (chọn đáp án, chuyển câu, đánh dấu cờ, mở
   phiếu trả lời) đều phải dùng chuột/chạm.

## Việc cần làm

1. Furigana: quyết định cách hiển thị (ruby text `<ruby>` HTML, hoặc chú thích trong ngoặc bên
   cạnh) rồi render trong `renderStem()` — cần xử lý vị trí furigana khớp đúng với từng đoạn
   `text` tương ứng trong `stem`, không chỉ nối chuỗi đơn giản.
2. Phím tắt gợi ý cho view `taking`: mũi tên trái/phải chuyển câu, số 1-4 chọn nhanh đáp án
   tương ứng, `F` đánh dấu cờ, phím mở/đóng phiếu trả lời. Tham khảo cách `StudySession.tsx`
   và `ExamSession.tsx` đã cài đặt (chú ý: phải bỏ qua khi focus đang ở input/textarea, xem
   pattern `e.target instanceof HTMLInputElement` đã dùng ở các nơi khác).

## Tiêu chí hoàn thành

- [x] Câu hỏi có `furigana` hiện đúng cách đọc bên trên/cạnh đúng đoạn Kanji tương ứng.
- [x] Làm bài JLPT dùng được phím tắt cho ít nhất: chuyển câu, chọn đáp án, đánh dấu cờ.
- [x] Phím tắt không bị kích hoạt nhầm khi người dùng đang gõ vào một ô input khác (nếu có).

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — `renderStem`, view `taking`.
- Tham khảo: `src/components/VocabularyCard.tsx`, `src/components/ExamSession.tsx`.

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Ưu tiên thấp — làm sau khi các ticket P0/P1 xong.
- 2026-09-10: Làm xong cả hai phần.

  **Furigana:** viết lại `StemText.tsx` — thêm hàm `buildSegments()` tự dò vị trí từng
  `furigana[].text` trong `stem` bằng `indexOf` (khớp MỌI lần lặp lại của cùng một từ, không
  chỉ lần đầu), cắt `stem` thành các đoạn xen kẽ (thường / có `<ruby>+<rt>`), kết hợp đúng với
  `stemUnderline` sẵn có — một từ vừa có furigana vừa nằm trong đoạn gạch chân (câu 言い換え/
  用法) thì hiện cả hai, không cái nào đè mất cái kia. Route qua `renderFormattedText` không
  đụng tới — `StemText` là component riêng, độc lập.

  Furigana **mặc định TẮT** theo đúng khuyến nghị mục 8.6 tài liệu thiết kế ("cho tắt/bật",
  không cố định theo cấp — N3 đọc được phần lớn Kanji trong đề). Thêm `jlptFuriganaEnabled?:
  boolean` vào `ProgressSettings` (useProgress.tsx, mặc định `false`) — MỘT cài đặt DÙNG CHUNG
  cho mọi màn JLPT (phòng thi, mổ xẻ, kiểm tra nhanh, sổ tay lỗi), không phải bật riêng từng
  màn. Nút bật/tắt (icon `Type`) chỉ đặt ở view `taking` — đúng phạm vi ticket — và chỉ hiện
  khi câu hỏi ĐANG XEM thật sự có dữ liệu `furigana` (không hiện nút vô nghĩa cho câu không
  có). Các màn còn lại (mổ xẻ, kiểm tra nhanh, sổ tay lỗi) đọc cùng cài đặt, không có nút riêng.

  **Phím tắt:** thêm một `useEffect` trong view `taking`, cùng quy ước với
  `ExamSession.tsx`/`QuestionCard.tsx` đã có (bỏ qua khi gõ input, khi giữ phím bổ trợ, và
  thêm một lớp bảo vệ ticket này mới cần: bỏ qua khi có modal che màn hình — thoát/nộp bài/báo
  lỗi câu, bấm "1" chọn đáp án lúc đang hỏi "thoát hay nộp?" sẽ rất khó hiểu). Phím: `←`/`→`
  chuyển câu, `1-9` chọn đáp án tương ứng (giới hạn theo số phương án thật của câu), `F` đánh
  dấu cờ, `A` mở/đóng phiếu trả lời (dùng cho màn hẹp — màn rộng phiếu đã hiện cố định).
  Thêm dải gợi ý phím tắt ở cuối màn, cùng kiểu với `ExamSession.tsx` để người đã quen phòng
  thi kia không phải học lại quy ước mới.

  **Đã kiểm bằng UI thật** (Playwright, không chỉ đọc code): nhập một đề test có furigana lặp
  lại 2 lần cùng một từ (漢字) và một từ furigana chồng lên vùng gạch chân (毎朝) — xác nhận cả
  hai lần "漢字" đều lên đúng cách đọc かんじ, và 毎朝 vừa có furigana まいあさ vừa gạch chân,
  không đè nhau. Bật/tắt bằng nút, số ruby-element đi từ 0 lên 5 đúng như kỳ vọng. Phím `2` chọn
  đúng đáp án B, `F` bật cờ (giữ nguyên qua điều hướng), `→`/`←` chuyển câu đúng, `A` mở phiếu
  trả lời ở màn hẹp — tất cả xác nhận qua ảnh chụp màn hình thật, không chỉ đọc log console.
  `tsc -b` và `oxlint` sạch trên mọi file đã sửa.
