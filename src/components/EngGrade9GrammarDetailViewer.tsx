import React, { useState } from 'react';
import { engTensesData, engModalVerbsData } from '../data/engTensesData';
import {
  ArrowLeft,
  Volume2,
  Lightbulb,
  Play,
  Award
} from 'lucide-react';

interface EngGrade9GrammarDetailViewerProps {
  lessonType: 'tenses' | 'modal-verbs' | 'nouns' | 'verbs' | 'adjectives' | 'connectors';
  onClose: () => void;
  onStartQuiz: () => void;
}

export const EngGrade9GrammarDetailViewer: React.FC<EngGrade9GrammarDetailViewerProps> = ({
  lessonType,
  onClose,
  onStartQuiz
}) => {
  const [activeTenseId, setActiveTenseId] = useState<string>('present-simple');
  const [selectedSignalWord, setSelectedSignalWord] = useState<string | null>(null);
  const [showAllSignalMeanings, setShowAllSignalMeanings] = useState<boolean>(false);

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
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>Quay lại danh sách bài học</span>
        </button>

        <div className="text-center">
          <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 justify-center">
            <Award size={16} className="text-teal-600" />
            <span>
              {lessonType === 'tenses' && 'Bài 1: Trọn Bộ 8 Thì Trọng Tâm Tiếng Anh Lớp 9'}
              {lessonType === 'modal-verbs' && 'Bài 2: Chuyên Đề Động Từ Khuyết Thiếu (Modal Verbs)'}
              {lessonType === 'nouns' && 'Bài 3: Chuyên Đề Danh Từ (Nouns)'}
              {lessonType === 'verbs' && 'Bài 4: Chuyên Đề Động Từ & Cụm Động Từ'}
              {lessonType === 'adjectives' && 'Bài 5: Chuyên Đề Tính Từ & Trạng Từ'}
              {lessonType === 'connectors' && 'Bài 6: Chuyên Đề Từ Nối & Giới Từ'}
            </span>
          </h2>
        </div>

        <button
          onClick={onStartQuiz}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Play size={13} fill="currentColor" />
          <span>Luyện Tập Ngay</span>
        </button>
      </div>

      {/* VIEW 1: TRỌN BỘ 8 THÌ TIẾNG ANH LỚP 9 */}
      {lessonType === 'tenses' && (
        <div className="space-y-6">
          {/* Tenses Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
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

          {/* Active Tense Card */}
          {activeTense && (
            <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-teal-200/80 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2 inline-block">
                    CÔNG THỨC & CÁCH DÙNG
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {activeTense.nameEn} - {activeTense.nameVi}
                  </h3>
                </div>
              </div>

              {/* Formulas Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Cấu trúc công thức (Formulas)
                </h4>

                {activeTense.splitFormulas ? (
                  <div className="space-y-4">
                    {/* A. TO BE */}
                    <div className="p-4 rounded-2xl bg-white border border-teal-200/90 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-teal-100 pb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-extrabold">
                          A. CÔNG THỨC VỚI ĐỘNG TỪ TO BE
                        </span>
                        <span className="text-[11px] text-teal-600 font-bold">
                          {activeTense.id === 'present-simple' ? 'am / is / are' : 'was / were'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                          <span className="text-[10px] font-black text-emerald-800 block mb-0.5">(+) KHẲNG ĐỊNH</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.toBe.positive}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                          <span className="text-[10px] font-black text-rose-800 block mb-0.5">(-) PHỦ ĐỊNH</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.toBe.negative}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
                          <span className="text-[10px] font-black text-sky-800 block mb-0.5">(?) NGHI VẤN</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.toBe.question}</span>
                        </div>
                      </div>
                    </div>

                    {/* B. ĐỘNG TỪ THƯỜNG */}
                    <div className="p-4 rounded-2xl bg-white border border-indigo-200/90 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-extrabold">
                          B. CÔNG THỨC VỚI ĐỘNG TỪ THƯỜNG
                        </span>
                        <span className="text-[11px] text-indigo-600 font-bold">
                          {activeTense.id === 'present-simple' ? 'V(s/es) & do/does' : 'V_2/ed & did'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                          <span className="text-[10px] font-black text-emerald-800 block mb-0.5">(+) KHẲNG ĐỊNH</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.ordinaryVerb.positive}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
                          <span className="text-[10px] font-black text-rose-800 block mb-0.5">(-) PHỦ ĐỊNH</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.ordinaryVerb.negative}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
                          <span className="text-[10px] font-black text-sky-800 block mb-0.5">(?) NGHI VẤN</span>
                          <span className="font-mono text-xs font-bold text-slate-900">{activeTense.splitFormulas.ordinaryVerb.question}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        (+) KHẲNG ĐỊNH
                      </span>
                      <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                        {activeTense.formula}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black">
                        (-) PHỦ ĐỊNH
                      </span>
                      <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                        {activeTense.negativeFormula}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-sky-200 shadow-sm space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-black">
                        (?) NGHI VẤN
                      </span>
                      <p className="font-extrabold text-slate-900 text-sm font-mono pt-1">
                        {activeTense.questionFormula}
                      </p>
                    </div>
                  </div>
                )}
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>3. Dấu hiệu nhận biết (Signal Words)</span>
                    <span className="text-[11px] font-normal text-slate-400 normal-case hidden sm:inline">
                      (Nhấp vào từ để xem nghĩa)
                    </span>
                  </h4>

                  <button
                    onClick={() => setShowAllSignalMeanings(!showAllSignalMeanings)}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition-all cursor-pointer border border-teal-200/60"
                  >
                    {showAllSignalMeanings ? 'Ẩn nghĩa tiếng Việt' : 'Hiện tất cả nghĩa'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-white border border-slate-200">
                  {activeTense.signalWords.map((item, idx) => {
                    const isSelected = selectedSignalWord === item.word;
                    const isShowingMeaning = showAllSignalMeanings || isSelected;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSignalWord(isSelected ? null : item.word)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left border flex items-center gap-1.5 ${
                          isShowingMeaning
                            ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm ring-2 ring-amber-500/15'
                            : 'bg-teal-50/80 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-300'
                        }`}
                      >
                        <span className="font-extrabold">{item.word}</span>
                        {isShowingMeaning && (
                          <span className="text-[11px] text-amber-800 font-semibold border-l border-amber-300/80 pl-1.5">
                            ➔ {item.meaning}
                          </span>
                        )}
                      </button>
                    );
                  })}
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

              {/* Tips */}
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
      )}

      {/* VIEW 2: ĐỘNG TỪ KHUYẾT THIẾU (MODAL VERBS) */}
      {lessonType === 'modal-verbs' && (
        <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-teal-200/80 space-y-6 shadow-sm">
          <div className="border-b border-slate-200/80 pb-4">
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2 inline-block">
              CHUYÊN ĐỀ 2: ĐỘNG TỪ KHUYẾT THIẾU
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Modal Verbs (Can, Could, Must, Mustn’t, Should, May, Might)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Động từ khuyết thiếu đi kèm động từ nguyên thể không "to" ($S + Modal + V_0$), dùng diễn tả khả năng, sự bắt buộc, lời khuyên hay sự cho phép.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {engModalVerbsData.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-sm hover:border-teal-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-sm">
                    {item.modal}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{item.formula}</span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.meaningVi}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.usage}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Ví dụ: {item.exampleEn}</span>
                    <button
                      onClick={() => speakText(item.exampleEn)}
                      className="p-0.5 rounded text-teal-600 hover:bg-teal-100 transition-all cursor-pointer"
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                  <div className="text-slate-500 italic">➔ {item.exampleVi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
