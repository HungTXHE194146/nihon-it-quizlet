# 005 — Thẻ SRS cho chính câu hỏi JLPT (không cần `linkedItemKey`)

- **Ưu tiên:** P1
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Tài liệu thiết kế (`docs/jlpt-practice-test-research.md` mục 8.11) nêu rõ điểm khác biệt cốt
lõi so với Bunpro: *"bắt kiến thức đó quay lại đúng lúc sắp quên"*. Thực tế hiện tại, câu sai
chỉ được đưa vào lịch ôn (SRS) khi có `linkedItemKey` — một khoá thẻ từ vựng trùng
**chính xác** `term` với kho Mimi N3 / Kanji Master N3 (`src/lib/jlpt/linkSuggest.ts`, dò khi
nhập đề; hoặc gán tay lúc soạn JSON).

Hệ quả: chỉ câu 文字・語彙 (từ vựng) có cơ hội nối vào SRS. Câu 文法 (ngữ pháp), 読解 (đọc
hiểu), 聴解 (nghe) — chiếm phần lớn một đề JLPT thật — **không bao giờ được lên lịch ôn lại**,
dù người học vừa mổ xẻ kỹ và tự viết quy tắc cho nó (bước 4 mổ xẻ).

## Việc cần làm (cần quyết định kiến trúc trước khi code)

Mục tiêu: chính câu hỏi JLPT (không phải một thẻ từ vựng "gần giống") phải có trạng thái SRS
riêng, dùng lại đúng thuật toán ở `src/lib/srs.ts` (SM-2) — tài liệu mục 6.4 nói rõ **không
nên dựng hệ thứ hai**.

Trở ngại kiến trúc chính: `src/hooks/useProgress.tsx` (`buildReviewQueue`) và
`src/lib/itemIndex.ts` (`itemByKey`) được thiết kế quanh giả định "mọi khoá thẻ đều tra được
ra nội dung từ `itemByKey`", vốn chỉ được nạp từ dữ liệu bài học tĩnh (`src/data/lessons.ts` và
tương đương) — **không** từ đề JLPT nằm trong IndexedDB (nạp lười theo từng `examId`, không có
sẵn toàn bộ trong bộ nhớ).

Hai hướng khả thi (chọn 1, hoặc đề xuất khác nếu thấy hợp lý hơn khi bắt tay vào):

1. **Luồng ôn JLPT riêng, không đi qua `StudySession`/`itemByKey`.** Thẻ SRS vẫn dùng chung
   `data.cards` (namespace khoá kiểu `jlpt::<questionId>` thay vì `subjectId::itemId`), nhưng
   màn ôn là một component riêng trong khu vực JLPT, tự `getStoredExam(examId)` để lấy nội
   dung câu hỏi cần ôn (không cần `itemByKey`). `buildReviewQueue` cần biết bỏ qua khoá
   `jlpt::` khi build hàng đợi N3 thường (và ngược lại, có hàm riêng lọc đúng khoá `jlpt::`
   đến hạn).
2. **Đăng ký câu hỏi JLPT vào `itemByKey` khi đề được nạp**, giống cách
   `registerSubjectItems` làm với bài học thường — để tái dùng nguyên `StudySession`. Rủi ro:
   `itemByKey`/`StudySession` được thiết kế cho thẻ từ vựng/trắc nghiệm đơn giản, không có khái
   niệm `passage` (đoạn văn dùng chung nhiều câu) hay cấu trúc nhóm `問題` — cần đánh giá có
   đủ dùng không hay UI sẽ thiếu ngữ cảnh khi ôn.

Bất kể chọn hướng nào, cần sửa:
- `JlptExamRunner.tsx` — `submit()` hiện chỉ gọi `recordReview(key, ...)` khi `linkedKeyFor()`
  tìm được thẻ từ vựng khớp; cần gọi thêm (hoặc thay bằng) một đường ghi nhận SRS cho chính
  `questionId`, không phụ thuộc `linkedItemKey`.
- `src/lib/jlpt/attemptLogic.ts` — `srsSignalForMatrix` đang trả về `boolean` đơn giản; xem
  ticket 006 để mở rộng thành tín hiệu chi tiết hơn (làm sau ticket này).

