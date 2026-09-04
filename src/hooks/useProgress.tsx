/**
 * Kho tiến độ học tập của toàn ứng dụng.
 *
 * Mọi thứ được lưu vào localStorage dưới một khoá duy nhất và không cần đăng nhập:
 * trạng thái SRS từng thẻ, chuỗi ngày học, thống kê theo ngày, phiên học đang dở,
 * lịch sử làm đề và vài tuỳ chọn cá nhân.
 */

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { readJSON, writeJSON, removeKey, isPersistent } from '../lib/storage';
import { review as srsReview, isDue, isMature } from '../lib/srs';
import type { CardState } from '../lib/srs';
import { itemByKey, subjectIdFromKey } from '../lib/itemIndex';
import { totalItemsOf } from '../data/subjectMeta';

const STORE_KEY = 'progress';
const SAVE_DEBOUNCE_MS = 400;

export interface DailyStat {
  reviews: number;
  correct: number;
}

/** Phiên học đang dở, để khôi phục sau khi đóng tab. */
export interface SavedSession {
  /** Chữ ký của route sinh ra phiên này — chỉ khôi phục khi người dùng quay lại đúng chỗ cũ. */
  signature: string;
  subjectId: string;
  keys: string[];
  index: number;
  correct: number;
  incorrect: number;
  wrongKeys: string[];
  savedAt: number;
}

export interface ExamResult {
  id: string;
  subjectId: string;
  examTags: string[];
  qType: string;
  total: number;
  correct: number;
  /** Thời gian làm bài thực tế, tính bằng giây. */
  elapsedSec: number;
  durationMin: number;
  finishedAt: number;
  /** Đáp án đã chọn theo khoá thẻ, để xem lại bài đã nộp. */
  answers: Record<string, string>;
  order: string[];
}

export interface ProgressSettings {
  ttsAutoplay: boolean;
  ttsRate: number;
  /** Số thẻ mới tối đa đưa vào một phiên ôn theo SRS. */
  dailyNewLimit: number;
  /** Kiểu hiển thị mặt trước thẻ từ vựng, ghi nhớ giữa các phiên. */
  practiceMode: 'default' | 'write-kanji';
  /** Đảo thứ tự phương án trắc nghiệm khi luyện tập. */
  shuffleChoices: boolean;
}

interface ProgressData {
  version: 1;
  cards: Record<string, CardState>;
  daily: Record<string, DailyStat>;
  streak: { current: number; longest: number; lastDay: string };
  settings: ProgressSettings;
  session: SavedSession | null;
  exams: ExamResult[];
}

const DEFAULT_SETTINGS: ProgressSettings = {
  ttsAutoplay: false,
  ttsRate: 0.9,
  dailyNewLimit: 20,
  practiceMode: 'default',
  shuffleChoices: true,
};

function emptyData(): ProgressData {
  return {
    version: 1,
    cards: {},
    daily: {},
    streak: { current: 0, longest: 0, lastDay: '' },
    settings: { ...DEFAULT_SETTINGS },
    session: null,
    exams: [],
  };
}

/** Ngày local dạng YYYY-MM-DD (không dùng UTC để chuỗi ngày khớp với cảm nhận người dùng). */
function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayBefore(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() - 1);
  return todayKey(dt);
}

/** Gộp dữ liệu đọc từ đĩa với mặc định, phòng khi bản cũ thiếu trường. */
function hydrate(raw: Partial<ProgressData> | null): ProgressData {
  const base = emptyData();
  if (!raw || typeof raw !== 'object') return base;
  return {
    version: 1,
    cards: raw.cards && typeof raw.cards === 'object' ? raw.cards : base.cards,
    daily: raw.daily && typeof raw.daily === 'object' ? raw.daily : base.daily,
    streak: { ...base.streak, ...(raw.streak || {}) },
    settings: { ...base.settings, ...(raw.settings || {}) },
    session: raw.session ?? null,
    exams: Array.isArray(raw.exams) ? raw.exams : [],
  };
}

