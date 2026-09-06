/**
 * Gọi API phía server (Vercel Functions) cho dữ liệu riêng tư: tiến độ + đề JLPT.
 *
 * Trình duyệt chỉ nói chuyện với chính domain đã deploy — không có kết nối trực tiếp
 * nào tới KV/DB. Với mạng công ty, việc này không khác gì mở một trang web bình thường.
 */

export interface ApiUser {
  id: string;
  username: string;
}

/**
 * Lỗi mang theo thông báo tiếng Việt do server soạn sẵn (sai mã mời, trùng tên đăng nhập,
 * thử sai quá nhiều lần...) — màn hình chỉ việc hiện `error.message` thay vì tự đoán lại ý
 * nghĩa của từng mã lỗi.
 */
export class ApiError extends Error {
  status: number;
  /** Mã lỗi máy đọc được, ví dụ 'invalid_code' hay 'username_taken'. */
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Phiên đăng nhập đã hết hạn.') {
    super(401, 'unauthorized', message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json', ...(init?.headers || {}) },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    let code = `http_${res.status}`;
    let message = `API ${path} trả lỗi ${res.status}: ${body.slice(0, 200)}`;
    try {
      const parsed = JSON.parse(body) as { error?: unknown; message?: unknown };
      if (typeof parsed?.error === 'string') code = parsed.error;
      if (typeof parsed?.message === 'string') message = parsed.message;
    } catch {
      // Thân phản hồi không phải JSON (ví dụ trang lỗi của Vercel) — giữ thông báo thô.
    }
    if (res.status === 401) throw new UnauthorizedError(message);
    throw new ApiError(res.status, code, message);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const authApi = {
  status: () =>
    request<{ authenticated: boolean; user: ApiUser | null; signupOpen: boolean }>('/api/auth/status'),
  login: (username: string, password: string) =>
    request<{ ok: true; user: ApiUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  register: (username: string, password: string, code: string) =>
    request<{ ok: true; user: ApiUser }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, code }),
    }),
  logout: () => request<{ ok: true }>('/api/auth/logout', { method: 'POST' }),
};

export const progressApi = {
  get: () => request<(Record<string, unknown> & { _serverUpdatedAt?: number }) | null>('/api/progress'),
  put: (data: unknown) =>
    request<{ ok: true; updatedAt: number }>('/api/progress', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

export const jlptExamsApi = {
  list: () => request<unknown[]>('/api/jlpt/exams'),
  add: (examFile: unknown) =>
    request<{ ok: true; id: string }>('/api/jlpt/exams', {
      method: 'POST',
      body: JSON.stringify(examFile),
    }),
  remove: (id: string) => request(`/api/jlpt/exams?id=${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
