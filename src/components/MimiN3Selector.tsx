import React, { useState, useMemo } from 'react';
import type { Lesson, StudyItem } from '../data/lessons';
import {
  CheckSquare,
  Square,
  Play,
  ArrowLeft,
  Hash,
  Layers,
  Sliders,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';

interface MimiN3SelectorProps {
  lessons: Lesson[];
  onStartBySections: (sectionIds: string[]) => void;
  onStartByRange: (fromIndex: number, toIndex: number) => void;
  onBackToHome: () => void;
}

const PRESET_RANGES = [
  { label: 'Từ 1 - 100', from: 1, to: 100 },
  { label: 'Từ 101 - 200', from: 101, to: 200 },
  { label: 'Từ 201 - 300', from: 201, to: 300 },
  { label: 'Từ 301 - 400', from: 301, to: 400 },
  { label: 'Từ 401 - 500', from: 401, to: 500 },
  { label: 'Từ 501 - 600', from: 501, to: 600 },
  { label: 'Từ 601 - 700', from: 601, to: 700 },
  { label: 'Từ 701 - 800', from: 701, to: 800 },
  { label: 'Từ 801 - 880', from: 801, to: 880 },
  { label: 'Tất cả (1 - 880)', from: 1, to: 880 },
];

export const MimiN3Selector: React.FC<MimiN3SelectorProps> = ({
  lessons,
  onStartBySections,
  onStartByRange,
  onBackToHome,
}) => {
  const [selectMode, setSelectMode] = useState<'lessons' | 'range'>('lessons');

  // State for Mode 1: Selected Section IDs
  const allSectionIds = useMemo(() => {
    return lessons.flatMap((l) => l.sections.map((s) => s.id));
  }, [lessons]);

  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>(allSectionIds);

  // State for Mode 2: Range
  const totalItemsCount = useMemo(() => {
    return lessons.reduce((acc, l) => acc + l.sections.reduce((sAcc, s) => sAcc + s.items.length, 0), 0);
  }, [lessons]);

  const [fromIndex, setFromIndex] = useState<number>(1);
  const [toIndex, setToIndex] = useState<number>(100);

  // Preview List controls
  const [showWordList, setShowWordList] = useState<boolean>(true);
  const [previewSearch, setPreviewSearch] = useState<string>('');

  // 1. Flatten all 880 items with global 1-based numbering #1 -> #880
  const allFlatItemsWithNumber = useMemo(() => {
    let globalCounter = 1;
    const list: { globalNum: number; item: StudyItem; lessonTitle: string; lessonId: number }[] = [];
    lessons.forEach((lesson) => {
      lesson.sections.forEach((section) => {
        section.items.forEach((item) => {
          list.push({
            globalNum: globalCounter++,
            item,
            lessonTitle: lesson.title,
            lessonId: lesson.id,
          });
        });
      });
    });
    return list;
  }, [lessons]);

  // 2. Filter selected items based on Mode 1 or Mode 2
  const selectedWordList = useMemo(() => {
    if (selectMode === 'lessons') {
      const validSections = new Set(selectedSectionIds);
      const list: typeof allFlatItemsWithNumber = [];
      lessons.forEach((lesson) => {
        lesson.sections.forEach((section) => {
          if (validSections.has(section.id)) {
            section.items.forEach((item) => {
              const found = allFlatItemsWithNumber.find((f) => f.item.id === item.id);
              if (found) list.push(found);
            });
          }
        });
      });
      return list;
    } else {
      const validFrom = Math.max(1, Math.min(fromIndex, totalItemsCount));
      const validTo = Math.min(totalItemsCount, Math.max(validFrom, toIndex));
      return allFlatItemsWithNumber.slice(validFrom - 1, validTo);
    }
  }, [selectMode, selectedSectionIds, fromIndex, toIndex, lessons, allFlatItemsWithNumber, totalItemsCount]);

  // 3. Search inside preview list
  const filteredPreviewList = useMemo(() => {
    const q = previewSearch.toLowerCase().trim();
    if (!q) return selectedWordList;
    return selectedWordList.filter(
      (entry) =>
        entry.globalNum.toString().includes(q) ||
        (entry.item.term && entry.item.term.toLowerCase().includes(q)) ||
        (entry.item.reading && entry.item.reading.toLowerCase().includes(q)) ||
        (entry.item.meaning && entry.item.meaning.toLowerCase().includes(q)) ||
        entry.lessonTitle.toLowerCase().includes(q)
    );
  }, [selectedWordList, previewSearch]);

  const toggleAllLessonSections = (lesson: Lesson) => {
    const lessonSectionIds = lesson.sections.map((s) => s.id);
    const allSelected = lessonSectionIds.every((id) => selectedSectionIds.includes(id));
    if (allSelected) {
      setSelectedSectionIds((prev) => prev.filter((id) => !lessonSectionIds.includes(id)));
    } else {
      setSelectedSectionIds((prev) => Array.from(new Set([...prev, ...lessonSectionIds])));
    }
  };

  const handleStart = () => {
    if (selectMode === 'lessons') {
      if (selectedSectionIds.length > 0) {
        onStartBySections(selectedSectionIds);
      }
    } else {
      const validFrom = Math.max(1, Math.min(fromIndex, totalItemsCount));
      const validTo = Math.min(totalItemsCount, Math.max(validFrom, toIndex));
      onStartByRange(validFrom, validTo);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="relative text-center">
        <button
          onClick={onBackToHome}
          className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 mb-4 sm:mb-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Tất cả môn học</span>
        </button>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 bg-clip-text text-transparent">
          Mimi Kara Oboeru N3 Goi
        </h1>
        <p className="mt-2 text-sm md:text-base font-semibold text-slate-500 max-w-xl mx-auto">
          耳から覚える N3 語彙 (Trọn bộ {totalItemsCount} từ vựng)
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="bg-slate-200/70 p-1.5 rounded-2xl flex items-center max-w-md mx-auto">
        <button
          onClick={() => setSelectMode('lessons')}
          className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectMode === 'lessons'
              ? 'bg-white text-emerald-700 shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers size={16} />
          <span>1. Chọn theo Bài học</span>
        </button>
        <button
          onClick={() => setSelectMode('range')}
          className={`flex-1 py-3 rounded-xl text-xs md:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectMode === 'range'
              ? 'bg-white text-emerald-700 shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders size={16} />
          <span>2. Chọn theo Số từ (Range)</span>
        </button>
      </div>

      {/* MODE 1: CHỌN THEO BÀI HỌC */}
      {selectMode === 'lessons' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSectionIds(allSectionIds)}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckSquare size={14} />
                Chọn tất cả {lessons.length} bài
              </button>
              <button
                onClick={() => setSelectedSectionIds([])}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Square size={14} />
                Bỏ chọn hết
              </button>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
                Tổng số từ chọn học
              </span>
              <span className="text-lg font-black text-emerald-700">
                {selectedWordList.length} / {totalItemsCount} từ
              </span>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => {
              const lessonSectionIds = lesson.sections.map((s) => s.id);
              const isAllSelected = lessonSectionIds.every((id) => selectedSectionIds.includes(id));
              const isSomeSelected = lessonSectionIds.some((id) => selectedSectionIds.includes(id));
              const wordCount = lesson.sections.reduce((acc, s) => acc + s.items.length, 0);

              return (
                <div
                  key={lesson.id}
                  onClick={() => toggleAllLessonSections(lesson)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isAllSelected
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                      : isSomeSelected
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={() => {}}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4.5 w-4.5 cursor-pointer accent-emerald-600"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">{lesson.title}</h4>
                      <span className="text-xs font-semibold text-slate-400">{wordCount} từ vựng</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    Bài {lesson.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 2: CHỌN THEO RANGE SỐ TỪ */}
      {selectMode === 'range' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 max-w-3xl mx-auto border border-emerald-100 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg">
              <Hash className="w-5 h-5 text-emerald-600" />
              <span>Nhập khoảng số từ cần học (1 - {totalItemsCount})</span>
            </div>

            {/* Inputs From and To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Từ số từ (From)
                </label>
                <input
                  type="number"
                  min={1}
                  max={totalItemsCount}
                  value={fromIndex}
                  onChange={(e) => setFromIndex(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-bold text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Đến số từ (To)
                </label>
                <input
                  type="number"
                  min={1}
                  max={totalItemsCount}
                  value={toIndex}
                  onChange={(e) => setToIndex(parseInt(e.target.value, 10) || totalItemsCount)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 font-bold text-base"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
              <span className="text-sm font-bold text-emerald-900">
                Sẽ học <span className="text-emerald-700 text-xl font-black">{selectedWordList.length}</span> từ (Từ thẻ #{fromIndex} đến #{toIndex})
              </span>
            </div>

            {/* Quick Presets */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Hoặc chọn nhanh theo khoảng có sẵn:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {PRESET_RANGES.map((preset) => {
                  const isCurrent = fromIndex === preset.from && toIndex === preset.to;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setFromIndex(preset.from);
                        setToIndex(preset.to);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION PREVIEW LIST OF NUMBERED WORDS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden transition-all">
        {/* Preview Panel Header Bar */}
        <div
          onClick={() => setShowWordList((prev) => !prev)}
          className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs">
              <CheckCircle2 size={16} />
            </span>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <span>Danh sách Confirm các từ sẽ học</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/30">
                  {selectedWordList.length} từ
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Đã đánh số thứ tự từ #1 đến #{totalItemsCount}. Kiểm tra danh sách trước khi vào Flashcard.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1">
              <span>{showWordList ? 'Thu gọn' : 'Xem danh sách'}</span>
              {showWordList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Preview Content Area */}
        {showWordList && (
          <div className="p-4 md:p-6 space-y-4 bg-slate-50/50">
            {/* Search Filter for Preview */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={previewSearch}
                onChange={(e) => setPreviewSearch(e.target.value)}
                placeholder="Lọc từ trong danh sách sẽ học (ví dụ: 男性, #45, だんせい)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {previewSearch && (
                <button
                  onClick={() => setPreviewSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Scrollable Word Table */}
            {filteredPreviewList.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-bold">
                Không có từ vựng nào khớp với bộ lọc tìm kiếm
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto border border-slate-200 rounded-2xl bg-white shadow-inner scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 w-16 text-center">STT (#)</th>
                      <th className="py-3 px-4 w-32">Chữ Hán (Kanji)</th>
                      <th className="py-3 px-4 w-32">Cách đọc (Reading)</th>
                      <th className="py-3 px-4">Ý nghĩa (Meaning)</th>
                      <th className="py-3 px-4 w-28 text-right">Bài học</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredPreviewList.map((entry) => (
                      <tr key={entry.item.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-2.5 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[11px]">
                            #{entry.globalNum}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-black text-slate-900 text-sm">
                          {entry.item.term}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-emerald-700">
                          {entry.item.reading || '-'}
                        </td>
                        <td className="py-2.5 px-4 text-slate-700 leading-snug">
                          {entry.item.meaning || entry.item.answer}
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-400 font-bold text-[11px]">
                          Bài {entry.lessonId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold px-1">
              <span>Hiển thị {filteredPreviewList.length} / {selectedWordList.length} từ chọn</span>
              <span>Đã sẵn sàng confirm để vào học Flashcard</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Start Action CTA Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleStart}
          disabled={selectedWordList.length === 0}
          className={`px-10 py-4 rounded-2xl font-black text-lg text-white shadow-xl flex items-center gap-3 transition-all duration-300 ${
            selectedWordList.length > 0
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-200 active:scale-98 cursor-pointer'
              : 'bg-slate-300 shadow-none cursor-not-allowed opacity-60'
          }`}
        >
          <Play size={22} fill="currentColor" />
          <span>
            Bắt đầu học Flashcard ({selectedWordList.length} từ)
          </span>
        </button>
      </div>
    </div>
  );
};
