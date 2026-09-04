import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { Lesson, StudyItem } from '../data/lessons';
import type { StudyMode } from '../hooks/useHashRoute';
import { QuestionCard } from './QuestionCard';
import { VocabularyCard } from './VocabularyCard';
import { ResultScreen } from './ResultScreen';
import { useProgress } from '../hooks/useProgress';
import { cardKey, itemByKey, subjectLang } from '../lib/itemIndex';
import { formatInterval } from '../lib/srs';
import { ttsSupported } from '../lib/tts';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Shuffle,
  Sparkles,
  Settings,
  SlidersHorizontal,
  Volume2,
  History,
  CalendarClock,
} from 'lucide-react';

interface SessionQuestion {
  /** Khoá tiến độ `subjectId::itemId`. */
  key: string;
  subjectId: string;
  item: StudyItem;
  lessonTitle: string;
  sectionTitle: string;
  sectionType: 'vocabulary' | 'multiple_choice';
}

interface StudySessionProps {
  subjectId: string;
  mode: StudyMode;
  selectedSectionIds: string[];
  range?: [number, number];
  lessons: Lesson[];
  onBackToSelector: () => void;
  examFilter?: string; // e.g. "de1" — lọc câu theo đề thi
  qTypeFilter?: string; // e.g. "theory" / "calculation"
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/** Dựng SessionQuestion từ khoá tiến độ, bỏ qua khoá trỏ tới câu đã bị xoá khỏi dữ liệu. */
function questionsFromKeys(keys: string[]): SessionQuestion[] {
  const out: SessionQuestion[] = [];
  for (const key of keys) {
    const entry = itemByKey.get(key);
    if (!entry) continue;
    out.push({
      key: entry.key,
      subjectId: entry.subjectId,
      item: entry.item,
      lessonTitle: entry.lessonTitle,
      sectionTitle: entry.sectionTitle,
      sectionType: entry.sectionType,
    });
  }
  return out;
}

export const StudySession: React.FC<StudySessionProps> = ({
  subjectId,
  mode,
  selectedSectionIds,
  range,
  lessons,
  onBackToSelector,
  examFilter,
  qTypeFilter,
}) => {
  const {
    data,
    recordReview,
    getCard,
    buildReviewQueue,
    buildMistakeQueue,
    saveSession,
    clearSession,
    updateSettings,
  } = useProgress();

  // Chữ ký của phiên: dùng để biết phiên đã lưu có thuộc đúng lựa chọn hiện tại hay không.
  const signature = useMemo(
    () =>
      JSON.stringify({
        subjectId,
        mode,
        sections: selectedSectionIds,
        range,
        examFilter,
        qTypeFilter,
      }),
    [subjectId, mode, selectedSectionIds, range, examFilter, qTypeFilter]
  );

  /**
   * Danh sách câu hỏi gốc của phiên.
   *
   * Với chế độ SRS và sổ tay câu sai, hàng đợi phải được chốt một lần lúc mở phiên:
   * nếu tính lại theo `data.cards` thì mỗi lần trả lời sẽ làm danh sách đổi ngay giữa chừng.
   */
  const buildQuestions = useCallback((): SessionQuestion[] => {
    if (mode === 'srs') {
      return questionsFromKeys(buildReviewQueue(subjectId));
    }

    if (mode === 'mistakes') {
      return questionsFromKeys(buildMistakeQueue(subjectId));
    }

    const aggregated: SessionQuestion[] = [];

    const push = (lesson: Lesson, section: Lesson['sections'][number], item: StudyItem) => {
      aggregated.push({
        key: cardKey(subjectId, item.id),
        subjectId,
        item,
        lessonTitle: lesson.title,
        sectionTitle: section.title,
        sectionType: section.type,
      });
    };

    if (range) {
      const [fromNum, toNum] = range;
      const allFlat: SessionQuestion[] = [];
      lessons.forEach((lesson) => {
        lesson.sections.forEach((section) => {
          section.items.forEach((item) => {
            allFlat.push({
              key: cardKey(subjectId, item.id),
              subjectId,
              item,
              lessonTitle: lesson.title,
              sectionTitle: section.title,
              sectionType: section.type,
            });
          });
        });
      });
      return allFlat.slice(Math.max(0, fromNum - 1), Math.min(allFlat.length, toNum));
    }

    if (examFilter) {
      const examTags = examFilter.split(',');
      lessons.forEach((lesson) => {
        lesson.sections.forEach((section) => {
          section.items.forEach((item) => {
            if (item.exam && examTags.includes(item.exam)) {
              const matchesQType =
                !qTypeFilter ||
                qTypeFilter === 'all' ||
                (qTypeFilter === 'theory' && (!item.qType || item.qType === 'theory')) ||
                (qTypeFilter === 'calculation' && item.qType === 'calculation');

              if (matchesQType) push(lesson, section, item);
            }
          });
        });
      });
      // Sắp theo thứ tự đề đã chọn rồi tới thứ tự câu trong đề.
      aggregated.sort((a, b) => {
        const aExamIndex = examTags.indexOf(a.item.exam || '');
        const bExamIndex = examTags.indexOf(b.item.exam || '');
        if (aExamIndex !== bExamIndex) return aExamIndex - bExamIndex;
        return (a.item.examOrder ?? 999) - (b.item.examOrder ?? 999);
      });
      return aggregated;
    }

    lessons.forEach((lesson) => {
      lesson.sections.forEach((section) => {
        if (selectedSectionIds.includes(section.id)) {
          section.items.forEach((item) => push(lesson, section, item));
        }
      });
    });
    return aggregated;
    // buildReviewQueue/buildMistakeQueue đổi theo tiến độ, nhưng hàm này chỉ được gọi
    // khi `signature` đổi nên hàng đợi vẫn ổn định trong suốt một phiên.
  }, [
    mode,
    subjectId,
    lessons,
    range,
    examFilter,
    qTypeFilter,
    selectedSectionIds,
    buildReviewQueue,
    buildMistakeQueue,
  ]);

  const [questions, setQuestions] = useState<SessionQuestion[]>(() => buildQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<SessionQuestion[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showShuffleToast, setShowShuffleToast] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  /** Phiên đã lưu khớp với lựa chọn hiện tại, chờ người dùng quyết định khôi phục hay không. */
  const [resumable, setResumable] = useState<typeof data.session>(null);

  const practiceMode = data.settings.practiceMode;
  const autoPlay = data.settings.ttsAutoplay;
  const lang = subjectLang(subjectId === 'all' ? 'nihon-it' : subjectId);

  const autoNextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const signatureRef = useRef<string | null>(null);

  // Dựng lại phiên khi người dùng đổi lựa chọn (không phải mỗi lần tiến độ thay đổi).
  useEffect(() => {
    if (signatureRef.current === signature) return;
    signatureRef.current = signature;

    setQuestions(buildQuestions());
    setCurrentIndex(0);
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongAnswers([]);
    setIsFinished(false);

    const saved = data.session;
    // Chỉ mời khôi phục khi phiên cũ đúng lựa chọn này và đang dở giữa chừng.
    setResumable(saved && saved.signature === signature && saved.index > 0 ? saved : null);
  }, [signature, buildQuestions, data.session]);

  useEffect(() => {
    return () => {
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    };
  }, []);

  // Ghi lại tiến độ phiên sau mỗi câu để đóng tab giữa chừng vẫn quay lại được.
  useEffect(() => {
    if (isFinished || questions.length === 0 || currentIndex === 0) return;
    saveSession({
      signature,
      subjectId,
      keys: questions.map((q) => q.key),
      index: currentIndex,
      correct: correctCount,
      incorrect: incorrectCount,
      wrongKeys: wrongAnswers.map((q) => q.key),
      savedAt: Date.now(),
    });
  }, [
    currentIndex,
    isFinished,
    questions,
    signature,
    subjectId,
    correctCount,
    incorrectCount,
    wrongAnswers,
    saveSession,
  ]);

  const handleResume = () => {
    if (!resumable) return;
    const restored = questionsFromKeys(resumable.keys);
    if (restored.length === 0) {
      setResumable(null);
      return;
    }
    setQuestions(restored);
    setCurrentIndex(Math.min(resumable.index, restored.length - 1));
    setCorrectCount(resumable.correct);
    setIncorrectCount(resumable.incorrect);
    setWrongAnswers(questionsFromKeys(resumable.wrongKeys));
    setIsAnswered(false);
    setResumable(null);
  };

  const handleDismissResume = () => {
    setResumable(null);
    clearSession();
  };

  const handleShuffleInSession = () => {
    if (questions.length === 0) return;
    setQuestions(shuffleArray(questions));
    setCurrentIndex(0);
    setIsAnswered(false);
    setShowShuffleToast(true);
    setTimeout(() => setShowShuffleToast(false), 2000);
  };

  const handleAnswerGraded = (isCorrect: boolean) => {
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    // Mọi lần chấm đều chảy vào SRS: đây là nguồn duy nhất cập nhật lịch ôn và sổ tay câu sai.
    recordReview(currentQ.key, isCorrect);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
      setWrongAnswers((prev) => [...prev, currentQ]);
    }

    if (currentQ.sectionType === 'vocabulary') {
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = setTimeout(() => handleNext(), 900);
    }
  };

  const handleNext = () => {
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      clearSession();
    }
  };

