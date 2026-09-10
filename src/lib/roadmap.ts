/**
 * Lộ trình từ hôm nay tới ngày thi (ticket 013).
 *
 * Hàm thuần, không đụng React/DOM — nhận số liệu tiến độ đang có, trả về "hôm nay làm gì" và
 * "đang ở chặng nào". Tách khỏi component vì đây là chỗ chứa toàn bộ ý đồ sư phạm, cần đọc
 * và sửa được mà không phải lội qua JSX.
 *
 * Ba nguyên tắc đằng sau cách chia chặng:
 *
 * 1. **Thẻ mới phải dừng trước ngày thi.** Một thẻ học lần đầu hôm nay cần vài lần nhắc lại
 *    (1 ngày → 6 ngày → ...) mới thật sự vào trí nhớ dài hạn. Nạp thẻ mới ở tuần cuối chỉ tạo
 *    cảm giác bận rộn, không kịp chuyển thành điểm. Mốc dừng: `NEW_CUTOFF_DAYS` ngày trước thi.
 * 2. **Làm đề sớm, không để dành.** Đề không phải bài kiểm tra cuối khoá mà là dụng cụ chẩn
 *    đoán: làm sớm mới biết hổng chỗ nào để còn kịp vá. Vì vậy chặng nào cũng có chỉ tiêu đề,
 *    chỉ khác cỡ phiên — nhấm nháp → một khối → trọn đề.
 * 3. **Nợ cũ chặn việc mới.** Câu sai chưa mổ xẻ và thẻ đến hạn luôn đứng trước việc học thêm
 *    trong danh sách hôm nay: học thêm trên nền kiến thức đang rơi rụng là đổ nước vào rổ.
 */

/** Số ngày trước kỳ thi thì ngừng nạp thẻ mới, chỉ còn ôn (xem nguyên tắc 1). */
export const NEW_CUTOFF_DAYS = 14;

export type RoadmapPhase = 'nen-tang' | 'tang-toc' | 'luyen-de' | 'chot-ha' | 'da-thi';

/** Ranh giới các chặng, tính bằng "số ngày còn lại tới ngày thi". */
const PHASE_BOUNDS: { phase: Exclude<RoadmapPhase, 'da-thi'>; minDaysLeft: number }[] = [
  { phase: 'nen-tang', minDaysLeft: 57 },
  { phase: 'tang-toc', minDaysLeft: 29 },
  { phase: 'luyen-de', minDaysLeft: 8 },
  { phase: 'chot-ha', minDaysLeft: 0 },
];

export type RoadmapActionKind = 'n3-due' | 'n3-new' | 'jlpt-review' | 'jlpt-dissect' | 'jlpt-exam' | 'jlpt-import';

export interface RoadmapTask {
  kind: RoadmapActionKind;
  label: string;
  detail: string;
  done: boolean;
  /** Việc bắt buộc của hôm nay, hay chỉ là gợi ý thêm khi còn sức. */
  optional?: boolean;
}

export interface PhaseOutline {
  phase: RoadmapPhase;
  label: string;
  /** Khoảng ngày của chặng, `YYYY-MM-DD`; `null` khi chưa đặt ngày thi. */
  from: string | null;
  to: string | null;
  focus: string;
}

export interface RoadmapInput {
  /** `ProgressSettings.examDate` — `undefined`/rỗng nghĩa là chưa đặt. */
  examDate?: string;
  /** Cho phép kiểm thử với "hôm nay" giả định. */
  today?: Date;

  n3Total: number;
  n3Studied: number;
  n3Due: number;
  newCardsToday: number;
  dailyNewLimit: number;

  jlptReviewDue: number;
  /** Số câu sai đã nộp nhưng chưa mổ xẻ (mọi đề). */
  jlptPendingReview: number;
  /** Số đề đang có trong kho trên máy. */
  examCount: number;
  submittedThisWeek: number;
  fullAttemptsThisWeek: number;
}

export interface Roadmap {
  examDate: string | null;
  /** Số ngày còn lại; âm nghĩa là ngày thi đã qua. `null` khi chưa đặt ngày thi. */
  daysLeft: number | null;
  weeksLeft: number;
  phase: RoadmapPhase;
  phaseLabel: string;
  phaseGoal: string;
  phases: PhaseOutline[];

  /** Số thẻ N3 chưa từng học. */
  remainingNew: number;
  /** Số ngày còn được nạp thẻ mới (tới mốc `NEW_CUTOFF_DAYS`). */
  daysUntilNewCutoff: number;
  /** Nhịp thẻ mới/ngày cần giữ để phủ hết giáo trình trước mốc dừng. */
  suggestedDailyNew: number;
  /** Chỉ tiêu thẻ mới của riêng hôm nay (0 ở chặng chốt hạ). */
  todayNewTarget: number;
  /** Hạn mức đang đặt có đủ để đi hết giáo trình đúng hạn không. */
  onTrack: boolean;

