import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, FastForward, Gauge, Headphones, Loader2, Pause, Play, Repeat, Rewind, RotateCcw } from 'lucide-react';
import type { AudioSegment, JlptAudioTrack, JlptQuestion } from '../../lib/jlpt/schema';
import { audioObjectUrl, lineAt } from '../../lib/jlpt/audio';

export type HintLevel = 1 | 2 | 3;

interface ChoukaiReplayPanelProps {
  track: JlptAudioTrack;
  question: JlptQuestion;
  /** Vị trí của câu trong file nghe (`question.audioSegment`, đã kiểm là có). */
  segment: AudioSegment;
  /**
   * Bậc trợ giúp đang mở — chính là bậc thang chẩn đoán của bước 1 mổ xẻ:
   * 1 = nghe lại (tua được), 2 = thêm nghe chậm + lặp đoạn, 3 = thêm lời thoại (chưa có đáp án).
   */
  hintLevel: HintLevel;
  /** Không truyền = không hiện nút mở bậc (vd. màn ôn SRS tự quyết định bậc). */
  onHintLevelChange?: (level: HintLevel) => void;
  /** Đã xem đáp án: mở hết công cụ và tô sáng đoạn lời thoại chứa căn cứ cho đáp án. */
  revealed: boolean;
}

const SPEEDS = [1, 0.85, 0.7] as const;

