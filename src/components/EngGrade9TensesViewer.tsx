import React, { useState } from 'react';
import { engTensesData } from '../data/engTensesData';
import {
  Sparkles,
  Volume2,
  Lightbulb,
  Clock,
  Play
} from 'lucide-react';

interface EngGrade9TensesViewerProps {
  onStartTenseQuiz?: (tenseId: string) => void;
}

export const EngGrade9TensesViewer: React.FC<EngGrade9TensesViewerProps> = ({
  onStartTenseQuiz
}) => {
  const [activeTenseId, setActiveTenseId] = useState<string>('present-simple');

  const activeTense = engTensesData.find((t) => t.id === activeTenseId) || engTensesData[0];

  // Speech Synthesis
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Selector Pills for 7 Tenses */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <Clock size={16} className="text-teal-600" />
            <span>Chuyên Đề 1: Trọn Bộ 7 Thì Trọng Tâm Tiếng Anh Lớp 9</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click vào thì để xem lý thuyết chi tiết</span>
        </div>

        {/* 7 Tenses Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {engTensesData.map((tense) => {
            const isActive = tense.id === activeTenseId;
            return (
              <button
                key={tense.id}
                onClick={() => setActiveTenseId(tense.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20 scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-slate-50/60'
                }`}
              >
                <span className="font-extrabold text-xs leading-tight">{tense.nameEn}</span>
                <span className={`text-[10px] ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                  {tense.nameVi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Theory Detail Card */}
      {activeTense && (
        <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-teal-200/80 space-y-6 shadow-sm">
          {/* Header & Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
                <Sparkles size={13} />
                <span>LÝ THUYẾT THÌ NGỮ PHÁP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeTense.nameEn} - {activeTense.nameVi}
              </h2>
            </div>

            {onStartTenseQuiz && (
              <button
                onClick={() => onStartTenseQuiz(activeTense.id)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-teal-200 transition-all cursor-pointer shrink-0"
              >
                <Play size={14} fill="currentColor" />
                <span>Luyện Tập Thì Này</span>
              </button>
            )}
          </div>

          {/* Formulas Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Cấu trúc & Công thức (Formulas)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Khẳng định */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  (+) THỂ KHẲNG ĐỊNH
                </span>
                <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                  {activeTense.formula}
                </p>
              </div>

              {/* Phủ định */}
              <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-1">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black">
                  (-) THỂ PHỦ ĐỊNH
                </span>
                <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                  {activeTense.negativeFormula}
                </p>
              </div>

              {/* Nghi vấn */}
              <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-sm space-y-1">
                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-black">
                  (?) THỂ NGHI VẤN
                </span>
                <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                  {activeTense.questionFormula}
                </p>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Cách sử dụng (Usage)
            </h4>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {activeTense.usage}
            </div>
          </div>

          {/* Signal Words */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              3. Dấu hiệu nhận biết (Signal Words)
            </h4>
            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-white border border-slate-200">
              {activeTense.signalWords.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-900 border border-teal-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <span className="font-extrabold">{item.word}</span>
                  <span className="text-[11px] text-teal-700 font-semibold border-l border-teal-200 pl-1.5">
                    ➔ {item.meaning}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              4. Ví dụ minh họa (Examples)
            </h4>
            <div className="space-y-2">
              {activeTense.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <span>{ex.en}</span>
                      <button
                        onClick={() => speakText(ex.en)}
                        className="p-1 rounded-lg text-teal-600 hover:bg-teal-50 transition-all cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 font-medium italic mt-0.5">
                      ➔ {ex.vi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-amber-900 text-xs font-medium">
            <Lightbulb size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold block text-amber-950 mb-0.5">Mẹo ghi nhớ nhanh:</strong>
              {activeTense.tips}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
