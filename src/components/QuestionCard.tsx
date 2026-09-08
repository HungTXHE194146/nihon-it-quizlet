import React, { useState, useEffect } from 'react';
import type { StudyItem } from '../data/lessons';
import { CheckCircle2, XCircle, Info, HelpCircle, X } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

interface QuestionCardProps {
  item: StudyItem;
  lessonTitle: string;
  sectionTitle: string;
  onAnswerGraded: (isCorrect: boolean) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  item,
  lessonTitle,
  sectionTitle,
  onAnswerGraded,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isGraded, setIsGraded] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  // Reset selected state when item changes
  useEffect(() => {
    setSelectedChoice(null);
    setIsGraded(false);
    setIsImageOpen(false);
  }, [item]);

  const choices = item.choices || [];
  
  // Detect if this is a True/False question (choices are exactly "Đúng" and "Sai")
  const isTrueFalse = 
    choices.length === 2 && 
    ((choices[0] === 'Đúng' && choices[1] === 'Sai') || 
     (choices[0] === 'Sai' && choices[1] === 'Đúng'));

  const handleSelect = (choice: string) => {
    if (isGraded) return; // Prevent clicking after selection
    
    setSelectedChoice(choice);
    setIsGraded(true);
    
    const correct = choice === item.answer;
    onAnswerGraded(correct);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Lesson Details Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
          {lessonTitle}
        </span>
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <HelpCircle size={14} className="text-slate-400" />
          {sectionTitle}
        </span>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100/40 p-6 md:p-8 transition-all duration-300">
        <div className="mb-6">
          {item.image ? (
            /* Image-based question: show image only */
            <div 
              className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 cursor-zoom-in transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
              onClick={() => setIsImageOpen(true)}
            >
              <img
                src={item.image}
                alt="Question"
                className="w-full max-h-80 object-contain transition-transform duration-200 hover:scale-[1.01]"
              />
            </div>
          ) : (
            /* Text-based question */
            <>
              <span className="inline-block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Câu hỏi</span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {item.question}
              </h2>
            </>
          )}
        </div>

        {/* Choice List */}
        {isTrueFalse ? (
          /* True/False Layout: 2 large buttons side by side */
          <div className="grid grid-cols-2 gap-4 mt-6">
            {choices.map((choice) => {
              const isSelected = selectedChoice === choice;
              const isAnswer = item.answer === choice;
              
              let btnClass = "border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/20";
              let icon = null;

              if (isGraded) {
                if (isAnswer) {
                  btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-emerald-50";
                  icon = <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />;
                } else if (isSelected) {
                  btnClass = "border-rose-500 bg-rose-50 text-rose-800 shadow-rose-50";
                  icon = <XCircle size={20} className="text-rose-600 shrink-0" />;
                } else {
                  btnClass = "border-slate-100 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={choice}
                  disabled={isGraded}
                  onClick={() => handleSelect(choice)}
                  className={`flex flex-col items-center justify-center py-6 px-4 rounded-xl border-2 text-lg font-bold transition-all duration-200 ${
                    !isGraded ? 'active:scale-95 cursor-pointer' : 'cursor-default'
                  } ${btnClass}`}
                >
                  <span className="mb-2">{choice}</span>
                  {icon}
                </button>
              );
            })}
          </div>
        ) : (
          /* Standard Multiple Choice Layout: Vertical list */
          <div className="flex flex-col gap-3 mt-6">
            {choices.map((choice, index) => {
              const isSelected = selectedChoice === choice;
              const isAnswer = item.answer === choice;
              
              let choiceLetter = String.fromCharCode(65 + index); // A, B, C, D...
              let optionClass = "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/10";
              let badgeClass = "bg-white text-slate-500 border-slate-200";
              let icon = null;

              if (isGraded) {
                if (isAnswer) {
                  optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm shadow-emerald-50";
                  badgeClass = "bg-emerald-500 text-white border-emerald-500";
                  icon = <CheckCircle2 size={18} className="text-emerald-600 shrink-0 ml-auto" />;
                } else if (isSelected) {
                  optionClass = "border-rose-500 bg-rose-50 text-rose-900 shadow-sm shadow-rose-50";
                  badgeClass = "bg-rose-500 text-white border-rose-500";
                  icon = <XCircle size={18} className="text-rose-600 shrink-0 ml-auto" />;
                } else {
                  optionClass = "border-slate-100 bg-white text-slate-400 opacity-65";
                  badgeClass = "bg-slate-50 text-slate-300 border-slate-100";
                }
              }

              return (
                <button
                  key={choice}
                  disabled={isGraded}
                  onClick={() => handleSelect(choice)}
                  className={`w-full flex items-center gap-4 py-4 px-5 rounded-xl border-2 text-left font-medium transition-all duration-200 ${
                    !isGraded ? 'active:translate-x-1 cursor-pointer' : 'cursor-default'
                  } ${optionClass}`}
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-bold shrink-0 ${badgeClass}`}>
                    {choiceLetter}
                  </span>
                  <span className="text-base leading-tight pr-2">{choice}</span>
                  {icon}
                </button>
              );
            })}
          </div>
        )}

        {/* Explanation & Correction Reveal Block */}
        {isGraded && (
          <div className="mt-8 pt-6 border-t border-slate-100 animate-fadeIn">
            {/* Answer banner */}
            <div className={`p-4 rounded-xl flex items-start gap-3 mb-4 ${
              selectedChoice === item.answer 
                ? 'bg-emerald-50/50 text-emerald-800 border border-emerald-100' 
                : 'bg-rose-50/50 text-rose-800 border border-rose-100'
            }`}>
              {selectedChoice === item.answer ? (
                <>
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-sm">Chính xác!</p>
                    <p className="text-xs opacity-90 mt-0.5">Đáp án đúng là: <span className="font-semibold">{item.answer}</span></p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-sm">Sai rồi!</p>
                    <p className="text-xs opacity-90 mt-0.5">Bạn đã chọn: <span className="font-semibold">{selectedChoice}</span>. Đáp án đúng phải là: <span className="font-bold text-emerald-700">{item.answer}</span></p>
                  </div>
                </>
              )}
            </div>

            {/* Explanation text */}
            {item.explanation && (
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex gap-3 text-slate-600 text-sm">
                <Info className="text-indigo-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="font-bold text-slate-700 block mb-0.5">Giải thích chi tiết:</span>
                  <p className="leading-relaxed whitespace-pre-line">{renderFormattedText(item.explanation)}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && item.image && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setIsImageOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-slate-200 bg-black/40 hover:bg-black/60 p-3 rounded-full transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageOpen(false);
            }}
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            <img
              src={item.image}
              alt="Question Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
