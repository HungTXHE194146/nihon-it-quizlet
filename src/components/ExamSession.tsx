import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { Lesson, StudyItem } from '../data/lessons';
import { QuestionCard } from './QuestionCard';
import { useProgress } from '../hooks/useProgress';
import type { ExamResult } from '../hooks/useProgress';
import { cardKey } from '../lib/itemIndex';
import { readJSON, writeJSON, removeKey } from '../lib/storage';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flag,
  Send,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ListChecks,
  Timer,
} from 'lucide-react';

const ATTEMPT_KEY = 'exam-attempt';
/** Ngưỡng đạt của kỳ thi FE / IT Passport. */
const PASS_PERCENT = 60;

interface ExamQuestion {
  key: string;
  item: StudyItem;
  lessonTitle: string;
  sectionTitle: string;
}

/** Bài thi đang làm dở, giữ trong localStorage để F5 hay sập tab không mất bài. */
interface SavedAttempt {
  signature: string;
  startedAt: number;
  deadline: number; // 0 = không giới hạn giờ
  answers: Record<string, string>;
  flagged: string[];
  index: number;
}

interface ExamSessionProps {
  subjectId: string;
  lessons: Lesson[];
  examTags: string[];
  qType: string;
  durationMin: number;
  onExit: () => void;
}

function formatExamLabel(tag: string): string {
  const match = tag.match(/^de(\d+)$/);
  if (match) return `Đề ${match[1]}`;
  return tag.toUpperCase();
}

