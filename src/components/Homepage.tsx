import React, { useState, useMemo, useRef } from 'react';
import { subjectMeta, subjectsOfTrack, N3_SCOPE } from '../data/subjectMeta';
import type { SubjectMeta } from '../data/subjectMeta';
import { useProgress } from '../hooks/useProgress';
import { useJlptSummary } from '../hooks/useJlptSummary';
import { InstallButton } from './PWAPrompt';
import { SyncButton } from './SyncLogin';
import {
  Code,
  Languages,
  Globe,
  Database,
  Award,
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Zap,
  Flame,
  Clock,
  Play,
  AlertTriangle,
  CalendarCheck,
  Download,
  Upload,
  Trash2,
  Target,
  FileJson,
  ClipboardList,
  ChevronDown,
  Timer,
} from 'lucide-react';

interface HomepageProps {
  onSelectSubject: (subjectId: string, directFlashcard?: boolean) => void;
  /** Mở phiên ôn theo lịch SRS cho một phạm vi ("n3" = gộp các môn N3, "all" = mọi môn). */
  onStartReview: (scope: string) => void;
  onOpenMistakes: () => void;
  onOpenJlptImport: () => void;
  onOpenJlptExam: (examId: string) => void;
}

const N3_SUBJECTS = subjectsOfTrack('n3');
const OTHER_SUBJECTS = subjectsOfTrack('it');

function matchesQuery(subject: SubjectMeta, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return (
    subject.title.toLowerCase().includes(q) ||
    (subject.japaneseTitle?.toLowerCase().includes(q) ?? false) ||
    subject.description.toLowerCase().includes(q) ||
    subject.category.toLowerCase().includes(q)
  );
}

/**
 * Trang chủ lấy việc luyện thi N3 làm trục chính: hàng đợi ôn N3 hôm nay, phòng thi JLPT,
 * rồi mới tới hai môn IT/tiếng Anh (vẫn dùng được đầy đủ, chỉ nằm ở khu phụ bên dưới).
 */
