/**
 * Tải và giữ file nghe 聴解 trên máy người học.
 *
 * Vì sao TẢI TRỌN FILE trước khi thi thay vì phát trực tuyến: chế độ thi khoá tua, nên nếu mạng
 * giật giữa chừng thì người học mất luôn đoạn đó và không có cách nào nghe lại — bài coi như
 * hỏng. Tải xong một lần (~15 MB) rồi phát từ máy thì mạng yếu chỉ làm chậm lúc chuẩn bị.
 *
 * Lưu vào Cache Storage theo KHOÁ object (có hash nội dung), không theo link ký tạm (mỗi lần
 * xin một link khác): lần sau mở lại đề — kể cả offline — phát ngay, không cần mạng.
 */

import type { AudioSegment, JlptAudioTrack, JlptQuestion, MondaiType, StoredJlptExam } from './schema';
import { jlptAudioApi } from '../api';

/**
 * 問題 mà đề giấy thật IN SẴN các lựa chọn. Các 問題 còn lại (概要理解, 発話表現, 即時応答) chỉ có
 * trong băng: đề giấy để trống (hoặc chỉ có tranh), nên lúc thi chỉ được hiện nút ①②③④ —
 * hiện chữ ra là biến bài nghe thành bài đọc, dễ hơn thi thật (mục 7.4 tài liệu thiết kế).
 */
const PRINTED_CHOICES: ReadonlySet<MondaiType> = new Set<MondaiType>(['kadai_rikai', 'point_rikai']);

export function choicesArePrinted(mondai: MondaiType): boolean {
  return PRINTED_CHOICES.has(mondai);
}

const CACHE_NAME = 'nihonit-choukai-audio';

/** URL giả cùng origin, chỉ dùng làm khoá trong Cache Storage — không bao giờ được fetch. */
function cacheKeyUrl(track: JlptAudioTrack): string {
  return `/__choukai-audio/${track.key}`;
}

export function trackOf(stored: StoredJlptExam, question: JlptQuestion | null | undefined): JlptAudioTrack | null {
  if (!question?.audioId || !question.audioSegment) return null;
  return stored.exam.audio?.find((t) => t.id === question.audioId) ?? null;
}

/** Đề này có phát được audio cho câu 聴解 không (có file + ít nhất một câu đã căn mốc). */
export function examHasAudio(stored: StoredJlptExam): boolean {
  return !!stored.exam.audio?.length && stored.questions.some((q) => q.audioSegment && q.audioId);
}

async function readCached(track: JlptAudioTrack): Promise<Blob | null> {
  if (!('caches' in window)) return null;
  const cache = await caches.open(CACHE_NAME);
  const res = await cache.match(cacheKeyUrl(track));
  if (!res) return null;
  const blob = await res.blob();
  // Bản ghi dở (tab bị đóng giữa lúc ghi) thì coi như chưa có.
  return blob.size >= track.bytes * 0.98 ? blob : null;
}

export async function isAudioCached(track: JlptAudioTrack): Promise<boolean> {
  return (await readCached(track).catch(() => null)) !== null;
}

async function signedUrl(key: string): Promise<string> {
  try {
    return (await jlptAudioApi.sign(key)).url;
  } catch (err) {
    // `npm run dev` không chạy thư mục api/ — lấy thẳng file đã nén từ data/_audio_build
    // (plugin dev trong vite.config.ts). Bản build không bao giờ đi nhánh này.
    if (import.meta.env.DEV) return `/__dev-audio/${key.replace(/^choukai\//, '')}`;
    throw err;
  }
}

/**
 * Trả về file nghe dạng Blob: lấy từ máy nếu đã tải, không thì tải mới (báo tiến độ) rồi cất.
 * Ném lỗi có thông điệp tiếng Việt khi không tải được.
 */
