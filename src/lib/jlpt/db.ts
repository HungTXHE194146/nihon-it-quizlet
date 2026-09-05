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

import type { StoredJlptExam, JlptAttempt, MistakeEntry } from './schema';

const DB_NAME = 'nihonit-jlpt';
const DB_VERSION = 2;

const STORE_EXAMS = 'exams';
const STORE_ATTEMPTS = 'attempts';
const STORE_MISTAKES = 'mistakes';

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

// ─── Lượt làm bài ────────────────────────────────────────────────────

export const listAttempts = () => listAll<JlptAttempt>(STORE_ATTEMPTS, 'Không đọc được danh sách lượt làm bài.');
export const getAttempt = (id: string) => getOne<JlptAttempt>(STORE_ATTEMPTS, id, `Không đọc được lượt làm bài "${id}".`);
export const putAttempt = (entry: JlptAttempt) =>
  putOne(STORE_ATTEMPTS, entry, `Không lưu được lượt làm bài "${entry.id}" (có thể hết dung lượng).`);
export const deleteAttempt = (id: string) => deleteOne(STORE_ATTEMPTS, id, `Không xoá được lượt làm bài "${id}".`);

// ─── Sổ tay lỗi JLPT ─────────────────────────────────────────────────

export const listMistakes = () => listAll<MistakeEntry>(STORE_MISTAKES, 'Không đọc được sổ tay lỗi JLPT.');
export const putMistake = (entry: MistakeEntry) =>
  putOne(STORE_MISTAKES, entry, `Không lưu được mục sổ tay lỗi "${entry.id}".`);
