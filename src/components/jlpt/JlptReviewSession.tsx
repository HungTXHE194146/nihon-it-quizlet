import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, RotateCcw, PartyPopper, AlertTriangle } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { getStoredExam } from '../../lib/jlpt/db';
import { parseJlptCardKey } from '../../lib/jlpt/srsKey';
import type { JlptQuestion } from '../../lib/jlpt/schema';
import { StemText } from './StemText';

interface JlptReviewSessionProps {
  onExit: () => void;
}

interface ReviewItem {
  key: string;
  examTitle: string;
  question: JlptQuestion;
}

type Phase = 'loading' | 'empty' | 'quiz' | 'done';

/**
 * Ôn lại câu hỏi JLPT đến hạn (ticket 005) — hàng đợi riêng cho khoá `jlpt::examId::questionId`
 * trong `data.cards`, KHÔNG đi qua `StudySession`/`itemByKey`: nội dung câu hỏi nằm rải rác
 * trong IndexedDB theo từng đề (`getStoredExam`), không có sẵn toàn bộ trong bộ nhớ như dữ
 * liệu bài học tĩnh — xem quyết định kiến trúc trong Nhật ký ticket 005.
 *
 * Không hỏi lại "mức chắc chắn" như lúc thi thật: đây là một lượt ôn SRS bình thường (giống
 * cách StudySession ôn thẻ từ vựng), chỉ cần đúng/sai.
 */
export const JlptReviewSession: React.FC<JlptReviewSessionProps> = ({ onExit }) => {
  const { buildJlptReviewQueue, recordReview } = useProgress();

  // Chốt hàng đợi NGAY LÚC MỞ MÀN, không phải mỗi lần render: trả lời một câu sẽ đổi
  // `data.cards`, đổi cả kết quả `buildJlptReviewQueue()` — nếu không chốt lại, hàng đợi sẽ
  // tự rút ngắn/đổi thứ tự ngay giữa lượt ôn.
  const [dueKeys] = useState<string[]>(() => buildJlptReviewQueue());

  const [phase, setPhase] = useState<Phase>('loading');
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [skippedCount, setSkippedCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (dueKeys.length === 0) {
      setPhase('empty');
      return;
    }
    let cancelled = false;

    (async () => {
      const parsed = dueKeys
        .map((key) => ({ key, parsed: parseJlptCardKey(key) }))
        .filter((p): p is { key: string; parsed: NonNullable<ReturnType<typeof parseJlptCardKey>> } => p.parsed !== null);

      // Chỉ nạp đúng những đề thật sự cần — mỗi đề cả trăm KB, không nạp cả kho.
      const examIds = [...new Set(parsed.map((p) => p.parsed.examId))];
      const stored = await Promise.all(examIds.map((id) => getStoredExam(id).catch(() => undefined)));
      if (cancelled) return;

      const examById = new Map(
        stored.filter((s): s is NonNullable<typeof s> => !!s).map((s) => [s.exam.id, s])
      );

      const resolved: ReviewItem[] = [];
      let skipped = 0;
      for (const { key, parsed: p } of parsed) {
        const exam = examById.get(p.examId);
        const question = exam?.questions.find((q) => q.id === p.questionId);
        // Đề đã bị xoá khỏi máy, hoặc câu đã biến mất sau khi nhập đè bản mới: không có nội
        // dung để hỏi lại thì bỏ qua, không crash — cùng nguyên tắc với sổ tay lỗi (ticket 003).
        if (!exam || !question) {
          skipped += 1;
          continue;
        }
        resolved.push({ key, examTitle: exam.exam.title, question });
      }

      if (cancelled) return;
      setSkippedCount(skipped);
      setItems(resolved);
      setPhase(resolved.length > 0 ? 'quiz' : 'empty');
    })();

    return () => {
      cancelled = true;
    };
  }, [dueKeys]);

  const current = items[index] ?? null;

  const answer = (i: number) => {
    if (!current || choice !== null) return;
    setChoice(i);
    const correct = i === current.question.answerIndex;
    if (correct) setCorrectCount((c) => c + 1);
    recordReview(current.key, correct);
  };

  const next = () => {
    if (index + 1 < items.length) {
      setIndex((v) => v + 1);
      setChoice(null);
    } else {
      setPhase('done');
    }
  };

  if (phase === 'loading') {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
        <p className="text-sm font-bold text-slate-500">Đang mở hàng đợi ôn JLPT...</p>
      </div>
    );
  }

  if (phase === 'empty') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <PartyPopper size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-2">Không có câu nào đến hạn</h3>
        <p className="text-sm text-slate-500 mb-2 leading-relaxed">
          Câu hỏi JLPT vào lịch ôn ngay khi bạn nộp bài — quay lại đây khi có câu tới hạn nhắc
          lại.
        </p>
        {skippedCount > 0 && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4">
            {skippedCount} câu đến hạn nhưng đề chứa nó đã bị xoá khỏi máy nên tạm không ôn lại
            được — quy tắc bạn viết trong sổ tay lỗi JLPT vẫn còn nguyên.
          </p>
        )}
        <button
          onClick={onExit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer text-sm"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-2">Đã ôn xong {items.length} câu</h3>
        <p className="text-sm text-slate-500 mb-6">
          Đúng {correctCount}/{items.length} câu. Câu vừa sai sẽ sớm quay lại; câu đúng được đẩy
          xa hơn trong lịch ôn.
        </p>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer text-sm"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="w-full py-24 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
        <AlertTriangle className="w-5 h-5" /> Có lỗi hiển thị — thử tải lại trang.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="relative text-center mb-4">
        <button
          onClick={onExit}
          className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Thoát</span>
        </button>
        <p className="text-xs font-extrabold text-slate-400 flex items-center justify-center gap-1.5">
          <RotateCcw size={13} />
          Ôn JLPT đến hạn — câu {index + 1}/{items.length}
        </p>
      </div>

      <p className="text-center text-[11px] font-bold text-indigo-500 mb-3">{current.examTitle}</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
        {current.question.stem && (
          <p className="text-base font-bold text-slate-800 leading-relaxed mb-4">
            <StemText stem={current.question.stem} underline={current.question.stemUnderline} />
          </p>
        )}
        <div className="grid gap-2">
          {current.question.choices.map((c, i) => (
            <button
              key={i}
              onClick={() => answer(i)}
              className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center gap-1.5 ${
                choice === null
                  ? 'border-slate-200 hover:border-slate-300 cursor-pointer'
                  : i === current.question.answerIndex
                  ? 'border-emerald-400 bg-emerald-50'
                  : i === choice
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-slate-200 opacity-50'
              }`}
            >
              {choice !== null && i === current.question.answerIndex && (
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              )}
              {choice !== null && i === choice && i !== current.question.answerIndex && (
                <XCircle size={14} className="text-rose-500 shrink-0" />
              )}
              <span>
                {i + 1}. {c.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {choice !== null && (
        <button
          onClick={next}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm cursor-pointer"
        >
          {index + 1 < items.length ? 'Câu tiếp' : 'Xong'}
        </button>
      )}
    </div>
  );
};
