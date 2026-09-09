/**
 * Lưu dữ liệu JLPT của người dùng vào IndexedDB (không phải localStorage): đề đã nhập,
 * lượt làm bài đang dở/đã nộp, và sổ tay lỗi riêng cho JLPT.
 *
 * Vì sao IndexedDB (mục 11.7 và ghi chú lưu trữ ở cuối mục 10): một đề N3 đầy đủ kèm 4 lời
 * giải/câu ~80–150 KB, lượt làm bài + lỗi cũng cộng dồn theo thời gian. `localStorage`
 * (~5 MB, đang chứa cả tiến độ SRS) đầy nhanh, và `src/lib/storage.ts` nuốt lỗi ghi im lặng
 * khi đầy — chấp nhận được cho tiến độ, KHÔNG chấp nhận được cho dữ liệu người dùng bỏ công
 * làm/nhập. Vì vậy mọi hàm ở đây NÉM LỖI thay vì nuốt.
 */

import type { StoredJlptExam, JlptAttempt, MistakeEntry, QuestionReport } from './schema';
import { readJSON, writeJSON } from '../storage';

const DB_NAME = 'nihonit-jlpt';
const DB_VERSION = 3;

/** Cờ "đã chuyển dữ liệu JLPT cũ cho tài khoản đầu tiên" của MÁY này — xem claimLegacyJlptData(). */
const CLAIM_FLAG_KEY = 'jlpt-legacy-claimed';

const STORE_EXAMS = 'exams';
const STORE_ATTEMPTS = 'attempts';
const STORE_MISTAKES = 'mistakes';
const STORE_REPORTS = 'reports';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('Trình duyệt này không hỗ trợ IndexedDB — không thể lưu dữ liệu JLPT.'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_EXAMS)) {
        db.createObjectStore(STORE_EXAMS, { keyPath: 'exam.id' });
      }
      if (!db.objectStoreNames.contains(STORE_ATTEMPTS)) {
        db.createObjectStore(STORE_ATTEMPTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_MISTAKES)) {
        db.createObjectStore(STORE_MISTAKES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_REPORTS)) {
        db.createObjectStore(STORE_REPORTS, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Không mở được kho lưu dữ liệu JLPT (IndexedDB).'));
  });
}

async function listAll<T>(store: string, errMsg: string): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result as T[]);
    req.onerror = () => reject(req.error ?? new Error(errMsg));
  });
}

async function getOne<T>(store: string, key: string, errMsg: string): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error ?? new Error(errMsg));
  });
}

async function putOne(store: string, entry: unknown, errMsg: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(entry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error(errMsg));
  });
}

async function deleteOne(store: string, key: string, errMsg: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error(errMsg));
  });
}

// ─── Đề ──────────────────────────────────────────────────────────────

export const listStoredExams = () => listAll<StoredJlptExam>(STORE_EXAMS, 'Không đọc được danh sách đề đã nhập.');
export const getStoredExam = (id: string) => getOne<StoredJlptExam>(STORE_EXAMS, id, `Không đọc được đề "${id}".`);
export const putStoredExam = (entry: StoredJlptExam) =>
  putOne(STORE_EXAMS, entry, `Không lưu được đề "${entry.exam.id}" (có thể hết dung lượng).`);
export const deleteStoredExam = (id: string) => deleteOne(STORE_EXAMS, id, `Không xoá được đề "${id}".`);

// ─── Lượt làm bài (riêng theo tài khoản) ─────────────────────────────

/**
 * Đề dùng chung cả máy, nhưng lượt làm bài và sổ tay lỗi là của RIÊNG từng người: hai
 * người học chung một trình duyệt phải thấy đúng lịch sử của mình.
 *
 * Cách tách: mỗi bản ghi mang `ownerId`; đọc thì lọc theo chủ hiện tại. Không tách bằng
 * cách mở nhiều IndexedDB (mỗi tài khoản một database) vì như thế phải nâng version và
 * chuyển dữ liệu cũ qua database mới — rủi ro hơn nhiều so với một trường lọc.
 *
 * `ownerId` null = làm ở chế độ khách (chưa đăng nhập). Bản ghi cũ từ thời chưa có tài
 * khoản không có trường này nên cũng rơi vào "khách" — cho tới khi được nhận (claim), xem
 * claimLegacyJlptData() bên dưới.
 */
