# Ticket JLPT — mục lục

Danh sách việc cần làm cho luồng JLPT (thi thử + ôn tập), rút ra từ buổi audit UX ngày
2026-09-07 (xem `docs/jlpt-practice-test-research.md` để biết bối cảnh thiết kế gốc). Mỗi
ticket là một file độc lập, tự đủ ngữ cảnh để một session AI mới bắt tay vào làm ngay mà
không cần đọc lại toàn bộ lịch sử hội thoại.

## Cách dùng thư mục này (đọc trước khi làm bất cứ ticket nào)

1. **Đọc bảng dưới đây trước.** Chọn ticket có priority cao nhất đang ở trạng thái `Chưa bắt
   đầu` hoặc `Đang làm`, ưu tiên ticket không bị chặn bởi ticket khác chưa xong (`depends_on`).
2. **Mở file ticket đó**, đọc hết mục "Bối cảnh" và "Nhật ký" trước khi viết code — nếu ticket
   đã có người làm dở, Nhật ký ghi rõ đã làm tới đâu, quyết định gì đã chốt, còn vướng gì.
3. **Làm xong một phần hay toàn bộ đều phải cập nhật hai chỗ trước khi kết thúc phiên:**
   - Trường `status` ở đầu file ticket đó.
   - Dòng tương ứng trong bảng bên dưới.
   - Thêm một mục vào "Nhật ký" của ticket (ngày, đã làm gì, quyết định gì, còn lại gì) —
     kể cả khi chỉ dừng giữa chừng, đừng để trống.
4. **Không tạo ticket mới trùng phạm vi** một ticket đã có. Nếu phạm vi đổi, sửa thẳng trong
   file ticket cũ (ghi lại trong Nhật ký là đã đổi phạm vi và vì sao).
5. Ticket bị **Blocked** (chờ chủ dự án quyết định) thì nêu rõ câu hỏi cần hỏi trong mục
   "Chặn bởi" — đừng tự đoán rồi code, hỏi trước.

## Trạng thái dùng chung

`Chưa bắt đầu` · `Đang làm` · `Chặn (cần quyết định)` · `Xong`

## Bảng ticket

| # | Ticket | Ưu tiên | Trạng thái | Phụ thuộc |
|---|---|---|---|---|
| [001](001-kho-de-jlpt-dang-file.md) | Kho đề JLPT dạng file trong repo (backup + nguồn thật) | P0 | Xong | — |
| [002](002-lich-su-lam-bai-jlpt.md) | Lịch sử làm bài JLPT: xem lại, tiếp tục mổ xẻ dở | P0 | Xong | — |
| [003](003-so-tay-loi-jlpt-hien-thi.md) | Sổ tay lỗi JLPT: hiển thị được, gộp với sổ tay câu sai | P0 | Xong | — |
| [004](004-man-hom-nay.md) | Màn "Hôm nay": một CTA duy nhất mỗi ngày | P0 | Xong | 002, 003 |
| [005](005-the-srs-cho-cau-hoi-jlpt.md) | Thẻ SRS cho chính câu hỏi JLPT (không cần linkedItemKey) | P1 | Xong | — |
| [006](006-ma-tran-do-chac-chan.md) | Áp dụng đủ ma trận độ chắc chắn × đúng-sai vào lịch ôn | P1 | Xong | 005 |
| [007](007-dong-ho-dem-gio.md) | Đồng hồ đếm giờ + tự nộp bài JLPT | P1 | Xong | — |
| [008](008-ban-do-chan-doan-theo-mondai.md) | Bản đồ chẩn đoán nhóm theo 問題 ở màn kết quả | P1 | Chưa bắt đầu | — |
| [009](009-hien-passage-khi-mo-xe.md) | Hiện lại đoạn văn (passage) khi mổ xẻ câu đọc hiểu | P2 | Xong | — |
| [010](010-giam-chi-phi-mo-xe.md) | Giảm chi phí mổ xẻ (tạm dừng/tiếp tục, rút gọn bước) | P2 | Đang làm | 002 |
| [011](011-nhap-nhieu-de-cung-luc.md) | Nhập nhiều đề JLPT cùng lúc (multi-file) | P2 | Chưa bắt đầu | — |
| [012](012-furigana-va-phim-tat.md) | Furigana + phím tắt khi làm bài JLPT | P3 | Chưa bắt đầu | — |
| [013](013-ngay-thi-va-dem-nguoc.md) | Ngày thi mục tiêu + đếm ngược + phân bổ khối lượng ôn | P3 | Xong | 004 |
| [014](014-audio-nghe-hieu.md) | Audio 聴解 (nghe hiểu) | P3 | Chặn (cần quyết định) | — |
| [015](015-nap-de-jlpt-tu-thu-muc-repo.md) | Nạp đề JLPT từ thư mục repo (thay vì chỉ dựa KV) | P2 | Chặn (cần quyết định) | 001 |
| [016](016-loi-ux-luong-hoc-hang-ngay.md) | Lỗi UX luồng học hàng ngày (thẻ tự nhảy, thẻ mới bị chôn, đề vô trật tự) | P0 | Xong | — |

## Nguồn gốc các ticket này

Toàn bộ rút ra từ một buổi rà soát UX luồng JLPT (thi → mổ xẻ → ôn lại → hàng ngày), đối
chiếu code thật với `docs/jlpt-practice-test-research.md`. Ba phát hiện nghiêm trọng nhất dẫn
tới ticket 002/003/004:

1. Bấm "Để sau" ở màn kết quả là mất luôn đường quay lại mổ xẻ — không có màn lịch sử làm bài.
2. `listMistakes()` (sổ tay lỗi JLPT) được định nghĩa nhưng không được gọi ở bất kỳ đâu trong
   toàn bộ codebase — công sức viết "quy tắc tự rút ra" ở bước 4 mổ xẻ bị bỏ phí hoàn toàn.
3. Trang chủ có hai lối đi song song (Ôn N3 / Phòng thi JLPT) không liên quan nhau, không có
   nơi nào trả lời câu "hôm nay tôi nên học gì" — người học phải tự quyết định mỗi ngày.
