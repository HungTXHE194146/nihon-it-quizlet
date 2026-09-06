import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import {
  LogIn,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  X,
  UserPlus,
  KeyRound,
} from 'lucide-react';

/**
 * Đăng nhập / tạo tài khoản / đổi mật khẩu cho phần đồng bộ riêng tư (tiến độ + kho đề JLPT).
 *
 * Mỗi người một tài khoản, tiến độ tách riêng — nút này cũng là chỗ duy nhất cho thấy
 * "đang học với tư cách ai", nên luôn hiện tên đăng nhập khi đã vào.
 *
 * KHÔNG chặn phần còn lại của app: không đăng nhập thì mọi thứ vẫn chạy y hệt, chỉ lưu
 * trong máy. Component này chỉ là một lối vào tuỳ chọn, đặt cạnh Xuất/Nạp tiến độ.
 */
export const SyncButton: React.FC = () => {
  const { authenticated, user, signupCodeRequired, login, register, changePassword, logout } = useAuth();
  const { syncState } = useProgress();

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [forgotShown, setForgotShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [showAccount, setShowAccount] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [accountNote, setAccountNote] = useState<{ ok: boolean; text: string } | null>(null);

  // Chưa hỏi xong server lần đầu (hoặc /api không tồn tại, vẫn hiện là false rất nhanh) —
  // ẩn nút một nhịp thay vì nháy trạng thái sai.
  if (authenticated === null) return null;

  const closeAccount = () => {
    setShowAccount(false);
    setCurrentPassword('');
    setNewPassword('');
    setAccountNote(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setBusy(true);
    const res = await changePassword(currentPassword, newPassword);
    setBusy(false);
    setAccountNote({ ok: res.ok, text: res.message });
    if (res.ok) {
      setCurrentPassword('');
      setNewPassword('');
    }
  };

  if (authenticated && user) {
    const label =
      syncState === 'syncing'
        ? 'Đang đồng bộ...'
        : syncState === 'error'
        ? 'Lỗi đồng bộ'
        : 'Đã đồng bộ';
    const Icon = syncState === 'syncing' ? RefreshCw : syncState === 'error' ? AlertTriangle : CheckCircle2;

    return (
      <>
        <button
          onClick={() => setShowAccount(true)}
          title={`Đang đăng nhập: ${user.username}. Bấm để đổi mật khẩu hoặc đăng xuất.`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            syncState === 'error'
              ? 'bg-rose-500/20 border-rose-400/30 text-rose-200 hover:bg-rose-500/30'
              : 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/30'
          }`}
        >
          <Icon className={`w-3.5 h-3.5 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
          <span>{user.username}</span>
          <span className="opacity-60 font-semibold">· {label}</span>
        </button>

        {showAccount && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeAccount}
          >
            <form
              onSubmit={handleChangePassword}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Tài khoản {user.username}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    Tiến độ của bạn đang được đồng bộ lên server.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeAccount}
                  className="p-2 rounded-2xl bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 pt-1">
                <p className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <KeyRound size={14} className="text-indigo-500" />
                  Đổi mật khẩu
                </p>

                <input
                  type="password"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Mật khẩu hiện tại"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
                />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới (ít nhất 8 ký tự)"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
                />

                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  Phải nhập đúng mật khẩu cũ. Không nhớ nữa thì{' '}
                  <span className="font-black text-slate-600">
                    ngu quên mật khẩu thì phải chịu 🤷
                  </span>{' '}
                  — web này không có nút khôi phục. Đường lùi duy nhất: xuất tiến độ ra file JSON,
                  tạo tài khoản mới rồi nạp lại.
                </p>

                {accountNote && (
                  <p
                    className={`text-xs font-bold flex items-start gap-1.5 ${
                      accountNote.ok ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {accountNote.ok ? (
                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                    )}
                    {accountNote.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || !currentPassword || !newPassword}
                  className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {busy ? 'Đang đổi...' : 'Đổi mật khẩu'}
                </button>
              </div>

              <button
                type="button"
                onClick={async () => {
                  closeAccount();
                  await logout();
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} />
                Đăng xuất
              </button>
            </form>
          </div>
        )}
      </>
    );
  }

  const openModal = (next: 'login' | 'register') => {
    setMode(next);
    setError(null);
    setForgotShown(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPassword('');
    setCode('');
    setError(null);
    setForgotShown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setBusy(true);
    setError(null);
    const res =
      mode === 'login' ? await login(username, password) : await register(username, password, code);
    setBusy(false);
    if (res.ok) closeModal();
    else setError(res.message);
  };

  const isRegister = mode === 'register';

  return (
    <>
      <button
        onClick={() => openModal('login')}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-sky-100 hover:bg-white/20 transition-all cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5" />
        Đăng nhập để đồng bộ
      </button>

      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {isRegister
                    ? 'Ai cũng tạo được tài khoản. Tiến độ của bạn là của riêng bạn.'
                    : 'Mỗi người một tài khoản, tiến độ học riêng và đồng bộ giữa các máy.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-2xl bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
            />

            <input
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? 'Mật khẩu (ít nhất 8 ký tự)' : 'Mật khẩu'}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
            />

            {isRegister && signupCodeRequired && (
              <div className="space-y-1">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Mã mời"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-indigo-400 text-sm font-semibold"
                />
                <p className="text-[11px] font-semibold text-slate-400 px-1">
                  Bản web này đang khoá đăng ký — hỏi người quản trị để lấy mã mời.
                </p>
              </div>
            )}

            {error && (
              <p className="text-xs font-bold text-rose-600 flex items-start gap-1.5">
                <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !username || !password || (isRegister && signupCodeRequired && !code)}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Đang xử lý...' : isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
            </button>

            {!isRegister &&
              (forgotShown ? (
                <p className="text-[11px] font-semibold text-slate-500 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5 leading-relaxed">
                  <span className="font-black text-amber-800">Ngu quên mật khẩu thì phải chịu 🤷</span>
                  <br />
                  Không email khôi phục, không câu hỏi bí mật, không admin reset hộ. Tiến độ học
                  của bạn vẫn nằm nguyên trong máy này — cứ học tiếp ở chế độ khách, hoặc tạo một
                  tài khoản mới rồi nạp lại file tiến độ đã xuất.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setForgotShown(true)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              ))}

            <button
              type="button"
              onClick={() => {
                setMode(isRegister ? 'login' : 'register');
                setError(null);
                setForgotShown(false);
              }}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              {isRegister ? (
                <>
                  <LogIn size={13} />
                  Đã có tài khoản? Đăng nhập
                </>
              ) : (
                <>
                  <UserPlus size={13} />
                  Chưa có tài khoản? Tạo tài khoản mới
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};
