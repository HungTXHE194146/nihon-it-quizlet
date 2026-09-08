import React, { useState, useMemo } from 'react';
import type { EngWordItem } from '../data/engGrade9Data';
import {
  ArrowLeft,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  HelpCircle,
  Send,
  PenTool,
  BrainCircuit,
  Grid
} from 'lucide-react';

export type TestMode = 'mcq-en-vi' | 'mcq-vi-en' | 'spelling' | 'matching';

interface EngGrade9TestRunnerProps {
  wordsPool: EngWordItem[];
  questionCount: number;
  testMode: TestMode;
  onClose: () => void;
}

interface MCQQuestion {
  word: EngWordItem;
  questionText: string;
  correctAnswer: string;
  choices: string[];
}

export const EngGrade9TestRunner: React.FC<EngGrade9TestRunnerProps> = ({
  wordsPool,
  questionCount,
  testMode,
  onClose
}) => {
  // Randomly sample N words from pool
  const sampledWords = useMemo(() => {
    const shuffled = [...wordsPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, wordsPool.length));
  }, [wordsPool, questionCount]);

  // Speech Synthesis
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // State for MCQ / Spelling modes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [spellingInput, setSpellingInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongWords, setWrongWords] = useState<EngWordItem[]>([]);

  // State for Matching mode
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // word IDs that are matched
  const [selectedEngId, setSelectedEngId] = useState<string | null>(null);
  const [selectedViId, setSelectedViId] = useState<string | null>(null);
  const [matchingError, setMatchingError] = useState<boolean>(false);

  // Generate MCQ questions if in MCQ mode
  const mcqQuestions: MCQQuestion[] = useMemo(() => {
    if (testMode !== 'mcq-en-vi' && testMode !== 'mcq-vi-en') return [];

    return sampledWords.map((word) => {
      const isEnVi = testMode === 'mcq-en-vi';
      const questionText = isEnVi
        ? `Nghĩa của từ "${word.term}" là gì?`
        : `Từ tiếng Anh tương ứng với "${word.answer}" là gì?`;

      const correctAnswer = isEnVi ? word.answer : word.term;

      // Get wrong choices from full pool
      const otherWords = wordsPool.filter((w) => w.id !== word.id);
      const wrongAnswersPool = otherWords.map((w) => (isEnVi ? w.answer : w.term));
      const shuffledWrong = Array.from(new Set(wrongAnswersPool)).sort(() => Math.random() - 0.5);

      const choices = Array.from(new Set([correctAnswer, ...shuffledWrong.slice(0, 3)])).sort(
        () => Math.random() - 0.5
      );

      return {
        word,
        questionText,
        correctAnswer,
        choices
      };
    });
  }, [sampledWords, wordsPool, testMode]);

  // Shuffled items for Matching Game
  const matchingEngItems = useMemo(() => {
    return [...sampledWords].sort(() => Math.random() - 0.5);
  }, [sampledWords]);

  const matchingViItems = useMemo(() => {
    return [...sampledWords].sort(() => Math.random() - 0.5);
  }, [sampledWords]);

  // MCQ selection handler
  const handleSelectMCQChoice = (choice: string) => {
    if (userAnswers[currentIndex] !== undefined) return; // already answered

    const currentQ = mcqQuestions[currentIndex];
    const isCorrect = choice === currentQ.correctAnswer;

    setUserAnswers((prev) => ({ ...prev, [currentIndex]: choice }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setWrongWords((prev) => [...prev, currentQ.word]);
    }
  };

  // Spelling submission handler
  const handleSpellingSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!spellingInput.trim() || userAnswers[currentIndex] !== undefined) return;

    const currentWord = sampledWords[currentIndex];
    const cleanInput = spellingInput.trim().toLowerCase();
    const cleanCorrect = currentWord.term.trim().toLowerCase();

    const isCorrect = cleanInput === cleanCorrect;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: spellingInput.trim() }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setWrongWords((prev) => [...prev, currentWord]);
    }
  };

  // Next Question logic
  const handleNext = () => {
    if (currentIndex < sampledWords.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSpellingInput('');
    } else {
      setIsSubmitted(true);
    }
  };

  // Matching Selection Logic
  const handleSelectEngForMatching = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    setSelectedEngId(wordId);
    setMatchingError(false);

    if (selectedViId) {
      if (selectedViId === wordId) {
        // Correct match!
        setMatchedPairs((prev) => [...prev, wordId]);
        setScore((prev) => prev + 1);
        setSelectedEngId(null);
        setSelectedViId(null);

        if (matchedPairs.length + 1 === sampledWords.length) {
          setIsSubmitted(true);
        }
      } else {
        // Wrong match
        setMatchingError(true);
        setTimeout(() => {
          setSelectedEngId(null);
          setSelectedViId(null);
          setMatchingError(false);
        }, 800);
      }
    }
  };

  const handleSelectViForMatching = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    setSelectedViId(wordId);
    setMatchingError(false);

    if (selectedEngId) {
      if (selectedEngId === wordId) {
        // Correct match!
        setMatchedPairs((prev) => [...prev, wordId]);
        setScore((prev) => prev + 1);
        setSelectedEngId(null);
        setSelectedViId(null);

        if (matchedPairs.length + 1 === sampledWords.length) {
          setIsSubmitted(true);
        }
      } else {
        // Wrong match
        setMatchingError(true);
        setTimeout(() => {
          setSelectedEngId(null);
          setSelectedViId(null);
          setMatchingError(false);
        }, 800);
      }
    }
  };

  const currentWord = sampledWords[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Thoát Bài Test</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 justify-center">
            {testMode === 'mcq-en-vi' && <BrainCircuit className="w-4 h-4 text-sky-600" />}
            {testMode === 'mcq-vi-en' && <BrainCircuit className="w-4 h-4 text-indigo-600" />}
            {testMode === 'spelling' && <PenTool className="w-4 h-4 text-teal-600" />}
            {testMode === 'matching' && <Grid className="w-4 h-4 text-amber-600" />}
            <span>
              {testMode === 'mcq-en-vi' && 'Trắc Nghiệm (Anh ➔ Việt)'}
              {testMode === 'mcq-vi-en' && 'Trắc Nghiệm Ngược (Việt ➔ Anh)'}
              {testMode === 'spelling' && 'Gõ Từ Tiếng Anh (Chính tả)'}
              {testMode === 'matching' && 'Trò Chơi Nối Cặp Từ Vựng'}
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            {testMode === 'matching'
              ? `Nối ${matchedPairs.length}/${sampledWords.length} cặp từ`
              : `Câu ${currentIndex + 1}/${sampledWords.length}`}
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-extrabold border border-sky-200">
          Điểm: {score}/{testMode === 'matching' ? sampledWords.length : currentIndex + (userAnswers[currentIndex] !== undefined ? 1 : 0)}
        </div>
      </div>

      {/* Progress Bar */}
      {testMode !== 'matching' && (
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sampledWords.length) * 100}%` }}
          />
        </div>
      )}

      {/* RESULT SCREEN */}
      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
            <Trophy size={40} />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Hoàn Thành Bài Test! 🎉</h3>
            <p className="text-sm text-slate-500">
              Bạn đã hoàn thành bài kiểm tra từ vựng ngẫu nhiên.
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white max-w-sm mx-auto shadow-lg space-y-2">
            <div className="text-xs uppercase font-extrabold tracking-widest text-sky-400">Kết quả của bạn</div>
            <div className="text-4xl font-black text-white">
              {score} / {sampledWords.length}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Tỷ lệ chính xác: {Math.round((score / sampledWords.length) * 100)}%
            </div>
          </div>

          {/* Wrong Words List (If any) */}
          {wrongWords.length > 0 && (
            <div className="text-left bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 max-w-xl mx-auto">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-rose-500" />
                Các từ cần ôn lại ({wrongWords.length} từ):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {wrongWords.map((w) => (
                  <div key={w.id} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900">{w.term}</span> ({w.ipa}):{' '}
                    <span className="text-slate-600 font-medium">{w.answer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION SCREEN */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/80 space-y-6">
          {/* MODE 1 & 2: Multiple Choice */}
          {(testMode === 'mcq-en-vi' || testMode === 'mcq-vi-en') && mcqQuestions[currentIndex] && (
            <div className="space-y-6">
              <div className="text-center space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Câu hỏi {currentIndex + 1} / {sampledWords.length}
                </div>

                <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
                  <span>{mcqQuestions[currentIndex].questionText}</span>
                  {testMode === 'mcq-en-vi' && (
                    <button
                      onClick={() => speakWord(currentWord.term)}
                      className="p-1.5 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition-all cursor-pointer"
                      title="Nghe đọc"
                    >
                      <Volume2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mcqQuestions[currentIndex].choices.map((choice, idx) => {
                  const userAnswer = userAnswers[currentIndex];
                  const isSelected = userAnswer === choice;
                  const isCorrectAnswer = choice === mcqQuestions[currentIndex].correctAnswer;

                  let cardStyle = 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50/60 text-slate-800';

                  if (userAnswer !== undefined) {
                    if (isCorrectAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-extrabold ring-2 ring-emerald-400/20';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-extrabold ring-2 ring-rose-400/20';
                    } else {
                      cardStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectMCQChoice(choice)}
                      disabled={userAnswer !== undefined}
                      className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-black shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{choice}</span>
                      </span>

                      {userAnswer !== undefined && isCorrectAnswer && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      )}
                      {userAnswer !== undefined && isSelected && !isCorrectAnswer && (
                        <XCircle size={18} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {userAnswers[currentIndex] !== undefined && (
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>{currentIndex < sampledWords.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả'}</span>
                    <Sparkles size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 3: Spelling (Gõ từ chính tả) */}
          {testMode === 'spelling' && currentWord && (
            <div className="space-y-6">
              <div className="text-center space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Gõ từ Tiếng Anh cho nghĩa:
                </div>

                <div className="text-2xl font-black text-slate-900">
                  "{currentWord.answer}"
                </div>

                <div className="text-xs font-mono text-slate-500">
                  Phiên âm gợi ý: <span className="font-bold text-teal-700">{currentWord.ipa}</span>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSpellingSubmit} className="space-y-4 max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={spellingInput}
                    onChange={(e) => setSpellingInput(e.target.value)}
                    disabled={userAnswers[currentIndex] !== undefined}
                    placeholder="Gõ từ tiếng Anh vào đây..."
                    autoFocus
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-900 font-extrabold text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-center bg-slate-50/50"
                  />
                </div>

                {userAnswers[currentIndex] === undefined ? (
                  <button
                    type="submit"
                    disabled={!spellingInput.trim()}
                    className={`w-full py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      spellingInput.trim()
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={15} />
                    <span>Kiểm tra đáp án</span>
                  </button>
                ) : (
                  <div className="space-y-3 text-center">
                    {userAnswers[currentIndex].toLowerCase() === currentWord.term.toLowerCase() ? (
                      <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} />
                        <span>Chính xác! Đáp án đúng: {currentWord.term}</span>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-rose-100 text-rose-900 text-xs font-bold flex items-center justify-center gap-2">
                        <XCircle size={16} />
                        <span>Chưa đúng! Đáp án đúng là: <strong className="text-sm font-extrabold underline">{currentWord.term}</strong></span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>{currentIndex < sampledWords.length - 1 ? 'Câu kế tiếp' : 'Xem kết quả'}</span>
                      <Sparkles size={14} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* MODE 4: Matching Pair Game */}
          {testMode === 'matching' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Hãy nhấp chọn 1 từ Tiếng Anh ở cột trái và 1 nghĩa Tiếng Việt ở cột phải để nối cặp đúng!
                </p>
                {matchingError && (
                  <p className="text-xs font-bold text-rose-600 mt-1 animate-bounce">
                    Chưa chính xác! Hãy thử cặp từ khác nhé.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* English Column */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                    Tiếng Anh
                  </div>
                  {matchingEngItems.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedEngId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectEngForMatching(item.id)}
                        disabled={isMatched}
                        className={`w-full p-3 rounded-2xl border text-center font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-slate-100 border-slate-200 text-slate-300 line-through cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/30 scale-105'
                            : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                        }`}
                      >
                        {item.term}
                      </button>
                    );
                  })}
                </div>

                {/* Vietnamese Column */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                    Tiếng Việt
                  </div>
                  {matchingViItems.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedViId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectViForMatching(item.id)}
                        disabled={isMatched}
                        className={`w-full p-3 rounded-2xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-slate-100 border-slate-200 text-slate-300 line-through cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/30 scale-105'
                            : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                        }`}
                      >
                        {item.answer}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