  const handleRetryAll = () => {
    setQuestions([...questions]);
    setCurrentIndex(0);
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongAnswers([]);
    setIsFinished(false);
  };

  const handleRetryWrongOnly = () => {
    setQuestions([...wrongAnswers]);
    setCurrentIndex(0);
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setWrongAnswers([]);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    const emptyMessage =
      mode === 'srs'
        ? 'Bạn không còn thẻ nào đến hạn ôn. Quay lại sau nhé!'
        : mode === 'mistakes'
        ? 'Sổ tay câu sai đang trống — bạn chưa sai câu nào.'
        : 'Các phần học được chọn hiện tại không chứa dữ liệu câu hỏi.';
    return (
      <div className="w-full max-w-md mx-auto text-center py-16 px-4">
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {mode === 'srs' ? 'Đã ôn hết hôm nay!' : 'Không tìm thấy câu hỏi'}
        </h3>
        <p className="text-slate-500 mb-6">{emptyMessage}</p>
        <button
          onClick={onBackToSelector}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <ResultScreen
        totalQuestions={questions.length}
        correctAnswersCount={correctCount}
        incorrectAnswersCount={incorrectCount}
        wrongAnswers={wrongAnswers}
        onRetryAll={handleRetryAll}
        onRetryWrongOnly={handleRetryWrongOnly}
        onBackToSelector={onBackToSelector}
      />
    );
  }

  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const currentCard = isAnswered ? getCard(currentQuestion.key) : undefined;

