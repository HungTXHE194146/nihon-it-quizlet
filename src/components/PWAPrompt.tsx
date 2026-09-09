import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, WifiOff, X, Download } from 'lucide-react';

/** Sự kiện cài đặt PWA của Chromium; chưa có trong lib DOM chuẩn. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Thanh thông báo của Service Worker.
 *
 * Hai việc: báo khi ứng dụng đã sẵn sàng chạy offline, và mời cập nhật khi có bản mới.
 * Cố tình KHÔNG tự nạp lại trang — người dùng có thể đang làm dở một đề thi 90 phút.
 */
export const PWAPrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const [dismissedOffline, setDismissedOffline] = useState(false);

  // Tự ẩn lời chúc mừng "dùng được offline" sau vài giây.
  useEffect(() => {
    if (!offlineReady) return;
    const timer = setTimeout(() => setOfflineReady(false), 6000);
    return () => clearTimeout(timer);
  }, [offlineReady, setOfflineReady]);

  if (needRefresh) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md animate-fadeIn">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-2xl p-4 flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 shrink-0">
            <RefreshCw size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Đã có phiên bản mới</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Cập nhật khi bạn học xong, tiến độ không bị mất.
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setNeedRefresh(false)}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Để sau"
            >
              <X size={16} />
            </button>
            <button
              onClick={() => updateServiceWorker(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (offlineReady && !dismissedOffline) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-md animate-fadeIn">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-2xl p-4 flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 shrink-0">
            <WifiOff size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Đã sẵn sàng học offline</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Bài học đã lưu vào máy, mất mạng vẫn ôn được.
            </p>
          </div>
          <button
            onClick={() => setDismissedOffline(true)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Nút "Cài ứng dụng".
 *
 * Chỉ hiện khi trình duyệt thực sự cho cài (Chrome/Edge/Android bắn beforeinstallprompt);
 * Safari iOS không có sự kiện này nên nút sẽ không xuất hiện, đó là hành vi mong muốn.
 */
export const InstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed || !deferred) return null;

  return (
    <button
      onClick={async () => {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        if (choice.outcome === 'accepted') setInstalled(true);
        setDeferred(null);
      }}
      className={
        className ||
        'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-amber-100 hover:bg-white/20 transition-all cursor-pointer'
      }
    >
      <Download className="w-3.5 h-3.5" />
      Cài ứng dụng
    </button>
  );
};
