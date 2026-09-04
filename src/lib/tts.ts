/**
 * Phát âm bằng Web Speech API (SpeechSynthesis).
 *
 * Chạy hoàn toàn trên máy người dùng, không cần mạng, không cần thư viện ngoài.
 * Giọng có sẵn phụ thuộc hệ điều hành nên mọi thứ đều phải suy biến êm khi thiếu giọng.
 */

export const ttsSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

let voices: SpeechSynthesisVoice[] = [];

function refreshVoices() {
  if (!ttsSupported) return;
  voices = window.speechSynthesis.getVoices();
}

if (ttsSupported) {
  refreshVoices();
  // Chrome nạp danh sách giọng bất đồng bộ, lần gọi đầu thường trả về mảng rỗng.
  window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
}

/** Có giọng đọc cho ngôn ngữ này không (dùng để ẩn nút thay vì bấm mà im lặng). */
export function hasVoiceFor(lang: 'ja' | 'en'): boolean {
  if (!ttsSupported) return false;
  if (voices.length === 0) refreshVoices();
  // Nhiều máy chỉ có giọng mặc định: vẫn cho phép đọc, engine sẽ tự xử lý.
  if (voices.length === 0) return true;
  return voices.some((v) => v.lang.toLowerCase().startsWith(lang));
}

function pickVoice(lang: 'ja' | 'en'): SpeechSynthesisVoice | undefined {
  if (voices.length === 0) refreshVoices();
  const prefix = lang === 'ja' ? 'ja' : 'en';
  return (
    voices.find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix)) || undefined
  );
}

const JAPANESE_RE = /[぀-ゟ゠-ヿ一-龯ｦ-ﾟ]/;
const KANA_ONLY_RE = /^[぀-ゟ゠-ヿー\s・、。]+$/;

/** Đoán ngôn ngữ của một chuỗi dựa trên bảng chữ được dùng. */
export function detectLang(text: string): 'ja' | 'en' {
  return JAPANESE_RE.test(text) ? 'ja' : 'en';
}

/**
 * Chọn chuỗi nên đọc cho một thẻ từ vựng.
 *
 * Cách đọc bằng kana luôn chính xác hơn kanji (engine hay đọc sai âm Hán đa âm),
 * nhưng trường `reading` trong dữ liệu đôi khi lại là phần dịch La-tinh
 * (ví dụ "Electronic Delay Storage Automatic Calculator") nên chỉ dùng khi thuần kana.
 */
export function speakableText(term?: string, reading?: string): string {
  const cleanReading = (reading || '').replace(/\([^)]*\)/g, '').trim();
  if (cleanReading && KANA_ONLY_RE.test(cleanReading)) return cleanReading;
  return (term || cleanReading || '').trim();
}

export function cancelSpeech(): void {
  if (!ttsSupported) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* bỏ qua */
  }
}

export interface SpeakOptions {
  lang?: 'ja' | 'en';
  rate?: number;
}

/** Đọc to một chuỗi. Lần gọi mới luôn ngắt lần đọc đang chạy. */
export function speak(text: string, options: SpeakOptions = {}): void {
  if (!ttsSupported) return;
  const content = text.trim();
  if (!content) return;

  const lang = options.lang || detectLang(content);
  cancelSpeech();

  try {
    const utter = new SpeechSynthesisUtterance(content);
    utter.lang = lang === 'ja' ? 'ja-JP' : 'en-US';
    utter.rate = options.rate ?? 0.9;
    const voice = pickVoice(lang);
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  } catch {
    /* bỏ qua: phát âm là tính năng phụ trợ, không được làm hỏng phiên học */
  }
}
