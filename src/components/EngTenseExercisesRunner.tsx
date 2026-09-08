import React, { useState, useMemo, useEffect } from 'react';
import {
  fillInBlankQuestions,
  mcqTenseQuestions,
  paragraphClozeExercises,
  type SingleTenseQuestion,
  type TenseTag
} from '../data/engTenseExercisesData';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Shuffle,
  Filter,
  Sparkles,
  Award,
  HelpCircle,
  RotateCcw,
  PenTool,
  BrainCircuit,
  FileText,
  CheckSquare,
  Square,
  Check,
  RefreshCw,
  BookOpen
} from 'lucide-react';

interface EngTenseExercisesRunnerProps {
  onClose: () => void;
}

const LOCAL_STORAGE_KEY_INPUTS = 'eng_tense_user_inputs_v1';
const LOCAL_STORAGE_KEY_CHECKED = 'eng_tense_checked_ids_v1';
const LOCAL_STORAGE_KEY_TAB = 'eng_tense_active_tab_v1';

export const EngTenseExercisesRunner: React.FC<EngTenseExercisesRunnerProps> = ({ onClose }) => {
  // Main Format Tab: 'fill' (1. Điền từ) | 'mcq' (2. Trắc nghiệm) | 'paragraph' (3. Điền đoạn văn)
  const [exerciseTab, setExerciseTab] = useState<'fill' | 'mcq' | 'paragraph'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TAB);
      if (saved === 'fill' || saved === 'mcq' || saved === 'paragraph') return saved;
    } catch {}
    return 'fill';
  });

  // Selected Paragraph Cloze Story Index (0, 1, 2)
  const [selectedStoryIdx, setSelectedStoryIdx] = useState<number>(0);

  // Multi-select Filter Tense Tags (For 'fill' and 'mcq')
  const [selectedTenseTags, setSelectedTenseTags] = useState<TenseTag[]>([]);

  // User input answers state (Lưu tự động vào LocalStorage không cần đăng nhập)
  const [userInputs, setUserInputs] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INPUTS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Individual checked questions state (Lưu tự động vào LocalStorage)
  const [checkedQuestionIds, setCheckedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tự động đồng bộ đáp án đã nhập vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INPUTS, JSON.stringify(userInputs));
    } catch (e) {
      console.error('Lỗi khi lưu đáp án:', e);
    }
  }, [userInputs]);

  // Tự động đồng bộ danh sách câu đã kiểm tra vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CHECKED, JSON.stringify(checkedQuestionIds));
    } catch (e) {
      console.error('Lỗi khi lưu trạng thái đã kiểm tra:', e);
    }
  }, [checkedQuestionIds]);

  // Tự động đồng bộ Tab đang mở vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TAB, exerciseTab);
    } catch (e) {
      console.error('Lỗi khi lưu Tab hiện tại:', e);
    }
  }, [exerciseTab]);

  // Global submit state (Nộp tất cả)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Random shuffle state for single questions
  const [shuffledSeed, setShuffledSeed] = useState<number>(0);

  // Parse sub-answers for multi-gap questions
  const parseSubAnswers = (q: SingleTenseQuestion): string[] => {
    if (q.answers && q.answers.length > 0) return q.answers;
    if (q.answer.includes(' - ')) return q.answer.split(' - ').map((s) => s.trim());
    if (q.answer.includes(' / ')) return q.answer.split(' / ').map((s) => s.trim());
    return [q.answer];
  };

  // Toggle multi-select tense tag
  const toggleTenseTag = (tag: TenseTag) => {
    setSelectedTenseTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Filtered & Shuffled Single Questions
  const activeQuestions = useMemo(() => {
    let list: SingleTenseQuestion[] = [];
    if (exerciseTab === 'fill') list = [...fillInBlankQuestions];
    else if (exerciseTab === 'mcq') list = [...mcqTenseQuestions];

    // Apply Multi-select Tense Tag Filter (Chỉ hiện câu khi học sinh chọn ĐỦ tất cả các thì có trong câu đó)
    if (selectedTenseTags.length > 0) {
      list = list.filter((q) =>
        q.tenseTags.every((tag) => selectedTenseTags.includes(tag))
      );
    }

    // Apply Random Shuffle if seed > 0
    if (shuffledSeed > 0) {
      list = [...list].sort(() => Math.random() - 0.5);
    }

    return list;
  }, [exerciseTab, selectedTenseTags, shuffledSeed]);

  // Handle Input Change
  const handleInputChange = (questionId: string, value: string) => {
    setUserInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  // Instant Check Per Question (Gõ 1 câu là ra đáp án luôn!)
  const handleCheckQuestion = (questionId: string) => {
    if (!checkedQuestionIds.includes(questionId)) {
      setCheckedQuestionIds((prev) => [...prev, questionId]);
    }
  };

  // Retry single question
  const handleRetryQuestion = (questionId: string, q?: SingleTenseQuestion) => {
    setCheckedQuestionIds((prev) => prev.filter((id) => id !== questionId));
    if (q) {
      const subAnswers = parseSubAnswers(q);
      if (subAnswers.length > 1) {
        setUserInputs((prev) => {
          const next = { ...prev };
          subAnswers.forEach((_, subIdx) => {
            delete next[`${questionId}_gap_${subIdx}`];
          });
          return next;
        });
        return;
      }
    }
    setUserInputs((prev) => ({ ...prev, [questionId]: '' }));
  };

  // Handle Shuffle (Giữ nguyên toàn bộ đáp án và kết quả đã làm của học sinh)
  const handleShuffle = () => {
    setShuffledSeed((prev) => prev + 1);
  };

  // Reset current section
  const handleReset = () => {
    setIsSubmitted(false);
    setCheckedQuestionIds([]);
    setUserInputs({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_INPUTS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_CHECKED);
    } catch (e) {
      console.error('Lỗi khi xóa bộ nhớ tạm:', e);
    }
  };

  // Active Paragraph Cloze Story
  const currentStory = paragraphClozeExercises[selectedStoryIdx] || paragraphClozeExercises[0];

  // Check all questions
  const handleCheckAll = () => {
    setIsSubmitted(true);
    const allIds = activeQuestions.map((q) => q.id);
    if (exerciseTab === 'paragraph') {
      const paraIds = currentStory.gaps.map((g) => `para-${g.number}`);
      setCheckedQuestionIds(paraIds);
    } else {
      setCheckedQuestionIds(allIds);
    }
  };

  // Calculate score for single questions
  const singleScore = useMemo(() => {
    if (exerciseTab === 'paragraph') return { correct: 0, checkedCount: 0, total: 0 };
    let correct = 0;
    let checkedCount = 0;
    activeQuestions.forEach((q) => {
      const isChecked = isSubmitted || checkedQuestionIds.includes(q.id);
      if (isChecked) {
        checkedCount++;
        const subAnswers = parseSubAnswers(q);
        let isMatch = false;

        if (subAnswers.length > 1) {
          isMatch = subAnswers.every((subAns, subIdx) => {
            const userVal = (userInputs[`${q.id}_gap_${subIdx}`] || '').trim().toLowerCase();
            return userVal === subAns.toLowerCase();
          });
        } else {
          const userVal = (userInputs[q.id] || '').trim().toLowerCase();
          if (q.type === 'mcq') {
            isMatch = userVal === q.answer.toLowerCase();
          } else {
            isMatch = q.acceptedAnswers
              ? q.acceptedAnswers.some((ans) => ans.toLowerCase() === userVal)
              : userVal === q.answer.toLowerCase();
          }
        }

        if (isMatch) correct++;
      }
    });
    return { correct, checkedCount, total: activeQuestions.length };
  }, [isSubmitted, checkedQuestionIds, exerciseTab, activeQuestions, userInputs]);

  // Calculate score for Paragraph Cloze
  const paragraphScore = useMemo(() => {
    if (exerciseTab !== 'paragraph') return { correct: 0, checkedCount: 0, total: 0 };
    let correct = 0;
    let checkedCount = 0;
    currentStory.gaps.forEach((gap) => {
      const key = `para-${gap.number}`;
      const isChecked = isSubmitted || checkedQuestionIds.includes(key);
      if (isChecked) {
        checkedCount++;
        const userVal = (userInputs[key] || '').trim().toLowerCase();
        const isMatch = gap.acceptedAnswers.some((ans) => ans.toLowerCase() === userVal);
        if (isMatch) correct++;
      }
    });
    return { correct, checkedCount, total: currentStory.gaps.length };
  }, [isSubmitted, checkedQuestionIds, exerciseTab, userInputs, currentStory]);

  // Unique Tense Tags available for filter
  const availableTenseTags: TenseTag[] = [
    'Present Simple',
    'Present Continuous',
    'Present Perfect',
    'Present Perfect Continuous',
    'Past Simple',
    'Past Continuous',
    'Past Perfect',
    'Past Perfect Continuous',
    'Future Simple',
    'Future Continuous',
    'Future Perfect',
    'Future Perfect Continuous',
    'Near Future',
    'Conditional',
    'Wish',
    'Reported Speech'
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Quay lại bài học Ngữ Pháp</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 justify-center">
            <Award size={18} className="text-indigo-600" />
            <span>Luyện Tập Bài Tập Các Thì Trong Tiếng Anh</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {exerciseTab !== 'paragraph' && (
            <button
              onClick={handleShuffle}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-indigo-200 cursor-pointer"
              title="Xáo trộn câu hỏi ngẫu nhiên"
            >
              <Shuffle size={14} />
              <span className="hidden sm:inline">Trộn ngẫu nhiên</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
            title="Làm lại từ đầu"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Main Exercise Format Selector: 1. Điền từ | 2. Trắc nghiệm MCQ | 3. Điền đoạn văn */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 max-w-3xl mx-auto">
          <button
            onClick={() => setExerciseTab('fill')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              exerciseTab === 'fill'
                ? 'bg-white text-indigo-700 shadow-md border border-indigo-100 ring-2 ring-indigo-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <PenTool size={16} className={exerciseTab === 'fill' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>1. Điền Từ</span>
          </button>

          <button
            onClick={() => setExerciseTab('mcq')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              exerciseTab === 'mcq'
                ? 'bg-white text-indigo-700 shadow-md border border-indigo-100 ring-2 ring-indigo-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <BrainCircuit size={16} className={exerciseTab === 'mcq' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>2. Trắc Nghiệm</span>
          </button>

          <button
            onClick={() => setExerciseTab('paragraph')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              exerciseTab === 'paragraph'
                ? 'bg-white text-indigo-700 shadow-md border border-indigo-100 ring-2 ring-indigo-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <FileText size={16} className={exerciseTab === 'paragraph' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>3. Điền Đoạn Văn</span>
          </button>
        </div>

        {/* MULTI-SELECT TENSE FILTER TAGS (Only for single questions: fill & mcq) */}
        {exerciseTab !== 'paragraph' && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Filter size={14} className="text-indigo-600" />
                Lọc theo Thì Ngữ Pháp (Cho phép tích chọn nhiều thì cùng lúc):
              </span>
              {selectedTenseTags.length > 0 && (
                <button
                  onClick={() => setSelectedTenseTags([])}
                  className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                >
                  Xóa bộ lọc ({selectedTenseTags.length} thì)
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTenseTags([])}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  selectedTenseTags.length === 0
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {selectedTenseTags.length === 0 ? <CheckSquare size={13} /> : <Square size={13} />}
                <span>Tất cả các Thì ({exerciseTab === 'fill' ? fillInBlankQuestions.length : mcqTenseQuestions.length})</span>
              </button>

              {availableTenseTags.map((tag) => {
                const isSelected = selectedTenseTags.includes(tag);
                const matchCount = (exerciseTab === 'fill' ? fillInBlankQuestions : mcqTenseQuestions).filter(
                  (q) => q.tenseTags.includes(tag)
                ).length;

                if (matchCount === 0) return null;

                return (
                  <button
                    key={tag}
                    onClick={() => toggleTenseTag(tag)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300'
                    }`}
                  >
                    {isSelected ? <CheckSquare size={13} /> : <Square size={13} className="text-slate-300" />}
                    <span>{tag}</span>
                    <span className={`text-[10px] px-1.5 rounded-full ${isSelected ? 'bg-indigo-700 text-white font-extrabold' : 'bg-slate-100 text-slate-500'}`}>
                      {matchCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Score Summary Banner */}
        {((exerciseTab !== 'paragraph' && singleScore.checkedCount > 0) ||
          (exerciseTab === 'paragraph' && paragraphScore.checkedCount > 0)) && (
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-4 text-white flex items-center justify-between shadow-md animate-fadeIn border border-indigo-500/30">
            <div className="flex items-center gap-3">
              <Sparkles size={22} className="text-indigo-300 animate-pulse" />
              <div>
                <h4 className="font-black text-xs sm:text-sm text-indigo-100">Tiến Độ & Kết Quả Tức Thì</h4>
                <p className="text-xs text-slate-300 font-medium">
                  {exerciseTab === 'paragraph'
                    ? `Đã làm: ${paragraphScore.checkedCount} / ${paragraphScore.total} vị trí ➔ Đã đúng: ${paragraphScore.correct} câu`
                    : `Đã làm: ${singleScore.checkedCount} / ${singleScore.total} câu ➔ Đã đúng: ${singleScore.correct} câu`}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 text-xs font-extrabold transition-all cursor-pointer shrink-0 border border-white/15"
            >
              Làm lại từ đầu
            </button>
          </div>
        )}

        {/* FORMAT 1: DẠNG ĐIỀN TỪ VÀO CHỖ TRỐNG (Sentence Fill-in-the-blank) */}
        {exerciseTab === 'fill' && (
          <div className="space-y-4">
            {activeQuestions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Không tìm thấy câu hỏi phù hợp với các thì đã chọn.
              </div>
            ) : (
              <div className="space-y-3">
                {activeQuestions.map((q, index) => {
                  const isChecked = isSubmitted || checkedQuestionIds.includes(q.id);
                  const subAnswers = parseSubAnswers(q);

                  let isMatch = false;
                  if (subAnswers.length > 1) {
                    isMatch = subAnswers.every((subAns, subIdx) => {
                      const userVal = (userInputs[`${q.id}_gap_${subIdx}`] || '').trim().toLowerCase();
                      return userVal === subAns.toLowerCase();
                    });
                  } else {
                    const userVal = (userInputs[q.id] || '').trim().toLowerCase();
                    isMatch = q.acceptedAnswers
                      ? q.acceptedAnswers.some((ans) => ans.toLowerCase() === userVal)
                      : userVal === q.answer.toLowerCase();
                  }

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isChecked
                          ? isMatch
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                          : 'border-slate-200 bg-white hover:border-indigo-200'
                      }`}
                    >
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900 leading-relaxed flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-black shrink-0">
                          Câu {index + 1}
                        </span>
                        <span>{q.prompt}</span>
                      </div>

                      {/* MULTI-GAP OR SINGLE-GAP INPUT FIELDS */}
                      {subAnswers.length > 1 ? (
                        <div className="space-y-3 w-full pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {subAnswers.map((subAns, subIdx) => {
                              const gapKey = `${q.id}_gap_${subIdx}`;
                              const subVal = userInputs[gapKey] || '';
                              const isSubMatch = subVal.trim().toLowerCase() === subAns.toLowerCase();

                              return (
                                <div key={subIdx} className="space-y-1 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/60">
                                  <span className="text-[11px] font-extrabold text-indigo-700 block">
                                    Chỗ trống ({subIdx + 1}):
                                  </span>
                                  <input
                                    type="text"
                                    value={subVal}
                                    disabled={isChecked}
                                    onChange={(e) => handleInputChange(gapKey, e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' && !isChecked) {
                                        handleCheckQuestion(q.id);
                                      }
                                    }}
                                    placeholder={`Điền dạng đúng chỗ (${subIdx + 1})...`}
                                    className={`w-full px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                      isChecked
                                        ? isSubMatch
                                          ? 'border-emerald-400 bg-emerald-100/60 text-emerald-950'
                                          : 'border-rose-400 bg-rose-100/60 text-rose-950'
                                        : 'border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-slate-800'
                                    }`}
                                  />
                                  {isChecked && !isSubMatch && (
                                    <span className="text-[10px] text-rose-700 font-bold block pt-0.5">
                                      Đ/á đúng: <strong className="font-mono underline">{subAns}</strong>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {!isChecked ? (
                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => handleCheckQuestion(q.id)}
                                className="px-4 py-2 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all cursor-pointer flex items-center gap-1.5"
                              >
                                <Check size={14} />
                                <span>Kiểm tra ({subAnswers.length} ô)</span>
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between pt-1">
                              {isMatch ? (
                                <span className="text-emerald-700 text-xs font-extrabold flex items-center gap-1">
                                  <CheckCircle2 size={16} /> Chính xác tất cả các chỗ trống!
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-rose-700 text-xs font-extrabold flex items-center gap-1">
                                    <XCircle size={16} /> Chưa hoàn toàn chính xác!
                                  </span>
                                  <button
                                    onClick={() => handleRetryQuestion(q.id, q)}
                                    className="p-1.5 rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                                    title="Thử lại câu này"
                                  >
                                    <RefreshCw size={13} /> Thử lại
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* SINGLE GAP INPUT FIELD */
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={userInputs[q.id] || ''}
                              disabled={isChecked}
                              onChange={(e) => handleInputChange(q.id, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && (userInputs[q.id] || '').trim() && !isChecked) {
                                  handleCheckQuestion(q.id);
                                }
                              }}
                              placeholder="Gõ đáp án và nhấn Enter hoặc 'Kiểm tra'..."
                              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                                isChecked
                                  ? isMatch
                                    ? 'border-emerald-400 bg-emerald-100/50 text-emerald-950 pr-8'
                                    : 'border-rose-400 bg-rose-100/50 text-rose-950 pr-8'
                                  : 'border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-slate-800'
                              }`}
                            />
                          </div>

                          {/* Instant Action Buttons */}
                          {!isChecked ? (
                            <button
                              onClick={() => handleCheckQuestion(q.id)}
                              disabled={!(userInputs[q.id] || '').trim()}
                              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                                (userInputs[q.id] || '').trim()
                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              <Check size={14} />
                              <span>Kiểm tra</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 shrink-0">
                              {isMatch ? (
                                <span className="text-emerald-700 text-xs font-extrabold flex items-center gap-1">
                                  <CheckCircle2 size={16} /> Chính xác!
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-rose-700 text-xs font-extrabold flex items-center gap-1">
                                    <XCircle size={16} /> Đ/á đúng: <strong className="font-mono underline">{q.answer}</strong>
                                  </span>
                                  <button
                                    onClick={() => handleRetryQuestion(q.id, q)}
                                    className="p-1.5 rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all cursor-pointer"
                                    title="Thử lại câu này"
                                  >
                                    <RefreshCw size={13} />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Explanation box revealed IMMEDIATELY when question is checked */}
                      {isChecked && (
                        <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-600 space-y-1.5 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 flex items-center gap-1">
                              <HelpCircle size={13} className="text-indigo-600" /> Giải thích chi tiết:
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">
                              Thì: {q.tenseTags.join(', ')}
                            </span>
                          </div>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* FORMAT 2: DẠNG TRẮC NGHIỆM MULTIPLE CHOICE (MCQ 4 Đáp Án) */}
        {exerciseTab === 'mcq' && (
          <div className="space-y-4">
            {activeQuestions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Không tìm thấy câu hỏi trắc nghiệm phù hợp với các thì đã chọn.
              </div>
            ) : (
              <div className="space-y-4">
                {activeQuestions.map((q, index) => {
                  const selectedOpt = userInputs[q.id] || '';
                  const isChecked = isSubmitted || checkedQuestionIds.includes(q.id);
                  const isCorrect = selectedOpt.toLowerCase() === q.answer.toLowerCase();

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isChecked
                          ? isCorrect
                            ? 'border-emerald-300 bg-emerald-50/40'
                            : 'border-rose-300 bg-rose-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-relaxed flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-black shrink-0">
                          Câu {index + 1}
                        </span>
                        <span>{q.prompt}</span>
                      </h4>

                      {/* 4 Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {q.options?.map((opt, optIdx) => {
                          const isThisSelected = selectedOpt === opt;
                          const isThisCorrect = opt.toLowerCase() === q.answer.toLowerCase();

                          let buttonStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100';

                          if (isChecked) {
                            if (isThisCorrect) {
                              buttonStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-black ring-2 ring-emerald-500/20';
                            } else if (isThisSelected && !isThisCorrect) {
                              buttonStyle = 'border-rose-400 bg-rose-100 text-rose-950 line-through';
                            } else {
                              buttonStyle = 'border-slate-200 bg-slate-50/60 text-slate-400';
                            }
                          } else if (isThisSelected) {
                            buttonStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-extrabold ring-2 ring-indigo-500/20';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={isChecked}
                              onClick={() => {
                                handleInputChange(q.id, opt);
                                handleCheckQuestion(q.id);
                              }}
                              className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${buttonStyle}`}
                            >
                              <span>{opt}</span>
                              {isChecked && isThisCorrect && (
                                <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                              )}
                              {isChecked && isThisSelected && !isThisCorrect && (
                                <XCircle size={16} className="text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation revealed IMMEDIATELY when choice selected */}
                      {isChecked && (
                        <div className="p-3 rounded-xl bg-white/80 border border-slate-200/80 text-xs text-slate-600 space-y-1.5 animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 flex items-center gap-1">
                              <HelpCircle size={13} className="text-indigo-600" /> Giải thích chi tiết:
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">
                              Thì: {q.tenseTags.join(', ')}
                            </span>
                          </div>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* FORMAT 3: DẠNG ĐIỀN ĐOẠN VĂN (Paragraph Cloze Fill-in-the-blanks) */}
        {exerciseTab === 'paragraph' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
              <Sparkles size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold block text-amber-950 mb-0.5">Hướng dẫn bài điền đoạn văn:</strong>
                Đọc kỹ câu chuyện, gõ đáp án cho từng vị trí chỗ trống và nhấn Enter hoặc 'Kiểm tra' để ra kết quả ngay!
              </div>
            </div>

            {/* Story Selector Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 shrink-0">
                <BookOpen size={14} className="text-indigo-600" />
                Chọn bài đoạn văn:
              </span>
              <div className="flex flex-wrap gap-2">
                {paragraphClozeExercises.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setSelectedStoryIdx(idx);
                      setIsSubmitted(false);
                      setCheckedQuestionIds([]);
                      setUserInputs({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                      selectedStoryIdx === idx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Đoạn {idx + 1} ({story.gaps.length} chỗ)
                  </button>
                ))}
              </div>
            </div>

            {/* Story Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium space-y-4">
              <h4 className="font-black text-sm text-slate-900 border-b border-slate-200 pb-2">
                {currentStory.title}
              </h4>
              <p className="whitespace-pre-line leading-loose">
                {currentStory.story}
              </p>
            </div>

            {/* Gaps Input Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nhập đáp án cho {currentStory.gaps.length} vị trí chỗ trống:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentStory.gaps.map((gap) => {
                  const key = `para-${gap.number}`;
                  const userVal = userInputs[key] || '';
                  const isChecked = isSubmitted || checkedQuestionIds.includes(key);
                  const isMatch = gap.acceptedAnswers.some((ans) => ans.toLowerCase() === userVal.trim().toLowerCase());

                  return (
                    <div
                      key={gap.number}
                      className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                        isChecked
                          ? isMatch
                            ? 'border-emerald-300 bg-emerald-50/50'
                            : 'border-rose-300 bg-rose-50/50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">
                          Vị trí ({gap.number}) - Động từ: <strong className="font-mono text-indigo-700">[{gap.verb}]</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={userVal}
                          disabled={isChecked}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && userVal.trim() && !isChecked) {
                              handleCheckQuestion(key);
                            }
                          }}
                          placeholder={`Điền thì cho (${gap.number})...`}
                          className={`flex-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                            isChecked
                              ? isMatch
                                ? 'border-emerald-400 bg-emerald-100/60 text-emerald-950'
                                : 'border-rose-400 bg-rose-100/60 text-rose-950'
                              : 'border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30'
                          }`}
                        />

                        {!isChecked ? (
                          <button
                            onClick={() => handleCheckQuestion(key)}
                            disabled={!userVal.trim()}
                            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              userVal.trim()
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                            title="Kiểm tra vị trí này"
                          >
                            <Check size={14} />
                          </button>
                        ) : null}
                      </div>

                      {isChecked && (
                        <div className="text-[11px] font-bold space-y-1 animate-fadeIn">
                          {isMatch ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 size={13} /> Chính xác!
                            </span>
                          ) : (
                            <div className="flex items-center justify-between text-rose-700">
                              <span>✕ Đúng: <strong className="font-mono underline">{gap.answer}</strong></span>
                              <button
                                onClick={() => handleRetryQuestion(key)}
                                className="p-1 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 transition-all cursor-pointer"
                                title="Thử lại"
                              >
                                <RefreshCw size={11} />
                              </button>
                            </div>
                          )}
                          <p className="text-[10px] text-slate-500 font-normal leading-tight">
                            {gap.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Action Bar for Check All */}
        {!isSubmitted && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCheckAll}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-extrabold text-xs shadow-lg shadow-indigo-200 transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Kiểm Tra Tất Cả Các Câu</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
