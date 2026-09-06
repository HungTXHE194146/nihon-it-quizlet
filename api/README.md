# API riêng tư (tài khoản + tiến độ + đề JLPT)

Các route trong thư mục này là **Vercel Functions** (chạy trên Edge runtime), tách biệt
hoàn toàn khỏi phần web tĩnh. Trình duyệt chỉ gọi `/api/...` trên cùng domain đã deploy —
**không bao giờ** kết nối thẳng tới KV/DB. Đây chính là lý do mạng công ty (vốn đã tải được
trang web bình thường) sẽ không phân biệt được việc này với việc mở web như mọi khi.

## Mô hình nhiều người dùng

Mỗi người **một tài khoản riêng** (tên đăng nhập + mật khẩu), và:

| Dữ liệu | Phạm vi | Khoá KV |
|---|---|---|
| Tiến độ học (SRS, streak, lịch sử thi) | **Riêng từng tài khoản** | `nihonit:u:<userId>:progress` |
| Hồ sơ tài khoản | Riêng | `nihonit:user:<tên thường>` |
| Kho đề JLPT đã nhập | **Dùng chung** cho mọi tài khoản | `nihonit:jlpt:exam:<id>` |

Đề JLPT cố ý để chung vì đó là **học liệu** (một người nhập, cả nhóm luyện được), còn thứ
riêng tư của mỗi người là tiến độ làm bài. Đổi lại, mỗi đề nhớ `ownerId` và chỉ người đã
nhập mới sửa/xoá được — kho chung không có nghĩa là ai cũng dọn được công sức người khác.

Id người dùng luôn lấy từ **cookie đã ký**, không bao giờ từ tham số client gửi lên; nếu
không thì chỉ cần đổi query string là đọc được tiến độ của người khác.

### Đăng ký không mở tự do

Bản deploy nằm trên domain công khai, nên muốn tạo tài khoản phải nhập đúng **mã mời**
(`SIGNUP_CODE`). Đây là cách giữ nguyên tính riêng tư của thiết kế cũ (một mật khẩu chung)
nhưng cho phép nhiều người, mỗi người một tiến độ.

## Việc bạn PHẢI tự làm (tôi không có quyền vào tài khoản Vercel của bạn)

### 1. Tạo KV store

Vercel Dashboard → project này → tab **Storage** → **Create Database** → chọn **KV**
(chạy trên nền Upstash Redis, tầng miễn phí đủ dùng cho một nhóm nhỏ). Sau khi tạo, bấm
**Connect Project** để Vercel tự thêm các biến môi trường `KV_REST_API_URL` /
`KV_REST_API_TOKEN` / v.v. — không cần bạn tự gõ tay các giá trị này.

### 2. Đặt 2 biến môi trường còn lại

Project Settings → Environment Variables, thêm cho cả 3 môi trường (Production, Preview,
Development):

| Tên | Giá trị | Cách tạo |
|---|---|---|
| `AUTH_SECRET` | chuỗi ngẫu nhiên dài | `openssl rand -hex 32` (càng dài càng tốt) |
| `SIGNUP_CODE` | mã mời bạn tự chọn | ai muốn tạo tài khoản phải gõ đúng mã này |

Đổi lại `AUTH_SECRET` bất cứ lúc nào sẽ làm mọi phiên đăng nhập cũ hết hiệu lực ngay lập
tức (hữu ích nếu nghi ngờ có ai đó có được cookie của bạn). Đổi `SIGNUP_CODE` chỉ chặn
người đăng ký mới, không ảnh hưởng tài khoản đã có.

> Bản deploy cũ đang đặt `JLPT_ACCESS_PASSWORD` (một mật khẩu chung) thì **chưa cần sửa
> gì**: nếu thiếu `SIGNUP_CODE`, mã mời tạm lấy đúng giá trị `JLPT_ACCESS_PASSWORD`. Nên
> đặt `SIGNUP_CODE` rồi xoá biến cũ khi tiện, cho khỏi lẫn hai khái niệm.

### 3. Deploy lại

Sau khi thêm biến môi trường, phải **redeploy** (Vercel không tự áp dụng biến mới cho các
bản deploy đã build trước đó). Push code lên nhánh đang deploy là đủ để trigger.