export async function loadAudio(
  track: JlptAudioTrack,
  onProgress?: (loaded: number, total: number) => void,
  signal?: AbortSignal
): Promise<Blob> {
  const cached = await readCached(track).catch(() => null);
  if (cached) {
    onProgress?.(cached.size, cached.size);
    return cached;
  }

  const url = await signedUrl(track.key);
  const res = await fetch(url, { signal });
  if (!res.ok || !res.body) {
    throw new Error(`Không tải được file nghe (lỗi ${res.status}). Kiểm tra mạng rồi thử lại.`);
  }

  const total = Number(res.headers.get('content-length')) || track.bytes;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onProgress?.(loaded, total);
  }
  const blob = new Blob(chunks as BlobPart[], { type: 'audio/mpeg' });

  try {
    // Xin trình duyệt đừng tự dọn kho khi máy thiếu chỗ — không được thì vẫn chạy bình thường.
    await navigator.storage?.persist?.();
    const cache = await caches.open(CACHE_NAME);
    await cache.put(
      cacheKeyUrl(track),
      new Response(blob, { headers: { 'content-type': 'audio/mpeg', 'content-length': String(blob.size) } })
    );
  } catch {
    // Hết dung lượng / trình duyệt chặn Cache Storage: file vẫn dùng được trong phiên này,
    // chỉ là lần sau phải tải lại.
  }
  return blob;
}

const objectUrls = new Map<string, Promise<string>>();

/**
 * Link `blob:` để gán vào <audio>, giữ trong bộ nhớ suốt phiên: mổ xẻ 5 câu của cùng một đề
 * không phải đọc lại 15 MB từ Cache Storage cho từng câu. Chỉ lần gọi đầu tiên nhận tiến độ tải.
 */
export function audioObjectUrl(
  track: JlptAudioTrack,
  onProgress?: (loaded: number, total: number) => void
): Promise<string> {
  let pending = objectUrls.get(track.key);
  if (!pending) {
    pending = loadAudio(track, onProgress).then((blob) => URL.createObjectURL(blob));
    objectUrls.set(track.key, pending);
    // Lỗi mạng thì bỏ khỏi bộ nhớ đệm để lần bấm "Thử lại" tải lại thật.
    pending.catch(() => objectUrls.delete(track.key));
  }
  return pending;
}

export async function removeCachedAudio(track: JlptAudioTrack): Promise<void> {
  if (!('caches' in window)) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(cacheKeyUrl(track));
}

// ─── Tra cứu mốc thời gian ───────────────────────────────────────────

export interface TimelineEntry {
  questionId: string;
  segment: AudioSegment;
}

/** Các câu (thuộc `questionIds`) đã căn mốc trên cùng một file nghe, xếp theo thời gian. */
export function buildTimeline(stored: StoredJlptExam, questionIds: string[], trackId: string): TimelineEntry[] {
  const wanted = new Set(questionIds);
  return stored.questions
    .filter((q) => wanted.has(q.id) && q.audioId === trackId && q.audioSegment)
    .map((q) => ({ questionId: q.id, segment: q.audioSegment as AudioSegment }))
    .sort((a, b) => a.segment.start - b.segment.start);
}

/**
 * Đoạn file cần phát cho một lượt: trọn khối thì từ đầu tới hết file; phiên nghe ngắn một nhóm
 * 問題 thì bắt đầu ngay sau câu cuối của nhóm TRƯỚC (để nghe cả lời hướng dẫn + ví dụ của nhóm
 * mình, như thi thật) và dừng ở cuối câu cuối của nhóm.
 */
export function listeningRange(stored: StoredJlptExam, questionIds: string[], track: JlptAudioTrack): [number, number] {
  const all = buildTimeline(stored, stored.questions.map((q) => q.id), track.id);
  const mine = buildTimeline(stored, questionIds, track.id);
  if (mine.length === 0) return [0, track.durationSec];
  const firstIdx = all.findIndex((e) => e.questionId === mine[0].questionId);
  const lastIdx = all.findIndex((e) => e.questionId === mine[mine.length - 1].questionId);
  const from = firstIdx > 0 ? all[firstIdx - 1].segment.end : 0;
  const to = lastIdx === all.length - 1 ? track.durationSec : mine[mine.length - 1].segment.end;
  return [from, to];
}

/** Câu đang được đọc tại giây `t`: câu cuối cùng đã bắt đầu. `null` = còn đang ở phần hướng dẫn. */
export function entryAt(timeline: TimelineEntry[], t: number): TimelineEntry | null {
  let hit: TimelineEntry | null = null;
  for (const entry of timeline) {
    if (entry.segment.start <= t + 0.05) hit = entry;
    else break;
  }
  return hit;
}

/** Dòng lời thoại đang phát tại giây `t` (chỉ số dòng trong transcript), hoặc -1. */
export function lineAt(segment: AudioSegment, t: number): number {
  const lines = segment.lines ?? [];
  let hit = -1;
  lines.forEach((line, i) => {
    if (line && line.start <= t + 0.05) hit = i;
  });
  return hit;
}
