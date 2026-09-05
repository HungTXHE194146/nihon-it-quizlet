/**
 * Trạng thái đăng nhập cho phần riêng tư (đồng bộ tiến độ nhiều máy + đề JLPT).
 *
 * KHÔNG che phần còn lại của app: JIT401/JFE301 vẫn dùng đầy đủ mà không cần đăng nhập
 * gì cả. Chỉ khi đăng nhập, useProgress mới bật đồng bộ lên server — xem mục "Nối
 * useProgress.tsx" trong quá trình phát triển.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authApi, UnauthorizedError } from '../lib/api';

interface AuthContextValue {
  /** null = chưa hỏi xong server lần đầu (đang tải). */
  authenticated: boolean | null;
  login: (password: string) => Promise<{ ok: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    authApi
      .status()
      .then((r) => {
        if (!cancelled) setAuthenticated(r.authenticated);
      })
      .catch(() => {
        // Không gọi được /api (offline, hoặc bản deploy chưa có API riêng) — coi như
        // chưa đăng nhập, app vẫn phải chạy bình thường ở chế độ chỉ-cục-bộ như trước nay.
        if (!cancelled) setAuthenticated(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (password: string) => {
    try {
      await authApi.login(password);
      setAuthenticated(true);
      return { ok: true, message: 'Đăng nhập thành công.' };
    } catch (e) {
      if (e instanceof UnauthorizedError) return { ok: false, message: 'Sai mật khẩu.' };
      return { ok: false, message: `Không đăng nhập được: ${(e as Error).message}` };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAuthenticated(false);
    }
  }, []);

  const value = useMemo(() => ({ authenticated, login, logout }), [authenticated, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  return ctx;
}
