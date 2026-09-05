import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { LogIn, LogOut, RefreshCw, CheckCircle2, AlertTriangle, X } from 'lucide-react';

/**
 * Nút đăng nhập/đăng xuất cho phần đồng bộ riêng tư (tiến độ + đề JLPT qua nhiều máy).
 *
 * KHÔNG chặn phần còn lại của app — nếu /api chưa deploy hoặc người dùng không đăng
 * nhập, mọi thứ vẫn chạy y hệt hôm nay (chỉ lưu cục bộ). Component này chỉ là một lối
 * vào tuỳ chọn, đặt cạnh Xuất/Nạp tiến độ ở khu quản lý dữ liệu.
 */
export const SyncButton: React.FC = () => {
  const { authenticated, login, logout } = useAuth();
  const { syncState } = useProgress();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Chưa hỏi xong server lần đầu (hoặc /api không tồn tại, vẫn hiện là false rất nhanh) —
  // ẩn nút một nhịp thay vì nháy trạng thái sai.
  if (authenticated === null) return null;

  if (authenticated) {
    const label =
      syncState === 'syncing'
        ? 'Đang đồng bộ...'
        : syncState === 'error'
        ? 'Lỗi đồng bộ'
        : 'Đã đồng bộ';
    const Icon = syncState === 'syncing' ? RefreshCw : syncState === 'error' ? AlertTriangle : CheckCircle2;

    return (
      <button
        onClick={() => logout()}
        title="Bấm để đăng xuất khỏi đồng bộ (tiến độ vẫn giữ nguyên trên máy này)"
        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
          syncState === 'error'
            ? 'bg-rose-500/20 border-rose-400/30 text-rose-200 hover:bg-rose-500/30'
            : 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30'
        }`}
      >
        <Icon className={`w-3.5 h-3.5 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
        {label}
        <LogOut className="w-3 h-3 opacity-60" />
      </button>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    setError(null);
    const res = await login(password);
    setBusy(false);
    if (res.ok) {
      setShowModal(false);
      setPassword('');
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-sky-100 hover:bg-white/20 transition-all cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5" />
        Đăng nhập để đồng bộ nhiều máy
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">Đăng nhập</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  Đồng bộ tiến độ và đề JLPT giữa nhiều máy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-2xl bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
            />

            {error && (
              <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                <AlertTriangle size={13} />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Đang kiểm tra...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
