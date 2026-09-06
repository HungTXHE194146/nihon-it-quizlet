import React, { useState } from 'react';
import type { Lesson } from '../data/lessons';
import {
  tryN3GrammarPoints,
  tryN3Chapter1Story,
  type GrammarPoint,
} from '../data/tryN3Data';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileText,
  HelpCircle,
  Play,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Compass,
  Check
} from 'lucide-react';

interface TryN3SelectorProps {
  lessons: Lesson[];
  onStartBySections: (sectionIds: string[]) => void;
  onBackToHome: () => void;
}

export const TryN3Selector: React.FC<TryN3SelectorProps> = ({
  lessons,
  onStartBySections,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'story' | 'handbook'>('chapters');
  const [selectedGrammarModal, setSelectedGrammarModal] = useState<GrammarPoint | null>(null);
  const [expandedGrammarId, setExpandedGrammarId] = useState<string | null>('try-n3-c1-g1');
  const [showVietnameseTranslation, setShowVietnameseTranslation] = useState(true);

  const chapter1Lesson = lessons.find((l) => l.id === 1) || lessons[0];
  const flashcardSection = chapter1Lesson.sections.find((s) => s.type === 'vocabulary');
  const exerciseSection = chapter1Lesson.sections.find((s) => s.id === 'try-n3-c1-exercises');
  const checkSection = chapter1Lesson.sections.find((s) => s.id === 'try-n3-c1-check');

  const handleStartFlashcard = () => {
    if (flashcardSection) {
      onStartBySections([flashcardSection.id]);
    }
  };

  const handleStartExercises = () => {
    if (exerciseSection) {
      onStartBySections([exerciseSection.id]);
    }
  };

  const handleStartCheck = () => {
    if (checkSection) {
      onStartBySections([checkSection.id]);
    }
  };

  const handleStartAll = () => {
    onStartBySections(chapter1Lesson.sections.map((s) => s.id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-white border border-slate-200/80 transition-all font-semibold text-sm shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Về trang chủ</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-600 animate-pulse" />
            Giáo trình TRY! N3 (文法)
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-950 text-white p-6 md:p-8 shadow-xl border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <BookOpen size={14} />
            <span>TRY! 日本語能力試験 N3 文法から伸ばす日本語</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Ngữ Pháp N3 - Chuẩn Giáo Trình TRY! N3
          </h1>

          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Học ngữ pháp trong ngữ cảnh thực tế theo từng chủ đề bài đọc sinh động. Nắm vững cấu trúc, ý nghĩa, câu ví dụ thực tế và luyện bài tập trắc nghiệm củng cố ngay sau bài học.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/15 px-3 py-1.5 rounded-xl backdrop-blur-sm font-medium flex items-center gap-1.5">
              <Check size={14} className="text-emerald-300" />
              Chương 1: Lần đầu leo núi Phú Sĩ (1)
            </span>
            <span className="bg-emerald-500/25 text-emerald-200 border border-emerald-300/30 px-3 py-1.5 rounded-xl backdrop-blur-sm font-medium flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-300" />
              Hoàn thiện trọn vẹn 100% Chương 1 (Trang 16 - 21)
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'chapters'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
          }`}
        >
          <Layers size={16} />
          <span>Lộ trình & Bài học</span>
        </button>

        <button
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'story'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
          }`}
        >
          <FileText size={16} />
          <span>Bài đọc ngữ cảnh (富士登山)</span>
        </button>

        <button
          onClick={() => setActiveTab('handbook')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'handbook'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen size={16} />
          <span>Sổ tay Ngữ pháp (5 Mẫu & Plus)</span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS & STUDY ACTIONS */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          {/* Chapter 1 Card */}
          <div className="bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-sm hover:border-indigo-300 transition-all space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase">
                    Bài 1
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    5 mẫu chính + 2 mở rộng
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">
                  Chương 1: 初めての富士登山 (1)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Chủ đề: Lần đầu leo núi Phú Sĩ (1) - Kinh nghiệm & cảm nghĩ lần đầu làm một việc gì đó.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleStartAll}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Play size={14} className="fill-white" />
                  <span>Học Tất Cả (36 Thẻ & Câu)</span>
                </button>
              </div>
            </div>

            {/* Quick overview of Grammar items */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Các mẫu ngữ pháp trong bài
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tryN3GrammarPoints.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      setExpandedGrammarId(g.id);
                      setActiveTab('handbook');
                    }}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-200 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-indigo-700 group-hover:text-indigo-800">
                        {g.number}. {g.pattern}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: g.stars }).map((_, i) => (
                          <Star key={i} size={10} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-700 line-clamp-1">
                      {g.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {g.meaningVi}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-modes selection (Flashcard vs Exercise vs Check Test) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
              <div
                onClick={handleStartFlashcard}
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 uppercase">
                      <Sparkles size={12} />
                      Flashcard
                    </span>
                    <span className="p-1.5 rounded-lg bg-emerald-600 text-white group-hover:scale-105 transition-transform shadow-sm">
                      <Play size={12} className="fill-white" />
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                    Thuộc mẫu câu & Ví dụ
                  </h4>
                  <p className="text-xs text-slate-500">
                    7 thẻ học: 5 mẫu chính + 2 mở rộng (〜終わる, 〜そうもない).
                  </p>
                </div>
              </div>

              <div
                onClick={handleStartExercises}
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 uppercase">
                      <HelpCircle size={12} />
                      Trắc nghiệm やっみよう!
                    </span>
                    <span className="p-1.5 rounded-lg bg-purple-600 text-white group-hover:scale-105 transition-transform shadow-sm">
                      <Play size={12} className="fill-white" />
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-purple-700 transition-colors">
                    23 Câu luyện tập củng cố
                  </h4>
                  <p className="text-xs text-slate-500">
                    Toàn bộ bài tập やっみよう! (trang 17-21) chuẩn sách TRY! N3.
                  </p>
                </div>
              </div>

              <div
                onClick={handleStartCheck}
                className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 uppercase">
                      <BookOpen size={12} />
                      Check 📖 Tổng kết
                    </span>
                    <span className="p-1.5 rounded-lg bg-blue-600 text-white group-hover:scale-105 transition-transform shadow-sm">
                      <Play size={12} className="fill-white" />
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">
                    Kiểm tra Check (6 câu)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Bài test tổng hợp chốt kiến thức cuối Chương 1 (trang 21).
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Note */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                <span>
                  Trọn vẹn Chương 1 (Trang 16, 17, 18, 19, 20, 21) đã được số hóa hoàn tất 100%!
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-bold text-[10px]">
                36 Thẻ & Câu hỏi
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STORY & CONTEXT READING */}
      {activeTab === 'story' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md uppercase">
                Bài đọc ngữ cảnh
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mt-1">
                {tryN3Chapter1Story.titleJa}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {tryN3Chapter1Story.titleVi}
              </p>
            </div>

            <button
              onClick={() => setShowVietnameseTranslation(!showVietnameseTranslation)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              <span>{showVietnameseTranslation ? 'Ẩn bản dịch tiếng Việt' : 'Hiện bản dịch tiếng Việt'}</span>
            </button>
          </div>

          {/* できること Goal */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 space-y-1">
            <span className="text-xs font-black text-blue-700 flex items-center gap-1 uppercase tracking-wide">
              <Compass size={14} />
              Mục tiêu bài học (できること):
            </span>
            <p className="text-sm font-semibold text-blue-950">
              {tryN3Chapter1Story.canDoJa}
            </p>
            {showVietnameseTranslation && (
              <p className="text-xs text-blue-800 font-medium pt-0.5">
                {tryN3Chapter1Story.canDoVi}
              </p>
            )}
          </div>

          {/* Reading Passage */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wide">
                <span>Văn bản tiếng Nhật (Bấm vào mẫu ngữ pháp tô màu để xem giải thích)</span>
              </div>
              <p className="text-base md:text-lg leading-loose text-slate-800 font-medium select-text">
                先週の日曜日、リンさんと富士山に登った。途中までバスで行って、そこから
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find(item => item.pattern === '〜始める');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-amber-200 text-amber-950 font-bold px-1.5 py-0.5 rounded mx-1 cursor-pointer hover:bg-amber-300 transition-colors underline decoration-amber-500"
                  title="Bấm để xem ngữ pháp 〜始める"
                >
                  登り始めた
                </span>
                。登る前に水を買った店で、酸素缶も
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find(item => item.pattern === '〜ように言う');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-emerald-200 text-emerald-950 font-bold px-1.5 py-0.5 rounded mx-1 cursor-pointer hover:bg-emerald-300 transition-colors underline decoration-emerald-500"
                  title="Bấm để xem ngữ pháp 〜ように言う"
                >
                  持っていくように言われた
                </span>
                。山の上は空気が少ないから、必要になるかもしれないそうだ。空気が薄いと
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find(item => item.pattern === '〜ということ');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-blue-200 text-blue-950 font-bold px-1.5 py-0.5 rounded mx-1 cursor-pointer hover:bg-blue-300 transition-colors underline decoration-blue-500"
                  title="Bấm để xem ngữ pháp 〜ということ"
                >
                  病気になる人もいるということ
                </span>
                を思い出したが見富士山は小学生でも登れると聞いたので、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find(item => item.pattern === '〜だろうと思う');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-purple-200 text-purple-950 font-bold px-1.5 py-0.5 rounded mx-1 cursor-pointer hover:bg-purple-300 transition-colors underline decoration-purple-500"
                  title="Bấm để xem ngữ pháp 〜だろうと思う"
                >
                  大丈夫だろうと思った
                </span>
                。だから買わなかった。
                <br className="my-2" />
                私は登山をしたことはないが、富士山はけわしい山じゃないし、それほど
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find(item => item.pattern === '〜なさそうだ');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-rose-200 text-rose-950 font-bold px-1.5 py-0.5 rounded mx-1 cursor-pointer hover:bg-rose-300 transition-colors underline decoration-rose-500"
                  title="Bấm để xem ngữ pháp 〜なさそうだ"
                >
                  大変じゃなさそうだった
                </span>
                。
              </p>
            </div>

            {/* Vietnamese Translation */}
            {showVietnameseTranslation && (
              <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2 select-text">
                <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wide block">
                  Bản dịch tham khảo (Tiếng Việt):
                </span>
                <p className="text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-line font-medium">
                  {tryN3Chapter1Story.textVi}
                </p>
              </div>
            )}
          </div>

          {/* Highlighted Grammar Breakdown in Story */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Phân tích 5 cấu trúc ngữ pháp có trong bài đọc
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tryN3Chapter1Story.grammarHighlights.map((gh, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-600">
                      {gh.grammarName}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      「{gh.text}」
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {gh.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GRAMMAR HANDBOOK & DETAILS */}
      {activeTab === 'handbook' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Sổ tay Ngữ pháp Chương 1
              </h2>
              <p className="text-xs text-slate-500">
                Chi tiết cấu trúc, ý nghĩa và câu ví dụ của từng mẫu câu
              </p>
            </div>
            <button
              onClick={handleStartFlashcard}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
              <Play size={14} className="fill-white" />
              <span>Học Flashcard</span>
            </button>
          </div>

          {tryN3GrammarPoints.map((g) => {
            const isExpanded = expandedGrammarId === g.id;

            return (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
              >
                {/* Header / Click to toggle */}
                <div
                  onClick={() => setExpandedGrammarId(isExpanded ? null : g.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-sm flex items-center justify-center border border-indigo-100">
                      {g.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-800 text-base">
                          {g.pattern}
                        </h3>
                        <span className="text-xs font-medium text-slate-400">
                          ({g.title})
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium line-clamp-1">
                        {g.meaningVi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: g.stars }).map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400" />
                      ))}
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/50">
                    {/* Formation (接続) */}
                    <div className="p-4 rounded-xl bg-white border border-indigo-100 space-y-1.5 shadow-sm">
                      <span className="text-[11px] font-black text-indigo-700 uppercase tracking-wide">
                        Cấu trúc kết hợp (接続):
                      </span>
                      <div className="font-mono text-sm md:text-base font-bold text-slate-800 whitespace-pre-line bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100">
                        {g.formation}
                      </div>
                    </div>

                    {/* Meaning (意味・使い方) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2 shadow-sm">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wide">
                        Ý nghĩa & Cách dùng (どう使う？):
                      </span>
                      <p className="text-sm font-semibold text-slate-800">
                        {g.meaningJa}
                      </p>
                      <p className="text-xs md:text-sm text-slate-600 font-medium">
                        👉 {g.meaningVi}
                      </p>
                      {g.usageNote && (
                        <div className="text-xs text-indigo-800 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 font-medium">
                          💡 <strong>Lưu ý:</strong> {g.usageNote}
                        </div>
                      )}
                    </div>

                    {/* Example Sentences (例文) */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-3 shadow-sm">
                      <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        Câu ví dụ thực tế (例文):
                      </span>
                      <div className="space-y-2.5">
                        {g.examples.map((ex, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs md:text-sm space-y-1"
                          >
                            <div className="font-bold text-slate-800 select-text">
                              {ex.ja}
                            </div>
                            <div className="text-slate-500 font-medium select-text">
                              {ex.vi}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plus Note if any */}
                    {g.plusNote && (
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                        <span className="text-[11px] font-black text-amber-800 uppercase tracking-wide flex items-center gap-1">
                          <Sparkles size={12} />
                          {g.plusNote.title}
                        </span>
                        {g.plusNote.formation && (
                          <div className="font-mono text-xs font-bold text-amber-950 bg-amber-100/70 p-2 rounded border border-amber-200">
                            {g.plusNote.formation}
                          </div>
                        )}
                        <p className="text-xs text-amber-900 font-medium">
                          👉 {g.plusNote.meaningVi}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {g.plusNote.examples.map((ex, i) => (
                            <div key={i} className="text-xs bg-white/80 p-2 rounded border border-amber-200/70 space-y-0.5">
                              <div className="font-bold text-slate-800">{ex.ja}</div>
                              <div className="text-slate-600">{ex.vi}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Grammar Point Quick Modal */}
      {selectedGrammarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs">
                  Mẫu {selectedGrammarModal.number}
                </span>
                <h3 className="font-black text-lg text-slate-800">
                  {selectedGrammarModal.pattern}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGrammarModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <span className="font-extrabold text-slate-400 block uppercase text-[10px]">Cấu trúc:</span>
                <span className="font-mono font-bold text-indigo-700">{selectedGrammarModal.formation}</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-400 block uppercase text-[10px]">Ý nghĩa:</span>
                <span className="font-bold text-slate-800">{selectedGrammarModal.meaningVi}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-extrabold text-slate-500 block text-[11px]">Ví dụ:</span>
                {selectedGrammarModal.examples.map((ex, i) => (
                  <div key={i} className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-800">{ex.ja}</p>
                    <p className="text-slate-500">{ex.vi}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedGrammarModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer transition-all"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
