/**
 * Kho tiến độ học tập của toàn ứng dụng: trạng thái SRS từng thẻ, chuỗi ngày học, thống kê
 * theo ngày, phiên học đang dở, lịch sử làm đề và vài tuỳ chọn cá nhân.
 *
 * Tiến độ tách riêng theo TỪNG TÀI KHOẢN, ở cả hai tầng lưu trữ:
 *
 * - localStorage: khách chưa đăng nhập ghi vào khoá `progress`; mỗi tài khoản ghi vào khoá
 *   riêng `progress:u:<id>`. Nhờ vậy hai người dùng chung một máy (hoặc một người đăng
 *   xuất rồi người khác đăng nhập) không ghi đè lịch ôn của nhau — đây là lý do khoá lưu
 *   trữ là một biến chứ không còn là hằng số như bản một-người-dùng trước đây.
 * - server: xem api/progress.ts, khoá KV gắn với id lấy từ cookie đã ký.
 *
 * Vẫn KHÔNG bắt đăng nhập: học "khách" là mặc định, đăng nhập chỉ thêm phần đồng bộ.
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
import { useAuth } from './useAuth';
import { progressApi } from '../lib/api';
import { mergeProgress } from '../lib/progressSync';

/** Khoá localStorage của người chưa đăng nhập. Cũng chính là khoá của bản một-người-dùng
 * cũ, nên tiến độ đang có trên máy vẫn được đọc lên bình thường sau khi cập nhật. */
const GUEST_STORE_KEY = 'progress';

/** Mỗi tài khoản một khoá riêng — xem ghi chú đầu file. */
function storeKeyFor(userId: string | null): string {
  return userId ? `progress:u:${userId}` : GUEST_STORE_KEY;
}

const SAVE_DEBOUNCE_MS = 400;
/** Chờ lâu hơn debounce ghi localStorage — mạng chậm hơn đĩa, và không cần đồng bộ
 * server ngay từng phím bấm. */
const PUSH_DEBOUNCE_MS = 1500;

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
  practiceMode: 'default' | 'write-kanji' | 'type-reading';
  /** Đảo thứ tự phương án trắc nghiệm khi luyện tập. */
  shuffleChoices: boolean;
}

export interface ProgressData {
  version: 1;
  cards: Record<string, CardState>;
  daily: Record<string, DailyStat>;
  streak: { current: number; longest: number; lastDay: string };
  settings: ProgressSettings;
  session: SavedSession | null;
  exams: ExamResult[];
  /** Mốc thời gian (client) của lần thay đổi cục bộ gần nhất — dùng để so khớp khi
   * hợp nhất với bản trên server, xem src/lib/progressSync.ts. Không phải dữ liệu
   * người dùng, chỉ phục vụ đồng bộ. */
  _localSavedAt: number;
  /** _serverUpdatedAt mới nhất mà máy này đã biết — để phân biệt "server chưa đổi gì
   * kể từ lần mình đồng bộ trước" với "có máy khác vừa ghi đè lên trên". */
  _syncedServerUpdatedAt: number | null;
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
    _localSavedAt: 0,
    _syncedServerUpdatedAt: null,
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

/** Gộp dữ liệu đọc từ đĩa (hoặc từ server) với mặc định, phòng khi bản cũ thiếu trường. */
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
    _localSavedAt: typeof raw._localSavedAt === 'number' ? raw._localSavedAt : 0,
    _syncedServerUpdatedAt:
      typeof raw._syncedServerUpdatedAt === 'number' ? raw._syncedServerUpdatedAt : null,
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
  /** Trạng thái đồng bộ với server — chỉ có ý nghĩa khi đã đăng nhập (mục "Nối
   * useProgress.tsx"); người chưa đăng nhập luôn thấy 'idle', đúng hành vi cũ. */
  syncState: 'idle' | 'syncing' | 'synced' | 'error';
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const storeKey = storeKeyFor(userId);

