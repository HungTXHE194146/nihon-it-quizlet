import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

/** Nút bật/tắt giao diện tối, đặt cạnh các icon khác trên header. */
export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-indigo-400 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
