import React, { useState, useMemo, useEffect } from 'react';
import { engIrregularVerbs, type IrregularVerb } from '../data/engIrregularVerbsData';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  RotateCw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Target,
  CheckCircle2,
  XCircle,
  Award,
  RefreshCw,
  Play,
  ArrowLeft
} from 'lucide-react';

export const EngIrregularVerbsViewer: React.FC = () => {
  // Active Mode State: 'table' | 'flashcard' | 'test' (Saved in localStorage)
  const [activeMode, setActiveMode] = useState<'table' | 'flashcard' | 'test'>(() => {
    try {
      const saved = localStorage.getItem('eng_irregular_active_mode');
      if (saved && ['table', 'flashcard', 'test'].includes(saved)) {
        return saved as 'table' | 'flashcard' | 'test';
      }
    } catch { }
    return 'table';
  });

  // Save activeMode to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('eng_irregular_active_mode', activeMode);
    } catch { }
  }, [activeMode]);

  // Search State for Table Mode
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Speech synthesis helper
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered Verbs for Table
  const filteredVerbs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return engIrregularVerbs;
    return engIrregularVerbs.filter(
      (verb) =>
        verb.v1.toLowerCase().includes(q) ||
        verb.v2.toLowerCase().includes(q) ||
        verb.v3.toLowerCase().includes(q) ||
        verb.meaning.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // --- FLASHCARD MODE STATE ---
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [flashcardDeck, setFlashcardDeck] = useState<IrregularVerb[]>(engIrregularVerbs);

  const currentFlashcard = flashcardDeck[cardIndex] || engIrregularVerbs[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % flashcardDeck.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  const handleShuffleDeck = () => {
    setIsFlipped(false);
    setFlashcardDeck([...engIrregularVerbs].sort(() => 0.5 - Math.random()));
    setCardIndex(0);
  };

  // --- TEST MODE STATE ---
  const [testCount, setTestCount] = useState<number>(10);
  const [testQuestions, setTestQuestions] = useState<IrregularVerb[]>([]);
  const [userAnswersV2, setUserAnswersV2] = useState<Record<string, string>>({});
  const [userAnswersV3, setUserAnswersV3] = useState<Record<string, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  const startTest = (count: number) => {
    const shuffled = [...engIrregularVerbs].sort(() => 0.5 - Math.random());
    setTestQuestions(shuffled.slice(0, count));
    setTestCount(count);
    setUserAnswersV2({});
    setUserAnswersV3({});
    setCheckedQuestions({});
  };

  // Auto-init test if empty
  useEffect(() => {
    if (activeMode === 'test' && testQuestions.length === 0) {
      startTest(testCount);
    }
  }, [activeMode]);

  // Normalize string checking for V2 & V3
  const isAnswerCorrect = (userTyped: string, targetAnswer: string): boolean => {
    const normUser = (userTyped || '').toLowerCase().trim();
    if (!normUser) return false;

    // Split target options by / or ,
    const targetParts = targetAnswer.toLowerCase().split(/[\/\,\;]+/).map((s) => s.trim());
    if (targetParts.includes(normUser)) return true;

    // Remove internal spaces for comparison
    const normUserClean = normUser.replace(/\s+/g, '');
    const targetClean = targetAnswer.toLowerCase().replace(/\s+/g, '');
    if (normUserClean === targetClean) return true;

    return false;
  };

  const handleCheckQuestion = (qId: string) => {
    setCheckedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleRetryQuestion = (qId: string) => {
    setCheckedQuestions((prev) => ({ ...prev, [qId]: false }));
    setUserAnswersV2((prev) => ({ ...prev, [qId]: '' }));
    setUserAnswersV3((prev) => ({ ...prev, [qId]: '' }));
  };

  const scoreStats = useMemo(() => {
    let totalChecked = 0;
    let correctCount = 0;

    testQuestions.forEach((q) => {
      if (checkedQuestions[q.id]) {
        totalChecked++;
        const v2Ok = isAnswerCorrect(userAnswersV2[q.id], q.v2);
        const v3Ok = isAnswerCorrect(userAnswersV3[q.id], q.v3);
        if (v2Ok && v3Ok) {
          correctCount++;
        }
      }
    });

    return { totalChecked, correctCount, totalQuestions: testQuestions.length };
  }, [testQuestions, checkedQuestions, userAnswersV2, userAnswersV3]);

  return (
    <div className="space-y-6 animate-fadeIn w-full">
      {/* MODE 1: TABLE VIEW WITH CONTROL HEADER & ACTION BUTTONS */}
      {activeMode === 'table' && (
        <div className="space-y-6">
          {/* Action Control Box (Designed like Range Selector) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/90 border border-indigo-200/80 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" />
                  <span>Bảng Tra Cứu 90 Động Từ Bất Quy Tắc (A ➔ Z)</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Danh sách 90 động từ bất quy tắc cốt lõi được sắp xếp theo bảng chữ cái V1.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-extrabold shrink-0">
                <Sparkles size={14} className="text-indigo-600" />
                <span>Hiển thị: {filteredVerbs.length} / {engIrregularVerbs.length} từ</span>
              </div>
            </div>

            {/* Action Buttons to Launch Flashcard & Test */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tra theo V1, V2, V3 hoặc nghĩa..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-white shadow-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                <button
                  onClick={() => {
                    startTest(10);
                    setActiveMode('test');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-200 transition-all cursor-pointer"
                >
                  <Target size={15} />
                  <span>Làm Test Gõ V2 & V3</span>
                </button>

                <button
                  onClick={() => setActiveMode('flashcard')}
                  className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-sky-200 transition-all cursor-pointer"
                >
                  <Play size={15} fill="currentColor" />
                  <span>Vào Học Flashcard ({engIrregularVerbs.length} từ)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Container - Đồng bộ 100% w-full với bảng SGK Master Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm w-full">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto w-full">
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="sticky top-0 bg-slate-100/90 backdrop-blur-md text-[11px] font-extrabold text-slate-600 uppercase tracking-wider border-b border-slate-200 z-10">
                  <tr>
                    <th className="py-3.5 px-4 text-center w-14">STT</th>
                    <th className="py-3.5 px-4 w-1/6">V1 (Nguyên Mẫu)</th>
                    <th className="py-3.5 px-4 font-mono text-[11px] w-1/6">Phiên Âm</th>
                    <th className="py-3.5 px-4 text-indigo-700 w-1/5">V2 (Quá Khứ Đơn)</th>
                    <th className="py-3.5 px-4 text-teal-700 w-1/5">V3 (Quá Khứ Phân Từ)</th>
                    <th className="py-3.5 px-4 w-1/4">Nghĩa Tiếng Việt</th>
                    <th className="py-3.5 px-4 text-center w-24">Phát Âm</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                  {filteredVerbs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 italic">
                        Không tìm thấy động từ phù hợp với từ khóa "{searchQuery}".
                      </td>
                    </tr>
                  ) : (
                    filteredVerbs.map((verb, idx) => (
                      <tr
                        key={verb.id}
                        className="hover:bg-indigo-50/50 transition-colors group cursor-pointer"
                        onClick={() => speakText(`${verb.v1}, ${verb.v2}, ${verb.v3}`)}
                      >
                        <td className="py-3 px-4 text-center font-bold text-slate-400 text-[11px] group-hover:text-indigo-600">
                          {idx + 1}
                        </td>

                        <td className="py-3 px-4 font-extrabold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
                          {verb.v1}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                          {verb.ipaV1}
                        </td>

                        <td className="py-3 px-4 font-extrabold text-indigo-700 bg-indigo-50/30">
                          {verb.v2}
                        </td>

                        <td className="py-3 px-4 font-extrabold text-teal-700 bg-teal-50/30">
                          {verb.v3}
                        </td>

                        <td className="py-3 px-4 font-bold text-slate-800">
                          {verb.meaning}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(`${verb.v1}, ${verb.v2}, ${verb.v3}`);
                            }}
                            title="Nghe phát âm V1, V2, V3"
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer inline-flex items-center justify-center shadow-sm"
                          >
                            <Volume2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FLASHCARD VIEW - Khung chiều ngang 100% w-full */}
      {activeMode === 'flashcard' && (
        <div className="w-full space-y-6">
          {/* Back to Table Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveMode('table')}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft size={16} />
              <span>Quay lại Bảng Tra Cứu</span>
            </button>

            <span className="text-xs font-bold text-slate-600">
              Thẻ học: <strong className="text-sky-600 font-black text-sm">{cardIndex + 1}</strong> / {flashcardDeck.length}
            </span>

            <button
              onClick={handleShuffleDeck}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            >
              <Shuffle size={14} className="text-sky-600" />
              <span>Trộn thẻ</span>
            </button>
          </div>

          {/* Flashcard Box - Mở rộng 100% chiều ngang (w-full), chữ vừa vặn chuẩn */}
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              speakText(`${currentFlashcard.v1}, ${currentFlashcard.v2}, ${currentFlashcard.v3}`);
            }}
            className="w-full min-h-[300px] p-8 sm:p-10 rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/30 to-indigo-50/30 shadow-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:border-sky-400 hover:shadow-2xl relative select-none group"
          >
            <div className="absolute top-4 right-4 p-2 rounded-xl bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1">
              <RotateCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Chạm để lật</span>
            </div>

            {!isFlipped ? (
              /* FRONT OF CARD: V1 + IPA + Meaning */
              <div className="space-y-3 animate-fadeIn w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider">
                  V1 (Nguyên Mẫu)
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {currentFlashcard.v1}
                </h2>
                <p className="text-sm font-bold text-slate-400 font-mono">{currentFlashcard.ipaV1}</p>
                <div className="text-base sm:text-lg font-extrabold text-sky-900 pt-3 border-t border-sky-200/60 w-full">
                  {currentFlashcard.meaning}
                </div>
              </div>
            ) : (
              /* BACK OF CARD: V2 & V3 */
              <div className="space-y-5 animate-fadeIn w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
                  Kết Quả Biến Đổi V2 ➔ V3
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-1">
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1 text-center w-full">
                    <span className="text-[11px] font-black text-indigo-500 uppercase">V2 (Quá khứ đơn)</span>
                    <div className="text-xl sm:text-2xl font-black text-indigo-900">{currentFlashcard.v2}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-1 text-center w-full">
                    <span className="text-[11px] font-black text-teal-500 uppercase">V3 (Quá khứ phân từ)</span>
                    <div className="text-xl sm:text-2xl font-black text-teal-900">{currentFlashcard.v3}</div>
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-700 bg-white/80 py-2 px-4 rounded-xl border border-slate-200 inline-block shadow-sm">
                  {currentFlashcard.v1} ➔ {currentFlashcard.v2} ➔ {currentFlashcard.v3}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="flex-1 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              <ChevronLeft size={18} />
              <span>Thẻ trước</span>
            </button>

            <button
              onClick={() => speakText(`${currentFlashcard.v1}, ${currentFlashcard.v2}, ${currentFlashcard.v3}`)}
              className="p-3 rounded-2xl bg-sky-600 text-white hover:bg-sky-700 transition-all cursor-pointer shadow-md shadow-sky-200"
              title="Phát âm tiếng Anh"
            >
              <Volume2 size={20} />
            </button>

            <button
              onClick={handleNextCard}
              className="flex-1 py-3 rounded-2xl bg-sky-600 text-white text-xs font-extrabold hover:bg-sky-700 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-sky-200"
            >
              <span>Thẻ sau</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: TEST MODE (GÕ V2 & V3) */}
      {activeMode === 'test' && (
        <div className="space-y-6">
          {/* Back to Table & Setup Header */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/90 border border-amber-200/80 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveMode('table')}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <ArrowLeft size={16} />
                  <span>Bảng Tra Cứu</span>
                </button>

                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <Target size={20} className="text-amber-600" />
                    <span>Bài Kiểm Tra Động Từ Bất Quy Tắc (Gõ V2 & V3)</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Hệ thống cho động từ dạng V1 ➔ Học sinh gõ chính xác 2 ô dạng **V2 (Quá khứ)** và **V3 (Phân từ)**.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-slate-600">Số câu test:</span>
                {[10, 20, 50, engIrregularVerbs.length].map((count) => (
                  <button
                    key={count}
                    onClick={() => startTest(count)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${testCount === count
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    {count === engIrregularVerbs.length ? `Tất cả (${count})` : `${count} câu`}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Tracker Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-500" />
                <span>
                  Đã làm: <strong className="text-amber-700 font-extrabold">{scoreStats.totalChecked}</strong> / {scoreStats.totalQuestions} câu
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">
                  Đúng: {scoreStats.correctCount} câu
                </span>

                <button
                  onClick={() => startTest(testCount)}
                  className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>Đổi đề mới</span>
                </button>
              </div>
            </div>
          </div>

          {/* List of Test Question Cards */}
          <div className="space-y-4">
            {testQuestions.map((q, idx) => {
              const isChecked = !!checkedQuestions[q.id];
              const valV2 = userAnswersV2[q.id] || '';
              const valV3 = userAnswersV3[q.id] || '';

              const isV2Ok = isAnswerCorrect(valV2, q.v2);
              const isV3Ok = isAnswerCorrect(valV3, q.v3);
              const isBothOk = isV2Ok && isV3Ok;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border transition-all space-y-4 bg-white shadow-sm hover:shadow-md ${isChecked
                      ? isBothOk
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200 hover:border-amber-300'
                    }`}
                >
                  {/* Question Prompt Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-2xl bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {idx + 1}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-400">V1 (Nguyên mẫu):</span>
                          <span className="text-lg font-black text-slate-900">{q.v1}</span>
                          <span className="text-xs font-semibold text-slate-400">{q.ipaV1}</span>
                          <button
                            onClick={() => speakText(q.v1)}
                            className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
                          >
                            <Volume2 size={15} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-600 font-bold">Nghĩa: {q.meaning}</p>
                      </div>
                    </div>

                    {isChecked && (
                      <div className="shrink-0">
                        {isBothOk ? (
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center gap-1">
                            <CheckCircle2 size={15} /> Đúng tuyệt đối
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black flex items-center gap-1">
                            <XCircle size={15} /> Chưa đúng
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2 Input Boxes for V2 and V3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* V2 Input Box */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>1. Dạng V2 (Quá khứ đơn):</span>
                        {isChecked && (
                          <span className={isV2Ok ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>
                            {isV2Ok ? '✓ Đúng' : `✗ Đáp án: ${q.v2}`}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        disabled={isChecked}
                        value={valV2}
                        onChange={(e) =>
                          setUserAnswersV2((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isChecked) handleCheckQuestion(q.id);
                        }}
                        placeholder="Gõ dạng V2..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-extrabold transition-all outline-none ${isChecked
                            ? isV2Ok
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                              : 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                            : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900'
                          }`}
                      />
                    </div>

                    {/* V3 Input Box */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span>2. Dạng V3 (Quá khứ phân từ):</span>
                        {isChecked && (
                          <span className={isV3Ok ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>
                            {isV3Ok ? '✓ Đúng' : `✗ Đáp án: ${q.v3}`}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        disabled={isChecked}
                        value={valV3}
                        onChange={(e) =>
                          setUserAnswersV3((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isChecked) handleCheckQuestion(q.id);
                        }}
                        placeholder="Gõ dạng V3..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs font-extrabold transition-all outline-none ${isChecked
                            ? isV3Ok
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                              : 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                            : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Action Buttons & Feedback */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    {!isChecked ? (
                      <button
                        onClick={() => handleCheckQuestion(q.id)}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-md shadow-amber-200 transition-all cursor-pointer"
                      >
                        Kiểm tra câu này
                      </button>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-extrabold text-slate-700">
                          Bộ 3 dạng chuẩn: <strong className="text-indigo-700">{q.v1} ➔ {q.v2} ➔ {q.v3}</strong>
                        </span>

                        <button
                          onClick={() => handleRetryQuestion(q.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          Làm lại câu này
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