  const modeBadge =
    mode === 'srs'
      ? { label: 'Ôn theo lịch', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
      : mode === 'mistakes'
      ? { label: 'Sổ tay câu sai', className: 'bg-rose-50 text-rose-700 border-rose-200' }
      : null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Session Navigation & Stats Header */}
      <div className="glass-panel sticky top-4 z-40 rounded-2xl p-4 mb-8 flex items-center justify-between shadow-md">
        <button
          onClick={onBackToSelector}
          className="flex items-center gap-2 py-2 px-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Quay lại</span>
        </button>

        {/* Progress Display */}
        <div className="flex-1 max-w-md mx-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
            <span className="flex items-center gap-1.5">
              Tiến độ
              {modeBadge && (
                <span className={`px-1.5 py-0.5 rounded border text-[9px] uppercase tracking-wider ${modeBadge.className}`}>
                  {modeBadge.label}
                </span>
              )}
            </span>
            <span className="font-mono">
              Câu {currentIndex + 1} / {questions.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Header Right Actions & Counter Stats Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSettingsModal(true)}
            className={`p-2 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-sm flex items-center gap-1 ${practiceMode === 'write-kanji'
              ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-200/60'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
              }`}
            title="Cài đặt chế độ thẻ"
          >
            <Settings size={15} />
            {practiceMode === 'write-kanji' && (
              <span className="text-[10px] font-black uppercase text-amber-900 hidden md:inline">
                Tập viết Kanji
              </span>
            )}
          </button>

          <button
            onClick={handleShuffleInSession}
            className="flex items-center gap-1.5 py-1.5 px-3 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl active:scale-95 transition-all cursor-pointer shadow-sm"
            title="Trộn ngẫu nhiên câu hỏi trong phần học"
          >
            <Shuffle size={14} className="text-indigo-600" />
            <span className="hidden sm:inline">Trộn câu hỏi</span>
          </button>

          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 py-1 px-2.5 rounded-lg border border-emerald-100 text-xs font-bold">
            <Check size={14} className="stroke-[3px]" />
            {correctCount}
          </span>
          <span className="flex items-center gap-1 bg-rose-50 text-rose-700 py-1 px-2.5 rounded-lg border border-rose-100 text-xs font-bold">
            <X size={14} className="stroke-[3px]" />
            {incorrectCount}
          </span>
        </div>
      </div>

      {/* Lời mời khôi phục phiên học dở */}
      {resumable && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center gap-3 justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white text-indigo-600 border border-indigo-100">
              <History size={18} />
            </span>
            <div>
              <p className="text-sm font-extrabold text-indigo-900">Bạn có một phiên học đang dở</p>
              <p className="text-xs font-semibold text-indigo-700/80">
                Dừng ở câu {resumable.index + 1}/{resumable.keys.length} · đúng {resumable.correct}, sai {resumable.incorrect}
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleDismissResume}
              className="px-4 py-2 rounded-xl bg-white text-slate-600 border border-slate-200 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Học lại từ đầu
            </button>
            <button
              onClick={handleResume}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {showShuffleToast && (
        <div className="mb-4 p-3 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 animate-fadeIn">
          <Sparkles size={16} />
          <span>Đã trộn ngẫu nhiên tất cả các câu hỏi trong phiên học!</span>
        </div>
      )}

