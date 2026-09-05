/**
 * Chuyển đổi giữa ba hình dạng của một đề:
 * - `JlptImportFile`: hình dạng file nhập (mục 11.3) — exam không kèm groups/questionIds.
 * - `JlptExam`: hình dạng chạy trong app (mục 10) — groups/questionIds nằm thẳng trong exam.
 * - `StoredJlptExam` / `JlptSyncPayload`: gói thêm metadata quản lý (đã kiểm hay chưa, mốc
 *   thời gian) để lưu IndexedDB cục bộ và đồng bộ qua /api/jlpt/exams.
 */

import type { JlptExam, JlptImportFile, StoredJlptExam } from './schema';

export interface JlptSyncPayload extends JlptImportFile {
  reviewed: boolean;
  importedAt: number;
  updatedAt: number;
}

export function importFileToExam(file: JlptImportFile): JlptExam {
  return {
    id: file.exam.id,
    level: file.exam.level,
    title: file.exam.title,
    blocks: file.exam.blocks,
    groups: file.groups,
    questionIds: file.groups.flatMap((g) => g.questionIds),
    source: file.exam.source ?? 'user-provided',
  };
}

export function toStoredExam(
  file: JlptImportFile,
  reviewed: boolean,
  existing?: StoredJlptExam
): StoredJlptExam {
  const now = Date.now();
  return {
    exam: importFileToExam(file),
    questions: file.questions,
    reviewed,
    importedAt: existing?.importedAt ?? now,
    updatedAt: now,
  };
}

export function toSyncPayload(stored: StoredJlptExam): JlptSyncPayload {
  return {
    formatVersion: 1,
    exam: {
      id: stored.exam.id,
      level: stored.exam.level,
      title: stored.exam.title,
      source: stored.exam.source,
      blocks: stored.exam.blocks,
    },
    groups: stored.exam.groups,
    questions: stored.questions,
    reviewed: stored.reviewed,
    importedAt: stored.importedAt,
    updatedAt: stored.updatedAt,
  };
}

export function fromSyncPayload(payload: JlptSyncPayload): StoredJlptExam {
  return {
    exam: importFileToExam(payload),
    questions: payload.questions,
    reviewed: payload.reviewed ?? false,
    importedAt: payload.importedAt ?? Date.now(),
    updatedAt: payload.updatedAt ?? Date.now(),
  };
}
