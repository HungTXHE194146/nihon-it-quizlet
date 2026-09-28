import React, { useState } from 'react';
import type { Lesson } from '../data/lessons';
import {
  tryN3GrammarPoints,
  tryN3Chapter1Story,
  tryN3Chapter1Part2Story,
  tryN3Chapter2Story,
  tryN3Chapter2Part2Story,
  type GrammarPoint,
} from '../data/tryN3Data';
import { renderFormattedText } from '../utils/formatText';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Compass,
  Zap,
  Award,
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
  const [showVietnameseTranslation, setShowVietnameseTranslation] = useState(false);
  const [selectedStoryPart, setSelectedStoryPart] = useState<1 | 2 | 3 | 4>(1);
  const [handbookFilter, setHandbookFilter] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4'>('all');

  // Unified Lesson & Sections
  const mainLesson = lessons.find((l) => l.id === 1) || lessons[0];
  const flashcardAllSection = mainLesson?.sections.find((s) => s.id === 'try-n3-flashcard-all') || mainLesson?.sections.find((s) => s.type === 'vocabulary');
  const flashcardP1Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-flashcard');
  const flashcardP3Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-flashcard');
  const flashcardP4Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-p2-flashcard');

  const ex1Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-exercises');
  const ex2Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-exercises-p2');
  const ex3Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-exercises');
  const ex4Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-exercises-p2');

  const check1Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-check');
  const check2Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-check-p2');
  const check3Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-check');
  const check4Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-check-p2');

  const matome1Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c1-matome');
  const matome2Section = mainLesson?.sections.find((s) => s.id === 'try-n3-c2-matome');

  const handleStartFlashcardAll = () => {
    if (flashcardAllSection) {
      onStartBySections([flashcardAllSection.id]);
    } else {
      const ids: string[] = [];
      if (flashcardP1Section) ids.push(flashcardP1Section.id);
      if (flashcardP3Section) ids.push(flashcardP3Section.id);
      if (flashcardP4Section) ids.push(flashcardP4Section.id);
      if (ids.length) onStartBySections(ids);
    }
  };

  const handleStartFlashcardP1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flashcardP1Section) onStartBySections([flashcardP1Section.id]);
  };

  const handleStartFlashcardP3 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flashcardP3Section) onStartBySections([flashcardP3Section.id]);
  };

  const handleStartFlashcardP4 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (flashcardP4Section) onStartBySections([flashcardP4Section.id]);
  };

  const handleStartExercisesAll = () => {
    const ids: string[] = [];
    if (ex1Section) ids.push(ex1Section.id);
    if (ex2Section) ids.push(ex2Section.id);
    if (ex3Section) ids.push(ex3Section.id);
    if (ex4Section) ids.push(ex4Section.id);
    if (ids.length) onStartBySections(ids);
  };

  const handleStartExercisesP1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ex1Section) onStartBySections([ex1Section.id]);
  };

  const handleStartExercisesP2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ex2Section) onStartBySections([ex2Section.id]);
  };

  const handleStartExercisesP3 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ex3Section) onStartBySections([ex3Section.id]);
  };

  const handleStartExercisesP4 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ex4Section) onStartBySections([ex4Section.id]);
  };

  const handleStartCheckAll = () => {
    const ids: string[] = [];
    if (check1Section) ids.push(check1Section.id);
    if (check2Section) ids.push(check2Section.id);
    if (check3Section) ids.push(check3Section.id);
    if (check4Section) ids.push(check4Section.id);
    if (ids.length) onStartBySections(ids);
  };

  const handleStartCheckP1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (check1Section) onStartBySections([check1Section.id]);
  };

  const handleStartCheckP2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (check2Section) onStartBySections([check2Section.id]);
  };

  const handleStartCheckP3 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (check3Section) onStartBySections([check3Section.id]);
  };

  const handleStartCheckP4 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (check4Section) onStartBySections([check4Section.id]);
  };

  const handleStartMatome1 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (matome1Section) onStartBySections([matome1Section.id]);
  };

  const handleStartMatome2 = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (matome2Section) onStartBySections([matome2Section.id]);
  };

  const handleStartMatomeAll = () => {
    const ids: string[] = [];
    if (matome1Section) ids.push(matome1Section.id);
    if (matome2Section) ids.push(matome2Section.id);
    if (ids.length) onStartBySections(ids);
  };

  const currentStory = selectedStoryPart === 1
    ? tryN3Chapter1Story
    : selectedStoryPart === 2
    ? tryN3Chapter1Part2Story
    : selectedStoryPart === 3
    ? tryN3Chapter2Story
    : tryN3Chapter2Part2Story;

  const part1Points = tryN3GrammarPoints.filter((g) => g.number <= 5);
  const part2Points = tryN3GrammarPoints.filter((g) => g.number > 5 && g.number <= 10);
  const part3Points = tryN3GrammarPoints.filter((g) => g.number >= 11 && g.number <= 16);
  const part4Points = tryN3GrammarPoints.filter((g) => g.number >= 17 && g.number <= 20);

  const filteredGrammarPoints = tryN3GrammarPoints.filter((g) => {
    if (handbookFilter === 'part1') return g.number <= 5;
    if (handbookFilter === 'part2') return g.number > 5 && g.number <= 10;
    if (handbookFilter === 'part3') return g.number >= 11 && g.number <= 16;
    if (handbookFilter === 'part4') return g.number >= 17 && g.number <= 20;
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6 font-['Space_Grotesk',sans-serif]">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border-3 border-black text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-[#7DD3FC] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer"
        >
          <ArrowLeft size={15} strokeWidth={3} />
          <span>Trang chủ</span>
        </button>

        <span className="px-3 py-1.5 bg-[#7DD3FC] border-3 border-black text-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#000]">
          TRY! N3 • 文法
        </span>
      </div>

      {/* 2. Minimalist Hero Banner */}
      <div className="bg-[#F0F9FF] border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider">
              TRY! N3
            </span>
            <span className="text-xs font-bold text-slate-700">
              富士登山 & ぼくの犬、クロ (Phần 1 ➔ 4)
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
            Ngữ Pháp TRY! N3
          </h1>
          <p className="text-xs font-bold text-slate-500">
            20 Mẫu ngữ pháp trọng tâm • 5 Mẫu mở rộng • Trắc nghiệm やっみよう! & Tổng ôn thi thử JLPT
          </p>
        </div>

        <div className="self-start sm:self-center shrink-0">
          <span className="px-3 py-2 bg-[#7DD3FC] border-3 border-black text-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#000] inline-flex items-center gap-1.5">
            <Zap size={14} strokeWidth={3} />
            <span>145 Thẻ & Câu hỏi</span>
          </span>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`flex items-center gap-2 px-4 py-2.5 border-3 border-black font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-100 cursor-pointer whitespace-nowrap select-none ${
            activeTab === 'chapters'
              ? 'bg-[#7DD3FC] text-black shadow-[4px_4px_0px_0px_#000] -translate-y-0.5'
              : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#F0F9FF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
          }`}
        >
          <Layers size={15} strokeWidth={3} />
          <span>Lộ trình luyện tập</span>
        </button>

        <button
          onClick={() => setActiveTab('story')}
          className={`flex items-center gap-2 px-4 py-2.5 border-3 border-black font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-100 cursor-pointer whitespace-nowrap select-none ${
            activeTab === 'story'
              ? 'bg-[#7DD3FC] text-black shadow-[4px_4px_0px_0px_#000] -translate-y-0.5'
              : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#F0F9FF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
          }`}
        >
          <FileText size={15} strokeWidth={3} />
          <span>Bài đọc ngữ cảnh</span>
        </button>

        <button
          onClick={() => setActiveTab('handbook')}
          className={`flex items-center gap-2 px-4 py-2.5 border-3 border-black font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-100 cursor-pointer whitespace-nowrap select-none ${
            activeTab === 'handbook'
              ? 'bg-[#7DD3FC] text-black shadow-[4px_4px_0px_0px_#000] -translate-y-0.5'
              : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#F0F9FF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
          }`}
        >
          <BookOpen size={15} strokeWidth={3} />
          <span>Sổ tay Ngữ pháp</span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS & ACTIONS */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          {/* Main Action Box */}
          <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_#000] space-y-6">
            {/* 4 Focused Mode Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Flashcard */}
              <div
                onClick={handleStartFlashcardAll}
                className="p-4 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex flex-col justify-between text-left cursor-pointer select-none space-y-3"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-2 text-black font-black text-sm uppercase">
                    <Sparkles size={16} strokeWidth={3} />
                    <span>Flashcard</span>
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 text-xs font-black">25</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                  <button
                    onClick={handleStartFlashcardP1}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P1&2: 14 thẻ
                  </button>
                  <button
                    onClick={handleStartFlashcardP3}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P3: 6 thẻ
                  </button>
                  <button
                    onClick={handleStartFlashcardP4}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P4: 5 thẻ
                  </button>
                </div>
              </div>

              {/* Bài tập やっみよう */}
              <div
                onClick={handleStartExercisesAll}
                className="p-4 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex flex-col justify-between text-left cursor-pointer select-none space-y-3"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-2 text-black font-black text-sm uppercase">
                    <HelpCircle size={16} strokeWidth={3} />
                    <span>Bài tập</span>
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 text-xs font-black">70</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold">
                  <button
                    onClick={handleStartExercisesP1}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P1: 23c
                  </button>
                  <button
                    onClick={handleStartExercisesP2}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P2: 17c
                  </button>
                  <button
                    onClick={handleStartExercisesP3}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P3: 18c
                  </button>
                  <button
                    onClick={handleStartExercisesP4}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    P4: 12c
                  </button>
                </div>
              </div>

              {/* Kiểm tra Check 📖 */}
              <div
                onClick={handleStartCheckAll}
                className="p-4 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex flex-col justify-between text-left cursor-pointer select-none space-y-3"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-2 text-black font-black text-sm uppercase">
                    <CheckCircle2 size={16} strokeWidth={3} />
                    <span>Kiểm tra Check</span>
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 text-xs font-black">20</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold">
                  <button
                    onClick={handleStartCheckP1}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Check 1: 6c
                  </button>
                  <button
                    onClick={handleStartCheckP2}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Check 2: 6c
                  </button>
                  <button
                    onClick={handleStartCheckP3}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Check 3: 5c
                  </button>
                  <button
                    onClick={handleStartCheckP4}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Check 4: 3c
                  </button>
                </div>
              </div>

              {/* Tổng ôn まとめ問題 */}
              <div
                onClick={handleStartMatomeAll}
                className="p-4 bg-[#7DD3FC] hover:bg-[#38BDF8] border-3 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex flex-col justify-between text-left cursor-pointer select-none space-y-3"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center gap-2 text-black font-black text-sm uppercase">
                    <Award size={16} strokeWidth={3} />
                    <span>Tổng ôn Matome</span>
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 text-xs font-black">30</span>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold">
                  <button
                    onClick={handleStartMatome1}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    C1: 15c
                  </button>
                  <button
                    onClick={handleStartMatome2}
                    className="px-1.5 py-0.5 bg-white border border-black hover:bg-black hover:text-white transition-colors"
                  >
                    C2: 15c
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartMatomeAll();
                    }}
                    className="px-1.5 py-0.5 bg-black text-white border border-black hover:bg-white hover:text-black transition-colors"
                  >
                    Cả 2: 30c
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Grammar Buttons: Phần 1 (1 - 5) */}
            <div className="pt-4 border-t-3 border-black/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Phần 1 • 第一次の富士登山 (1) [Mẫu 1 ➔ 5]:
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {part1Points.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrammarModal(g)}
                    className="px-3.5 py-2.5 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black font-black text-sm text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer flex items-center gap-2 select-none"
                    title={`Xem chi tiết ${g.pattern}: ${g.translationVi}`}
                  >
                    <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
                      {g.number}
                    </span>
                    <span>{g.pattern}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-black/30">
                      {g.translationVi}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Grammar Buttons: Phần 2 (6 - 10) */}
            <div className="pt-4 border-t-3 border-black/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Phần 2 • 第一次の富士登山 (2) [Mẫu 6 ➔ 10]:
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {part2Points.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrammarModal(g)}
                    className="px-3.5 py-2.5 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black font-black text-sm text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer flex items-center gap-2 select-none"
                    title={`Xem chi tiết ${g.pattern}: ${g.translationVi}`}
                  >
                    <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
                      {g.number}
                    </span>
                    <span>{g.pattern}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-black/30">
                      {g.translationVi}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Grammar Buttons: Phần 3 (11 - 16) */}
            <div className="pt-4 border-t-3 border-black/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Phần 3 • ぼくの犬、クロ (1) [Mẫu 11 ➔ 16]:
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {part3Points.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrammarModal(g)}
                    className="px-3.5 py-2.5 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black font-black text-sm text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer flex items-center gap-2 select-none"
                    title={`Xem chi tiết ${g.pattern}: ${g.translationVi}`}
                  >
                    <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
                      {g.number}
                    </span>
                    <span>{g.pattern}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-black/30">
                      {g.translationVi}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Grammar Buttons: Phần 4 (17 - 20) */}
            <div className="pt-4 border-t-3 border-black/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Phần 4 • ぼくの犬、クロ (2) [Mẫu 17 ➔ 20]:
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {part4Points.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrammarModal(g)}
                    className="px-3.5 py-2.5 bg-[#F0F9FF] hover:bg-[#7DD3FC] border-3 border-black font-black text-sm text-black shadow-[3px_3px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 cursor-pointer flex items-center gap-2 select-none"
                    title={`Xem chi tiết ${g.pattern}: ${g.translationVi}`}
                  >
                    <span className="w-6 h-6 bg-black text-white text-xs font-black flex items-center justify-center shrink-0">
                      {g.number}
                    </span>
                    <span>{g.pattern}</span>
                    <span className="text-xs font-bold text-slate-700 bg-white px-1.5 py-0.5 border border-black/30">
                      {g.translationVi}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STORY & CONTEXT READING */}
      {activeTab === 'story' && (
        <div className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_#000] space-y-5">
          {/* Story Sub-tab Switcher (Phần 1, 2, 3) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStoryPart(1)}
                className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase tracking-wider transition-all duration-100 cursor-pointer ${
                  selectedStoryPart === 1
                    ? 'bg-[#7DD3FC] text-black shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-white text-slate-700 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 1 (Bài 1)
              </button>
              <button
                onClick={() => setSelectedStoryPart(2)}
                className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase tracking-wider transition-all duration-100 cursor-pointer ${
                  selectedStoryPart === 2
                    ? 'bg-[#7DD3FC] text-black shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-white text-slate-700 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 2 (Bài 2)
              </button>
              <button
                onClick={() => setSelectedStoryPart(3)}
                className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase tracking-wider transition-all duration-100 cursor-pointer ${
                  selectedStoryPart === 3
                    ? 'bg-[#7DD3FC] text-black shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-white text-slate-700 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 3 (Kuro 1)
              </button>
              <button
                onClick={() => setSelectedStoryPart(4)}
                className={`px-3 py-1.5 border-2 border-black font-black text-xs uppercase tracking-wider transition-all duration-100 cursor-pointer ${
                  selectedStoryPart === 4
                    ? 'bg-[#7DD3FC] text-black shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-white text-slate-700 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 4 (Kuro 2)
              </button>
            </div>

            <button
              onClick={() => setShowVietnameseTranslation(!showVietnameseTranslation)}
              className="px-3 py-1.5 bg-white border-2 border-black text-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] hover:bg-[#7DD3FC] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100 cursor-pointer"
            >
              <span>{showVietnameseTranslation ? 'Ẩn bản dịch TV' : 'Hiện bản dịch TV'}</span>
            </button>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-black text-black">
              {currentStory.titleJa}
            </h2>
            <p className="text-xs font-bold text-slate-600 mt-0.5">
              {currentStory.titleVi}
            </p>
          </div>

          {/* Goal Strip */}
          <div className="p-3 bg-[#F0F9FF] border-2 border-black text-xs font-bold text-black flex items-center gap-2">
            <Compass size={16} strokeWidth={3} className="shrink-0 text-black" />
            <span>
              <strong>Mục tiêu (できること):</strong> {currentStory.canDoJa}{' '}
              {showVietnameseTranslation && `(${currentStory.canDoVi})`}
            </span>
          </div>

          {/* Reading Text Box (Interactive Grammar Highlights) */}
          <div className="p-5 md:p-6 bg-[#F0F9FF] border-3 border-black shadow-[4px_4px_0px_0px_#000] space-y-3">
            {selectedStoryPart === 1 ? (
              <p className="text-base md:text-lg leading-loose text-black font-bold select-text">
                先週の日曜日、リンさんと富士山に登った。途中までバスで行って、そこから
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜始める');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜始める: Bắt đầu làm gì"
                >
                  登り始めた
                </span>
                。登る前に水を買った店で、酸素缶も
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜ように言う');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ように言う: Dặn dò / Nhắc nhở"
                >
                  持っていくように言われた
                </span>
                。山の上は空気が少ないから、必要になるかもしれないそうだ。空気が薄いと
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜ということ');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ということ: Việc rằng..."
                >
                  病気になる人もいるということ
                </span>
                を思い出したが見富士山は小学生でも登れると聞いたので、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜だろうと思う');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜だろうと思う: Nghĩ rằng có lẽ là..."
                >
                  大丈夫だろうと思った
                </span>
                。だから買わなかった。
                <br className="my-2" />
                私は登山をしたことはないが、富士山はけわしい山じゃないし、それほど
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜なさそうだ');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜なさそうだ: Trông có vẻ không..."
                >
                  大変じゃなさそうだった
                </span>
                。
              </p>
            ) : selectedStoryPart === 2 ? (
              <p className="text-base md:text-lg leading-loose text-black font-bold select-text">
                でも、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜と');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜と: Vừa mới... thì nhận ra"
                >
                  登ってみると
                </span>
                、本当に大変だった。途中で
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜ほど');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ほど: Đến mức..."
                >
                  立っているのもつらいほど
                </span>
                足が重くなった。もうやめたいと思ったが、前を見ると、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜ていく');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ていく: Càng ngày càng... / Tiếp diễn về tương lai"
                >
                  どんどん登っていく
                </span>
                リンさんが見えた。リンさんががんばっているのに、あきらめるのはくやしいから、私も
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜続ける');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜続ける: Tiếp tục leo kiên trì"
                >
                  登り続けた
                </span>
                。
                <br className="my-2" />
                あとで聞いたら、リンさんも途中でやめようと思ったけど、私が後ろから
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜ていく');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem điểm Plus: 〜てくる"
                >
                  登ってくる
                </span>
                のが見えたからがんばったと言っていた。大変だったが、一番上まで行けて本当によかった。だから、もしこれから富士山に登る人がいたら、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.pattern === '〜なら');
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜なら: Nếu muốn lên tận đỉnh"
                >
                  上まで行きたいなら
                </span>
                、友だちと一緒に行くことをおすすめしたい。もちろん酸素缶も持っていったほうがいい。
                <br className="my-2" />
                でも、もう一度行きたいかと聞かれたら、もう二度とあんな大変なことはしたくないと答えるだろう。富士山は遠くから見るほうがずっといいと思う。
              </p>
            ) : selectedStoryPart === 3 ? (
              /* Phần 3: Kuro Story Text with clickable highlights */
              <p className="text-base md:text-lg leading-loose text-black font-bold select-text">
                ぼくはいつも夜、クロを散歩に連れていく。クロを飼い始めたのは3年前だ。
                <br className="my-2" />
                色が黒いから、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 11);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜って: Tên là..."
                >
                  クロって名前
                </span>
                をつけた。
                <br className="my-2" />
                最初、両親は犬を飼うことに反対だったが、何度も頼んで、やっと
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 12);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜させてもらう: Được cho phép làm gì"
                >
                  飼わせてもらった
                </span>
                。そのかわり、雨の日も風の日も毎日必ず散歩すると
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 13);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜させられる: Bị bắt phải làm gì"
                >
                  約束させられた
                </span>
                。だからクロの散歩はぼくの日課だ。
                <br className="my-2" />
                ぼくがうちに帰ると、クロは早く散歩に
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 14);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜がる: Có vẻ muốn... / Biểu lộ ra ngoài"
                >
                  行きたがって
                </span>
                「クーンクーン」と鳴く。ぼくがひもを持つと、ぼくのところへ来て、うれしそうにしっぽをふる。そして、ひもをつけて、
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 15);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜たとたん: Ngay vừa khi... thì lập tức"
                >
                  玄関を出たとたん
                </span>
                、クロは全速力で
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 16);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜出す: Đột nhiên bắt đầu lao đi"
                >
                  走り出す
                </span>
                。
              </p>
            ) : (
              /* Phần 4: Kuro Story 2 Text with clickable highlights */
              <p className="text-base md:text-lg leading-loose text-black font-bold select-text">
                近くの公園を1周するのが、いつもの散歩コースだ。
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 17);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ようとする: Định làm gì"
                >
                  帰ろうとする
                </span>
                といやがって
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 17);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜ようとしない: Nhất quyết không chịu nhúc nhích"
                >
                  動こうとしない
                </span>
                。そんなときのために、いつもぼくのズボンのポケットには、クロが好きなクッキーが入れてある。クッキーを取り出すと、クロは喜んでぼくのところへ来る。
                <br className="my-2" />
                ときどき、帰りにコンビニに
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 18);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜こともある: Thỉnh thoảng cũng ghé vào"
                >
                  寄ることもある
                </span>
                。クロをコンビニの前で
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 19);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜させておく: Cứ để cho ngồi chờ"
                >
                  待たせておいて
                </span>
                、買い物する。戻ってくると、クロは大喜びだ。ぼくは顔中
                <span
                  onClick={() => {
                    const g = tryN3GrammarPoints.find((item) => item.number === 20);
                    if (g) setSelectedGrammarModal(g);
                  }}
                  className="bg-[#7DD3FC] text-black font-black px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_#000] mx-1 cursor-pointer hover:bg-black hover:text-white transition-all select-none"
                  title="Bấm để xem ngữ pháp 〜られてしまう: Bị liếm khắp mặt (bị hại)"
                >
                  なめられてしまう
                </span>
                。なめられるとくすぐったいが、クロは本当にかわいい。
              </p>
            )}
          </div>

          {/* Vietnamese Translation */}
          {showVietnameseTranslation && (
            <div className="p-4 bg-white border-2 border-black space-y-1.5 select-text">
              <span className="text-[10px] font-black uppercase text-slate-500 block">
                Bản dịch tham khảo:
              </span>
              <p className="text-xs md:text-sm leading-relaxed text-black font-medium whitespace-pre-line">
                {currentStory.textVi}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GRAMMAR HANDBOOK & DETAILS */}
      {activeTab === 'handbook' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
            <div>
              <h2 className="text-lg md:text-xl font-black text-black uppercase">
                Sổ tay Ngữ pháp TRY! N3
              </h2>
              <p className="text-xs font-bold text-slate-500">
                20 Mẫu ngữ pháp & 5 Điểm Plus đầy đủ cấu trúc, dịch nghĩa, ý hiểu và ví dụ
              </p>
            </div>

            {/* Handbook Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setHandbookFilter('all')}
                className={`px-2.5 py-1 border-2 border-black text-xs font-black transition-colors ${
                  handbookFilter === 'all'
                    ? 'bg-[#7DD3FC] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-slate-600 hover:bg-[#F0F9FF]'
                }`}
              >
                Tất cả (20)
              </button>
              <button
                onClick={() => setHandbookFilter('part1')}
                className={`px-2.5 py-1 border-2 border-black text-xs font-black transition-colors ${
                  handbookFilter === 'part1'
                    ? 'bg-[#7DD3FC] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-slate-600 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 1 (1 - 5)
              </button>
              <button
                onClick={() => setHandbookFilter('part2')}
                className={`px-2.5 py-1 border-2 border-black text-xs font-black transition-colors ${
                  handbookFilter === 'part2'
                    ? 'bg-[#7DD3FC] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-slate-600 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 2 (6 - 10)
              </button>
              <button
                onClick={() => setHandbookFilter('part3')}
                className={`px-2.5 py-1 border-2 border-black text-xs font-black transition-colors ${
                  handbookFilter === 'part3'
                    ? 'bg-[#7DD3FC] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-slate-600 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 3 (11 - 16)
              </button>
              <button
                onClick={() => setHandbookFilter('part4')}
                className={`px-2.5 py-1 border-2 border-black text-xs font-black transition-colors ${
                  handbookFilter === 'part4'
                    ? 'bg-[#7DD3FC] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-slate-600 hover:bg-[#F0F9FF]'
                }`}
              >
                Phần 4 (17 - 20)
              </button>
            </div>
          </div>

          {filteredGrammarPoints.map((g) => {
            const isExpanded = expandedGrammarId === g.id;

            return (
              <div
                key={g.id}
                className="border-3 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden transition-all bg-white"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedGrammarId(isExpanded ? null : g.id)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors duration-100 select-none ${
                    isExpanded ? 'bg-[#7DD3FC] border-b-3 border-black' : 'hover:bg-[#F0F9FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 bg-black text-white font-black text-xs flex items-center justify-center shrink-0">
                      {g.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-black text-black text-sm md:text-base">
                          {g.pattern}
                        </h3>
                        <span className="px-2 py-0.5 bg-black text-white text-xs font-black">
                          {g.translationVi}
                        </span>
                        <span className="text-xs font-bold text-slate-600 hidden sm:inline">
                          ({g.title})
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-bold line-clamp-1 mt-0.5">
                        💡 Ý hiểu: {g.meaningVi}
                      </p>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp size={20} strokeWidth={3} className="text-black shrink-0 ml-2" />
                  ) : (
                    <ChevronDown size={20} strokeWidth={3} className="text-black shrink-0 ml-2" />
                  )}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 md:p-5 bg-[#F0F9FF] space-y-4">
                    {/* Formation (接続) */}
                    <div className="p-4 bg-white border-2 border-black space-y-1.5 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block text-center">
                        Cấu trúc (接続):
                      </span>
                      <div className="font-mono text-base md:text-xl font-black text-black whitespace-pre-line bg-[#7DD3FC]/25 p-3.5 md:p-4 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
                        {renderFormattedText(g.formation)}
                      </div>
                    </div>

                    {/* Dịch nghĩa */}
                    <div className="p-3.5 bg-[#7DD3FC]/30 border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[2px_2px_0px_0px_#000]">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-black text-white text-[11px] font-black uppercase tracking-wider shrink-0">
                          Dịch nghĩa
                        </span>
                        <span className="text-sm md:text-base font-black text-black">
                          {g.translationVi}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 italic">
                        (Dịch nghĩa trực tiếp của mẫu ngữ pháp)
                      </span>
                    </div>

                    {/* Meaning & Explanation */}
                    <div className="p-3.5 bg-white border-2 border-black space-y-2 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Ý hiểu & Cách dùng (Sách TRY! N3):
                      </span>
                      <p className="text-xs md:text-sm font-black text-black">
                        {g.meaningJa}
                      </p>
                      <div className="p-2.5 bg-[#F0F9FF] border border-black/20 text-xs font-bold text-slate-700">
                        💡 <strong>Ý hiểu:</strong> {g.meaningVi}
                      </div>
                      {g.usageNote && (
                        <div className="text-xs text-black font-bold bg-[#7DD3FC]/20 p-2.5 border border-black mt-2">
                          📌 <strong>Lưu ý:</strong> {renderFormattedText(g.usageNote)}
                        </div>
                      )}
                    </div>

                    {/* Examples */}
                    <div className="p-3.5 bg-white border-2 border-black space-y-2 shadow-[2px_2px_0px_0px_#000]">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Ví dụ thực tế:
                      </span>
                      <div className="space-y-2">
                        {g.examples.map((ex, i) => (
                          <div key={i} className="p-2.5 bg-[#F0F9FF] border border-black text-xs space-y-0.5">
                            <div className="font-black text-black select-text">{ex.ja}</div>
                            <div className="text-slate-700 font-bold select-text">{renderFormattedText(ex.vi)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plus Note if any */}
                    {g.plusNote && (
                      <div className="p-4 bg-[#7DD3FC] border-3 border-black shadow-[3px_3px_0px_0px_#000] space-y-2.5">
                        <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles size={13} strokeWidth={3} />
                          {renderFormattedText(g.plusNote.title)}
                        </span>
                        {g.plusNote.formation && (
                          <div className="font-mono text-sm md:text-lg font-black text-black bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
                            {renderFormattedText(g.plusNote.formation)}
                          </div>
                        )}
                        {g.plusNote.translationVi && (
                          <div className="p-2.5 bg-white border-2 border-black flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase shrink-0">
                              Dịch nghĩa:
                            </span>
                            <span className="text-xs md:text-sm font-black text-black">
                              {g.plusNote.translationVi}
                            </span>
                          </div>
                        )}
                        <p className="text-xs text-black font-bold bg-white/70 p-2 border border-black/30">
                          💡 <strong>Ý hiểu:</strong> {g.plusNote.meaningVi}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {g.plusNote.examples.map((ex, i) => (
                            <div key={i} className="text-xs bg-white p-2 border border-black space-y-0.5">
                              <div className="font-black text-black">{ex.ja}</div>
                              <div className="text-slate-700 font-bold">{renderFormattedText(ex.vi)}</div>
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

      {/* Quick Modal for Grammar Details */}
      {selectedGrammarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b-3 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#7DD3FC] border-2 border-black text-black font-black text-xs">
                  Mẫu {selectedGrammarModal.number}
                </span>
                <h3 className="font-black text-lg text-black">
                  {selectedGrammarModal.pattern}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGrammarModal(null)}
                className="w-7 h-7 flex items-center justify-center bg-black text-white font-black text-xs hover:bg-[#7DD3FC] hover:text-black cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm max-h-[65vh] overflow-y-auto pr-1">
              {/* Formation */}
              <div className="p-3 bg-[#F0F9FF] border-2 border-black text-center">
                <span className="font-bold text-slate-500 block uppercase text-[10px] mb-1">Cấu trúc (接続):</span>
                <span className="font-mono text-base md:text-xl font-black text-black block whitespace-pre-line leading-relaxed">{renderFormattedText(selectedGrammarModal.formation)}</span>
              </div>

              {/* Dịch nghĩa */}
              <div className="p-3 bg-[#7DD3FC]/30 border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#000]">
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase shrink-0">
                  Dịch nghĩa
                </span>
                <span className="font-black text-sm md:text-base text-black">
                  {selectedGrammarModal.translationVi}
                </span>
              </div>

              {/* Ý hiểu & Cách dùng */}
              <div className="p-2.5 bg-white border-2 border-black space-y-1">
                <span className="font-bold text-slate-500 block uppercase text-[10px]">Ý hiểu & Cách dùng:</span>
                <p className="font-bold text-xs text-slate-700">💡 {selectedGrammarModal.meaningVi}</p>
                {selectedGrammarModal.usageNote && (
                  <div className="text-[11px] text-black font-bold bg-[#7DD3FC]/20 p-2 border border-black mt-1">
                    📌 <strong>Lưu ý:</strong> {renderFormattedText(selectedGrammarModal.usageNote)}
                  </div>
                )}
              </div>

              {/* Ví dụ */}
              <div className="p-3 bg-white border-2 border-black space-y-2">
                <span className="font-bold text-slate-500 block text-[10px] uppercase">Ví dụ thực tế:</span>
                {selectedGrammarModal.examples.map((ex, i) => (
                  <div key={i} className="text-xs p-2 bg-[#F0F9FF] border border-black space-y-0.5">
                    <p className="font-black text-black">{ex.ja}</p>
                    <p className="text-slate-600 font-bold">{renderFormattedText(ex.vi)}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedGrammarModal(null)}
              className="w-full py-2.5 bg-[#7DD3FC] border-2 border-black text-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] hover:bg-[#38BDF8] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
