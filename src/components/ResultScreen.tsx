import React from 'react';
import type { StudyItem } from '../data/lessons';
import { Award, RotateCcw, AlertTriangle, CheckCircle2, XCircle, ChevronRight, BookOpen } from 'lucide-react';
import { renderFormattedText } from '../utils/formatText';

interface WrongAnswerRecord {
  item: StudyItem;
  lessonTitle: string;
  sectionTitle: string;
  sectionType: "vocabulary" | "multiple_choice";
}

interface ResultScreenProps {
  totalQuestions: number;
  correctAnswersCount: number;
  incorrectAnswersCount: number;
  wrongAnswers: WrongAnswerRecord[];
  onRetryAll: () => void;
  onRetryWrongOnly: () => void;
  onBackToSelector: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  totalQuestions,
  correctAnswersCount,
  incorrectAnswersCount,
  wrongAnswers,
  onRetryAll,
  onRetryWrongOnly,
  onBackToSelector,
}) => {
  const percentCorrect = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

  // Grade feedback messages
  let feedbackMessage = "Cố gắng lên nhé!";
  let feedbackColor = "text-amber-600";
  let feedbackBg = "bg-amber-50";

  if (percentCorrect === 100) {
    feedbackMessage = "Xuất sắc! Hoàn hảo 100%!";
    feedbackColor = "text-emerald-600";
    feedbackBg = "bg-emerald-50";
  } else if (percentCorrect >= 80) {
    feedbackMessage = "Tuyệt vời! Bạn nắm kiến thức rất chắc!";
    feedbackColor = "text-indigo-600";
    feedbackBg = "bg-indigo-50";
  } else if (percentCorrect >= 50) {
    feedbackMessage = "Khá tốt! Ôn thêm một chút nữa nhé.";
    feedbackColor = "text-blue-600";
    feedbackBg = "bg-blue-50";
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Score Header Card */}
      <div className="glass-panel rounded-3xl p-8 text-center mb-8 border-indigo-100 shadow-indigo-50/50">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-4 animate-bounce">
          <Award size={36} />
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-800">Hoàn thành phiên học!</h2>
        
        <div className="my-6 inline-block relative">
          <span className="text-6xl font-black text-indigo-600 font-mono">{percentCorrect}%</span>
          <span className="absolute -top-1 -right-4 text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">đúng</span>
        </div>

        <div className={`py-3 px-6 rounded-2xl inline-block font-semibold ${feedbackColor} ${feedbackBg} mb-6`}>
          {feedbackMessage}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider mb-1">Tổng số câu</span>
            <span className="text-xl font-bold text-slate-800">{totalQuestions}</span>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <span className="text-xs font-semibold text-emerald-600 block uppercase tracking-wider mb-1">Số câu đúng</span>
            <span className="text-xl font-bold text-emerald-700">{correctAnswersCount}</span>
          </div>
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
            <span className="text-xs font-semibold text-rose-600 block uppercase tracking-wider mb-1">Số câu sai</span>
            <span className="text-xl font-bold text-rose-700">{incorrectAnswersCount}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={onBackToSelector}
          className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
        >
          <RotateCcw size={18} />
          Quay lại chọn bài
        </button>

        <button
          onClick={onRetryAll}
          className="px-6 py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
        >
          Làm lại tất cả ({totalQuestions} câu)
        </button>

        {wrongAnswers.length > 0 && (
          <button
            onClick={onRetryWrongOnly}
            className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-100 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-none sm:order-3"
          >
            <AlertTriangle size={18} />
            Học lại câu sai ({wrongAnswers.length} câu)
          </button>
        )}
      </div>

      {/* Review Incorrect Questions List */}
      {wrongAnswers.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <AlertTriangle className="text-rose-500" size={20} />
            Danh sách câu trả lời chưa đúng ({wrongAnswers.length})
          </h3>

          {wrongAnswers.map((record) => {
            const { item, lessonTitle, sectionTitle, sectionType } = record;
            const isVocab = sectionType === "vocabulary";

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden"
              >
                {/* Visual side line indicating error */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500"></div>

                {/* Subtitle / context */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                    {lessonTitle}
                  </span>
                  <ChevronRight size={12} className="text-slate-300" />
                  <span className="font-medium text-slate-400 flex items-center gap-1">
                    <BookOpen size={12} />
                    {sectionTitle}
                  </span>
                </div>

                {/* Question / Term */}
                <div className="mb-4">
                  {isVocab ? (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Từ vựng</span>
                      <h4 className="text-xl font-bold text-slate-800">
                        {item.term} <span className="text-sm font-normal text-slate-400">[{item.reading}]</span>
                      </h4>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Câu hỏi trắc nghiệm</span>
                      <h4 className="text-lg font-bold text-slate-800 leading-relaxed">
                        {item.question}
                      </h4>
                    </div>
                  )}
                </div>

                {/* Correct answer and explanation block */}
                <div className="space-y-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-slate-700">
                      <span className="font-bold">Đáp án đúng:</span>{' '}
                      <span className="font-semibold text-emerald-700">
                        {isVocab ? (item.meaning || item.answer) : item.answer}
                      </span>
                    </div>
                  </div>

                  {item.explanation && (
                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                      <XCircle className="text-slate-400 shrink-0 mt-0.5" size={16} />
                      <div className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
                        <span className="font-bold text-slate-600">Giải thích:</span> {renderFormattedText(item.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-emerald-50/30 rounded-2xl border border-emerald-100 max-w-md mx-auto">
          <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-3 animate-pulse" />
          <h3 className="text-lg font-bold text-emerald-800">Bạn đã trả lời đúng tất cả!</h3>
          <p className="text-sm text-emerald-600 mt-1">Không có câu hỏi sai nào cần ôn tập.</p>
        </div>
      )}
    </div>
  );
};
