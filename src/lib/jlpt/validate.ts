/**
 * Kiểm tra file nhập đề JLPT — theo đúng bảng quy tắc ở mục 11.6 của
 * docs/jlpt-practice-test-research.md.
 *
 * Nguyên tắc viết thông báo lỗi: nói CHỖ NÀO và SỬA THẾ NÀO, không nói chung chung
 * "dữ liệu không hợp lệ" — người soạn đề (kể cả một AI khác) không chắc đọc được TypeScript.
 */

import { MONDAI_TYPES, type JlptImportFile, type JlptQuestion } from './schema';

export interface ValidationResult {
  /** Có lỗi chặn thì không cho nhập gì cả. */
  errors: string[];
  /** Vẫn cho nhập, nhưng phải hiện rõ ở màn xem trước. */
  warnings: string[];
  /** Đếm câu thiếu note cho ít nhất một phương án — để đánh dấu đề "chưa đầy đủ". */
  incompleteChoiceCount: number;
  totalQuestions: number;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Bước 1: parse JSON thô. Ném lỗi có kèm vị trí (dòng/cột) nếu `JSON.parse` báo được —
 * V8 (Chrome/Node) có làm vậy trong message, nên không cần tự viết parser.
 */
export function parseImportJSON(raw: string): { ok: true; value: unknown } | { ok: false; message: string } {
  try {
    return { ok: true, value: JSON.parse(raw) };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return { ok: false, message: `JSON sai cú pháp: ${detail}` };
  }
}

/**
 * Bước 2: kiểm tra cấu trúc + quy tắc bắt buộc. Không giả định các trường lồng nhau tồn tại —
 * dữ liệu đến từ ngoài, có thể thiếu bất cứ đâu.
 */
export function validateImportFile(value: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let incompleteChoiceCount = 0;

  if (!isPlainObject(value)) {
    return { errors: ['File nhập phải là một object JSON ở cấp cao nhất.'], warnings: [], incompleteChoiceCount: 0, totalQuestions: 0 };
  }

  const exam = value.exam;
  if (!isPlainObject(exam)) {
    errors.push('Thiếu trường "exam" (thông tin đề: id, level, title, blocks).');
  } else {
    if (typeof exam.id !== 'string' || !exam.id) errors.push('Thiếu "exam.id".');
    if (typeof exam.level !== 'string' || !exam.level) errors.push('Thiếu "exam.level".');
    if (typeof exam.title !== 'string' || !exam.title) errors.push('Thiếu "exam.title".');
    if (!Array.isArray(exam.blocks)) errors.push('Thiếu "exam.blocks" (mảng các khối tính giờ).');
  }

  const groups = Array.isArray(value.groups) ? value.groups : null;
  if (!groups) errors.push('Thiếu "groups" (mảng nhóm 問題).');

  const questionsRaw = Array.isArray(value.questions) ? value.questions : null;
  if (!questionsRaw) {
    errors.push('Thiếu "questions" (mảng câu hỏi).');
    return { errors, warnings, incompleteChoiceCount, totalQuestions: 0 };
  }

  const seenIds = new Set<string>();
  const validIds = new Set<string>();

  questionsRaw.forEach((raw, idx) => {
    const label = `questions[${idx}]`;
    if (!isPlainObject(raw)) {
      errors.push(`${label}: không phải một object câu hỏi hợp lệ.`);
      return;
    }
    const q = raw as Partial<JlptQuestion>;
    const qId = typeof q.id === 'string' && q.id ? q.id : `${label} (thiếu id)`;

    if (typeof q.id !== 'string' || !q.id) {
      errors.push(`${label}: thiếu "id".`);
    } else if (seenIds.has(q.id)) {
      errors.push(`Trùng id câu hỏi: "${q.id}" xuất hiện nhiều hơn một lần.`);
    } else {
      seenIds.add(q.id);
      validIds.add(q.id);
    }

    if (typeof q.mondai !== 'string' || !q.mondai) {
      errors.push(`Câu ${qId}: thiếu "mondai".`);
    } else if (!(MONDAI_TYPES as readonly string[]).includes(q.mondai)) {
      errors.push(`Câu ${qId}: "mondai" = "${q.mondai}" không hợp lệ. Giá trị hợp lệ: ${MONDAI_TYPES.join(', ')}.`);
    }

    if (typeof q.scoringSection !== 'string' || !q.scoringSection) {
      errors.push(`Câu ${qId}: thiếu "scoringSection" (gengo_chishiki | dokkai | choukai).`);
    }

    const choices = Array.isArray(q.choices) ? q.choices : [];
    if (choices.length < 2) {
      errors.push(`Câu ${qId}: chỉ có ${choices.length} phương án, cần ít nhất 2.`);
    }

    if (typeof q.answerIndex !== 'number') {
      errors.push(`Câu ${qId}: thiếu "answerIndex".`);
    } else if (q.answerIndex < 0 || q.answerIndex >= choices.length) {
      errors.push(`Câu ${qId}: đáp án số ${q.answerIndex + 1} nhưng chỉ có ${choices.length} phương án.`);
    }

    const missingNote = choices.filter((c) => !isPlainObject(c) || typeof c.note !== 'string' || !c.note.trim()).length;
    if (missingNote > 0) incompleteChoiceCount += 1;

    if (q.stemUnderline && typeof q.stem === 'string') {
      const [from, to] = q.stemUnderline;
      if (typeof from === 'number' && typeof to === 'number' && (from < 0 || to > q.stem.length || from >= to)) {
        warnings.push(`Câu ${qId}: "stemUnderline" [${from}, ${to}] nằm ngoài độ dài câu (${q.stem.length} ký tự).`);
      }
    }
  });

  if (groups) {
    groups.forEach((raw: unknown, idx: number) => {
      if (!isPlainObject(raw)) {
        errors.push(`groups[${idx}]: không phải một object hợp lệ.`);
        return;
      }
      const g = raw;
      if (typeof g.mondai !== 'string' || !(MONDAI_TYPES as readonly string[]).includes(g.mondai)) {
        errors.push(`groups[${idx}]: "mondai" không hợp lệ. Giá trị hợp lệ: ${MONDAI_TYPES.join(', ')}.`);
      }
      const questionIds = Array.isArray(g.questionIds) ? g.questionIds : [];
      for (const qid of questionIds) {
        if (typeof qid !== 'string' || !validIds.has(qid)) {
          errors.push(`groups[${idx}]: "questionIds" trỏ tới câu không tồn tại: "${qid}".`);
        }
      }
    });
  }

  if (incompleteChoiceCount > 0) {
    warnings.push(
      `${incompleteChoiceCount}/${questionsRaw.length} câu thiếu lời giải ("note") cho ít nhất một phương án nhiễu — đề sẽ bị đánh dấu "chưa đầy đủ".`
    );
  }

  return { errors, warnings, incompleteChoiceCount, totalQuestions: questionsRaw.length };
}

/** Chỉ dùng khi validateImportFile() không báo lỗi chặn — ép kiểu an toàn sau khi đã kiểm tra xong. */
export function asImportFile(value: unknown): JlptImportFile {
  return value as JlptImportFile;
}