## Tiêu chí hoàn thành

- [x] Một câu 文法/読解/聴解 làm sai, mổ xẻ xong, thì sau đó xuất hiện lại trong một hàng đợi
      ôn tập nào đó (không cần phải trùng từ vựng với Mimi/Kanji Master).
- [x] Thẻ SRS của câu hỏi JLPT dùng đúng công thức trong `src/lib/srs.ts`, không viết lại
      thuật toán.
- [x] Không phá vỡ luồng ôn N3 hiện có (thẻ từ vựng/Kanji vẫn hoạt động y hệt trước).
- [x] Quyết định kiến trúc (hướng 1 hay 2, hay hướng khác) được ghi lại vào Nhật ký ticket này
      trước khi code lan rộng, để phiên sau không phải đoán lại.

## File / vùng code liên quan

- `src/lib/srs.ts`, `src/hooks/useProgress.tsx`, `src/lib/itemIndex.ts`
- `src/components/jlpt/JlptExamRunner.tsx` (`submit`, `linkedKeyFor`)
- `src/lib/jlpt/attemptLogic.ts`, `src/lib/jlpt/linkSuggest.ts`

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX. Đây là ticket kiến trúc nặng nhất trong nhóm P1 —
  nên đọc kỹ cả hai hướng đề xuất trước khi bắt đầu, và chốt hướng đi ngay từ đầu phiên làm
  việc, ghi lại tại đây.
