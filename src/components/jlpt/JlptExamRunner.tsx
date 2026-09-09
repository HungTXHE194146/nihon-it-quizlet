import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Clock,
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
  wrongIdsOf,
  pendingReviewIdsOf,
  SECTION_LABELS,
  type AttemptScore,
} from '../../lib/jlpt/attemptLogic';
import { getStoredExam, listAttempts, putAttempt, deleteAttempt, putMistake } from '../../lib/jlpt/db';
import { jlptCardKey } from '../../lib/jlpt/srsKey';
import { useJlptOwner } from '../../hooks/useJlptOwner';
import { CONFIDENCE_LABELS } from '../../lib/jlpt/mistakeStats';
import { formatClock } from '../../lib/format';
import { StemText } from './StemText';

interface JlptExamRunnerProps {
  examId: string;
  onExit: () => void;
}

type View = 'loading' | 'not-found' | 'lobby' | 'taking' | 'results' | 'review' | 'miniquiz' | 'done';

function formatMinutes(ms: number): number {
  return Math.max(1, Math.round(ms / 60000));
}

/** Dùng chung nhãn với sổ tay lỗi để hai màn hình không bao giờ gọi cùng một mức bằng hai tên. */
const CONFIDENCE_OPTIONS: { value: Confidence; label: string }[] = (
  ['sure', 'unsure', 'guess'] as Confidence[]
).map((value) => ({ value, label: CONFIDENCE_LABELS[value] }));

