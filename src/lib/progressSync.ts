/**
 * Hợp nhất tiến độ cục bộ với bản trên server khi phát hiện server có bản khác.
 *
 * Chiến lược: với `cards` (trạng thái SRS) — phần quan trọng nhất, không được mất —
 * hợp nhất TỪNG THẺ theo `last` (thời điểm ôn gần nhất): bên nào ôn gần đây hơn thắng
 * cho đúng thẻ đó. Nhờ vậy lỡ học ở cả hai máy trước khi kịp đồng bộ cũng không mất
 * tiến độ của máy nào.
 *
 * Các phần còn lại (streak, cài đặt, phiên đang dở, lịch sử thi) không hợp nhất theo
 * field — cả khối thắng theo bên có dấu thời gian tổng thể mới hơn. Đây là so sánh xấp
 * xỉ (đồng hồ hai máy có thể lệch vài giây) — chấp nhận được vì đây là công cụ cho một
 * người dùng, không cần chính xác tuyệt đối như hệ thống nhiều người dùng thật.
 */

import type { ProgressData } from '../hooks/useProgress';

/**
 * `serverUpdatedAt` truyền riêng (không đọc từ trong `server`) vì đó là dấu thời gian
 * phía server ghi trên WIRE FORMAT thô lúc trả JSON — không phải một field của
 * `ProgressData` (kiểu nội bộ của app), nên không lẫn vào nhau.
 */
export function mergeProgress(
  local: ProgressData,
  server: ProgressData,
  serverUpdatedAt: number | undefined
): ProgressData {
  const cards = { ...server.cards };
  for (const [key, localCard] of Object.entries(local.cards)) {
    const serverCard = cards[key];
    if (!serverCard || localCard.last >= serverCard.last) {
      cards[key] = localCard;
    }
  }

  const localTime = local._localSavedAt ?? 0;
  const serverTime = serverUpdatedAt ?? 0;
  const base = localTime >= serverTime ? local : server;

  return { ...base, cards };
}
