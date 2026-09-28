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
import { isJlptCardKey } from '../lib/jlpt/srsKey';
import { applyConfidenceMatrix } from '../lib/jlpt/attemptLogic';
import type { Confidence } from '../lib/jlpt/schema';
import { totalItemsOf, subjectInScope } from '../data/subjectMeta';
import type { SubjectScope } from '../data/subjectMeta';
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
  /**
   * Số thẻ được HỌC LẦN ĐẦU trong ngày (thẻ chưa từng có trạng thái SRS trước đó).
   *
   * Không suy ra được từ `cards` nên phải đếm ngay lúc ghi nhận: `card.seen === 1` chỉ đúng
   * cho tới khi thẻ được ôn lần hai, còn `reps`/`interval` thì bị reset mỗi lần trả lời sai.
   * Có con số này thì hạn mức thẻ mới mới thật sự là "mỗi NGÀY" — trước đây nó là "mỗi PHIÊN",
   * nghĩa là mở lại phiên ôn 5 lần trong ngày là nạp 5×20 thẻ mới.
   *
   * Bản tiến độ cũ không có trường này; mọi nơi đọc phải dùng `?? 0`.
   */
  newCards?: number;
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
  /**
   * Ngày thi mục tiêu, dạng `YYYY-MM-DD` theo lịch địa phương (ticket 013).
   *
   * Là gốc toạ độ của toàn bộ lộ trình ở `src/lib/roadmap.ts`: thiếu mốc này thì mọi lời
   * khuyên "hôm nay nên học bao nhiêu" đều tuỳ tiện, không phân biệt được người còn 3 tháng
   * với người còn 3 ngày. Người học sửa được bất cứ lúc nào ở trang chủ.
   */
  examDate?: string;
  /**
   * Hiện furigana trên chữ Hán khó lúc làm bài JLPT (ticket 012).
   *
   * Mặc định TẮT: tài liệu thiết kế (mục 8.6, docs/jlpt-practice-test-research.md) khuyến nghị
   * "Furigana cố định theo cấp -> Cho tắt/bật" — người ôn N3 đọc được phần lớn chữ Hán trong đề,
   * bật sẵn cho mọi câu chỉ gây rối mắt. Bật lên khi cần thì nhớ cho các màn JLPT khác luôn
   * (phòng thi, mổ xẻ, sổ tay lỗi) vì đây là một cài đặt chung, không phải bật riêng từng màn.
   */
  jlptFuriganaEnabled?: boolean;
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
  // Kỳ thi JLPT tháng 12/2026. Đặt sẵn để lộ trình chạy được ngay từ lần mở đầu tiên thay vì
  // bắt người học cấu hình trước khi thấy được gì; đổi lại ở trang chủ nếu thi ngày khác.
  examDate: '2026-12-05',
  jlptFuriganaEnabled: false,
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

/**
 * Rải thẻ mới ĐỀU khắp hàng đợi thẻ đến hạn, thay vì nối hết vào đuôi.
 *
 * Nối vào đuôi nghe có vẻ hợp lý ("ôn xong nợ cũ rồi mới học cái mới") nhưng trong thực tế
 * nó khiến phần học mới không bao giờ tới lượt: mỗi thẻ trả lời sai được hẹn gặp lại sau 10
 * phút (`RELEARN_MS` trong srs.ts) nên đầu hàng đợi tự mọc lại sau mỗi phiên, còn người học
 * thì hiếm khi đi hết 100+ thẻ đến hạn trong một lần ngồi. Kết quả: mở app ngày nào cũng chỉ
 * thấy ôn lại thứ mình từng sai.
 *
 * Đánh đổi có ý thức: bỏ dở phiên giữa chừng thì số thẻ đến hạn ôn được ít hơn một chút
 * (20 thẻ đầu = 16 cũ + 4 mới thay vì 20 cũ). Đổi lại, MỌI phiên đều có phần học mới.
 */
function interleaveNew(due: string[], fresh: string[]): string[] {
  if (fresh.length === 0) return due;
  if (due.length === 0) return fresh;

  const out: string[] = [];
  const step = due.length / fresh.length; // khoảng cách trung bình giữa hai thẻ mới
  let nextAt = step;
  let f = 0;

  for (let i = 0; i < due.length; i++) {
    out.push(due[i]);
    while (f < fresh.length && i + 1 >= nextAt) {
      out.push(fresh[f]);
      f += 1;
      nextAt += step;
    }
  }
  while (f < fresh.length) {
    out.push(fresh[f]);
    f += 1;
  }
  return out;
}

