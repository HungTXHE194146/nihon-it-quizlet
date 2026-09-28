import { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { subjectMeta, findSubjectMeta } from './data/subjectMeta';
import type { SubjectMeta } from './data/subjectMeta';
import { useHashRoute } from './hooks/useHashRoute';
import { Homepage } from './components/Homepage';
import { StudySession } from './components/StudySession';
import { TheoryViewer } from './components/TheoryViewer';
import { PWAPrompt } from './components/PWAPrompt';
import { ThemeToggle } from './components/ThemeToggle';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { useSubjectData } from './hooks/useSubjectData';
import { GraduationCap, Github, ChevronRight, ArrowLeft, Home, Flame, AlertTriangle, Loader2 } from 'lucide-react';

// Các màn hình chỉ dùng ở một nhánh route được nạp động để nhẹ lần tải đầu.
// Riêng KanjiMasterN3Selector còn kéo theo bảng chữ Kanji, càng nên tách riêng.
const LessonSelector = lazy(() => import('./components/LessonSelector').then((m) => ({ default: m.LessonSelector })));
const MimiN3Selector = lazy(() => import('./components/MimiN3Selector').then((m) => ({ default: m.MimiN3Selector })));
const JFE301Selector = lazy(() => import('./components/JFE301Selector').then((m) => ({ default: m.JFE301Selector })));
const KanjiMasterN3Selector = lazy(() => import('./components/KanjiMasterN3Selector').then((m) => ({ default: m.KanjiMasterN3Selector })));
const EngGrade9Selector = lazy(() => import('./components/EngGrade9Selector').then((m) => ({ default: m.EngGrade9Selector })));
const TryN3Selector = lazy(() => import('./components/TryN3Selector').then((m) => ({ default: m.TryN3Selector })));
const ExamSession = lazy(() => import('./components/ExamSession').then((m) => ({ default: m.ExamSession })));
const MistakeNotebook = lazy(() => import('./components/MistakeNotebook').then((m) => ({ default: m.MistakeNotebook })));
const JlptImportScreen = lazy(() => import('./components/jlpt/JlptImportScreen').then((m) => ({ default: m.JlptImportScreen })));
const JlptExamRunner = lazy(() => import('./components/jlpt/JlptExamRunner').then((m) => ({ default: m.JlptExamRunner })));
const JlptReviewSession = lazy(() => import('./components/jlpt/JlptReviewSession').then((m) => ({ default: m.JlptReviewSession })));

const ScreenLoader = () => (
  <div className="w-full py-24 flex flex-col items-center justify-center gap-3">
    <Loader2 className="w-7 h-7 text-indigo-500 animate-spin" />
    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Đang tải dữ liệu bài học...</p>
  </div>
);

function App() {
  const { route, navigate, goBack } = useHashRoute();
  const { data, persistent } = useProgress();
  const { authenticated, user } = useAuth();

  /**
   * Các màn hình khôi phục dữ liệu RIÊNG của người dùng (phiên học dở, bài thi dở) phải
   * chờ biết mình là ai rồi mới được dựng.
   *
   * Lượt render đầu tiên luôn diễn ra trước khi /api/auth/status trả lời, nên nếu dựng
   * ngay thì màn hình đọc khoá của "khách", khởi tạo state một lần bằng dữ liệu đó rồi
   * lưu đè ngược lại vào khoá của tài khoản — người đang thi dở mở lại đúng đường dẫn
   * phòng thi sẽ mất bài. Đổi khoá không tự dựng lại state, nên ngoài việc chờ còn phải
   * `key` theo danh tính để đăng nhập/đăng xuất giữa chừng thì dựng lại từ đầu.
   */
  const identityReady = authenticated !== null;
  const identityKey = user?.id ?? 'guest';

  // State for selected sections in current active subject
  const [selectedSectionIds, setSelectedSectionIds] = useState<string[]>([
    'lesson-11-vocabulary',
    'lesson-11-multiple-choice',
  ]);

  // Resolve current active subject
  const activeSubjectId =
    route.page === 'subject' ||
    route.page === 'theory' ||
    route.page === 'study' ||
    route.page === 'exam'
      ? route.subjectId
      // Web lấy N3 làm trục chính nên môn mặc định (chỉ dùng cho breadcrumb ở các trang
      // không gắn với môn nào) là môn N3 đầu tiên, không còn là môn IT.
      : subjectMeta[0].id;

  const currentSubject: SubjectMeta = findSubjectMeta(activeSubjectId) || subjectMeta[0];

  /**
   * Route nào cần dữ liệu bài học thì khai báo ở đây; trang chủ và trang lý thuyết
   * không cần gì cả nên vào thẳng, không phải chờ tải gần 1 MB dữ liệu.
   */
  const requiredSubject =
    route.page === 'mistakes'
      // Tab câu sai đề JLPT đọc thẳng từ IndexedDB, không đụng tới bài học của các môn —
      // bắt nó chờ tải gần 1 MB dữ liệu từ vựng chỉ để đọc lại ghi chú là vô lý. Bấm sang
      // tab thẻ SRS sẽ đổi URL, và lúc đó mới nạp.
      ? route.tab === 'jlpt'
        ? null
        : 'all'
      : route.page === 'subject' || route.page === 'study' || route.page === 'exam'
      ? route.subjectId
      : null;

  const { lessons: activeLessons, loading: dataLoading, failed: dataFailed } =
    useSubjectData(requiredSubject);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      {/* Premium Header & Responsive Navbar */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Global Back button if not on Home */}
            {route.page !== 'home' && (
              <button
                onClick={goBack}
                className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800 transition-all cursor-pointer mr-1"
                title="Quay lại (Back)"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <span className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-100 dark:shadow-none group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </span>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                NihonIT
              </span>
            </div>

            {/* Dynamic Breadcrumb Navigation Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              {route.page === 'home' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 flex items-center gap-1">
                    <Home size={12} />
                    Trang chủ
                  </span>
                </>
              ) : route.page === 'subject' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600 dark:text-slate-300"
                    onClick={() => navigate('/')}
                  >
                    Trang chủ
                  </span>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800">
                    {currentSubject.title}
                  </span>
                </>
              ) : route.page === 'theory' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600 dark:text-slate-300"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800">
                    Lý thuyết Bài {route.lessonId}
                  </span>
                </>
              ) : route.page === 'mistakes' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600 dark:text-slate-300"
                    onClick={() => navigate('/')}
                  >
                    Trang chủ
                  </span>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
                    Sổ tay câu sai
                  </span>
                </>
              ) : route.page === 'exam' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600 dark:text-slate-300"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
                    Phòng thi
                  </span>
                </>
              ) : route.page === 'study' ? (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span
                    className="hover:underline cursor-pointer text-slate-600 dark:text-slate-300"
                    onClick={() => navigate(`/subject/${currentSubject.id}`)}
                  >
                    {currentSubject.title}
                  </span>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-600" />
                  <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg border border-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800">
                    Luyện tập
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {/* Chuỗi ngày học liên tiếp */}
            {data.streak.current > 0 && (
              <span
                className="hidden sm:flex items-center gap-1 py-1.5 px-3 rounded-full bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800 text-xs font-black"
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
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 text-xs font-black hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all cursor-pointer"
                title="Sổ tay câu sai"
              >
                <AlertTriangle size={13} />
                {mistakeCount}
              </button>
            )}

            <span className="hidden md:inline bg-emerald-50 text-emerald-700 py-1 px-3 rounded-full text-xs font-bold dark:bg-emerald-950/40 dark:text-emerald-300">
              JLPT N3
            </span>

            <ThemeToggle />

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-indigo-400 dark:hover:bg-slate-800 rounded-xl transition-all"
              title="GitHub Repository"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Cảnh báo khi trình duyệt chặn lưu trữ: tiến độ sẽ mất khi đóng tab */}
      {!persistent && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200 text-xs font-bold px-4 py-2 text-center">
          Trình duyệt đang chặn lưu trữ cục bộ (chế độ ẩn danh?). Tiến độ học sẽ không được giữ lại
          sau khi đóng tab.
        </div>
      )}

      {/* Main Content Area rendered dynamically according to Route */}
      <main className="flex-grow py-6 flex items-start justify-center">
        {dataLoading && <ScreenLoader />}

        {dataFailed && (
          <div className="w-full max-w-md mx-auto text-center py-20 px-4">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Không tải được dữ liệu bài học</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
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
            onStartNewCards={(subjectId) => navigate(`/subject/${subjectId}/study?mode=new`)}
            onOpenMistakes={() => navigate('/mistakes')}
            onOpenJlptMistakes={() => navigate('/mistakes?tab=jlpt')}
            onOpenJlptImport={() => navigate('/jlpt/import')}
            onOpenJlptExam={(examId) => navigate(`/jlpt/exam/${examId}`)}
            onOpenJlptReview={() => navigate('/jlpt/review')}
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

        {route.page === 'subject' && currentSubject.id === 'eng-grade9-hw' && (
          <EngGrade9Selector
            onStartBySections={(sections) =>
              navigate(`/subject/${currentSubject.id}/study?sections=${sections.join(',')}`)
            }
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'try-n3' && (
          <TryN3Selector
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
          currentSubject.id !== 'kanji-master-n3' &&
          currentSubject.id !== 'eng-grade9-hw' &&
          currentSubject.id !== 'try-n3' && (
          <LessonSelector
            lessons={activeLessons}
            selectedSectionIds={selectedSectionIds}
            setSelectedSectionIds={setSelectedSectionIds}
            onStartSession={startStudyRoute}
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

        {route.page === 'study' && !identityReady && <ScreenLoader />}
        {route.page === 'study' && identityReady && (
          <StudySession
            key={identityKey}
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

        {route.page === 'exam' && !identityReady && <ScreenLoader />}
        {route.page === 'exam' && identityReady && (
          <ExamSession
            key={identityKey}
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
            tab={route.tab}
            onChangeTab={(tab) => navigate(tab === 'jlpt' ? '/mistakes?tab=jlpt' : '/mistakes')}
            onBackToHome={() => navigate('/')}
            onStartReview={(subjectId) =>
              navigate(`/subject/${subjectId}/study?mode=mistakes`)
            }
            onOpenJlptExam={(examId) => navigate(`/jlpt/exam/${examId}`)}
            onOpenJlptImport={() => navigate('/jlpt/import')}
            onOpenJlptReview={() => navigate('/jlpt/review')}
          />
        )}

        {route.page === 'jlpt-import' && (
          <JlptImportScreen onBackToHome={() => navigate('/')} onStartExam={(examId) => navigate(`/jlpt/exam/${examId}`)} />
        )}

        {route.page === 'jlpt-exam' && !identityReady && <ScreenLoader />}
        {route.page === 'jlpt-exam' && identityReady && (
          <JlptExamRunner key={identityKey} examId={route.examId} onExit={() => navigate('/jlpt/import')} />
        )}

        {route.page === 'jlpt-review' && !identityReady && <ScreenLoader />}
        {route.page === 'jlpt-review' && identityReady && (
          <JlptReviewSession key={identityKey} onExit={() => navigate('/')} />
        )}
        </Suspense>
        )}
      </main>

      {/* Thông báo của Service Worker: sẵn sàng offline / có bản mới */}
      <PWAPrompt />

      {/* Modern Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-700/60 py-6 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} NihonIT. Luyện thi JLPT N3 — từ vựng, Kanji và đề thi thử.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-help">Điều khoản</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-help">Bảo mật</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-help">Hỗ trợ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
