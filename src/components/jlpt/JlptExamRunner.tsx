import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Flag,
  Send,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { itemByKey } from '../../lib/itemIndex';
import type {
  StoredJlptExam,
  JlptAttempt,
  JlptQuestion,
  Confidence,
  AttemptMode,
  MistakeCause,
} from '../../lib/jlpt/schema';
import { MISTAKE_CAUSES } from '../../lib/jlpt/schema';
import {
  createAttempt,
  scoreAttempt,
  srsSignalForMatrix,
  SECTION_LABELS,
  type AttemptScore,
} from '../../lib/jlpt/attemptLogic';
import { getStoredExam, listAttempts, putAttempt, deleteAttempt, putMistake } from '../../lib/jlpt/db';
import { useJlptOwner } from '../../hooks/useJlptOwner';

interface JlptExamRunnerProps {
  examId: string;
  onExit: () => void;
}

type View = 'loading' | 'not-found' | 'lobby' | 'taking' | 'results' | 'review' | 'miniquiz' | 'done';

function formatMinutes(ms: number): number {
  return Math.max(1, Math.round(ms / 60000));
}

function renderStem(stem: string | undefined, underline?: [number, number]) {
  if (!stem) return null;
  if (!underline) return <span>{stem}</span>;
  const [from, to] = underline;
  if (from < 0 || to > stem.length || from >= to) return <span>{stem}</span>;
  return (
    <span>
      {stem.slice(0, from)}
      <span className="underline decoration-2 decoration-indigo-500 font-black">{stem.slice(from, to)}</span>
      {stem.slice(to)}
    </span>
  );
}

const CONFIDENCE_OPTIONS: { value: Confidence; label: string }[] = [
  { value: 'sure', label: 'Chắc' },
  { value: 'unsure', label: 'Phân vân' },
  { value: 'guess', label: 'Đoán' },
];