const applyLimit = (queue: string[], limit?: number) =>
  typeof limit === 'number' ? queue.slice(0, limit) : queue;

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
  /**
   * Ghi nhận một lần trả lời và cập nhật lịch ôn của thẻ.
   *
   * `confidence` là tuỳ chọn: bỏ qua thì dùng nguyên `review()` (SM-2 chuẩn) như trước giờ —
   * mọi luồng ôn thẻ từ vựng/Kanji và lượt ôn JLPT thường (không hỏi lại độ chắc chắn) đều đi
   * đường này, hành vi không đổi. Chỉ lúc NỘP một lượt thi JLPT (đã thu độ chắc chắn lúc làm
   * bài) mới truyền vào, để áp ma trận độ chắc chắn × đúng-sai (ticket 006, mục 6.3/6.4).
   */
  recordReview: (key: string, correct: boolean, confidence?: Confidence) => void;
  getCard: (key: string) => CardState | undefined;
  /**
   * Các thẻ đến hạn ôn, TRỘN LẪN một ít thẻ mới (xem `interleaveNew`), giới hạn theo hạn
   * mức thẻ mới còn lại của hôm nay.
   */
  buildReviewQueue: (scope: SubjectScope, limit?: number) => string[];
  /**
   * CHỈ thẻ chưa từng học, cho phiên "học từ mới hôm nay" — lối đi riêng để phần học mới
   * không phải xếp hàng sau đống thẻ đến hạn. Mặc định lấy đúng phần hạn mức còn lại của
   * hôm nay (`newCardsLeftToday`).
   */
  buildNewQueue: (scope: SubjectScope, limit?: number) => string[];
  /** Số thẻ mới đã học hôm nay và số còn lại trong hạn mức ngày. */
  newCardsToday: number;
  newCardsLeftToday: number;
  /** Các thẻ từng trả lời sai, mới sai gần đây xếp trước. */
  buildMistakeQueue: (scope: SubjectScope) => string[];
  /** Câu hỏi JLPT đến hạn ôn lại — xem ghi chú tại định nghĩa hàm. */
  buildJlptReviewQueue: (limit?: number) => string[];
  statsFor: (scope: SubjectScope) => SubjectStats;
  dueCount: (scope: SubjectScope) => number;
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
  /** True từ lúc một mẻ thay đổi được xếp lịch đẩy lên server tới lúc PUT thật sự xong (hoặc
   * lỗi) — đọc được từ handler `pagehide` (bên dưới) để biết có cần flush khẩn hay không, vì
   * `syncState` là React state, không chắc đã kịp cập nhật xong lúc trang bị đóng. */
  const pushPendingRef = useRef(false);
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

    // Chỉ đánh thức hiệu ứng đẩy lên khi thật sự có gì để đẩy. Nếu lần nào mở web cũng đẩy
    // một bản y hệt bản trên server thì vừa tốn lượt ghi KV vừa làm dấu thời gian nhảy lung
    // tung giữa các máy.
    let shouldPush = false;

    setSyncState('syncing');
    progressApi
      .get()
      .then((server) => {
        if (cancelled) return;

        if (!server) {
          shouldPush = true;
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
        // Tài khoản mới (server còn trống): đánh thức hiệu ứng đẩy lên để bản đầu tiên được
        // ghi lên server ngay, kể cả khi chữ ký nội dung không đổi. Các ca còn lại đã có
        // chữ ký nội dung lo — hợp nhất có thay đổi thì tự đẩy, không thay đổi thì không cần.
        if (shouldPush) setSyncEpoch((e) => e + 1);
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

    // Đặt 'syncing' NGAY khi xếp lịch, không đợi tới lúc PUT thật sự chạy: trước đây nút
    // đồng bộ vẫn hiện "Đã đồng bộ" (nhãn cũ từ lần trước) suốt cả PUSH_DEBOUNCE_MS lẫn thời
    // gian gọi mạng, khiến đóng máy đúng lúc này trông có vẻ an toàn dù mẻ thay đổi mới nhất
    // chưa hề rời khỏi máy.
    pushPendingRef.current = true;
    setSyncState('syncing');

    pushTimer.current = setTimeout(() => {
      progressApi
        .put(dataRef.current)
        .then((res) => {
          pushPendingRef.current = false;
          setData((prev) =>
            prev._syncedServerUpdatedAt === res.updatedAt
              ? prev
              : { ...prev, _syncedServerUpdatedAt: res.updatedAt }
          );
          setSyncState('synced');
        })
        .catch(() => {
          pushPendingRef.current = false;
          setSyncState('error');
        });
    }, PUSH_DEBOUNCE_MS);

    return () => {
      if (pushTimer.current) clearTimeout(pushTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cố ý dùng chữ ký nội dung, xem ghi chú ở contentSignature
  }, [contentSignature, userId, syncEpoch]);

  // Đóng tab / điều hướng đi trong lúc còn một mẻ thay đổi CHƯA kịp đẩy lên server (debounce
  // chưa hết giờ, hoặc request PUT đang bay) — trước đây chỉ có flush xuống localStorage của
  // CHÍNH MÁY NÀY (effect phía trên), không có gì flush lên server, nên đúng phần vừa học
  // ngay trước khi gập máy/đóng tab có thể không bao giờ tới nơi: máy khác (đăng nhập cùng
  // tài khoản) sẽ không bao giờ thấy, dù nút vẫn từng hiện "Đã đồng bộ".
  //
  // `keepalive: true` cho phép request sống sót qua lúc trang bị dỡ (khác `fetch` thường, sẽ
  // bị trình duyệt huỷ ngang). Giới hạn keepalive tổng cộng khoảng 64KB mỗi trang là đánh đổi
  // chấp nhận được: tiến độ rất lớn (hiếm) có thể vẫn vượt giới hạn và request bị từ chối,
  // nhưng đó là bằng đúng hiện trạng "luôn luôn mất" — không tệ hơn, còn phần lớn trường hợp
  // thì được cứu hẳn. Không `await`/`.then` được vì trang có thể đã dỡ trước khi promise xong.
  useEffect(() => {
    if (!userId) return;

    const flushToServer = () => {
      if (!pushPendingRef.current) return;
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushPendingRef.current = false;
      fetch('/api/progress', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dataRef.current),
        keepalive: true,
      }).catch(() => {});
    };

    // 'pagehide' bắt đóng tab/điều hướng trên desktop; 'visibilitychange' thêm một lưới an
    // toàn cho mobile (chuyển app nền không phải lúc nào cũng kèm pagehide ngay).
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushToServer();
    };
    window.addEventListener('pagehide', flushToServer);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flushToServer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [userId]);

  const recordReview = useCallback((key: string, correct: boolean, confidence?: Confidence) => {
    const now = Date.now();
    const day = todayKey();
    setDataTouched((prev) => {
      const card = confidence
        ? applyConfidenceMatrix(prev.cards[key], correct, confidence, now)
        : srsReview(prev.cards[key], correct, now);
      const prevDay = prev.daily[day] || { reviews: 0, correct: 0, newCards: 0 };
      // Thẻ chưa từng có trạng thái SRS = thẻ vừa được học lần đầu hôm nay. Câu hỏi JLPT
      // (khoá `jlpt::`) cũng "mới" ở lần trả lời đầu nhưng KHÔNG tính vào hạn mức thẻ mới —
      // hạn mức đó nói về giáo trình N3, còn câu hỏi JLPT vào lịch ôn khi làm đề, không có
      // khái niệm "học mới mỗi ngày".
      const isFirstTime = !prev.cards[key] && !isJlptCardKey(key);

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
          [day]: {
            reviews: prevDay.reviews + 1,
            correct: prevDay.correct + (correct ? 1 : 0),
            newCards: (prevDay.newCards ?? 0) + (isFirstTime ? 1 : 0),
          },
        },
        streak,
      };
    });
  }, [setDataTouched]);

  const getCard = useCallback((key: string) => data.cards[key], [data.cards]);

  const todayStat = useMemo<DailyStat>(
    () => data.daily[todayKey()] || { reviews: 0, correct: 0, newCards: 0 },
    [data.daily]
  );

  const newCardsToday = todayStat.newCards ?? 0;
  const newCardsLeftToday = Math.max(0, data.settings.dailyNewLimit - newCardsToday);

  /** Các thẻ chưa từng học của một phạm vi, theo đúng thứ tự giáo trình, tối đa `max` thẻ. */
  const collectNewKeys = useCallback(
    (scope: SubjectScope, max: number): string[] => {
      const fresh: string[] = [];
      if (max <= 0) return fresh;
      for (const [key, entry] of itemByKey) {
        if (fresh.length >= max) break;
        if (!subjectInScope(entry.subjectId, scope)) continue;
        if (!data.cards[key]) fresh.push(key);
      }
      return fresh;
    },
    [data.cards]
  );

  const buildReviewQueue = useCallback(
    (scope: SubjectScope, limit?: number) => {
      const now = Date.now();
      const due: { key: string; due: number }[] = [];

      // Thẻ đến hạn suy ra được từ tiến độ đã lưu, không cần dữ liệu bài học.
      for (const [key, card] of Object.entries(data.cards)) {
        // Thẻ SRS của câu hỏi JLPT dùng khoá riêng (`jlpt::`) và có hàng đợi riêng
        // (`buildJlptReviewQueue`) — scope 'all' khớp mọi subjectId vô điều kiện nên phải
        // chặn tay ở đây, không thì câu hỏi JLPT lẫn vào hàng ôn N3/IT.
        if (isJlptCardKey(key)) continue;
        if (!subjectInScope(subjectIdFromKey(key), scope)) continue;
        if (isDue(card, now)) due.push({ key, due: card.due });
      }
      // Thẻ quá hạn lâu nhất được ưu tiên trước.
      due.sort((a, b) => a.due - b.due);

      // Thẻ mới thì phải tra chỉ mục, nên chỉ lấy được từ các môn đã nạp dữ liệu.
      // Hạn mức là của cả NGÀY, không phải của mỗi phiên: đã học 15 thẻ mới sáng nay thì
      // chiều chỉ còn 5 suất, không phải 20 suất nữa.
      const fresh = collectNewKeys(scope, newCardsLeftToday);

      return applyLimit(interleaveNew(due.map((d) => d.key), fresh), limit);
    },
    [data.cards, collectNewKeys, newCardsLeftToday]
  );

  const buildNewQueue = useCallback(
    (scope: SubjectScope, limit?: number) =>
      collectNewKeys(scope, typeof limit === 'number' ? limit : newCardsLeftToday),
    [collectNewKeys, newCardsLeftToday]
  );

  const buildMistakeQueue = useCallback(
    (scope: SubjectScope) => {
      const rows: { key: string; last: number; wrong: number }[] = [];
      for (const [key, card] of Object.entries(data.cards)) {
        if (isJlptCardKey(key)) continue;
        if (card.wrong === 0) continue;
        // Lọc theo mã môn nằm ngay trong khoá, nhờ vậy không phụ thuộc vào việc đã nạp dữ liệu.
        if (!subjectInScope(subjectIdFromKey(key), scope)) continue;
        rows.push({ key, last: card.last, wrong: card.wrong });
      }
      // Sai nhiều nhất lên đầu, cùng số lần sai thì lấy câu vừa sai gần đây.
      rows.sort((a, b) => b.wrong - a.wrong || b.last - a.last);
      return rows.map((r) => r.key);
    },
    [data.cards]
  );

  /**
   * Hàng đợi ôn cho chính câu hỏi JLPT (khoá `jlpt::examId::questionId`) — tách khỏi
   * `buildReviewQueue` vì không có khái niệm "thẻ mới" ở đây: một câu chỉ có thẻ SRS sau khi
   * đã được làm (đúng hoặc sai) trong một lượt thi, không có kho tĩnh để rút "thẻ mới" như
   * `itemByKey`. Vì vậy chỉ trả về thẻ ĐẾN HẠN, không có phần "fresh".
   */
  const buildJlptReviewQueue = useCallback(
    (limit?: number) => {
      const now = Date.now();
      const due: { key: string; due: number }[] = [];
      for (const [key, card] of Object.entries(data.cards)) {
        if (!isJlptCardKey(key)) continue;
        if (isDue(card, now)) due.push({ key, due: card.due });
      }
      due.sort((a, b) => a.due - b.due);
      const keys = due.map((d) => d.key);
      return typeof limit === 'number' ? keys.slice(0, limit) : keys;
    },
    [data.cards]
  );

  const statsFor = useCallback(
    (scope: SubjectScope): SubjectStats => {
      const now = Date.now();
      // Tổng số mục lấy từ metadata tĩnh nên trang chủ không cần nạp dữ liệu môn nào.
      const total = totalItemsOf(scope);
      let studied = 0;
      let mature = 0;
      let due = 0;
      let wrong = 0;

      for (const [key, card] of Object.entries(data.cards)) {
        if (isJlptCardKey(key)) continue;
        if (!subjectInScope(subjectIdFromKey(key), scope)) continue;
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

  const dueCount = useCallback((scope: SubjectScope) => statsFor(scope).due, [statsFor]);

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
      buildNewQueue,
      newCardsToday,
      newCardsLeftToday,
      buildMistakeQueue,
      buildJlptReviewQueue,
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
      buildNewQueue,
      newCardsToday,
      newCardsLeftToday,
      buildMistakeQueue,
      buildJlptReviewQueue,
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
