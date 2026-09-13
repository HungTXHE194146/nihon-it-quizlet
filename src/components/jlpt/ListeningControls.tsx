import React from 'react';
import { AlertTriangle, CheckCircle2, Headphones, Loader2, Lock, Volume2 } from 'lucide-react';
import type { ListeningLoad } from './useLockedListening';

function mmss(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

interface ListeningGateProps {
  /** 'start' = chưa nghe; 'resume' = đã nghe dở (tải lại trang, hoặc băng bị dừng ngoài ý muốn). */
  kind: 'start' | 'resume';
  load: ListeningLoad;
  progress: number;
  error: string | null;
  onRetry: () => void;
  onTestSound: () => void;
  onStart: () => void;
  /** Độ dài đoạn băng sẽ nghe trong lượt này (giây). */
  durationSec: number;
  /** Trọn đề: bắt đầu nghe là khoá phần đọc lại. */
  locksReading: boolean;
  /** Bị đưa sang đây vì hết giờ phần đọc. */
  readingTimeUp: boolean;
  /** 'resume': tên câu liên quan tới mốc phát tiếp, vd. "問題2・3番". Rỗng = đang ở phần hướng dẫn. */
  resumeLabel?: string;
  /** Mốc phát tiếp nằm NGAY SAU câu `resumeLabel` (câu đó đã nghe trọn), không phải đầu câu. */
  resumeAfter?: boolean;
}

/**
 * Màn chắn trước phần nghe. Có hai việc không làm ở chỗ nào khác được:
 * 1. Nói rõ luật chơi TRƯỚC khi băng chạy (phát một lần, không tua) — biết sau thì đã muộn.
 * 2. Giữ người học lại cho tới khi file đã tải XONG về máy: đã cấm tua thì không được để mạng
 *    giật giữa bài. Nút bắt đầu cũng là thao tác bấm mà trình duyệt đòi trước khi cho phát tiếng.
 */
export const ListeningGate: React.FC<ListeningGateProps> = ({
  kind,
  load,
  progress,
  error,
  onRetry,
  onTestSound,
  onStart,
  durationSec,
  locksReading,
  readingTimeUp,
  resumeLabel,
  resumeAfter,
}) => {
  const ready = load === 'ready';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-red-950/40 dark:text-red-400 flex items-center justify-center shrink-0">
          <Headphones size={20} />
        </div>
        <div>
          <p className="text-base font-extrabold text-slate-800 dark:text-neutral-100">
            {kind === 'start' ? 'Phần nghe 聴解' : 'Băng đang dừng'}
          </p>
          <p className="text-xs font-semibold text-slate-400 dark:text-neutral-500">
            {kind === 'start' ? `Khoảng ${Math.max(1, Math.round(durationSec / 60))} phút, nghe liền một mạch` : 'Bài của bạn vẫn còn nguyên'}
          </p>
        </div>
      </div>

      {readingTimeUp && kind === 'start' && (
        <p className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 dark:text-amber-300 dark:bg-amber-950/30 dark:border-amber-800 rounded-xl px-3 py-2 mb-3">
          Hết giờ phần đọc — phần đọc đã được thu lại, giống ở phòng thi.
        </p>
      )}

      {kind === 'start' ? (
        <ul className="space-y-1.5 mb-4 text-sm font-semibold text-slate-600 dark:text-neutral-300">
          <li>• Băng phát <b>một lần</b>: không tạm dừng, không tua, không đổi tốc độ.</li>
          <li>• Câu hỏi tự chuyển theo băng. Câu đã nghe qua vẫn sửa được đáp án.</li>
          <li>• 問題3, 4, 5 đề giấy không in lựa chọn — ở đây cũng chỉ có nút số.</li>
          {locksReading && (
            <li className="flex items-start gap-1.5 text-rose-600 dark:text-rose-400">
              <Lock size={14} className="mt-0.5 shrink-0" /> Bắt đầu nghe là khoá phần đọc, không quay lại sửa được nữa.
            </li>
          )}
          <li>• Đeo tai nghe, tắt thông báo điện thoại. Làm xong mới được nghe lại, nghe chậm và xem lời thoại.</li>
        </ul>
      ) : (
        <p className="text-sm font-semibold text-slate-600 dark:text-neutral-300 mb-4 leading-relaxed">
          {resumeLabel && resumeAfter ? (
            <>
              Nghe tiếp <b>ngay sau {resumeLabel}</b>. Câu đó bạn đã nghe trọn nên không bị tính là nghe lại.
            </>
          ) : resumeLabel ? (
            <>
              Nghe tiếp sẽ phát lại <b>từ đầu {resumeLabel}</b> — nghe nối giữa đoạn hội thoại thì không trả lời được. Câu
              này sẽ được ghi là đã nghe 2 lần để lúc mổ xẻ bạn biết.
            </>
          ) : (
            'Nghe tiếp từ đầu phần hướng dẫn đang dở.'
          )}
        </p>
      )}

      {load === 'loading' && (
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-neutral-400 mb-1.5">
            <Loader2 size={13} className="animate-spin" /> Đang tải file nghe về máy… {Math.round(progress * 100)}%
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
            <div className="h-full bg-indigo-500 dark:bg-red-500 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </div>
      )}
      {load === 'error' && (
        <div className="mb-4 flex items-start gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 dark:text-rose-300 dark:bg-rose-950/30 dark:border-rose-800 rounded-xl px-3 py-2.5">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={onRetry} className="underline cursor-pointer shrink-0">
            Thử lại
          </button>
        </div>
      )}
      {ready && kind === 'start' && (
        <p className="mb-4 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 size={14} /> Đã tải xong — mất mạng giữa chừng cũng không sao.
        </p>
      )}

      <div className="flex gap-2">
        {kind === 'start' && (
          <button
            onClick={onTestSound}
            disabled={!ready}
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 text-sm font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            <Volume2 size={15} /> Thử loa
          </button>
        )}
        <button
          onClick={onStart}
          disabled={!ready}
          className="flex-1 py-3 rounded-xl bg-indigo-600 dark:bg-red-600 text-white font-black text-sm shadow-md hover:bg-indigo-700 dark:hover:bg-red-700 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          {kind === 'start' ? 'Bắt đầu nghe' : 'Nghe tiếp'}
        </button>
      </div>
    </div>
  );
};

