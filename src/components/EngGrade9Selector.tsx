import React, { useState, useMemo, useEffect } from 'react';
import type { Lesson } from '../data/lessons';
import { engTopicLessons, engGrade9Words, TOPICS, type EngWordItem } from '../data/engGrade9Data';
import { EngGrade9TestRunner, type TestMode } from './EngGrade9TestRunner';
import { EngGrade9GrammarDetailViewer } from './EngGrade9GrammarDetailViewer';
import { EngTenseExercisesRunner } from './EngTenseExercisesRunner';
import { EngIrregularVerbsViewer } from './EngIrregularVerbsViewer';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Square,
  Play,
  ArrowLeft,
  Volume2,
  GraduationCap,
  PenTool,
  BrainCircuit,
  Sparkles,
  X,
  Target,
  BookMarked,
  Clock,
  Zap,
  Sliders,
  ListOrdered
} from 'lucide-react';

interface EngGrade9SelectorProps {
  onStartBySections: (sectionIds: string[]) => void;
  onBackToHome: () => void;
}

export type GrammarDetailType = 'tenses' | 'modal-verbs' | 'nouns' | 'verbs' | 'adjectives' | 'connectors';

export const EngGrade9Selector: React.FC<EngGrade9SelectorProps> = ({
  onStartBySections,
  onBackToHome
}) => {
  // Main Tab State: 'vocab' | 'grammar' | 'homework'
  const [mainTab, setMainTab] = useState<'vocab' | 'grammar' | 'homework'>(() => {
    try {
      const saved = localStorage.getItem('eng_grade9_active_maintab');
      if (saved && ['vocab', 'grammar', 'homework'].includes(saved)) {
        return saved as 'vocab' | 'grammar' | 'homework';
      }
    } catch { }
    return 'vocab';
  });

  // Vocab Sub Tab State: 'master' (SGK 182 từ) | 'irregular' (Bảng Động Từ Bất Quy Tắc)
  const [vocabSubTab, setVocabSubTab] = useState<'master' | 'irregular'>(() => {
    try {
      const saved = localStorage.getItem('eng_grade9_vocab_subtab');
      if (saved && ['master', 'irregular'].includes(saved)) {
        return saved as 'master' | 'irregular';
      }
    } catch { }
    return 'master';
  });

  // Tự động lưu vocabSubTab vào localStorage khi chuyển tab nhỏ từ vựng
  useEffect(() => {
    try {
      localStorage.setItem('eng_grade9_vocab_subtab', vocabSubTab);
    } catch { }
  }, [vocabSubTab]);

  const totalWordsCount = engGrade9Words.length;

  // TAB 1: RANGE SELECTOR STATE (1 List master + Range Selector)
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(totalWordsCount);

  // Inner Detail View for Grammar Lessons (Opens when clicking into a lesson card)
  const [activeGrammarDetail, setActiveGrammarDetail] = useState<GrammarDetailType | null>(() => {
    try {
      const saved = localStorage.getItem('eng_grade9_active_grammardetail');
      if (saved) return saved as GrammarDetailType;
    } catch { }
    return null;
  });

  // Tự động lưu mainTab vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eng_grade9_active_maintab', mainTab);
    } catch (e) { }
  }, [mainTab]);

  // Tự động lưu activeGrammarDetail vào localStorage
  useEffect(() => {
    try {
      if (activeGrammarDetail) {
        localStorage.setItem('eng_grade9_active_grammardetail', activeGrammarDetail);
      } else {
        localStorage.removeItem('eng_grade9_active_grammardetail');
      }
    } catch (e) { }
  }, [activeGrammarDetail]);

  // Modal State for Custom Test Setup
  const [showTestModal, setShowTestModal] = useState(false);
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(10);
  const [customTestMode, setCustomTestMode] = useState<TestMode>('mcq-en-vi');

  // Active Runner State (When custom test is active)
  const [activeTestConfig, setActiveTestConfig] = useState<{
    wordsPool: EngWordItem[];
    questionCount: number;
    testMode: TestMode;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('eng_grade9_active_test_config_v1');
      return saved ? JSON.parse(saved) : null;
    } catch { }
    return null;
  });

  // Tự động lưu activeTestConfig vào localStorage
  useEffect(() => {
    try {
      if (activeTestConfig) {
        localStorage.setItem('eng_grade9_active_test_config_v1', JSON.stringify(activeTestConfig));
      } else {
        localStorage.removeItem('eng_grade9_active_test_config_v1');
      }
    } catch (e) { }
  }, [activeTestConfig]);

  // State to launch Tense Exercises Runner (Điền từ, MCQ, Điền đoạn văn)
  const [showTenseExercisesRunner, setShowTenseExercisesRunner] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('eng_grade9_show_tense_runner_v1');
      return saved === 'true';
    } catch { }
    return false;
  });

  // Tự động lưu showTenseExercisesRunner vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eng_grade9_show_tense_runner_v1', showTenseExercisesRunner ? 'true' : 'false');
    } catch (e) { }
  }, [showTenseExercisesRunner]);

  // Speech Synthesis for English Pronunciation
  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered words for search in master list
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([]);

  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return engGrade9Words;
    return engGrade9Words.filter(
      (w) =>
        w.term.toLowerCase().includes(q) ||
        w.answer.toLowerCase().includes(q) ||
        w.ipa.toLowerCase().includes(q) ||
        w.topic.toLowerCase().includes(q) ||
        w.partOfSpeech.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Selected words within [rangeStart .. rangeEnd] (1-indexed)
  const selectedRangeWords = useMemo(() => {
    const start = Math.max(1, Math.min(rangeStart, totalWordsCount));
    const end = Math.max(start, Math.min(rangeEnd, totalWordsCount));
    return engGrade9Words.slice(start - 1, end);
  }, [rangeStart, rangeEnd, totalWordsCount]);

  // Active Lessons for Homework Tab
  const currentLessons: Lesson[] = useMemo(() => engTopicLessons, []);

  // Toggle selection for topic
  const toggleSection = (id: string) => {
    setSelectedSectionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Launch Flashcard Study for Range (Động theo các từ được chọn)
  const handleStartRangeFlashcard = () => {
    const topicIndices = new Set<number>();
    selectedRangeWords.forEach((w) => {
      const idx = TOPICS.indexOf(w.topic as any);
      if (idx !== -1) {
        topicIndices.add(idx + 1);
      }
    });

    const matchedSectionIds = Array.from(topicIndices).map((idx) => `eng-topic-${idx}-vocab`);
    onStartBySections(matchedSectionIds.length > 0 ? matchedSectionIds : ['eng-topic-1-vocab']);
  };

  // Active pool of words for test
  const activeTestPool = useMemo(() => {
    return selectedRangeWords.length > 0 ? selectedRangeWords : engGrade9Words;
  }, [selectedRangeWords]);

  // Open Custom Test Modal
  const handleOpenTestModal = () => {
    if (customQuestionCount > activeTestPool.length) {
      setCustomQuestionCount(activeTestPool.length);
    }
    setShowTestModal(true);
  };

  const handleLaunchCustomTest = () => {
    const finalCount = customQuestionCount > activeTestPool.length ? activeTestPool.length : customQuestionCount;
    setActiveTestConfig({
      wordsPool: activeTestPool,
      questionCount: Math.max(1, finalCount),
      testMode: customTestMode
    });
    setShowTestModal(false);
  };

  // Dynamic Preset Ranges for 30-word blocks + All
  const presetRanges = useMemo(() => {
    const list: { start: number; end: number; label: string }[] = [];
    let curr = 1;
    while (curr <= totalWordsCount) {
      const end = Math.min(curr + 29, totalWordsCount);
      const count = end - curr + 1;
      list.push({ start: curr, end, label: `${curr} - ${end} (${count} từ)` });
      curr += 30;
    }
    list.push({ start: 1, end: totalWordsCount, label: `Tất cả (1 - ${totalWordsCount})` });
    return list;
  }, [totalWordsCount]);

  // If Tense Exercises Runner is active, render exercises view!
  if (showTenseExercisesRunner) {
    return <EngTenseExercisesRunner onClose={() => setShowTenseExercisesRunner(false)} />;
  }

  // If Custom Test Runner is active, render runner view!
  if (activeTestConfig) {
    return (
      <EngGrade9TestRunner
        wordsPool={activeTestConfig.wordsPool}
        questionCount={activeTestConfig.questionCount}
        testMode={activeTestConfig.testMode}
        onClose={() => setActiveTestConfig(null)}
      />
    );
  }

  // If Grammar Detail Viewer is active, render detailed theory view!
  if (activeGrammarDetail) {
    return (
      <EngGrade9GrammarDetailViewer
        lessonType={activeGrammarDetail}
        onClose={() => setActiveGrammarDetail(null)}
        onStartQuiz={() => setShowTenseExercisesRunner(true)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Header Panel */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-100 text-xs font-bold transition-all border border-white/15 backdrop-blur-md cursor-pointer mb-2"
          >
            <ArrowLeft size={14} />
            <span>Trang chủ</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold tracking-wide backdrop-blur-md flex items-center gap-1.5">
              <GraduationCap size={14} className="text-sky-300" />
              TIẾNG ANH LỚP 9
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-medium">
              {totalWordsCount} Từ vựng SGK
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-indigo-200 bg-clip-text text-transparent">
            Hệ Thống Từ Vựng & Bài Tập Tiếng Anh 9
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
            Chọn mục **1. Từ Vựng** (1 Danh sách {totalWordsCount} từ + Chọn dải số ôn tập), **2. Ngữ Pháp** hoặc **3. Bài Tập Về Nhà**.
          </p>

          {/* Quick Info Badges */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            <div className="bg-white/5 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
              <BookOpen size={15} className="text-sky-400" />
              <span>1 Master List {totalWordsCount} Từ vựng</span>
            </div>
            <div className="bg-white/5 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
              <BookMarked size={15} className="text-teal-400" />
              <span>8 Thì & Động từ khuyết thiếu</span>
            </div>
            <div className="bg-white/5 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/10 flex items-center gap-2">
              <PenTool size={15} className="text-indigo-400" />
              <span>Bài tập về nhà & Test ngẫu nhiên</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3 Separate Tabs: 1. Từ Vựng | 2. Ngữ Pháp | 3. Bài Tập Về Nhà */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60 w-full">
          {/* TAB 1: TỪ VỰNG */}
          <button
            onClick={() => setMainTab('vocab')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mainTab === 'vocab'
                ? 'bg-white text-sky-700 shadow-md border border-sky-100 ring-2 ring-sky-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen size={18} className={mainTab === 'vocab' ? 'text-sky-600' : 'text-slate-400'} />
            <span>1. Từ Vựng</span>
          </button>

          {/* TAB 2: NGỮ PHÁP */}
          <button
            onClick={() => setMainTab('grammar')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mainTab === 'grammar'
                ? 'bg-white text-teal-700 shadow-md border border-teal-100 ring-2 ring-teal-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <BookMarked size={18} className={mainTab === 'grammar' ? 'text-teal-600' : 'text-slate-400'} />
            <span>2. Ngữ Pháp</span>
          </button>

          {/* TAB 3: BÀI TẬP VỀ NHÀ */}
          <button
            onClick={() => setMainTab('homework')}
            className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mainTab === 'homework'
                ? 'bg-white text-indigo-700 shadow-md border border-indigo-100 ring-2 ring-indigo-500/10'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
            }`}
          >
            <PenTool size={18} className={mainTab === 'homework' ? 'text-indigo-600' : 'text-slate-400'} />
            <span>3. Bài Tập Về Nhà</span>
          </button>
        </div>

        {/* TAB 1 CONTENT: 1 MASTER LIST + RANGE SELECTOR + BẢNG ĐỘNG TỪ BẤT QUY TẮC */}
        {mainTab === 'vocab' && (
          <div className="space-y-6">
            {/* Sub-Tab Navigation inside Tab 1 - Độ rộng đồng đều 100% */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70 w-full">
              <button
                onClick={() => setVocabSubTab('master')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${vocabSubTab === 'master'
                    ? 'bg-white text-sky-700 shadow-md border border-sky-100 ring-2 ring-sky-500/10'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }`}
              >
                <BookOpen size={18} className={vocabSubTab === 'master' ? 'text-sky-600' : 'text-slate-400'} />
                <span>📚 Từ Vựng SGK Lớp 9 ({totalWordsCount} từ)</span>
              </button>

              <button
                onClick={() => setVocabSubTab('irregular')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${vocabSubTab === 'irregular'
                    ? 'bg-white text-indigo-700 shadow-md border border-indigo-100 ring-2 ring-indigo-500/10'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }`}
              >
                <Zap size={18} className={vocabSubTab === 'irregular' ? 'text-amber-500 fill-amber-500' : 'text-slate-400'} />
                <span>⚡ Bảng Động Từ Bất Quy Tắc (90 từ)</span>
              </button>
            </div>

            {vocabSubTab === 'irregular' ? (
              <EngIrregularVerbsViewer />
            ) : (
              <>
                {/* RANGE SELECTOR CONTROL BOX */}
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/80 border border-sky-200/80 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                    <div className="space-y-0.5">
                      <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                        <Sliders size={18} className="text-sky-600" />
                        <span>Chọn Dải Số Từ Vựng Để Ôn Tập (Range Selector)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Chọn nhanh các dải 30 từ hoặc nhập tùy chỉnh vị trí từ 1 đến {totalWordsCount}.
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-extrabold shrink-0">
                      <Sparkles size={13} className="text-sky-600" />
                      <span>Đã chọn: Từ câu {rangeStart} ➔ {rangeEnd} ({selectedRangeWords.length} từ)</span>
                    </div>
                  </div>

                  {/* Preset Range Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">Dải số nhanh:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                      {presetRanges.map((preset, idx) => {
                        const isActive = rangeStart === preset.start && rangeEnd === preset.end;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setRangeStart(preset.start);
                              setRangeEnd(preset.end);
                            }}
                            className={`py-2.5 px-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border text-center ${isActive
                                ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200 ring-2 ring-sky-500/20 scale-[1.02]'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-100/60'
                              }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Range Inputs & Action Buttons */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-200/80">
                    {/* Inputs */}
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700 w-full md:w-auto">
                      <span>Tùy chỉnh: Từ câu</span>
                      <input
                        type="number"
                        min={1}
                        max={totalWordsCount}
                        value={rangeStart}
                        onChange={(e) => setRangeStart(Math.max(1, Math.min(totalWordsCount, Number(e.target.value) || 1)))}
                        className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 text-center font-extrabold text-sky-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                      <span>đến câu</span>
                      <input
                        type="number"
                        min={1}
                        max={totalWordsCount}
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(Math.max(1, Math.min(totalWordsCount, Number(e.target.value) || totalWordsCount)))}
                        className="w-16 px-2.5 py-1.5 rounded-xl border border-slate-300 text-center font-extrabold text-sky-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>

                    {/* Launch Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                      <button
                        onClick={handleOpenTestModal}
                        className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-200 transition-all cursor-pointer"
                      >
                        <Target size={15} />
                        <span>Làm Test ({selectedRangeWords.length} từ này)</span>
                      </button>

                      <button
                        onClick={handleStartRangeFlashcard}
                        className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-sky-200 transition-all cursor-pointer"
                      >
                        <Play size={15} fill="currentColor" />
                        <span>Vào Học Flashcard ({selectedRangeWords.length} từ)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Bar for List */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ListOrdered size={18} className="text-sky-600" />
                    <span>Bảng Danh Sách {totalWordsCount} Từ Vựng SGK Lớp 9</span>
                  </h3>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tra từ trong danh sách..."
                      className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 bg-slate-50/50"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* MASTER 1 CONTINUOUS LIST TABLE */}
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-slate-100/90 backdrop-blur-md text-[11px] font-extrabold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-3.5 px-4 text-center w-14">STT</th>
                          <th className="py-3.5 px-4">Từ Tiếng Anh</th>
                          <th className="py-3.5 px-4">Phiên Âm</th>
                          <th className="py-3.5 px-4">Nghĩa Tiếng Việt</th>
                          <th className="py-3.5 px-4 hidden md:table-cell">Chủ Đề</th>
                          <th className="py-3.5 px-4 hidden lg:table-cell">Ví Dụ Minh Họa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                        {filteredWords.map((word, index) => {
                          const stt = index + 1;
                          const isInRange = stt >= rangeStart && stt <= rangeEnd;

                          return (
                            <tr
                              key={word.id}
                              className={`transition-colors ${isInRange
                                  ? 'bg-sky-50/50 hover:bg-sky-100/60 font-semibold'
                                  : 'hover:bg-slate-50/80 text-slate-600'
                                }`}
                            >
                              {/* STT */}
                              <td className="py-3 px-4 text-center font-bold text-slate-400 text-[11px]">
                                {isInRange ? (
                                  <span className="inline-block px-2 py-0.5 rounded-md bg-sky-600 text-white font-extrabold text-[10px]">
                                    {stt}
                                  </span>
                                ) : (
                                  stt
                                )}
                              </td>

                              {/* Term + Audio */}
                              <td className="py-3 px-4 font-extrabold text-slate-900">
                                <div className="flex items-center gap-2">
                                  <span>{word.term}</span>
                                  <button
                                    onClick={() => speakWord(word.term)}
                                    className="p-1 rounded-lg text-sky-600 hover:bg-sky-100 transition-all cursor-pointer"
                                    title="Nghe phát âm"
                                  >
                                    <Volume2 size={13} />
                                  </button>
                                </div>
                              </td>

                              {/* IPA */}
                              <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                                {word.ipa}
                              </td>

                              {/* Meaning */}
                              <td className="py-3 px-4 font-bold text-sky-900">
                                {word.answer}
                              </td>

                              {/* Topic */}
                              <td className="py-3 px-4 text-slate-500 hidden md:table-cell text-[11px]">
                                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                                  {word.topic}
                                </span>
                              </td>

                              {/* Example */}
                              <td className="py-3 px-4 text-slate-600 hidden lg:table-cell">
                                <div className="text-[11px]">
                                  <span className="font-semibold text-slate-800">{word.example}</span>
                                  <span className="text-slate-400 block text-[10px] italic">➔ {word.exampleMeaning}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 2 CONTENT: 2. Ngữ Pháp (CHỌN BÀI Ở NGOÀI -> ẤN VÀO TRONG MỚI XEM CONTENT) */}
        {mainTab === 'grammar' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BookMarked size={16} className="text-teal-600" />
                <span>Danh sách Các Bài Học Ngữ Pháp</span>
              </h3>
              <span className="text-xs text-slate-400 font-normal">Click vào bài để xem lý thuyết & công thức</span>
            </div>

            {/* Grid of Grammar Lessons Outside */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* BÀI 1: CÁC THÌ TRONG TIẾNG ANH (8 THÌ) */}
              <div
                onClick={() => setActiveGrammarDetail('tenses')}
                className="p-5 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/60 to-sky-50/60 hover:border-teal-400 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-200 group-hover:scale-105 transition-transform">
                    <Clock size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold">
                    8 Thì Trọng Tâm
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    Bài 1: Các Thì Trong Tiếng Anh
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Trọn bộ 8 thì trọng tâm: Hiện tại đơn, Tiếp diễn, Hoàn thành, Quá khứ đơn, Tiếp diễn, Quá khứ hoàn thành, Tương lai...
                  </p>
                </div>

                <div className="pt-2 border-t border-teal-100 flex items-center justify-between text-xs font-bold text-teal-700">
                  <span>Mở xem lý thuyết ➔</span>
                  <Sparkles size={14} className="text-teal-500" />
                </div>
              </div>

              {/* BÀI 2: ĐỘNG TỪ KHUYẾT THIẾU (MODAL VERBS) */}
              <div
                onClick={() => setActiveGrammarDetail('modal-verbs')}
                className="p-5 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/60 to-indigo-50/60 hover:border-sky-400 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-200 group-hover:scale-105 transition-transform">
                    <Zap size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold">
                    Modal Verbs
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
                    Bài 2: Động Từ Khuyết Thiếu
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Chuyên đề Can/Could, Must/Mustn’t, Have to, Should/Ought to, May/Might với công thức $S + Modal + V$.
                  </p>
                </div>

                <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-sky-700">
                  <span>Mở xem lý thuyết ➔</span>
                  <Sparkles size={14} className="text-sky-500" />
                </div>
              </div>

              {/* BÀI 3: DANH TỪ */}
              <div
                onClick={() => setActiveGrammarDetail('nouns')}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-teal-300 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
                    <BookMarked size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    Nouns
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    Bài 3: Danh Từ Ngữ Pháp
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Danh từ đếm được, không đếm được, số ít, số nhiều và các mẫu câu hay gặp.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Mở xem bài học ➔</span>
                </div>
              </div>

              {/* BÀI 4: ĐỘNG TỪ & CỤM ĐỘNG TỪ */}
              <div
                onClick={() => setActiveGrammarDetail('verbs')}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-teal-300 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
                    <PenTool size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    Verbs & Phrasal Verbs
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    Bài 4: Động Từ & Cụm Động Từ
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Tổng hợp các động từ hành động và phrasal verbs phổ biến (get into, go out, come on...).
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Mở xem bài học ➔</span>
                </div>
              </div>

              {/* BÀI 5: TÍNH TỪ & TRẠNG TỪ */}
              <div
                onClick={() => setActiveGrammarDetail('adjectives')}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-teal-300 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
                    <Sparkles size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    Adj & Adv
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    Bài 5: Tính Từ & Trạng Từ
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Vị trí và chức năng của tính từ, trạng từ chỉ thói quen/tần suất trong câu.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Mở xem bài học ➔</span>
                </div>
              </div>

              {/* BÀI 6: TỪ NỐI & GIỚI TỪ */}
              <div
                onClick={() => setActiveGrammarDetail('connectors')}
                className="p-5 rounded-3xl border border-slate-200 bg-white hover:border-teal-300 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
                    <BrainCircuit size={20} />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    Connectors & Prepositions
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    Bài 6: Từ Nối & Giới Từ
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Từ nối chỉ mục đích (so that), điều kiện (if), đối lập (but, while) và giới từ chỉ vị trí.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Mở xem bài học ➔</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 CONTENT: 3. Bài Tập Về Nhà (Trắc Nghiệm & Test) */}
        {mainTab === 'homework' && (
          <div className="space-y-6">
            {/* Banner Luyện Tập Các Thì Ngữ Pháp */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg border border-indigo-500/20">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-bold">
                  <Sparkles size={13} className="text-indigo-300" />
                  <span>CHUYÊN ĐỀ BÀI TẬP VỀ THÌ</span>
                </div>
                <h3 className="text-base sm:text-lg font-black bg-gradient-to-r from-white via-indigo-100 to-sky-200 bg-clip-text text-transparent">
                  Luyện Tập Bài Tập Các Thì (Điền từ, Trắc nghiệm & Điền đoạn văn)
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Trọn bộ 42 câu bài tập về thì có gắn tag, lọc chọn thì tùy ý & trộn ngẫu nhiên câu hỏi.
                </p>
              </div>

              <button
                onClick={() => setShowTenseExercisesRunner(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs font-black shadow-lg shadow-indigo-500/20 transition-all cursor-pointer shrink-0 flex items-center gap-2"
              >
                <PenTool size={16} />
                <span>Vào Làm Bài Tập Ngay ➔</span>
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <PenTool size={16} className="text-indigo-600" />
                <span>Danh sách Đề Trắc Nghiệm Theo Bài Học SGK</span>
              </h3>
              <span className="text-xs text-slate-400 font-normal">Tích chọn bài để làm trắc nghiệm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* FEATURED HOMEWORK CARD: BÀI TẬP VỀ THÌ (42 CÂU - 3 DẠNG ĐỀ) */}
              <div
                onClick={() => setShowTenseExercisesRunner(true)}
                className="p-5 rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50/90 via-sky-50/90 to-indigo-100/50 hover:border-indigo-600 transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-md hover:shadow-lg group scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs shrink-0 shadow-md shadow-indigo-200 group-hover:scale-110 transition-transform">
                    <BrainCircuit size={20} />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-black shadow-sm animate-pulse">
                    🔥 Hot • 42 câu
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-black text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
                    Bài Tập Về Thì (Tập 1, 2, 3, 4)
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Trọn bộ Điền từ (20 câu), Trắc nghiệm MCQ 4 đáp án (10 câu) & Điền đoạn văn (12 vị trí) có lọc thì & trộn ngẫu nhiên.
                  </p>
                </div>

                <div className="pt-2 border-t border-indigo-200 flex items-center justify-between text-xs font-black text-indigo-700">
                  <span>Mở làm bài ngay ➔</span>
                  <Sparkles size={15} className="text-indigo-600" />
                </div>
              </div>

              {currentLessons.map((lesson) => {
                const mcqSection = lesson.sections.find((s) => s.type === 'multiple_choice');
                if (!mcqSection) return null;

                const isSelected = selectedSectionIds.includes(mcqSection.id);
                const questionCount = mcqSection.items.length;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => toggleSection(mcqSection.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 hover:shadow-md ${isSelected
                        ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-500/15 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50/50'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-bold text-xs shrink-0">
                        <BrainCircuit size={16} />
                      </div>

                      {isSelected ? (
                        <div className="p-0.5 rounded-full bg-indigo-600 text-white shrink-0">
                          <CheckCircle2 size={18} fill="currentColor" className="text-indigo-600 stroke-white" />
                        </div>
                      ) : (
                        <Square size={18} className="text-slate-300 hover:text-indigo-400 transition-colors shrink-0" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-tight">
                        {lesson.title}
                      </h4>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-bold">
                        {questionCount} câu hỏi
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CUSTOM TEST SETUP MODAL */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => setShowTestModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
            >
              <X size={18} />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
                <Target size={14} />
                <span>Cấu hình Bài Test Ngẫu Nhiên</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Tạo Bài Kiểm Tra Tùy Chỉnh
              </h3>
              <p className="text-xs text-slate-500">
                Lấy từ vựng ngẫu nhiên từ kho {activeTestPool.length} từ đã chọn để kiểm tra phản xạ.
              </p>
            </div>

            {/* Step 1: Select Question Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>1. Số lượng câu hỏi test:</span>
                <span className="text-amber-700 font-extrabold text-[11px]">
                  (Đang chọn: {customQuestionCount} câu)
                </span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Array.from(new Set([5, 10, 15, 20, 30, activeTestPool.length]))
                  .filter((c) => c > 0 && c <= activeTestPool.length)
                  .map((count, idx, arr) => {
                    const isSelected = customQuestionCount === count;
                    const isAllOption = count === activeTestPool.length && idx === arr.length - 1;
                    const label = isAllOption ? `Tất cả (${count})` : `${count} câu`;

                    return (
                      <button
                        key={idx}
                        onClick={() => setCustomQuestionCount(count)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${isSelected
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-amber-300'
                          }`}
                      >
                        {label}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Step 2: Select Test Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                2. Chọn hình thức kiểm tra (Cách test):
              </label>

              <div className="space-y-2">
                {[
                  {
                    id: 'mcq-en-vi' as TestMode,
                    title: '🎯 Trắc nghiệm 4 đáp án (Anh ➔ Việt)',
                    desc: 'Hiển thị từ tiếng Anh, chọn nghĩa tiếng Việt đúng'
                  },
                  {
                    id: 'mcq-vi-en' as TestMode,
                    title: '🔄 Trắc nghiệm ngược (Việt ➔ Anh)',
                    desc: 'Hiển thị nghĩa tiếng Việt, chọn từ tiếng Anh tương ứng'
                  },
                  {
                    id: 'spelling' as TestMode,
                    title: '✍️ Gõ từ Tiếng Anh (Chính tả)',
                    desc: 'Hiển thị nghĩa tiếng Việt, gõ phím từ tiếng Anh chuẩn'
                  },
                  {
                    id: 'matching' as TestMode,
                    title: '🧩 Trò chơi Nối từ cặp đôi',
                    desc: 'Ghép cặp từ tiếng Anh với nghĩa tiếng Việt tương ứng'
                  }
                ].map((mode) => {
                  const isSelected = customTestMode === mode.id;

                  return (
                    <div
                      key={mode.id}
                      onClick={() => setCustomTestMode(mode.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${isSelected
                          ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                        }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">{mode.title}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{mode.desc}</div>
                      </div>

                      {isSelected ? (
                        <CheckCircle2 size={18} className="text-amber-600 shrink-0" />
                      ) : (
                        <Square size={18} className="text-slate-300 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Launch */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowTestModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleLaunchCustomTest}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-lg shadow-amber-200 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Bắt Đầu Làm Test Ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
