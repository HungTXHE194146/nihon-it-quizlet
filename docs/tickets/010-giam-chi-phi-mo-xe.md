# 010 — Giảm chi phí mổ xẻ (tạm dừng/tiếp tục, rút gọn bước)

- **Ưu tiên:** P2
- **Trạng thái:** Xong (cả 3 hướng)
- **Phụ thuộc:** 002 (cần dữ liệu "mổ xẻ dở" ghi nhận tăng dần mới có gì để tạm dừng/tiếp tục)

## Bối cảnh

Quy trình mổ xẻ hiện tại là 4 bước bắt buộc cho **mỗi** câu sai, không có nút bỏ qua, không
lưu giữa chừng (trước ticket 002) — 12 câu sai = 48 lượt tương tác liên tục, đúng lúc người
học vừa mệt sau một bài thi dài. Tài liệu thiết kế coi "tỉ lệ mổ xẻ" (`reviewed`/`submitted`)
là chỉ số quan trọng nhất (mục 13), nhưng chưa có cơ chế nào giảm chi phí thực hiện nó.

Đây là **ticket mang tính đề xuất/thiết kế**, không có một cách làm "đúng" duy nhất — người
nhận ticket cần cân nhắc và có thể trao đổi với chủ dự án trước khi code diện rộng.

## Việc cần cân nhắc (chọn 1 hoặc kết hợp, không bắt buộc làm hết)

1. **Tạm dừng giữa chừng, tiếp tục sau** — phụ thuộc ticket 002 đã ghi `reviewedQuestionIds`
   tăng dần; chỉ cần thêm nút "Tạm dừng, mổ xẻ tiếp sau" ở view `review`, thoát về mà không
   mất tiến độ (khác với hiện tại: thoát ngang view `review` không có nút thoát rõ ràng nào cả
   — kiểm tra lại xem có đường thoát nào không, nếu không thì đây cũng là một lỗ hổng cần vá).
2. **Rút gọn bước cho câu ít giá trị học** — ví dụ: câu "Sai + Đoán" (theo ma trận ở ticket
   006) có thể cho phép bỏ qua bước 2-4 nhanh hơn (vì đằng nào cũng không nhớ lý do chọn), tập
   trung công sức vào câu "Sai + Chắc chắn" (sai mà tưởng mình đúng — đáng mổ xẻ kỹ nhất).
3. **Giới hạn số câu mổ xẻ một lượt** — ví dụ tối đa 5 câu/lượt, phần còn lại hẹn "mổ xẻ tiếp"
   ở lần mở app kế tiếp (cần khối "Hôm nay" ở ticket 004 để nhắc việc còn lại).

## Tiêu chí hoàn thành

Vì đây là ticket đề xuất, tiêu chí hoàn thành do người nhận việc tự đặt ra khi chọn hướng đi,
nhưng tối thiểu phải:
- [x] Có ít nhất một cách giảm được số lượt tương tác bắt buộc cho một phiên mổ xẻ nhiều câu
      sai (>8 câu), so với hiện tại (4 bước × mọi câu, không thể tắt).
- [x] Không hạ thấp chất lượng mổ xẻ cho câu quan trọng nhất (sai + chắc chắn).
- [x] Ghi rõ hướng đã chọn và lý do vào Nhật ký.

Cả 3 hướng đã làm — xem Nhật ký 2026-09-10.

## File / vùng code liên quan

- `src/components/jlpt/JlptExamRunner.tsx` — view `review`, `finishOneReview`, `startReview`.
- `docs/jlpt-practice-test-research.md` mục 4 (tâm lý giữ chân), mục 6 (quy trình mổ xẻ),
  mục 13 (chỉ số "tỉ lệ mổ xẻ").

## Nhật ký

- 2026-09-07: Ticket tạo từ buổi audit UX, dạng đề xuất — cần cân nhắc trước khi code diện
  rộng, không phải "cứ làm theo checklist".
- 2026-09-10: Làm **hướng 1**, và xác nhận nghi ngờ ghi trong chính ticket: view `review`
  KHÔNG có đường thoát nào cả. Bấm "Bắt đầu mổ xẻ" là bị nhốt tới khi xong hết, chỉ còn cách
  bấm Back của trình duyệt — mà Back thì văng ra khỏi cả đề. Đã thêm nút "Để sau" quay về màn
  kết quả (mỗi câu đã được ghi nhận ngay khi xong ở `finishOneReview` nên không mất gì), và
  nút "Bỏ qua kiểm tra nhanh" ở mini-quiz.

  Cùng lượt, sửa mấy chỗ mâu thuẫn trong chính luồng 4 bước — chúng cũng là chi phí, chỉ là
  chi phí do lỗi chứ không do thiết kế:
  - Bước 1 có nút ghi "Giờ bạn chọn lại đáp án này →" nhưng bấm được cả khi chưa chọn gì, làm
    hỏng đúng mục đích của bước 1 (phân biệt "không biết" với "lỡ tay"). Nay phải chọn, hoặc
    bấm "Tôi chịu, không đoán được" — cũng là một câu trả lời có ý nghĩa.
  - Không có đường quay lại bước trước: lỡ tay chọn nhầm nguyên nhân ở bước 2 là chịu chết,
    vì bước 2 nhảy sang bước 3 ngay khi chạm. Nay bước 3 có "Chọn lại" (→ bước 2) và bước 4
    có "Xem lại" (→ bước 3). Cố ý KHÔNG cho quay về bước 1: đáp án đúng đã hiện ở bước 3 nên
    "đoán lại" sau đó là vô nghĩa.
  - Thêm thanh chỉ báo "bước n/4" — quy trình cố ý mở dần từng bước (mục 9.3) nên bắt buộc
    phải có gì đó nói người học đang ở đâu và còn bao xa.
  - Mini-quiz (bước 7) không đẩy kết quả vào lịch ôn: trả lời sai lần hai ngay sau khi mổ xẻ
    được xử lý y hệt trả lời đúng, trong khi màn "Xong" lại nói "các câu sai đã được lên lịch
    ôn lại". Nay có `recordReview(..., 'unsure')` — 'unsure' chứ không phải 'sure' vì đáp án
    vừa hiện cách đó vài chục giây, đúng ở đây là trí nhớ ngắn hạn, không đáng thưởng khoảng
    ôn dài (ma trận mục 6.4 → ×0.6).
  - Mini-quiz lấy `reviewQueue.slice(0, 5)` (5 câu mổ xẻ ĐẦU tiên) — trái mục đích "kết thúc
    bằng cảm giác thắng" (mục 4.7), vì đó là những câu đã mổ xẻ lâu nhất. Đổi thành
    `slice(-5)`.

