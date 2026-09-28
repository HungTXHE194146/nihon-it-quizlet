---
name: try-n3-design-system
description: >-
  Use this skill whenever developing, updating, designing, or refactoring components,
  screens, grammar points, handbook, flashcards, or data for the TRY! N3 module
  (TryN3Selector, tryN3Data, grammar cards, quiz views, context reading).
---

# TRY! N3 Minimalist Neo-Brutalism Design System & Grammar Standards

This skill defines the visual language, typography, color palette, layout rules, and grammar data standards for the **TRY! N3** module in the Nihon IT Quizlet app.

---

## 1. Core Philosophy: Minimalist Neo-Brutalism

Combine the bold, rebellious energy of **Neo-brutalism** (thick black strokes, solid offset shadows, tactile mechanical interactions) with a **clean, minimalist layout** (no verbose clutter, spacious hierarchy, focused action buttons).

### Visual Signatures
* **Hard Black Borders**: All containers, buttons, and cards use `border-3 border-black` or `border-4 border-black` (`#000000`).
* **Solid Offset Shadows (Zero Blur)**:
  * Small buttons & badges: `shadow-[3px_3px_0px_0px_#000]`.
  * Mode cards & containers: `shadow-[4px_4px_0px_0px_#000]` or `shadow-[6px_6px_0px_0px_#000]`.
  * Modals: `shadow-[12px_12px_0px_0px_#000]`.
* **Sharp Corners**: Default is `rounded-none`. Only use `rounded-full` for circular pill badges. Never use `rounded-md` or `rounded-xl`.
* **Mechanical Tactile Clicks**:
  ```css
  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100
  ```
* **Typography**: **Space Grotesk** (`font-['Space_Grotesk',sans-serif]`), weights 700 (`font-bold`) and 900 (`font-black`).

---

## 2. Definitive Color Palette (Pastel Sky Blue & Ink)

Avoid multi-color rainbow clutter. Stick strictly to this cohesive palette:

| Token | Hex / Class | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#F0F9FF` (`bg-[#F0F9FF]`) | Nền tổng thể xanh nhạt pastel (Sky-50), thay thế hoàn toàn màu vàng nhạt/kem `#FFFDF5`. |
| **Ink & Structure** | `#000000` (`border-black`, `text-black`) | Toàn bộ viền stroke, bóng cứng offset và chữ chính. |
| **Primary Accent** | `#7DD3FC` (`bg-[#7DD3FC]`) | Xanh da trời pastel (Sky-300) cho nút chính, tab active, nhãn sticker và nền cấu trúc (`bg-[#7DD3FC]/25`). |
| **Hover Accent** | `#38BDF8` (`hover:bg-[#38BDF8]`) | Màu xanh đậm hơn khi hover trên các nút pastel. |
| **Card Surface** | `#FFFFFF` (`bg-white`) | Mặt thẻ chính, tương phản cao với viền đen. |
| **Dots Pattern** | `.neo-pattern-dots` | Nền chấm bi retro trên nền `#F0F9FF`. |

> [!CAUTION]
> **Không sử dụng màu vàng (`#FFD93D`)** cho background hoặc các nút chính của TRY! N3. Toàn bộ tone màu vàng đã được chuyển sang **Xanh da trời pastel (`#7DD3FC`)** và nền **Xanh nhạt (`#F0F9FF`)**.

---

## 3. Layout & UI Guidelines (Tối giản Layout chính)

### A. Hero Banner
* **Tuyệt đối không để đoạn văn mô tả dài dòng** ở Hero Banner ngoài trang chủ.
* Chỉ hiển thị:
  1. Nhãn chương ngắn gọn (ví dụ: `Chương 1 • 第一次の富士登山`).
  2. Tiêu đề to dứt khoát: `Ngữ Pháp TRY! N3`.
  3. Badge số lượng tinh gọn: `[36 Thẻ & Câu hỏi]` (`bg-[#7DD3FC] border-3 border-black`).

### B. Action Buttons (Thanh chế độ luyện tập)
* **Không dùng nút "Học tất cả"** cồng kềnh.
* Đặt **3 nút chế độ con** ngang nhau với tiêu đề to, rõ và số lượng trong khung đen, **không có dòng mô tả chữ nhỏ bên dưới**:
  * `[ ⚡ FLASHCARD | 7 ]`
  * `[ 🎯 BÀI TẬP | 23 ]`
  * `[ 🏆 KIỂM TRA CHECK | 6 ]`

### C. Mẫu câu ngữ pháp ngoài Lộ trình (Tab 1)
* Thiết kế dạng **nút bấm to rõ (`px-4 py-2.5 md:py-3 text-sm md:text-base font-black`)**.
* Có khối vuông đen thể hiện số thứ tự tương phản cao:
  ```tsx
  <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
    {g.number}
  </span>
  <span>{g.pattern}</span>
  ```
* Bấm vào mẫu câu nào mở ngay Modal xem nhanh chi tiết.

---

## 4. Quy chuẩn dữ liệu Cấu trúc ngữ pháp (接続 - Formation)

