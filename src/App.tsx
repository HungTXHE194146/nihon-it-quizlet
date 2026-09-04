import { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { subjectMeta, findSubjectMeta } from './data/subjectMeta';
import type { SubjectMeta } from './data/subjectMeta';
import { useHashRoute } from './hooks/useHashRoute';
import { Homepage } from './components/Homepage';
import { StudySession } from './components/StudySession';
import { TheoryViewer } from './components/TheoryViewer';
import { FakePaywallModal } from './components/FakePaywallModal';
import { PWAPrompt } from './components/PWAPrompt';
import { useProgress } from './hooks/useProgress';
import { useSubjectData } from './hooks/useSubjectData';
import { GraduationCap, Github, ChevronRight, Crown, ArrowLeft, Home, Flame, AlertTriangle, Loader2 } from 'lucide-react';

// Các màn hình chỉ dùng ở một nhánh route được nạp động để nhẹ lần tải đầu.
// Riêng KanjiMasterN3Selector còn kéo theo bảng chữ Kanji, càng nên tách riêng.
const LessonSelector = lazy(() => import('./components/LessonSelector').then((m) => ({ default: m.LessonSelector })));
const MimiN3Selector = lazy(() => import('./components/MimiN3Selector').then((m) => ({ default: m.MimiN3Selector })));
const JFE301Selector = lazy(() => import('./components/JFE301Selector').then((m) => ({ default: m.JFE301Selector })));
const KanjiMasterN3Selector = lazy(() => import('./components/KanjiMasterN3Selector').then((m) => ({ default: m.KanjiMasterN3Selector })));
const ExamSession = lazy(() => import('./components/ExamSession').then((m) => ({ default: m.ExamSession })));
const MistakeNotebook = lazy(() => import('./components/MistakeNotebook').then((m) => ({ default: m.MistakeNotebook })));

const ScreenLoader = () => (
  <div className="w-full py-24 flex flex-col items-center justify-center gap-3">
    <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
    <p className="text-sm font-bold text-slate-500">Đang tải dữ liệu bài học...</p>
  </div>
);

function App() {
  const { route, navigate, goBack } = useHashRoute();
  const { data, persistent } = useProgress();

  // State for selected sections in current active subject
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([
    'lesson-11-vocabulary',
    'lesson-11-multiple-choice',
  ]);

  // Troll Paywall state
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [isVipUnlocked, setIsVipUnlocked] = useState<boolean>(false);

  // Resolve current active subject
  const activeSubjectId =
    route.page === 'subject' ||
    route.page === 'theory' ||
    route.page === 'study' ||
    route.page === 'exam'
      ? route.subjectId
      : 'nihon-it';

  const currentSubject: SubjectMeta = findSubjectMeta(activeSubjectId) || subjectMeta[0];

  /**
   * Route nào cần dữ liệu bài học thì khai báo ở đây; trang chủ và trang lý thuyết
   * không cần gì cả nên vào thẳng, không phải chờ tải gần 1 MB dữ liệu.
   */
  const requiredSubject =
    route.page === 'mistakes'
      ? 'all'
      : route.page === 'subject' || route.page === 'study' || route.page === 'exam'
      ? route.subjectId
      : null;

  const { lessons: activeLessons, loading: dataLoading, failed: dataFailed } =
    useSubjectData(requiredSubject);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const handleStartSession = () => {
    if (!isVipUnlocked) {
      setIsPaywallOpen(true);
    } else {
      startStudyRoute();
    }
  };

  const startStudyRoute = () => {
    const queryStr = selectedSectionIds.length > 0 ? `?sections=${selectedSectionIds.join(',')}` : '';
    navigate(`/subject/${currentSubject.id}/study${queryStr}`);
  };

  // Parse examFilter from URL search params (?exam=de1)
  const examFilter = (() => {
    if (route.page !== 'study') return undefined;
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    if (qIndex === -1) return undefined;
    const params = new URLSearchParams(hash.slice(qIndex + 1));
    return params.get('exam') || undefined;
  })();

  // Parse qTypeFilter from URL search params (?qType=calculation)
  const qTypeFilter = (() => {
    if (route.page !== 'study') return undefined;
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    if (qIndex === -1) return undefined;
    const params = new URLSearchParams(hash.slice(qIndex + 1));
    return params.get('qType') || undefined;
  })();

  // Số câu đang nằm trong sổ tay câu sai, hiện làm huy hiệu trên thanh điều hướng.
  const mistakeCount = useMemo(
    () => Object.values(data.cards).filter((c) => c.wrong > 0).length,
    [data.cards]
  );

  const handlePaywallSuccess = () => {
    setIsVipUnlocked(true);
    setIsPaywallOpen(false);
    startStudyRoute();
  };

  const handlePaywallClose = () => {
    setIsPaywallOpen(false);
    startStudyRoute();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Premium Header & Responsive Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Global Back button if not on Home */}
            {route.page !== 'home' && (
              <button
                onClick={goBack}
                className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-all cursor-pointer mr-1"
                title="Quay lại (Back)"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <span className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </span>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                NihonIT
              </span>
            </div>

            {/* Dynamic Breadcrumb Navigation Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2 text-xs font-bold text-slate-500">
              {route.page === 'home' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-1">
                    <Home size={12} />
                    Trang chủ
                  </span>
                </>
              ) : route.page === 'subject' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600"
                    onClick={() => navigate('/')}
                  >
                    Trang chủ
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                    {currentSubject.title}
                  </span>
                </>
              ) : route.page === 'theory' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100">
                    Lý thuyết Bài {route.lessonId}
                  </span>
                </>
              ) : route.page === 'mistakes' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600"
                    onClick={() => navigate('/')}
                  >
                    Trang chủ
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-100">
                    Sổ tay câu sai
                  </span>
                </>
              ) : route.page === 'exam' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100">
                    Phòng thi
                  </span>
                </>
              ) : route.page === 'study' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-100">
                    Luyện tập
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            {/* Chuỗi ngày học liên tiếp */}
            {data.streak.current > 0 && (
              <span
                className="hidden sm:flex items-center gap-1 py-1.5 px-3 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-black"
                title={`Chuỗi dài nhất: ${data.streak.longest} ngày`}
              >
                <Flame size={14} className="fill-orange-400 text-orange-500" />
                {data.streak.current}
              </span>
            )}

            {/* Lối tắt vào sổ tay câu sai */}
            {mistakeCount > 0 && route.page !== 'mistakes' && (
              <button
                onClick={() => navigate('/mistakes')}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black hover:bg-rose-100 transition-all cursor-pointer"
                title="Sổ tay câu sai"
              >
                <AlertTriangle size={13} />
                {mistakeCount}
              </button>
            )}

            {/* VIP Status Button */}
            <button
              onClick={() => setIsPaywallOpen(true)}
              className={`py-1.5 px-3 rounded-full text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isVipUnlocked
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 shadow-amber-200 ring-2 ring-amber-300'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 animate-pulse'
              }`}
            >
              <Crown size={14} className={isVipUnlocked ? 'fill-amber-950' : 'text-amber-700'} />
              <span>{isVipUnlocked ? 'VIP Pro Ultra Max' : 'Nâng cấp VIP (5k)'}</span>
            </button>

            <span className="hidden md:inline bg-indigo-50 text-indigo-700 py-1 px-3 rounded-full text-xs font-bold">
              Multi-Subject
            </span>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all"
              title="GitHub Repository"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Cảnh báo khi trình duyệt chặn lưu trữ: tiến độ sẽ mất khi đóng tab */}
      {!persistent && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs font-bold px-4 py-2 text-center">
          Trình duyệt đang chặn lưu trữ cục bộ (chế độ ẩn danh?). Tiến độ học sẽ không được giữ lại
          sau khi đóng tab.
        </div>
      )}

      {/* Main Content Area rendered dynamically according to Route */}
      <main className="flex-grow py-6 flex items-start justify-center">
        {dataLoading && <ScreenLoader />}

        {dataFailed && (
          <div className="w-full max-w-md mx-auto text-center py-20 px-4">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Không tải được dữ liệu bài học</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Có thể mạng bị gián đoạn. Thử tải lại trang nhé.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md cursor-pointer text-sm"
            >
              Tải lại
            </button>
          </div>
        )}

        {!dataLoading && !dataFailed && (
        <Suspense fallback={<ScreenLoader />}>
        {route.page === 'home' && (
          <Homepage
            onSelectSubject={(subjectId) => navigate(`/subject/${subjectId}`)}
            onStartReview={(subjectId) => navigate(`/subject/${subjectId}/study?mode=srs`)}
            onOpenMistakes={() => navigate('/mistakes')}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'mimi-n3-goi' && (
          <MimiN3Selector
            lessons={activeLessons}
            onStartBySections={(sections) =>
              navigate(`/subject/${currentSubject.id}/study?sections=${sections.join(',')}`)
            }
            onStartByRange={(from, to) =>
              navigate(`/subject/${currentSubject.id}/study?range=${from}-${to}`)
            }
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'jfe301' && (
          <JFE301Selector
            lessons={activeLessons}
            onStartByChapter={(sectionIds) =>
              navigate(`/subject/jfe301/study?sections=${sectionIds.join(',')}`)
            }
            onStartByExam={(examTag, qType) =>
              navigate(`/subject/jfe301/study?exam=${examTag}&qType=${qType}`)
            }
            onStartExam={(examTag, qType, durationMin) =>
              navigate(`/subject/jfe301/exam?exam=${examTag}&qType=${qType}&duration=${durationMin}`)
            }
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'kanji-master-n3' && (
          <KanjiMasterN3Selector
            lessons={activeLessons}
            onStartBySections={(sections) =>
              navigate(`/subject/${currentSubject.id}/study?sections=${sections.join(',')}`)
            }
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'subject' && 
          currentSubject.id !== 'mimi-n3-goi' && 
          currentSubject.id !== 'jfe301' && 
          currentSubject.id !== 'kanji-master-n3' && (
          <LessonSelector
            lessons={activeLessons}
            selectedSectionIds={selectedSectionIds}
            setSelectedSectionIds={setSelectedSectionIds}
            onStartSession={handleStartSession}
            onViewTheory={(lessonId) =>
              navigate(`/subject/${currentSubject.id}/theory/${lessonId}`)
            }
            subjectTitle={currentSubject.title}
            subjectJapaneseTitle={currentSubject.japaneseTitle}
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'theory' && (
          <TheoryViewer
            lessonId={route.lessonId}
            onClose={() => goBack()}
          />
        )}

        {route.page === 'study' && (
          <StudySession
            subjectId={route.subjectId}
            mode={route.mode}
            selectedSectionIds={route.sections && route.sections.length > 0 ? route.sections : selectedSectionIds}
            range={route.range}
            examFilter={examFilter}
            qTypeFilter={qTypeFilter}
            lessons={activeLessons}
            onBackToSelector={() => goBack()}
          />
        )}

        {route.page === 'exam' && (
          <ExamSession
            subjectId={route.subjectId}
            lessons={activeLessons}
            examTags={route.examTags}
            qType={route.qType}
            durationMin={route.durationMin}
            onExit={() => navigate(`/subject/${route.subjectId}`)}
          />
        )}

        {route.page === 'mistakes' && (
          <MistakeNotebook
            onBackToHome={() => navigate('/')}
            onStartReview={(subjectId) =>
              navigate(`/subject/${subjectId}/study?mode=mistakes`)
            }
          />
        )}
        </Suspense>
        )}
      </main>

      {/* Thông báo của Service Worker: sẵn sàng offline / có bản mới */}
      <PWAPrompt />

      {/* Troll Paywall Modal */}
      <FakePaywallModal
        isOpen={isPaywallOpen}
        onClose={handlePaywallClose}
        onSuccess={handlePaywallSuccess}
      />

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-6 text-center text-xs text-slate-400 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NihonIT. Nền tảng ôn tập Tiếng Nhật & CNTT Đa môn.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-help">Điều khoản</span>
            <span className="hover:text-slate-600 cursor-help">Bảo mật</span>
            <span className="hover:text-slate-600 cursor-help">Hỗ trợ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
