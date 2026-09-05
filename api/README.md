# API riêng tư (tiến độ + đề JLPT)

Các route trong thư mục này là **Vercel Functions** (chạy trên Edge runtime), tách biệt
hoàn toàn khỏi phần web tĩnh. Trình duyệt chỉ gọi `/api/...` trên cùng domain đã deploy —
**không bao giờ** kết nối thẳng tới KV/DB. Đây chính là lý do mạng công ty (vốn đã tải được
trang web bình thường) sẽ không phân biệt được việc này với việc mở web như mọi khi.

## Việc bạn PHẢI tự làm (tôi không có quyền vào tài khoản Vercel của bạn)

### 1. Tạo KV store

Vercel Dashboard → project này → tab **Storage** → **Create Database** → chọn **KV**
(chạy trên nền Upstash Redis, tầng miễn phí đủ dùng cho một người). Sau khi tạo, bấm
**Connect Project** để Vercel tự thêm các biến môi trường `KV_REST_API_URL` /
`KV_REST_API_TOKEN` / v.v. — không cần bạn tự gõ tay các giá trị này.

### 2. Đặt 2 biến môi trường còn lại

Project Settings → Environment Variables, thêm cho cả 3 môi trường (Production, Preview,
Development):

| Tên | Giá trị | Cách tạo |
|---|---|---|
| `AUTH_SECRET` | chuỗi ngẫu nhiên dài | `openssl rand -hex 32` (hoặc bất kỳ trình sinh chuỗi ngẫu nhiên nào, càng dài càng tốt) |
| `JLPT_ACCESS_PASSWORD` | mật khẩu bạn tự chọn | mật khẩu để đăng nhập vào phần riêng tư của web |

Đổi lại `AUTH_SECRET` bất cứ lúc nào sẽ làm mọi phiên đăng nhập cũ hết hiệu lực ngay lập
tức (hữu ích nếu nghi ngờ có ai đó có được cookie của bạn).

### 3. Deploy lại

Sau khi thêm biến môi trường, phải **redeploy** (Vercel không tự áp dụng biến mới cho các
bản deploy đã build trước đó). Push code lên nhánh đang deploy là đủ để trigger.

### 4. Chạy thử

```bash
curl -i -X POST https://<domain-cua-ban>/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"password":"mật khẩu bạn vừa đặt"}'
```

Mong đợi: `200`, có header `set-cookie: jlpt_auth=...`. Sai mật khẩu thì `401`. Thiếu biến
môi trường thì `500` kèm thông báo rõ tên biến còn thiếu (xem `api/_lib/auth.ts`).

## Phát triển cục bộ

```bash
npm i -g vercel   # nếu chưa có
vercel link       # nối thư mục này với đúng project trên Vercel
vercel env pull .env.local   # tải KV_REST_API_URL, AUTH_SECRET,... về máy
vercel dev        # chạy cả web tĩnh lẫn /api trên cùng 1 cổng, giống môi trường thật
```

`npm run dev` (Vite thuần) sẽ KHÔNG chạy được `/api/*` — chỉ `vercel dev` mới giả lập được
cả hai cùng lúc.

## Các route

| Route | Method | Cần đăng nhập? | Việc gì |
|---|---|---|---|
| `/api/auth/status` | GET | Không | `{authenticated: boolean}` — client dùng để tự hỏi trạng thái mà không kích 401 |
| `/api/auth/login` | POST `{password}` | Không | Đúng mật khẩu → set cookie 90 ngày |
| `/api/auth/logout` | POST | Không | Xoá cookie |
| `/api/progress` | GET / PUT | **Có** | Đọc/ghi blob tiến độ, khớp hình dạng `useProgress.tsx` |
| `/api/jlpt/exams` | GET / POST / DELETE | **Có** | Danh sách đề JLPT đã nhập qua `tools/jlpt-import/` |

Mọi route "Có" đều gọi `requireAuth()` ở dòng đầu tiên — xem `api/_lib/requireAuth.ts`.
