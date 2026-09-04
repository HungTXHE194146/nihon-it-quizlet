# NihonIT Quizlet - Hướng dẫn sử dụng & Mở rộng Dữ liệu

Dự án này là trang web ôn tập và học tập kiểu Quizlet kết hợp trắc nghiệm, viết bằng **React, Vite, TypeScript, và Tailwind CSS**.
Giao diện tiếng Việt hiện đại, thân thiện trên di động và máy tính, chạy hoàn toàn offline bằng dữ liệu local.

---

## 🚀 Cách chạy dự án dưới máy cục bộ (Local)

1. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

2. Chạy server phát triển (Development Server):
   ```bash
   npm run dev
   ```
   *Mở trình duyệt truy cập đường dẫn được hiển thị trên console (mặc định là `http://localhost:5173`).*

3. Biên dịch dự án thành phiên bản Production:
   ```bash
   npm run build
   ```

---

## 📂 Cấu trúc Dữ liệu Học tập

Tất cả dữ liệu bài học được lưu trữ tại file:
👉 [src/data/lessons.ts](file:///d:/web/src/data/lessons.ts)

Dữ liệu tuân thủ cấu trúc TypeScript nghiêm ngặt dưới đây:

```typescript
export type StudyItem = {
  id: string;            // ID duy nhất của câu hỏi (ví dụ: "l11-mc-1")
  question?: string;     // Câu hỏi (áp dụng cho trắc nghiệm / đúng sai)
  term?: string;         // Thuật ngữ tiếng Nhật (áp dụng cho từ vựng)
  answer: string;        // Đáp án đúng (đối với Từ vựng: nghĩa chính xác. Đối với MCQ/TF: lựa chọn chính xác)
  choices?: string[];    // Các lựa chọn đáp án (đối với MCQ/TF)
  meaning?: string;      // Nghĩa tiếng Việt đầy đủ (đối với từ vựng)
  reading?: string;      // Cách đọc Hiragana/Katakana (đối với từ vựng)
  explanation?: string;  // Giải thích đáp án chi tiết bằng tiếng Việt (không bắt buộc)
};

export type Section = {
  id: string;
  title: string;
  type: "vocabulary" | "multiple_choice"; // Hai loại chính: Từ vựng & Trắc nghiệm
  items: StudyItem[];
};

export type Lesson = {
  id: number;            // Số thứ tự bài học từ 1 đến 20
  title: string;         // Tiêu đề hiển thị của bài học
  sections: Section[];   // Các phần học nhỏ bên trong bài học
};
```

---

## ✍️ Hướng dẫn Thêm bài mới & Câu hỏi mới

Để thêm dữ liệu cho các bài học trống (từ Bài 1 đến Bài 20), bạn chỉ cần mở file `src/data/lessons.ts` và sửa đổi đối tượng bài học tương ứng theo các mẫu sau:

### 1. Thêm một Phần Từ vựng (Vocabulary Flashcard)
Thêm một phần tử vào mảng `sections` của bài học với `type: "vocabulary"`. 

**Mẫu Code:**
```typescript
{
  id: "lesson-1-vocabulary",
  title: "Từ vựng (Flashcard)",
  type: "vocabulary",
  items: [
    {
      id: "l1-v-1",
      term: "ダイオード",
      reading: "だいおーど (daioudo)",
      answer: "Đi-ốt",
      meaning: "Đi-ốt (Linh kiện bán dẫn cho dòng điện đi qua một chiều)",
      explanation: "Linh kiện thế hệ thứ hai dùng để chỉnh lưu dòng điện."
    }
  ]
}
```

### 2. Thêm một Câu hỏi Trắc nghiệm (Multiple Choice)
Thêm một phần tử vào mảng `sections` của bài học với `type: "multiple_choice"`. 

**Mẫu Code:**
```typescript
{
  id: "lesson-1-multiple-choice",
  title: "Trắc nghiệm",
  type: "multiple_choice",
  items: [
    {
      id: "l1-mc-1",
      question: "トランジスタは何世代の論理素子ですか。",
      choices: [
        "第1世代",
        "第2世代",
        "第3世代",
        "第4世代"
      ],
      answer: "第2世代",
      explanation: "Transistor là linh kiện bán dẫn thế hệ thứ 2, thay thế cho bóng chân không thế hệ thứ 1."
    }
  ]
}
```

### 3. Thêm một Câu hỏi Đúng / Sai (True / False)
Câu hỏi Đúng/Sai được thiết kế để sử dụng chung cấu trúc với **trắc nghiệm**. Bạn chỉ cần đặt mảng `choices` có chính xác 2 phần tử là `["Đúng", "Sai"]` (hoặc `["Sai", "Đúng"]`) và gán `answer` tương ứng là `"Đúng"` hoặc `"Sai"`. Giao diện sẽ tự động chuyển đổi sang dạng 2 nút bấm lớn tiện lợi.

**Mẫu Code:**
```typescript
{
  id: "lesson-1-true-false",
  title: "Đúng hay sai",
  type: "multiple_choice",
  items: [
    {
      id: "l1-tf-1",
      question: "ICは第2世代の論理素子である。",
      choices: ["Đúng", "Sai"],
      answer: "Sai",
      explanation: "IC là mạch tích hợp, là linh kiện bán dẫn thế hệ thứ 3. Thế hệ thứ 2 là Transistor."
    }
  ]
}
```

---

## 🧠 Hệ thống Học tập & Ghi nhớ

Toàn bộ tiến độ được lưu **ngay trong trình duyệt** (localStorage), không cần đăng nhập và không gửi dữ liệu đi đâu.

### 1. Lặp lại ngắt quãng (SRS — thuật toán SM-2)
Mỗi lần bạn chấm "Đã thuộc" / "Chưa thuộc" (hoặc chọn đáp án trắc nghiệm), thẻ đó được lên lịch nhắc lại:

* Trả lời **đúng**: khoảng ôn giãn dần 1 ngày → 6 ngày → nhân với hệ số dễ (ease).
* Trả lời **sai**: thẻ quay lại giai đoạn học lại (gặp lại sau ~10 phút) và hệ số dễ giảm 0.2.
* Thẻ đạt khoảng ôn từ **21 ngày** trở lên được tính là "đã thuộc".

Trang chủ hiển thị số thẻ **đến hạn ôn hôm nay**; bấm *Ôn ngay* để vào phiên ôn gộp mọi môn
(`#/subject/all/study?mode=srs`) hoặc ôn riêng từng môn.

Mã nguồn: [src/lib/srs.ts](src/lib/srs.ts) · [src/hooks/useProgress.tsx](src/hooks/useProgress.tsx)

### 2. Sổ tay câu sai (`#/mistakes`)
Mọi câu từng trả lời sai ở mọi môn được gom về một chỗ, kèm số lần sai và lịch ôn kế tiếp.
Thẻ đã quên từ **3 lần** trở lên bị đánh dấu **leech** (từ cứng đầu) để bạn xử lý riêng.

### 3. Phát âm bằng giọng đọc máy (Web Speech API)
Nút loa trên thẻ từ vựng, hoặc phím tắt **S**. Chạy offline, không cần thư viện ngoài.

* Ưu tiên đọc **cách đọc thuần kana** (chính xác hơn đọc kanji đa âm); nếu không có thì đọc chính từ.
* Tự chọn `ja-JP` hay `en-US` theo môn học.
* Bật **tự đọc khi hiện thẻ mới** và chỉnh tốc độ đọc trong nút ⚙️ giữa phiên học.

### 4. Phòng thi mô phỏng cho JFE301
Trong tab *Theo Đề*, mỗi đề có hai lối vào:

| | Luyện tập | Thi thử |
|---|---|---|
| Đáp án | Hiện ngay sau mỗi câu | Chỉ hiện sau khi nộp bài |
| Đồng hồ | Không | Đếm ngược, tự nộp khi hết giờ |
| Điều hướng | Tuần tự | Bảng câu hỏi, nhảy câu, đánh dấu cờ |

Sau khi nộp: điểm số, mốc đạt **60%**, thời gian làm bài, và bộ lọc xem lại
*Tất cả / Câu sai / Bỏ trắng / Đánh dấu*. Câu bỏ trắng tính là sai điểm nhưng **không** đưa vào
lịch ôn SRS. Bài đang làm được lưu lại nên F5 hay đóng tab giữa chừng vẫn tiếp tục được.

### 5. Tiếp tục phiên học dở
Thoát giữa chừng rồi quay lại đúng lựa chọn cũ, ứng dụng sẽ hỏi *"Tiếp tục từ câu N"* hay học lại từ đầu.

### 6. Xuất / Nạp tiến độ
Không có tài khoản, nên việc đồng bộ giữa các máy làm bằng file JSON: nút **Xuất tiến độ** /
**Nạp tiến độ** ở cuối trang chủ. Bạn tự giữ dữ liệu của mình.

---

## 🎨 Tối ưu hóa UI/UX
* **Hiệu ứng lật thẻ 3D** mượt mà khi bấm lật flashcard.
* **Giao diện tự động khóa lựa chọn** và tô màu xanh/đỏ báo hiệu kết quả ngay khi click đáp án.
* **Responsive linh hoạt:** Bố cục tự co giãn và thay đổi kích thước nút trên thiết bị di động để tối ưu trải nghiệm chạm (touch targets).
* **Chuỗi ngày học liên tiếp** hiển thị trên thanh điều hướng để duy trì thói quen.

### ⌨️ Phím tắt khi học Flashcard
| Phím | Tác dụng |
|---|---|
| `Space` | Lật thẻ |
| `→` | Đã thuộc |
| `←` | Chưa thuộc |
| `H` | Hiện / ẩn cách đọc |
| `S` | Nghe phát âm |