interface ListeningBarProps {
  /** Tên câu băng đang đọc, vd. "問題2・3番"; rỗng = đang ở lời hướng dẫn. */
  playingLabel: string;
  time: number;
  range: [number, number];
  playing: boolean;
  onVolume: (volume: number) => void;
  /** Đang xem lại một câu trước — cho đường tắt về câu băng đang đọc. */
  onJumpToPlaying?: () => void;
  finished: boolean;
  /** Số giây còn lại để tô nốt phiếu sau khi hết băng. */
  graceLeftSec: number | null;
  onSubmitNow: () => void;
}

/** Thanh trạng thái băng lúc thi: chỉ để XEM (không bấm tua được), thêm chỉnh âm lượng. */
export const ListeningBar: React.FC<ListeningBarProps> = ({
  playingLabel,
  time,
  range,
  playing,
  onVolume,
  onJumpToPlaying,
  finished,
  graceLeftSec,
  onSubmitNow,
}) => {
  const [from, to] = range;
  const pct = to > from ? Math.max(0, Math.min(100, ((time - from) / (to - from)) * 100)) : 0;

  if (finished) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 rounded-2xl px-4 py-3 mb-4">
        <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="flex-1 text-sm font-bold text-emerald-900 dark:text-emerald-200">
          Hết băng.{graceLeftSec !== null && ` Tự nộp bài sau ${Math.max(0, graceLeftSec)} giây — tô nốt phiếu nhé.`}
        </p>
        <button onClick={onSubmitNow} className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer shrink-0">
          Nộp ngay
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 px-4 py-3 mb-4">
      <div className="flex items-center gap-2.5">
        <Headphones size={16} className={`shrink-0 ${playing ? 'text-indigo-600 dark:text-red-400 animate-pulse' : 'text-slate-400'}`} />
        <p className="text-xs font-extrabold text-slate-700 dark:text-neutral-200 min-w-0 truncate">
          {playingLabel ? `Băng đang đọc: ${playingLabel}` : 'Băng đang đọc hướng dẫn'}
        </p>
        {onJumpToPlaying && (
          <button
            onClick={onJumpToPlaying}
            className="text-[11px] font-extrabold text-indigo-600 dark:text-red-400 hover:underline cursor-pointer shrink-0"
          >
            Về câu đang đọc →
          </button>
        )}
        <span className="ml-auto text-[11px] font-mono font-bold tabular-nums text-slate-500 dark:text-neutral-400 shrink-0">
          còn {mmss(to - time)}
        </span>
        <label className="hidden sm:flex items-center gap-1 shrink-0" title="Âm lượng">
          <Volume2 size={14} className="text-slate-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            defaultValue={1}
            onChange={(e) => onVolume(Number(e.target.value))}
            className="w-20 accent-indigo-600 dark:accent-red-500"
          />
        </label>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden" aria-hidden>
        <div className="h-full bg-indigo-500 dark:bg-red-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
