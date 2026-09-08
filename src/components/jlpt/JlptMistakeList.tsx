import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  Lightbulb,
  PenLine,
  RotateCcw,
  Search,
  FileQuestion,
  ArrowRight,
} from 'lucide-react';
import type { MistakeEntry, MistakeCause, Confidence, JlptQuestion } from '../../lib/jlpt/schema';
import { listMistakes, getStoredExam } from '../../lib/jlpt/db';
import { countByCause, causeLabel, CONFIDENCE_LABELS } from '../../lib/jlpt/mistakeStats';
import { useJlptOwner } from '../../hooks/useJlptOwner';
import { useAuth } from '../../hooks/useAuth';
import { useProgress } from '../../hooks/useProgress';
import { StemText } from './StemText';

interface JlptMistakeListProps {
  onOpenExam: (examId: string) => void;
  onOpenImport: () => void;
  /** Ôn ngay các câu JLPT đến hạn (ticket 005) — chỗ tự nhiên nhất để nhắc, vì đây đã là màn
   * "điểm yếu JLPT của tôi". */
  onOpenReview: () => void;
}

/** Một mục sổ tay đã ghép được (hoặc không ghép được) với câu hỏi gốc trong đề. */
interface MistakeRow {
  entry: MistakeEntry;
  /** null = đề đã bị xoá khỏi máy, hoặc câu này không còn trong đề sau khi nhập đè bản mới. */
  question: JlptQuestion | null;
  /** null cùng lý do với `question` — khi đó hiện luôn mã đề để còn biết mà nhập lại. */
  examTitle: string | null;
}

const CONFIDENCE_STYLE: Record<Confidence, string> = {
  sure: 'bg-rose-100 text-rose-700 border-rose-200',
  unsure: 'bg-amber-100 text-amber-800 border-amber-200',
  guess: 'bg-slate-100 text-slate-600 border-slate-200',
};

/**
 * Sổ tay lỗi JLPT: mọi câu người học đã mổ xẻ, kèm nguyên nhân tự phân loại và "quy tắc
 * bằng lời của chính mình" viết ở bước 4.
 *
 * Đề là kho chung của máy nhưng bản ghi lỗi là của riêng từng tài khoản, nên phải chờ biết
 * mình là ai (`authenticated !== null`) rồi mới đọc — đọc sớm sẽ ra sổ tay của "khách" rồi
 * nháy sang sổ tay thật.
 */