export const JlptExamRunner: React.FC<JlptExamRunnerProps> = ({ examId, onExit }) => {
  const { recordReview } = useProgress();
  // Đề dùng chung cả máy, nhưng lượt làm bài thì của riêng người đang đăng nhập.
  const { ownerId, claimEpoch } = useJlptOwner();

  const [view, setView] = useState<View>('loading');
  const [stored, setStored] = useState<StoredJlptExam | null>(null);
  const [resumableAttempt, setResumableAttempt] = useState<JlptAttempt | null>(null);
  const [previousAttempt, setPreviousAttempt] = useState<JlptAttempt | null>(null);

  const [mode, setMode] = useState<AttemptMode>('taste');
  const [blockId, setBlockId] = useState<string | undefined>(undefined);
  const [predictedPercent, setPredictedPercent] = useState<number | ''>('');

  const [attempt, setAttempt] = useState<JlptAttempt | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);

  const [score, setScore] = useState<AttemptScore | null>(null);

  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewStep, setReviewStep] = useState<1 | 2 | 3 | 4>(1);
  const [reattemptIndex, setReattemptIndex] = useState<number | null>(null);
  const [cause, setCause] = useState<MistakeCause | null>(null);
  const [myRule, setMyRule] = useState('');
  const [myExample, setMyExample] = useState('');

  const [miniQuizIds, setMiniQuizIds] = useState<string[]>([]);
  const [miniIndex, setMiniIndex] = useState(0);
  const [miniChoice, setMiniChoice] = useState<number | null>(null);
  const [miniCorrect, setMiniCorrect] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entry = await getStoredExam(examId).catch(() => undefined);
      if (cancelled) return;
      if (!entry) {
        setView('not-found');
        return;
      }
      setStored(entry);
      const attempts = await listAttempts(ownerId).catch(() => []);
      const forThisExam = attempts.filter((a) => a.examId === examId);
      const running = forThisExam.find((a) => a.status === 'running') ?? null;
      const lastSubmitted = forThisExam
        .filter((a) => a.status !== 'running' && a.submittedAt)
        .sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0))[0];
      setResumableAttempt(running);
      setPreviousAttempt(lastSubmitted ?? null);
      setView('lobby');
    })();
    return () => {
      cancelled = true;
    };
    // claimEpoch: nạp lại sau khi lịch sử JLPT cũ vừa được chuyển sang tài khoản này,
    // nếu không thì lượt làm dở từ trước khi đăng nhập sẽ không hiện ra ở sảnh.
  }, [examId, ownerId, claimEpoch]);

  const questionsById = useMemo(() => {
    const map = new Map<string, JlptQuestion>();
    if (stored) for (const q of stored.questions) map.set(q.id, q);
    return map;
  }, [stored]);

  const currentQuestion: JlptQuestion | null =
    attempt && attempt.questionIds[qIndex] ? questionsById.get(attempt.questionIds[qIndex]) ?? null : null;

  const passage = currentQuestion?.passageId
    ? stored?.passages.find((p) => p.id === currentQuestion.passageId)
    : undefined;

  const currentGroup = useMemo(() => {
    if (!stored || !currentQuestion) return null;
    return stored.exam.groups.find((g) => g.mondai === currentQuestion.mondai && g.questionIds.includes(currentQuestion.id)) ?? null;
  }, [stored, currentQuestion]);

  const answeredCount = attempt ? Object.values(attempt.answers).filter((a) => a.chosenIndex !== null).length : 0;

  const persistAttempt = (next: JlptAttempt) => {
    setAttempt(next);
    putAttempt(next, ownerId).catch(() => {
      // Lưu IndexedDB thất bại (hiếm, hết dung lượng) — bài vẫn tiếp tục được trong bộ nhớ
      // của phiên này; không chặn người học đang làm dở, nhưng không giấu người dùng khỏi
      // rủi ro mất bài nếu đóng tab ngay lúc này.
      console.warn('Không lưu được lượt làm bài JLPT vào IndexedDB.');
    });
  };

  const startAttempt = () => {
    if (!stored) return;
    const a = createAttempt(stored.exam, mode, blockId);
    if (predictedPercent !== '') a.predictedPercent = predictedPercent;
    persistAttempt(a);
    setQIndex(0);
    setView('taking');
  };

  const resume = () => {
    if (!resumableAttempt) return;
    setAttempt(resumableAttempt);
    setQIndex(0);
    setView('taking');
  };

  const setAnswer = (chosenIndex: number) => {
    if (!attempt || !currentQuestion) return;
    const prev = attempt.answers[currentQuestion.id];
    const next: JlptAttempt = {
      ...attempt,
      answers: {
        ...attempt.answers,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          chosenIndex,
          confidence: prev?.confidence ?? 'unsure',
          flagged: prev?.flagged ?? false,
          timeSpentMs: prev?.timeSpentMs ?? 0,
          changeCount: prev ? prev.changeCount + 1 : 0,
        },
      },
    };
    persistAttempt(next);
  };

  const setConfidence = (confidence: Confidence) => {
    if (!attempt || !currentQuestion) return;
    const prev = attempt.answers[currentQuestion.id];
    if (!prev) return;
    persistAttempt({ ...attempt, answers: { ...attempt.answers, [currentQuestion.id]: { ...prev, confidence } } });
  };

  const toggleFlag = () => {
    if (!attempt || !currentQuestion) return;
    const prev = attempt.answers[currentQuestion.id] ?? {
      questionId: currentQuestion.id,
      chosenIndex: null,
      confidence: 'unsure' as Confidence,
      flagged: false,
      timeSpentMs: 0,
      changeCount: 0,
    };
    persistAttempt({ ...attempt, answers: { ...attempt.answers, [currentQuestion.id]: { ...prev, flagged: !prev.flagged } } });
  };

  const linkedKeyFor = (q: JlptQuestion): string | null => {
    const correctKey = q.choices[q.answerIndex]?.linkedItemKey;
    if (correctKey && itemByKey.has(correctKey)) return correctKey;
    const answer = attempt?.answers[q.id];
    const chosenKey = answer?.chosenIndex !== null && answer?.chosenIndex !== undefined ? q.choices[answer.chosenIndex]?.linkedItemKey : undefined;
    if (chosenKey && itemByKey.has(chosenKey)) return chosenKey;
    return null;
  };

  const submit = () => {
    if (!attempt || !stored) return;
    // Áp tín hiệu SRS cho MỌI câu đã trả lời có nối được thẻ — làm ngay lúc nộp, không đợi
    // mổ xẻ (có thể để sau), để lịch ôn không bị treo chỉ vì người học chưa quay lại mổ xẻ.
    for (const qId of attempt.questionIds) {
      const q = questionsById.get(qId);
      const ans = attempt.answers[qId];
      if (!q || !ans || ans.chosenIndex === null) continue;
      const key = linkedKeyFor(q);
      if (!key) continue;
      const wasCorrect = ans.chosenIndex === q.answerIndex;
      recordReview(key, srsSignalForMatrix(wasCorrect, ans.confidence));
    }

    const finalScore = scoreAttempt(attempt, questionsById);
    const submitted: JlptAttempt = {
      ...attempt,
      status: 'submitted',
      submittedAt: Date.now(),
      // Chốt luôn % đúng vào lượt làm bài: trang chủ chỉ cần đọc con số này, khỏi phải nạp
      // lại toàn bộ đề (mỗi đề cả trăm KB) chỉ để hiện "điểm lần gần nhất".
      scorePercent:
        finalScore.totalQuestions > 0
          ? Math.round((finalScore.totalCorrect / finalScore.totalQuestions) * 100)
          : 0,
    };
    persistAttempt(submitted);
    setScore(finalScore);
    setView('results');
  };

  const abandon = async () => {
    if (attempt) await deleteAttempt(attempt.id).catch(() => {});
    onExit();
  };

  // ─── Mổ xẻ (review) ──────────────────────────────────────────────

  const startReview = () => {
    if (!score) return;
    setReviewIndex(0);
    setReviewStep(1);
    setReattemptIndex(null);
    setCause(null);
    setMyRule('');
    setMyExample('');
    setView('review');
  };

  const currentWrongQuestion: JlptQuestion | null =
    score && score.wrongQuestionIds[reviewIndex] ? questionsById.get(score.wrongQuestionIds[reviewIndex]) ?? null : null;

  const finishOneReview = async () => {
    if (!attempt || !stored || !currentWrongQuestion) return;
    const answer = attempt.answers[currentWrongQuestion.id];
    const key = linkedKeyFor(currentWrongQuestion);
    await putMistake({
      id: `mis-${attempt.id}-${currentWrongQuestion.id}`,
      questionId: currentWrongQuestion.id,
      examId: stored.exam.id,
      attemptId: attempt.id,
      createdAt: Date.now(),
      cause: cause ?? 'bat_can',
      confidenceAtAnswer: answer?.confidence ?? 'unsure',
      chosenIndex: answer?.chosenIndex ?? null,
      reattemptIndex,
      myRule: myRule.trim() || undefined,
      myExample: myExample.trim() || undefined,
      srsKey: key ?? undefined,
    }, ownerId).catch(() => {});

    const nextIndex = reviewIndex + 1;
    if (score && nextIndex < score.wrongQuestionIds.length) {
      setReviewIndex(nextIndex);
      setReviewStep(1);
      setReattemptIndex(null);
      setCause(null);
      setMyRule('');
      setMyExample('');
    } else {
      // Bước 7: mini-quiz với tối đa 5 câu vừa mổ xẻ.
      const ids = (score?.wrongQuestionIds ?? []).slice(0, 5);
      if (ids.length > 0) {
        setMiniQuizIds(ids);
        setMiniIndex(0);
        setMiniChoice(null);
        setMiniCorrect(0);
        setView('miniquiz');
      } else {
        finishAttempt();
      }
    }
  };

  const finishAttempt = () => {
    if (attempt && score) {
      const reviewed: JlptAttempt = {
        ...attempt,
        status: 'reviewed',
        reviewedQuestionIds: score.wrongQuestionIds,
      };
      persistAttempt(reviewed);
    }
    setView('done');
  };

  const currentMiniQuestion = questionsById.get(miniQuizIds[miniIndex] ?? '') ?? null;

  const submitMiniAnswer = (idx: number) => {
    if (!currentMiniQuestion) return;
    setMiniChoice(idx);
    if (idx === currentMiniQuestion.answerIndex) setMiniCorrect((c) => c + 1);
  };

  const nextMini = () => {
    if (miniIndex + 1 < miniQuizIds.length) {
      setMiniIndex((i) => i + 1);
      setMiniChoice(null);
    } else {
      finishAttempt();
    }
  };

  // ─── Render ─────────────────────────────────────────────────────

  if (view === 'loading') {
    return (
      <div className="w-full py-24 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
        <Loader2 className="w-5 h-5 animate-spin" /> Đang tải đề...
      </div>
    );
  }

  if (view === 'not-found' || !stored) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-20 px-4">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy đề này</h3>
        <p className="text-slate-500 mb-6 text-sm">Có thể đề đã bị xoá trên máy này.</p>
        <button onClick={onExit} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer text-sm">
          Về danh sách đề
        </button>
      </div>
    );
  }

  // ─ Lobby ("phòng chờ") ─
  if (view === 'lobby') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <button onClick={onExit} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 text-xs font-extrabold shadow-sm mb-6 cursor-pointer">
          <ArrowLeft size={16} /> Danh sách đề
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1">{stored.exam.title}</h1>
        <p className="text-sm font-semibold text-slate-500 mb-6">
          {stored.exam.level} · {stored.exam.blocks.length} khối · {stored.questions.length} câu
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 mb-2">Cấu trúc đề (nói thật, không giấu)</p>
          <ul className="space-y-1.5">
            {stored.exam.blocks.map((b) => (
              <li key={b.id} className="text-sm font-semibold text-slate-700 flex justify-between">
                <span>{b.label}</span>
                <span className="text-slate-400">{b.minutes} phút</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-4 text-sm font-semibold text-indigo-900 leading-relaxed">
          Lần đầu làm đề, hầu hết mọi người thấp hơn mình tưởng — đó là chuyện bình thường và
          chính là dữ liệu bạn cần. Mục tiêu hôm nay không phải điểm cao, mà là tìm ra bạn đang
          hổng chỗ nào.
        </div>

        {resumableAttempt && (
          <button
            onClick={resume}
            className="w-full mb-4 py-3.5 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-md hover:bg-amber-600 active:scale-95 transition-all cursor-pointer"
          >
            Tiếp tục bài đang làm dở ({Object.values(resumableAttempt.answers).filter((a) => a.chosenIndex !== null).length}/{resumableAttempt.questionIds.length} câu)
          </button>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 mb-3">Chọn cỡ phiên</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            {(
              [
                { value: 'taste' as AttemptMode, label: 'Nhấm nháp', desc: '1 nhóm 問題 đầu' },
                { value: 'section' as AttemptMode, label: 'Từng khối', desc: 'chọn 1 khối' },
                { value: 'full' as AttemptMode, label: 'Trọn đề', desc: 'toàn bộ câu' },
              ]
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setMode(opt.value);
                  if (opt.value !== 'section') setBlockId(undefined);
                  else setBlockId(stored.exam.blocks[0]?.id);
                }}
                className={`rounded-xl border-2 p-3 text-left transition-all cursor-pointer ${
                  mode === opt.value ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-sm font-extrabold text-slate-800">{opt.label}</p>
                <p className="text-[11px] font-semibold text-slate-400">{opt.desc}</p>
              </button>
            ))}
          </div>

          {mode === 'section' && (
            <select
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold"
            >
              {stored.exam.blocks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
          <label className="text-xs font-extrabold text-slate-400 mb-2 block">
            Bạn nghĩ mình đúng khoảng bao nhiêu % (tuỳ chọn)?
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={predictedPercent}
            onChange={(e) => setPredictedPercent(e.target.value === '' ? '' : Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)))}
            placeholder="vd. 60"
            className="w-32 px-3 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold"
          />
        </div>

        <button
          onClick={startAttempt}
          className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-base shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
        >
          Bắt đầu làm bài
        </button>
      </div>
    );
  }

  // ─ Taking ─
  if (view === 'taking' && attempt && currentQuestion) {
    const answer = attempt.answers[currentQuestion.id];
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setExitConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 text-xs font-extrabold shadow-sm cursor-pointer"
          >
            <ArrowLeft size={15} /> Thoát
          </button>
          <p className="text-xs font-extrabold text-slate-500">
            Câu {qIndex + 1}/{attempt.questionIds.length} · Đã trả lời {answeredCount}
          </p>
          <button
            onClick={() => setShowAnswerSheet((s) => !s)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-extrabold shadow-sm cursor-pointer"
          >
            Phiếu trả lời
          </button>
        </div>

        {showAnswerSheet && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
            {stored.exam.groups.map((g) => {
              const idsInAttempt = g.questionIds.filter((id) => attempt.questionIds.includes(id));
              if (idsInAttempt.length === 0) return null;
              return (
                <div key={g.mondai} className="mb-3 last:mb-0">
                  <p className="text-[11px] font-extrabold text-slate-400 mb-1.5">{g.mondai}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {idsInAttempt.map((id) => {
                      const idx = attempt.questionIds.indexOf(id);
                      const a = attempt.answers[id];
                      const isCurrent = idx === qIndex;
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setQIndex(idx);
                            setShowAnswerSheet(false);
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-extrabold border-2 transition-all cursor-pointer ${
                            isCurrent
                              ? 'border-indigo-500 bg-indigo-500 text-white'
                              : a?.chosenIndex !== undefined && a?.chosenIndex !== null
                              ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                              : 'border-slate-200 bg-white text-slate-400'
                          } ${a?.flagged ? 'ring-2 ring-amber-400' : ''}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          {currentGroup && (
            <p className="text-xs font-bold text-slate-400 mb-3 pb-3 border-b border-slate-100">{currentGroup.instruction}</p>
          )}

          {passage && (
            <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
              {passage.text}
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-4">
            {currentQuestion.stem && (
              <p className="text-base font-bold text-slate-800 leading-relaxed">
                {renderStem(currentQuestion.stem, currentQuestion.stemUnderline)}
              </p>
            )}
            <button
              onClick={toggleFlag}
              title="Đánh dấu để xem lại"
              className={`shrink-0 p-2 rounded-xl border transition-colors cursor-pointer ${
                answer?.flagged ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-white border-slate-200 text-slate-300 hover:text-amber-500'
              }`}
            >
              <Flag size={16} fill={answer?.flagged ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid gap-2 mb-4">
            {currentQuestion.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => setAnswer(i)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                  answer?.chosenIndex === i ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {i + 1}. {c.text}
              </button>
            ))}
          </div>

          {answer && answer.chosenIndex !== null && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold text-slate-400">Mức độ chắc chắn:</span>
              {CONFIDENCE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setConfidence(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold border transition-all cursor-pointer ${
                    answer.confidence === opt.value ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setQIndex((i) => Math.max(0, i - 1))}
            disabled={qIndex === 0}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-extrabold disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft size={15} /> Câu trước
          </button>

          {qIndex + 1 < attempt.questionIds.length ? (
            <button
              onClick={() => setQIndex((i) => i + 1)}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-extrabold cursor-pointer"
            >
              Câu sau <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => setSubmitConfirm(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-md cursor-pointer"
            >
              <Send size={14} /> Nộp bài
            </button>
          )}
        </div>

        {exitConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" onClick={() => setExitConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <p className="font-extrabold text-slate-800 mb-4">Bạn muốn làm gì với bài đang làm dở?</p>
              <div className="flex flex-col gap-2">
                <button onClick={onExit} className="py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold cursor-pointer">
                  Tạm dừng (giữ bài, làm tiếp sau)
                </button>
                <button
                  onClick={() => {
                    setExitConfirm(false);
                    setSubmitConfirm(true);
                  }}
                  className="py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold cursor-pointer"
                >
                  Nộp luôn
                </button>
                <button onClick={abandon} className="py-2.5 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold cursor-pointer">
                  Huỷ bài (xoá)
                </button>
                <button onClick={() => setExitConfirm(false)} className="py-2 text-slate-400 text-xs font-bold cursor-pointer">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {submitConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" onClick={() => setSubmitConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
              <p className="font-extrabold text-slate-800 mb-2">Nộp bài?</p>
              <p className="text-sm text-slate-500 mb-5">
                {answeredCount < attempt.questionIds.length
                  ? `Còn ${attempt.questionIds.length - answeredCount} câu chưa trả lời.`
                  : 'Đã trả lời hết.'}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setSubmitConfirm(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold cursor-pointer">
                  Làm tiếp
                </button>
                <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold cursor-pointer">
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─ Results ─
  if (view === 'results' && attempt && score) {
    const elapsedMin = formatMinutes((attempt.submittedAt ?? Date.now()) - attempt.startedAt);
    const percent = score.totalQuestions > 0 ? Math.round((score.totalCorrect / score.totalQuestions) * 100) : 0;
    const prevScore = previousAttempt ? scoreAttempt(previousAttempt, questionsById) : null;
    const prevPercent = prevScore && prevScore.totalQuestions > 0 ? Math.round((prevScore.totalCorrect / prevScore.totalQuestions) * 100) : null;

    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-slate-500">
            Bạn vừa hoàn thành {elapsedMin} phút làm bài. Đó là một buổi luyện tập nghiêm túc.
          </p>
        </div>

        {prevPercent !== null && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 text-center text-sm font-bold text-slate-600">
            Lần trước: {prevPercent}% → Lần này: <span className="text-indigo-600">{percent}%</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 mb-3">Kết quả theo từng phần</p>
          <div className="space-y-3">
            {score.bySection.map((s) => (
              <div key={s.section}>
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>{SECTION_LABELS[s.section]}</span>
                  <span>
                    {s.correct}/{s.total}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${s.total > 0 ? (s.correct / s.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 font-semibold mt-3">
            Đây không phải điểm JLPT thật (điểm thật được quy đổi theo IRT) — chỉ là số câu đúng để bạn tự chẩn đoán.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 mb-3">Bản đồ chẩn đoán</p>
          <div className="flex flex-wrap gap-1.5">
            {attempt.questionIds.map((qId, i) => {
              const q = questionsById.get(qId);
              const ans = attempt.answers[qId];
              const isCorrect = q && ans?.chosenIndex === q.answerIndex;
              const isUnanswered = !ans || ans.chosenIndex === null;
              return (
                <div
                  key={qId}
                  title={`Câu ${i + 1}`}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                    isUnanswered
                      ? 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300'
                      : isCorrect
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 font-semibold mt-2">Xanh = đúng · Đỏ = sai · Viền đứt = bỏ trắng</p>
        </div>

        {attempt.predictedPercent !== undefined && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 text-sm font-bold text-slate-600 text-center">
            Bạn đoán {attempt.predictedPercent}%, thực tế {percent}%.
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-lg font-black text-slate-800">
            {score.wrongQuestionIds.length > 0
              ? `${score.wrongQuestionIds.length} câu sai = ${score.wrongQuestionIds.length} cơ hội tìm ra lỗ hổng.`
              : 'Không sai câu nào — thử một đề khó hơn xem sao!'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {score.wrongQuestionIds.length > 0 ? (
            <button onClick={startReview} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-base shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer">
              Bắt đầu mổ xẻ {score.wrongQuestionIds.length} câu →
            </button>
          ) : (
            <button onClick={finishAttempt} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-base shadow-lg cursor-pointer">
              Xong
            </button>
          )}
          {score.wrongQuestionIds.length > 0 && (
            <button onClick={onExit} className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer">
              Để sau
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─ Review (mổ xẻ 7 bước) ─
  if (view === 'review' && currentWrongQuestion && score) {
    const answer = attempt?.answers[currentWrongQuestion.id];
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <p className="text-xs font-extrabold text-slate-400 mb-4 text-center">
          Mổ xẻ câu {reviewIndex + 1}/{score.wrongQuestionIds.length}
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          {currentWrongQuestion.stem && (
            <p className="text-base font-bold text-slate-800 leading-relaxed mb-4">
              {renderStem(currentWrongQuestion.stem, currentWrongQuestion.stemUnderline)}
            </p>
          )}

          {reviewStep === 1 && (
            <>
              <p className="text-xs font-extrabold text-rose-500 mb-3">Bước 1 — Đoán lại khi chưa xem đáp án</p>
              <div className="grid gap-2 mb-4">
                {currentWrongQuestion.choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setReattemptIndex(i)}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                      reattemptIndex === i ? 'border-indigo-500 bg-indigo-50' : i === answer?.chosenIndex ? 'border-rose-300 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {i + 1}. {c.text}
                    {i === answer?.chosenIndex && <span className="ml-2 text-[11px] text-rose-500 font-bold">(bạn đã chọn — sai)</span>}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setReviewStep(2)}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm cursor-pointer"
              >
                Giờ bạn chọn lại đáp án này →
              </button>
            </>
          )}

          {reviewStep === 2 && (
            <>
              <p className="text-xs font-extrabold text-rose-500 mb-3">Bước 2 — Cái gì đã khiến bạn chọn đáp án kia?</p>
              <div className="grid grid-cols-2 gap-2">
                {MISTAKE_CAUSES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCause(c.code);
                      setReviewStep(3);
                    }}
                    className="text-left px-3.5 py-3 rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer"
                  >
                    <p className="text-sm font-extrabold text-slate-800">{c.label}</p>
                    <p className="text-[11px] text-slate-400 font-semibold">{c.hint}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {reviewStep === 3 && (
            <>
              <p className="text-xs font-extrabold text-emerald-600 mb-3">Bước 3 — Đáp án đúng và lời giải cả 4 phương án</p>
              <div className="grid gap-2 mb-4">
                {currentWrongQuestion.choices.map((c, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-xl border-2 text-sm ${
                      i === currentWrongQuestion.answerIndex
                        ? 'border-emerald-300 bg-emerald-50'
                        : i === answer?.chosenIndex
                        ? 'border-rose-300 bg-rose-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      {i === currentWrongQuestion.answerIndex && <CheckCircle2 size={14} className="text-emerald-600" />}
                      {i === answer?.chosenIndex && i !== currentWrongQuestion.answerIndex && <XCircle size={14} className="text-rose-500" />}
                      {i + 1}. {c.text}
                    </p>
                    {c.note && <p className="text-xs text-slate-500 font-semibold mt-1">{c.note}</p>}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500 mb-4 italic">
                Kiến thức hoặc kỹ năng nào lẽ ra đã giúp bạn làm đúng câu này?
              </p>
              <button onClick={() => setReviewStep(4)} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm cursor-pointer">
                Tiếp tục
              </button>
            </>
          )}

          {reviewStep === 4 && (
            <>
              <p className="text-xs font-extrabold text-slate-500 mb-3">Bước 4 — Tự viết lại (không bắt buộc)</p>
              <input
                type="text"
                maxLength={140}
                value={myRule}
                onChange={(e) => setMyRule(e.target.value)}
                placeholder="Quy tắc, bằng lời của chính bạn..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold mb-2"
              />
              <input
                type="text"
                maxLength={140}
                value={myExample}
                onChange={(e) => setMyExample(e.target.value)}
                placeholder="Một câu ví dụ do bạn tự đặt..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-sm font-semibold mb-4"
              />
              <button onClick={finishOneReview} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm cursor-pointer">
                Lưu & tiếp
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─ Mini-quiz kết thúc ─
  if (view === 'miniquiz' && currentMiniQuestion) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8">
        <p className="text-xs font-extrabold text-violet-500 mb-4 text-center flex items-center justify-center gap-1.5">
          <Sparkles size={14} /> Kiểm tra nhanh {miniIndex + 1}/{miniQuizIds.length}
        </p>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          {currentMiniQuestion.stem && (
            <p className="text-base font-bold text-slate-800 mb-4">{renderStem(currentMiniQuestion.stem, currentMiniQuestion.stemUnderline)}</p>
          )}
          <div className="grid gap-2">
            {currentMiniQuestion.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => miniChoice === null && submitMiniAnswer(i)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  miniChoice === null
                    ? 'border-slate-200 hover:border-slate-300 cursor-pointer'
                    : i === currentMiniQuestion.answerIndex
                    ? 'border-emerald-400 bg-emerald-50'
                    : i === miniChoice
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-slate-200 opacity-50'
                }`}
              >
                {i + 1}. {c.text}
              </button>
            ))}
          </div>
        </div>
        {miniChoice !== null && (
          <button onClick={nextMini} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm cursor-pointer">
            {miniIndex + 1 < miniQuizIds.length ? 'Câu tiếp' : 'Xong'}
          </button>
        )}
      </div>
    );
  }

  // ─ Done ─
  if (view === 'done') {
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <BookOpen size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 mb-2">Đã xong buổi luyện tập</h3>
        {miniQuizIds.length > 0 && (
          <p className="text-sm text-slate-500 mb-6">
            Kiểm tra nhanh: {miniCorrect}/{miniQuizIds.length} câu đúng. Các câu sai đã được lên lịch ôn lại.
          </p>
        )}
        <button onClick={onExit} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer text-sm">
          Về danh sách đề
        </button>
      </div>
    );
  }

  return (
    <div className="w-full py-24 flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
      <AlertTriangle className="w-5 h-5" /> Có lỗi hiển thị — thử tải lại trang.
    </div>
  );
};
