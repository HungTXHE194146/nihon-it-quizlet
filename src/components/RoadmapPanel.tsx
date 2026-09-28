import React, { useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronDown,
  Flag,
  Target,
  ArrowRight,
  AlertTriangle,
  Pencil,
} from 'lucide-react';
import type { Roadmap, RoadmapActionKind, RoadmapPhase } from '../lib/roadmap';
import { formatVnDate, NEW_CUTOFF_DAYS } from '../lib/roadmap';

interface RoadmapPanelProps {
  roadmap: Roadmap;
  dailyNewLimit: number;
  onChangeExamDate: (isoDate: string) => void;
  onChangeDailyNewLimit: (limit: number) => void;
  onRunTask: (kind: RoadmapActionKind) => void;
}

const PHASE_TONE: Record<RoadmapPhase, string> = {
  'nen-tang': 'from-emerald-600 to-teal-700',
  'tang-toc': 'from-sky-600 to-indigo-700',
  'luyen-de': 'from-amber-600 to-orange-700',
  'chot-ha': 'from-rose-600 to-red-700',
  'da-thi': 'from-slate-600 to-slate-800',
};

/**
 * Lộ trình tới ngày thi ở trang chủ (ticket 013).
 *
 * Trả lời hai câu khác nhau mà khối "Hôm nay" không trả lời được:
 * "tôi đang ở đâu trong kế hoạch" và "chặng này khác chặng trước ở chỗ nào".
 * Khối "Hôm nay" vẫn giữ nguyên vai trò của nó: MỘT hành động kế tiếp, không phải một bảng kế hoạch.
 */
export const RoadmapPanel: React.FC<RoadmapPanelProps> = ({
  roadmap,
  dailyNewLimit,
  onChangeExamDate,
  onChangeDailyNewLimit,
  onRunTask,
}) => {
  const [editingDate, setEditingDate] = useState(false);
  const [showAllPhases, setShowAllPhases] = useState(false);

  const { daysLeft, phase, tasks, doneCount, totalCount } = roadmap;
  const allDone = totalCount > 0 && doneCount === totalCount;

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      {/* Đầu bảng: đếm ngược + chặng hiện tại */}
      <div className={`bg-gradient-to-br ${PHASE_TONE[phase]} text-white p-6 md:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5" />
              Lộ trình tới ngày thi
            </p>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              {daysLeft === null
                ? 'Chưa đặt ngày thi'
                : daysLeft < 0
                ? 'Ngày thi đã qua'
                : daysLeft === 0
                ? 'Hôm nay là ngày thi'
                : `Còn ${daysLeft} ngày`}
            </h2>
            <p className="text-sm font-semibold text-white/80 mt-1">
              {roadmap.phaseLabel}
              {daysLeft !== null && daysLeft > 0 && ` · ${roadmap.weeksLeft} tuần · thi ${formatVnDate(roadmap.examDate)}`}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <div className="inline-flex flex-col items-center px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <span className="text-2xl font-black leading-none">
                {doneCount}/{totalCount}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-0.5">
                việc hôm nay
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/85 font-medium leading-relaxed mt-4 max-w-2xl">
          {roadmap.phaseGoal}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {editingDate ? (
            <input
              type="date"
              defaultValue={roadmap.examDate ?? ''}
              autoFocus
              onBlur={(e) => {
                if (e.target.value) onChangeExamDate(e.target.value);
                setEditingDate(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
                if (e.key === 'Escape') setEditingDate(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-bold border border-white/30"
            />
          ) : (
            <button
              onClick={() => setEditingDate(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition-all cursor-pointer"
            >
              <Pencil className="w-3 h-3" />
              {roadmap.examDate ? 'Đổi ngày thi' : 'Đặt ngày thi'}
            </button>
          )}

          <button
            onClick={() => setShowAllPhases((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition-all cursor-pointer"
          >
            {showAllPhases ? 'Ẩn' : 'Xem'} cả 4 chặng
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllPhases ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showAllPhases && (
          <div className="mt-4 pt-4 border-t border-white/15 grid gap-2 sm:grid-cols-2">
            {roadmap.phases.map((p) => (
              <div
                key={p.phase}
                className={`rounded-2xl p-3 border ${
                  p.phase === phase ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10'
                }`}
              >
                <p className="text-xs font-extrabold">{p.label}</p>
                <p className="text-[11px] font-semibold text-white/70 mt-0.5">
                  {p.from ? `${formatVnDate(p.from)} → ` : 'Từ hôm nay → '}
                  {formatVnDate(p.to)}
                </p>
                <p className="text-[11px] font-medium text-white/85 mt-1 leading-relaxed">{p.focus}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Việc hôm nay, theo đúng thứ tự nên làm */}
      <div className="p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Hôm nay theo lộ trình
          </p>
          {allDone && (
            <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">
              Xong hết phần bắt buộc 🎉
            </span>
          )}
        </div>

        {tasks.map((task) => (
          <button
            key={task.kind}
            onClick={() => onRunTask(task.kind)}
            className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer group ${
              task.done
                ? 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900'
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-white dark:bg-slate-900/60 dark:border-slate-700 dark:hover:border-indigo-700'
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center border-2 ${
                task.done
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-300 dark:border-slate-600'
              }`}
            >
              {task.done && <Check size={12} strokeWidth={4} />}
            </span>

            <span className="min-w-0 flex-1">
              <span
                className={`block text-sm font-extrabold ${
                  task.done
                    ? 'text-emerald-800 dark:text-emerald-300 line-through decoration-emerald-400/60'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {task.label}
                {task.optional && (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    cả tuần
                  </span>
                )}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {task.detail}
              </span>
            </span>

            {!task.done && (
              <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
            )}
          </button>
        ))}

        {/* Nhịp thẻ mới: chỉ cảnh báo khi hạn mức đang đặt KHÔNG đủ để đi hết giáo trình.
            Không có cảnh báo này thì người học vẫn tick đủ việc mỗi ngày mà tới ngày thi
            vẫn còn vài trăm thẻ chưa từng nhìn thấy. */}
        {!roadmap.onTrack && roadmap.remainingNew > 0 && (
          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
            <p className="text-xs font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
              <AlertTriangle size={14} />
              Nhịp hiện tại không kịp phủ hết giáo trình
            </p>
            <p className="text-[11px] font-semibold text-amber-900/80 dark:text-amber-200/80 leading-relaxed mb-3">
              Còn {roadmap.remainingNew} thẻ N3 chưa học và {roadmap.daysUntilNewCutoff} ngày trước mốc
              ngừng nạp thẻ mới ({NEW_CUTOFF_DAYS} ngày trước thi) → cần{' '}
              <strong>{roadmap.suggestedDailyNew} thẻ mới/ngày</strong>, trong khi hạn mức đang đặt là{' '}
              {dailyNewLimit}. Hoặc nâng hạn mức, hoặc chấp nhận học có chọn lọc phần còn lại.
            </p>
            <button
              onClick={() => onChangeDailyNewLimit(roadmap.suggestedDailyNew)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-extrabold hover:bg-amber-700 active:scale-95 transition-all cursor-pointer"
            >
              <Target size={13} />
              Đặt hạn mức {roadmap.suggestedDailyNew} thẻ/ngày
            </button>
          </div>
        )}

        {roadmap.phase === 'chot-ha' && (
          <p className="mt-3 text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <CalendarDays size={13} />
            Tuần cuối: lộ trình đã tự bỏ mục học thẻ mới — thẻ học hôm nay không kịp vào trí nhớ dài hạn.
          </p>
        )}
      </div>
    </div>
  );
};