  const [data, setData] = useState<ProgressData>(() =>
    // Lúc mới mở app chưa biết ai đang đăng nhập (còn đang hỏi /api/auth/status), nên bắt
    // đầu bằng dữ liệu khách; khi biết được tài khoản thì hiệu ứng đổi khoá bên dưới nạp
    // lại đúng tiến độ của người đó.
    hydrate(readJSON<ProgressData | null>(GUEST_STORE_KEY, null))
  );
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistent = useMemo(() => isPersistent(), []);
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Luôn đọc được data mới nhất bên trong effect mà không phải liệt kê `data` vào deps
  // (tránh effect đồng bộ chạy lại mỗi lần data đổi — chỉ nên chạy khi authenticated đổi).
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  /** Mọi thay đổi THẬT SỰ do người dùng gây ra phải qua đây để đóng dấu _localSavedAt —
   * dấu thời gian này là căn cứ để hợp nhất với server (progressSync.ts) khi phát hiện
   * server có bản khác. Việc server đẩy dữ liệu VỀ (pull/merge) không đi qua đây. */
  const setDataTouched = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setData((prev) => ({ ...updater(prev), _localSavedAt: Date.now() }));
  }, []);

  /**
   * Đổi tài khoản (đăng nhập, đăng xuất, hoặc người khác đăng nhập trên cùng máy này):
   * cất tiến độ đang giữ vào đúng khoá CŨ rồi nạp tiến độ của khoá MỚI.
   *
   * Bỏ bước này thì tiến độ của người vừa đăng xuất sẽ theo chân người tiếp theo — đúng
   * cái lỗi mà việc tách theo tài khoản sinh ra để tránh.
   */
  const activeStoreKeyRef = useRef(storeKey);
  /** Tiến độ "khách" chờ được nhận làm vốn ban đầu cho một tài khoản còn trắng — xem
   * hiệu ứng đối chiếu server bên dưới, chỗ duy nhất đủ thông tin để quyết định. */
  const seedRef = useRef<ProgressData | null>(null);

  useEffect(() => {
    const prevKey = activeStoreKeyRef.current;
    if (prevKey === storeKey) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    writeJSON(prevKey, dataRef.current);
    activeStoreKeyRef.current = storeKey;

    const stored = readJSON<ProgressData | null>(storeKey, null);
    // Máy này chưa từng lưu gì cho tài khoản vừa đăng nhập: giữ lại tiến độ khách để cân
    // nhắc chuyển sang cho họ, nhưng chỉ khi server cũng chưa có gì (tài khoản hoàn toàn
    // mới). Nếu tài khoản đã có dữ liệu trên server thì KHÔNG trộn tiến độ "khách" vào —
    // trên máy dùng chung, người học ở chế độ khách có thể là người khác. Dữ liệu khách
    // không mất đi trong ca đó: nó vẫn nằm nguyên ở khoá `progress`, đăng xuất là thấy
    // lại, hoặc dùng Xuất/Nạp tiến độ để tự chuyển sang tài khoản nếu đúng là của mình.
    seedRef.current =
      !stored && prevKey === GUEST_STORE_KEY && Object.keys(dataRef.current.cards).length > 0
        ? dataRef.current
        : null;

    didInitialSyncRef.current = false;
    setSyncState('idle');
    setData(hydrate(stored));
  }, [storeKey]);

  // Ghi xuống đĩa có debounce: một phiên flashcard có thể sinh hàng chục lần cập nhật liên tiếp.
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      writeJSON(storeKey, data);
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [data, storeKey]);

  // Đóng tab giữa chừng vẫn phải giữ được tiến độ vừa học.
  useEffect(() => {
    const flush = () => writeJSON(storeKey, data);
    window.addEventListener('pagehide', flush);
    return () => window.removeEventListener('pagehide', flush);
  }, [data, storeKey]);

  // Chữ ký nội dung "có ý nghĩa" (không tính hai trường bookkeeping _localSavedAt/
  // _syncedServerUpdatedAt) — dùng làm dependency cho việc đẩy lên server. Nếu dùng
  // thẳng `data` làm dependency thì sau khi đẩy xong, việc cập nhật _syncedServerUpdatedAt
  // sẽ tự kích hoạt effect chạy lại, đẩy lại, cập nhật timestamp mới, đẩy lại... lặp vô hạn.
  const contentSignature = useMemo(
    () =>
      JSON.stringify({
        cards: data.cards,
        daily: data.daily,
        streak: data.streak,
        settings: data.settings,
        session: data.session,
        exams: data.exams,
      }),
    [data.cards, data.daily, data.streak, data.settings, data.session, data.exams]
  );

  // Đánh dấu đã đối chiếu lần đầu với server cho TÀI KHOẢN HIỆN TẠI chưa — hiệu ứng đẩy
  // lên (bên dưới) phải chờ cờ này, nếu không nó sẽ đẩy tiến độ của người vừa đăng xuất
  // lên tài khoản vừa đăng nhập, trước cả khi biết trên server đang có gì.
  const didInitialSyncRef = useRef(false);
  /** Tăng sau mỗi lần đối chiếu đầu tiên xong, để đánh thức hiệu ứng đẩy lên ngay cả khi
   * nội dung không đổi (ví dụ tài khoản mới: server trống, cần đẩy bản đầu tiên lên). */
  const [syncEpoch, setSyncEpoch] = useState(0);

  // Khi biết mình là ai (đăng nhập, hoặc mở lại web với cookie còn hạn): đối chiếu một lần
  // với server. Chỉ chạy theo `userId`, không chạy lại mỗi khi data đổi.
  useEffect(() => {
    if (!userId) {
      setSyncState('idle');
      return;
    }
    let cancelled = false;

    setSyncState('syncing');
    progressApi
      .get()
      .then((server) => {
        if (cancelled) return;

        if (!server) {
          // Tài khoản chưa có gì trên server. Nếu người này vừa đăng ký ngay trên máy đang
          // học ở chế độ khách thì mang luôn tiến độ khách sang làm vốn ban đầu — không thì
          // họ sẽ tưởng mình vừa mất sạch lịch ôn chỉ vì tạo tài khoản.
          const seed = seedRef.current;
          if (seed) setData({ ...seed, _syncedServerUpdatedAt: null });
          setSyncState('synced');
          return;
        }

        setData((prev) => {
          if (prev._syncedServerUpdatedAt === server._serverUpdatedAt) {
            // Server chưa đổi gì kể từ lần đồng bộ trước của máy này -> không có gì để kéo.
            return prev;
          }
          const serverData = hydrate(server as Partial<ProgressData>);
          const merged = mergeProgress(prev, serverData, server._serverUpdatedAt);
          return { ...merged, _syncedServerUpdatedAt: server._serverUpdatedAt ?? null };
        });
        setSyncState('synced');
      })
      .catch(() => {
        if (!cancelled) setSyncState('error');
      })
      .finally(() => {
        if (cancelled) return;
        seedRef.current = null;
        didInitialSyncRef.current = true;
        // Đánh thức hiệu ứng đẩy lên để bản vừa hợp nhất (hoặc bản đầu tiên của tài khoản
        // mới) được ghi lên server, kể cả khi chữ ký nội dung không đổi.
        setSyncEpoch((e) => e + 1);
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Sau mỗi thay đổi có ý nghĩa, nếu đã đăng nhập thì đẩy lên server (debounce, vì mạng
  // chậm hơn ghi đĩa và không cần đồng bộ ngay từng phím bấm).
  useEffect(() => {
    if (!userId) return;
    if (!didInitialSyncRef.current) return; // để effect đối chiếu ở trên lo lượt đầu tiên
    if (pushTimer.current) clearTimeout(pushTimer.current);

    pushTimer.current = setTimeout(() => {
      progressApi
        .put(dataRef.current)
        .then((res) => {
          setData((prev) =>
            prev._syncedServerUpdatedAt === res.updatedAt
              ? prev
              : { ...prev, _syncedServerUpdatedAt: res.updatedAt }
          );
          setSyncState('synced');
        })
        .catch(() => setSyncState('error'));
    }, PUSH_DEBOUNCE_MS);

    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cố ý dùng chữ ký nội dung, xem ghi chú ở contentSignature
  }, [contentSignature, userId, syncEpoch]);

  const recordReview = useCallback((key: string, correct: boolean) => {
    const now = Date.now();
    const day = todayKey();
    setDataTouched((prev) => {
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
  }, [setDataTouched]);

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
    setDataTouched((prev) => ({ ...prev, session }));
  }, [setDataTouched]);

  const clearSession = useCallback(() => {
    setDataTouched((prev) => (prev.session === null ? prev : { ...prev, session: null }));
  }, [setDataTouched]);

  const recordExam = useCallback((result: ExamResult) => {
    // Giữ 50 lần thi gần nhất là đủ cho biểu đồ tiến bộ mà không phình localStorage.
    setDataTouched((prev) => ({ ...prev, exams: [result, ...prev.exams].slice(0, 50) }));
  }, [setDataTouched]);

  const updateSettings = useCallback((patch: Partial<ProgressSettings>) => {
    setDataTouched((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, [setDataTouched]);

  const exportData = useCallback(() => JSON.stringify(data, null, 2), [data]);

  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed || typeof parsed !== 'object' || typeof parsed.cards !== 'object') {
        return { ok: false, message: 'File không đúng định dạng tiến độ NihonIT.' };
      }
      const next = hydrate(parsed);
      setDataTouched(() => next);
      writeJSON(storeKey, next);
      const count = Object.keys(next.cards).length;
      return { ok: true, message: `Đã nạp tiến độ của ${count} thẻ.` };
    } catch {
      return { ok: false, message: 'Không đọc được file JSON.' };
    }
  }, [setDataTouched, storeKey]);

  const resetAll = useCallback(() => {
    removeKey(storeKey);
    // Đi qua setDataTouched (không phải setData thẳng) để nếu đã đăng nhập, việc reset
    // cũng được đẩy lên server — nếu không, lần đồng bộ kế tiếp sẽ kéo dữ liệu cũ về,
    // vô hiệu hoá thao tác reset vừa làm.
    setDataTouched(() => emptyData());
  }, [setDataTouched, storeKey]);

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
      syncState,
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
      syncState,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress phải được dùng bên trong <ProgressProvider>');
  return ctx;
}