export interface SubjectStats {
  total: number;
  studied: number;
  mature: number;
  due: number;
  newCards: number;
  wrong: number;
}

interface ProgressContextValue {
  data: ProgressData;
  persistent: boolean;
  /** Ghi nhận một lần trả lời và cập nhật lịch ôn của thẻ. */
  recordReview: (key: string, correct: boolean) => void;
  getCard: (key: string) => CardState | undefined;
  /** Các thẻ đến hạn ôn, cộng thêm một ít thẻ mới, giới hạn theo cài đặt. */
  buildReviewQueue: (subjectId: string | 'all', limit?: number) => string[];
  /** Các thẻ từng trả lời sai, mới sai gần đây xếp trước. */
  buildMistakeQueue: (subjectId: string | 'all') => string[];
  statsFor: (subjectId: string | 'all') => SubjectStats;
  dueCount: (subjectId: string | 'all') => number;
  todayStat: DailyStat;
  saveSession: (session: SavedSession | null) => void;
  clearSession: () => void;
  recordExam: (result: ExamResult) => void;
  updateSettings: (patch: Partial<ProgressSettings>) => void;
  exportData: () => string;
  importData: (json: string) => { ok: boolean; message: string };
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ProgressData>(() => hydrate(readJSON<ProgressData | null>(STORE_KEY, null)));
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistent = useMemo(() => isPersistent(), []);

