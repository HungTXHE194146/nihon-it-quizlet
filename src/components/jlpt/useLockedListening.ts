import { useCallback, useEffect, useRef, useState } from 'react';
import type { JlptAudioTrack } from '../../lib/jlpt/schema';
import { audioObjectUrl, entryAt, type TimelineEntry } from '../../lib/jlpt/audio';

export type ListeningLoad = 'idle' | 'loading' | 'ready' | 'error';

interface Options {
  track: JlptAudioTrack | null;
  /** Các câu của lượt này trên file nghe, theo thời gian (audio.ts → buildTimeline). */
  timeline: TimelineEntry[];
  /** Đoạn file được phát trong lượt này, [từ, tới] giây (audio.ts → listeningRange). */
  range: [number, number];
  /** Bắt đầu tải file ngay — nên bật từ lúc hiện màn chuẩn bị, để lúc bấm "Bắt đầu" là phát được. */
  enabled: boolean;
  onEnterQuestion: (questionId: string) => void;
  /** Mốc an toàn để phát tiếp nếu bị gián đoạn: đầu câu đang nghe, hoặc cuối câu vừa nghe xong. */
  onCheckpoint: (resumeAt: number) => void;
  onFinished: () => void;
}

/**
 * Phát file nghe ở CHẾ ĐỘ THI: một lần, liền mạch, không tua, không đổi tốc độ.
 *
 * Không có thanh tua trên giao diện là chưa đủ — điện thoại vẫn tua được bằng nút trên màn khoá,
 * tai nghe bluetooth, phím media. Hook này chặn ở tầng phần tử <audio>: mọi cú tua không do chính
 * nó thực hiện đều bị kéo về mốc hợp lệ gần nhất, tốc độ luôn bị đặt lại 1×.
 *
 * Bị dừng ngoài ý muốn (rút tai nghe, cuộc gọi đến) thì KHÔNG tự phát tiếp: báo `interrupted`
 * để màn hình hỏi người học, và phát lại từ `onCheckpoint` gần nhất — phát nối giữa một đoạn hội
 * thoại thì nghe cũng không trả lời được.
 */