Khi nhập hoặc cập nhật dữ liệu trong `tryN3Data.ts`:

### A. Định dạng công thức: To, Rõ, Căn giữa & Không mở ngoặc rườm rà
1. **Cỡ chữ**: Luôn áp dụng `font-mono text-base md:text-xl font-black text-black text-center whitespace-pre-line leading-relaxed`.
2. **Căn giữa toàn bộ**: Cả tiêu đề `Cấu trúc (接続):` và nội dung công thức đều phải có `text-center`.
3. **Chỉ giữ lại công thức cốt lõi**, bỏ toàn bộ các ghi chú giải thích trong ngoặc đơn `(...)` ra khỏi chuỗi `formation`:
   * **Cấu trúc 1**: `V-~~ます~~ ＋ 始める` *(KHÔNG ghi: "Động từ thể ます gạch bỏ ます...")*
   * **Cấu trúc 2**: `V-る / V-ない ＋ ように言う`
   * **Cấu trúc 3**: `普通形 ＋ という ＋ N` *(Viết chữ Hán 普通形, KHÔNG ghi futsukei hay liệt kê danh từ dài dòng)*
   * **Cấu trúc 4**: Ghi chú trường hợp tính từ đuôi な và danh từ bỏ だ **bắt buộc phải xuống dòng riêng biệt**:
     ```ts
     formation: '普通形 ＋ だろうと思う\n(※ なA / N: bỏ だ)'
     ```
   * **Cấu trúc 5**: Công thức 2 dòng tinh gọn:
     ```ts
     formation: 'いA-~~い~~ ＋ くなさそうだ\nなA / N ＋ じゃなさそうだ'
     ```
4. **Các ví dụ biến đổi chi tiết**: Đưa xuống mục `usageNote` hoặc `examples`, không để trong `formation`.

### B. Quy tắc gạch ngang (Strikethrough) & Xuống dòng (\n)
* **Gạch ngang**: Viết dạng markdown `~~chữ_cần_gạch~~` (ví dụ: `V-~~ます~~`, `いA-~~い~~`).
* **Hiển thị giao diện**: Luôn sử dụng tiện ích `renderFormattedText()` từ `../utils/formatText`:
  * Nét gạch ngang tinh gọn tự nhiên: `line-through text-slate-400 decoration-slate-400 px-0.5`.
  * **Tuyệt đối KHÔNG bôi đỏ hay thêm nền đỏ** cho chữ gạch ngang.
  * Tự động chuyển ký tự `\n` thành thẻ `<br />` trực tiếp, đảm bảo hiển thị đúng 2 tầng trên mọi modal/card.

### C. Phân biệt rõ "Dịch nghĩa" (translationVi) và "Ý hiểu" (meaningVi)
* **Dịch nghĩa (`translationVi`)**: Bắt buộc phải có. Là bản dịch tiếng Việt trực tiếp, cô đọng nhất của ngữ pháp (ví dụ: `Bắt đầu làm gì`, `Bảo / Dặn / Nhắc nhở ai làm gì`, `Việc rằng... / Có nghĩa là...`, `Nghĩ rằng có lẽ là...`, `Trông có vẻ không...`).
* **Ý hiểu & Cách dùng (`meaningVi`)**: Là phần giải thích ngữ cảnh, sắc thái diễn đạt (ví dụ: "Sử dụng khi bạn nói rõ về sự bắt đầu của một việc làm gì đó mà cần có thời gian").
* **Hiển thị trên UI**:
  - Tại các nút mẫu ngữ pháp Tab 1: Hiển thị kèm tag dịch nghĩa ngắn để người học nắm ngay nghĩa.
  - Tại Sổ tay ngữ pháp Tab 3 & Modal chi tiết: Tách thành 2 khối riêng biệt rõ ràng — Khối **Dịch nghĩa** (nổi bật với nền `#7DD3FC`/badge đen) và Khối **Ý hiểu & Cách dùng**.

---

## 5. Checklist kiểm tra khi cập nhật TRY! N3

- [ ] Toàn bộ tone màu là Xanh da trời pastel (`#7DD3FC`) và nền Xanh nhạt (`#F0F9FF`). Không còn sót màu vàng `#FFD93D` hay `#FFFDF5`.
- [ ] Mỗi mẫu ngữ pháp đều có trường `translationVi` (Dịch nghĩa chuẩn) tách bạch với `meaningVi` (Ý hiểu).
- [ ] Khung Cấu trúc ngữ pháp (接続) hiển thị to rõ, căn giữa (`text-center`) và có ngắt dòng `\n` rõ ràng.
- [ ] Không còn đoạn văn giải thích dài dòng hay các dòng chữ nhỏ dưới 3 nút luyện tập.
- [ ] Chữ gạch ngang `~~ます~~` hiển thị đường gạch xám tự nhiên, không bị lỗi font hay bôi đỏ.
- [ ] Đã chạy `npm run build` xác nhận TypeScript biên dịch 100% thành công với mã thoát 0.
