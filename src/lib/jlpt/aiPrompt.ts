/**
 * Mẫu lời nhắc cho AI khác soạn — mục 11.9 của tài liệu nghiên cứu. Chép ra, dán vào
 * ChatGPT/Claude/... ở nơi khác, rồi dán KẾT QUẢ (JSON) ngược lại vào màn nhập này.
 *
 * Hai điều cố ý ép trong prompt: (1) buộc giải thích CẢ phương án sai — không ép thì AI hầu
 * như chỉ giải thích đáp án đúng, mất 3/4 giá trị câu hỏi; (2) buộc phương án nhiễu phải là
 * từ/mẫu có thật — nhiễu bịa ra thì câu hỏi vô dụng.
 */

import { MONDAI_TYPES, type JlptLevel, type MondaiType } from './schema';

const SCHEMA_SNIPPET = `{
  "formatVersion": 1,
  "exam": {
    "id": "n3-tu-soan-01",
    "level": "N3",
    "title": "N3 Đề tự soạn 1",
    "source": "original",
    "blocks": [
      { "id": "moji-goi", "label": "言語知識（文字・語彙）", "minutes": 30, "mondai": ["kanji_yomi"] }
    ]
  },
  "groups": [
    { "mondai": "kanji_yomi", "instruction": "＿＿のことばの読み方として最もよいものを、1・2・3・4から一つ えらびなさい。", "questionIds": ["q1"] }
  ],
  "questions": [
    {
      "id": "q1",
      "level": "N3",
      "mondai": "kanji_yomi",
      "scoringSection": "gengo_chishiki",
      "stem": "きのうは雨がふっていました。",
      "stemUnderline": [4, 5],
      "answerIndex": 0,
      "choices": [
        { "text": "あめ", "note": "Đúng. 雨 đọc là あめ khi đứng một mình." },
        { "text": "ゆき", "note": "ゆき là 雪 (tuyết). Hợp ngữ cảnh ふっていました, nhưng không phải cách đọc của 雨." },
        { "text": "はれ", "note": "はれ là 晴れ (trời quang). Không hợp với ふる." },
        { "text": "かぜ", "note": "かぜ là 風 (gió). Gió không dùng với ふる ở nghĩa này." }
      ]
    }
  ]
}`;

export function buildAiPrompt(level: JlptLevel, mondai: MondaiType, count: number): string {
  return `Hãy soạn ${count} câu hỏi JLPT ${level}, dạng 問題 "${mondai}" (giá trị hợp lệ cho "mondai": ${MONDAI_TYPES.join(', ')}).
Trả về ĐÚNG định dạng JSON dưới đây, không kèm giải thích ngoài JSON.

Yêu cầu bắt buộc:
- Mỗi câu có đúng 4 phương án.
- MỖI phương án đều phải có "note" giải thích — kể cả phương án sai.
  Với phương án sai, nói rõ nó thực ra là từ/mẫu gì, và vì sao nó GẦN ĐÚNG
  mà vẫn không đúng trong ngữ cảnh này.
- Phương án nhiễu phải là từ/mẫu có thật ở trình độ ${level}, không bịa.
- "note" viết bằng tiếng Việt, ngắn gọn, tối đa 2 câu.
- Không dùng lại nguyên văn câu hỏi từ đề thi thật.
- Mỗi câu hỏi một "id" duy nhất trong file (vd "q1", "q2", ...), và "groups[].questionIds" phải liệt kê đủ và đúng các id đó theo đúng thứ tự.

Định dạng JSON (một ví dụ minh hoạ, soạn đủ ${count} câu theo đúng cấu trúc này):

${SCHEMA_SNIPPET}`;
}
