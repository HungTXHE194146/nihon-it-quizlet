import { useState, useEffect } from 'react';
import type { Lesson } from '../data/lessons';
import { loadScopeLessons, isScopeLoaded, getLoadedScopeLessons } from '../data/subjectLoader';

/** `target` là một phạm vi: mã môn, `'n3'` (gộp các môn N3) hay `'all'`. */
function readCache(target: string): Lesson[] | null {
  return isScopeLoaded(target) ? getLoadedScopeLessons(target) : null;
}

/**
 * Nạp dữ liệu bài học của một phạm vi ("n3" = nhánh N3, "all" = mọi môn) và cho biết đang
 * tải hay chưa.
 *
 * Trả về ngay từ cache nếu môn đó đã được nạp trước đó, nhờ vậy chuyển qua lại
 * giữa các trang không nháy màn hình chờ.
 */
export function useSubjectData(target: string | null) {
  const [lessons, setLessons] = useState<Lesson[]>(() => (target ? readCache(target) ?? [] : []));
  const [loading, setLoading] = useState<boolean>(() => (target ? readCache(target) === null : false));
  const [failed, setFailed] = useState(false);
  const [renderedTarget, setRenderedTarget] = useState(target);

  /**
   * Đặt lại state ngay trong lúc render khi đổi môn.
   *
   * Nếu để việc này cho useEffect thì có đúng một lượt render trung gian mà `lessons`
   * vẫn là của môn cũ còn `loading` đã là false — đủ để màn hình học dựng phiên bằng
   * dữ liệu sai và ra "không tìm thấy câu hỏi". Đây là cách React khuyến nghị để
   * điều chỉnh state theo prop thay đổi.
   */
  if (renderedTarget !== target) {
    setRenderedTarget(target);
    const cached = target ? readCache(target) : [];
    setLessons(cached ?? []);
    setLoading(target ? cached === null : false);
    setFailed(false);
  }

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

    const promise = loadScopeLessons(target);
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