- 2026-09-10 (tiếp): Làm nốt **hướng 2** và **hướng 3**.

  **Hướng 2 — rút gọn bước cho "Sai + Đoán":** thêm `MistakeCause` mới `'doan_mo'` ("Đoán mò",
  `src/lib/jlpt/schema.ts`) — khác `bat_can` (bất cẩn = biết mà chọn nhầm) về nghĩa, nên không
  tái dùng fallback cũ `cause ?? 'bat_can'` của `finishOneReview` cho trường hợp này. Ở
  `view === 'review'`, tính `wasGuessed = answer?.confidence === 'guess'` (độ chắc chắn ghi
  lúc LÀM BÀI, không phải lúc đoán lại ở bước 1). Khi `wasGuessed`:
  - Hai nút chuyển tiếp ở bước 1 (chọn đáp án / "Tôi chịu") tự gán `cause = 'doan_mo'` và nhảy
    thẳng sang bước 3 — bỏ hẳn màn bước 2 (chọn nguyên nhân), vì đằng nào cũng không nhớ lý do.
  - Bước 3 (đáp án đúng + lời giải) vẫn hiện đầy đủ như cũ — cố ý KHÔNG bỏ luôn bước này dù
    ticket viết "bỏ qua bước 2-4": thấy đáp án đúng là phần giá trị nhất của cả quy trình, bỏ
    luôn thì "rút gọn" biến thành "không mổ xẻ gì cả". Thêm nút phụ "Lưu nhanh, bỏ qua bước tự
    viết" (hiện khi `cause === 'doan_mo'`) gọi thẳng `finishOneReview`, bỏ qua bước 4.
  - Vẫn giữ nguyên đường vòng cũ: bấm "Chọn lại" ở bước 3 quay về bước 2 như bình thường, cho
    ai muốn tự chọn nguyên nhân khác thay vì nhận mặc định "Đoán mò".
  - Kết quả: câu "Sai + Đoán" còn tối thiểu 2 lượt bấm bắt buộc (bước 1 → lưu nhanh ở bước 3)
    thay vì 4 (bước 1→2→3→4), câu "Sai + Chắc chắn"/"Sai + Phân vân" vẫn đủ 4 bước như cũ.

  **Hướng 3 — trần số câu một lượt:** thêm hằng `REVIEW_BATCH_SIZE = 5` và
  `REVIEW_PRIORITY = { sure: 0, unsure: 1, guess: 2 }`. `startReview()` khi
  `pendingReviewIds.length > 5` thì sắp theo độ ưu tiên (ma trận ticket 006 — "Sai + Chắc chắn"
  lên trước) rồi cắt lấy 5 câu đầu làm `reviewQueue`; phần còn lại vẫn nằm nguyên trong pending
  (không đánh dấu gì) nên "Mổ xẻ nốt" lần sau tự lấy đúng phần thiếu. Màn kết quả nói trước số
  câu sẽ mổ xẻ lượt này (`5/12 câu`) kèm dòng phụ giải thích ưu tiên; màn "Xong" nói rõ còn bao
  nhiêu câu chưa mổ xẻ, hẹn lần mở app kế tiếp — khối "Hôm nay" (ticket 004, đã xong) tự nhắc
  lại việc này ở trang chủ nên không cần thêm cơ chế nhắc riêng.

  **Đã kiểm:** `npx tsc -b` và `npx oxlint` (cả `JlptExamRunner.tsx` lẫn `schema.ts`) sạch,
  không lỗi/không warning mới. **Chưa kiểm bằng UI thật**: cần đăng nhập + nhập một đề JLPT
  thật (textarea dán JSON ở màn Nhập Đề) rồi cố ý trả lời sai với độ chắc chắn khác nhau mới
  dựng được đúng kịch bản để bấm thử — không dựng kịp trong phiên này. Nếu có ai test tay, cần
  xác nhận: (1) câu đoán mò nhảy thẳng 1→3 và nút "Lưu nhanh" hoạt động, (2) >5 câu sai thì chỉ
  5 câu vào hàng đợi và đúng là 5 câu ưu tiên cao nhất, (3) màn "Xong" hiện đúng số câu còn lại.
