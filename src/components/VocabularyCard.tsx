import React, { useState, useEffect, useCallback } from 'react';
import type { StudyItem } from '../data/lessons';
import { RefreshCw, Check, X, HelpCircle, Eye, EyeOff, Volume2 } from 'lucide-react';
import { speak, speakableText, ttsSupported, cancelSpeech } from '../lib/tts';

interface VocabularyCardProps {
  item: StudyItem;
  lessonTitle: string;
  sectionTitle: string;
  onAnswerGraded: (isCorrect: boolean) => void;
  practiceMode?: 'default' | 'write-kanji';
  /** Ngôn ngữ phát âm của môn học hiện tại. */
  lang?: 'ja' | 'en';
  /** Tự đọc to ngay khi thẻ hiện ra. */
  autoPlay?: boolean;
  ttsRate?: number;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  lessonTitle,
  sectionTitle,
  onAnswerGraded,
  practiceMode = 'default',
  lang = 'ja',
  autoPlay = false,
  ttsRate = 0.9,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGraded, setIsGraded] = useState(false);
  const [showHira, setShowHira] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<'correct' | 'incorrect' | null>(null);

  // Reset when vocabulary item changes
  useEffect(() => {
    setIsFlipped(false);
    setIsGraded(false);
    setShowHira(false);
    setShowExample(false);
    setSelectedGrade(null);
  }, [item]);

  const handleFlip = () => {
    if (isGraded) return;
    setIsFlipped(prev => !prev);
  };

  // Chuỗi được đọc to: ưu tiên cách đọc thuần kana, nếu không thì đọc chính từ.
  const spokenText = speakableText(item.term, item.reading);

  const handleSpeak = useCallback(
    (text?: string) => {
      speak(text ?? spokenText, { lang, rate: ttsRate });
    },
    [spokenText, lang, ttsRate]
  );

  // Tự phát âm khi thẻ mới xuất hiện, và ngắt tiếng khi rời thẻ.
  useEffect(() => {
    if (autoPlay && spokenText) {
      handleSpeak();
    }
    return () => cancelSpeech();
  }, [item, autoPlay, spokenText, handleSpeak]);

  const handleSelfGrade = (isCorrect: boolean) => {
    setIsGraded(true);
    onAnswerGraded(isCorrect);
  };

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isGraded) {
          setIsFlipped(prev => !prev);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!isGraded) {
          setSelectedGrade('incorrect');
          setIsFlipped(true);
          setIsGraded(true);
          onAnswerGraded(false);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (!isGraded) {
          setSelectedGrade('correct');
          setIsFlipped(true);
          setIsGraded(true);
          onAnswerGraded(true);
        }
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        if (!isGraded) {
          setShowHira(prev => !prev);
        }
      } else if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSpeak();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGraded, onAnswerGraded, handleSpeak]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Lesson Details Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wide flex items-center gap-1.5">
          {practiceMode === 'write-kanji' && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
          {lessonTitle}
        </span>
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <HelpCircle size={14} className="text-slate-400" />
          {sectionTitle}
        </span>
      </div>

      {/* 3D Flashcard Container */}
      <div className="perspective-1000 w-full h-[340px] md:h-[360px] relative select-none">
        <div
          onClick={handleFlip}
          className={`w-full h-full absolute transition-transform duration-500 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100/40 p-6 md:p-8 flex flex-col justify-between cursor-pointer hover:border-indigo-300 transition-all duration-300">
            <div className="flex items-center justify-between gap-2">
              {ttsSupported && spokenText ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak();
                  }}
                  className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 hover:bg-sky-100 active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Nghe phát âm (phím S)"
                  aria-label="Nghe phát âm"
                >
                  <Volume2 size={16} />
                </button>
              ) : (
                <span />
              )}
              {practiceMode === 'write-kanji' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-[10px] font-black text-amber-800 uppercase tracking-wider border border-amber-200">
                  ✍️ Tập viết Chữ Hán
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Từ vựng
                </span>
              )}
            </div>

            <div className="text-center my-auto flex flex-col items-center justify-center">
              {practiceMode === 'write-kanji' ? (
                <>
                  {/* WRITE KANJI MODE FRONT: Show Reading Big ONLY, Hide Kanji & Hide Meaning */}
                  <h2 className="text-4xl md:text-5xl font-black text-rose-600 leading-tight mb-2 select-text">
                    {item.reading || item.term}
                  </h2>
                  <div className="mt-4 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                    <span>✍️ Hãy tự viết Chữ Hán ra giấy trước khi xem đáp án</span>
                  </div>
                </>
              ) : (
                <>
                  {/* DEFAULT MODE FRONT: Show Kanji Big */}
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-2 select-text">
                    {item.term}
                  </h2>
                  
                  {/* Show/Hide Hiragana Toggle Area with Fixed Height */}
                  {item.reading && (
                    <div className="mt-2 h-12 flex items-center justify-center">
                      {showHira ? (
                        <p className="text-slate-500 font-semibold text-sm md:text-base select-text flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50 animate-fadeIn">
                          <span>[{item.reading}]</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowHira(false);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Ẩn cách đọc"
                          >
                            <EyeOff size={14} />
                          </button>
                        </p>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHira(true);
                          }}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-2 rounded-lg border border-indigo-100 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
                        >
                          <Eye size={12} />
                          Hiện cách đọc / Từ gốc
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold text-sm">
              <Eye size={16} />
              {practiceMode === 'write-kanji'
                ? 'Bấm vào thẻ để đối chiếu Chữ Hán đáp án'
                : 'Bấm vào thẻ hoặc nút dưới để xem nghĩa'}
            </div>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl shadow-slate-100/40 rotate-y-180 p-6 md:p-8 flex flex-col justify-between cursor-default">
            <div className="text-right flex justify-between items-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                {practiceMode === 'write-kanji' ? 'Chữ Hán Đáp Án' : 'Ý nghĩa'}
              </span>
              {ttsSupported && spokenText && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak();
                  }}
                  className="ml-auto mr-1.5 p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                  title="Nghe phát âm (phím S)"
                  aria-label="Nghe phát âm"
                >
                  <Volume2 size={16} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                disabled={isGraded}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
                title="Lật lại mặt trước"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Meaning / Kanji details */}
            <div className="text-center my-auto flex flex-col items-center justify-center overflow-y-auto max-h-[190px] py-2 px-1 w-full">
              {practiceMode === 'write-kanji' ? (
                <>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight select-text mb-2">
                    {item.term}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    {item.reading && <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">[{item.reading}]</span>}
                    <span>{item.meaning || item.answer}</span>
                  </div>
                </>
              ) : (
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight select-text">
                  {item.meaning || item.answer}
                </h3>
              )}
              {item.explanation && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs md:text-sm text-slate-500 max-w-md w-full select-text">
                  <span className="font-bold text-slate-700 block mb-0.5">Giải thích:</span>
                  {item.explanation}
                </div>
              )}

              {/* Example sentence toggle */}
              {item.example && (
                <div className="mt-3 w-full flex flex-col items-center">
                  {!showExample ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowExample(true);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <Eye size={12} />
                      <span>Xem câu ví dụ (例文)</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-indigo-50/90 rounded-xl border border-indigo-200/80 text-left text-xs md:text-sm text-indigo-950 max-w-md w-full select-text animate-fadeIn">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-indigo-700 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                          💡 Ví dụ (例文):
                          {ttsSupported && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeak(item.example);
                              }}
                              className="ml-1 p-1 rounded text-sky-600 hover:bg-white/70 transition-colors cursor-pointer"
                              title="Nghe câu ví dụ"
                              aria-label="Nghe câu ví dụ"
                            >
                              <Volume2 size={13} />
                            </button>
                          )}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowExample(false);
                          }}
                          className="text-[10px] font-bold text-slate-500 hover:text-indigo-700 bg-white/90 px-2 py-0.5 rounded border border-indigo-100 cursor-pointer"
                        >
                          Ẩn ví dụ
                        </button>
                      </div>
                      <p className="font-medium whitespace-pre-line leading-relaxed text-slate-800">
                        {item.example}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action text */}
            <div className="text-center text-xs font-semibold text-slate-400">
              {isGraded ? 'Đã ghi nhận kết quả' : 'Tự đánh giá độ nhớ của bạn'}
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        {!isFlipped ? (
          <button
            onClick={handleFlip}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={16} className="animate-spin-slow" />
            Xem nghĩa (Lật thẻ)
          </button>
        ) : (
          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={() => {
                setSelectedGrade('incorrect');
                handleSelfGrade(false);
              }}
              disabled={isGraded}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all flex-1 max-w-[170px] justify-center ${
                isGraded
                  ? selectedGrade === 'incorrect'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-100'
                    : 'bg-slate-100 text-slate-400 opacity-50 cursor-default border border-slate-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 active:scale-95 cursor-pointer'
              }`}
            >
              <X size={18} />
              Chưa thuộc
            </button>
            <button
              onClick={() => {
                setSelectedGrade('correct');
                handleSelfGrade(true);
              }}
              disabled={isGraded}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all flex-1 max-w-[170px] justify-center ${
                isGraded
                  ? selectedGrade === 'correct'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                    : 'bg-slate-100 text-slate-400 opacity-50 cursor-default border border-slate-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-95 cursor-pointer'
              }`}
            >
              <Check size={18} />
              Đã thuộc
            </button>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-8 flex justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100/50 py-2 px-4 rounded-xl border border-slate-200/40 w-fit mx-auto select-none">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-350 rounded shadow-sm font-mono text-[9px] text-slate-500">Space</kbd>
          Lật thẻ
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-350 rounded shadow-sm font-mono text-[9px] text-slate-500">H</kbd>
          Hiện đọc
        </span>
        {ttsSupported && (
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-350 rounded shadow-sm font-mono text-[9px] text-slate-500">S</kbd>
            Nghe
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-350 rounded shadow-sm font-mono text-[9px] text-slate-500">←</kbd>
          Chưa thuộc
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-350 rounded shadow-sm font-mono text-[9px] text-slate-500">→</kbd>
          Đã thuộc
        </span>
      </div>
    </div>
  );
};
