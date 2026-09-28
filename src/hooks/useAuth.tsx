/**
 * Danh tính người dùng cho phần riêng tư (tiến độ đồng bộ nhiều máy + kho đề JLPT).
 *
 * Mỗi người một tài khoản riêng: `user.id` là thứ quyết định tiến độ nào được nạp, cả ở
 * localStorage lẫn trên server (xem useProgress.tsx). Trước đây chỉ có một mật khẩu chung
 * cho một người, nên chỗ này chỉ cần một cờ boolean.
 *
 * KHÔNG che phần còn lại của app: JIT401/JFE301 vẫn dùng đầy đủ mà không cần đăng nhập —
 * khách vãng lai học bình thường, tiến độ lưu trong máy. Đăng nhập chỉ thêm: tiến độ gắn
 * với tài khoản và đồng bộ được sang máy khác.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authApi } from '../lib/api';
import type { ApiUser } from '../lib/api';

export type AuthResult = { ok: boolean; message: string };

interface AuthContextValue {
  /** null = chưa hỏi xong server lần đầu (đang tải), sau đó là người đang đăng nhập hoặc null. */
  user: ApiUser | null;
  /** null = chưa biết; false = khách; true = đã đăng nhập. */
  authenticated: boolean | null;
  /** Bản deploy này có bắt nhập mã mời khi đăng ký không (mặc định: không, ai cũng tạo được). */
  signupCodeRequired: boolean;
  login: (username: string, password: string) => Promise<AuthResult>;
  register: (username: string, password: string, code?: string) => Promise<AuthResult>;
  /** Đổi mật khẩu của chính mình. Phải biết mật khẩu cũ — không có đường khôi phục. */
  changePassword: (currentPassword: string, newPassword: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [ready, setReady] = useState(false);
  const [signupCodeRequired, setSignupCodeRequired] = useState(false);

  useEffect(() => {
    let cancelled = false;
    authApi
      .status()
      .then((r) => {
        if (cancelled) return;
        setUser(r.user ?? null);
        setSignupCodeRequired(Boolean(r.signupCodeRequired));
      })
      .catch(() => {
        // Không gọi được /api (offline, hoặc bản deploy chưa có API riêng) — coi như khách,
        // app vẫn phải chạy bình thường ở chế độ chỉ-cục-bộ như trước nay.
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await authApi.login(username, password);
      setUser(res.user);
      return { ok: true, message: `Xin chào ${res.user.username}!` };
    } catch (e) {
      return { ok: false, message: (e as Error).message };
    }
  }, []);

  const register = useCallback(async (username: string, password: string, code?: string) => {
    try {
      const res = await authApi.register(username, password, code);
      setUser(res.user);
      return { ok: true, message: `Đã tạo tài khoản ${res.user.username}.` };
    } catch (e) {
      return { ok: false, message: (e as Error).message };
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      await authApi.changePassword(currentPassword, newPassword);
      return { ok: true, message: 'Đã đổi mật khẩu. Nhớ kỹ vào nhé.' };
    } catch (e) {
      return { ok: false, message: (e as Error).message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      authenticated: ready ? user !== null : null,
      signupCodeRequired,
      login,
      register,
      changePassword,
      logout,
    }),
    [user, ready, signupCodeRequired, login, register, changePassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  return ctx;
}
