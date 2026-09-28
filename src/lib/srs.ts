/**
 * Thuật toán lặp lại ngắt quãng (Spaced Repetition) theo SM-2.
 *
 * Giao diện hiện tại chỉ chấm nhị phân (Đã thuộc / Chưa thuộc) nên ta quy đổi:
 *   - đúng   -> quality 4 ("good")  : giữ nguyên hệ số dễ
 *   - sai    -> quality 2 ("again") : thẻ quay về giai đoạn học lại, hệ số dễ giảm
 */

export const DAY_MS = 24 * 60 * 60 * 1000;
/** Thẻ vừa sai được hẹn gặp lại sau 10 phút (trong cùng phiên học). */
const RELEARN_MS = 10 * 60 * 1000;

export const MIN_EASE = 1.3;
export const DEFAULT_EASE = 2.5;

export interface CardState {
  /** Hệ số dễ (ease factor) của SM-2, tối thiểu 1.3. */
  ease: number;
  /** Khoảng cách ôn hiện tại, tính theo ngày. 0 = đang học lại. */
  interval: number;
  /** Thời điểm đến hạn ôn (epoch ms). */
  due: number;
  /** Số lần trả lời đúng liên tiếp. */
  reps: number;
  /** Số lần quên (đang thuộc rồi lại sai) — dùng để phát hiện thẻ "leech". */
  lapses: number;
  /** Tổng số lần trả lời sai, kể cả lần đầu tiên. */
  wrong: number;
  /** Tổng số lần đã ôn thẻ này. */
  seen: number;
  /** Lần ôn gần nhất (epoch ms). */
  last: number;
}

/** Số lần quên tối thiểu để coi một thẻ là "leech" (từ cứng đầu, cần xử lý riêng). */
export const LEECH_THRESHOLD = 3;

export function createCardState(): CardState {
  return {
    ease: DEFAULT_EASE,
    interval: 0,
    due: 0,
    reps: 0,
    lapses: 0,
    wrong: 0,
    seen: 0,
    last: 0,
  };
}

/**
 * Áp dụng một lần ôn lên trạng thái thẻ và trả về trạng thái mới (không sửa tại chỗ).
 */
export function review(prev: CardState | undefined, correct: boolean, now = Date.now()): CardState {
  const card = prev ? { ...prev } : createCardState();

  card.seen += 1;
  card.last = now;

  if (!correct) {
    card.wrong += 1;
    // Chỉ tính "lapse" khi thẻ đã từng vào chu kỳ ôn dài; sai ngay lần đầu là chuyện bình thường.
    if (card.reps > 0) card.lapses += 1;
    card.reps = 0;
    card.interval = 0;
    card.ease = Math.max(MIN_EASE, card.ease - 0.2);
    card.due = now + RELEARN_MS;
    return card;
  }

  card.reps += 1;
  if (card.reps === 1) {
    card.interval = 1;
  } else if (card.reps === 2) {
    card.interval = 6;
  } else {
    card.interval = Math.round(card.interval * card.ease);
  }
  // quality = 4 trong công thức SM-2 khiến ease không đổi; giữ lại phép tính cho rõ ý đồ.
  card.due = now + card.interval * DAY_MS;
  return card;
}

/** Thẻ đã đến hạn ôn chưa? Thẻ chưa từng học (undefined) không tính là đến hạn. */
export function isDue(card: CardState | undefined, now = Date.now()): boolean {
  if (!card) return false;
  return card.due <= now;
}

/** Thẻ đã được coi là "thuộc" khi khoảng ôn đạt từ 21 ngày trở lên (chuẩn quen dùng của Anki). */
export const MATURE_INTERVAL_DAYS = 21;

export function isMature(card: CardState | undefined): boolean {
  return !!card && card.interval >= MATURE_INTERVAL_DAYS;
}

// ─── Primitives cho tín hiệu ngoài đúng/sai (mục 6.4 tài liệu JLPT) ──────────
//
// Ba hàm dưới đây KHÔNG phải một thuật toán ôn tập thứ hai — chúng chỉnh lại kết quả mà
// `review()` (SM-2 chuẩn) vừa tính ra, cho những trường hợp có thêm tín hiệu ngoài đúng/sai
// (ví dụ độ chắc chắn lúc trả lời). Luồng ôn thường (N3, từ vựng/Kanji) không gọi tới các hàm
// này nên hành vi của nó không đổi.

/**
 * Ép `interval`/`due` về một số ngày cụ thể, giữ nguyên các trường còn lại.
 *
 * Dùng khi tín hiệu phụ muốn ghi đè khoảng ôn mà SM-2 vừa tính, ví dụ trả lời đúng nhưng chỉ
 * là đoán mò — không nên tin tưởng khoảng ôn dài mà `review(true)` vừa đưa ra.
 */
export function withIntervalDays(card: CardState, days: number, now = Date.now()): CardState {
  return { ...card, interval: days, due: now + days * DAY_MS };
}

/**
 * Giảm `ease` thêm một lượng, dùng khi một lỗi đáng lo hơn lỗi bình thường (ví dụ trả lời sai
 * trong khi đang chắc chắn — dấu hiệu hiểu sai tận gốc, không phải nhớ nhầm thoáng qua).
 */
export function dropEaseExtra(card: CardState, amount: number): CardState {
  return { ...card, ease: Math.max(MIN_EASE, card.ease - amount) };
}

/**
 * Trạng thái "vừa được học lần đầu", khác với "vừa quên lại" mà `review(false)` giả định.
 *
 * Dùng khi câu trả lời sai thực chất là một lần đoán mò — nghĩa là kiến thức này chưa từng
 * được học, không phải bị quên. Vì vậy KHÔNG tăng `lapses` (chỉ số leech chỉ nên tính cho thứ
 * đã học rồi quên) dù thẻ có thể đã có `reps > 0` từ trước.
 */
export function asFreshLearning(prev: CardState | undefined, now = Date.now()): CardState {
  const card = prev ? { ...prev } : createCardState();
  card.seen += 1;
  card.last = now;
  card.wrong += 1;
  card.reps = 0;
  card.interval = 0;
  card.due = now;
  return card;
}

export function isLeech(card: CardState | undefined): boolean {
  return !!card && card.lapses >= LEECH_THRESHOLD;
}

/** Mô tả khoảng ôn tiếp theo bằng tiếng Việt, dùng cho tooltip/nhãn. */
export function formatInterval(card: CardState | undefined): string {
  if (!card || card.seen === 0) return 'Thẻ mới';
  if (card.interval === 0) return 'Đang học lại';
  if (card.interval === 1) return 'Ôn lại sau 1 ngày';
  if (card.interval < 30) return `Ôn lại sau ${card.interval} ngày`;
  const months = Math.round(card.interval / 30);
  return `Ôn lại sau ~${months} tháng`;
}
