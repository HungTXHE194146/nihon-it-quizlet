import React, { useMemo, useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { itemByKey } from '../lib/itemIndex';
import { isLeech, formatInterval, LEECH_THRESHOLD } from '../lib/srs';
import { subjects } from '../data/subjects';
import {
  ArrowLeft,
  AlertTriangle,
  Play,
  Search,
  Flame,
  BookOpen,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

interface MistakeNotebookProps {
  onBackToHome: () => void;
  onStartReview: (subjectId: string) => void;
}

/**
 * Sổ tay câu sai gộp mọi môn.
 *
 * Trước đây "học lại câu sai" chỉ tồn tại trong một phiên; ở đây mọi câu từng trả lời sai
 * đều được giữ lại kèm số lần sai, và thẻ sai từ 3 lần trở lên bị đánh dấu "leech".
 */
export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  onBackToHome,
  onStartReview,
}) => {
  const { data, buildMistakeQueue } = useProgress();
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [leechOnly, setLeechOnly] = useState(false);

  const rows = useMemo(() => {
    return buildMistakeQueue(subjectFilter)
      .map((key) => {
        const entry = itemByKey.get(key);
        const card = data.cards[key];
        if (!entry || !card) return null;
        return { key, entry, card };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [buildMistakeQueue, subjectFilter, data.cards]);

  const filteredRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    return rows.filter(({ entry, card }) => {
      if (leechOnly && !isLeech(card)) return false;
      if (!q) return true;
      const item = entry.item;
      return (
        (item.term && item.term.toLowerCase().includes(q)) ||
        (item.question && item.question.toLowerCase().includes(q)) ||
        (item.meaning && item.meaning.toLowerCase().includes(q)) ||
        item.answer.toLowerCase().includes(q) ||
        entry.lessonTitle.toLowerCase().includes(q)
      );
    });
  }, [rows, search, leechOnly]);

  const leechCount = useMemo(() => rows.filter((r) => isLeech(r.card)).length, [rows]);

  const subjectOptions = useMemo(
    () => [{ id: 'all', title: 'Tất cả môn' }, ...subjects.map((s) => ({ id: s.id, title: s.title }))],
    []
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative text-center mb-8">
        <button
          onClick={onBackToHome}
          className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 mb-4 sm:mb-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Trang chủ</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
          Sổ Tay Câu Sai
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Mọi câu bạn từng trả lời sai, gộp từ tất cả các môn
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-lg font-extrabold text-slate-800 mb-1">Sổ tay đang trống</h3>
          <p className="text-sm text-slate-500 mb-6">
            Bạn chưa trả lời sai câu nào — hoặc chưa bắt đầu học. Cứ học bình thường, câu sai sẽ tự
            được ghi lại ở đây.
          </p>
          <button
            onClick={onBackToHome}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer text-sm"
          >
            Chọn môn để học
          </button>
        </div>
      ) : (
        <>
          {/* Thanh thống kê & hành động */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-black text-rose-600">{rows.length}</p>
              <p className="text-xs font-bold text-slate-500">Câu từng sai</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-black text-orange-600">{leechCount}</p>
              <p className="text-xs font-bold text-slate-500">Thẻ cứng đầu (leech)</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-2xl font-black text-slate-800">
                {rows.reduce((acc, r) => acc + r.card.wrong, 0)}
              </p>
              <p className="text-xs font-bold text-slate-500">Tổng lượt sai</p>
            </div>
            <button
              onClick={() => onStartReview(subjectFilter)}
              className="rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white p-4 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-100 hover:from-rose-700 hover:to-red-700 active:scale-95 transition-all cursor-pointer"
            >
              <Play size={17} fill="currentColor" />
              Học lại {rows.length} câu
            </button>
          </div>

          {/* Bộ lọc */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm trong sổ tay..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
              />
            </div>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-200 cursor-pointer"
            >
              {subjectOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => setLeechOnly((v) => !v)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-2 ${
                leechOnly
                  ? 'bg-orange-100 text-orange-800 border-orange-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={`Chỉ hiện thẻ đã quên từ ${LEECH_THRESHOLD} lần trở lên`}
            >
              <Flame size={14} />
              Chỉ leech
            </button>
          </div>

          {/* Danh sách */}
          {filteredRows.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500 font-semibold">
              Không có câu nào khớp bộ lọc hiện tại.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredRows.map(({ key, entry, card }) => {
                const leech = isLeech(card);
                const item = entry.item;
                return (
                  <div
                    key={key}
                    className={`bg-white rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between transition-all ${
                      leech ? 'border-orange-300 bg-orange-50/30' : 'border-slate-200'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                          {entry.subjectTitle}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <BookOpen size={11} />
                          {entry.lessonTitle}
                        </span>
                        {leech && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                            <Flame size={10} />
                            Leech
                          </span>
                        )}
                      </div>

                      <p className="font-bold text-slate-800 text-sm leading-snug truncate">
                        {item.term || item.question || '(Câu hỏi bằng hình ảnh)'}
                      </p>
                      <p className="text-xs text-slate-500 font-semibold mt-0.5 truncate">
                        Đáp án: <span className="text-emerald-700 font-bold">{item.meaning || item.answer}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-black text-rose-600 flex items-center gap-1 justify-end">
                          <AlertTriangle size={12} />
                          Sai {card.wrong} lần
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">{formatInterval(card)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-6 text-center text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5">
            <Trash2 size={12} />
            Trả lời đúng một câu trong sổ tay sẽ đẩy nó ra xa trong lịch ôn, nhưng lịch sử sai vẫn
            được giữ để bạn biết đâu là điểm yếu.
          </p>
        </>
      )}
    </div>
  );
};
