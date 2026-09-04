import { useState, useEffect } from 'react';
import type { Lesson } from '../data/lessons';
import {
  loadSubjectLessons,
  loadAllSubjects,
  isSubjectLoaded,
  areAllSubjectsLoaded,
  getLoadedLessons,
  getAllLoadedLessons,
} from '../data/subjectLoader';

function readCache(target: string): Lesson[] | null {
  if (target === 'all') return areAllSubjectsLoaded() ? getAllLoadedLessons() : null;
  return isSubjectLoaded(target) ? getLoadedLessons(target) : null;
}

/**
 * Nạp dữ liệu bài học của một môn ("all" = mọi môn) và cho biết đang tải hay chưa.
 *
 * Trả về ngay từ cache nếu môn đó đã được nạp trước đó, nhờ vậy chuyển qua lại
 * giữa các trang không nháy màn hình chờ.
 */
export function useSubjectData(target: string | null) {
  const [lessons, setLessons] = useState<Lesson[]>(() => (target ? readCache(target) ?? [] : []));
  const [loading, setLoading] = useState<boolean>(() => (target ? readCache(target) === null : false));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!target) {
      setLessons([]);
      setLoading(false);
      setFailed(false);
      return;
    }

    const cached = readCache(target);
    if (cached) {
      setLessons(cached);
      setLoading(false);
      setFailed(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setFailed(false);

    const promise = target === 'all' ? loadAllSubjects() : loadSubjectLessons(target);
    promise
      .then((result) => {
        if (cancelled) return;
        setLessons(result);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Chunk dữ liệu tải hỏng (mất mạng giữa chừng): báo lỗi thay vì treo màn hình chờ.
        setFailed(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [target]);

  return { lessons, loading, failed };
}