function formatSec(sec: number): string {
  const s = Math.max(0, Math.round(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** "男：お疲れ様です。" → ["男", "お疲れ様です。"]; dòng không có người nói thì trả về null. */
function splitSpeaker(line: string): [string, string] | null {
  const m = /^([^：:\s]{1,6})[：:]\s*(.*)$/.exec(line);
  return m ? [m[1], m[2]] : null;
}

/**
 * Nghe lại MỘT câu 聴解 lúc mổ xẻ / ôn tập — chế độ mở khoá, ngược hẳn với lúc thi: tua được,
 * nghe chậm được, lặp từng dòng được, bấm vào dòng lời thoại là nhảy tới đó.
 *
 * Mở dần theo bậc chứ không mở hết ngay (mục 3.3 "khó khăn hữu ích"): cho xem chữ ngay thì người
 * học đọc chứ không nghe, và mất luôn thông tin chẩn đoán "lần nghe thứ hai có đủ không".
 */
export const ChoukaiReplayPanel: React.FC<ChoukaiReplayPanelProps> = ({
  track,
  question,
  segment,
  hintLevel,
  onHintLevelChange,
  revealed,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(segment.start);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [loopLine, setLoopLine] = useState<number | null>(null);

  const showSlowTools = revealed || hintLevel >= 2;
  const showTranscript = revealed || hintLevel >= 3;
  const lines = useMemo(() => (question.transcript ?? '').split('\n'), [question.transcript]);
  const activeLine = lineAt(segment, time);

  useEffect(() => {
    let cancelled = false;
    audioObjectUrl(track, (loaded, total) => !cancelled && setProgress(total > 0 ? loaded / total : 0))
      .then((url) => !cancelled && setSrc(url))
      .catch((err: unknown) => !cancelled && setLoadError(err instanceof Error ? err.message : 'Không tải được file nghe.'));
    return () => {
      cancelled = true;
    };
  }, [track]);

  // Đưa đầu đọc về đầu câu ngay khi file sẵn sàng.
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;
    const toStart = () => {
      el.currentTime = segment.start;
      setTime(segment.start);
    };
    if (el.readyState >= 1) toStart();
    else el.addEventListener('loadedmetadata', toStart, { once: true });
  }, [src, segment.start]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, src]);

  // Tắt nghe chậm nếu bậc bị hạ (không xảy ra trong luồng thường, nhưng giữ đúng quy tắc).
  useEffect(() => {
    if (!showSlowTools) {
      setSpeed(1);
      setLoopLine(null);
    }
  }, [showSlowTools]);

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    const t = el.currentTime;
    setTime(t);
    const loop = loopLine !== null ? segment.lines?.[loopLine] : null;
    if (loop && t >= loop.end) {
      el.currentTime = loop.start;
      return;
    }
    // Dừng ở hết phần nói, không bắt ngồi nghe khoảng lặng chọn đáp án.
    if (!loop && t >= segment.speechEnd + 0.4) {
      el.pause();
      el.currentTime = segment.speechEnd;
    }
  };

  const seekTo = (t: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(segment.start, Math.min(segment.speechEnd, t));
    setTime(el.currentTime);
  };

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      if (el.currentTime >= segment.speechEnd - 0.2) el.currentTime = segment.start;
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const playLine = (i: number) => {
    const line = segment.lines?.[i];
    const el = audioRef.current;
    if (!line || !el) return;
    el.currentTime = line.start;
    void el.play().catch(() => {});
  };

  const span = revealed ? question.transcriptAnswerSpan : undefined;
  const duration = Math.max(0.1, segment.speechEnd - segment.start);
  const pct = Math.max(0, Math.min(100, ((time - segment.start) / duration) * 100));

  if (loadError) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3.5 mb-4 text-xs font-semibold text-amber-800 dark:text-amber-300">
        {loadError}
      </div>
    );
  }

  let lineOffset = 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-800/60 p-3.5 mb-4">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="hidden"
        />
      )}

      <div className="flex items-center gap-1.5 mb-2.5">
        <Headphones size={14} className="text-slate-400 dark:text-neutral-500" />
        <p className="text-[11px] font-extrabold text-slate-500 dark:text-neutral-400">
          Nghe lại câu này · tua thoải mái
          {!revealed && hintLevel === 2 && ' · đã mở nghe chậm'}
          {!revealed && hintLevel === 3 && ' · đã mở lời thoại'}
        </p>
      </div>

      {!src ? (
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-neutral-500 py-2">
          <Loader2 size={14} className="animate-spin" /> Đang tải file nghe… {Math.round(progress * 100)}%
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => seekTo(segment.start)}
              title="Nghe lại từ đầu câu"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-red-400 cursor-pointer"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => seekTo(time - 5)}
              title="Lùi 5 giây"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-red-400 cursor-pointer"
            >
              <Rewind size={15} />
            </button>
            <button
              onClick={togglePlay}
              title={playing ? 'Tạm dừng' : 'Phát'}
              className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer"
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>
            <button
              onClick={() => seekTo(time + 5)}
              title="Tới 5 giây"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-red-400 cursor-pointer"
            >
              <FastForward size={15} />
            </button>
            <span className="ml-auto text-[11px] font-mono font-bold tabular-nums text-slate-500 dark:text-neutral-400">
              {formatSec(time - segment.start)} / {formatSec(duration)}
            </span>
          </div>

          <div
            role="slider"
            aria-label="Vị trí trong đoạn nghe"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time - segment.start)}
            tabIndex={0}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seekTo(segment.start + ((e.clientX - rect.left) / rect.width) * duration);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') seekTo(time - 5);
              if (e.key === 'ArrowRight') seekTo(time + 5);
            }}
            className="mt-2.5 h-2 rounded-full bg-slate-200 dark:bg-neutral-700 overflow-hidden cursor-pointer"
          >
            <div className="h-full bg-indigo-500 dark:bg-red-500" style={{ width: `${pct}%` }} />
          </div>

          {showSlowTools && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              <Gauge size={13} className="text-slate-400 dark:text-neutral-500" />
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border cursor-pointer ${
                    speed === s
                      ? 'bg-slate-800 border-slate-800 text-white dark:bg-red-600 dark:border-red-600'
                      : 'bg-white border-slate-200 text-slate-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
                  }`}
                >
                  {s}×
                </button>
              ))}
              {showTranscript && loopLine !== null && (
                <button
                  onClick={() => setLoopLine(null)}
                  className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 cursor-pointer"
                >
                  <Repeat size={12} /> Đang lặp dòng {loopLine + 1} · bỏ lặp
                </button>
              )}
            </div>
          )}
        </>
      )}

      {showTranscript && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-neutral-700 space-y-1">
          {lines.map((line, i) => {
            const from = lineOffset;
            lineOffset += line.length + 1;
            const timing = segment.lines?.[i] ?? null;
            const isActive = playing && i === activeLine;
            const speaker = splitSpeaker(line);
            const body = speaker ? speaker[1] : line;
            const bodyFrom = speaker ? from + line.length - body.length : from;

            // Tô đoạn chứa căn cứ cho đáp án (chỉ sau khi đã xem đáp án).
            let content: React.ReactNode = body;
            if (span) {
              const a = Math.max(span[0], bodyFrom) - bodyFrom;
              const b = Math.min(span[1], bodyFrom + body.length) - bodyFrom;
              if (a < b) {
                content = (
                  <>
                    {body.slice(0, a)}
                    <mark className="bg-emerald-200/80 text-emerald-950 dark:bg-emerald-800/60 dark:text-emerald-100 rounded px-0.5">
                      {body.slice(a, b)}
                    </mark>
                    {body.slice(b)}
                  </>
                );
              }
            }

            return (
              <div
                key={i}
                className={`group flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm leading-relaxed transition-colors ${
                  isActive ? 'bg-indigo-100/70 dark:bg-red-950/40' : ''
                }`}
              >
                {speaker && (
                  <span className="shrink-0 mt-0.5 text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 dark:bg-neutral-700 dark:text-neutral-300">
                    {speaker[0]}
                  </span>
                )}
                <button
                  disabled={!timing}
                  onClick={() => playLine(i)}
                  title={timing ? 'Nghe dòng này' : undefined}
                  className={`text-left font-semibold text-slate-700 dark:text-neutral-200 ${timing ? 'cursor-pointer hover:text-indigo-700 dark:hover:text-red-300' : 'cursor-default'}`}
                >
                  {content}
                </button>
                {timing && (
                  <button
                    onClick={() => {
                      setLoopLine(loopLine === i ? null : i);
                      playLine(i);
                    }}
                    title="Lặp lại dòng này"
                    className={`shrink-0 ml-auto p-1 rounded cursor-pointer ${
                      loopLine === i
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-600 dark:text-neutral-600 dark:hover:text-neutral-300'
                    }`}
                  >
                    <Repeat size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {onHintLevelChange && !revealed && hintLevel < 3 && (
        <button
          onClick={() => onHintLevelChange((hintLevel + 1) as HintLevel)}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-slate-300 text-[11px] font-extrabold text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:border-neutral-600 dark:text-neutral-400 dark:hover:text-red-400 dark:hover:border-red-800 cursor-pointer"
        >
          {hintLevel === 1 ? (
            <>
              <Gauge size={13} /> Nghe lại vẫn chưa ra? Mở nghe chậm & lặp đoạn
            </>
          ) : (
            <>
              <Eye size={13} /> Vẫn chưa ra? Xem lời thoại (chưa có đáp án)
            </>
          )}
        </button>
      )}
    </div>
  );
};