  weeklyExam: { target: number; done: number; label: string } | null;
  tasks: RoadmapTask[];
  /** Số việc bắt buộc đã xong / tổng — dùng cho vòng tiến độ ở trang chủ. */
  doneCount: number;
  totalCount: number;
}

const PHASE_LABELS: Record<RoadmapPhase, string> = {
  'nen-tang': 'Chặng 1 — Nền tảng',
  'tang-toc': 'Chặng 2 — Tăng tốc',
  'luyen-de': 'Chặng 3 — Luyện đề',
  'chot-ha': 'Chặng 4 — Chốt hạ',
  'da-thi': 'Ngày thi đã qua',
};

const PHASE_GOALS: Record<RoadmapPhase, string> = {
  'nen-tang':
    'Nạp vốn là chính: giữ đều nhịp thẻ mới mỗi ngày, mỗi tuần nhấm nháp một nhóm 問題 để làm quen dạng đề chứ chưa cần điểm.',
  'tang-toc':
    'Vốn đã kha khá: mỗi tuần làm trọn một khối tính giờ (文字語彙・文法 hoặc 読解) và mổ xẻ hết câu sai — đây là lúc lỗ hổng lộ ra rõ nhất.',
  'luyen-de':
    'Mỗi tuần một đề trọn vẹn, tính giờ thật. Điểm số bây giờ mới đáng nhìn; thẻ mới giảm dần để nhường chỗ cho ôn và mổ xẻ.',
  'chot-ha':
    'Dừng hẳn thẻ mới. Chỉ ôn thẻ đến hạn, ôn câu JLPT từng sai, và một lượt trọn đề đúng khung giờ thi để quen nhịp.',
  'da-thi': 'Ngày thi trong lộ trình đã qua. Đặt ngày thi mới để lộ trình tính lại từ đầu.',
};

const PHASE_FOCUS: Record<Exclude<RoadmapPhase, 'da-thi'>, string> = {
  'nen-tang': 'Thẻ mới đều tay + 1 phiên nhấm nháp/tuần',
  'tang-toc': 'Thẻ mới + 1 khối tính giờ/tuần + mổ xẻ',
  'luyen-de': '1 đề trọn vẹn/tuần + mổ xẻ + ôn',
  'chot-ha': 'Không thẻ mới — chỉ ôn + 1 đề đúng khung giờ',
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** `YYYY-MM-DD` theo lịch địa phương — cùng quy ước với `todayKey()` ở useProgress.tsx. */
export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Đọc `YYYY-MM-DD` thành Date lúc nửa đêm ĐỊA PHƯƠNG (`new Date('2026-12-05')` là UTC — lệch múi giờ). */
export function parseDateKey(key: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key.trim());
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function shiftDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Số ngày trọn vẹn từ `from` tới `to`, theo lịch địa phương (không bị lệch vì giờ mùa hè). */
export function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);
}

export function phaseOf(daysLeft: number): RoadmapPhase {
  if (daysLeft < 0) return 'da-thi';
  for (const b of PHASE_BOUNDS) {
    if (daysLeft >= b.minDaysLeft) return b.phase;
  }
  return 'chot-ha';
}

/** Ngày Việt hoá ngắn gọn, ví dụ "5/12/2026". */
export function formatVnDate(key: string | null): string {
  const d = key ? parseDateKey(key) : null;
  return d ? d.toLocaleDateString('vi-VN') : '—';
}

function buildPhaseOutlines(exam: Date | null): PhaseOutline[] {
  const mk = (phase: Exclude<RoadmapPhase, 'da-thi'>, fromOffset: number | null, toOffset: number): PhaseOutline => ({
    phase,
    label: PHASE_LABELS[phase],
    from: exam && fromOffset !== null ? toDateKey(shiftDays(exam, fromOffset)) : null,
    to: exam ? toDateKey(shiftDays(exam, toOffset)) : null,
    focus: PHASE_FOCUS[phase],
  });

  return [
    // Chặng 1 không có mốc bắt đầu cố định — nó bắt đầu từ ngày người học mở lộ trình.
    mk('nen-tang', null, -57),
    mk('tang-toc', -56, -29),
    mk('luyen-de', -28, -8),
    mk('chot-ha', -7, 0),
  ];
}