export function useLockedListening({ track, timeline, range, enabled, onEnterQuestion, onCheckpoint, onFinished }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [load, setLoad] = useState<ListeningLoad>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const [time, setTime] = useState(range[0]);
  const [playing, setPlaying] = useState(false);
  const [interrupted, setInterrupted] = useState(false);
  const [finished, setFinished] = useState(false);

  // Cờ cho biết lần tua/dừng sắp tới là do chính hook gây ra, không phải người dùng/hệ điều hành.
  const internalSeek = useRef(false);
  const internalPause = useRef(false);
  const allowedTime = useRef(range[0]);

  // Callback và dữ liệu mới nhất, đọc qua ref để không phải gỡ/gắn lại listener mỗi lần render.
  const latest = useRef({ timeline, range, onEnterQuestion, onCheckpoint, onFinished });
  useEffect(() => {
    latest.current = { timeline, range, onEnterQuestion, onCheckpoint, onFinished };
  });

  useEffect(() => {
    if (!enabled || !track) return;
    let cancelled = false;
    setLoad('loading');
    setError(null);
    audioObjectUrl(track, (loaded, total) => {
      if (!cancelled) setProgress(total > 0 ? loaded / total : 0);
    })
      .then((url) => {
        if (cancelled) return;
        const el = new Audio();
        el.preload = 'auto';
        el.src = url;
        audioRef.current = el;
        setProgress(1);
        setLoad('ready');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Không tải được file nghe.');
        setLoad('error');
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, track, retryNonce]);

  useEffect(() => {
    const el = audioRef.current;
    if (load !== 'ready' || !el) return;

    let lastEntryId: string | null = null;
    let lastCheckpoint = -1;

    const finish = () => {
      if (el.dataset.finished) return;
      el.dataset.finished = '1';
      internalPause.current = true;
      el.pause();
      setFinished(true);
      setPlaying(false);
      latest.current.onFinished();
    };

    const onTimeUpdate = () => {
      const t = el.currentTime;
      if (!el.seeking) allowedTime.current = t;
      setTime(t);

      const { timeline: tl, range: [from, to] } = latest.current;
      const entry = entryAt(tl, t);
      if (entry && entry.questionId !== lastEntryId) {
        lastEntryId = entry.questionId;
        latest.current.onEnterQuestion(entry.questionId);
      }
      const checkpoint = entry ? (t >= entry.segment.end ? entry.segment.end : entry.segment.start) : from;
      if (checkpoint !== lastCheckpoint) {
        lastCheckpoint = checkpoint;
        latest.current.onCheckpoint(checkpoint);
      }
      if (t >= to - 0.05) finish();
    };

    const onSeeking = () => {
      if (internalSeek.current) {
        internalSeek.current = false;
        return;
      }
      if (Math.abs(el.currentTime - allowedTime.current) > 0.5) {
        internalSeek.current = true;
        el.currentTime = allowedTime.current;
      }
    };

    const onRateChange = () => {
      if (el.playbackRate !== 1) el.playbackRate = 1;
    };

    const onPause = () => {
      setPlaying(false);
      if (internalPause.current) {
        internalPause.current = false;
        return;
      }
      if (!el.dataset.finished) setInterrupted(true);
    };

    const onPlay = () => {
      setPlaying(true);
      setInterrupted(false);
    };

    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('seeking', onSeeking);
    el.addEventListener('ratechange', onRateChange);
    el.addEventListener('pause', onPause);
    el.addEventListener('play', onPlay);
    el.addEventListener('ended', finish);

    // Nút tua/chuyển bài trên màn khoá và tai nghe: gắn hàm rỗng để hệ điều hành không tự tua.
    const blockedActions: MediaSessionAction[] = ['seekbackward', 'seekforward', 'seekto', 'previoustrack', 'nexttrack'];
    const session = 'mediaSession' in navigator ? navigator.mediaSession : null;
    for (const action of blockedActions) {
      try {
        session?.setActionHandler(action, () => {});
      } catch {
        // Trình duyệt không hỗ trợ hành động này — không có gì để chặn.
      }
    }

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('seeking', onSeeking);
      el.removeEventListener('ratechange', onRateChange);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('ended', finish);
      for (const action of blockedActions) {
        try {
          session?.setActionHandler(action, null);
        } catch {
          // như trên
        }
      }
    };
  }, [load]);

  // Nộp bài giữa chừng (tắt `enabled`) hoặc rời màn hình thì dừng hẳn — không để băng chạy ngầm.
  useEffect(() => {
    const el = audioRef.current;
    if (enabled || !el || el.paused) return;
    internalPause.current = true;
    el.pause();
  }, [enabled]);

  useEffect(
    () => () => {
      const el = audioRef.current;
      if (el && !el.paused) {
        internalPause.current = true;
        el.pause();
      }
    },
    []
  );

  /** Phát từ giây `at`. Phải gọi trong một thao tác bấm của người dùng (chính sách tự phát của trình duyệt). */
  const playFrom = useCallback(async (at: number) => {
    const el = audioRef.current;
    if (!el) return;
    internalSeek.current = Math.abs(el.currentTime - at) > 0.01;
    el.currentTime = at;
    allowedTime.current = at;
    el.playbackRate = 1;
    delete el.dataset.finished;
    setFinished(false);
    setTime(at);
    try {
      await el.play();
    } catch {
      setInterrupted(true);
    }
  }, []);

  /** Dừng có chủ đích (người học bấm Thoát → Tạm dừng). */
  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el || el.paused) return;
    internalPause.current = true;
    el.pause();
  }, []);

  /** Thử loa ~2 giây ở đầu file, rồi trả về đầu. Không lộ nội dung câu hỏi: đầu băng là lời giới thiệu. */
  const testSound = useCallback(async () => {
    const el = audioRef.current;
    if (!el || !el.paused) return;
    internalSeek.current = true;
    el.currentTime = 0;
    try {
      await el.play();
    } catch {
      return;
    }
    window.setTimeout(() => {
      internalPause.current = true;
      el.pause();
      internalSeek.current = true;
      el.currentTime = 0;
      allowedTime.current = 0;
      setTime(0);
    }, 2200);
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, volume));
  }, []);

  const retry = useCallback(() => setRetryNonce((n) => n + 1), []);

  return { load, progress, error, retry, time, playing, interrupted, finished, playFrom, stop, testSound, setVolume };
}