export const Homepage: React.FC<HomepageProps> = ({
  onSelectSubject,
  onStartReview,
  onOpenMistakes,
  onOpenJlptImport,
  onOpenJlptExam,
}) => {
  const { data, statsFor, todayStat, exportData, importData, resetAll } = useProgress();
  const jlpt = useJlptSummary();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOthers, setShowOthers] = useState(false);
  const [dataMessage, setDataMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const n3Stats = useMemo(() => statsFor(N3_SCOPE), [statsFor]);
  const allStats = useMemo(() => statsFor('all'), [statsFor]);
  // Thẻ đến hạn nằm ngoài nhánh N3: chỉ nhắc khi thực sự có, để trang chủ không kéo sự chú
  // ý ra khỏi việc luyện thi.
  const otherDue = allStats.due - n3Stats.due;
  const isNewLearner = n3Stats.studied === 0;
  const firstSessionSize = Math.min(data.settings.dailyNewLimit, n3Stats.total);

  const perSubjectStats = useMemo(
    () => Object.fromEntries(subjectMeta.map((s) => [s.id, statsFor(s.id)])),
    [statsFor]
  );

  const n3Matches = useMemo(() => N3_SUBJECTS.filter((s) => matchesQuery(s, searchQuery)), [searchQuery]);
  const otherMatches = useMemo(() => OTHER_SUBJECTS.filter((s) => matchesQuery(s, searchQuery)), [searchQuery]);

  const handleExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nihonit-tien-do-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDataMessage('Đã tải file tiến độ về máy.');
  };

  const handleImportFile = async (file: File) => {
    const text = await file.text();
    const res = importData(text);
    setDataMessage(res.message);
  };

  const handleReset = () => {
    if (window.confirm('Xoá toàn bộ tiến độ học, chuỗi ngày và sổ tay câu sai? Không thể hoàn tác.')) {
      resetAll();
      setDataMessage('Đã xoá toàn bộ tiến độ.');
    }
  };

  const renderIcon = (iconType: SubjectMeta['icon']) => {
    switch (iconType) {
      case 'code':
        return <Code className="w-6 h-6" />;
      case 'languages':
        return <Languages className="w-6 h-6" />;
      case 'globe':
        return <Globe className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'award':
        return <Award className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const renderSubjectCard = (subject: SubjectMeta) => {
    const st = perSubjectStats[subject.id];
    const percent = st && st.total > 0 ? Math.round((st.mature / st.total) * 100) : 0;

    return (
      <div
        key={subject.id}
        onClick={() => subject.isAvailable && onSelectSubject(subject.id, subject.isFlashcardOnly)}
        className={`group relative bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
          subject.isAvailable
            ? 'border-slate-200/80 hover:border-indigo-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            : 'border-slate-200 bg-slate-50/70 opacity-80 cursor-not-allowed'
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div
              className={`p-3 rounded-2xl bg-gradient-to-br ${subject.gradient} text-white shadow-md transition-transform group-hover:scale-105`}
            >
              {renderIcon(subject.icon)}
            </div>

            {subject.badge && (
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-200 text-slate-700">
                {subject.badge}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {subject.title}
            </h3>
            {subject.japaneseTitle && (
              <p className="text-xs font-semibold text-slate-400 mt-0.5">{subject.japaneseTitle}</p>
            )}
          </div>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{subject.description}</p>
        </div>

        {st && st.studied > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3 text-emerald-500" />
                Đã thuộc {percent}%
              </span>
              {st.due > 0 && <span className="text-indigo-600">{st.due} thẻ đến hạn</span>}
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              {subject.totalLessons} bài
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              {subject.totalItems} mục
            </span>
          </div>

          {subject.isAvailable ? (
            <button className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all">
              <span>Vào học</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Sắp ra mắt
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-10">
      {/* Hero: xác định rõ web này để làm gì — luyện thi N3 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950 text-white p-8 md:p-12 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Luyện thi JLPT N3 — từ vựng, Kanji và đề thi thử</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-emerald-100 to-indigo-200 bg-clip-text text-transparent">
            Mỗi ngày một phiên N3, đúng lúc sắp quên
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Từ vựng Mimi Kara Oboeru và Kanji Master N3 gộp chung một lịch ôn ngắt quãng, cộng
            phòng thi JLPT để đo xem mình đang ở đâu trước ngày thi.
          </p>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm giáo trình (Mimi N3, Kanji Master, JIT401...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all text-sm font-medium shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800/60 px-2 py-1 rounded-lg"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-emerald-300">{n3Stats.total}</span>
            <span className="text-xs text-slate-400 font-medium">Thẻ N3 (từ vựng + Kanji)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white">{n3Stats.mature}</span>
            <span className="text-xs text-slate-400 font-medium">Thẻ N3 đã thuộc</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-indigo-300">{jlpt.exams.length}</span>
            <span className="text-xs text-slate-400 font-medium">Đề JLPT đã nhập</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-orange-300">{data.streak.current}</span>
            <span className="text-xs text-slate-400 font-medium">Ngày học liên tiếp</span>
          </div>
        </div>
      </div>

      {/* Bảng điều khiển: hàng đợi ôn N3 hôm nay */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center text-white shadow-lg shadow-emerald-100">
              <span className="text-3xl font-black leading-none">
                {isNewLearner ? firstSessionSize : n3Stats.due}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">thẻ</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
              {isNewLearner
                ? 'Bắt đầu lộ trình N3'
                : n3Stats.due > 0
                ? 'N3 đến hạn ôn hôm nay'
                : 'Hôm nay bạn đã ôn hết N3'}
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
              {isNewLearner
                ? `Từ vựng và Kanji N3 nằm chung một hàng đợi. Phiên đầu tiên gồm ${firstSessionSize} thẻ.`
                : n3Stats.due > 0
                ? `${n3Stats.due} thẻ N3 đã tới lịch nhắc lại. Ôn đúng lúc sắp quên là cách nhớ lâu nhất.`
                : n3Stats.newCards > 0
                ? `Không còn thẻ N3 đến hạn. Bạn có thể học thêm ${n3Stats.newCards} thẻ mới.`
                : 'Tuyệt vời! Toàn bộ thẻ N3 đều đã thuộc và chưa tới hạn ôn.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={() => onStartReview(N3_SCOPE)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-extrabold shadow-md shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
              >
                <Play size={15} fill="currentColor" />
                {n3Stats.due > 0 ? 'Ôn N3 ngay' : 'Học thẻ N3 mới'}
              </button>
              {n3Stats.wrong > 0 && (
                <button
                  onClick={onOpenMistakes}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-sm font-bold hover:bg-rose-100 active:scale-95 transition-all cursor-pointer"
                >
                  <AlertTriangle size={15} />
                  Sổ tay câu sai ({n3Stats.wrong})
                </button>
              )}
              {otherDue > 0 && (
                <button
                  onClick={() => onStartReview('all')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 text-sm font-bold hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  Ôn gộp cả môn khác (+{otherDue})
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-black text-orange-600 flex items-center gap-1.5">
              <Flame size={20} className="fill-orange-400 text-orange-500" />
              {data.streak.current}
            </p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">Ngày học liên tiếp</p>
          </div>
          <div>
            <p className="text-2xl font-black text-indigo-600">{todayStat.reviews}</p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">Lượt ôn hôm nay</p>
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-600">{n3Stats.mature}</p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">Thẻ N3 đã thuộc</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-700">{n3Stats.studied}</p>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">/ {n3Stats.total} thẻ N3 đã học</p>
          </div>
        </div>
      </div>

      {/* Phòng thi JLPT — lối vào chính thứ hai, ngang hàng với việc ôn thẻ */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-indigo-600" />
              Phòng thi JLPT
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1 max-w-xl leading-relaxed">
              Làm đề theo cỡ phiên nhỏ (một 問題) hay trọn đề có tính giờ, rồi mổ xẻ từng câu sai và
              đẩy thẳng vào lịch ôn. Đề nhập một lần dùng chung cho cả nhóm; điểm và lịch sử làm bài
              là của riêng bạn.
            </p>
          </div>

          <button
            onClick={onOpenJlptImport}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-extrabold shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
          >
            <FileJson className="w-4 h-4" />
            {jlpt.exams.length > 0 ? 'Quản lý & nhập đề' : 'Nhập đề JLPT đầu tiên'}
          </button>
        </div>

        {jlpt.running && (
          <button
            onClick={() => onOpenJlptExam(jlpt.running!.examId)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-left hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <Timer className="w-4 h-4" />
              Đang làm dở: {jlpt.running.examTitle}
            </span>
            <span className="text-xs font-extrabold text-amber-700 flex items-center gap-1">
              Tiếp tục <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        )}

        {jlpt.last && (
          <p className="text-xs font-semibold text-slate-500">
            Lần thi gần nhất: <span className="text-slate-800 font-bold">{jlpt.last.examTitle}</span>
            {jlpt.last.percent !== null && (
              <>
                {' '}
                — <span className="text-emerald-600 font-black">{jlpt.last.percent}%</span>
              </>
            )}
            {jlpt.last.at > 0 && ` (${new Date(jlpt.last.at).toLocaleDateString('vi-VN')})`}
            {jlpt.submittedCount > 1 && ` · đã làm ${jlpt.submittedCount} lượt`}
          </p>
        )}

        {jlpt.loading ? (
          <p className="text-xs font-semibold text-slate-400">Đang đọc kho đề trên máy...</p>
        ) : jlpt.exams.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center space-y-1">
            <p className="text-sm font-bold text-slate-700">Chưa có đề nào trên máy này</p>
            <p className="text-xs font-semibold text-slate-500">
              Đề JLPT được nhập từ file JSON (có sẵn prompt để nhờ AI soạn đề trong màn hình nhập
              đề). Đăng nhập thì đề tự đồng bộ sang máy khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {jlpt.exams.slice(0, 6).map((exam) => (
              <button
                key={exam.id}
                onClick={() => onOpenJlptExam(exam.id)}
                className="text-left p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer bg-white group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {exam.level}
                  </span>
                  {!exam.reviewed && (
                    <span
                      className="text-[10px] font-bold text-amber-600"
                      title="Đề chưa được người kiểm lại — kết quả chỉ để tham khảo"
                    >
                      chưa kiểm
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-800 mt-2 line-clamp-2 group-hover:text-indigo-700">
                  {exam.title}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600">
                  Vào làm <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Giáo trình N3 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
            <span>Giáo trình N3</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {n3Stats.studied}/{n3Stats.total} thẻ đã học qua
          </span>
        </div>

        {n3Matches.length === 0 ? (
          <p className="text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-2xl p-6 text-center">
            Không có giáo trình N3 nào khớp từ khoá "{searchQuery}".
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{n3Matches.map(renderSubjectCard)}</div>
        )}
      </div>

      {/* Môn khác: vẫn dùng được đầy đủ, nhưng gấp lại để không lấn phần luyện thi */}
      <div className="space-y-4">
        <button
          onClick={() => setShowOthers((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm font-extrabold text-slate-700">
            <BookOpen className="w-5 h-5 text-slate-400" />
            Môn khác: tiếng Nhật IT & tiếng Anh IT ({OTHER_SUBJECTS.length})
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            {showOthers ? 'Thu gọn' : 'Xem'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showOthers ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {showOthers &&
          (otherMatches.length === 0 ? (
            <p className="text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-2xl p-6 text-center">
              Không có môn nào khớp từ khoá "{searchQuery}".
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{otherMatches.map(renderSubjectCard)}</div>
          ))}
      </div>

      {/* Quản lý dữ liệu tiến độ */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span>Tiến độ của bạn nằm trên chính máy này</span>
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
            Mặc định không cần đăng nhập: lịch ôn, chuỗi ngày học và sổ tay câu sai được lưu ngay
            trong trình duyệt. Cài về máy để ôn bài cả khi không có mạng. Muốn tự động đồng bộ giữa
            nhiều máy (ví dụ máy nhà và máy cơ quan), hoặc học chung web với người khác mà tiến độ
            ai người nấy giữ, thì đăng nhập bằng tài khoản riêng của bạn; không thì cứ xuất ra file
            JSON rồi nạp lại — bạn tự giữ dữ liệu của mình.
          </p>
          {dataMessage && <p className="text-emerald-300 text-xs font-bold pt-1">{dataMessage}</p>}
        </div>

        <div className="flex flex-wrap gap-2 justify-center shrink-0">
          <SyncButton />
          <InstallButton />
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-indigo-100 hover:bg-white/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất tiến độ
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-emerald-100 hover:bg-white/20 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Nạp tiến độ
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = '';
            }}
          />
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-bold text-rose-200 hover:bg-rose-500/30 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xoá tiến độ
          </button>
        </div>
      </div>
    </div>
  );
};