/** Chỉ tiêu luyện đề của tuần này, theo chặng. */
function weeklyExamFor(
  phase: RoadmapPhase,
  input: RoadmapInput
): { target: number; done: number; label: string } | null {
  if (phase === 'da-thi') return null;
  if (phase === 'nen-tang') {
    return { target: 1, done: input.submittedThisWeek, label: 'Nhấm nháp 1 nhóm 問題 (≈5 phút)' };
  }
  if (phase === 'tang-toc') {
    return { target: 1, done: input.submittedThisWeek, label: 'Làm trọn 1 khối tính giờ' };
  }
  // luyen-de / chot-ha: phải là lượt TRỌN ĐỀ, không tính lượt nhấm nháp cho đủ chỉ tiêu.
  return { target: 1, done: input.fullAttemptsThisWeek, label: 'Làm 1 đề trọn vẹn, tính giờ' };
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const today = startOfDay(input.today ?? new Date());
  const exam = input.examDate ? parseDateKey(input.examDate) : null;
  const daysLeft = exam ? daysBetween(today, exam) : null;

  // Chưa đặt ngày thi thì coi như đang ở chặng nền tảng: vẫn khuyên được việc hàng ngày,
  // chỉ là không nói được "còn bao nhiêu ngày".
  const phase: RoadmapPhase = daysLeft === null ? 'nen-tang' : phaseOf(daysLeft);

  const remainingNew = Math.max(0, input.n3Total - input.n3Studied);
  const daysUntilNewCutoff =
    daysLeft === null ? 60 : Math.max(0, daysLeft - NEW_CUTOFF_DAYS);
  const suggestedDailyNew =
    remainingNew === 0 ? 0 : Math.ceil(remainingNew / Math.max(1, daysUntilNewCutoff));

  // Chặng chốt hạ: chỉ tiêu thẻ mới bằng 0 (nguyên tắc 1). Các chặng khác lấy đúng hạn mức
  // đang đặt, nhưng không đòi nhiều hơn số thẻ thật sự còn lại.
  const todayNewTarget =
    phase === 'chot-ha' || phase === 'da-thi'
      ? 0
      : Math.min(input.dailyNewLimit, remainingNew);

  const weeklyExam = weeklyExamFor(phase, input);
  const tasks: RoadmapTask[] = [];

  // Nợ cũ trước (nguyên tắc 3).
  if (input.jlptPendingReview > 0) {
    tasks.push({
      kind: 'jlpt-dissect',
      label: `Mổ xẻ ${input.jlptPendingReview} câu sai còn tồn`,
      detail: 'Nộp bài chỉ là lấy dữ liệu; mổ xẻ mới là chỗ tạo ra học tập thật.',
      done: false,
    });
  }

  tasks.push({
    kind: 'n3-due',
    label: input.n3Due > 0 ? `Ôn ${input.n3Due} thẻ N3 đến hạn` : 'Ôn thẻ N3 đến hạn',
    detail: 'Ôn đúng lúc sắp quên là cách nhớ lâu nhất — và là việc rẻ nhất trong ngày.',
    done: input.n3Due === 0,
  });

  if (input.jlptReviewDue > 0) {
    tasks.push({
      kind: 'jlpt-review',
      label: `Ôn ${input.jlptReviewDue} câu JLPT đến hạn`,
      detail: 'Câu ngữ pháp/đọc hiểu từng làm, nay tới lúc nhắc lại.',
      done: false,
    });
  }

  if (todayNewTarget > 0) {
    tasks.push({
      kind: 'n3-new',
      label: `Học ${todayNewTarget} thẻ N3 mới`,
      detail:
        suggestedDailyNew > input.dailyNewLimit
          ? `Cần ${suggestedDailyNew} thẻ/ngày mới kịp phủ hết giáo trình trước mốc ngừng nạp — hạn mức đang đặt là ${input.dailyNewLimit}.`
          : `Còn ${remainingNew} thẻ chưa học, ${daysUntilNewCutoff} ngày trước mốc ngừng nạp thẻ mới.`,
      done: input.newCardsToday >= todayNewTarget,
    });
  }

  if (input.examCount === 0) {
    tasks.push({
      kind: 'jlpt-import',
      label: 'Nhập đề JLPT đầu tiên',
      detail: 'Chưa có đề nào trên máy thì cả nhánh luyện đề của lộ trình không chạy được.',
      done: false,
    });
  } else if (weeklyExam) {
    tasks.push({
      kind: 'jlpt-exam',
      label: weeklyExam.label,
      detail: `Chỉ tiêu tuần này: ${weeklyExam.done}/${weeklyExam.target} lượt.`,
      done: weeklyExam.done >= weeklyExam.target,
      // Việc của cả TUẦN, không phải của riêng hôm nay — không nên hiện như một món nợ
      // mỗi sáng, nhưng cũng không được biến mất khỏi tầm mắt.
      optional: true,
    });
  }

  const required = tasks.filter((t) => !t.optional);

  return {
    examDate: input.examDate || null,
    daysLeft,
    weeksLeft: daysLeft === null ? 0 : Math.max(0, Math.ceil(daysLeft / 7)),
    phase,
    phaseLabel: PHASE_LABELS[phase],
    phaseGoal: PHASE_GOALS[phase],
    phases: buildPhaseOutlines(exam),
    remainingNew,
    daysUntilNewCutoff,
    suggestedDailyNew,
    todayNewTarget,
    onTrack: suggestedDailyNew <= input.dailyNewLimit,
    weeklyExam,
    tasks,
    doneCount: required.filter((t) => t.done).length,
    totalCount: required.length,
  };
}
