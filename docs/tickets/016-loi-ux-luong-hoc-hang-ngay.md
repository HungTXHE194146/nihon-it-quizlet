# 016 — Lỗi UX luồng học hàng ngày (thẻ tự nhảy · thẻ mới bị chôn · danh sách đề vô trật tự)

- **Ưu tiên:** P0
- **Trạng thái:** Xong
- **Phụ thuộc:** —

## Bối cảnh

Ba lỗi do chủ dự án báo sau khi dùng thật ngày 2026-09-10. Gộp một ticket vì cả ba đều thuộc
cùng một câu hỏi: *"mở app ra, tôi biết mình đang ở đâu và làm gì tiếp theo không?"*

### 1. Thẻ từ vựng tự nhảy sang thẻ mới khi chưa kịp đọc

`StudySession.handleAnswerGraded` đặt một `setTimeout` tự gọi `handleNext()` sau 900 ms
(2000 ms ở chế độ gõ cách đọc) cho mọi thẻ `sectionType === 'vocabulary'`.

Mặt sau thẻ mới là chỗ đáng đọc nhất: cách đọc đúng, nghĩa, phần "Giải thích", câu ví dụ, và ở
chế độ gõ là cả chữ mình vừa gõ sai để đối chiếu. Một đồng hồ đếm ngược vô hình thì hoặc quá
nhanh với người đọc kỹ, hoặc quá chậm với người đã xong — không có con số nào đúng cho cả hai.

### 2. "Học mới mỗi ngày" không bao giờ tới lượt

Không phải lỗi hiển thị, là lỗi thuật toán ở `buildReviewQueue`:

```ts
const queue = due.map((d) => d.key);
queue.push(...fresh);        // thẻ mới nối vào ĐUÔI hàng đợi
```

Cộng với `RELEARN_MS = 10 phút` trong `srs.ts` (thẻ vừa trả lời sai được hẹn gặp lại sau 10
phút), đầu hàng đợi tự mọc lại sau mỗi phiên. Người học hiếm khi đi hết 100+ thẻ đến hạn trong
một lần ngồi, nên phần `fresh` ở cuối thực tế không bao giờ được nhìn thấy.

Ba chỗ khác khuếch đại lỗi này:

- `pickTodayAction` chỉ trả nhánh `n3-new` khi `n3.due === 0` — mà con số đó gần như không bao
  giờ về 0 vì lý do trên. Mục "học thẻ mới" biến mất khỏi trang chủ.
- Trang chủ chỉ có MỘT nút, lúc thì "Ôn N3 ngay" lúc thì "Học thẻ N3 mới", tuỳ vào chính con
  số đó — người dùng không có cách nào chủ động chọn học mới.
- `dailyNewLimit` (20) được áp cho MỖI PHIÊN chứ không phải mỗi ngày, vì không có chỗ nào đếm
  số thẻ đã học mới trong ngày. Mở lại phiên 5 lần trong ngày là nạp tới 100 thẻ mới.

### 3. Khu "Phòng thi JLPT" ở trang chủ không theo trật tự nào

`useJlptSummary` sắp danh sách đề bằng `.sort((a, b) => b.updatedAt - a.updatedAt)` —
`updatedAt` là lúc **đề được nhập vào máy**, một con số không nói gì về người học. Thẻ đề cũng
chỉ hiện tiêu đề + cấp độ, không có tình trạng nào: không biết đề nào đang làm dở, đề nào đã
xong, đang làm tới khối nào.

## Đã làm

1. **Bỏ hẳn tự chuyển thẻ.** Nút "Câu tiếp theo" giờ hiện cho cả thẻ từ vựng (trước đây chỉ
   hiện cho câu trắc nghiệm), kèm phím tắt Enter / Space / →. Không thêm cài đặt bật-tắt: đây
   là sửa lỗi, không phải thêm lựa chọn.
2. **`DailyStat.newCards`** — đếm thẻ học lần đầu theo NGÀY. Không suy ra được từ `cards`
   (`seen === 1` chỉ đúng tới lần ôn thứ hai, `reps`/`interval` bị reset mỗi lần sai) nên phải
   đếm ngay trong `recordReview`. Hạn mức thẻ mới từ đó mới thật sự là "mỗi ngày".
3. **`interleaveNew()`** — rải thẻ mới đều khắp hàng đợi thay vì nối vào đuôi. Đánh đổi có ý
   thức: bỏ dở phiên giữa chừng thì số thẻ đến hạn ôn được ít hơn một chút (20 thẻ đầu = 16 cũ
   + 4 mới), đổi lại MỌI phiên đều có phần học mới.
4. **`mode=new`** — phiên chỉ học thẻ mới (`buildNewQueue`), có nút riêng ở trang chủ ghi rõ
   `{đã học}/{hạn mức}` hôm nay, cộng một chip ở khối "Hôm nay" luôn hiện kể cả khi nhánh
   `n3-new` không được chọn làm hành động chính.
5. **Danh sách đề sắp theo tình trạng của người học** (`EXAM_STATE_ORDER`): đang làm dở → còn
   câu chưa mổ xẻ → chưa làm → đã xong. Mỗi thẻ đề hiện huy hiệu tình trạng, thanh tiến độ
   `{đã trả lời}/{tổng}`, số lượt đã làm, % lần gần nhất, và tên khối đang làm.
6. **`JlptAttempt.blockId` / `blockLabel`** — chốt sẵn lúc tạo lượt để trang chủ trả lời được
   "đang làm tới phần nào" mà không phải nạp nội dung đề (mỗi đề cả trăm KB, trang chủ liệt kê
   nhiều đề cùng lúc). Cùng lý do với `scorePercent` / `wrongQuestionIds` đã có.

## Tiêu chí hoàn thành

- [x] Chấm xong một thẻ từ vựng → thẻ đứng yên cho tới khi người học bấm/nhấn phím.
- [x] Có một lối vào rõ ràng, luôn nhìn thấy, cho phần học thẻ mới của hôm nay.
- [x] Học đủ hạn mức thẻ mới rồi thì phiên sau trong cùng ngày không nạp thêm thẻ mới nữa.
- [x] Trang chủ nói được mỗi đề JLPT đang ở tình trạng nào mà không cần mở đề ra.

## File / vùng code liên quan

- `src/components/StudySession.tsx`, `src/hooks/useHashRoute.ts` (`StudyMode = 'new'`)
- `src/hooks/useProgress.tsx` (`DailyStat.newCards`, `interleaveNew`, `buildNewQueue`)
- `src/hooks/useJlptSummary.ts` (`JlptExamState`, `EXAM_STATE_ORDER`)
- `src/lib/todayAction.ts`, `src/components/Homepage.tsx`

## Nhật ký

- 2026-09-10: Tạo và làm xong trong cùng một phiên. Ghi lại vì cả ba lỗi đều là lỗi *thiết kế
  luồng*, không phải lỗi giao diện — người sau đọc code sẽ thấy các quyết định này (nhất là
  `interleaveNew` và việc đếm `newCards` theo ngày) có vẻ tuỳ tiện nếu không biết chúng sinh ra
  để vá cái gì.