  // Ghi xuống đĩa có debounce: một phiên flashcard có thể sinh hàng chục lần cập nhật liên tiếp.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      writeJSON(STORE_KEY, data);
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [data]);

  // Đóng tab giữa chừng vẫn phải giữ được tiến độ vừa học.
  useEffect(() => {
    const flush = () => writeJSON(STORE_KEY, data);
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [data]);

  const recordReview = useCallback((key: string, correct: boolean) => {
    const now = Date.now();
    const day = todayKey();
    setData((prev) => {
      const card = srsReview(prev.cards[key], correct, now);
      const prevDay = prev.daily[day] || { reviews: 0, correct: 0 };

      let streak = prev.streak;
      if (prev.streak.lastDay !== day) {
        const continued = prev.streak.lastDay === dayBefore(day);
        const current = continued ? prev.streak.current + 1 : 1;
        streak = {
          current,
          longest: Math.max(prev.streak.longest, current),
          lastDay: day,
        };
      }

      return {
        ...prev,
        cards: { ...prev.cards, [key]: card },
        daily: {
          ...prev.daily,
          [day]: { reviews: prevDay.reviews + 1, correct: prevDay.correct + (correct ? 1 : 0) },
        },
        streak,
      };
    });
  }, []);

  const getCard = useCallback((key: string) => data.cards[key], [data.cards]);

  const buildReviewQueue = useCallback(
    (subjectId: string | 'all', limit?: number) => {
      const now = Date.now();
      const due: { key: string; due: number }[] = [];

      // Thẻ đến hạn suy ra được từ tiến độ đã lưu, không cần dữ liệu bài học.
      for (const [key, card] of Object.entries(data.cards)) {
        if (subjectId !== 'all' && subjectIdFromKey(key) !== subjectId) continue;
        if (isDue(card, now)) due.push({ key, due: card.due });
      }
      // Thẻ quá hạn lâu nhất được ưu tiên trước.
      due.sort((a, b) => a.due - b.due);

      // Thẻ mới thì phải tra chỉ mục, nên chỉ lấy được từ các môn đã nạp dữ liệu.
      const fresh: string[] = [];
      const newLimit = data.settings.dailyNewLimit;
      for (const [key, entry] of itemByKey) {
        if (fresh.length >= newLimit) break;
        if (subjectId !== 'all' && entry.subjectId !== subjectId) continue;
        if (!data.cards[key]) fresh.push(key);
      }

      const queue = due.map((d) => d.key);
      queue.push(...fresh);
      return typeof limit === 'number' ? queue.slice(0, limit) : queue;
    },
    [data.cards, data.settings.dailyNewLimit]
  );

  const buildMistakeQueue = useCallback(
    (subjectId: string | 'all') => {
      const rows: { key: string; last: number; wrong: number }[] = [];
      for (const [key, card] of Object.entries(data.cards)) {
        if (card.wrong === 0) continue;
        // Lọc theo mã môn nằm ngay trong khoá, nhờ vậy không phụ thuộc vào việc đã nạp dữ liệu.
        if (subjectId !== 'all' && subjectIdFromKey(key) !== subjectId) continue;
        rows.push({ key, last: card.last, wrong: card.wrong });
      }
      // Sai nhiều nhất lên đầu, cùng số lần sai thì lấy câu vừa sai gần đây.
      rows.sort((a, b) => b.wrong - a.wrong || b.last - a.last);
      return rows.map((r) => r.key);
    },
    [data.cards]
  );

  const statsFor = useCallback(
    (subjectId: string | 'all'): SubjectStats => {
      const now = Date.now();
      // Tổng số mục lấy từ metadata tĩnh nên trang chủ không cần nạp dữ liệu môn nào.
      const total = totalItemsOf(subjectId);
      let studied = 0;
      let mature = 0;
      let due = 0;
      let wrong = 0;

      for (const [key, card] of Object.entries(data.cards)) {
        if (subjectId !== 'all' && subjectIdFromKey(key) !== subjectId) continue;
        studied += 1;
        if (isMature(card)) mature += 1;
        if (isDue(card, now)) due += 1;
        if (card.wrong > 0) wrong += 1;
      }

      return {
        total,
        studied,
        mature,
        due,
        // Tiến độ cũ có thể trỏ tới câu đã bị gỡ khỏi giáo trình, đừng để ra số âm.
        newCards: Math.max(0, total - studied),
        wrong,
      };
    },
    [data.cards]
  );

  const dueCount = useCallback(
    (subjectId: string | 'all') => statsFor(subjectId).due,
    [statsFor]
  );

  const todayStat = useMemo(
    () => data.daily[todayKey()] || { reviews: 0, correct: 0 },
    [data.daily]
  );

  const saveSession = useCallback((session: SavedSession | null) => {
    setData((prev) => ({ ...prev, session }));
  }, []);

  const clearSession = useCallback(() => {
    setData((prev) => (prev.session === null ? prev : { ...prev, session: null }));
  }, []);

  const recordExam = useCallback((result: ExamResult) => {
    // Giữ 50 lần thi gần nhất là đủ cho biểu đồ tiến bộ mà không phình localStorage.
    setData((prev) => ({ ...prev, exams: [result, ...prev.exams].slice(0, 50) }));
  }, []);

  const updateSettings = useCallback((patch: Partial<ProgressSettings>) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const exportData = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed || typeof parsed !== 'object' || typeof parsed.cards !== 'object') {
        return { ok: false, message: 'File không đúng định dạng tiến độ NihonIT.' };
      }
      const next = hydrate(parsed);
      setData(next);
      writeJSON(STORE_KEY, next);
      const count = Object.keys(next.cards).length;
      return { ok: true, message: `Đã nạp tiến độ của ${count} thẻ.` };
    } catch {
      return { ok: false, message: 'Không đọc được file JSON.' };
    }
  }, []);

  const resetAll = useCallback(() => {
    removeKey(STORE_KEY);
    setData(emptyData());
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      data,
      persistent,
      recordReview,
      getCard,
      buildReviewQueue,
      buildMistakeQueue,
      statsFor,
      dueCount,
      todayStat,
      saveSession,
      clearSession,
      recordExam,
      updateSettings,
      exportData,
      importData,
      resetAll,
    }),
    [
      data,
      persistent,
      recordReview,
      getCard,
      buildReviewQueue,
      buildMistakeQueue,
      statsFor,
      dueCount,
      todayStat,
      saveSession,
      clearSession,
      recordExam,
      updateSettings,
      exportData,
      importData,
      resetAll,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress phải được dùng bên trong <ProgressProvider>');
  return ctx;
}
