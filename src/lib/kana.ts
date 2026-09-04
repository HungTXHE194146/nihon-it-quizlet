/**
 * Tiện ích xử lý kana cho chế độ gõ cách đọc.
 *
 * Người học ở Việt Nam thường không cài bộ gõ tiếng Nhật, nên ô nhập chấp nhận cả
 * hiragana/katakana lẫn romaji kiểu wāpuro (gõ "kanji" ra "かんじ").
 */

const KATAKANA_START = 0x30a1;
const KATAKANA_END = 0x30f6;
const KANA_OFFSET = 0x60;

/** Đổi katakana sang hiragana, giữ nguyên mọi ký tự khác. */
export function katakanaToHiragana(input: string): string {
  let out = '';
  for (const ch of input) {
    const code = ch.codePointAt(0)!;
    out +=
      code >= KATAKANA_START && code <= KATAKANA_END
        ? String.fromCodePoint(code - KANA_OFFSET)
        : ch;
  }
  return out;
}

const HIRAGANA_RE = /^[ぁ-ゖー]+$/;

export function isKana(input: string): boolean {
  return HIRAGANA_RE.test(katakanaToHiragana(input));
}

// Bảng romaji xếp theo độ dài giảm dần khi so khớp, để "kya" thắng "ka".
const ROMAJI_MAP: Record<string, string> = {
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ', sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  sya: 'しゃ', syu: 'しゅ', syo: 'しょ', cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ', nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ', mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ', gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  zya: 'じゃ', zyu: 'じゅ', zyo: 'じょ', bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ', dya: 'ぢゃ', dyu: 'ぢゅ', dyo: 'ぢょ',
  shi: 'し', chi: 'ち', tsu: 'つ', fu: 'ふ', ji: 'じ', si: 'し', ti: 'ち', tu: 'つ',
  hu: 'ふ', zi: 'じ', di: 'ぢ', du: 'づ',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
};

const SMALL_TSU = 'っ';
const N_KANA = 'ん';

/**
 * Đổi romaji sang hiragana theo quy ước wāpuro.
 *
 * Xử lý phụ âm đôi ("kk" -> っ), "n" đứng một mình, và bỏ qua ký tự không nhận ra
 * thay vì báo lỗi — ô nhập cần dễ tính với người mới.
 */
export function romajiToHiragana(input: string): string {
  const src = input.toLowerCase().replace(/\s+/g, '');
  let out = '';
  let i = 0;

  while (i < src.length) {
    const ch = src[i];
    const next = src[i + 1];

    // Phụ âm đôi (kka, tta...) -> っ, trừ "nn" vốn là ん.
    if (ch === next && /[a-z]/.test(ch) && ch !== 'n' && ch !== 'a' && ch !== 'i' && ch !== 'u' && ch !== 'e' && ch !== 'o') {
      out += SMALL_TSU;
      i += 1;
      continue;
    }

    // "n" không đi kèm nguyên âm -> ん
    if (ch === 'n' && (next === undefined || !/[aiueoy]/.test(next))) {
      out += N_KANA;
      if (next === 'n') {
        // "nn" nhập nhằng: "annai" phải ra あんない (n thứ hai mở âm tiết mới),
        // còn "honn" phải ra ほん. Nhìn ký tự sau đó để phân biệt.
        const after = src[i + 2];
        i += after && /[aiueoy]/.test(after) ? 1 : 2;
      } else {
        i += 1;
      }
      continue;
    }

    let matched = false;
    for (const len of [3, 2, 1]) {
      const chunk = src.slice(i, i + len);
      if (chunk.length === len && ROMAJI_MAP[chunk]) {
        out += ROMAJI_MAP[chunk];
        i += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    if (ch === '-') out += 'ー';
    // Ký tự lạ thì bỏ qua để không chặn người đang gõ dở.
    i += 1;
  }

  return out;
}

/**
 * Chuẩn hoá một chuỗi cách đọc về dạng so sánh được.
 *
 * Bỏ phần trong ngoặc (dữ liệu hay kèm romaji hoặc chú thích), bỏ dấu cách và dấu câu,
 * đưa katakana về hiragana. Trường ー được giữ vì nó phân biệt nghĩa.
 */
export function normalizeReading(input: string): string {
  return katakanaToHiragana(
    input
      .replace(/[（(][^）)]*[）)]/g, '')
      .replace(/[\s・、。,.\-–—~〜]/g, '')
      .trim()
  ).toLowerCase();
}

/**
 * So khớp câu trả lời của người học với cách đọc chuẩn.
 *
 * Chấp nhận cả kana lẫn romaji: nếu gõ bằng chữ La-tinh thì chuyển sang kana trước khi so.
 */
export function matchesReading(answer: string, expected: string): boolean {
  const target = normalizeReading(expected);
  if (!target) return false;

  const direct = normalizeReading(answer);
  if (direct === target) return true;

  // Người dùng gõ romaji: chuyển rồi so lại.
  if (/[a-z]/i.test(answer)) {
    const converted = normalizeReading(romajiToHiragana(answer));
    if (converted === target) return true;
    // "ou" và "oo" hay được gõ thay cho trường âm "おう"/"おー".
    if (converted.replace(/ー/g, 'う') === target.replace(/ー/g, 'う')) return true;
  }

  return false;
}

/** Cách đọc của mục này có gõ lại được không (phải là kana thuần). */
export function isTypeableReading(reading?: string): boolean {
  if (!reading) return false;
  const cleaned = normalizeReading(reading);
  return cleaned.length > 0 && isKana(cleaned);
}