export const JlptMistakeList: React.FC<JlptMistakeListProps> = ({ onOpenExam, onOpenImport, onOpenReview }) => {
  const { authenticated } = useAuth();
  const { ownerId, claimEpoch } = useJlptOwner();
  const { buildJlptReviewQueue } = useProgress();
  const reviewDueCount = useMemo(() => buildJlptReviewQueue().length, [buildJlptReviewQueue]);

  // Câu hỏi JLPT vào lịch ôn ngay lúc nộp bài (không cần mổ xẻ), nên có thể có câu đến hạn dù
  // sổ tay lỗi (chỉ chứa câu mổ xẻ) đang trống — banner này phải hiện độc lập với rows.length.
  const reviewBanner =
    reviewDueCount > 0 ? (
      <button
        onClick={onOpenReview}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-left hover:bg-indigo-100 transition-colors cursor-pointer mb-5"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-indigo-900">
          <RotateCcw className="w-4 h-4" />
          {reviewDueCount} câu JLPT đã đến hạn ôn lại
        </span>
        <span className="text-xs font-extrabold text-indigo-700 flex items-center gap-1">
          Ôn ngay <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </button>
    ) : null;

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [rows, setRows] = useState<MistakeRow[]>([]);

  const [examFilter, setExamFilter] = useState<string>('all');
  const [causeFilter, setCauseFilter] = useState<MistakeCause | null>(null);
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | Confidence>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (authenticated === null) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setFailed(false);
      try {
        const entries = await listMistakes(ownerId);
        if (cancelled) return;

        // Chỉ nạp những đề thật sự có mục trong sổ tay: mỗi đề cả trăm KB, nạp cả kho chỉ để
        // hiện vài câu là phí. Đề đã bị xoá thì getStoredExam trả về undefined — không phải lỗi.
        const examIds = [...new Set(entries.map((e) => e.examId))];
        const stored = await Promise.all(examIds.map((id) => getStoredExam(id).catch(() => undefined)));
        if (cancelled) return;

        const questionsByExam = new Map<string, Map<string, JlptQuestion>>();
        const titleByExam = new Map<string, string>();
        stored.forEach((s, i) => {
          if (!s) return;
          titleByExam.set(examIds[i], s.exam.title);
          questionsByExam.set(examIds[i], new Map(s.questions.map((q) => [q.id, q])));
        });

        setRows(
          entries
            .slice()
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((entry) => ({
              entry,
              question: questionsByExam.get(entry.examId)?.get(entry.questionId) ?? null,
              examTitle: titleByExam.get(entry.examId) ?? null,
            }))
        );
        setLoading(false);
      } catch {
        if (cancelled) return;
        // Trình duyệt chặn IndexedDB: nói thẳng là không đọc được, đừng hiện "sổ tay trống"
        // (người học sẽ tưởng công sức mổ xẻ của mình bốc hơi).
        setFailed(true);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authenticated, ownerId, claimEpoch]);

  /** Danh sách đề để lọc — gồm cả đề đã bị xoá, vì ghi chú của chúng vẫn nằm trong sổ tay. */
  const examOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const r of rows) {
      if (!seen.has(r.entry.examId)) {
        seen.set(r.entry.examId, r.examTitle ?? `${r.entry.examId} (đề đã xoá)`);
      }
    }
    return [...seen.entries()].map(([id, title]) => ({ id, title }));
  }, [rows]);

  /** Lọc theo đề trước, rồi mới thống kê: "trong đề này tôi hay sai vì gì" cũng phải trả lời được. */
  const inScope = useMemo(
    () => (examFilter === 'all' ? rows : rows.filter((r) => r.entry.examId === examFilter)),
    [rows, examFilter]
  );

  const causeCounts = useMemo(() => countByCause(inScope.map((r) => r.entry)), [inScope]);

  const visibleRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    return inScope.filter(({ entry, question, examTitle }) => {
      if (causeFilter && entry.cause !== causeFilter) return false;
      if (confidenceFilter !== 'all' && entry.confidenceAtAnswer !== confidenceFilter) return false;
      if (!q) return true;
      const haystack = [
        question?.stem ?? '',
        ...(question?.choices.map((c) => c.text) ?? []),
        entry.myRule ?? '',
        entry.myExample ?? '',
        examTitle ?? entry.examId,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [inScope, causeFilter, confidenceFilter, search]);

  const withOwnRule = useMemo(
    () => rows.filter((r) => r.entry.myRule || r.entry.myExample).length,
    [rows]
  );

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-sm font-bold text-slate-500">Đang mở sổ tay lỗi JLPT...</p>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="bg-white rounded-3xl border border-amber-200 p-10 text-center">
        <p className="text-sm font-bold text-amber-800">Không đọc được sổ tay lỗi JLPT trên máy này.</p>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Trình duyệt đang chặn lưu trữ cục bộ (chế độ ẩn danh?). Ghi chú của bạn vẫn còn, chỉ là
          không đọc được trong tab này.
        </p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <>
        {reviewBanner}
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileQuestion size={28} />
          </div>
          <h3 className="text-lg font-extrabold text-slate-800 mb-1">Chưa mổ xẻ câu nào</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
            Sổ tay này chỉ đầy lên khi bạn làm một đề JLPT rồi mổ xẻ từng câu sai. Mỗi câu mổ xẻ
            xong để lại ở đây: nguyên nhân sai và quy tắc bạn tự viết.
          </p>
          <button
            onClick={onOpenImport}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer text-sm"
          >
            Tới phòng thi JLPT
          </button>
        </div>
      </>
    );
  }

  const top = causeCounts[0];

  return (
    <>
      {reviewBanner}

      {/* Thống kê nguyên nhân — thứ mà từng câu lẻ không nói được */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 mb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <AlertTriangle size={15} className="text-rose-500" />
            Bạn hay sai vì lý do gì?
          </h3>
          <p className="text-xs font-semibold text-slate-400">
            {inScope.length} câu đã mổ xẻ · {withOwnRule}/{rows.length} câu có quy tắc bạn tự viết
          </p>
        </div>

        {top && (
          <p className="text-sm font-bold text-slate-700 mb-3">
            Nhiều nhất:{' '}
            <span className="text-rose-600 font-black">{top.label}</span>{' '}
            <span className="font-semibold text-slate-400">
              ({top.count}/{inScope.length} câu · {top.percent}%)
            </span>
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          {causeCounts.map((c) => {
            const active = causeFilter === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setCauseFilter(active ? null : c.code)}
                title={active ? 'Bỏ lọc theo nguyên nhân này' : `Chỉ xem câu sai vì: ${c.hint}`}
                className={`group text-left rounded-xl px-3 py-2 border transition-all cursor-pointer ${
                  active
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-xs font-extrabold text-slate-700">{c.label}</span>
                  <span className="text-xs font-black text-slate-500 shrink-0">
                    {c.count} <span className="font-bold text-slate-400">({c.percent}%)</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${active ? 'bg-rose-500' : 'bg-indigo-400'}`}
                    style={{ width: `${Math.max(c.percent, 3)}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm trong câu hỏi hoặc ghi chú của bạn..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
          />
        </div>
        <select
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
        >
          <option value="all">Tất cả đề</option>
          {examOptions.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>
        <select
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value as 'all' | Confidence)}
          className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
          title="Lúc làm bài bạn thấy thế nào — sai khi đang CHẮC là lỗ hổng nguy hiểm nhất"
        >
          <option value="all">Mọi mức chắc chắn</option>
          <option value="sure">Lúc đó thấy chắc</option>
          <option value="unsure">Lúc đó phân vân</option>
          <option value="guess">Lúc đó đoán</option>
        </select>
      </div>

      {visibleRows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500 font-semibold">
          Không có câu nào khớp bộ lọc hiện tại.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleRows.map(({ entry, question, examTitle }) => (
            <article key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                  {causeLabel(entry.cause)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${CONFIDENCE_STYLE[entry.confidenceAtAnswer]}`}
                  title="Mức chắc chắn bạn tự chấm lúc làm bài"
                >
                  Lúc làm: {CONFIDENCE_LABELS[entry.confidenceAtAnswer]}
                </span>
                {examTitle ? (
                  <button
                    onClick={() => onOpenExam(entry.examId)}
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {examTitle} <ArrowRight size={10} />
                  </button>
                ) : (
                  <span
                    className="text-[10px] font-bold text-slate-400"
                    title={`Mã đề: ${entry.examId}`}
                  >
                    Đề đã bị xoá khỏi máy
                  </span>
                )}
                <span className="text-[10px] font-bold text-slate-400 ml-auto">
                  {new Date(entry.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>

              {question ? (
                <>
                  {question.stem && (
                    <p className="text-sm font-bold text-slate-800 leading-relaxed mb-2.5">
                      <StemText stem={question.stem} underline={question.stemUnderline} />
                    </p>
                  )}
                  <div className="grid gap-1.5 mb-3">
                    {question.choices.map((c, i) => {
                      const isAnswer = i === question.answerIndex;
                      const isChosen = i === entry.chosenIndex;
                      return (
                        <div
                          key={i}
                          className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-start gap-1.5 ${
                            isAnswer
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                              : isChosen
                              ? 'border-rose-200 bg-rose-50 text-rose-900'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {isAnswer && <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />}
                          {isChosen && !isAnswer && <XCircle size={13} className="text-rose-500 mt-0.5 shrink-0" />}
                          <span>
                            {i + 1}. {c.text}
                            {isChosen && !isAnswer && (
                              <span className="ml-1.5 text-[10px] font-black uppercase">bạn đã chọn</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {entry.reattemptIndex != null && (
                    <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 mb-2.5">
                      <RotateCcw size={11} />
                      Lúc mổ xẻ bạn chọn lại phương án {entry.reattemptIndex + 1} —{' '}
                      {entry.reattemptIndex === question.answerIndex ? (
                        <span className="text-emerald-600 font-black">đúng</span>
                      ) : (
                        <span className="text-rose-600 font-black">vẫn sai</span>
                      )}
                    </p>
                  )}
                  {question.explanation && (
                    <details className="mb-2.5">
                      <summary className="text-[11px] font-extrabold text-indigo-600 cursor-pointer">
                        Lời giải của đề
                      </summary>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1.5 whitespace-pre-line">
                        {question.explanation}
                      </p>
                    </details>
                  )}
                </>
              ) : (
                <p className="text-xs font-semibold text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl px-3 py-2.5 mb-2.5 leading-relaxed">
                  Không hiện được câu hỏi gốc: đề <span className="font-bold">{entry.examId}</span> không
                  còn trên máy này. Ghi chú của bạn vẫn giữ nguyên bên dưới; nhập lại đúng đề đó là
                  câu hỏi hiện lại.
                </p>
              )}

              {/* Phần đáng giá nhất của cả quy trình mổ xẻ: chữ do chính người học viết ra */}
              {entry.myRule || entry.myExample ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-3 space-y-2">
                  {entry.myRule && (
                    <p className="text-xs font-bold text-amber-900 flex items-start gap-2">
                      <Lightbulb size={13} className="mt-0.5 shrink-0 text-amber-600" />
                      <span>
                        <span className="uppercase text-[10px] tracking-wider text-amber-600 block">
                          Quy tắc bạn tự rút ra
                        </span>
                        {entry.myRule}
                      </span>
                    </p>
                  )}
                  {entry.myExample && (
                    <p className="text-xs font-bold text-amber-900 flex items-start gap-2">
                      <PenLine size={13} className="mt-0.5 shrink-0 text-amber-600" />
                      <span>
                        <span className="uppercase text-[10px] tracking-wider text-amber-600 block">
                          Ví dụ bạn tự đặt
                        </span>
                        {entry.myExample}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-[11px] font-semibold text-slate-400 italic">
                  Câu này bạn chưa viết quy tắc nào — lần mổ xẻ sau thử viết một câu bằng lời của
                  chính mình, đó là bước nhớ lâu nhất.
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
};