export const JlptExamRunner: React.FC<JlptExamRunnerProps> = ({ examId, onExit }) => {
  const { recordReview } = useProgress();
  // Đề dùng chung cả máy, nhưng lượt làm bài thì của riêng người đang đăng nhập.
  const { ownerId, claimEpoch } = useJlptOwner();

  const [view, setView] = useState<View>('loading');
  const [stored, setStored] = useState<StoredJlptExam | null>(null);
  /**
   * MỌI lượt làm bài của đề này (của riêng người đang đăng nhập), mới nhất trước.
   *
   * Giữ cả danh sách chứ không chỉ "lượt đang dở" + "lượt gần nhất" như trước: sảnh cần phân
   * biệt được ba việc khác nhau (làm tiếp bài dở / mổ xẻ nốt bài đã nộp / xem lại kết quả cũ),
   * và màn kết quả cần tìm đúng lượt LIỀN TRƯỚC lượt đang xem để so sánh — không phải lúc nào
   * cũng là lượt gần nhất.
   */
  const [attempts, setAttempts] = useState<JlptAttempt[]>([]);

  const [mode, setMode] = useState<AttemptMode>('taste');
  const [blockId, setBlockId] = useState<string | undefined>(undefined);
  const [predictedPercent, setPredictedPercent] = useState<number | ''>('');

  const [attempt, setAttempt] = useState<JlptAttempt | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [submitConfirm, setSubmitConfirm] = useState(false);

  const [score, setScore] = useState<AttemptScore | null>(null);
  /** Màn kết quả đang mở lại một lượt cũ (từ sảnh) hay vừa nộp bài xong? Lời chào khác nhau. */
  const [resultsAreRevisit, setResultsAreRevisit] = useState(false);

  /**
   * Danh sách câu sai của LƯỢT MỔ XẺ hiện tại, chốt một lần lúc bắt đầu mổ xẻ.
   *
   * Không tính lại theo `attempt.reviewedQuestionIds` ở mỗi lần render: mỗi câu mổ xẻ xong sẽ
   * bị loại khỏi danh sách "còn phải mổ xẻ", làm cả mảng dồn lên một ô và `reviewIndex` nhảy
   * cóc qua câu kế tiếp.
   */
  const [reviewQueue, setReviewQueue] = useState<string[]>([]);
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

  /** Đồng hồ hệ thống, cập nhật mỗi giây trong lúc làm bài — dùng để đếm ngược tới `deadline`. */
  const [now, setNow] = useState(Date.now());

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
      const all = await listAttempts(ownerId).catch(() => []);
      const forThisExam = all
        .filter((a) => a.examId === examId)
        // Mới nhất trước; lượt đang làm dở chưa có submittedAt nên xếp theo startedAt.
        .sort((a, b) => (b.submittedAt ?? b.startedAt) - (a.submittedAt ?? a.startedAt));
      setAttempts(forThisExam);
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

  // ─── Các lượt làm bài cũ, phân theo việc người học có thể làm tiếp với chúng ─────

  /** Bài đang làm dở — làm tiếp được. */
  const runningAttempt = attempts.find((a) => a.status === 'running') ?? null;

  /** Bài đã nộp nhưng còn câu sai chưa mổ xẻ — đây là "việc dở dang" quan trọng nhất. */
  const pendingReviewAttempt =
    attempts.find(
      (a) => a.status !== 'running' && pendingReviewIdsOf(a, questionsById).length > 0
    ) ?? null;

  /** Bài đã nộp gần nhất (dù đã mổ xẻ xong hay chưa) — để xem lại kết quả. */
  const lastSubmittedAttempt = attempts.find((a) => a.status !== 'running' && a.submittedAt) ?? null;

  const persistAttempt = (next: JlptAttempt) => {
    setAttempt(next);
    // Giữ danh sách lượt làm bài khớp với bản vừa ghi, để sảnh và màn kết quả không hiện
    // thông tin cũ sau khi nộp bài / mổ xẻ xong.
    setAttempts((prev) => {
      const rest = prev.filter((a) => a.id !== next.id);
      return [next, ...rest].sort(
        (a, b) => (b.submittedAt ?? b.startedAt) - (a.submittedAt ?? a.startedAt)
      );
    });
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
    if (!runningAttempt) return;
    setAttempt(runningAttempt);
    setQIndex(0);
    setView('taking');
  };

  /**
   * Mở lại màn kết quả của một lượt đã nộp trước đó.
   *
   * Trước đây chỉ vào được màn kết quả ngay sau khi bấm Nộp bài — rời đi là mất luôn đường
   * quay lại mổ xẻ (đúng cái bẫy "để sau = không bao giờ" mà mục 5.3.1 của tài liệu thiết kế
   * cảnh báo). `score` được tính lại từ chính lượt đã lưu nên không cần state cũ còn sống.
   */
  const openResults = (a: JlptAttempt) => {
    setAttempt(a);
    setScore(scoreAttempt(a, questionsById));
    setResultsAreRevisit(true);
    setView('results');
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

  const submit = useCallback(() => {
    if (!attempt || !stored) return;
    // Áp tín hiệu SRS cho MỌI câu đã trả lời — làm ngay lúc nộp, không đợi mổ xẻ (có thể để
    // sau), để lịch ôn không bị treo chỉ vì người học chưa quay lại mổ xẻ.
    for (const qId of attempt.questionIds) {
      const q = questionsById.get(qId);
      const ans = attempt.answers[qId];
      if (!q || !ans || ans.chosenIndex === null) continue;
      const wasCorrect = ans.chosenIndex === q.answerIndex;
      // Ma trận độ chắc chắn × đúng-sai (ticket 006, mục 6.3/6.4) áp cho MỌI thẻ nhận tín hiệu
      // từ câu này — cả khoá riêng của câu hỏi lẫn thẻ từ vựng nối được, nếu có. Chính câu hỏi
      // luôn vào lịch ôn của nó, bất kể có nối được thẻ từ vựng hay không — phần lớn câu
      // 文法/読解/聴解 của một đề thật không có từ vựng nào để nối (ticket 005).
      recordReview(jlptCardKey(stored.exam.id, qId), wasCorrect, ans.confidence);
      const key = linkedKeyFor(q);
      if (key) recordReview(key, wasCorrect, ans.confidence);
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
      // Cùng lý do: danh sách câu sai cho phép đếm "còn bao nhiêu câu chưa mổ xẻ" ở trang chủ
      // và danh sách đề mà không phải mở đề ra.
      wrongQuestionIds: finalScore.wrongQuestionIds,
    };
    persistAttempt(submitted);
    setScore(finalScore);
    setResultsAreRevisit(false);
    setView('results');
    // `persistAttempt`/`linkedKeyFor` đóng gói lại mỗi lượt render giống `attempt`, và
    // `submit` cũng được tạo lại theo đúng `attempt` đó (có trong deps) nên luôn thấy bản mới
    // nhất của cả hai — liệt kê thêm chúng vào deps sẽ chỉ khiến `submit` bị tạo lại thường
    // xuyên hơn mà không đổi hành vi gì.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, stored, questionsById, recordReview]);

  const abandon = async () => {
    if (attempt) await deleteAttempt(attempt.id).catch(() => {});
    onExit();
  };

  // ─── Đồng hồ đếm ngược (mode full/section) ─────────────────────────
  //
  // `deadline` chỉ tồn tại khi mode có hạn tính giờ (xem `createAttempt`) — mode `taste` cố ý
  // không có, nên không đếm ngược/không tự nộp (mục 5.1: phiên "nhấm nháp" không áp lực gắt).

  /** Đồng hồ chạy đúng khi đang làm bài; tách riêng khỏi effect kiểm tra hết giờ bên dưới để
   * không phải tạo/huỷ `setInterval` mỗi lần trạng thái bài thi đổi (mỗi câu trả lời). */
  useEffect(() => {
    if (view !== 'taking') return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [view]);

  // Cố ý liệt kê `submit` (không memo hoá) vào deps: nó đóng gói `attempt` mới nhất tại mỗi
  // lượt render, nên effect phải chạy lại theo nó để không nộp bài bằng một bản `attempt` cũ
  // (thiếu câu vừa chọn) khi đồng hồ vừa chạm hạn — cùng cách ExamSession.tsx đã làm.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (view !== 'taking' || !attempt || attempt.deadline === undefined) return;
    if (attempt.status !== 'running') return; // đã nộp rồi thì đừng gọi lại
    if (now >= attempt.deadline) submit();
  }, [now, view, attempt, submit]);

  // ─── Mổ xẻ (review) ──────────────────────────────────────────────

  /** Câu sai còn phải mổ xẻ của lượt đang xem — bỏ qua những câu đã mổ xẻ ở lần trước. */
  const pendingReviewIds = attempt ? pendingReviewIdsOf(attempt, questionsById) : [];

  const startReview = () => {
    if (!attempt || pendingReviewIds.length === 0) return;
    setReviewQueue(pendingReviewIds);
    setReviewIndex(0);
    setReviewStep(1);
    setReattemptIndex(null);
    setCause(null);
    setMyRule('');
    setMyExample('');
    setView('review');
  };

  const currentWrongQuestion: JlptQuestion | null =
    reviewQueue[reviewIndex] ? questionsById.get(reviewQueue[reviewIndex]) ?? null : null;

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

    // Ghi nhận NGAY câu vừa mổ xẻ xong, không đợi hết cả loạt: bỏ dở giữa chừng (đóng tab,
    // bấm back) thì lần sau vẫn tiếp tục đúng chỗ thay vì phải mổ xẻ lại từ câu đầu.
    const reviewedId = currentWrongQuestion.id;
    const alreadyReviewed = attempt.reviewedQuestionIds.includes(reviewedId);
    persistAttempt({
      ...attempt,
      reviewedQuestionIds: alreadyReviewed
        ? attempt.reviewedQuestionIds
        : [...attempt.reviewedQuestionIds, reviewedId],
    });

    const nextIndex = reviewIndex + 1;
    if (nextIndex < reviewQueue.length) {
      setReviewIndex(nextIndex);
      setReviewStep(1);
      setReattemptIndex(null);
      setCause(null);
      setMyRule('');
      setMyExample('');
    } else {
      // Bước 7: mini-quiz với tối đa 5 câu vừa mổ xẻ trong lượt này.
      const ids = reviewQueue.slice(0, 5);
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
    if (attempt) {
      // Chỉ đánh dấu 'reviewed' khi thật sự không còn câu nào chờ mổ xẻ. Câu vừa mổ xẻ trong
      // lượt này đã được ghi vào reviewedQuestionIds ở finishOneReview, nên chỉ cần đối chiếu
      // lại với danh sách câu sai — không ghi đè bằng cả loạt như trước (sẽ nói dối là đã mổ
      // xẻ hết trong khi người học mới làm một phần).
      const stillPending = pendingReviewIdsOf(attempt, questionsById).filter(
        (id) => !reviewQueue.slice(0, reviewIndex + 1).includes(id)
      );
      if (stillPending.length === 0 && attempt.status !== 'reviewed') {
        persistAttempt({
          ...attempt,
          status: 'reviewed',
          reviewedQuestionIds: wrongIdsOf(attempt, questionsById),
        });
      }
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
      <div className="w-full py-24 flex items-center justify-center gap-2 text-slate-400 dark:text-neutral-500 text-sm font-bold">
        <Loader2 className="w-5 h-5 animate-spin" /> Đang tải đề...
      </div>
    );
  }

  if (view === 'not-found' || !stored) {
    return (
      <div className="w-full max-w-md mx-auto text-center py-20 px-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-100 mb-2">Không tìm thấy đề này</h3>
        <p className="text-slate-500 dark:text-neutral-400 mb-6 text-sm">Có thể đề đã bị xoá trên máy này.</p>
        <button onClick={onExit} className="px-6 py-3 bg-indigo-600 dark:bg-red-600 text-white rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer text-sm">
          Về danh sách đề
        </button>
      </div>
    );
  }

  // ─ Lobby ("phòng chờ") ─
  if (view === 'lobby') {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <button onClick={onExit} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-red-400 text-xs font-extrabold shadow-sm mb-6 cursor-pointer">
          <ArrowLeft size={16} /> Danh sách đề
        </button>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-neutral-100 mb-1">{stored.exam.title}</h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-neutral-400 mb-6">
          {stored.exam.level} · {stored.exam.blocks.length} khối · {stored.questions.length} câu
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-2">Cấu trúc đề (nói thật, không giấu)</p>
          <ul className="space-y-1.5">
            {stored.exam.blocks.map((b) => (
              <li key={b.id} className="text-sm font-semibold text-slate-700 dark:text-neutral-200 flex justify-between">
                <span>{b.label}</span>
                <span className="text-slate-400 dark:text-neutral-500">{b.minutes} phút</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 dark:bg-red-950/30 dark:border-red-900 rounded-2xl p-5 mb-4 text-sm font-semibold text-indigo-900 dark:text-red-200 leading-relaxed">
          Lần đầu làm đề, hầu hết mọi người thấp hơn mình tưởng — đó là chuyện bình thường và
          chính là dữ liệu bạn cần. Mục tiêu hôm nay không phải điểm cao, mà là tìm ra bạn đang
          hổng chỗ nào.
        </div>

        {runningAttempt && (
          <button
            onClick={resume}
            className="w-full mb-4 py-3.5 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-md hover:bg-amber-600 active:scale-95 transition-all cursor-pointer"
          >
            Tiếp tục bài đang làm dở ({Object.values(runningAttempt.answers).filter((a) => a.chosenIndex !== null).length}/{runningAttempt.questionIds.length} câu)
          </button>
        )}

        {/* Việc dở dang quan trọng nhất: đã nộp bài nhưng chưa mổ xẻ hết câu sai. Đặt trên
            phần chọn cỡ phiên vì mổ xẻ câu đã sai có giá trị hơn làm thêm một lượt mới. */}
        {pendingReviewAttempt && (
          <button
            onClick={() => openResults(pendingReviewAttempt)}
            className="w-full mb-4 py-3.5 rounded-2xl bg-indigo-600 dark:bg-red-600 text-white font-black text-sm shadow-md hover:bg-indigo-700 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
          >
            Mổ xẻ nốt {pendingReviewIdsOf(pendingReviewAttempt, questionsById).length} câu sai của lần trước →
          </button>
        )}

        {lastSubmittedAttempt && lastSubmittedAttempt.id !== pendingReviewAttempt?.id && (
          <button
            onClick={() => openResults(lastSubmittedAttempt)}
            className="w-full mb-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
          >
            Xem lại kết quả lần trước
            {lastSubmittedAttempt.scorePercent !== undefined && ` (${lastSubmittedAttempt.scorePercent}%)`}
          </button>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-3">Chọn cỡ phiên</p>
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
                  mode === opt.value
                    ? 'border-indigo-500 bg-indigo-50 dark:border-red-500 dark:bg-red-950/30'
                    : 'border-slate-200 hover:border-slate-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                }`}
              >
                <p className="text-sm font-extrabold text-slate-800 dark:text-neutral-100">{opt.label}</p>
                <p className="text-[11px] font-semibold text-slate-400 dark:text-neutral-500">{opt.desc}</p>
              </button>
            ))}
          </div>

          {mode === 'section' && (
            <select
              value={blockId}
              onChange={(e) => setBlockId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 text-sm font-bold"
            >
              {stored.exam.blocks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-6">
          <label className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-2 block">
            Bạn nghĩ mình đúng khoảng bao nhiêu % (tuỳ chọn)?
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={predictedPercent}
            onChange={(e) => setPredictedPercent(e.target.value === '' ? '' : Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0)))}
            placeholder="vd. 60"
            className="w-32 px-3 py-2.5 rounded-xl border-2 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 text-sm font-bold"
          />
        </div>

        <button
          onClick={startAttempt}
          className="w-full py-4 rounded-2xl bg-indigo-600 dark:bg-red-600 text-white font-black text-base shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
        >
          Bắt đầu làm bài
        </button>
      </div>
    );
  }

  // ─ Taking ─
  if (view === 'taking' && attempt && currentQuestion) {
    const answer = attempt.answers[currentQuestion.id];
    // `deadline` chỉ tồn tại ở mode full/section (mục 5.1: mode taste cố ý không có áp lực
    // thời gian gắt — xem `createAttempt`) nên đồng hồ chỉ hiện khi có.
    const remainingSec = attempt.deadline !== undefined ? (attempt.deadline - now) / 1000 : null;
    const urgent = remainingSec !== null && remainingSec <= 300;

    // Phiếu trả lời: hiện cố định trong sidebar bên phải ở màn lớn (kiểu Bunpro), và vẫn là
    // panel bật/tắt ở màn nhỏ vì không đủ chỗ cho 2 cột — cùng một nội dung, dùng lại chứ
    // không viết hai lần.
    const answerSheetGrid = (
      <>
        {stored.exam.groups.map((g) => {
          const idsInAttempt = g.questionIds.filter((id) => attempt.questionIds.includes(id));
          if (idsInAttempt.length === 0) return null;
          return (
            <div key={g.mondai} className="mb-3 last:mb-0">
              <p className="text-[11px] font-extrabold text-slate-400 dark:text-neutral-500 mb-1.5">{g.mondai}</p>
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
                          ? 'border-indigo-500 bg-indigo-500 text-white dark:border-red-500 dark:bg-red-600'
                          : a?.chosenIndex !== undefined && a?.chosenIndex !== null
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300'
                          : 'border-slate-200 bg-white text-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500'
                      } ${a?.flagged ? 'ring-2 ring-amber-400 dark:ring-amber-500' : ''}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );

    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <button
            onClick={() => setExitConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-rose-400 text-xs font-extrabold shadow-sm cursor-pointer shrink-0"
          >
            <ArrowLeft size={15} /> Thoát
          </button>
          <p className="text-xs font-extrabold text-slate-500 dark:text-neutral-400 text-center min-w-0">
            Câu {qIndex + 1}/{attempt.questionIds.length} · Đã trả lời {answeredCount}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {remainingSec !== null && (
              <span
                title="Thời gian còn lại — hết giờ tự động nộp bài"
                className={`inline-flex items-center gap-1.5 py-2 px-3 rounded-xl border text-sm font-black font-mono tabular-nums ${
                  urgent
                    ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700'
                }`}
              >
                <Clock size={15} />
                {formatClock(remainingSec)}
              </span>
            )}
            <button
              onClick={() => setShowAnswerSheet((s) => !s)}
              className="lg:hidden px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 text-xs font-extrabold shadow-sm cursor-pointer"
            >
              Phiếu trả lời
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-5 lg:items-start">
          <div className="min-w-0">
            {showAnswerSheet && (
              <div className="lg:hidden bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-4 mb-4">
                {answerSheetGrid}
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
              {currentGroup && (
                <p className="text-xs font-bold text-slate-400 dark:text-neutral-500 mb-3 pb-3 border-b border-slate-100 dark:border-neutral-800">{currentGroup.instruction}</p>
              )}

              {passage && (
                <div className="bg-slate-50 dark:bg-neutral-800 rounded-xl p-4 mb-4 text-sm leading-relaxed text-slate-700 dark:text-neutral-300 whitespace-pre-wrap">
                  {passage.text}
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-4">
                {currentQuestion.stem && (
                  <p className="text-base font-bold text-slate-800 dark:text-neutral-100 leading-relaxed">
                    <StemText stem={currentQuestion.stem} underline={currentQuestion.stemUnderline} />
                  </p>
                )}
                <button
                  onClick={toggleFlag}
                  title="Đánh dấu để xem lại"
                  className={`shrink-0 p-2 rounded-xl border transition-colors cursor-pointer ${
                    answer?.flagged
                      ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-400'
                      : 'bg-white border-slate-200 text-slate-300 hover:text-amber-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-600 dark:hover:text-amber-400'
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
                      answer?.chosenIndex === i
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900 dark:border-red-500 dark:bg-red-950/30 dark:text-red-200'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {i + 1}. {c.text}
                  </button>
                ))}
              </div>

              {answer && answer.chosenIndex !== null && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold text-slate-400 dark:text-neutral-500">Mức độ chắc chắn:</span>
                  {CONFIDENCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setConfidence(opt.value)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold border transition-all cursor-pointer ${
                        answer.confidence === opt.value
                          ? 'bg-slate-800 border-slate-800 text-white dark:bg-red-600 dark:border-red-600'
                          : 'bg-white border-slate-200 text-slate-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
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
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 text-xs font-extrabold disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft size={15} /> Câu trước
              </button>

              {qIndex + 1 < attempt.questionIds.length ? (
                <button
                  onClick={() => setQIndex((i) => i + 1)}
                  className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 text-white dark:bg-red-600 text-xs font-extrabold cursor-pointer"
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
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-4">
              <p className="text-xs font-extrabold text-slate-500 dark:text-neutral-400 mb-3">Phiếu trả lời</p>
              {answerSheetGrid}
            </div>
          </aside>
        </div>

        {exitConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" onClick={() => setExitConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full dark:bg-neutral-900">
              <p className="font-extrabold text-slate-800 dark:text-neutral-100 mb-4">Bạn muốn làm gì với bài đang làm dở?</p>
              <div className="flex flex-col gap-2">
                <button onClick={onExit} className="py-2.5 rounded-xl bg-indigo-600 text-white dark:bg-red-600 text-sm font-bold cursor-pointer">
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
                <button onClick={abandon} className="py-2.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 text-sm font-bold cursor-pointer">
                  Huỷ bài (xoá)
                </button>
                <button onClick={() => setExitConfirm(false)} className="py-2 text-slate-400 dark:text-neutral-500 text-xs font-bold cursor-pointer">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {submitConfirm && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4" onClick={() => setSubmitConfirm(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-sm w-full text-center dark:bg-neutral-900">
              <p className="font-extrabold text-slate-800 dark:text-neutral-100 mb-2">Nộp bài?</p>
              <p className="text-sm text-slate-500 dark:text-neutral-400 mb-5">
                {answeredCount < attempt.questionIds.length
                  ? `Còn ${attempt.questionIds.length - answeredCount} câu chưa trả lời.`
                  : 'Đã trả lời hết.'}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setSubmitConfirm(false)} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300 text-sm font-bold cursor-pointer">
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
    // Lượt LIỀN TRƯỚC lượt đang xem — không phải lượt gần nhất, vì màn này còn dùng để xem
    // lại một lượt cũ (khi đó "lần trước" phải là lượt cũ hơn nữa, không phải chính nó).
    const previousAttempt =
      attempts.find(
        (a) => a.id !== attempt.id && a.submittedAt && a.submittedAt < (attempt.submittedAt ?? 0)
      ) ?? null;
    const prevScore = previousAttempt ? scoreAttempt(previousAttempt, questionsById) : null;
    const prevPercent = prevScore && prevScore.totalQuestions > 0 ? Math.round((prevScore.totalCorrect / prevScore.totalQuestions) * 100) : null;

    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          {resultsAreRevisit ? (
            <p className="text-sm font-bold text-slate-500 dark:text-neutral-400">
              Bài đã nộp {new Date(attempt.submittedAt ?? 0).toLocaleDateString('vi-VN')} · làm trong {elapsedMin} phút.
            </p>
          ) : (
            <p className="text-sm font-bold text-slate-500 dark:text-neutral-400">
              Bạn vừa hoàn thành {elapsedMin} phút làm bài. Đó là một buổi luyện tập nghiêm túc.
            </p>
          )}
        </div>

        {prevPercent !== null && (
          <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-4 mb-4 text-center text-sm font-bold text-slate-600 dark:text-neutral-300">
            Lần trước: {prevPercent}% → Lần này: <span className="text-indigo-600 dark:text-red-400">{percent}%</span>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-3">Kết quả theo từng phần</p>
          <div className="space-y-3">
            {score.bySection.map((s) => (
              <div key={s.section}>
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-neutral-300 mb-1">
                  <span>{SECTION_LABELS[s.section]}</span>
                  <span>
                    {s.correct}/{s.total}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 dark:bg-red-500 rounded-full"
                    style={{ width: `${s.total > 0 ? (s.correct / s.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 dark:text-neutral-500 font-semibold mt-3">
            Đây không phải điểm JLPT thật (điểm thật được quy đổi theo IRT) — chỉ là số câu đúng để bạn tự chẩn đoán.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          <p className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-3">Bản đồ chẩn đoán</p>
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
                      ? 'bg-slate-100 text-slate-400 border-2 border-dashed border-slate-300 dark:bg-neutral-800 dark:text-neutral-500 dark:border-neutral-600'
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
          <p className="text-[11px] text-slate-400 dark:text-neutral-500 font-semibold mt-2">Xanh = đúng · Đỏ = sai · Viền đứt = bỏ trắng</p>
        </div>

        {attempt.predictedPercent !== undefined && (
          <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-4 mb-4 text-sm font-bold text-slate-600 dark:text-neutral-300 text-center">
            Bạn đoán {attempt.predictedPercent}%, thực tế {percent}%.
          </div>
        )}

        <div className="text-center mb-6">
          <p className="text-lg font-black text-slate-800 dark:text-neutral-100">
            {pendingReviewIds.length > 0
              ? `${pendingReviewIds.length} câu sai = ${pendingReviewIds.length} cơ hội tìm ra lỗ hổng.`
              : score.wrongQuestionIds.length > 0
              ? 'Đã mổ xẻ xong toàn bộ câu sai của bài này.'
              : 'Không sai câu nào — thử một đề khó hơn xem sao!'}
          </p>
          {/* Đã mổ xẻ được một phần rồi mới quay lại: nói rõ đã làm tới đâu, để không tưởng
              là phải bắt đầu lại từ câu đầu. */}
          {pendingReviewIds.length > 0 && attempt.reviewedQuestionIds.length > 0 && (
            <p className="text-xs font-bold text-slate-400 dark:text-neutral-500 mt-1">
              (đã mổ xẻ {attempt.reviewedQuestionIds.length}/{score.wrongQuestionIds.length} câu ở lần trước)
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {pendingReviewIds.length > 0 ? (
            <button onClick={startReview} className="w-full py-4 rounded-2xl bg-indigo-600 dark:bg-red-600 text-white font-black text-base shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer">
              {attempt.reviewedQuestionIds.length > 0 ? 'Mổ xẻ nốt' : 'Bắt đầu mổ xẻ'} {pendingReviewIds.length} câu →
            </button>
          ) : (
            <button onClick={finishAttempt} className="w-full py-4 rounded-2xl bg-indigo-600 dark:bg-red-600 text-white font-black text-base shadow-lg dark:shadow-none cursor-pointer">
              Xong
            </button>
          )}
          {pendingReviewIds.length > 0 && (
            <button onClick={onExit} className="text-xs font-bold text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-300 cursor-pointer">
              Để sau — bài này vẫn chờ bạn ở danh sách đề
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─ Review (mổ xẻ 7 bước) ─
  if (view === 'review' && currentWrongQuestion) {
    const answer = attempt?.answers[currentWrongQuestion.id];
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        {/* Đếm theo hàng đợi của LƯỢT MỔ XẺ NÀY, không theo tổng số câu sai: quay lại mổ xẻ
            nốt 3 câu còn thiếu thì phải là "1/3", không phải "10/12". */}
        <p className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 mb-4 text-center">
          Mổ xẻ câu {reviewIndex + 1}/{reviewQueue.length}
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          {currentWrongQuestion.stem && (
            <p className="text-base font-bold text-slate-800 dark:text-neutral-100 leading-relaxed mb-4">
              <StemText stem={currentWrongQuestion.stem} underline={currentWrongQuestion.stemUnderline} />
            </p>
          )}

          {reviewStep === 1 && (
            <>
              <p className="text-xs font-extrabold text-rose-500 dark:text-rose-400 mb-3">Bước 1 — Đoán lại khi chưa xem đáp án</p>
              <div className="grid gap-2 mb-4">
                {currentWrongQuestion.choices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setReattemptIndex(i)}
                    className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer ${
                      reattemptIndex === i
                        ? 'border-indigo-500 bg-indigo-50 dark:border-red-500 dark:bg-red-950/30'
                        : i === answer?.chosenIndex
                        ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40'
                        : 'border-slate-200 hover:border-slate-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                    }`}
                  >
                    {i + 1}. {c.text}
                    {i === answer?.chosenIndex && <span className="ml-2 text-[11px] text-rose-500 dark:text-rose-400 font-bold">(bạn đã chọn — sai)</span>}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setReviewStep(2)}
                className="w-full py-3 rounded-xl bg-indigo-600 dark:bg-red-600 text-white font-bold text-sm cursor-pointer"
              >
                Giờ bạn chọn lại đáp án này →
              </button>
            </>
          )}

          {reviewStep === 2 && (
            <>
              <p className="text-xs font-extrabold text-rose-500 dark:text-rose-400 mb-3">Bước 2 — Cái gì đã khiến bạn chọn đáp án kia?</p>
              <div className="grid grid-cols-2 gap-2">
                {MISTAKE_CAUSES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCause(c.code);
                      setReviewStep(3);
                    }}
                    className="text-left px-3.5 py-3 rounded-xl border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 dark:border-neutral-700 dark:hover:border-red-800 dark:hover:bg-red-950/30 transition-all cursor-pointer"
                  >
                    <p className="text-sm font-extrabold text-slate-800 dark:text-neutral-100">{c.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-neutral-500 font-semibold">{c.hint}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {reviewStep === 3 && (
            <>
              <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mb-3">Bước 3 — Đáp án đúng và lời giải cả 4 phương án</p>
              <div className="grid gap-2 mb-4">
                {currentWrongQuestion.choices.map((c, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-xl border-2 text-sm ${
                      i === currentWrongQuestion.answerIndex
                        ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                        : i === answer?.chosenIndex
                        ? 'border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40'
                        : 'border-slate-200 dark:border-neutral-800'
                    }`}
                  >
                    <p className="font-bold text-slate-800 dark:text-neutral-100 flex items-center gap-1.5">
                      {i === currentWrongQuestion.answerIndex && <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />}
                      {i === answer?.chosenIndex && i !== currentWrongQuestion.answerIndex && <XCircle size={14} className="text-rose-500 dark:text-rose-400" />}
                      {i + 1}. {c.text}
                    </p>
                    {c.note && <p className="text-xs text-slate-500 dark:text-neutral-400 font-semibold mt-1">{c.note}</p>}
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-neutral-400 mb-4 italic">
                Kiến thức hoặc kỹ năng nào lẽ ra đã giúp bạn làm đúng câu này?
              </p>
              <button onClick={() => setReviewStep(4)} className="w-full py-3 rounded-xl bg-indigo-600 dark:bg-red-600 text-white font-bold text-sm cursor-pointer">
                Tiếp tục
              </button>
            </>
          )}

          {reviewStep === 4 && (
            <>
              <p className="text-xs font-extrabold text-slate-500 dark:text-neutral-400 mb-3">Bước 4 — Tự viết lại (không bắt buộc)</p>
              <input
                type="text"
                maxLength={140}
                value={myRule}
                onChange={(e) => setMyRule(e.target.value)}
                placeholder="Quy tắc, bằng lời của chính bạn..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 text-sm font-semibold mb-2"
              />
              <input
                type="text"
                maxLength={140}
                value={myExample}
                onChange={(e) => setMyExample(e.target.value)}
                placeholder="Một câu ví dụ do bạn tự đặt..."
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 text-sm font-semibold mb-4"
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
        <p className="text-xs font-extrabold text-violet-500 dark:text-violet-400 mb-4 text-center flex items-center justify-center gap-1.5">
          <Sparkles size={14} /> Kiểm tra nhanh {miniIndex + 1}/{miniQuizIds.length}
        </p>
        <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-4">
          {currentMiniQuestion.stem && (
            <p className="text-base font-bold text-slate-800 dark:text-neutral-100 mb-4"><StemText stem={currentMiniQuestion.stem} underline={currentMiniQuestion.stemUnderline} /></p>
          )}
          <div className="grid gap-2">
            {currentMiniQuestion.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => miniChoice === null && submitMiniAnswer(i)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  miniChoice === null
                    ? 'border-slate-200 hover:border-slate-300 dark:border-neutral-700 dark:hover:border-neutral-600 cursor-pointer'
                    : i === currentMiniQuestion.answerIndex
                    ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
                    : i === miniChoice
                    ? 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/40'
                    : 'border-slate-200 opacity-50 dark:border-neutral-800'
                }`}
              >
                {i + 1}. {c.text}
              </button>
            ))}
          </div>
        </div>
        {miniChoice !== null && (
          <button onClick={nextMini} className="w-full py-3 rounded-xl bg-indigo-600 dark:bg-red-600 text-white font-bold text-sm cursor-pointer">
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
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
          <BookOpen size={28} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-800 dark:text-neutral-100 mb-2">Đã xong buổi luyện tập</h3>
        {miniQuizIds.length > 0 && (
          <p className="text-sm text-slate-500 dark:text-neutral-400 mb-6">
            Kiểm tra nhanh: {miniCorrect}/{miniQuizIds.length} câu đúng. Các câu sai đã được lên lịch ôn lại.
          </p>
        )}
        <button onClick={onExit} className="px-6 py-3 bg-indigo-600 dark:bg-red-600 text-white rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer text-sm">
          Về danh sách đề
        </button>
      </div>
    );
  }

  return (
    <div className="w-full py-24 flex items-center justify-center gap-2 text-slate-400 dark:text-neutral-500 text-sm font-bold">
      <AlertTriangle className="w-5 h-5" /> Có lỗi hiển thị — thử tải lại trang.
    </div>
  );
};
