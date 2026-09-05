# Nghiên cứu thiết kế: Chế độ luyện đề JLPT cho NihonIT

> **Tài liệu này dành cho cả người và AI đọc.**
> Bất kỳ ai (hoặc AI nào) chuẩn bị viết code cho tính năng luyện đề JLPT đều phải đọc hết file
> này trước. Nó giải thích **vì sao** từng quyết định thiết kế tồn tại, không chỉ **làm gì** —
> vì phần lớn giá trị của tính năng này nằm ở tâm lý học, không nằm ở kỹ thuật.
>
> - Trạng thái: **v2 — bản chốt trước khi code.** Chưa viết dòng code nào cho JLPT.
> - Phạm vi: kỳ thi JLPT, trọng tâm **N3**.
> - Ngày: 2026-09-04.
>
> **Đường đọc nhanh** nếu không có thời gian đọc hết 1.700 dòng:
> mục 0 (14 quyết định) → mục 8.14 (chắt lọc từ Bunpro) → mục 15 (lộ trình) → Phụ lục A
> (danh sách kiểm tra). Bốn mục đó là đủ để bắt đầu.

---

## Mục lục

0. [Tóm tắt cho người vội](#0-tóm-tắt-cho-người-vội)
1. [Phạm vi & bối cảnh codebase](#1-phạm-vi--bối-cảnh-codebase)
2. [Kỳ thi JLPT thật — ràng buộc bắt buộc](#2-kỳ-thi-jlpt-thật--ràng-buộc-bắt-buộc)
3. [Nền tảng khoa học học tập](#3-nền-tảng-khoa-học-học-tập)
4. [Tâm lý giữ chân người lười](#4-tâm-lý-giữ-chân-người-lười)
5. [Ba giai đoạn: TRƯỚC / TRONG / SAU](#5-ba-giai-đoạn-trước--trong--sau)
6. [Quy trình mổ xẻ lỗi](#6-quy-trình-mổ-xẻ-lỗi)
7. [Đặc thù từng phần thi](#7-đặc-thù-từng-phần-thi)
8. [Tham chiếu thực địa: Bunpro JLPT Practice Tests](#8-tham-chiếu-thực-địa-bunpro-jlpt-practice-tests) ★ mới
9. [Đặc tả màn hình & luồng](#9-đặc-tả-màn-hình--luồng)
10. [Mô hình dữ liệu đề xuất](#10-mô-hình-dữ-liệu-đề-xuất)
11. [Nhập dữ liệu đề từ ngoài](#11-nhập-dữ-liệu-đề-từ-ngoài) ★ mới
12. [Nguyên tắc viết chữ trong giao diện](#12-nguyên-tắc-viết-chữ-trong-giao-diện)
13. [Chỉ số đo & tiêu chí thành công](#13-chỉ-số-đo--tiêu-chí-thành-công)
14. [Phản mẫu — những thứ tuyệt đối không làm](#14-phản-mẫu--những-thứ-tuyệt-đối-không-làm)
15. [Lộ trình triển khai](#15-lộ-trình-triển-khai)
16. [Câu hỏi mở cần chủ dự án quyết](#16-câu-hỏi-mở-cần-chủ-dự-án-quyết)
17. [Nguồn tham khảo](#17-nguồn-tham-khảo)

---

## 0. Tóm tắt cho người vội

Mười bốn quyết định thiết kế cốt lõi. Phần còn lại của tài liệu là lập luận cho chúng.
Bốn quyết định cuối được thêm sau khi phân tích Bunpro (mục 8) và sau khi chủ dự án nêu yêu cầu
nhập dữ liệu.

| # | Quyết định | Lý do một câu |
|---|---|---|
| 1 | **Nộp bài KHÔNG phải là màn hình cuối.** Kết quả là *cửa vào* của phần mổ xẻ lỗi. | Việc học xảy ra ở phần review, mà đây lại là chỗ người ta bỏ đi nhiều nhất. |
| 2 | **Thu "độ chắc chắn" ngay lúc trả lời**, không hỏi lại sau. | Phân biệt "đúng vì biết" với "đúng vì đoán" — thứ quyết định lịch ôn có đúng hay không. |
| 3 | **Phân loại lỗi theo 2 trục** (nguyên nhân × độ chắc chắn), không phải 1. | "Sai mà tưởng đúng" và "sai vì chưa học" cần hai cách xử lý hoàn toàn khác nhau. |
| 4 | **Bắt người học đoán lại trước khi xem đáp án.** | Thêm một lần truy hồi ký ức; xem đáp án ngay là dạng học thụ động kém hiệu quả nhất. |
| 5 | **Không giả điểm JLPT chính xác.** Chỉ hiện số câu đúng + ước lượng có ghi rõ là ước lượng. | JLPT chấm theo IRT, không suy ra được từ % đúng. Giả điểm = khiến người ta tự tin sai rồi trượt thật. |
| 6 | **Ba cỡ phiên: 5 phút / 25 phút / full.** | Rào cản lớn nhất với người lười là chi phí khởi động, không phải độ khó. |
| 7 | **Đồng hồ mô phỏng thật nhưng tắt được.** | Áp lực thời gian làm giảm trí nhớ làm việc; ép người mới = bỏ cuộc. |
| 8 | **Phiên học phải kết thúc ở điểm tích cực** (mini-quiz cuối gồm chính những câu vừa sửa). | Quy tắc đỉnh–kết: người ta nhớ trải nghiệm qua cảm xúc lúc kết thúc. |
| 9 | **Ngôn ngữ giao diện nói về bài làm, không nói về con người.** | Phản hồi nhắm vào bản thân người học làm giảm hiệu suất, không tăng. |
| 10 | **Lỗi từ đề thi chảy vào đúng hệ SRS đã có**, không dựng hệ 1-3-7-14 song song. | Hai lịch ôn song song sẽ mâu thuẫn và không ai bảo trì nổi. |
| 11 | **Mỗi câu hỏi có lời giải cho CẢ BỐN phương án**, không chỉ đáp án đúng. | Mỗi nhiễu là một từ/mẫu có thật — một câu dạy được 4 mục thay vì 1. Và **không bổ sung ngược được** (mục 8.7). |
| 12 | **Điểm số ẩn mặc định**, người học tự bấm để xem. | Trả lại quyền kiểm soát thời điểm đối mặt với con số; hạ điểm xuống hàng thứ yếu so với việc mổ xẻ (mục 8.13). |
| 13 | **Đo và hiện nhịp làm bài** (thời gian thực tế / thời gian cho phép, theo khối và theo câu). | Hết giờ là kiểu trượt kinh điển của JLPT. Cho được lời khuyên chiến thuật mà không lời giải ngữ pháp nào cho được (mục 8.13). |
| 14 | **Có đường nhập dữ liệu đề từ ngoài ngay từ sớm.** | Nút thắt của dự án là nội dung chứ không phải code. Nhập dữ liệu là lời giải cho chính bài toán đó (mục 11). |

---

## 1. Phạm vi & bối cảnh codebase

### 1.1 Quyết định phạm vi (chủ dự án chốt ngày 2026-09-04)

> **Từ nay tập trung hoàn toàn vào tiếng Nhật / JLPT.**
> JIT401 (tiếng Nhật CNTT) và JFE301 (tiếng Anh IT) **không bị xoá**, vẫn chạy như hiện tại,
> nhưng **không đầu tư thêm**. Mọi tính năng mới mặc định chỉ nhắm JLPT.

Hệ quả cho AI đọc file này:
- Đừng đề xuất tính năng cho JIT401/JFE301.
- Khi phải chọn giữa "làm chung cho mọi môn" và "làm riêng cho JLPT tốt hơn", **chọn cái thứ hai**.
- Không được phá vỡ các môn cũ. Chúng phải tiếp tục chạy.

### 1.2 Cái đã có trong repo và tái dùng được

| Thành phần | File | Dùng lại được cho JLPT? |
|---|---|---|
| Lịch ôn ngắt quãng SM-2 | `src/lib/srs.ts` | **Có** — dùng nguyên, chỉ chỉnh tham số khởi đầu theo loại lỗi. |
| Kho tiến độ + streak + cài đặt | `src/hooks/useProgress.tsx` | **Có** — mở rộng thêm attempt và sổ tay lỗi. |
| Phòng thi có đồng hồ | `src/components/ExamSession.tsx` | **Một phần** — xem 1.3. |
| Sổ tay câu sai | `src/components/MistakeNotebook.tsx` | **Một phần** — hiện chỉ đếm số lần sai, chưa có phân loại nguyên nhân. |
| Thẻ câu hỏi | `src/components/QuestionCard.tsx` | **Có** — đã tách được chế độ điều khiển từ ngoài (`examMode`). |
| Phát âm TTS | `src/lib/tts.ts` | **Có** — nhưng không đủ cho 聴解, xem mục 7.4. |
| Nạp dữ liệu động | `src/data/subjectLoader.ts` | **Có** — thêm JLPT như một nguồn dữ liệu mới. |
| Chạy offline (PWA) | `vite.config.ts` | **Có** — nhưng audio 聴解 sẽ làm phình precache, xem 7.4. |

### 1.3 Vì sao KHÔNG chỉ "đổ dữ liệu JLPT vào ExamSession"

`ExamSession` hiện tại là phòng thi một khối, một đồng hồ, câu hỏi độc lập. JLPT khác ở **sáu**
điểm cấu trúc, và mỗi điểm đều đụng vào mô hình dữ liệu:

1. **Nhiều khối thời gian tách rời**, không dồn giờ được từ khối này sang khối kia.
2. **Điểm liệt theo phần** — đạt tổng điểm vẫn trượt nếu một phần dưới ngưỡng.
3. **Đọc hiểu dùng chung đoạn văn** — nhiều câu bám vào một bài đọc; mô hình `StudyItem` hiện
   tại không có khái niệm "đoạn văn".
4. **Nghe hiểu có audio**, phát một lần, không tua lại.
5. **Cấu trúc 問題 (mondai)** là đơn vị chẩn đoán quan trọng — "bạn yếu 問題2 文の組み立て" hữu
   ích hơn nhiều so với "bạn sai 8 câu".
6. **Phần review sau bài thi** là một luồng riêng nhiều bước, không phải một danh sách lật đáp án.

→ **Kết luận:** viết `JlptExamSession` mới, tái dùng `QuestionCard` và hạ tầng SRS/tiến độ.
Không cố nhét JLPT vào `ExamSession`.

---

## 2. Kỳ thi JLPT thật — ràng buộc bắt buộc

Phần này là dữ kiện, không phải ý kiến. Đã đối chiếu nguồn (xem mục 17).

### 2.1 Khối thời gian

Điểm dễ nhầm nhất: **số khối thời gian ≠ số phần chấm điểm.**

| Cấp | Các khối thi (tính giờ riêng) | Tổng |
|---|---|---|
| N1 | 言語知識(文字・語彙・文法)・読解 110分 → 聴解 55分 | ~165 phút |
| N2 | 言語知識(文字・語彙・文法)・読解 105分 → 聴解 50分 | ~155 phút |
| **N3** | **言語知識(文字・語彙) 30分 → 言語知識(文法)・読解 70分 → 聴解 40分** | **~140 phút** |
| N4 | 言語知識(文字・語彙) 25分 → 言語知識(文法)・読解 55分 → 聴解 35分 | ~115 phút |
| N5 | 言語知識(文字・語彙) 20分 → 言語知識(文法)・読解 40分 → 聴解 30分 | ~90 phút |

- N1, N2 có **2 khối**; N3, N4, N5 có **3 khối**.
- **Không được dồn giờ thừa sang khối sau.** Giữa các khối có nghỉ.
- Tổng số câu N3 khoảng 100–110. Một điểm tham chiếu cụ thể (N3 = 36 + 39 + 28 = 103 câu) ở
  **mục 8.2**, lấy từ đề mô phỏng của Bunpro — tham khảo tốt, nhưng không phải số chính thức.
- Thời lượng 聴解 có thể xê dịch nhẹ theo độ dài file ghi âm.

### 2.2 Cách chấm điểm

| Cấp | Các phần chấm điểm | Thang | Đạt tổng | Điểm liệt từng phần |
|---|---|---|---|---|
| N1 | 言語知識 / 読解 / 聴解 | 60 + 60 + 60 = 180 | ≥ 100 | ≥ 19 mỗi phần |
| N2 | 言語知識 / 読解 / 聴解 | 60 + 60 + 60 = 180 | ≥ 90 | ≥ 19 mỗi phần |
| **N3** | **言語知識 / 読解 / 聴解** | **60 + 60 + 60 = 180** | **≥ 95** | **≥ 19 mỗi phần** |
| N4 | 言語知識・読解 / 聴解 | 120 + 60 = 180 | ≥ 90 | ≥ 38 / ≥ 19 |
| N5 | 言語知識・読解 / 聴解 | 120 + 60 = 180 | ≥ 80 | ≥ 38 / ≥ 19 |

> Số liệu N4/N5 lấy từ trí nhớ, **chưa đối chiếu được nguồn chính thức** trong lần nghiên cứu
> này (jlpt.jp bị chặn ở môi trường build). Đối chiếu lại trước khi hardcode.

### 2.3 Điểm là **尺度得点** (scaled score), không phải phần trăm

JLPT dùng **lý thuyết ứng đáp câu hỏi (IRT)** để quy đổi số câu đúng sang thang 0–180. Cùng số
câu đúng, hai kỳ thi khác nhau có thể ra điểm khác nhau, vì độ khó từng câu được cân nhắc.

**Hệ quả thiết kế — bắt buộc tuân thủ:**

- ❌ **Không** hiển thị "Điểm JLPT của bạn: 102/180". Đó là con số bịa.
- ✅ Hiển thị: số câu đúng / tổng, theo từng phần chấm điểm, kèm % .
- ✅ Nếu muốn có tín hiệu đạt/trượt, dùng **dải ước lượng** và **nói rõ là ước lượng**:
  > "Bạn đúng 58% phần 言語知識. Đề thật chấm theo thang riêng nên đây chỉ là ước lượng thô —
  > coi nó là la bàn, không phải thước đo."
- ✅ Cảnh báo điểm liệt thì **có căn cứ và hữu ích**: "Phần 聴解 bạn mới đúng 6/20. Ở đề thật,
  một phần quá thấp là trượt cả bài dù tổng điểm cao."

Đây không phải chuyện câu chữ. Một app cho người dùng con số đẹp giả tạo sẽ khiến họ đi thi
thật trong tâm thế sai. Thà nói "tôi không biết chính xác" còn hơn.

---

## 3. Nền tảng khoa học học tập

Phần này giải thích các cơ chế; mục 5 và 6 biến chúng thành giao diện cụ thể.

### 3.1 Hiệu ứng kiểm tra (testing effect / retrieval practice)

Tự lôi kiến thức ra khỏi đầu ghi nhớ tốt hơn nhiều so với đọc lại. Đây là lý do "làm đề" hiệu
quả — **nhưng chỉ khi có phản hồi**. Truy hồi mà không có phản hồi thì lỗi sai được củng cố
thêm. Trong tổng quan của Dunlosky và cộng sự (2013) về các kỹ thuật học, *luyện kiểm tra* và
*học giãn cách* là hai kỹ thuật được xếp hạng hữu ích cao nhất; đọc lại và tô sáng bị xếp thấp.

→ **Áp dụng:** làm đề là đúng hướng, nhưng làm đề mà không mổ xẻ thì gần như vô ích. Toàn bộ
thiết kế phải nghiêng cán cân về phía phần mổ xẻ.

### 3.2 Học giãn cách (spacing effect)

Ôn rải ra theo thời gian ăn đứt ôn dồn. App đã có SM-2 rồi — **đừng dựng hệ thứ hai**.

### 3.3 Khó khăn hữu ích (desirable difficulties — Bjork)

Điều kiện làm việc học *chậm và khó hơn* tại thời điểm học lại cho ghi nhớ dài hạn **tốt hơn**:
giãn cách, xen kẽ chủ đề, tự truy hồi thay vì nhận sẵn.

→ **Áp dụng:** bắt đoán lại trước khi xem đáp án; trộn thứ tự đáp án; xen kẽ dạng câu hỏi.
→ **Giới hạn:** khó *quá* mà không có điểm tựa thì thành bỏ cuộc, không thành học. Ranh giới
này chính là chỗ dễ hỏng nhất của tính năng.

### 3.4 Nghịch lý thời điểm phản hồi

- **Phản hồi ngay** giúp sửa lỗi nhanh, đỡ ức chế, tốt cho người mới.
- **Phản hồi trễ** thường cho ghi nhớ dài hạn tốt hơn, vì khoảng trống giữa lúc trả lời và lúc
  biết đáp án tạo thêm một lần truy hồi nữa.

→ **Hoà giải:** chế độ **thi thật = phản hồi trễ** (nộp xong mới xem). Điều này vừa đúng với
kỳ thi thật, vừa đúng về mặt khoa học. Chế độ **luyện nhanh = phản hồi ngay**.
Nói cách khác: việc phòng thi giấu đáp án tới lúc nộp **là tính năng, không phải bất tiện** —
và nên nói với người dùng như vậy.

### 3.5 Hiệu ứng siêu sửa lỗi (hypercorrection effect)

Phát hiện phản trực giác nhưng lặp lại được nhiều lần: **lỗi mà người học tin chắc mình đúng lại
là lỗi được sửa và nhớ tốt nhất** — với điều kiện họ nhận được phản hồi đúng.

→ **Áp dụng:** đây là lý do số 1 để **thu độ chắc chắn ngay lúc làm bài**. Nhóm "sai mà rất tự
tin" là nhóm có giá trị học cao nhất và phải được đẩy lên đầu hàng đợi review.

### 3.6 Dương tính giả: đúng nhờ đoán

Mặt trái của cùng một vấn đề, và là **lỗ hổng nguy hiểm nhất trong mọi app dùng SRS**:

> Người học đoán bừa 1 trong 4 → đúng → hệ thống ghi nhận "đã thuộc" → đẩy lịch ôn ra 6 ngày →
> kiến thức đó thực ra chưa từng tồn tại.

Với câu 4 lựa chọn, **25% số câu đoán bừa sẽ đúng**. Trong một đề 100 câu mà người học đoán 20
câu, khoảng 5 câu sẽ bị hệ thống đánh dấu sai lệch là "đã biết".

→ **Áp dụng:** nhãn độ chắc chắn phải tác động vào SRS. "Đúng + đoán" **không được** tăng khoảng
ôn như "đúng + chắc".

### 3.7 Tải nhận thức (cognitive load)

Trí nhớ làm việc rất hẹp. Lúc đang làm đề, nó đã bị bài thi chiếm gần hết.

→ **Áp dụng:**
- Giao diện **trong lúc thi** phải trần trụi tới mức khắc khổ. Mọi hoạt ảnh, huy hiệu, màu mè
  đều là kẻ cắp sự chú ý.
- Giao diện **lúc review** thì ngược lại: được phép giàu thông tin, vì áp lực thời gian đã hết.

### 3.8 Lo âu thi cử làm hẹp trí nhớ làm việc

Lo âu chiếm dụng chính nguồn lực mà bài thi cần. Đồng hồ đỏ nhấp nháy liên tục không tạo động
lực — nó ăn mất năng lực làm bài.

→ **Áp dụng:** cảnh báo thời gian **một lần, nhẹ nhàng** (mốc 10 phút và 5 phút), rồi thôi.
Không nhấp nháy, không đổi màu toàn màn hình, không âm thanh báo động.

---

## 4. Tâm lý giữ chân người lười

### 4.1 Bốn điểm rơi

Đây là bản đồ nơi người học biến mất. Mọi tính năng giữ chân phải trỏ vào một trong bốn điểm này.

```
                                        Tỉ lệ rơi (định tính)
[Có ý định học]
      │
      ├─── ĐIỂM RƠI 1: chi phí khởi động ────────────► rất cao
      │    "140 phút á? Thôi để mai."
      ▼
[Mở đề ra]
      │
      ├─── ĐIỂM RƠI 2: cú sốc 5 phút đầu ───────────► cao
      │    Câu 1 đã không hiểu → "mình dốt quá" → đóng.
      ▼
[Đang làm]
      │
      ├─── ĐIỂM RƠI 3: kiệt sức giữa chừng ─────────► trung bình
      │    Mệt, không thấy tiến triển.
      ▼
[Nộp bài]
      │
      ├─── ĐIỂM RƠI 4: né tránh sau khi biết điểm ──► CHÍ MẠNG
      │    Điểm thấp → đau → đóng app → không bao giờ review.
      ▼
[Mổ xẻ lỗi]  ← Chỗ việc học thực sự xảy ra, và cũng là chỗ ít người tới nhất.
```

**Điểm rơi 4 là điểm phải dồn sức nhất.** Một người làm xong đề rồi bỏ đi gần như không học
được gì — chỉ tốn 140 phút để biết mình kém. Nghịch lý: đây lại là điểm mà đa số app luyện đề
xử lý tệ nhất, vì họ coi màn hình điểm số là đích đến.

### 4.2 Chi phí khởi động (điểm rơi 1)

Rào cản không phải độ khó mà là **kích thước của bước đầu tiên**.

**Ba cỡ phiên, luôn hiện song song.** Hai cỡ lớn **bám đúng khối thi thật** thay vì cắt theo
số phút tuỳ tiện — cách này Bunpro cũng dùng (mục 8.4), vừa hạ chi phí khởi động vừa không
phải giải thích gì thêm cho người dùng:

| Cỡ | Thời lượng | Nội dung | Dành cho |
|---|---|---|---|
| **Nhấm nháp** | ~5 phút | **1 問題** (ví dụ 問題1 漢字読み, 8–9 câu) | Người lười, đang chờ xe buýt, "học tí thôi" |
| **Một khối** | 30 / 70 / 40 phút | 1 khối thi thật (文字・語彙 hoặc 文法・読解 hoặc 聴解) | Buổi tối trong tuần |
| **Full** | 140 phút | Cả đề, đủ 3 khối, có nghỉ | Cuối tuần, gần ngày thi |

Nguyên tắc: **nút được nhấn nhiều nhất phải là nút nhỏ nhất.** Trang chủ JLPT mở ra phải thấy
ngay "Làm 8 câu (5 phút)" chứ không phải "Bắt đầu đề thi 140 phút".

Cỡ **nhấm nháp** chính là chỗ ta đi xa hơn Bunpro: khối nhỏ nhất bên họ vẫn là 30 phút, mà 30
phút vẫn là một quyết định lớn với người đang lười. Một 問題 thì không.

**Hiệu ứng khởi đầu mới:** thứ Hai, đầu tháng, sau kỳ thi trượt — đây là những lúc người ta dễ
tiếp nhận lời mời quay lại nhất. Đáng để canh.

**Ý định thực hiện (implementation intentions):** người đặt ra "tôi sẽ học lúc 8h tối ở bàn bếp"
thực hiện cao hơn hẳn người chỉ "định học nhiều hơn". → Cho phép đặt lịch cụ thể, nhắc đúng giờ
đó. Câu nhắc nói về *việc*, không nói về *người*: "8h tối — 8 câu 漢字読み đang chờ" tốt hơn
"Bạn chưa học hôm nay!".

### 4.3 Hiệu ứng Zeigarnik: việc dở dang

Việc chưa hoàn thành tạo một sức căng nhận thức khiến người ta muốn quay lại hoàn tất.

→ **Áp dụng:**
- Đếm **việc còn lại**, không đếm việc đã xong: "còn 6 câu chưa mổ xẻ" mạnh hơn "đã mổ xẻ 4/10".
- App đã có cơ chế khôi phục phiên dở — mở rộng cho bài thi và **cho cả phiên review dở**.
- Nhưng đừng lạm dụng: một danh sách 200 việc dở dang thì không tạo sức căng, nó tạo tê liệt.
  Giới hạn ở việc dở dang **gần nhất**.

### 4.4 Streak: con dao hai lưỡi

Streak hiệu quả vì con người ghét mất thứ đang có hơn là thích được thêm. Nhưng đúng cơ chế đó
làm nó nguy hiểm: **mất streak dài thường dẫn tới bỏ hẳn**, vì "hỏng rồi thì thôi".

→ **Bắt buộc:**
- Có **ngày nghỉ / đóng băng streak** (ví dụ mỗi tuần được 1 ngày, tự động, không cần xin).
- Mất streak thì nói bằng giọng *ghi nhận*, không phải giọng *phạt*:
  > ✅ "Chuỗi trước của bạn: 12 ngày. Bắt đầu chuỗi mới thôi."
  > ❌ "Bạn đã làm mất chuỗi 12 ngày!"
- Streak phải **tắt được**. Có người học tốt hơn khi không bị đếm.

### 4.5 Đừng giết động lực nội tại

Thưởng ngoại tại (điểm ảo, huy hiệu, xu) dán lên một hoạt động vốn đã có động lực nội tại có
thể **làm giảm** động lực đó. Người học JLPT đã có động lực thật rồi: họ cần cái bằng, cần công
việc, cần đọc được manga. Đừng thay động lực đó bằng xu ảo.

→ **Áp dụng:** không hệ thống điểm ảo, không huy hiệu trang trí, không "level up" giả.
Phần thưởng duy nhất nên có là **bằng chứng về năng lực thật**:
> "Câu này 2 tuần trước bạn sai. Hôm nay bạn làm đúng."

Đây là loại phản hồi vừa thật, vừa thoả mãn, vừa không ai làm giả được.

### 4.6 Ba nhu cầu tâm lý (Self-Determination Theory)

| Nhu cầu | Nghĩa là gì ở đây | Làm sao đáp ứng |
|---|---|---|
| **Tự chủ** | Tôi được chọn | Chọn cỡ phiên, tắt đồng hồ, tắt streak, chọn phần yếu để luyện |
| **Năng lực** | Tôi đang khá lên | Biểu đồ theo thời gian, "lỗi đã sửa được", so với chính mình tuần trước |
| **Kết nối** | Tôi không đơn độc | Khó với app offline không tài khoản — **đừng cố nhét bảng xếp hạng**. Thay bằng ngôn ngữ đồng hành và việc chuẩn hoá cái khó ("phần 聴解 hầu như ai cũng thấy khó nhất") |

### 4.7 Quy tắc đỉnh–kết (peak-end rule)

Con người đánh giá một trải nghiệm chủ yếu dựa vào **đỉnh cảm xúc** và **đoạn kết**, chứ không
phải trung bình toàn bộ. Một phiên học kết thúc bằng "bạn sai 12 câu" sẽ được nhớ là một trải
nghiệm tệ, dù ở giữa có học được nhiều.

→ **Áp dụng — đây là một trong những chi tiết đáng giá nhất tài liệu này:**
> **Kết thúc mọi phiên mổ xẻ bằng một mini-quiz ngắn (3–5 câu) gồm chính những câu vừa được
> mổ xẻ.** Người học gần như chắc chắn làm đúng, vì họ vừa học xong 2 phút trước.
> Phiên kết thúc bằng cảm giác "tôi làm được", và điều đó có thật — họ vừa làm được thật.

Đây không phải mẹo tâm lý rẻ tiền: nó vừa tạo kết thúc tích cực, vừa là một lần truy hồi thêm
đúng theo hiệu ứng kiểm tra. Một mũi tên trúng hai đích.

---

## 5. Ba giai đoạn: TRƯỚC / TRONG / SAU

### 5.1 TRƯỚC khi làm bài — "phòng chờ"

Mục tiêu: hạ chi phí khởi động, đặt kỳ vọng đúng, lấy cam kết nhỏ.

**Phải có:**

1. **Chọn cỡ phiên** — ba lựa chọn ở mục 4.2, mặc định con trỏ đặt ở cỡ *nhỏ nhất*.
2. **Nói thật thời lượng và cấu trúc.** "3 khối: 30 phút → 70 phút → 40 phút, có nghỉ giữa các
   khối." Không giấu, không "chỉ mất vài phút".
3. **Chuẩn hoá cú sốc điểm số — câu quan trọng nhất của cả màn hình:**
   > "Lần đầu làm đề, hầu hết mọi người thấp hơn mình tưởng. Đó là chuyện bình thường và đó
   > chính là dữ liệu bạn cần. Mục tiêu hôm nay không phải điểm cao — mà là tìm ra bạn đang
   > hổng chỗ nào."

   Câu này tồn tại để chống **điểm rơi 4**. Nếu người học bước vào với kỳ vọng "phải điểm cao",
   điểm thấp sẽ là thất bại và họ bỏ đi. Nếu bước vào với kỳ vọng "để tìm lỗ hổng", chính điểm
   thấp lại là thành công.
4. **Dự đoán điểm** (tuỳ chọn, một chạm): "Bạn nghĩ mình đúng khoảng bao nhiêu %?" — dùng để
   đối chiếu sau, rèn khả năng tự đánh giá. Người học kém thường tự đánh giá sai lệch nhất, và
   chính việc thấy khoảng lệch đó là bài học.
5. **Checklist chuẩn bị** cho chế độ full: tai nghe, giấy nháp, chỗ yên tĩnh, đủ pin.
6. **Một nút bắt đầu duy nhất.** Không có nút thứ hai cạnh tranh.

**Không được có:** quảng cáo tính năng khác, thông báo streak, gợi ý "bạn cũng có thể...".
Người dùng đã quyết định làm bài — mọi thứ khác là ma sát.

### 5.2 TRONG khi làm bài

Mục tiêu: bảo vệ sự tập trung, mô phỏng đúng áp lực, thu dữ liệu cho phần review.

**Giao diện tối giản.** Trên màn hình chỉ được có: đề bài của 問題, câu hỏi, các lựa chọn,
phiếu trả lời (mục 9.4), đồng hồ, nút đánh dấu. Hết.

**Thu độ chắc chắn ngay tại chỗ** — chi tiết kỹ thuật quan trọng nhất của phần này:

```
[A] ...........................
[B] ...........................  ← đã chọn
[C] ...........................
[D] ...........................

Mức độ chắc chắn:   ( ) Chắc    ( ) Phân vân    ( ) Đoán
```

- Thu **ngay lúc trả lời**, không hỏi lại sau khi nộp. Hỏi sau sẽ bị bóp méo bởi việc đã biết
  kết quả — người ta không nhớ nổi lúc đó mình có chắc hay không.
- Phải **rẻ về mặt thao tác**: một chạm, có phím tắt, và **bỏ qua được**. Nếu bắt buộc, người
  dùng sẽ bấm bừa và dữ liệu thành rác.
- Mặc định khi bỏ qua: `unsure` (phân vân) — giả định trung tính.
- Ở chế độ "nhấm nháp" 5 phút thì nên tắt mặc định, tránh làm nặng trải nghiệm nhẹ.

**Đồng hồ:**
- Đếm ngược theo khối, không phải toàn bài.
- Cảnh báo **một lần** ở mốc 10 phút và 5 phút, dạng chữ, không nhấp nháy.
- **Tắt được** ("chế độ luyện không giờ") — người mới cần điều này.
- Hết giờ khối thì tự chuyển khối, **không** tự nộp cả bài.

**Nghỉ giữa các khối:** màn hình nghỉ có đếm ngược tuỳ chọn (đề thật có nghỉ thật). Cho phép bỏ
qua. Đây cũng là điểm thoát an toàn: "Tạm dừng ở đây, mai làm tiếp" — tốt hơn nhiều so với để
họ đóng tab và mất bài.

**Tuyệt đối không trong lúc thi:** không hiện đúng/sai, không hiện điểm đang có, không hoạt ảnh
chúc mừng, không thông báo, không streak.

**Chống bỏ ngang:** bài đang làm được lưu liên tục (cơ chế này đã có trong `ExamSession`). Khi
người dùng bấm thoát, hỏi rõ ràng: "Tạm dừng (giữ bài)" / "Nộp luôn" / "Huỷ bài". Mặc định là
tạm dừng.

### 5.3 SAU khi nộp — phần quan trọng nhất

Đây là nơi thắng thua của cả tính năng. Thứ tự trình bày quyết định người dùng ở lại hay bỏ đi.

**Thứ tự bắt buộc của màn hình kết quả:**

```
1. GHI NHẬN NỖ LỰC (không phải điểm)
   "Bạn vừa hoàn thành 140 phút. Đó là một buổi làm việc nghiêm túc."

2. SO VỚI CHÍNH MÌNH (nếu có lần trước)
   "Lần trước: 41% → Lần này: 52%"        ← bằng chứng năng lực, mục 4.5

3. KẾT QUẢ THEO TỪNG PHẦN CHẤM ĐIỂM
   言語知識  ████████░░░░  22/35
   読解      █████░░░░░░░  11/20      ⚠ phần yếu nhất
   聴解      ███████░░░░░  14/20
   (kèm ghi chú trung thực về việc đây không phải điểm JLPT thật — mục 2.3)

4. BẢN ĐỒ CHẨN ĐOÁN CẢ BÀI  (phiếu trả lời tô màu, mục 8.8)
   Xanh = đúng · Đỏ = đáp án bạn chọn nhưng sai · Xanh viền = đáp án đúng bạn đã bỏ lỡ
   Nhóm theo 問題, nhìn một cái thấy ngay cụm yếu — và thấy cả thói quen
   "bí thì chọn phương án 4" nếu có.

5. ĐỐI CHIẾU DỰ ĐOÁN (nếu có)
   "Bạn đoán 65%, thực tế 52%. Bạn đang tự đánh giá cao hơn thực tế ở phần 読解."

6. TÁI ĐỊNH KHUNG — câu chốt, phải là dòng nổi bật nhất trang:
   "23 câu sai = 23 cơ hội tìm ra lỗ hổng."

7. MỘT NÚT DUY NHẤT:
   [ Bắt đầu mổ xẻ 23 câu → ]

   (Nút phụ, nhỏ, xám: "Để sau" — và nếu bấm thì phải hẹn giờ nhắc lại, mục 5.3.1)
```

**Không** mở đầu bằng con số to màu đỏ. **Không** dùng từ "trượt". **Không** có cúp, pháo hoa,
hay mặt buồn.

Ý số 6 lấy trực tiếp từ gợi ý mà chủ dự án đưa vào, và nó đúng: chuyển "10 câu sai" từ *bản án*
thành *tài nguyên*. Đây là một trong những câu chữ có giá trị nhất trong toàn bộ tính năng.

#### 5.3.1 Review ngay hay để sau?

Có căng thẳng thật giữa hai điều đúng:
- **Ngay** thì bối cảnh còn nóng, còn nhớ lúc làm mình nghĩ gì.
- **Để sau** thì đỡ mệt hơn (vừa thi 140 phút), và khoảng nghỉ tạo thêm giãn cách có lợi.

→ **Giải pháp:** phụ thuộc cỡ phiên.
- Phiên nhấm nháp / một phần → **review ngay**, mặc định.
- Phiên full 140 phút → đề nghị **nghỉ 10 phút** rồi review, hoặc hẹn giờ nhắc trong ngày.
  Nếu chọn để sau thì **phải** tạo một việc dở dang hiện rõ trên trang chủ (mục 4.3) — nếu
  không, "để sau" sẽ thành "không bao giờ".

---

## 6. Quy trình mổ xẻ lỗi

Đây là phần cốt lõi. Mở rộng từ phương pháp 5 bước mà chủ dự án cung cấp, bổ sung hai thứ:
**đo độ chắc chắn** và **kết thúc tích cực**.

### 6.1 Vì sao "xem đáp án rồi đi tiếp" là vô ích

Xem đáp án đúng tạo cảm giác hiểu ("à ừ, đúng rồi") mà không hề tạo khả năng làm lại được. Đó
là cảm giác thông thạo giả — một trong những cái bẫy được ghi nhận rõ nhất trong nghiên cứu về
học tập. Người học thấy dễ chịu, tưởng mình đã hiểu, và lần sau vẫn sai đúng câu đó.

### 6.2 Bảy bước

```
┌─ BƯỚC 0 ── Nghỉ ngắn (chỉ với phiên full)
│
├─ BƯỚC 1 ── ĐOÁN LẠI KHI CHƯA XEM ĐÁP ÁN
│   Hiện lại câu sai. Đáp án cũ của bạn được hiện, đánh dấu là sai.
│   Đáp án đúng VẪN BỊ GIẤU.
│   "Giờ bạn chọn lại đáp án nào?"
│   → Thêm một lần truy hồi; và phân biệt được "không biết" với "lúc đó lỡ tay".
│
├─ BƯỚC 2 ── PHÂN LOẠI NGUYÊN NHÂN
│   "Cái gì đã khiến bạn chọn đáp án kia?"  ← câu hỏi lấy từ gợi ý của chủ dự án
│   Chọn 1 nhãn (xem 6.3). Một chạm.
│
├─ BƯỚC 3 ── XEM ĐÁP ÁN + LỜI GIẢI CỦA CẢ BỐN PHƯƠNG ÁN
│   Không chỉ "đáp án đúng là B vì...". Mỗi phương án nhiễu đều được giải thích
│   vì sao nó GẦN ĐÚNG mà vẫn sai, kèm thẻ từ vựng của chính nó (mục 8.7).
│   Kèm câu hỏi chốt:
│   "Kiến thức hoặc kỹ năng nào lẽ ra đã giúp bạn làm đúng câu này?"
│
├─ BƯỚC 4 ── TỰ VIẾT LẠI (không bắt buộc nhưng được khuyến khích mạnh)
│   Ô 1: Quy tắc, bằng lời của chính bạn (giới hạn ngắn, ~140 ký tự)
│   Ô 2: Một câu ví dụ do bạn tự đặt
│   → Đây là bước có hiệu quả ghi nhớ cao nhất trong cả quy trình.
│
├─ BƯỚC 5 ── VÀO SỔ TAY LỖI (tự động, không cần thao tác)
│
├─ BƯỚC 6 ── LÊN LỊCH ÔN (tự động, qua SRS đã có)
│
└─ BƯỚC 7 ── MINI-QUIZ KẾT THÚC  ★
    3–5 câu vừa mổ xẻ, hỏi lại ngay.
    Gần như chắc chắn đúng → phiên kết thúc bằng cảm giác thắng (mục 4.7).
```

**Về bước 4:** phải cực kỳ nhẹ nhàng, không bắt buộc, và **giới hạn độ dài**. Gợi ý gốc nói rõ
"Đừng viết giải thích dài dòng" — hoàn toàn đúng. Ô nhập ngắn khiến người ta viết; ô nhập to
khiến người ta bỏ qua.

### 6.3 Phân loại lỗi hai trục

Đây là chỗ tài liệu này đi xa hơn phương pháp gốc. Một trục là không đủ.

**Trục A — nguyên nhân (người học tự chọn, một chạm):**

| Mã | Nhãn hiển thị | Nghĩa |
|---|---|---|
| `goi` | Không biết từ | Thiếu từ vựng |
| `bunpou` | Không nắm ngữ pháp | Chưa biết, hoặc lẫn hai mẫu gần nghĩa |
| `kanji` | Sai chữ Hán | Đọc sai âm, nhầm chữ giống nhau |
| `dokkai` | Hiểu sai đoạn văn | Đọc lướt, bỏ sót từ nối, hiểu ngược ý |
| `choukai` | Nghe sót / nghe nhầm | Không kịp, nhầm âm gần giống |
| `wana` | Dính bẫy đề | Đáp án "trông có vẻ đúng", nhiễu do từ lặp lại trong đề |
| `bat_can` | Bất cẩn | Biết mà chọn nhầm, đọc sót chữ 「ない」 |
| `het_gio` | Không kịp giờ | Chưa kịp đọc đã phải đoán |

**Trục B — độ chắc chắn lúc trả lời (thu tự động từ lúc làm bài, mục 5.2).**

**Ma trận hành động — đây là thứ khiến việc phân loại có ý nghĩa:**

| | Sai | Đúng |
|---|---|---|
| **Chắc chắn** | 🔴 **Hiểu sai tận gốc.** Giá trị học cao nhất (hiệu ứng siêu sửa lỗi). Ưu tiên #1, ôn lại sớm nhất, bắt buộc qua đủ 7 bước. | ✅ **Đã vững.** Khoảng ôn tăng bình thường. |
| **Phân vân** | 🟠 **Hổng chỗ phân biệt.** Thường là hai mẫu ngữ pháp gần nghĩa. Ưu tiên #2 — và nên học *theo cặp*, không học lẻ. | 🟡 **Chưa chắc.** Tăng khoảng ôn **dè dặt** (ví dụ 60% mức bình thường). |
| **Đoán** | ⚪ **Chưa học bao giờ.** Đây không phải "lỗi cần sửa" mà là "kiến thức cần học". Đưa vào hàng học mới, đừng bắt mổ xẻ. | ⛔ **DƯƠNG TÍNH GIẢ — nguy hiểm nhất.** Hệ thống tưởng bạn biết. **Bắt buộc ôn lại sớm**, coi gần như câu sai. |

Ô góc dưới bên phải là lý do toàn bộ việc thu độ chắc chắn tồn tại. Không có nó, app sẽ âm thầm
đánh dấu "đã thuộc" cho những thứ người học chưa từng biết.

Ô góc dưới bên trái cũng quan trọng theo hướng ngược lại: bắt người học "mổ xẻ" một mẫu ngữ pháp
họ chưa từng gặp là vô nghĩa và gây nản. Cái đó cần **dạy**, không cần **sửa**.

### 6.4 Nối vào SRS đã có

Gợi ý gốc đề xuất lịch 1–3–7–14 ngày. Ý tưởng đúng, nhưng **không nên dựng thành hệ thứ hai** —
`src/lib/srs.ts` đã làm đúng việc đó và thích ứng theo từng người.

→ **Cách làm:** lỗi từ đề thi đi vào chung SRS, chỉ **điều chỉnh trạng thái khởi đầu** theo ô
trong ma trận:

| Ô ma trận | Trạng thái khởi đầu đề xuất |
|---|---|
| Sai + chắc chắn | `ease` giảm mạnh hơn thường lệ; ôn lại trong ngày, rồi 1 ngày |
| Sai + phân vân | Như thẻ sai bình thường hiện tại |
| Sai + đoán | Vào hàng **thẻ mới**, không tính là "lapse" |
| Đúng + đoán | Ép `interval` về 1 ngày dù trả lời đúng |
| Đúng + phân vân | `interval` × 0.6 |
| Đúng + chắc chắn | Bình thường |

Như vậy vẫn ra được nhịp gần giống 1–3–7–14 cho lỗi nặng, nhưng thích ứng theo từng người và
chỉ có **một** hệ thống để bảo trì.

---

## 7. Đặc thù từng phần thi

### 7.1 文字・語彙 (chữ & từ vựng)

- Dạng câu ngắn, độc lập → dễ nhất để làm cỡ phiên "nhấm nháp" 5 phút.
- Nối thẳng được với dữ liệu đã có trong repo (Mimi N3, Kanji Master N3) — một câu 漢字読み sai
  nên kéo theo chính thẻ từ vựng đó trong SRS.
- **Đây là phần nên làm đầu tiên** khi triển khai: rẻ, dữ liệu đã có, khép kín.

### 7.2 文法 (ngữ pháp)

- 問題2 文の組み立て (sắp xếp câu, chọn ô ★) là **dạng câu hoàn toàn khác**: người học sắp xếp
  4 mảnh rồi trả lời mảnh nào vào ô sao. Không phải trắc nghiệm 4 lựa chọn thông thường →
  cần component riêng.
- Lỗi ngữ pháp hầu như luôn là **lẫn cặp** (ことにする vs ようにする, như đúng ví dụ trong gợi ý
  gốc). → Dữ liệu nên có trường `confusableWith` để khi sai thì hiện thẳng cặp đối chiếu, và
  ôn tập theo cặp.

### 7.3 読解 (đọc hiểu)

- **Nhiều câu chung một đoạn văn** → mô hình dữ liệu bắt buộc phải có thực thể `Passage`.
- Bố cục màn hình: đoạn văn và câu hỏi phải **nhìn thấy cùng lúc** (chia đôi trên desktop; trên
  mobile thì dùng tab hoặc panel trượt). Bắt cuộn lên cuộn xuống là tra tấn.
- Lúc review, phải **đánh dấu được đúng chỗ trong đoạn văn chứa câu trả lời**. Đây là điều
  khác biệt lớn nhất giữa một app luyện đọc hiểu tử tế và một app chỉ hiện "đáp án là B".
- Nguyên nhân lỗi đọc hiểu thường không phải "không biết từ" mà là **bỏ sót từ nối/phủ định**
  (しかし, ただし, なければならない). Lời giải nên chỉ ra chính xác chữ bị bỏ sót.

### 7.4 聴解 (nghe hiểu) — phần khó nhất về mặt kỹ thuật

Cần quyết định trước khi code (xem mục 16):

- **Nguồn audio.** TTS (`src/lib/tts.ts`) đọc được tiếng Nhật nhưng 聴解 thật là **hội thoại
  nhiều giọng, có ngữ điệu, tốc độ tự nhiên**. TTS một giọng đều đều sẽ khiến bài nghe *dễ hơn
  thực tế* — nguy hiểm, vì tạo tự tin giả.
- **Xung đột với PWA offline.** File audio sẽ làm phình precache. App hiện precache ~2,1 MB;
  20 file nghe có thể thêm 20–40 MB. → Phải dùng chiến lược riêng: **tải theo yêu cầu từng đề**,
  người dùng chủ động bấm "tải đề này về máy", giống cách 440 ảnh đề JFE301 đang được xử lý.
- **Phát một lần, không tua** ở chế độ thi thật. Ở chế độ luyện thì cho nghe lại, cho chỉnh tốc
  độ, và **cho xem transcript sau khi trả lời** (không phải trước).
- Lúc review, transcript là công cụ chẩn đoán quan trọng nhất: cho phép người học thấy chính xác
  chỗ mình nghe sót. Lý tưởng là đánh dấu đoạn transcript chứa đáp án.
- 問題5 即時応答 (đối đáp tức thì) rất ngắn, phù hợp làm phiên "nhấm nháp" cho phần nghe.

---

## 8. Tham chiếu thực địa: Bunpro JLPT Practice Tests

### 8.1 Vì sao mục này tồn tại

[Bunpro](https://bunpro.jp/jlpt_practice_tests) ra mắt tính năng JLPT Practice Tests tháng
09/2025: **miễn phí hoàn toàn, không cần tài khoản, chạy được offline**. Đây là sản phẩm gần
nhất với thứ tài liệu này định xây, do một đội đã làm công cụ học tiếng Nhật nhiều năm.

**Về độ tin cậy của mục này:** `bunpro.jp` bị proxy mạng của môi trường build chặn, nên tôi
không tự truy cập được. Toàn bộ mô tả dưới đây dựa trên **năm ảnh chụp màn hình do chủ dự án
cung cấp ngày 2026-09-04**:

1. Trang danh sách đề (`/jlpt_practice_tests`)
2. Hộp thoại Details của `N3【模擬試験】1`
3. Màn đang làm bài (`/n3/11/vocab/31`)
4. **Màn review sau khi nộp** (`/n5/1/vocab/1`)
5. **Trang chi tiết từ vựng** (`/vocabs/雨`)
6. **Hộp thoại Details khi một khối đã làm xong** — điểm còn ẩn sau nút 👁
7. **Cùng hộp thoại đó sau khi bấm hiện điểm**

Vẫn **chưa quan sát được**: phần 読解 và 聴解 khi làm bài, và nơi Bunpro lưu tiến độ (họ không
cần tài khoản, nhiều khả năng cũng là lưu trữ phía trình duyệt như ta).

### 8.2 Cách tổ chức đề

Trang danh sách là lưới thẻ, nhóm theo cấp, mỗi cấp 5 đề đặt tên `N3【模擬試験】1..5`.
Mỗi thẻ hiển thị: thời lượng (`140m`), nhãn `Standard`, nhãn cấp (`N3`), và một bảng điểm 2×2
ngay trên thẻ — khi chưa làm thì hiện dấu `—`:

```
┌ N3【模擬試験】1 ────────── 140m · Standard · N3 ┐
│  Vocab              Grammar & Reading         │
│  — / 36             — / 39                    │
│  Listening          Total                     │
│  — / 28             — / 103                   │
│            [    Details    ]                  │
└───────────────────────────────────────────────┘
```

Số câu quan sát được — **điểm tham chiếu đầu tiên mà tài liệu này có về phân bố câu hỏi**:

| Cấp | 文字・語彙 | 文法・読解 | 聴解 | Tổng | Thời lượng |
|---|---|---|---|---|---|
| N4 | 38 | 35 | 26 | 99 | 115m |
| **N3** | **36** | **39** | **28** | **103** | **140m** |

> ⚠️ Đây là **số của Bunpro**, không phải của JEES. Đề thật xê dịch theo từng kỳ. Nhưng thời
> lượng khớp *chính xác* với dữ kiện đã đối chiếu độc lập ở mục 2.1 (N3 140 phút, N4 115 phút),
> nên phân bố câu hỏi này đáng tin ở mức "tham khảo tốt". Vẫn giữ nguyên nguyên tắc ở mục 10:
> **số câu do dữ liệu quyết định, không hardcode.**

### 8.3 Bunpro cũng KHÔNG giả điểm JLPT — xác nhận độc lập cho mục 2.3

Bảng điểm hiện `— / 103`, tức **số câu đúng thô**, chứ không phải thang `/180` của kỳ thi thật.
Ba phần điểm cũng đặt tên theo phần chấm điểm thật (Vocab / Grammar & Reading / Listening).

Một sản phẩm thương mại lâu năm cũng từ chối quy đổi ra thang 180 — điều này củng cố mạnh cho
quyết định ở **mục 2.3**. Nếu Bunpro với nguồn lực của họ còn không dám giả điểm IRT, ta lại
càng không nên.

### 8.4 Mỗi khối một nút Start riêng — cách họ giải bài toán chi phí khởi động

Bấm `Details` mở ra hộp thoại. Đây là chi tiết quan trọng thứ hai:

```
┌ N3【模擬試験】1 ───────────────────────────────┐
│  Score  —                    頑張ってください！ │
│                                                │
│  げんごちしき（もじ・ごい）        [  Start  ]  │
│  Vocab                                         │
│  Alloted Time 00:30:00   Total Questions 36    │
│                                                │
│  言語知識（文法）・読解            [  Start  ]  │
│  Grammar & Reading                             │
│  Alloted Time 01:10:00   Total Questions 39    │
│                                                │
│  聴解                              [  Start  ]  │
│  Listening                                     │
│  Alloted Time 00:40:00   Total Questions 28    │
│                                                │
│            [  ← Return  ]                      │
└────────────────────────────────────────────────┘
```

**Người học không bị buộc làm cả 140 phút một lượt.** Mỗi khối có nút `Start` độc lập.

→ **Điều này tốt hơn đề xuất ban đầu ở mục 4.2.** Thay vì bịa ra ba "cỡ phiên" nhân tạo, họ
dùng chính **khối thi thật** làm đơn vị chia nhỏ: vừa hạ chi phí khởi động, vừa trung thành
với cấu trúc kỳ thi, vừa không phải giải thích gì thêm cho người dùng.

→ **Nhưng khối nhỏ nhất vẫn là 30 phút.** Với người lười ở điểm rơi 1, 30 phút vẫn là một
quyết định lớn. Chỗ trống còn lại chính là cỡ **"nhấm nháp" theo 問題** (問題1 漢字読み chỉ
~8–9 câu ≈ 5 phút) — thứ Bunpro không có. Mục 4.2 nay được sửa lại theo hướng đó.

Chi tiết nhỏ đáng lấy: dòng `Score` để trống kèm 「頑張ってください！」 — một lời động viên
nhẹ ngay trước khi bắt đầu, đúng tinh thần mục 5.1 mà không sa vào sáo rỗng.

### 8.5 ★ Phiếu trả lời kiểu マークシート — chi tiết đáng học nhất

Màn làm bài chia hai. Bên phải là một panel cố định mô phỏng **phiếu tô đáp án của kỳ thi thật**:

```
┌ げんごちしき（もじ・ごい）  🕐 00:29:57 ┐
│                                        │
│  問題1                                  │
│   01  [1] [2] [3] [4]   ← câu hiện tại │
│   02  [1] [2] [3] [4]                  │
│   ...                                  │
│   09  [1] [2] [3] [4]                  │
│                                        │
│  問題2                                  │
│   10  [1] [2] [3] [4]                  │
│   ...                                  │
│                                        │
│  問題3                                  │
│   16  [1] [2] [3] [4]                  │
│   ...                        (cuộn được)│
└────────────────────────────────────────┘
```

Panel này làm **ba việc cùng lúc**:

1. **Điều hướng** — bấm số câu để nhảy tới.
2. **Trả lời trực tiếp** — bấm ô 1/2/3/4 ngay trên phiếu, không cần vào từng câu.
3. **Tổng quan tiến độ** — nhìn một cái là thấy còn bao nhiêu câu trắng.

Và nó **nhóm theo 問題** — đúng đơn vị chẩn đoán mà mục 6 và mục 7 nhấn mạnh. Người học thấy
ngay "mình bỏ trắng gần hết 問題4" chứ không phải "mình bỏ trắng 6 câu".

**So với `ExamSession` hiện có trong repo:** bảng câu hỏi của ta chỉ là lưới ô số để nhảy câu,
tô màu theo trạng thái đã làm / đánh dấu / chưa làm. Nó **không hiện đáp án đã chọn** và
**không cho trả lời tại chỗ**. Phiếu của Bunpro tốt hơn hẳn.

→ **Quyết định: thay bảng câu hỏi bằng phiếu trả lời kiểu này.** Đặc tả ở mục 9.4.

### 8.6 Giao diện làm bài — xác nhận nguyên tắc tối giản

Bên trái màn hình chỉ có đúng ba thứ:

- **Khung đề bài của 問題 tách riêng ở trên cùng**, luôn nhìn thấy:
  `問題1　＿＿のことばの読み方として最もよいものを、1・2・3・4から一つ えらびなさい。`
  → Người học không phải nhớ yêu cầu của nhóm câu. Đây là giảm tải nhận thức đúng chỗ (mục 3.7).
- **Câu hỏi**: `01　お父さんが車に乗っています。` với chữ cần đọc (`乗`) **gạch chân đỏ**.
- **Bốn đáp án dạng lưới 2×2**, đánh số `1 2 3 4` — không phải `A B C D`. Đây là quy ước của
  đề Nhật và nên theo, vì phiếu trả lời cũng đánh số.

Những thứ đáng chú ý khác:

- **Có furigana trên chữ Hán khó** (`もんだい` trên 問題, `げんごちしき` trên 言語知識). Với N4/N5
  đây là hỗ trợ cần thiết; với N3 trở lên thì nên tắt được.
- **Đồng hồ nằm trong panel phụ**, không chiếm vị trí trung tâm, không nhấp nháy → khớp chính
  xác với mục 3.8 (đừng biến đồng hồ thành nguồn lo âu).
- **Chỉ có hai nút điều hướng ← →** ở dưới cùng. Không có gì khác.
- **Nền tối.** Với bài thi dài 140 phút, đây là lựa chọn hợp lý; nên cân nhắc chế độ tối cho
  riêng màn làm bài kể cả khi phần còn lại của app dùng nền sáng.

### 8.7 ★★ Màn review: giải thích TỪNG phương án nhiễu

**Đây là phát hiện lớn nhất của cả mục 8, và là thứ bản v1 của tài liệu này hoàn toàn bỏ sót.**

Sau khi nộp, mỗi câu được mở ra với **lời giải riêng cho cả bốn lựa chọn**, không chỉ cho đáp
án đúng. Ví dụ thật, câu `01 きのうは雨がふっていました。` (N5, 問題1 漢字読み):

```
① あめ   ✅ Correct Answer.
         ┌────────────────────────────┐
         │ 雨 あめ                  ↗ │   ← thẻ từ vựng nhúng, bấm mở trang chi tiết
         │ rain                       │
         └────────────────────────────┘

② ゆき   Given the context of ふっていました (was falling) ゆき (雪), meaning 'snow',
         would work however ゆき isn't the proper reading for 雨.
         ┌────────────────────────────┐
         │ 雪 ゆき · snow           ↗ │
         └────────────────────────────┘

③ はれ   Given the context of ふっていました (was falling), はれ (晴れ), meaning
         'clear weather' or 'sunny', wouldn't fit.
         ┌────────────────────────────┐
         │ 晴れ はれ · clear weather ↗│
         └────────────────────────────┘

④ かぜ   ❌ (viền đỏ — đáp án người học đã chọn)
         Given the context of ふっていました (was falling), かぜ (風), meaning
         'wind', wouldn't fit.
         ┌────────────────────────────┐
         │ 風 かぜ · wind, breeze    ↗│
         └────────────────────────────┘
```

Ba điều đáng chú ý:

**1. Mỗi phương án nhiễu là một từ có thật, và được dạy luôn.** Một câu 4 lựa chọn biến thành
**4 mục từ vựng** thay vì 1. Người học sai câu này không chỉ học được 雨, mà học luôn 雪・晴れ・風.
Hiệu suất trên mỗi câu hỏi tăng gấp bốn.

**2. Lời giải nói rõ vì sao nhiễu đó *gần đúng*, không chỉ nói nó sai.** Câu ② thừa nhận
「would work however ゆき isn't the proper reading for 雨」 — tức là chỉ ra chính xác chỗ bẫy:
về mặt ngữ cảnh thì hợp, chỉ sai ở cách đọc. Đây đúng là kiểu giải thích chữa được lỗi
"phân vân giữa hai đáp án" ở ô 🟠 của ma trận mục 6.3.

**3. Đáp án người học chọn được viền đỏ và tô chữ đỏ**, đáp án đúng ghi `Correct Answer.` màu
xanh. Không có dấu chấm than, không có "Sai rồi!" — khớp với nguyên tắc ngôn ngữ ở mục 12.

→ **Hệ quả bắt buộc cho mô hình dữ liệu (mục 10):** trường `explanation` một chuỗi duy nhất là
**không đủ**. Phải là **lời giải theo từng lựa chọn**. Đây là thay đổi phải làm ngay từ giai
đoạn 0, vì soạn lại 4 lời giải cho hàng nghìn câu sau này là không khả thi.

→ **Hệ quả cho quy trình mổ xẻ (mục 6.2):** bước 3 không chỉ hiện "đáp án đúng là B vì...", mà
hiện cả bốn. Kết hợp với bước 1 (đoán lại khi chưa xem đáp án) và bước 2 (tự phân loại nguyên
nhân) thì ta có thứ mạnh hơn Bunpro: họ có **nội dung giải thích tốt hơn**, ta có **quy trình
chủ động hơn**. Hai thứ này cộng được với nhau chứ không loại trừ nhau.

### 8.8 Phiếu trả lời ở chế độ kết quả — bản đồ chẩn đoán cả khối

Cùng panel phiếu trả lời ở mục 8.5, nhưng sau khi nộp thì mỗi ô được tô màu:

```
        もんだい1                      Quy ước màu:
   01  [1̲] [2] [3] [4̶]                 ┌ xanh viền  = đáp án đúng, bạn KHÔNG chọn
   02  [1] [2̲] [3] [4̶]                 ├ xanh đặc   = đáp án đúng, bạn CHỌN đúng
   03  [1] [2] [3̲] [4̶]                 ├ đỏ đặc     = đáp án bạn chọn, và nó SAI
   04  [1] [2̲] [3] [4̶]                 └ trung tính = không chọn, không đúng
   05  [1] [2] [3] [4̲]  ✔
   06  [1] [2] [3] [4̲]  ✔
   07  [1] [2] [3] [4̲]  ✔
        もんだい2
   08  [1̲] [2] [3] [4̶]
   ...
```

Nhìn một cái là thấy toàn bộ bức tranh của cả khối, không cần lật từng câu:

- **Cụm đỏ theo 問題** — "gần như trượt sạch もんだい3" là chẩn đoán ở đúng cấp độ hữu ích.
- **Cụm đỏ theo *vị trí* đáp án** — trong ảnh, rất nhiều ô đỏ nằm ở cột `4`. Đó là dấu hiệu của
  một thói quen làm bài: *khi bí thì chọn phương án cuối*. Không một bảng "đúng/sai" nào phát
  hiện được điều này, nhưng bản đồ theo vị trí thì có.

→ Điều thứ hai đáng giá hơn nó thoạt trông. Nó nối thẳng vào nhãn nguyên nhân `het_gio` và
`wana` ở mục 6.3, và vào ô "đúng nhờ đoán" ở mục 3.6. **Thêm vào màn kết quả (mục 5.3) như một
phần của bước 3**, đặt ngay dưới các thanh điểm theo phần.

### 8.9 Trang chi tiết từ vựng — cái mà thẻ nhúng trỏ tới

Bấm ↗ trên thẻ nhúng sẽ mở `/vocabs/雨`. Trang này có:

| Khối | Nội dung | Ta có dữ liệu chưa? |
|---|---|---|
| Đầu trang | 雨 cỡ lớn, furigana あめ, nghĩa "rain", nhãn `N5 Noun` | ✅ Có |
| **Bunpro Summary** | *"Water that falls from dark clouds."* — một câu diễn giải dễ hiểu, **tách riêng** khỏi danh sách nghĩa từ điển | ⚠️ Chưa — đáng thêm |
| Nghĩa từ điển | 1. rain 2. rainy day 3. the November suit (hanafuda), kèm "See Also: 花札" | ✅ Có (một phần) |
| All Forms | 雨【あめ】 | ✅ Có |
| **Pitch Accent** | あめ có vạch thanh điệu + nút phát âm | ❌ **Không có dữ liệu** |
| **Frequency** | "Dictionary Top 600" | ❌ Không có |
| **Examples** | Câu ví dụ có audio thật, furigana, từ đích tô đỏ, bản dịch, nhãn cấp độ | ⚠️ Có câu ví dụ, không có audio |
| Examples — điều khiển | Trình phát audio + **hai nút bật/tắt: 👁 Sentence và 👁 Translation** | ❌ Chưa có |

**Chi tiết đáng học nhất ở trang này: hai nút ẩn/hiện câu và bản dịch.** Nó biến một danh sách
ví dụ *thụ động* thành một bài **tự kiểm tra**: ẩn câu đi, nghe audio, thử hiểu; hoặc ẩn bản
dịch, đọc câu, tự dịch. Đúng tinh thần truy hồi chủ động ở mục 3.1, với chi phí xây dựng gần
bằng không. `VocabularyCard` trong repo đã có nút "Xem câu ví dụ (例文)" — chỉ cần mở rộng
thành hai công tắc độc lập.

**Hai thứ ta thiếu dữ liệu:** *pitch accent* và *frequency rank*. Cả hai đều hữu ích (pitch cho
phát âm, frequency để ưu tiên học từ nào trước) và cả hai đều **không tự sinh ra được** —
chúng phải đến từ một bộ dữ liệu bên ngoài. Ghi lại đây như một khoản nợ dữ liệu, không phải
việc làm ngay.

**Lưu ý về mặt sản phẩm:** trang này có ô quảng cáo "Ready to transform your studies? — Try
Bunpro". Nghĩa là với Bunpro, luồng review là **phễu bán hàng**: bài thi miễn phí → thấy mình
yếu → trang tra cứu → mời đăng ký. Ta không có mô hình đó, nên **không nên copy hình thức
"trang tra cứu"** — xem mục 8.10.

### 8.10 Link từ câu sai sang điểm ngữ pháp / từ vựng

**Đã xác nhận bằng ảnh** (mục 8.7 và 8.9): mỗi phương án trong màn review có một thẻ từ vựng
nhúng, bấm ↗ mở sang trang chi tiết của từ đó. Bản nghiên cứu v1 bỏ sót phần giao diện này —
mô hình dữ liệu ở mục 10 có sẵn `grammarPoint`, `vocabIds`, `kanjiChars` nhưng không đặc tả
dùng chúng thế nào.

**Repo này ở vị thế làm mạnh hơn Bunpro một bậc**, vì đã có sẵn:

- 1.066 thẻ từ vựng Mimi Kara Oboeru N3
- 529 thẻ Kanji Master N3
- Một hệ SRS đang chạy (`src/lib/srs.ts`)

Khác biệt then chốt: **Bunpro link sang một trang tra cứu tĩnh** — nơi hành động duy nhất còn
lại là bấm "Try Bunpro" (mục 8.9). Với ta, đích đến không phải trang tra cứu mà là **hàng đợi
ôn của chính người học**. Đặc tả cho bước 3 của quy trình mổ xẻ:

```
┌ BƯỚC 3 — Đáp án & lời giải ────────────────────────────┐
│ Đáp án đúng: 4 のって                                   │
│ 乗る (のる) — đi, lên (xe)                              │
│                                                         │
│ 🔗 Từ này có trong bộ thẻ của bạn:                      │
│    乗る  ·  Mimi N3 Bài 3  ·  Đã thuộc, ôn lại sau 8 ngày│
│    [ Đưa về ôn lại ngay ]                               │
│                                                         │
│ 🔗 Chữ Hán liên quan: 乗 (Kanji Master N3, chưa học)     │
│    [ + Thêm vào hàng học mới ]                          │
└─────────────────────────────────────────────────────────┘
```

Hai điều làm được mà một trang tra cứu tĩnh không làm được:

1. **Hiện trạng thái SRS thật của người học** với chính thẻ đó — "bạn đã thuộc từ này 8 ngày
   trước mà giờ vẫn sai" là một thông tin chẩn đoán rất mạnh, và là bằng chứng năng lực /
   thiếu hụt cụ thể (mục 4.5).
2. **Một nút đưa thẻ về hàng ôn ngay** — biến một câu sai thành hành động, không chỉ thành
   kiến thức đọc qua rồi quên.

### 8.11 Những gì Bunpro KHÔNG có — chỗ trống của chúng ta

> **Đính chính so với bản trước của tài liệu này.** Trước khi có ảnh màn review, tôi phỏng đoán
> rằng phần review của Bunpro chỉ là "hiện đáp án + lời giải". Điều đó **sai một nửa**: nội dung
> giải thích của họ **giàu hơn tôi tưởng nhiều** (giải thích cả bốn phương án, kèm thẻ từ vựng
> cho từng phương án — mục 8.7). Cái họ thiếu không phải nội dung, mà là **quy trình**.

| Bunpro thiếu | Ta làm gì | Mục |
|---|---|---|
| Không thu độ chắc chắn lúc trả lời | Ma trận hai trục nguyên nhân × độ chắc chắn | 6.3 |
| Không bắt đoán lại trước khi xem đáp án — mở ra là thấy ngay đáp án đúng | Bước 1 của quy trình mổ xẻ | 6.2 |
| Không cho tự phân loại nguyên nhân lỗi | Bước 2 | 6.2 |
| Không có chỗ để người học tự viết lại quy tắc / tự đặt ví dụ | Bước 4 | 6.2 |
| Câu sai không được lên lịch ôn lại — xem xong là hết | Nối thẳng vào SRS | 6.4, 8.10 |
| Không có mini-quiz kết thúc phiên | Bước 7 | 4.7 |
| Không thấy nút đánh dấu / cờ trên màn làm bài | Có cờ đánh dấu, phím tắt `F` | 5.2 |
| Không có cỡ phiên nhỏ hơn một khối (30 phút) | Cỡ "nhấm nháp" theo 問題, ~5 phút | 4.2 |
| Không thấy dự đoán điểm trước khi làm | Có, để rèn tự đánh giá | 5.1 |

Điểm khác biệt cốt lõi, nói cho gọn:

> **Bunpro giải thích rất tốt một câu hỏi. Nhưng họ dừng ở đó.**
> Xem xong lời giải là hết — không ai hỏi bạn *vì sao* bạn chọn sai, và câu đó không bao giờ
> quay lại tìm bạn nữa.

Đó chính xác là cái bẫy "cảm giác thông thạo giả" ở mục 6.1: đọc lời giải hay thì thấy rất
hiểu, nhưng hiểu ≠ làm lại được sau hai tuần. Chỗ ta chen vào không phải viết lời giải hay hơn
họ — mà là **bắt kiến thức đó quay lại đúng lúc sắp quên**.

### 8.13 ★ Điểm bị ẩn mặc định, và đồng hồ đo nhịp làm bài

Khi một khối đã làm xong, hộp thoại Details của khối đó đổi hẳn hình dạng:

```
┌ げんごちしき（もじ・ごい）      [ Retake ]  [ Open ] ┐
│  Alloted Time    Your Time        Score            │
│  00:20:00        00:00:24 🟩      Show Score  👁    │   ← điểm CÒN ẨN
└────────────────────────────────────────────────────┘
                         ↓ bấm 👁
┌ げんごちしき（もじ・ごい）      [ Retake ]  [ Open ] ┐
│  Alloted Time    Your Time        Score            │
│  00:20:00        00:00:24 🟩      4 / 21    19.0%  │
└────────────────────────────────────────────────────┘
```

Ba chi tiết, cái đầu tiên là quan trọng nhất.

**1. Điểm số bị ẩn sau một nút 👁 "Show Score".**

Bunpro **không hiện điểm cho tới khi người học chủ động bấm xem**. Trên thẻ đề ở trang danh
sách cũng vậy: ô Vocab ghi `Show Score 👁` chứ không ghi con số.

Đây là bản triển khai **triệt để hơn** thứ mục 5.3 đề xuất. Tài liệu này lập luận "đừng mở đầu
bằng con số to màu đỏ"; Bunpro đi xa hơn — **không hiện con số cho tới khi bạn cho phép**.

Vì sao nó đúng, xét theo điểm rơi 4 (mục 4.1):
- Người học **giành lại quyền kiểm soát** thời điểm đối mặt với con số. Tự chọn nhìn khác hẳn
  với bị dí vào mặt.
- Nó **hạ điểm số xuống hàng thứ yếu**. Thứ nổi bật trên hộp thoại là nút `Open` (đi xem lại
  bài), không phải điểm.
- Với người vừa làm xong và đang mệt, đây là một lối thoát êm: xem lại bài trước, xem điểm sau
  — hoặc không xem cũng được.

→ **Nhận vào thiết kế**: điểm ẩn mặc định, một chạm để hiện, và **ghi nhớ lựa chọn đó** cho các
lần sau (ai muốn thấy ngay thì bật một lần là xong).

**2. `Your Time` đặt cạnh `Alloted Time`, tô xanh khi làm dưới thời gian cho phép.**

Đây là chỉ số **nhịp làm bài** mà bản trước của tài liệu này bỏ sót hoàn toàn. Mục 6.3 có nhãn
lỗi `het_gio` nhưng chưa bao giờ nói phải *đo* thời gian theo khối.

Với JLPT, nhịp làm bài là một kỹ năng riêng và là kiểu trượt kinh điển: hết giờ 読解 khi còn 6
câu chưa đọc. Đo và hiện nó ra biến một cảm giác mơ hồ ("hình như mình chậm") thành số liệu.

→ **Nhận vào thiết kế**, và đi xa hơn Bunpro một bước: ngoài thời gian cả khối, lưu luôn
**thời gian từng câu** (`JlptAnswer.timeSpentMs` đã có trong mô hình dữ liệu ở mục 10). Nhờ đó
màn mổ xẻ nói được những câu như:
> "Bạn dùng 4 phút cho câu 27 rồi vẫn sai. Ở đề thật, 4 phút cho một câu 文法 là đánh đổi tồi —
> bỏ qua và quay lại sau sẽ được nhiều điểm hơn."

Đó là lời khuyên về **chiến thuật làm bài**, thứ mà không lời giải ngữ pháp nào cho được.

*(Lưu ý đọc ảnh: `00:00:24` cho 21 câu hiển nhiên là một lượt bấm thử cho nhanh, không phải
lượt làm thật. Cái đáng học là cơ chế, không phải con số.)*

**3. `Retake` và `Open` — hai hành động tách bạch cho một khối đã xong.**

`Open` = mở lại bài đã làm để xem/mổ xẻ. `Retake` = làm lại từ đầu.

Điều này ngụ ý **một đề được làm nhiều lần và có lịch sử lượt làm** — mô hình `JlptAttempt` ở
mục 10 đã hỗ trợ sẵn, nhưng giao diện phải thể hiện: khi làm lại, so sánh với lần trước
("Lần 1: 4/21 · Lần 2: 15/21") chính là loại bằng chứng năng lực mà mục 4.5 đòi hỏi.

**4. Tiến độ tính theo khối, không theo cả đề.** Thẻ đề hiện nhãn `In Progress` khi mới xong
1/3 khối. Củng cố quyết định ở mục 8.4.

**5. Nút `Audio Check` ở đầu trang.** Một nút kiểm tra âm thanh chạy được *trước* khi vào khối
聴解 tính giờ. Mục 5.1 mới chỉ nhắc "checklist: tai nghe" dưới dạng chữ; Bunpro biến nó thành
một hành động thật. Rẻ và đáng làm — hỏng tai nghe giữa bài thi nghe 40 phút là mất trắng.

### 8.14 Chốt: lấy gì, sửa gì, bỏ gì

Đây là phần "chắt lọc". Không phải cái gì Bunpro làm cũng hợp với ta.

**✅ LẤY NGUYÊN**

| Thứ | Mục |
|---|---|
| Lời giải cho **cả bốn** phương án, mỗi nhiễu kèm thẻ từ vựng của chính nó | 8.7 |
| Phiếu trả lời kiểu マークシート, nhóm theo 問題, trả lời được tại chỗ | 8.5, 9.4 |
| Phiếu trả lời tô màu ở chế độ kết quả (bản đồ chẩn đoán) | 8.8 |
| Mỗi khối thi một nút Start riêng | 8.4 |
| **Điểm ẩn mặc định sau nút 👁** | 8.13 |
| `Your Time` cạnh `Alloted Time` | 8.13 |
| `Retake` / `Open` tách bạch, có lịch sử lượt làm | 8.13 |
| Nút kiểm tra âm thanh trước khi vào 聴解 | 8.13 |
| Hiện số câu đúng thô, **không** quy đổi thang 180 | 8.3, 2.3 |
| Đề bài 問題 dính trên cùng khi cuộn | 8.6 |
| Đáp án đánh số 1/2/3/4 | 8.6, 9.4 |
| Ẩn/hiện câu và bản dịch ở phần ví dụ | 8.9 |

**🔧 LẤY NHƯNG SỬA**

| Thứ | Sửa thành | Vì sao |
|---|---|---|
| Khối nhỏ nhất = 30 phút | Thêm cỡ "nhấm nháp" theo 問題 (~5 phút) | 30 phút vẫn là quyết định lớn với người lười (4.2) |
| Câu sai → link sang trang tra cứu | Câu sai → **đẩy thẳng thẻ vào hàng ôn SRS** | Ta có SRS, họ có phễu bán hàng (8.10) |
| Review = đọc lời giải rồi hết | Thêm quy trình 7 bước bao quanh chính lời giải đó | Đọc lời giải hay ≠ làm lại được sau 2 tuần (6.1) |
| Furigana cố định theo cấp | Cho tắt/bật | Người học N3 đọc được 問題, không cần furigana |

**❌ KHÔNG LẤY**

| Thứ | Vì sao |
|---|---|
| Trang tra cứu từ vựng riêng kèm CTA bán hàng | Ta không bán gì. Đích đến của một câu sai là hàng ôn, không phải một trang nữa để đọc (8.9) |
| Pitch accent, frequency rank | Không có dữ liệu, và phải mua/nhập từ nguồn ngoài. Ghi nợ, không làm bây giờ (8.9) |
| 25 đề dựng sẵn | Không khả thi để tự soạn. Ta đi hướng khác: **để người dùng nhập đề vào** (mục 11) |
| Nền tối cho toàn app | Chỉ dùng nền tối cho *màn làm bài* — phần còn lại của app đang là nền sáng và không có lý do đổi |

**Câu tổng kết:**

> Bunpro mạnh ở **chất lượng nội dung một câu hỏi** và ở **mô phỏng phòng thi**.
> Ta không đua được ở chỗ đó — 25 đề tự soạn là thứ ta không có.
> Chỗ ta thắng được là **cái xảy ra sau khi đóng bài thi lại**: quy trình mổ xẻ chủ động,
> lịch ôn thích ứng, và một đường ống để nội dung chảy vào (mục 11).

### 8.12 Điều Bunpro tiết lộ về rủi ro thật của dự án

25 đề × ~100 câu ≈ **2.500 câu tự soạn**, cộng audio thu âm cho phần 聴解. Đó là hàng nghìn giờ
biên soạn nội dung, không phải công viết code.

→ **Nút thắt của dự án này là nội dung, không phải kỹ thuật.** Toàn bộ lộ trình 10 giai đoạn ở
mục 15 là việc code có thể làm được; 2.500 câu hỏi chất lượng thì không.

→ Việc Bunpro **tự soạn đề** (thay vì dùng đề thật) cũng là bằng chứng gián tiếp rằng phương án
(a) ở mục 16.1 — tự soạn theo đúng format — là con đường khả thi duy nhất về mặt bản quyền.

→ **Mục tiêu thực tế cho giai đoạn 0:** không phải một đề đầy đủ 103 câu, mà **một khối
文字・語彙 = 36 câu**. Đó là con số soạn được trong thời gian hợp lý, và đủ để chạy trọn vòng
đời: phòng chờ → làm bài → kết quả → mổ xẻ → vào SRS.

---

## 9. Đặc tả màn hình & luồng

### 9.1 Sơ đồ điều hướng

```
#/jlpt                          Trung tâm JLPT (thay trang chủ khi đã chuyển hẳn sang JLPT)
  ├── #/jlpt/:level/exams       Danh sách đề theo cấp
  ├── #/jlpt/prepare/:examId    PHÒNG CHỜ            (mục 5.1)
  ├── #/jlpt/run/:attemptId     PHÒNG THI, đa khối    (mục 5.2)
  │     └── /break/:blockIndex  Màn nghỉ giữa khối
  ├── #/jlpt/result/:attemptId  KẾT QUẢ               (mục 5.3)
  ├── #/jlpt/review/:attemptId  MỔ XẺ LỖI, 7 bước     (mục 6)  ★ trọng tâm
  ├── #/jlpt/notebook           SỔ TAY LỖI (mở rộng #/mistakes)
  └── #/jlpt/progress           TIẾN BỘ THEO THỜI GIAN
```

### 9.2 Máy trạng thái của một lượt thi

```
    created ──► running(block 0) ──► break(0) ──► running(block 1) ──► ... ──► submitted
                     │                                                             │
                     ├──► paused ──(quay lại)──┘                                    ▼
                     │                                                        reviewing
                     └──► abandoned                                                │
                                                                                   ▼
                                                                              reviewed ✓
```

- `paused` **phải** khôi phục được, kể cả sau khi đóng trình duyệt (cơ chế đã có sẵn).
- `submitted` nhưng chưa `reviewed` = **việc dở dang**, phải hiện nổi bật ở trang chủ.
  Đây chính là đòn bẩy Zeigarnik chống điểm rơi 4.
- Một lượt chỉ được coi là **hoàn tất** khi ở trạng thái `reviewed`, không phải `submitted`.
  Chỉ số theo dõi cũng phải đếm theo định nghĩa này.

### 9.3 Bố cục màn hình mổ xẻ (quan trọng nhất)

```
┌──────────────────────────────────────────────────────────┐
│  Câu 12 / 23         [progress: còn 11 câu]              │  ← đếm việc CÒN LẠI (4.3)
├──────────────────────────────────────────────────────────┤
│                                                           │
│  問題3  文脈規定                                           │
│  この仕事は経験が＿＿から、だれでもできます。                  │
│                                                           │
│  A. いらない        ← bạn đã chọn  ✗                       │
│  B. いれない                                               │
│  C. いらなくない                                            │
│  D. いられない                                             │
│                                                           │
│  ┌─ BƯỚC 1 ────────────────────────────────────────────┐ │
│  │ Chưa xem đáp án. Giờ bạn chọn lại đáp án nào?        │ │
│  │   [A]  [B]  [C]  [D]                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                           │
│  (sau khi chọn → mở BƯỚC 2, rồi 3, rồi 4 — lần lượt,      │
│   không đổ hết ra cùng lúc: tải nhận thức, mục 3.7)       │
└──────────────────────────────────────────────────────────┘
```

Nguyên tắc: **mở dần từng bước**, không hiện cả 7 bước cùng lúc. Một màn hình dày đặc sẽ khiến
người dùng bỏ qua toàn bộ.

### 9.4 Bố cục màn làm bài — phiếu trả lời

Rút ra từ mục 8.5. Đây là thay đổi so với `ExamSession` hiện có trong repo.

```
┌──────────────────────────────────┬──────────────────────────┐
│ 問題1 ＿＿のことばの読み方として   │ げんごちしき（もじ・ごい）│
│ 最もよいものを、1・2・3・4から     │ 🕐 00:29:57              │
│ 一つ えらびなさい。               │ ──────────────────────── │
│  ↑ đề bài của 問題, LUÔN hiện     │ 問題1                    │
├──────────────────────────────────┤ 01 [1][2][3][4] ← hiện tại│
│                                  │ 02 [1][2][3][4]          │
│  01  お父さんが車に乗っています。 │ ...                      │
│                     ‾            │ 問題2                    │
│                                  │ 10 [1][2][3][4]          │
│   ┌────────────┬────────────┐    │ ...                      │
│   │ 1 かって   │ 2 もって   │    │ 問題3                    │
│   ├────────────┼────────────┤    │ 16 [1][2][3][4]          │
│   │ 3 さって   │ 4 のって   │    │ ...        (cuộn được)   │
│   └────────────┴────────────┘    │                          │
│                                  │                          │
│   Chắc chắn ◯  Phân vân ◯  Đoán ◯│  ← thứ Bunpro không có   │
│                                  │                          │
│              [ ← ]  [ → ]        │                          │
└──────────────────────────────────┴──────────────────────────┘
```

Yêu cầu bắt buộc của phiếu trả lời:

1. **Nhóm theo 問題**, có tiêu đề nhóm — không phải một dãy số phẳng. Đây là đơn vị chẩn đoán.
2. **Bấm ô 1/2/3/4 ngay trên phiếu là trả lời được**, không cần nhảy vào từng câu.
3. **Hiện đáp án đã chọn**, không chỉ hiện "đã làm / chưa làm".
4. Câu đang xem được **làm nổi bật**.
5. Đồng hồ đặt **trong panel này**, không đặt giữa màn hình (mục 3.8).
6. Trên mobile: phiếu trở thành panel trượt lên từ đáy, mở bằng một nút "Phiếu trả lời (12/36)".

Ba thứ thêm vào so với Bunpro: **hàng chọn độ chắc chắn** dưới các đáp án (mục 5.2), **nút
đánh dấu cờ**, và **đề bài 問題 dính trên cùng** khi cuộn.

**Đánh số đáp án là `1 2 3 4`, không phải `A B C D`** — theo đúng quy ước đề Nhật, và để khớp
với phiếu trả lời. `QuestionCard` hiện đang dùng A/B/C/D nên cần một prop chọn kiểu đánh số.

---

---

## 10. Mô hình dữ liệu đề xuất

TypeScript, khớp phong cách hiện có của repo (`src/data/lessons.ts`).

```ts
// ─── Định nghĩa kỳ thi ────────────────────────────────────────────────

export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

/** Phần CHẤM ĐIỂM — khác với khối thời gian. Xem mục 2.1 và 2.2. */
export type ScoringSection = 'gengo_chishiki' | 'dokkai' | 'choukai';

/** Mã 問題 theo đúng tên gọi chính thức, dùng để chẩn đoán điểm yếu. */
export type MondaiType =
  // 文字・語彙
  | 'kanji_yomi' | 'hyouki' | 'bunmyaku_kitei' | 'iikae_ruigi' | 'youhou'
  // 文法
  | 'bunpou_keishiki' | 'bun_no_kumitate' | 'bunshou_no_bunpou'
  // 読解
  | 'naiyou_tan' | 'naiyou_chuu' | 'naiyou_chou' | 'jouhou_kensaku'
  // 聴解
  | 'kadai_rikai' | 'point_rikai' | 'gaiyou_rikai' | 'hatsuwa_hyougen' | 'sokuji_outou';

/** Một khối tính giờ riêng. N3 có 3 khối, N1/N2 có 2. */
export interface TimedBlock {
  id: string;
  label: string;          // "言語知識(文字・語彙)"
  /** Nhãn tiếng Anh phụ, như Bunpro làm: "Vocab" / "Grammar & Reading" / "Listening". */
  labelEn?: string;
  minutes: number;        // 30
  mondai: MondaiType[];
}

/** Đề bài chung của một nhóm 問題, hiện cố định trên đầu màn làm bài. Xem mục 8.6. */
export interface MondaiGroup {
  mondai: MondaiType;
  /** "＿＿のことばの読み方として最もよいものを、1・2・3・4から一つ えらびなさい。" */
  instruction: string;
  questionIds: string[];
}

export interface JlptExam {
  id: string;             // "n3-2024-07"
  level: JlptLevel;
  title: string;          // "N3【模擬試験】1"
  blocks: TimedBlock[];
  /** Nhóm 問題 theo đúng thứ tự đề, dùng để dựng phiếu trả lời ở mục 9.4. */
  groups: MondaiGroup[];
  questionIds: string[];
  /** Nguồn gốc đề — bắt buộc khai báo vì lý do bản quyền, xem mục 16. */
  source: 'original' | 'official-sample' | 'user-provided';
}

// ─── Câu hỏi ─────────────────────────────────────────────────────────

/**
 * Một phương án trả lời.
 *
 * `note` được hiện ở màn mổ xẻ cho MỌI phương án, không chỉ phương án đúng.
 * `linkedItem` là thẻ từ vựng / kanji tương ứng với chính phương án đó — nhờ vậy một câu sai
 * kéo theo được vài thẻ vào hàng ôn (mục 8.7 và 8.10).
 */
export interface JlptChoice {
  text: string;
  /** Vì sao phương án này đúng, hoặc vì sao nó gần đúng mà vẫn sai. */
  note?: string;
  /** Khoá thẻ trong kho hiện có, dạng `subjectId::itemId`. */
  linkedItemKey?: string;
}

export interface JlptQuestion {
  id: string;
  level: JlptLevel;
  mondai: MondaiType;
  scoringSection: ScoringSection;

  stem?: string;              // câu hỏi; có thể rỗng với 聴解
  /** Phần cần đọc/điền được gạch chân trong câu, dạng [bắt đầu, kết thúc] trên `stem`. */
  stemUnderline?: [number, number];
  /**
   * Các lựa chọn, KÈM lời giải riêng cho từng phương án.
   *
   * Đây là điểm quan trọng nhất của mô hình dữ liệu (mục 8.7): một chuỗi `explanation` duy
   * nhất cho cả câu là KHÔNG ĐỦ. Mỗi phương án nhiễu thường là một từ/mẫu có thật, và giải
   * thích vì sao nó *gần đúng nhưng không đúng* mới là chỗ chữa được lỗi "phân vân giữa hai
   * đáp án" (ô 🟠, mục 6.3). Một câu 4 lựa chọn khi đó dạy được 4 mục thay vì 1.
   *
   * Phải soạn theo cấu trúc này NGAY TỪ ĐẦU — bổ sung ngược cho hàng nghìn câu là bất khả thi.
   */
  choices: JlptChoice[];
  answerIndex: number;
  /** Lời giải chung cho cả câu, nếu có. Không thay thế được lời giải từng lựa chọn. */
  explanation?: string;
  /** Furigana cho chữ Hán khó. Mật độ theo cấp: N5/N4 nhiều, N3+ ít dần. Xem mục 8.6. */
  furigana?: { text: string; reading: string }[];

  /** 読解: nhiều câu cùng trỏ về một đoạn văn. */
  passageId?: string;

  /** 聴解: audio + lời thoại (chỉ hiện SAU khi trả lời). */
  audioId?: string;
  transcript?: string;
  /** Đoạn transcript chứa đáp án, để tô sáng lúc review. */
  transcriptAnswerSpan?: [number, number];

  /** Chẩn đoán & liên kết ôn tập. */
  grammarPoint?: string;       // "ようにする"
  confusableWith?: string[];   // ["ことにする"] — xem mục 7.2
  vocabIds?: string[];         // nối sang thẻ từ vựng đã có trong repo
  kanjiChars?: string[];
}

export interface Passage {
  id: string;
  level: JlptLevel;
  kind: 'tan' | 'chuu' | 'chou' | 'jouhou';
  text: string;
  source?: string;
}

export interface AudioClip {
  id: string;
  src: string;
  durationSec: number;
  /** Ước lượng dung lượng, để màn "tải đề về máy" báo trước cho người dùng. */
  bytes?: number;
}

// ─── Lượt làm bài ────────────────────────────────────────────────────

export type Confidence = 'sure' | 'unsure' | 'guess';

export interface JlptAnswer {
  questionId: string;
  chosenIndex: number | null;   // null = bỏ trắng
  confidence: Confidence;
  flagged: boolean;
  timeSpentMs: number;
  /** Số lần đổi đáp án — tín hiệu phụ về sự phân vân. */
  changeCount: number;
}

export type AttemptStatus =
  | 'running' | 'paused' | 'submitted' | 'reviewing' | 'reviewed' | 'abandoned';

export interface JlptAttempt {
  id: string;
  examId: string;
  level: JlptLevel;
  status: AttemptStatus;
  mode: 'taste' | 'section' | 'full';   // ba cỡ phiên, mục 4.2
  timed: boolean;                        // đồng hồ bật hay tắt
  startedAt: number;
  submittedAt?: number;
  currentBlock: number;
  /** Hạn chót từng khối (epoch ms) — dùng mốc tuyệt đối để F5 không mất giờ. */
  blockDeadlines: number[];
  answers: Record<string, JlptAnswer>;
  /** Dự đoán % của người học trước khi làm, dùng để đối chiếu, mục 5.1. */
  predictedPercent?: number;
  reviewedQuestionIds: string[];
}

// ─── Sổ tay lỗi ──────────────────────────────────────────────────────

export type MistakeCause =
  | 'goi' | 'bunpou' | 'kanji' | 'dokkai' | 'choukai'
  | 'wana' | 'bat_can' | 'het_gio';

export interface MistakeEntry {
  id: string;
  questionId: string;
  attemptId: string;
  createdAt: number;

  cause: MistakeCause;
  confidenceAtAnswer: Confidence;
  chosenIndex: number | null;
  /** Đáp án ở bước 1 (đoán lại khi chưa xem lời giải) — cho biết là "không biết" hay "lỡ tay". */
  reattemptIndex?: number | null;

  /** Do người học tự viết, giới hạn ngắn. Xem mục 6.2 bước 4. */
  myRule?: string;
  myExample?: string;

  /** Khoá nối sang hệ SRS đã có: `subjectId::itemId`. */
  srsKey: string;
}
```

**Ghi chú về lưu trữ:** `useProgress` hiện lưu tất cả vào một khoá localStorage. Lượt thi JLPT
(nhất là có transcript) sẽ nặng hơn nhiều. Khi thêm vào cần: giữ tối đa ~20 lượt gần nhất, và
cân nhắc chuyển sang IndexedDB nếu vượt hạn mức. `src/lib/storage.ts` đã nuốt lỗi quota an toàn,
nhưng nuốt lỗi nghĩa là **mất dữ liệu âm thầm** — cần cảnh báo rõ khi điều đó xảy ra.

---

## 11. Nhập dữ liệu đề từ ngoài

### 11.1 Vì sao đây là tính năng cốt lõi, không phải tiện ích phụ

Mục 8.12 kết luận: **nút thắt của dự án là nội dung, không phải code**. Bunpro có 25 đề; ta có
0. Tự soạn 2.500 câu kèm 4 lời giải mỗi câu là việc của nhiều tháng.

Đường nhập dữ liệu là **lời giải cho chính bài toán đó**. Nó biến câu hỏi "làm sao soạn đủ đề?"
thành "làm sao đổ đề vào cho nhanh?" — và câu thứ hai dễ hơn hẳn, vì:

- Đề soạn được **ngoài ứng dụng**, bằng bảng tính hoặc bằng AI, không phải sửa code.
- Người khác có thể soạn — không cần biết TypeScript, không cần clone repo.
- **AI sinh được đề đúng định dạng** (mục 11.9). Đây mới là con đường thực tế để có đủ nội dung.
- Đề nhập vào rồi **xuất ngược ra** được, để commit vào repo thành đề dựng sẵn (mục 11.8).

→ Vì thế nó **không** nằm cuối lộ trình. Nó phải có **ngay sau khi mô hình dữ liệu ổn định**,
vì mọi thứ khác đều chờ nội dung.

### 11.2 Ba đường vào

| Đường | Dành cho | Ưu tiên |
|---|---|---|
| **Dán JSON** vào ô nhập | Nhanh nhất; hợp với đề do AI sinh — copy từ cửa sổ chat rồi dán | **Làm trước** |
| **Tải file** `.json` | Đề soạn sẵn, chia sẻ giữa các máy, sao lưu | Làm cùng lúc, rẻ |
| **Bảng tính** `.csv` / `.tsv` | Người soạn thủ công nhiều câu; Excel/Google Sheets dễ hơn JSON | Làm sau |

Cả ba đổ về cùng một bộ kiểm tra và cùng một màn xem trước.

### 11.3 Định dạng JSON

Một file = một đề, hoặc một phần của đề. Không bắt buộc phải đủ ba khối — **nhập được từng
khối một** là điều kiện để soạn dần.

```jsonc
{
  "formatVersion": 1,
  "exam": {
    "id": "n3-tu-soan-01",
    "level": "N3",
    "title": "N3 Đề tự soạn 1",
    "source": "original",          // original | official-sample | user-provided
    "blocks": [
      {
        "id": "moji-goi",
        "label": "言語知識（文字・語彙）",
        "labelEn": "Vocab",
        "minutes": 30,
        "mondai": ["kanji_yomi", "hyouki"]
      }
    ]
  },
  "groups": [
    {
      "mondai": "kanji_yomi",
      "instruction": "＿＿のことばの読み方として最もよいものを、1・2・3・4から一つ えらびなさい。",
      "questionIds": ["q1"]
    }
  ],
  "questions": [
    {
      "id": "q1",
      "level": "N3",
      "mondai": "kanji_yomi",
      "scoringSection": "gengo_chishiki",
      "stem": "きのうは雨がふっていました。",
      "stemUnderline": [4, 5],       // vị trí chữ 雨 trong stem
      "answerIndex": 0,
      "choices": [
        {
          "text": "あめ",
          "note": "Đúng. 雨 đọc là あめ khi đứng một mình.",
          "linkedItemKey": "mimi-n3-goi::mimi-full-123"
        },
        {
          "text": "ゆき",
          "note": "ゆき là 雪 (tuyết). Hợp ngữ cảnh ふっていました, nhưng không phải cách đọc của 雨.",
          "linkedItemKey": "mimi-n3-goi::mimi-full-456"
        },
        {
          "text": "はれ",
          "note": "はれ là 晴れ (trời quang). Không hợp với ふる.",
          "linkedItemKey": null
        },
        {
          "text": "かぜ",
          "note": "かぜ là 風 (gió). Gió không dùng với ふる ở nghĩa này.",
          "linkedItemKey": null
        }
      ]
    }
  ]
}
```

**Quy tắc bắt buộc:**

- `choices` phải có **`note` cho cả bốn phương án**, không chỉ phương án đúng (mục 8.7).
  Bộ kiểm tra **cảnh báo** nếu thiếu, nhưng vẫn cho nhập — thà có đề thiếu lời giải còn hơn
  không có đề. Đề thiếu bị đánh dấu "chưa đầy đủ" trong danh sách.
- `linkedItemKey` là tuỳ chọn. Nếu để trống, ứng dụng **tự thử dò** theo `text` trong kho thẻ
  hiện có (1.066 thẻ Mimi N3 + 529 thẻ Kanji Master N3) và đề xuất khớp ở màn xem trước.
- `id` trùng với đề đã có thì hỏi: **ghi đè** hay **nhập thành bản mới**.

### 11.4 Định dạng bảng tính

Cho người soạn tay. Một dòng = một câu. Dấu phân cách `,` hoặc tab.

```
mondai,stem,underline,c1,n1,c2,n2,c3,n3,c4,n4,answer,link1,link2,link3,link4
kanji_yomi,きのうは雨がふっていました。,4-5,あめ,Đúng...,ゆき,ゆき là 雪...,はれ,はれ là 晴れ...,かぜ,かぜ là 風...,1,,,,
```

- `answer` là **số 1–4**, không phải chỉ số từ 0 — người soạn trong bảng tính đếm từ 1.
- `underline` dạng `bắt đầu-kết thúc`, để trống thì không gạch chân.
- Thiếu cột `nX` thì để trống; bộ kiểm tra cảnh báo chứ không chặn.
- Ứng dụng **xuất được file mẫu** có sẵn dòng tiêu đề và một dòng ví dụ, để người soạn khỏi
  phải tự nhớ tên cột.

### 11.5 Luồng nhập

```
[ Dán / Chọn file / Kéo thả ]
            ↓
     ĐỌC & KIỂM TRA          ← không lưu gì cả ở bước này
            ↓
   ┌────────────────────┐
   │  Lỗi chặn?         │──có──► Hiện lỗi kèm SỐ DÒNG và trích đoạn.
   │                    │        Không lưu. Cho sửa rồi dán lại.
   └────────┬───────────┘
            │ không
            ↓
       XEM TRƯỚC              ← bắt buộc, không bỏ qua được
   ┌────────────────────────────────────────┐
   │ N3 Đề tự soạn 1                        │
   │ 1 khối · 36 câu · 問題1 (9) 問題2 (6)… │
   │                                        │
   │ ⚠ 4 câu thiếu lời giải cho phương án   │
   │   nhiễu → vẫn nhập được, đánh dấu       │
   │   "chưa đầy đủ"                        │
   │ ✓ 28/36 câu dò được thẻ SRS tương ứng  │
   │                                        │
   │ [ Xem thử câu 1 ]  ← render đúng như   │
   │                      lúc làm bài thật   │
   │                                        │
   │  [ Huỷ ]        [ Nhập 36 câu ]        │
   └────────────────────────────────────────┘
            ↓
        LƯU + hiện trong danh sách đề, gắn nhãn "Đề của bạn"
```

**Bắt buộc có xem trước.** Nhập thẳng không xem là cách chắc chắn nhất để có 36 câu hỏng mà
không biết. Và phải **render thử một câu đúng như lúc làm bài** — lỗi hay gặp nhất không phải
JSON sai cú pháp, mà là chữ hiển thị xấu, gạch chân lệch chỗ, đáp án dài quá vỡ khung.

### 11.6 Quy tắc kiểm tra

**Lỗi chặn (không cho nhập):**

| Lỗi | Thông báo phải nói |
|---|---|
| JSON sai cú pháp | Dòng và cột, kèm trích 40 ký tự quanh chỗ hỏng |
| Thiếu trường bắt buộc | Tên trường, và câu nào (`questions[7].stem`) |
| `answerIndex` nằm ngoài `choices` | "Câu q8: đáp án số 5 nhưng chỉ có 4 phương án" |
| `choices` < 2 | "Câu q12 chỉ có 1 phương án" |
| `mondai` không thuộc danh sách hợp lệ | Liệt kê các giá trị hợp lệ |
| `questionIds` trong `groups` trỏ tới câu không tồn tại | Nêu id không khớp |
| Trùng `id` câu trong cùng file | Nêu id bị trùng |

**Cảnh báo (vẫn cho nhập):**

- Phương án nhiễu thiếu `note` → đề bị đánh dấu **"chưa đầy đủ"**; màn mổ xẻ sẽ hụt phần
  giá trị nhất (mục 8.7). Hiện đếm rõ: "12/36 câu thiếu".
- `stemUnderline` nằm ngoài độ dài `stem`.
- Tổng số câu lệch nhiều so với đề thật cùng cấp (mục 8.2) → chỉ nhắc, không chặn.
- Không dò được `linkedItemKey` cho câu nào cả → nhắc rằng tính năng "đưa thẻ về ôn" sẽ không
  chạy được với đề này.

**Nguyên tắc viết thông báo lỗi:** nói *chỗ nào* và *sửa thế nào*, không nói "dữ liệu không hợp
lệ". Người soạn đề thường không phải lập trình viên.

### 11.7 Lưu ở đâu

| Loại | Nơi lưu | Vì sao |
|---|---|---|
| Đề dựng sẵn trong repo | `src/data/jlpt/*.ts`, nạp động | Vào precache PWA, offline được ngay (mục 8 phần PWA) |
| **Đề người dùng nhập** | **IndexedDB** | Một đề N3 đầy đủ kèm 4 lời giải/câu ≈ 80–150 KB. `localStorage` (~5 MB, đang chứa cả tiến độ) sẽ đầy sau chừng 20 đề, và khi đầy thì `src/lib/storage.ts` **nuốt lỗi im lặng** — mất dữ liệu mà không ai biết |
| Tiến độ, SRS, lịch sử lượt làm | `localStorage` như hiện tại | Nhỏ, đọc/ghi liên tục |

> ⚠️ **Cảnh báo cho người triển khai:** `src/lib/storage.ts` hiện nuốt mọi lỗi ghi để app không
> vỡ. Với dữ liệu đề — thứ người dùng bỏ công soạn — **nuốt lỗi là không chấp nhận được**.
> Đường nhập dữ liệu phải báo rõ khi lưu thất bại, và nên kiểm tra dung lượng trước khi ghi.

Đề nhập vào **không tự vào precache của service worker** (chúng đến sau lúc build). Nhưng vì
nằm trong IndexedDB nên vẫn dùng được offline bình thường — chỉ là chúng không được tải sẵn
trên một máy khác.

### 11.8 Xuất ra — vòng đời của nội dung

Nhập không thôi thì chưa đủ. Phải xuất được, vì ba lý do:

1. **Sao lưu / chuyển máy.** Giống như xuất tiến độ đã có ở trang chủ.
2. **Chia sẻ.** Một người soạn, nhiều người dùng — không cần máy chủ, chỉ cần gửi file.
3. **Thăng cấp thành đề dựng sẵn.** Đề tốt thì xuất ra, commit vào `src/data/jlpt/`, thế là nó
   vào precache và mọi người dùng đều có, offline luôn.

Điểm số 3 là điều đáng chú ý nhất: **đường nhập dữ liệu cũng là quy trình biên tập nội dung của
chính dự án.** Soạn ngoài → nhập vào → dùng thử → sửa → xuất → commit.

Nút xuất phải có ở hai chỗ: từng đề, và "xuất tất cả đề của tôi".

### 11.9 Sinh đề bằng AI — con đường thực tế để có nội dung

Vì định dạng đã cố định và có bộ kiểm tra, một mô hình ngôn ngữ có thể sinh đề đúng chuẩn. Đây
là câu trả lời khả thi nhất cho mục 8.12 và câu hỏi chặn ở mục 16.5.

Ứng dụng nên có sẵn nút **"Chép mẫu lời nhắc cho AI"** trong màn nhập, kèm nội dung:

```
Hãy soạn {N} câu hỏi JLPT {cấp độ}, dạng 問題 {loại}.
Trả về ĐÚNG định dạng JSON dưới đây, không kèm giải thích ngoài JSON.

Yêu cầu bắt buộc:
- Mỗi câu có đúng 4 phương án.
- MỖI phương án đều phải có "note" giải thích — kể cả phương án sai.
  Với phương án sai, nói rõ nó thực ra là từ/mẫu gì, và vì sao nó GẦN ĐÚNG
  mà vẫn không đúng trong ngữ cảnh này.
- Phương án nhiễu phải là từ/mẫu có thật ở trình độ {cấp độ}, không bịa.
- "note" viết bằng tiếng Việt, ngắn gọn, tối đa 2 câu.
- Không dùng lại nguyên văn câu hỏi từ đề thi thật.

{dán lược đồ JSON ở mục 11.3}
```

Hai điều làm mẫu lời nhắc này khác một lời nhắc tuỳ hứng:

- **Ép giải thích cả phương án sai.** Nếu không nói rõ, mô hình gần như luôn chỉ giải thích đáp
  án đúng — và ta mất đúng 3/4 giá trị của câu hỏi (mục 8.7).
- **Ép nhiễu phải là từ có thật.** Nhiễu bịa ra thì câu hỏi vô dụng: người học loại trừ được
  ngay mà không cần biết gì.

> ⚠️ **Đề do AI sinh phải được người kiểm lại trước khi dùng nghiêm túc.** Mô hình sinh tiếng
> Nhật sai ngữ pháp hoặc sai cách đọc là chuyện có thật. Màn xem trước ở mục 11.5 chính là chỗ
> để soát. Đề chưa soát nên gắn nhãn riêng, và **không trộn vào thống kê tiến bộ** cho tới khi
> được đánh dấu đã kiểm.

### 11.10 An toàn

Dữ liệu nhập vào là **văn bản do người dùng cung cấp**, và trong một số trường hợp là do AI
sinh. Hai quy tắc:

1. **Luôn render dưới dạng văn bản thuần.** Không `dangerouslySetInnerHTML` cho bất kỳ trường
   nào đến từ file nhập — kể cả `note` và `explanation`. Nếu sau này cần in đậm/xuống dòng thì
   dùng một bộ đánh dấu tối giản tự viết, không nhận HTML.
2. **Không cho file nhập trỏ tới tài nguyên ngoài.** `audioId` chỉ được trỏ tới file trong kho
   của ứng dụng, không nhận URL http. Ứng dụng đang chạy offline và không gọi mạng ra ngoài —
   giữ nguyên tính chất đó.

### 11.11 Màn hình

```
#/jlpt/import          Nhập đề mới (dán / tải file / kéo thả)
#/jlpt/my-exams        Quản lý đề đã nhập: xem, sửa nhãn, xuất, xoá
```

Lối vào: một nút **"Nhập đề"** ở đầu danh sách đề JLPT, và một dòng trong khu quản lý dữ liệu ở
cuối trang chủ (chỗ đang có Xuất/Nạp tiến độ).

---

## 12. Nguyên tắc viết chữ trong giao diện

Ngôn ngữ ở đây không phải trang trí — nó quyết định người học ở lại hay bỏ đi. Có một phát hiện
đáng chú ý trong nghiên cứu về phản hồi: phản hồi hướng vào **bản thân người học** (khen/chê con
người) thường **làm giảm** hiệu suất so với phản hồi hướng vào **nhiệm vụ**.

**Quy tắc: nói về bài làm, không nói về con người.**

| ❌ Không viết | ✅ Viết thế này | Vì sao |
|---|---|---|
| "Bạn yếu ngữ pháp." | "12 câu ngữ pháp cần xem lại." | Nhắm vào việc, không nhắm vào người |
| "Sai rồi!" | "Đáp án đúng là B." | Không cần dấu chấm than khi báo lỗi |
| "Bạn đã làm mất chuỗi 12 ngày!" | "Chuỗi trước: 12 ngày. Bắt đầu chuỗi mới nhé." | Ghi nhận, không phạt |
| "Bạn chưa học hôm nay!" | "8 câu 漢字読み đang chờ — 5 phút thôi." | Nói việc cụ thể + chi phí thấp |
| "Điểm JLPT: 102/180" | "Đúng 58%. Đề thật chấm theo thang riêng nên đây là ước lượng." | Trung thực (mục 2.3) |
| "Xuất sắc! Thiên tài!" | "Cả 5 câu vừa sửa bạn đều làm đúng." | Khen cụ thể, có thật |
| "Bạn còn 3 ngày nữa là thi!" | "Còn 3 ngày. Phần 聴解 đang là chỗ yếu nhất — luyện 20 phút?" | Lo âu + hướng hành động, không phải lo âu suông |

Thêm hai quy tắc:

- **Không dùng từ "trượt"/"fail"** cho kết quả luyện tập. Đây là bài luyện, không phải kỳ thi.
  Dùng "chưa đạt ngưỡng" và luôn kèm việc cần làm tiếp.
- **Chuẩn hoá cái khó.** "Phần 聴解 hầu như người học nào cũng thấy khó nhất" làm giảm cảm giác
  mình bất thường — chi phí bằng không, tác dụng thật (mục 4.6, nhu cầu kết nối).

---

## 13. Chỉ số đo & tiêu chí thành công

Đo bằng dữ liệu cục bộ, không gửi đi đâu (app không có backend, không tài khoản).

**Chỉ số bắc cầu — quan trọng hơn tất cả:**

| Chỉ số | Định nghĩa | Vì sao quan trọng |
|---|---|---|
| ★ **Tỉ lệ mổ xẻ** | `reviewed` / `submitted` | Chống điểm rơi 4. Nếu chỉ đo được một thứ, đo cái này. |
| **Tỉ lệ hoàn thành bài** | `submitted` / `running` | Điểm rơi 3 |
| **Tỉ lệ quay lại D1 / D7** | Có mở app lại sau 1 / 7 ngày | Giữ chân tổng thể |
| **Tỉ lệ sửa được lỗi** | Câu sai lần 1 → làm đúng ở lần ôn ≥14 ngày sau | **Thước đo học thật sự** |
| **Sai số tự đánh giá** | \|dự đoán − thực tế\| | Metacognition đang cải thiện? |
| **Tỉ lệ dương tính giả** | (đúng + đoán) / tổng đúng | Điểm số đang bị thổi phồng bao nhiêu |

**Tiêu chí thành công của v1** (đề xuất, chủ dự án chốt lại):

- ≥ 60% số bài nộp xong được mổ xẻ ít nhất một nửa số câu sai.
- ≥ 70% phiên "nhấm nháp" 5 phút được hoàn thành.
- Tỉ lệ sửa được lỗi sau 14 ngày ≥ 50%.
- Người học quay lại trong tuần đầu ít nhất 3 lần.

---

## 14. Phản mẫu — những thứ tuyệt đối không làm

| Phản mẫu | Vì sao hỏng |
|---|---|
| Coi màn hình điểm là đích đến | Bỏ mất toàn bộ phần có giá trị học (mục 5.3) |
| Giả điểm JLPT chính xác | Sai về mặt sự thật, và khiến người học đi thi với tự tin sai (2.3) |
| Xu / huy hiệu / level ảo | Bào mòn động lực nội tại vốn đã có (4.5) |
| Bảng xếp hạng | App học một mình, offline, không tài khoản — vô nghĩa và gây so đo |
| Streak cứng không có ngày nghỉ | Mất streak → bỏ hẳn (4.4) |
| Thông báo trách móc | Né tránh, chứ không phải quay lại (mục 12) |
| Ép mổ xẻ ngay sau 140 phút thi | Đã cạn năng lượng, review thành hình thức (5.3.1) |
| Mổ xẻ = hiện lời giải rồi bấm "tiếp" | Cảm giác thông thạo giả (6.1) |
| Nhồi cả 7 bước lên một màn hình | Quá tải → bỏ qua toàn bộ (9.3) |
| Bắt buộc điền nhãn nguyên nhân | Người dùng bấm bừa → dữ liệu thành rác (5.2) |
| Đồng hồ đỏ nhấp nháy | Lo âu ăn mất trí nhớ làm việc (3.8) |
| Nhét JLPT vào `ExamSession` cũ | Khác về cấu trúc ở 6 điểm (1.3) |
| Bảng câu hỏi chỉ để nhảy câu, không hiện đáp án đã chọn | Bỏ phí ba chức năng của phiếu trả lời thật (8.5, 9.4) |
| Đánh số đáp án A/B/C/D | Đề Nhật đánh số 1/2/3/4; lệch với phiếu trả lời (9.4) |
| Câu sai chỉ link sang trang tra cứu | Ta có SRS — đẩy thẳng thẻ vào hàng ôn được (8.10) |
| Chỉ giải thích đáp án đúng, bỏ qua ba phương án nhiễu | Mỗi nhiễu là một từ/mẫu có thật; bỏ qua là phí 3/4 giá trị câu hỏi (8.7) |
| Danh sách câu ví dụ không ẩn/hiện được | Ẩn câu hoặc ẩn bản dịch biến ví dụ thụ động thành tự kiểm tra (8.9) |
| Dựng lịch 1-3-7-14 song song với SRS | Hai nguồn sự thật mâu thuẫn nhau (6.4) |
| Dùng TTS thay audio 聴解 thật mà không nói rõ | Bài nghe dễ hơn thực tế → tự tin giả (7.4) |

---

## 15. Lộ trình triển khai

Sắp theo **giá trị học trên mỗi đơn vị công sức**, không theo thứ tự dễ–khó.

| Giai đoạn | Nội dung | Vì sao thứ tự này |
|---|---|---|
| **0** | Mô hình dữ liệu (mục 10) + 1 khối N3 **文字・語彙 = 36 câu**, mỗi câu có **lời giải cho cả 4 phương án** | Rẻ nhất, dữ liệu đã có sẵn trong repo, đủ để chạy hết vòng đời một lượt thi. Con số 36 lấy theo mục 8.2. Lời giải từng phương án **không bổ sung ngược được** (8.7) |
| **1** | Phòng chờ + phòng thi 1 khối + **phiếu trả lời (9.4)** + thu độ chắc chắn | Xương sống. Có độ chắc chắn ngay từ đầu vì **không thể bổ sung ngược** cho dữ liệu cũ |
| **2** | Màn kết quả trung thực (mục 5.3) + **bản đồ chẩn đoán (8.8)** | Cửa vào của phần quan trọng nhất |
| **3** | ★ **Luồng mổ xẻ 7 bước + ma trận phân loại** | **Đây là tính năng. Mọi thứ trước đó chỉ là để tới được đây.** |
| **4** | Nối vào SRS + sổ tay lỗi có cấu trúc + mini-quiz kết thúc + **link câu sai sang thẻ SRS (8.10)** | Biến một lần mổ xẻ thành trí nhớ dài hạn |
| **4b** | ★ **Đường nhập dữ liệu (mục 11)**: dán JSON → kiểm tra → xem trước → lưu, kèm xuất ra | Mọi giai đoạn sau đều chờ nội dung. Làm sớm thì đề chảy vào song song với việc code |
| **5** | Phiên "nhấm nháp" 5 phút + việc dở dang trên trang chủ | Giữ chân (điểm rơi 1 và 4) |
| **6** | Nhiều khối + nghỉ giữa khối + đề full 140 phút | Chỉ có nghĩa khi vòng lặp học đã chạy tốt |
| **7** | 読解 (đoạn văn dùng chung) | Cần component mới, tải nhận thức cao hơn |
| **8** | 聴解 (audio, tải theo yêu cầu, transcript) | Đắt nhất, nhiều câu hỏi chưa chốt (mục 16) |
| **9** | Biểu đồ tiến bộ, đối chiếu dự đoán, chẩn đoán theo 問題 | Có giá trị khi đã đủ dữ liệu lịch sử |

**Hai ranh giới quan trọng:**

1. **Đừng làm giai đoạn 6–8 trước giai đoạn 3.** Một đề full 140 phút có audio mà không có phần
   mổ xẻ tử tế thì chỉ là cỗ máy đếm điểm — đúng cái mà tài liệu này lập luận là vô ích.
2. **Đừng để giai đoạn 4b trôi về cuối.** Nếu đường nhập dữ liệu chỉ có ở giai đoạn 9 thì suốt
   từ giai đoạn 5 tới 8 sẽ không có đề để thử — và một sản phẩm luyện đề không có đề thì không
   kiểm chứng được gì cả.

---

## 16. Câu hỏi mở cần chủ dự án quyết

Xếp theo mức độ chặn đường.

### ⛔ 1. Nguồn đề thi — chặn giai đoạn 0

Đề JLPT thật **có bản quyền** (JEES / Japan Foundation). Không được sao chép và phát hành lại
trong một dự án mã nguồn mở. Ba lựa chọn:

| Cách | Ưu | Nhược |
|---|---|---|
| **a. Tự soạn theo đúng format** | Sạch về pháp lý, chủ động số lượng | Tốn công; chất lượng câu hỏi phụ thuộc người soạn |
| **b. Dùng đề mẫu chính thức đã công bố** | Chuẩn xác, hợp lệ nếu ghi nguồn đúng | Rất ít câu, không đủ để luyện lâu dài |
| **c. Người dùng tự nhập đề của mình** | Không đụng bản quyền trong repo | Cần trình soạn thảo; chất lượng không kiểm soát được |

→ **Khuyến nghị: (a) + (b)**, và mô hình dữ liệu đã có sẵn trường `source` để phân biệt.

### ⛔ 2. Audio 聴解 — chặn giai đoạn 8

TTS có đủ không, hay cần thu âm/mua giọng? Nếu dùng TTS thì **phải nói rõ với người học** rằng
bài nghe dễ hơn đề thật. Xem mục 7.4.

### ❓ 3. Có làm cấp độ khác ngoài N3 không?

Dữ liệu hiện có trong repo đều là N3. Mô hình dữ liệu đã thiết kế đa cấp, nhưng nội dung thì
chưa. Làm N3 cho tới nơi tới chốn trước là hợp lý.

### ❓ 4. Xử lý JIT401 / JFE301 thế nào trên giao diện?

Giữ nguyên (đúng như đã chốt), nhưng khi JLPT thành trọng tâm thì trang chủ nên đổi: JLPT lên
đầu, hai môn cũ xuống mục "Môn khác". **Không xoá.**

### ⛔ 5. Ai soạn 2.500 câu hỏi? — chặn mọi thứ từ giai đoạn 1 trở đi

Mục 8.12 cho thấy nút thắt thật của dự án là nội dung. Bunpro có 25 đề; ta có 0. Cần chốt:
ai soạn, soạn theo nguồn nào, và với nhịp bao nhiêu câu mỗi tuần. Nếu chưa có câu trả lời thì
**đừng bắt đầu giai đoạn 6 trở đi** — sẽ có một phòng thi rất đẹp mà không có đề để làm.

**Đã có một phần lời giải:** mục 11 đặc tả đường nhập dữ liệu, và mục 11.9 đưa mẫu lời nhắc để
AI sinh đề đúng định dạng. Câu hỏi vì thế thu hẹp lại thành hai câu dễ trả lời hơn:
*ai chịu trách nhiệm **kiểm lại** đề do AI sinh*, và *bao nhiêu đề thì đủ để mở cho người khác
dùng*. Đề chưa qua kiểm phải được gắn nhãn và không tính vào thống kê tiến bộ (mục 11.9).

Gợi ý mốc thực tế: giai đoạn 0 chỉ cần **36 câu** (một khối 文字・語彙). Đó là mục tiêu soạn
được trong một hai buổi, và đủ để kiểm chứng toàn bộ vòng đời sản phẩm.

**Lưu ý về khối lượng thật:** theo mục 8.7, mỗi câu cần **4 lời giải** chứ không phải 1. Vậy 36
câu ≈ 144 lời giải ngắn. Nghe nhiều, nhưng với 漢字読み thì phần lớn là một câu mẫu lặp lại
("X có nghĩa là ..., nhưng không phải cách đọc của 漢字 này") — soạn nhanh hơn vẻ ngoài của nó.
Với 文法 thì đắt hơn hẳn, vì mỗi nhiễu là một mẫu ngữ pháp cần phân biệt.

### ❓ 6. Bước 4 (tự viết quy tắc) có nên bắt buộc?

Đây là bước hiệu quả nhất nhưng cũng nhiều ma sát nhất. Đề xuất: **không bắt buộc, nhưng chỉ mở
ra cho ô "sai + chắc chắn"** — nhóm ít câu nhất và đáng công nhất.

---

## 17. Nguồn tham khảo

### Dữ kiện về kỳ thi (đã đối chiếu ngày 2026-09-04)

- Cấu trúc và thời lượng N3, ba khối tính giờ riêng, không dồn giờ:
  [migii.net](https://migii.net/en/blog/jlpt-time-information),
  [jlptexams.com](https://jlptexams.com/jlpt-n3-structure/)
- Tổng thời lượng các cấp (N5 ~90, N4 ~115, N3 ~140, N2 ~155, N1 ~165 phút); N1/N2 có 2 khối,
  N3/N4/N5 có 3 khối:
  [japaneselanguagedelhi.com](https://japaneselanguagedelhi.com/blog/jlpt-exam-format-2026)
- Ba phần chấm điểm 60+60+60, đạt tổng ≥95 và điểm liệt ≥19 mỗi phần cho N3; dùng thang quy đổi
  theo IRT:
  [jlpt.jp — Scoring Sections, Pass or Fail](https://www.jlpt.jp/sp/e/guideline/results.html),
  [jlpt.jp — Overall and sectional pass marks (N1–N3)](https://www.jlpt.jp/e/topics/201008291283128850.html),
  [migii.net](https://migii.net/en/blog/jlpt-passing-score)
- Trang chính thức về cấu trúc đề:
  [jlpt.jp — Composition of Test Sections and Items](https://www.jlpt.jp/sp/e/guideline/testsections.html)

> **Cảnh báo cho người đọc sau:** trong lần nghiên cứu này, `jlpt.jp` và một số nguồn khác bị
> chặn bởi proxy mạng của môi trường build, nên các con số được đối chiếu chéo qua nhiều nguồn
> thứ cấp thay vì đọc thẳng trang chính thức. **Số câu chi tiết từng 問題 chưa được xác minh và
> cố ý không đưa vào tài liệu này** — mô hình dữ liệu được thiết kế để số câu do dữ liệu quyết
> định, không hardcode. Hãy đối chiếu với một đề thật trước khi chốt.

### Nghiên cứu về học tập được viện dẫn

Nêu để người đọc tra cứu; các phát biểu trong tài liệu là diễn giải, không phải trích dẫn
nguyên văn.

- **Hiệu ứng kiểm tra:** Roediger & Karpicke (2006), *Test-Enhanced Learning*; Karpicke &
  Roediger (2008), *Science*.
- **Xếp hạng các kỹ thuật học:** Dunlosky, Rawson, Marsh, Nathan & Willingham (2013),
  *Improving Students' Learning With Effective Learning Techniques* — luyện kiểm tra và học
  giãn cách được xếp hạng hữu ích cao nhất.
- **Khó khăn hữu ích:** R. Bjork & E. Bjork — desirable difficulties.
- **Hiệu ứng siêu sửa lỗi:** Butterfield & Metcalfe (2001); Butler, Karpicke & Roediger (2008)
  về vai trò của phản hồi.
- **Học giãn cách:** Cepeda và cộng sự (2006), phân tích tổng hợp về spacing.
- **Tải nhận thức:** Sweller — cognitive load theory.
- **Lo âu và trí nhớ làm việc:** Eysenck & Calvo — attentional control theory.
- **Phản hồi nhắm vào con người làm giảm hiệu suất:** Kluger & DeNisi (1996),
  *Feedback Intervention Theory*.
- **Động lực:** Deci & Ryan — Self-Determination Theory; hiệu ứng biện minh thái quá
  (overjustification).
- **Quy tắc đỉnh–kết:** Kahneman & Fredrickson.
- **Việc dở dang:** Zeigarnik (1927).
- **Ý định thực hiện:** Gollwitzer (1999).
- **Hiệu ứng khởi đầu mới:** Dai, Milkman & Riis (2014).

### Tham chiếu sản phẩm

- [Bunpro — JLPT Practice Tests](https://bunpro.jp/jlpt_practice_tests) — phân tích ở mục 8.
  Trang bị proxy chặn ở môi trường build; toàn bộ quan sát dựa trên **năm ảnh chụp màn hình do
  chủ dự án cung cấp ngày 2026-09-04**: trang danh sách đề; hộp thoại Details của
  N3【模擬試験】1; màn đang làm bài `/n3/11/vocab/31`; màn review sau khi nộp `/n5/1/vocab/1`;
  và trang chi tiết từ vựng `/vocabs/雨`.
- [Thông báo ra mắt tính năng, 20/09/2025 — Bunpro Community](https://community.bunpro.jp/t/bunpro-jlpt-tests-new-feature-sep-20th-2025/149777)
  *(cũng bị chặn; chỉ đọc được qua đoạn trích tìm kiếm)*

### Đóng góp từ chủ dự án

Quy trình 5 bước mổ xẻ lỗi do chủ dự án cung cấp (qua ChatGPT) là hạt nhân của mục 6. Tài liệu
này giữ nguyên tinh thần và bổ sung ba thứ: **đo độ chắc chắn** (mục 6.3), **ma trận hai trục**
thay cho danh sách một chiều, và **kết thúc bằng mini-quiz** (mục 4.7). Hai câu chữ được giữ
gần như nguyên văn vì chúng rất đắt:

> "Cái gì đã khiến tôi chọn đáp án này?"
> "10 câu sai không phải là 10 lần thất bại — đó là 10 cơ hội tìm ra điểm yếu."

---

## Phụ lục A — Danh sách kiểm tra trước khi code

Dành cho AI hoặc người sắp viết tính năng này. Trả lời được hết thì hãy bắt đầu.

- [ ] Đã đọc mục 1.3 và hiểu vì sao không dùng lại `ExamSession`?
- [ ] Đã chốt nguồn đề (mục 16.1)? **Đây là điều kiện chặn.**
- [ ] Mô hình dữ liệu có `confidence` ngay từ v1 chưa? (Không bổ sung ngược được.)
- [ ] Màn kết quả có mở đầu bằng điểm số không? (Nếu có → sai, xem 5.3.)
- [ ] Luồng mổ xẻ có bắt đoán lại trước khi hiện đáp án không? (Bước 1, mục 6.2.)
- [ ] Ô "đúng + đoán" có được xử lý riêng trong SRS không? (Mục 3.6 — dễ quên nhất.)
- [ ] Phiên mổ xẻ có kết thúc bằng mini-quiz không? (Mục 4.7.)
- [ ] Chữ trong giao diện đã qua bảng ở mục 12 chưa?
- [ ] Lượt đã nộp mà chưa mổ xẻ có hiện thành việc dở dang ở trang chủ không? (Mục 9.2.)
- [ ] Có chỗ nào hiển thị điểm JLPT giả không? (Mục 2.3 — phải là không.)
- [ ] Phiếu trả lời có nhóm theo 問題 và cho trả lời tại chỗ không? (Mục 9.4.)
- [ ] Đáp án đánh số 1/2/3/4 chứ không phải A/B/C/D? (Mục 9.4.)
- [ ] Đề bài của 問題 có dính trên cùng khi cuộn không? (Mục 8.6.)
- [ ] Câu sai có link sang thẻ SRS tương ứng kèm nút đưa về ôn không? (Mục 8.10.)
- [ ] Mỗi câu hỏi có lời giải cho **cả bốn** phương án chưa? (Mục 8.7 — không bổ sung ngược được.)
- [ ] Màn kết quả có bản đồ chẩn đoán tô màu theo 問題 chưa? (Mục 8.8.)
- [ ] Đã biết ai soạn câu hỏi chưa? (Mục 16.5 — chặn từ giai đoạn 1.)
- [ ] Điểm số có bị ẩn mặc định sau một nút bấm không? (Mục 8.13.)
- [ ] Có đo và hiện thời gian làm bài theo khối và theo câu không? (Mục 8.13.)
- [ ] Đường nhập dữ liệu có bắt buộc qua màn xem trước không? (Mục 11.5.)
- [ ] Đề nhập vào lưu ở IndexedDB, và **báo lỗi rõ** khi lưu hỏng? (Mục 11.7 — không nuốt lỗi.)
- [ ] Mọi trường đến từ file nhập đều render dạng văn bản thuần? (Mục 11.10.)
