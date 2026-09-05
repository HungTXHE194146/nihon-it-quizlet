/**
 * Gọi API phía server (Vercel Functions) cho dữ liệu riêng tư: tiến độ + đề JLPT.
 *
 * Trình duyệt chỉ nói chuyện với chính domain đã deploy — không có kết nối trực tiếp
 * nào tới KV/DB. Với mạng công ty, việc này không khác gì mở một trang web bình thường.
 */

export class UnauthorizedError extends Error {
  constructor() {
    super('unauthorized');
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json', ...(init?.headers || {}) },
  });

  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${path} trả lỗi ${res.status}: ${body.slice(0, 200)}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const authApi = {
  status: () => request<{ authenticated: boolean }>('/api/auth/status'),
  login: (password: string) =>
    request<{ ok: true }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
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