function formatClock(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export const ExamSession: React.FC<ExamSessionProps> = ({
  subjectId,
  lessons,
  examTags,
  qType,
  durationMin,
  onExit,
}) => {
  const { recordReview, recordExam } = useProgress();

  const signature = useMemo(
    () => JSON.stringify({ subjectId, examTags, qType, durationMin }),
    [subjectId, examTags, qType, durationMin]
  );

  // Đề thi giữ nguyên thứ tự câu gốc — đây là điểm khác cốt lõi so với chế độ luyện tập.
  const questions = useMemo<ExamQuestion[]>(() => {
    const out: ExamQuestion[] = [];
    lessons.forEach((lesson) => {
      lesson.sections.forEach((section) => {
        section.items.forEach((item) => {
          if (!item.exam || !examTags.includes(item.exam)) return;
          const matchesQType =
            !qType ||
            qType === 'all' ||
            (qType === 'theory' && (!item.qType || item.qType === 'theory')) ||
            (qType === 'calculation' && item.qType === 'calculation');
          if (!matchesQType) return;
          out.push({
            key: cardKey(subjectId, item.id),
            item,
            lessonTitle: lesson.title,
            sectionTitle: section.title,
          });
        });
      });
    });
    out.sort((a, b) => {
      const ai = examTags.indexOf(a.item.exam || '');
      const bi = examTags.indexOf(b.item.exam || '');
      if (ai !== bi) return ai - bi;
      return (a.item.examOrder ?? 999) - (b.item.examOrder ?? 999);
    });
    return out;
  }, [lessons, examTags, qType, subjectId]);

  // Khôi phục bài đang làm dở nếu đúng đề và chưa hết giờ.
  const restored = useMemo(() => {
    const saved = readJSON<SavedAttempt | null>(ATTEMPT_KEY, null);
    if (!saved || saved.signature !== signature) return null;
    if (saved.deadline > 0 && saved.deadline <= Date.now()) return null;
    return saved;
  }, [signature]);

  const [startedAt] = useState<number>(() => restored?.startedAt ?? Date.now());
  const [deadline] = useState<number>(
    () => restored?.deadline ?? (durationMin > 0 ? Date.now() + durationMin * 60_000 : 0)
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() => restored?.answers ?? {});
  const [flagged, setFlagged] = useState<Set<string>>(() => new Set(restored?.flagged ?? []));
  const [index, setIndex] = useState<number>(() => restored?.index ?? 0);
  const [now, setNow] = useState(Date.now());
  const [phase, setPhase] = useState<'doing' | 'submitted'>('doing');
  const [showConfirm, setShowConfirm] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'skipped' | 'flagged'>('all');
  const [result, setResult] = useState<ExamResult | null>(null);
  const submittedRef = useRef(false);

  const answeredCount = Object.keys(answers).length;
  const remainingSec = deadline > 0 ? (deadline - now) / 1000 : 0;

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    let correct = 0;
    for (const q of questions) {
      const chosen = answers[q.key];
      if (chosen === undefined) continue; // bỏ trắng: tính sai điểm nhưng không đưa vào SRS
      const isCorrect = chosen === q.item.answer;
      if (isCorrect) correct += 1;
      // Chỉ những câu thực sự làm mới ảnh hưởng tới lịch ôn.
      recordReview(q.key, isCorrect);
    }

    const finished: ExamResult = {
      id: `${Date.now()}`,
      subjectId,
      examTags,
      qType,
      total: questions.length,
      correct,
      elapsedSec: Math.round((Date.now() - startedAt) / 1000),
      durationMin,
      finishedAt: Date.now(),
      answers,
      order: questions.map((q) => q.key),
    };

    recordExam(finished);
    removeKey(ATTEMPT_KEY);
    setResult(finished);
    setPhase('submitted');
    setShowConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [answers, questions, recordReview, recordExam, subjectId, examTags, qType, durationMin, startedAt]);

  // Đồng hồ chạy mỗi giây; hết giờ thì tự nộp.
  useEffect(() => {
    if (phase !== 'doing') return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'doing' || deadline === 0) return;
    if (now >= deadline) handleSubmit();
  }, [now, deadline, phase, handleSubmit]);

  // Lưu bài đang làm sau mỗi thay đổi.
  useEffect(() => {
    if (phase !== 'doing' || questions.length === 0) return;
    const attempt: SavedAttempt = {
      signature,
      startedAt,
      deadline,
      answers,
      flagged: Array.from(flagged),
      index,
    };
    writeJSON(ATTEMPT_KEY, attempt);
  }, [answers, flagged, index, phase, signature, startedAt, deadline, questions.length]);

  // Phím tắt phòng thi: mũi tên chuyển câu, F đánh dấu (phím số do QuestionCard xử lý).
  useEffect(() => {
    if (phase !== 'doing') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => Math.min(questions.length - 1, i + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const current = questions[index];
        if (current) {
          setFlagged((prev) => {
            const next = new Set(prev);
            if (next.has(current.key)) next.delete(current.key);
            else next.add(current.key);
            return next;
          });
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, questions, index]);

  const toggleFlag = (key: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleRetake = () => {
    removeKey(ATTEMPT_KEY);
    // Tải lại route hiện tại để dựng một lượt thi mới hoàn toàn.
    window.location.reload();
  };

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy đề thi</h3>
        <p className="text-slate-500 mb-6">Đề bạn chọn hiện chưa có câu hỏi nào.</p>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const examTitle = examTags.map(formatExamLabel).join(' + ');

  /* ─────────────── MÀN HÌNH KẾT QUẢ ─────────────── */
  if (phase === 'submitted' && result) {
    const percent = Math.round((result.correct / result.total) * 100);
    const passed = percent >= PASS_PERCENT;
    const skippedCount = result.total - Object.keys(result.answers).length;

    const filtered = questions.filter((q) => {
      const chosen = result.answers[q.key];
      if (reviewFilter === 'wrong') return chosen !== undefined && chosen !== q.item.answer;
      if (reviewFilter === 'skipped') return chosen === undefined;
      if (reviewFilter === 'flagged') return flagged.has(q.key);
      return true;
    });

    const filterTabs = [
      { id: 'all' as const, label: `Tất cả (${result.total})` },
      {
        id: 'wrong' as const,
        label: `Câu sai (${questions.filter((q) => result.answers[q.key] !== undefined && result.answers[q.key] !== q.item.answer).length})`,
      },
      { id: 'skipped' as const, label: `Bỏ trắng (${skippedCount})` },
      { id: 'flagged' as const, label: `Đánh dấu (${flagged.size})` },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Bảng điểm */}
        <div
          className={`rounded-3xl p-8 text-center mb-6 border shadow-lg ${
            passed
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
              passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}
          >
            <Trophy size={34} />
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">
            {examTitle}
          </p>
          <h2 className="text-4xl font-black text-slate-900">
            {result.correct}
            <span className="text-2xl text-slate-400 font-bold">/{result.total}</span>
          </h2>
          <p className={`text-lg font-extrabold mt-1 ${passed ? 'text-emerald-700' : 'text-amber-700'}`}>
            {percent}% — {passed ? 'Đạt' : `Chưa đạt (cần ${PASS_PERCENT}%)`}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="bg-white/70 rounded-2xl p-3 border border-white">
              <p className="text-lg font-black text-emerald-600">{result.correct}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Đúng</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-3 border border-white">
              <p className="text-lg font-black text-rose-600">
                {result.total - result.correct - skippedCount}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Sai</p>
            </div>
            <div className="bg-white/70 rounded-2xl p-3 border border-white">
              <p className="text-lg font-black text-slate-600">{formatClock(result.elapsedSec)}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Thời gian</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onExit}
              className="px-6 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 font-bold text-sm hover:bg-slate-50 cursor-pointer"
            >
              Về danh sách đề
            </button>
            <button
              onClick={handleRetake}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              Thi lại đề này
            </button>
          </div>
        </div>

        {/* Bộ lọc xem lại */}
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReviewFilter(tab.id)}
              className={`flex-1 whitespace-nowrap py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                reviewFilter === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Danh sách xem lại */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm font-semibold text-slate-500">
            Không có câu nào trong mục này.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {filtered.map((q) => {
              const originalNumber = questions.indexOf(q) + 1;
              const chosen = result.answers[q.key];
              return (
                <div key={q.key}>
                  {chosen === undefined && (
                    <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                      <AlertTriangle size={12} />
                      Bỏ trắng
                    </div>
                  )}
                  <QuestionCard
                    item={q.item}
                    lessonTitle={q.lessonTitle}
                    sectionTitle={q.sectionTitle}
                    examMode
                    reveal
                    value={chosen ?? null}
                    questionNumber={originalNumber}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ─────────────── MÀN HÌNH LÀM BÀI ─────────────── */
  const current = questions[index];
  const urgent = deadline > 0 && remainingSec <= 300;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Thanh điều khiển bài thi */}
      <div className="glass-panel sticky top-4 z-40 rounded-2xl p-4 mb-6 flex items-center justify-between gap-3 shadow-md">
        <button
          onClick={onExit}
          className="flex items-center gap-2 py-2 px-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg active:scale-95 transition-all cursor-pointer shrink-0"
          title="Thoát (bài đang làm được lưu lại)"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Thoát</span>
        </button>

        <div className="text-center min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 truncate">
            {examTitle}
          </p>
          <p className="text-xs font-bold text-slate-600">
            Đã làm {answeredCount}/{questions.length}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {deadline > 0 ? (
            <span
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl border text-sm font-black font-mono tabular-nums ${
                urgent
                  ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Clock size={15} />
              {formatClock(remainingSec)}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl border bg-slate-100 text-slate-600 border-slate-200 text-xs font-bold">
              <Timer size={14} />
              Không giới hạn
            </span>
          )}

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-md hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all cursor-pointer"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Nộp bài</span>
          </button>
        </div>
      </div>

      {/* Câu hỏi hiện tại */}
      <QuestionCard
        key={current.key}
        item={current.item}
        lessonTitle={current.lessonTitle}
        sectionTitle={current.sectionTitle}
        examMode
        value={answers[current.key] ?? null}
        onChange={(choice) => setAnswers((prev) => ({ ...prev, [current.key]: choice }))}
        questionNumber={index + 1}
      />

      {/* Điều hướng câu */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <ArrowLeft size={16} />
          Câu trước
        </button>

        <button
          onClick={() => toggleFlag(current.key)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
            flagged.has(current.key)
              ? 'bg-amber-100 text-amber-800 border-amber-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
          title="Đánh dấu để xem lại sau"
        >
          <Flag size={16} className={flagged.has(current.key) ? 'fill-amber-500' : ''} />
          <span className="hidden sm:inline">Đánh dấu</span>
        </button>

        <button
          onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
          disabled={index === questions.length - 1}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-md hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          Câu sau
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Bảng câu hỏi */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <ListChecks size={18} className="text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-800">Bảng câu hỏi</h3>
          <div className="ml-auto flex items-center gap-3 text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-indigo-600 inline-block" /> Đã làm
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Đánh dấu
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-200 inline-block" /> Chưa làm
            </span>
          </div>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-15 gap-2">
          {questions.map((q, i) => {
            const isAnswered = answers[q.key] !== undefined;
            const isFlagged = flagged.has(q.key);
            const isCurrent = i === index;

            let cls = 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200';
            if (isAnswered) cls = 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700';
            if (isFlagged) cls = 'bg-amber-400 text-amber-950 border-amber-400 hover:bg-amber-500';

            return (
              <button
                key={q.key}
                onClick={() => setIndex(i)}
                className={`aspect-square rounded-lg border text-[11px] font-black transition-all cursor-pointer ${cls} ${
                  isCurrent ? 'ring-2 ring-offset-1 ring-slate-800 scale-110' : ''
                }`}
                title={`Câu ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gợi ý phím tắt phòng thi */}
      <div className="mt-4 flex justify-center">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100/60 py-1.5 px-3 rounded-lg border border-slate-200/50 select-none flex items-center gap-3 flex-wrap justify-center">
          <span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-sm font-mono text-[9px] text-slate-500">1-4</kbd>{' '}
            chọn đáp án
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-sm font-mono text-[9px] text-slate-500">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-sm font-mono text-[9px] text-slate-500">→</kbd>{' '}
            chuyển câu
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded shadow-sm font-mono text-[9px] text-slate-500">F</kbd>{' '}
            đánh dấu
          </span>
        </span>
      </div>

      {/* Xác nhận nộp bài */}
      {showConfirm && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Send size={26} />
            </div>
            <h3 className="text-lg font-black text-slate-800 text-center mb-2">Nộp bài thi?</h3>

            {answeredCount < questions.length ? (
              <p className="text-sm text-slate-500 text-center font-semibold mb-5">
                Bạn còn{' '}
                <span className="font-black text-rose-600">
                  {questions.length - answeredCount} câu chưa làm
                </span>
                . Câu bỏ trắng sẽ bị tính là sai.
              </p>
            ) : (
              <p className="text-sm text-slate-500 text-center font-semibold mb-5 flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                Bạn đã làm hết {questions.length} câu.
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <XCircle size={16} />
                Làm tiếp
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