- 2026-09-08: **Làm xong — chọn Hướng 1** (luồng ôn JLPT riêng, không đi qua
  `StudySession`/`itemByKey`). Hướng 2 (đăng ký câu hỏi JLPT vào `itemByKey` để tái dùng
  `StudySession`) bị loại ngay từ đầu: `StudySession` không có khái niệm `passage` (đoạn văn
  dùng chung nhiều câu 読解) lẫn cấu trúc nhóm 問題, nhét câu hỏi JLPT vào đó sẽ mất ngữ cảnh
  hoặc phải sửa `StudySession` theo hướng chỉ JLPT cần — rủi ro cao hơn hẳn so với việc viết
  một màn ôn nhỏ, tự đọc thẳng `getStoredExam()`.

  Chi tiết kiến trúc:
  - `src/lib/jlpt/srsKey.ts` (mới): `jlptCardKey(examId, questionId)` sinh khoá
    `jlpt::<examId>::<questionId>` — có `examId` vì `questionId` chỉ duy nhất TRONG một đề
    (hai đề khác nhau có thể cùng dùng "q1"). Thẻ vẫn nằm chung `data.cards` của
    `useProgress.tsx`, dùng nguyên `recordReview()`/SM-2, không viết lại thuật toán.
  - **Rò rỉ phát hiện giữa chừng:** `subjectInScope(subjectId, 'all')` trả `true` cho MỌI
    subjectId, kể cả `"jlpt"` (phần đầu khoá `jlpt::...`, tách bởi `subjectIdFromKey`) — nghĩa
    là nếu không chặn tay, thẻ SRS của câu hỏi JLPT sẽ lẫn vào `buildReviewQueue('all')`,
    `buildMistakeQueue('all')`, `statsFor('all')` (badge "Ôn gộp cả môn khác" ở trang chủ sẽ
    đếm nhầm). Đã thêm `isJlptCardKey(key)` chặn ở đầu cả 3 vòng lặp trong `useProgress.tsx`
    trước khi test — không phải giả thuyết, đã viết kịch bản Playwright dựng đúng tình huống
    này và xác nhận KHÔNG rò rỉ (xem Kiểm chứng).
  - `buildJlptReviewQueue(limit?)` (mới, trong `useProgress.tsx`): CHỈ trả câu đến hạn, không
    có phần "thẻ mới" như `buildReviewQueue` — một câu chỉ có thẻ SRS sau khi đã được LÀM
    (đúng hoặc sai) trong một lượt thi, không có kho tĩnh để rút "thẻ mới".
  - `JlptExamRunner.submit()`: trước đây chỉ `recordReview()` khi có `linkedItemKey`; giờ LUÔN
    gọi thêm `recordReview(jlptCardKey(examId, qId), signal)` cho mọi câu đã trả lời, độc lập
    với việc có nối được từ vựng hay không. Áp dụng ngay lúc nộp (không đợi mổ xẻ) — giữ đúng
    triết lý đã có ở đoạn code này từ trước.
  - `src/components/jlpt/JlptReviewSession.tsx` (mới, route `#/jlpt/review`): màn ôn riêng,
    không dùng `StudySession`. Chốt hàng đợi bằng `useState(() => buildJlptReviewQueue())`
    (chạy đúng một lần lúc mount) rồi mới nạp nội dung — nếu để hàm chạy lại theo
    `data.cards` thì mỗi câu trả lời sẽ tự rút ngắn/xáo hàng đợi đang ôn dở. Với mỗi khoá due,
    tách `examId`/`questionId` rồi `getStoredExam(examId)` (gộp theo đề, không nạp trùng); đề
    đã bị xoá hoặc câu đã biến mất sau khi nhập đè → bỏ qua, đếm vào `skippedCount`, không
    crash (cùng nguyên tắc với ticket 003). KHÔNG hỏi lại "mức chắc chắn" như lúc thi — đây là
    lượt ôn SRS thường, chỉ cần đúng/sai, giống cách `StudySession` ôn thẻ từ vựng.
  - Hai lối vào: banner "N câu JLPT đã đến hạn ôn lại" ở đầu `JlptMistakeList` (hiện độc lập
    với `rows.length` — câu đúng+đoán cũng tạo thẻ SRS nên có thể due dù sổ tay lỗi đang
    trống), và nhánh #3 mới trong `pickTodayAction` (`src/lib/todayAction.ts`, ticket 004) —
    lấp đúng chỗ trống ticket đó để lại ("chưa cắm vì chưa có `isDue` cho câu hỏi JLPT").

  Kiểm chứng bằng trình duyệt thật (Playwright, 5 kịch bản, không mock UI):
  1. Làm đề 2 câu KHÔNG có `linkedItemKey` nào (câu văn phạm thật) → nộp bài → đọc thẳng
     `localStorage` → cả hai khoá `jlpt::ex-t1::q1` (đúng) và `jlpt::ex-t1::q2` (sai) đều được
     tạo; thẻ câu sai có `due` ~10 phút sau (relearn, đúng SM-2), không phải due ngay.
  2. Seed một thẻ `jlpt::` due sẵn trong `data.cards` → trang chủ hiện "Hôm nay: 1 câu JLPT
     đến hạn ôn" → xác nhận KHÔNG hiện "N3 đến hạn ôn hôm nay" và KHÔNG hiện "Ôn gộp cả môn
     khác" (chứng minh không rò rỉ vào 'n3'/'all').
  3. Mở `#/jlpt/review` với 1 câu due trỏ tới đề có thật → hiện đúng câu hỏi + tên đề → trả
     lời → "Đã ôn xong 1 câu, Đúng 1/1" → quay về trang chủ, "Hôm nay" không còn nhắc (đã hết
     due).
  4. Seed 1 câu due trỏ tới đề KHÔNG tồn tại → `#/jlpt/review` hiện "Không có câu nào đến hạn"
     kèm "1 câu đến hạn nhưng đề chứa nó đã bị xoá" — không crash.
  5. Banner "Ôn ngay" trong `#/mistakes?tab=jlpt` hiện đúng số câu due và điều hướng đúng
     `#/jlpt/review`.

  **Cố ý chưa làm:** `srsSignalForMatrix` chưa mở rộng theo ma trận đầy đủ 6 ô của mục 6.3/6.4
  — đó là phạm vi ticket 006, giờ mới thật sự có ý nghĩa vì tín hiệu này giờ quyết định lịch
  ôn của CHÍNH câu hỏi JLPT (trước đây chỉ ảnh hưởng một thẻ từ vựng "gần giống", tác động
  nhỏ hơn nhiều). Furigana/audio trong màn ôn không cần vì `JlptQuestion` của các mondai
  文法/読解 hiện có không dùng tới; nếu ticket 014 (audio 聴解) xong thì màn ôn này cũng cần bổ
  sung phát audio, ghi chú lại cho phiên sau.
