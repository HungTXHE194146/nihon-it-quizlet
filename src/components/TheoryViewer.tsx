import React, { Suspense, useEffect, lazy } from 'react';
import { BookOpen } from 'lucide-react';

/**
 * Bài lý thuyết được nạp động.
 *
 * 20 component lý thuyết chiếm phần lớn mã nguồn giao diện nhưng chỉ dùng khi người dùng
 * thực sự mở một bài. Nạp động giúp lần vào trang đầu tiên không phải tải hết.
 */
const THEORY_COMPONENTS: Record<number, React.LazyExoticComponent<React.ComponentType<{ onClose: () => void }>>> = {
  1: lazy(() => import('./Lesson1Theory').then((m) => ({ default: m.Lesson1Theory }))),
  2: lazy(() => import('./Lesson2Theory').then((m) => ({ default: m.Lesson2Theory }))),
  3: lazy(() => import('./Lesson3Theory').then((m) => ({ default: m.Lesson3Theory }))),
  4: lazy(() => import('./Lesson4Theory').then((m) => ({ default: m.Lesson4Theory }))),
  5: lazy(() => import('./Lesson5Theory').then((m) => ({ default: m.Lesson5Theory }))),
  6: lazy(() => import('./Lesson6Theory').then((m) => ({ default: m.Lesson6Theory }))),
  7: lazy(() => import('./Lesson7Theory').then((m) => ({ default: m.Lesson7Theory }))),
  8: lazy(() => import('./Lesson8Theory').then((m) => ({ default: m.Lesson8Theory }))),
  9: lazy(() => import('./Lesson9Theory').then((m) => ({ default: m.Lesson9Theory }))),
  10: lazy(() => import('./Lesson10Theory').then((m) => ({ default: m.Lesson10Theory }))),
  11: lazy(() => import('./Lesson11Theory').then((m) => ({ default: m.Lesson11Theory }))),
  12: lazy(() => import('./Lesson12Theory').then((m) => ({ default: m.Lesson12Theory }))),
  13: lazy(() => import('./Lesson13Theory').then((m) => ({ default: m.Lesson13Theory }))),
  14: lazy(() => import('./Lesson14Theory').then((m) => ({ default: m.Lesson14Theory }))),
  15: lazy(() => import('./Lesson15Theory').then((m) => ({ default: m.Lesson15Theory }))),
  16: lazy(() => import('./Lesson16Theory').then((m) => ({ default: m.Lesson16Theory }))),
  17: lazy(() => import('./Lesson17Theory').then((m) => ({ default: m.Lesson17Theory }))),
  18: lazy(() => import('./Lesson18Theory').then((m) => ({ default: m.Lesson18Theory }))),
  19: lazy(() => import('./Lesson19Theory').then((m) => ({ default: m.Lesson19Theory }))),
  20: lazy(() => import('./Lesson20Theory').then((m) => ({ default: m.Lesson20Theory }))),
};

interface TheoryViewerProps {
  lessonId: number;
  onClose: () => void;
}

const TheoryFallback: React.FC = () => (
  <div className="w-full max-w-3xl mx-auto py-24 px-4 flex flex-col items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center animate-pulse">
      <BookOpen size={26} />
    </div>
    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Đang tải bài lý thuyết...</p>
  </div>
);

export const TheoryViewer: React.FC<TheoryViewerProps> = ({ lessonId, onClose }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  const LessonTheory = THEORY_COMPONENTS[lessonId];

  if (!LessonTheory) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm my-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-2xl">
          📖
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Chưa có lý thuyết</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
          Mục lý thuyết chi tiết cho Bài {lessonId} hiện đang được cập nhật và sẽ hoàn thiện sớm.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer text-sm"
        >
          Quay lại chọn bài
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={<TheoryFallback />}>
      <LessonTheory onClose={onClose} />
    </Suspense>
  );
};
