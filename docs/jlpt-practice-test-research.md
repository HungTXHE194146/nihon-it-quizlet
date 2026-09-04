# Nghiên cứu thiết kế: Chế độ luyện đề JLPT cho NihonIT

> **Tài liệu này dành cho cả người và AI đọc.**
> Bất kỳ ai (hoặc AI nào) chuẩn bị viết code cho tính năng luyện đề JLPT đều phải đọc hết file
> này trước. Nó giải thích **vì sao** từng quyết định thiết kế tồn tại, không chỉ **làm gì** —
> vì phần lớn giá trị của tính năng này nằm ở tâm lý học, không nằm ở kỹ thuật.
>
> - Trạng thái: bản nghiên cứu v1, chưa viết dòng code nào.
> - Phạm vi: kỳ thi JLPT, trọng tâm **N3**.
> - Ngày: 2026-09-04.

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
8. [Đặc tả màn hình & luồng](#8-đặc-tả-màn-hình--luồng)
9. [Mô hình dữ liệu đề xuất](#9-mô-hình-dữ-liệu-đề-xuất)
10. [Nguyên tắc viết chữ trong giao diện](#10-nguyên-tắc-viết-chữ-trong-giao-diện)
11. [Chỉ số đo & tiêu chí thành công](#11-chỉ-số-đo--tiêu-chí-thành-công)
12. [Phản mẫu — những thứ tuyệt đối không làm](#12-phản-mẫu--những-thứ-tuyệt-đối-không-làm)
13. [Lộ trình triển khai](#13-lộ-trình-triển-khai)
14. [Câu hỏi mở cần chủ dự án quyết](#14-câu-hỏi-mở-cần-chủ-dự-án-quyết)
15. [Nguồn tham khảo](#15-nguồn-tham-khảo)

---

## 0. Tóm tắt cho người vội

Mười quyết định thiết kế cốt lõi. Phần còn lại của tài liệu là lập luận cho chúng.

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

Phần này là dữ kiện, không phải ý kiến. Đã đối chiếu nguồn (xem mục 15).

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
- Tổng số câu N3 khoảng 100–110.
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

**Ba cỡ phiên, luôn hiện song song:**

| Cỡ | Thời lượng | Nội dung | Dành cho |
|---|---|---|---|
| **Nhấm nháp** | ~5 phút | 1 問題 (ví dụ chỉ 漢字読み 8 câu) | Người lười, đang chờ xe buýt, "học tí thôi" |
| **Một phần** | 25–40 phút | 1 khối thi (文字・語彙, hoặc 聴解) | Buổi tối trong tuần |
| **Full** | 140 phút | Cả đề, đủ 3 khối, có nghỉ | Cuối tuần, gần ngày thi |

Nguyên tắc: **nút được nhấn nhiều nhất phải là nút nhỏ nhất.** Trang chủ JLPT mở ra phải thấy
ngay "Làm 8 câu (5 phút)" chứ không phải "Bắt đầu đề thi 140 phút".

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

**Giao diện tối giản.** Trên màn hình chỉ được có: số thứ tự câu, đồng hồ, nội dung câu hỏi,
các lựa chọn, bảng câu hỏi, nút đánh dấu. Hết.

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

4. ĐỐI CHIẾU DỰ ĐOÁN (nếu có)
   "Bạn đoán 65%, thực tế 52%. Bạn đang tự đánh giá cao hơn thực tế ở phần 読解."

5. TÁI ĐỊNH KHUNG — câu chốt, phải là dòng nổi bật nhất trang:
   "23 câu sai = 23 cơ hội tìm ra lỗ hổng."

6. MỘT NÚT DUY NHẤT:
   [ Bắt đầu mổ xẻ 23 câu → ]

   (Nút phụ, nhỏ, xám: "Để sau" — và nếu bấm thì phải hẹn giờ nhắc lại, mục 5.3.1)
```

**Không** mở đầu bằng con số to màu đỏ. **Không** dùng từ "trượt". **Không** có cúp, pháo hoa,
hay mặt buồn.

Ý số 5 lấy trực tiếp từ gợi ý mà chủ dự án đưa vào, và nó đúng: chuyển "10 câu sai" từ *bản án*
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
├─ BƯỚC 3 ── XEM ĐÁP ÁN + LỜI GIẢI
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

Cần quyết định trước khi code (xem mục 14):

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

## 8. Đặc tả màn hình & luồng

### 8.1 Sơ đồ điều hướng

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

### 8.2 Máy trạng thái của một lượt thi

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

### 8.3 Bố cục màn hình mổ xẻ (quan trọng nhất)

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

---

## 9. Mô hình dữ liệu đề xuất

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
  minutes: number;        // 30
  mondai: MondaiType[];
}

export interface JlptExam {
  id: string;             // "n3-2024-07"
  level: JlptLevel;
  title: string;
  blocks: TimedBlock[];
  questionIds: string[];
  /** Nguồn gốc đề — bắt buộc khai báo vì lý do bản quyền, xem mục 14. */
  source: 'original' | 'official-sample' | 'user-provided';
}

// ─── Câu hỏi ─────────────────────────────────────────────────────────

export interface JlptQuestion {
  id: string;
  level: JlptLevel;
  mondai: MondaiType;
  scoringSection: ScoringSection;

  stem?: string;              // đề bài; có thể rỗng với 聴解
  choices: string[];
  answerIndex: number;
  explanation?: string;

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

## 10. Nguyên tắc viết chữ trong giao diện

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

## 11. Chỉ số đo & tiêu chí thành công

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

## 12. Phản mẫu — những thứ tuyệt đối không làm

| Phản mẫu | Vì sao hỏng |
|---|---|
| Coi màn hình điểm là đích đến | Bỏ mất toàn bộ phần có giá trị học (mục 5.3) |
| Giả điểm JLPT chính xác | Sai về mặt sự thật, và khiến người học đi thi với tự tin sai (2.3) |
| Xu / huy hiệu / level ảo | Bào mòn động lực nội tại vốn đã có (4.5) |
| Bảng xếp hạng | App học một mình, offline, không tài khoản — vô nghĩa và gây so đo |
| Streak cứng không có ngày nghỉ | Mất streak → bỏ hẳn (4.4) |
| Thông báo trách móc | Né tránh, chứ không phải quay lại (mục 10) |
| Ép mổ xẻ ngay sau 140 phút thi | Đã cạn năng lượng, review thành hình thức (5.3.1) |
| Mổ xẻ = hiện lời giải rồi bấm "tiếp" | Cảm giác thông thạo giả (6.1) |
| Nhồi cả 7 bước lên một màn hình | Quá tải → bỏ qua toàn bộ (8.3) |
| Bắt buộc điền nhãn nguyên nhân | Người dùng bấm bừa → dữ liệu thành rác (5.2) |
| Đồng hồ đỏ nhấp nháy | Lo âu ăn mất trí nhớ làm việc (3.8) |
| Nhét JLPT vào `ExamSession` cũ | Khác về cấu trúc ở 6 điểm (1.3) |
| Dựng lịch 1-3-7-14 song song với SRS | Hai nguồn sự thật mâu thuẫn nhau (6.4) |
| Dùng TTS thay audio 聴解 thật mà không nói rõ | Bài nghe dễ hơn thực tế → tự tin giả (7.4) |

---

## 13. Lộ trình triển khai

Sắp theo **giá trị học trên mỗi đơn vị công sức**, không theo thứ tự dễ–khó.

| Giai đoạn | Nội dung | Vì sao thứ tự này |
|---|---|---|
| **0** | Mô hình dữ liệu (mục 9) + 1 đề N3 **chỉ phần 文字・語彙** (~35 câu) | Rẻ nhất, dữ liệu đã có sẵn trong repo, đủ để chạy hết vòng đời một lượt thi |
| **1** | Phòng chờ + phòng thi 1 khối + thu độ chắc chắn | Xương sống. Có độ chắc chắn ngay từ đầu vì **không thể bổ sung ngược** cho dữ liệu cũ |
| **2** | Màn kết quả trung thực (mục 5.3) | Cửa vào của phần quan trọng nhất |
| **3** | ★ **Luồng mổ xẻ 7 bước + ma trận phân loại** | **Đây là tính năng. Mọi thứ trước đó chỉ là để tới được đây.** |
| **4** | Nối vào SRS + sổ tay lỗi có cấu trúc + mini-quiz kết thúc | Biến một lần mổ xẻ thành trí nhớ dài hạn |
| **5** | Phiên "nhấm nháp" 5 phút + việc dở dang trên trang chủ | Giữ chân (điểm rơi 1 và 4) |
| **6** | Nhiều khối + nghỉ giữa khối + đề full 140 phút | Chỉ có nghĩa khi vòng lặp học đã chạy tốt |
| **7** | 読解 (đoạn văn dùng chung) | Cần component mới, tải nhận thức cao hơn |
| **8** | 聴解 (audio, tải theo yêu cầu, transcript) | Đắt nhất, nhiều câu hỏi chưa chốt (mục 14) |
| **9** | Biểu đồ tiến bộ, đối chiếu dự đoán, chẩn đoán theo 問題 | Có giá trị khi đã đủ dữ liệu lịch sử |

**Ranh giới quan trọng:** đừng làm giai đoạn 6–8 trước giai đoạn 3. Một đề full 140 phút có
audio mà không có phần mổ xẻ tử tế thì chỉ là cỗ máy đếm điểm — đúng cái mà tài liệu này lập
luận là vô ích.

---

## 14. Câu hỏi mở cần chủ dự án quyết

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

### ❓ 5. Bước 4 (tự viết quy tắc) có nên bắt buộc?

Đây là bước hiệu quả nhất nhưng cũng nhiều ma sát nhất. Đề xuất: **không bắt buộc, nhưng chỉ mở
ra cho ô "sai + chắc chắn"** — nhóm ít câu nhất và đáng công nhất.

---

## 15. Nguồn tham khảo

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
- [ ] Đã chốt nguồn đề (mục 14.1)? **Đây là điều kiện chặn.**
- [ ] Mô hình dữ liệu có `confidence` ngay từ v1 chưa? (Không bổ sung ngược được.)
- [ ] Màn kết quả có mở đầu bằng điểm số không? (Nếu có → sai, xem 5.3.)
- [ ] Luồng mổ xẻ có bắt đoán lại trước khi hiện đáp án không? (Bước 1, mục 6.2.)
- [ ] Ô "đúng + đoán" có được xử lý riêng trong SRS không? (Mục 3.6 — dễ quên nhất.)
- [ ] Phiên mổ xẻ có kết thúc bằng mini-quiz không? (Mục 4.7.)
- [ ] Chữ trong giao diện đã qua bảng ở mục 10 chưa?
- [ ] Lượt đã nộp mà chưa mổ xẻ có hiện thành việc dở dang ở trang chủ không? (Mục 8.2.)
- [ ] Có chỗ nào hiển thị điểm JLPT giả không? (Mục 2.3 — phải là không.)