      {/* Question Card / Vocabulary Card area */}
      <div className="min-h-[400px] flex items-center justify-center py-4">
        {currentQuestion.sectionType === 'vocabulary' ? (
          <VocabularyCard
            key={`${currentQuestion.key}-${currentIndex}`}
            item={currentQuestion.item}
            lessonTitle={currentQuestion.lessonTitle}
            sectionTitle={currentQuestion.sectionTitle}
            onAnswerGraded={handleAnswerGraded}
            practiceMode={practiceMode}
            lang={subjectLang(currentQuestion.subjectId)}
            autoPlay={autoPlay}
            ttsRate={data.settings.ttsRate}
          />
        ) : (
          <QuestionCard
            key={`${currentQuestion.key}-${currentIndex}`}
            item={currentQuestion.item}
            lessonTitle={currentQuestion.lessonTitle}
            sectionTitle={currentQuestion.sectionTitle}
            onAnswerGraded={handleAnswerGraded}
          />
        )}
      </div>

      {/* Lịch ôn tiếp theo do SRS tính ra */}
      {isAnswered && currentCard && (
        <div className="flex justify-center -mt-2 mb-2 animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
            <CalendarClock size={13} className="text-indigo-500" />
            {formatInterval(currentCard)}
          </span>
        </div>
      )}

      {/* Lower Navigation Footer */}
      {isAnswered && currentQuestion.sectionType !== 'vocabulary' && (
        <div className="mt-6 flex justify-center animate-bounce">
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-extrabold shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95 transition-all text-base cursor-pointer"
          >
            {currentIndex === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* SETTINGS MODAL IN STUDY SESSION */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <SlidersHorizontal size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Cài Đặt Chế Độ Thẻ Học
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">
                    Chọn chế độ hiển thị phù hợp với mục tiêu ôn tập
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 rounded-2xl bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {/* Option 1: Default */}
              <div
                onClick={() => {
                  updateSettings({ practiceMode: 'default' });
                  setShowSettingsModal(false);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${practiceMode === 'default'
                  ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-200/60 shadow-xs'
                  : 'bg-slate-50/50 hover:bg-white border-slate-200'
                  }`}
              >
                <div className={`mt-0.5 p-1 rounded-full ${practiceMode === 'default' ? 'bg-indigo-600 text-white' : 'border border-slate-300'}`}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    Mặc Định (Xem Chữ Hán trước)
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                    Mặt trước hiển thị Chữ Hán (`頭`). Lật thẻ để xem cách đọc & nghĩa tiếng Việt.
                  </p>
                  <div className="mt-2 text-xs font-bold text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80 inline-flex items-center gap-2">
                    <span className="text-base font-black text-slate-800">頭</span>
                    <span className="text-xs text-slate-400 font-semibold">➡️ [あたま] - Cái đầu</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Write Kanji Mode */}
              <div
                onClick={() => {
                  updateSettings({ practiceMode: 'write-kanji' });
                  setShowSettingsModal(false);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${practiceMode === 'write-kanji'
                  ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-200/60 shadow-xs'
                  : 'bg-slate-50/50 hover:bg-white border-slate-200'
                  }`}
              >
                <div className={`mt-0.5 p-1 rounded-full ${practiceMode === 'write-kanji' ? 'bg-amber-600 text-white' : 'border border-slate-300'}`}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                    <span>✍️ Tập Viết Kanji (Chỉ hiện Cách đọc, Ẩn Kanji & Nghĩa)</span>
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                    Mặt trước thẻ CHỈ hiển thị duy nhất Cách đọc (`あたま`). Ẩn cả Chữ Hán lẫn Nghĩa tiếng Việt để bạn tập trung viết chữ Hán ra giấy!
                  </p>
                  <div className="mt-2 text-xs font-bold text-slate-700 bg-white p-2 rounded-xl border border-amber-200 inline-flex items-center gap-2">
                    <span className="text-sm font-black text-rose-600">あたま</span>
                    <span className="text-xs text-slate-400 font-semibold">➡️ Lật thẻ: <strong className="text-slate-800 font-black">頭 (Cái đầu)</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cài đặt phát âm */}
            {ttsSupported && (
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <Volume2 size={16} className="text-sky-600" />
                  Phát âm ({lang === 'ja' ? 'tiếng Nhật' : 'tiếng Anh'})
                </h4>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <span className="text-xs font-bold text-slate-700">
                    Tự đọc to khi hiện thẻ mới
                  </span>
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => updateSettings({ ttsAutoplay: e.target.checked })}
                    className="h-4 w-4 rounded accent-sky-600 cursor-pointer"
                  />
                </label>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">Tốc độ đọc</span>
                    <span className="text-xs font-mono font-bold text-sky-700">
                      {data.settings.ttsRate.toFixed(1)}x
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={data.settings.ttsRate}
                    onChange={(e) => updateSettings({ ttsRate: Number(e.target.value) })}
                    className="w-full accent-sky-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer text-center"
            >
              Áp Dụng & Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
