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

### Đăng ký mở tự do (mặc định)

Ai vào web cũng tạo được tài khoản cho mình, không cần xin phép ai. Muốn khoá lại thì đặt
biến môi trường `SIGNUP_CODE` — khi đó giao diện tự hiện thêm ô "Mã mời" và chỉ người biết
mã mới đăng ký được. Bỏ biến đi là mở lại.

Vì cửa mở nên có hai cái van:

| Van | Mặc định | Chỉnh ở đâu |
|---|---|---|
| Hạn mức đăng ký theo IP | 5 tài khoản / giờ | `MAX_SIGNUPS` trong `api/auth/register.ts` |
| Trần tổng số tài khoản | không giới hạn | biến môi trường `MAX_USERS` (ví dụ `50`) |

## Cấu hình trên project Vercel đang có (4 bước, ~10 phút)

Không phải tạo project mới: web tĩnh vẫn deploy y như cũ, thư mục `api/` được Vercel tự
nhận là Functions. Chỉ cần thêm kho dữ liệu và một biến môi trường.

### Bước 1 — Tạo kho dữ liệu Redis/KV

Vercel Dashboard → chọn project → tab **Storage** → **Create Database**.

* Có mục **KV** thì chọn KV.
* Bản Vercel mới đưa Redis sang Marketplace: chọn **Upstash → Redis**, gói **Free**.

Tạo xong bấm **Connect Project** (chọn cả Production / Preview / Development). Vercel tự
bơm các biến kết nối, **không phải gõ tay**. Tên biến có thể là `KV_REST_API_URL` +
`KV_REST_API_TOKEN` (kiểu KV) hoặc `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
(kiểu Upstash) — code nhận cả hai (`api/_lib/kv.ts`), nên kiểu nào cũng chạy.

### Bước 2 — Thêm `AUTH_SECRET`

Project Settings → **Environment Variables** → thêm cho cả 3 môi trường:

| Tên | Bắt buộc? | Giá trị |
|---|---|---|
| `AUTH_SECRET` | **Có** | chuỗi ngẫu nhiên dài, sinh bằng `openssl rand -hex 32` |
| `SIGNUP_CODE` | Không | chỉ đặt khi muốn KHOÁ đăng ký bằng mã mời |
| `MAX_USERS` | Không | trần số tài khoản, ví dụ `50` |

**Xoá `JLPT_ACCESS_PASSWORD` nếu còn** — biến của thời một-mật-khẩu-chung, giờ không còn
chỗ nào đọc nó nữa.

Đổi `AUTH_SECRET` về sau sẽ làm **mọi phiên đăng nhập trên mọi máy hết hiệu lực ngay** —
đó cũng là cách duy nhất để đá hết mọi người ra nếu nghi ngờ lộ cookie.

### Bước 3 — Redeploy

Vercel **không** áp dụng biến môi trường mới cho bản deploy đã build trước đó. Vào tab
**Deployments** → bản mới nhất → **Redeploy** (hoặc push một commit bất kỳ).

### Bước 4 — Đăng ký tài khoản của bạn TRƯỚC TIÊN

Mở web → cuối trang chủ → **Đăng nhập để đồng bộ** → *Chưa có tài khoản? Tạo tài khoản mới*.

> ⚠️ **Làm việc này ngay sau khi deploy, trước khi đưa link cho người khác.** Tài khoản
> ĐẦU TIÊN đăng ký sẽ nhận luôn blob tiến độ toàn cục của thời một-người-dùng
> (`nihonit:progress`). Đăng ký mở tự do, nên ai vào trước thì người đó nhận. Bản gốc trong
> KV được giữ nguyên chứ không xoá, nhưng đừng để phải đi dọn.

Muốn kiểm tra bằng dòng lệnh:

```bash
curl -i -X POST https://<domain-cua-ban>/api/auth/register \
  -H 'content-type: application/json' \
  -d '{"username":"hung","password":"mat-khau-cua-ban"}'
```

Mong đợi `200` kèm header `set-cookie: jlpt_auth=...`. Các mã lỗi hay gặp:

| Mã | Nghĩa |
|---|---|
| `400` | mật khẩu ngắn hơn 8 ký tự, hoặc tên đăng nhập sai định dạng (3–24 ký tự, chữ/số/`. _ -`) |
| `403 invalid_code` | bản deploy có đặt `SIGNUP_CODE` mà bạn gửi sai/thiếu mã |
| `409` | tên đăng nhập đã có người dùng |
| `429` | quá 5 lần đăng ký trong 1 giờ từ cùng một IP |
| `500` kèm "Thiếu biến môi trường AUTH_SECRET" | chưa làm bước 2, hoặc chưa redeploy |
| `500` kèm "Chưa nối kho dữ liệu KV" | chưa làm bước 1, hoặc chưa **Connect Project** |

> Cookie đăng nhập kiểu cũ (thời một mật khẩu chung) không còn hiệu lực: nó không mang id
> người dùng nào cả. Mọi người sẽ phải đăng nhập lại một lần.

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
| `/api/auth/status` | GET | Không | `{authenticated, user, signupCodeRequired}` — client dùng để biết mình là ai mà không kích 401 |
| `/api/auth/register` | POST `{username, password, code?}` | Không | Tạo tài khoản + đăng nhập luôn (`code` chỉ cần khi có `SIGNUP_CODE`) |
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
  **5 lần / giờ / IP** (`api/_lib/rateLimit.ts`). Đăng ký mở tự do nên đây là tuyến phòng
  thủ chính, cùng với trần `MAX_USERS` nếu bạn đặt.
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
