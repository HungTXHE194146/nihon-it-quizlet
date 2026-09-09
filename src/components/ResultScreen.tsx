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
  let feedbackColor = "text-amber-600 dark:text-amber-400";
  let feedbackBg = "bg-amber-50 dark:bg-amber-950/40";

  if (percentCorrect === 100) {
    feedbackMessage = "Xuất sắc! Hoàn hảo 100%!";
    feedbackColor = "text-emerald-600 dark:text-emerald-400";
    feedbackBg = "bg-emerald-50 dark:bg-emerald-950/40";
  } else if (percentCorrect >= 80) {
    feedbackMessage = "Tuyệt vời! Bạn nắm kiến thức rất chắc!";
    feedbackColor = "text-indigo-600 dark:text-indigo-400";
    feedbackBg = "bg-indigo-50 dark:bg-indigo-950/40";
  } else if (percentCorrect >= 50) {
    feedbackMessage = "Khá tốt! Ôn thêm một chút nữa nhé.";
    feedbackColor = "text-blue-600 dark:text-blue-400";
    feedbackBg = "bg-blue-50 dark:bg-blue-950/40";
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Score Header Card */}
      <div className="glass-panel rounded-3xl p-8 text-center mb-8 border-indigo-100 dark:border-indigo-800 shadow-indigo-50/50 dark:shadow-none">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4 animate-bounce">
          <Award size={36} />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">Hoàn thành phiên học!</h2>

        <div className="my-6 inline-block relative">
          <span className="text-6xl font-black text-indigo-600 dark:text-indigo-400 font-mono">{percentCorrect}%</span>
          <span className="absolute -top-1 -right-4 text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">đúng</span>
        </div>

        <div className={`py-3 px-6 rounded-2xl inline-block font-semibold ${feedbackColor} ${feedbackBg} mb-6`}>
          {feedbackMessage}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block uppercase tracking-wider mb-1">Tổng số câu</span>
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{totalQuestions}</span>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider mb-1">Số câu đúng</span>
            <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{correctAnswersCount}</span>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-950/40 p-4 rounded-xl border border-rose-100 dark:border-rose-800">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 block uppercase tracking-wider mb-1">Số câu sai</span>
            <span className="text-xl font-bold text-rose-700 dark:text-rose-300">{incorrectAnswersCount}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={onBackToSelector}
          className="px-6 py-3.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
        >
          <RotateCcw size={18} />
          Quay lại chọn bài
        </button>

        <button
          onClick={onRetryAll}
          className="px-6 py-3.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
        >
          Làm lại tất cả ({totalQuestions} câu)
        </button>

        {wrongAnswers.length > 0 && (
          <button
            onClick={onRetryWrongOnly}
            className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-rose-100 dark:shadow-none active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer order-none sm:order-3"
          >
            <AlertTriangle size={18} />
            Học lại câu sai ({wrongAnswers.length} câu)
          </button>
        )}
      </div>

      {/* Review Incorrect Questions List */}
      {wrongAnswers.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <AlertTriangle className="text-rose-500 dark:text-rose-400" size={20} />
            Danh sách câu trả lời chưa đúng ({wrongAnswers.length})
          </h3>

          {wrongAnswers.map((record) => {
            const { item, lessonTitle, sectionTitle, sectionType } = record;
            const isVocab = sectionType === "vocabulary";

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm relative overflow-hidden"
              >
                {/* Visual side line indicating error */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500"></div>

                {/* Subtitle / context */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-indigo-600 dark:text-indigo-300 uppercase bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                    {lessonTitle}
                  </span>
                  <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
                  <span className="font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <BookOpen size={12} />
                    {sectionTitle}
                  </span>
                </div>

                {/* Question / Term */}
                <div className="mb-4">
                  {isVocab ? (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider mb-0.5">Từ vựng</span>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        {item.term} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">[{item.reading}]</span>
                      </h4>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider mb-0.5">Câu hỏi trắc nghiệm</span>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                        {item.question}
                      </h4>
                    </div>
                  )}
                </div>

                {/* Correct answer and explanation block */}
                <div className="space-y-3.5 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <span className="font-bold">Đáp án đúng:</span>{' '}
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                        {isVocab ? (item.meaning || item.answer) : item.answer}
                      </span>
                    </div>
                  </div>

                  {item.explanation && (
                    <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <XCircle className="text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        <span className="font-bold text-slate-600 dark:text-slate-300">Giải thích:</span> {renderFormattedText(item.explanation)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 bg-emerald-50/30 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 max-w-md mx-auto">
          <CheckCircle2 size={48} className="text-emerald-500 dark:text-emerald-400 mx-auto mb-3 animate-pulse" />
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">Bạn đã trả lời đúng tất cả!</h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Không có câu hỏi sai nào cần ôn tập.</p>
        </div>
      )}
    </div>
  );
};
