/**
 * Lưu đề JLPT đã nhập vào IndexedDB (không phải localStorage).
 *
 * Vì sao IndexedDB (mục 11.7): một đề N3 đầy đủ kèm 4 lời giải/câu ~80–150 KB.
 * `localStorage` (~5 MB, đang chứa cả tiến độ) đầy sau chừng 20 đề, và `src/lib/storage.ts`
 * nuốt lỗi ghi im lặng khi đầy — chấp nhận được cho tiến độ, KHÔNG chấp nhận được cho đề mà
 * người dùng bỏ công soạn/nhập. Vì vậy mọi hàm ở đây NÉM LỖI thay vì nuốt, để màn nhập báo rõ.
 */

import type { StoredJlptExam } from './schema';

const DB_NAME = 'nihonit-jlpt';
const DB_VERSION = 1;
const STORE = 'exams';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('Trình duyệt này không hỗ trợ IndexedDB — không thể lưu đề đã nhập.'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'exam.id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Không mở được kho lưu đề (IndexedDB).'));
  });
}

export async function listStoredExams(): Promise<StoredJlptExam[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result as StoredJlptExam[]);
    req.onerror = () => reject(req.error ?? new Error('Không đọc được danh sách đề đã nhập.'));
  });
}

export async function getStoredExam(id: string): Promise<StoredJlptExam | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result as StoredJlptExam | undefined);
    req.onerror = () => reject(req.error ?? new Error(`Không đọc được đề "${id}".`));
  });
}

export async function putStoredExam(entry: StoredJlptExam): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(entry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error(`Không lưu được đề "${entry.exam.id}" (có thể hết dung lượng).`));
  });
}

export async function deleteStoredExam(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error(`Không xoá được đề "${id}".`));
  });
}