### 4. Tạo tài khoản đầu tiên

```bash
curl -i -X POST https://<domain-cua-ban>/api/auth/register \
  -H 'content-type: application/json' \
  -d '{"username":"hung","password":"mat-khau-cua-ban","code":"mã mời"}'
```

Mong đợi: `200`, có header `set-cookie: jlpt_auth=...`. Sai mã mời `403`, trùng tên `409`,
mật khẩu ngắn hơn 8 ký tự `400`, thiếu biến môi trường `500` kèm tên biến còn thiếu.

**Tài khoản ĐẦU TIÊN đăng ký sẽ nhận luôn blob tiến độ toàn cục của thời một-người-dùng**
(`nihonit:progress`), nên dữ liệu học cũ không mất khi chuyển sang mô hình nhiều tài khoản.
Bản gốc được giữ nguyên chứ không xoá, để còn đường lùi. Vì vậy: hãy để chính chủ đăng ký
trước, rồi mới mời người khác.

> Cookie đăng nhập kiểu cũ (thời một mật khẩu chung) không còn hiệu lực sau khi cập nhật:
> nó không mang id người dùng nào cả. Mọi người sẽ phải đăng nhập lại một lần.

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
| `/api/auth/status` | GET | Không | `{authenticated, user, signupOpen}` — client dùng để biết mình là ai mà không kích 401 |
| `/api/auth/register` | POST `{username, password, code}` | Không | Đúng mã mời → tạo tài khoản + đăng nhập luôn |
| `/api/auth/login` | POST `{username, password}` | Không | Đúng mật khẩu → set cookie 90 ngày |
| `/api/auth/logout` | POST | Không | Xoá cookie |
| `/api/auth/change-password` | POST `{currentPassword, newPassword}` | **Có** | Đổi mật khẩu của chính mình; cấp lại cookie mới cho máy vừa đổi |
| `/api/progress` | GET / PUT | **Có** | Đọc/ghi tiến độ **của chính người đang đăng nhập** |
| `/api/jlpt/exams` | GET / POST / DELETE | **Có** | Kho đề chung; sửa/xoá giới hạn ở người đã nhập đề đó |

Mọi route "Có" đều gọi `requireUser()` ở dòng đầu tiên — xem `api/_lib/requireAuth.ts`.

## Ghi chú bảo mật

* Mật khẩu lưu dưới dạng **PBKDF2-SHA256, 100.000 vòng, muối riêng từng tài khoản**
  (`api/_lib/auth.ts`), không bao giờ lưu bản rõ.
* Phiên đăng nhập là cookie `HttpOnly; Secure; SameSite=Lax` mang payload đã ký HMAC — chỉ
  ký chứ không mã hoá, vì bên trong chỉ có id/tên/hạn dùng.
* `/api/auth/login` giới hạn **10 lần thử / 15 phút / IP**, `/api/auth/register` giới hạn
  **5 lần / giờ / IP** (`api/_lib/rateLimit.ts`).
* Sai tên đăng nhập và sai mật khẩu trả về **cùng một thông báo** và tốn thời gian như
  nhau, để không ai dò được username nào có thật.
* `/api/auth/change-password` giới hạn **10 lần / 15 phút / IP** như đăng nhập, và bắt buộc
  nhập đúng mật khẩu cũ.
* **Không có đường khôi phục mật khẩu** — không email, không câu hỏi bí mật, không admin
  reset. Cố ý: thêm luồng khôi phục là thêm email, thêm token, thêm chỗ hỏng cho một web
  học nhóm nhỏ. Ai quên thì tạo tài khoản mới bằng mã mời rồi nạp lại tiến độ từ file JSON.
* Đổi mật khẩu **không** làm hết hiệu lực cookie đang có trên máy khác (token đã ký, không
  tra lại KV mỗi request). Muốn đá sạch mọi phiên: đổi `AUTH_SECRET` rồi deploy lại.
* Xoá tài khoản chưa có route riêng: xoá tay khoá `nihonit:user:<tên>` và
  `nihonit:u:<id>:progress` trong KV.
