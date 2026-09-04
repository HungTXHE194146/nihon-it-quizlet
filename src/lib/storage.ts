/**
 * Lớp bọc localStorage an toàn.
 *
 * Trình duyệt có thể ném lỗi khi đọc/ghi localStorage: chế độ ẩn danh của Safari,
 * người dùng chặn site data, hoặc hết quota. Toàn bộ app phải chạy được bình thường
 * kể cả khi không lưu được gì, nên mọi thao tác ở đây đều nuốt lỗi và trả về fallback.
 */

const PREFIX = 'nihonit:v1:';

let memoryFallback: Record<string, string> = {};
let storageAvailable: boolean | null = null;

function isAvailable(): boolean {
  if (storageAvailable !== null) return storageAvailable;
  try {
    const probe = `${PREFIX}__probe__`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  return storageAvailable;
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = isAvailable()
      ? window.localStorage.getItem(PREFIX + key)
      : memoryFallback[PREFIX + key];
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    const raw = JSON.stringify(value);
    if (isAvailable()) {
      window.localStorage.setItem(PREFIX + key, raw);
    } else {
      memoryFallback[PREFIX + key] = raw;
    }
    return true;
  } catch {
    // Hết quota hoặc bị chặn: giữ trong bộ nhớ để phiên hiện tại vẫn hoạt động.
    try {
      memoryFallback[PREFIX + key] = JSON.stringify(value);
    } catch {
      /* bỏ qua */
    }
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    if (isAvailable()) window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* bỏ qua */
  }
  delete memoryFallback[PREFIX + key];
}

/** Cho biết tiến độ có thực sự được lưu xuống đĩa hay không (để cảnh báo người dùng). */
export function isPersistent(): boolean {
  return isAvailable();
}