function ownedBy(record: { ownerId?: string | null }, ownerId: string | null): boolean {
  return (record.ownerId ?? null) === ownerId;
}

export const listAttempts = async (ownerId: string | null): Promise<JlptAttempt[]> => {
  const all = await listAll<JlptAttempt>(STORE_ATTEMPTS, 'Không đọc được danh sách lượt làm bài.');
  return all.filter((a) => ownedBy(a, ownerId));
};

export const getAttempt = (id: string) => getOne<JlptAttempt>(STORE_ATTEMPTS, id, `Không đọc được lượt làm bài "${id}".`);

export const putAttempt = (entry: JlptAttempt, ownerId: string | null) =>
  putOne(
    STORE_ATTEMPTS,
    { ...entry, ownerId },
    `Không lưu được lượt làm bài "${entry.id}" (có thể hết dung lượng).`
  );

export const deleteAttempt = (id: string) => deleteOne(STORE_ATTEMPTS, id, `Không xoá được lượt làm bài "${id}".`);

// ─── Sổ tay lỗi JLPT (riêng theo tài khoản) ──────────────────────────

export const listMistakes = async (ownerId: string | null): Promise<MistakeEntry[]> => {
  const all = await listAll<MistakeEntry>(STORE_MISTAKES, 'Không đọc được sổ tay lỗi JLPT.');
  return all.filter((m) => ownedBy(m, ownerId));
};

export const putMistake = (entry: MistakeEntry, ownerId: string | null) =>
  putOne(STORE_MISTAKES, { ...entry, ownerId }, `Không lưu được mục sổ tay lỗi "${entry.id}".`);

/**
 * Chuyển dữ liệu JLPT "vô chủ" (làm từ thời web chưa có tài khoản) sang cho tài khoản
 * đầu tiên đăng nhập trên máy này.
 *
 * Cùng tinh thần với việc tài khoản đầu tiên nhận blob tiến độ cũ trên server: người đang
 * dùng web hôm nay không nên thấy lịch sử làm đề của mình biến mất chỉ vì vừa tạo tài
 * khoản. Chạy đúng MỘT lần cho mỗi máy (cờ trong localStorage) và chỉ khi tài khoản đó
 * chưa có lượt làm bài nào của riêng mình — máy dùng chung thì người thứ hai đăng nhập sẽ
 * không vơ luôn lịch sử của người trước.
 */
export async function claimLegacyJlptData(ownerId: string): Promise<number> {
  if (readJSON<boolean>(CLAIM_FLAG_KEY, false)) return 0;

  const [attempts, mistakes] = await Promise.all([
    listAll<JlptAttempt>(STORE_ATTEMPTS, 'Không đọc được danh sách lượt làm bài.'),
    listAll<MistakeEntry>(STORE_MISTAKES, 'Không đọc được sổ tay lỗi JLPT.'),
  ]);

  const alreadyMine = attempts.some((a) => a.ownerId === ownerId);
  const orphanAttempts = attempts.filter((a) => (a.ownerId ?? null) === null);
  const orphanMistakes = mistakes.filter((m) => (m.ownerId ?? null) === null);

  writeJSON(CLAIM_FLAG_KEY, true);
  if (alreadyMine || (orphanAttempts.length === 0 && orphanMistakes.length === 0)) return 0;

  for (const a of orphanAttempts) await putAttempt(a, ownerId);
  for (const m of orphanMistakes) await putMistake(m, ownerId);
  return orphanAttempts.length;
}

// ─── Báo lỗi nội dung câu hỏi (dùng chung cả máy, giống Đề — KHÔNG theo tài khoản) ───
//
// Lỗi nội dung (gạch chân lệch, đáp án sai...) là thuộc tính của ĐỀ, không phải của người
// đang học — hai người dùng chung máy phải thấy chung một danh sách báo lỗi, khác với sổ
// tay lỗi cá nhân (`MistakeEntry`) vốn tách theo tài khoản.

export const listReports = () => listAll<QuestionReport>(STORE_REPORTS, 'Không đọc được danh sách báo lỗi.');
export const putReport = (entry: QuestionReport) =>
  putOne(STORE_REPORTS, entry, `Không lưu được báo lỗi câu "${entry.questionId}".`);
export const deleteReport = (id: string) => deleteOne(STORE_REPORTS, id, `Không xoá được báo lỗi "${id}".`);
