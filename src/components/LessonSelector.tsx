import React, { useMemo } from 'react';
import type { Lesson } from '../data/lessons';
import { BookOpen, CheckSquare, Square, Play, AlertCircle, HelpCircle, Layers, Book, ArrowLeft } from 'lucide-react';

interface LessonSelectorProps {
  lessons: Lesson[];
  selectedSectionIds: string[];
  setSelectedSectionIds: React.Dispatch<React.SetStateAction<string[]>>;
  onStartSession: () => void;
  onViewTheory?: (lessonId: number) => void;
  subjectTitle?: string;
  subjectJapaneseTitle?: string;
  onBackToHome?: () => void;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  lessons,
  selectedSectionIds,
  setSelectedSectionIds,
  onStartSession,
  onViewTheory,
  subjectTitle = 'NihonIT Quizlet',
  subjectJapaneseTitle = 'IT日本語 & 専門用語',
  onBackToHome,
}) => {
  // Aggregate all available sections that have content
  const allContentSections = useMemo(() => {
    const list: string[] = [];
    lessons.forEach(lesson => {
      lesson.sections.forEach(section => {
        if (section.items.length > 0) {
          list.push(section.id);
        }
      });
    });
    return list;
  }, [lessons]);

  // Compute total items to study based on selected sections
  const totalItemsToStudy = useMemo(() => {
    let count = 0;
    lessons.forEach(lesson => {
      lesson.sections.forEach(section => {
        if (selectedSectionIds.includes(section.id)) {
          count += section.items.length;
        }
      });
    });
    return count;
  }, [selectedSectionIds, lessons]);

  // Toggle selection for a single section
  const toggleSection = (sectionId: string) => {
    setSelectedSectionIds(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  // Toggle selection for all sections in a lesson
  const toggleAllLessonSections = (lesson: Lesson) => {
    const sectionIds = lesson.sections.map(s => s.id);
    if (sectionIds.length === 0) return;

    const allSelected = sectionIds.every(id => selectedSectionIds.includes(id));
    if (allSelected) {
      // Deselect all sections of this lesson
      setSelectedSectionIds(prev => prev.filter(id => !sectionIds.includes(id)));
    } else {
      // Select all sections of this lesson
      setSelectedSectionIds(prev => {
        const filtered = prev.filter(id => !sectionIds.includes(id));
        return [...filtered, ...sectionIds];
      });
    }
  };

  // Get selection state of a lesson: 'all', 'partial', 'none', 'empty'
  const getLessonSelectionState = (lesson: Lesson) => {
    if (lesson.sections.length === 0) return 'empty';
    const sectionIds = lesson.sections.map(s => s.id);
    const selectedCount = sectionIds.filter(id => selectedSectionIds.includes(id)).length;
    
    if (selectedCount === 0) return 'none';
    if (selectedCount === lesson.sections.length) return 'all';
    return 'partial';
  };

  const selectAll = () => {
    setSelectedSectionIds(allContentSections);
  };

  const deselectAll = () => {
    setSelectedSectionIds([]);
  };

  const selectOnlyVocabulary = () => {
    const vocabIds: string[] = [];
    lessons.forEach(lesson => {
      lesson.sections.forEach(section => {
        if (section.type === 'vocabulary' && section.items.length > 0) {
          vocabIds.push(section.id);
        }
      });
    });
    setSelectedSectionIds(vocabIds);
  };

  const selectOnlyQuizzes = () => {
    const quizIds: string[] = [];
    lessons.forEach(lesson => {
      lesson.sections.forEach(section => {
        if (section.type === 'multiple_choice' && section.items.length > 0) {
          quizIds.push(section.id);
        }
      });
    });
    setSelectedSectionIds(quizIds);
  };

  const hasSelectedAnyQuestion = totalItemsToStudy > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header section with styling */}
      <div className="relative text-center mb-10">
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 mb-4 sm:mb-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Tất cả môn học</span>
          </button>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {subjectTitle}
        </h1>
        {subjectJapaneseTitle && (
          <p className="mt-2 text-sm md:text-base font-semibold text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            {subjectJapaneseTitle}
          </p>
        )}
      </div>

      {/* Control panel & summary */}
      <div className="glass-panel rounded-2xl p-6 mb-8 flex flex-col xl:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap gap-2.5 justify-center xl:justify-start w-full xl:w-auto">
          <button
            onClick={selectAll}
            className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckSquare size={15} />
            Chọn tất cả
          </button>
          <button
            onClick={deselectAll}
            className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Square size={15} />
            Bỏ chọn
          </button>
          <button
            onClick={selectOnlyVocabulary}
            className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen size={15} />
            Chỉ học Từ vựng
          </button>
          <button
            onClick={selectOnlyQuizzes}
            className="px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle size={15} />
            Chỉ làm Trắc nghiệm
          </button>
        </div>

        {/* Start action & Question Summary */}
        <div className="flex items-center gap-4 w-full xl:w-auto justify-end">
          <div className="text-right sm:text-left">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Tổng số câu chọn</p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {totalItemsToStudy} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">câu</span>
            </p>
          </div>
          <button
            onClick={onStartSession}
            disabled={!hasSelectedAnyQuestion}
            className={`px-6 py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-all duration-300 ${
              hasSelectedAnyQuestion
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200 dark:shadow-none active:scale-98 cursor-pointer'
                : 'bg-slate-300 dark:bg-slate-600 shadow-none cursor-not-allowed opacity-60'
            }`}
          >
            <Play size={18} fill="currentColor" />
            Bắt đầu học
          </button>
        </div>
      </div>

      {!hasSelectedAnyQuestion && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3">
          <AlertCircle className="shrink-0 text-amber-500 mt-0.5" size={18} />
          <div>
            <span className="font-bold">Lưu ý:</span> Bạn cần tick chọn ít nhất một phần học cụ thể (ví dụ: phần <span className="font-bold text-indigo-700 dark:text-indigo-300">Trắc nghiệm</span> hoặc <span className="font-bold text-indigo-700 dark:text-indigo-300">Từ vựng</span> trong <span className="font-bold text-indigo-700 dark:text-indigo-300">Bài 11</span>) để bắt đầu.
          </div>
        </div>
      )}

      {/* Grid containing 20 lessons with expandable sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const selectionState = getLessonSelectionState(lesson);
          const hasSections = lesson.sections.length > 0;
          
          return (
            <div
              key={lesson.id}
              className={`rounded-2xl border p-5 transition-all duration-300 bg-white dark:bg-slate-800 ${
                selectionState === 'all'
                  ? 'border-indigo-500 shadow-md shadow-indigo-50/50 dark:shadow-none'
                  : selectionState === 'partial'
                  ? 'border-purple-400 shadow-md shadow-purple-50/30 dark:shadow-none'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:shadow-slate-100/50 dark:hover:shadow-none'
              }`}
            >
              {/* Card Header representing the Lesson */}
              <div 
                onClick={() => hasSections && toggleAllLessonSections(lesson)}
                className={`flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 ${
                  hasSections ? 'cursor-pointer hover:opacity-85' : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center justify-center p-2 rounded-lg transition-colors ${
                      selectionState === 'all' || selectionState === 'partial'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Layers size={18} />
                  </span>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                    {lesson.title}
                  </h3>
                </div>

                {hasSections && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mr-1">
                      {selectionState === 'all' ? 'Đã chọn hết' : selectionState === 'partial' ? 'Chọn một phần' : 'Chọn hết'}
                    </span>
                    <input
                      type="checkbox"
                      checked={selectionState === 'all'}
                      ref={el => {
                        if (el) el.indeterminate = selectionState === 'partial';
                      }}
                      onChange={() => {}} // Controlled by click on header div
                      className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 h-4.5 w-4.5 cursor-pointer accent-indigo-600"
                    />
                  </div>
                )}
              </div>

              {/* Sections list inside the card */}
              {hasSections ? (
                <div className="mt-4 flex flex-col gap-2.5">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewTheory?.(lesson.id);
                    }}
                    className="group/item flex items-center justify-between p-3 rounded-xl border border-indigo-100 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 dark:from-indigo-950/40 dark:to-purple-950/40 text-indigo-900 dark:text-indigo-300 shadow-sm hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1.5 rounded-lg border bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800">
                        <Book size={14} className="text-indigo-600" />
                      </span>
                      <div>
                        <span className="text-xs font-bold block">Lý thuyết bài học</span>
                        <span className="text-[10px] text-indigo-400 dark:text-indigo-300 font-semibold">Tóm tắt & Trực quan</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 transition-all group-hover/item:bg-indigo-600 group-hover/item:text-white">
                        Đọc ngay
                      </span>
                    </div>
                  </div>
                  {lesson.sections.map((section) => {
                    const isSelected = selectedSectionIds.includes(section.id);
                    const sectionIcon = section.type === 'vocabulary' ? (
                      <BookOpen size={14} className="text-blue-500" />
                    ) : (
                      <HelpCircle size={14} className="text-purple-500" />
                    );
                    const typeLabel = section.type === 'vocabulary' ? 'Từ vựng' : 'Trắc nghiệm';

                    return (
                      <div
                        key={section.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section.id);
                        }}
                        className={`group/item flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50/50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 shadow-sm'
                            : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`p-1.5 rounded-lg border transition-colors ${
                            isSelected ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                          }`}>
                            {sectionIcon}
                          </span>
                          <div>
                            <span className="text-xs font-bold block">{section.title}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{typeLabel}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                          }`}>
                            {section.items.length} câu
                          </span>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // Controlled by click on row
                            className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer accent-indigo-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 py-4 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 italic">
                    Chưa có phần học nào
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
