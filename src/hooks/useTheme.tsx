/**
 * Sáng/tối cho toàn bộ web — bật bằng class `.dark` trên `<html>` (custom variant khai báo
 * ở src/index.css), người dùng bấm nút bật/tắt, không phải OS quyết định thay.
 *
 * Lần vào đầu tiên (chưa có gì lưu) thì theo prefers-color-scheme của hệ thống cho lịch sự;
 * ngay khi người dùng bấm nút thì lựa chọn đó được nhớ lại và ưu tiên hơn OS về sau.
 *
 * Có một bản logic y hệt chạy inline trong index.html (trước khi React mount) để set class
 * kịp trước lượt vẽ đầu tiên — tránh nháy sáng rồi mới chuyển tối. Đổi khoá lưu trữ hay
 * fallback ở đây thì phải sửa luôn bên index.html.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { readJSON, writeJSON } from '../lib/storage';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const THEME_COLOR = { light: '#4f46e5', dark: '#0f172a' } as const;

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    readJSON<Theme>(STORAGE_KEY, systemPrefersDark() ? 'dark' : 'light')
  );

  useEffect(() => {
    applyTheme(theme);
    writeJSON(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme phải được gọi bên trong ThemeProvider');
  return ctx;
}
