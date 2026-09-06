import { useState, useEffect } from 'react';
import { subjects } from './data/subjects';
import type { Subject } from './data/subjects';
import { useHashRoute } from './hooks/useHashRoute';
import { Homepage } from './components/Homepage';
import { LessonSelector } from './components/LessonSelector';
import { MimiN3Selector } from './components/MimiN3Selector';
import { JFE301Selector } from './components/JFE301Selector';
import { StudySession } from './components/StudySession';
import { TheoryViewer } from './components/TheoryViewer';
import { FakePaywallModal } from './components/FakePaywallModal';
import { KanjiMasterN3Selector } from './components/KanjiMasterN3Selector';
import { EngGrade9Selector } from './components/EngGrade9Selector';
import { TryN3Selector } from './components/TryN3Selector';
import { GraduationCap, Github, ChevronRight, Crown, ArrowLeft, Home } from 'lucide-react';

function App() {
  const { route, navigate, goBack } = useHashRoute();

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
    route.page === 'subject' || route.page === 'theory' || route.page === 'study'
      ? route.subjectId
      : 'nihon-it';

  const currentSubject: Subject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

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
            {/* VIP Status Button */}
            <button
              onClick={() => setIsPaywallOpen(true)}
              className={`py-1.5 px-3 rounded-full text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${isVipUnlocked
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

      {/* Main Content Area rendered dynamically according to Route */}
      <main className="flex-grow py-6 flex items-start justify-center">
        {route.page === 'home' && (
          <Homepage
            onSelectSubject={(subjectId) => navigate(`/subject/${subjectId}`)}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'mimi-n3-goi' && (
          <MimiN3Selector
            lessons={currentSubject.lessons}
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
            lessons={currentSubject.lessons}
            onStartByChapter={(sectionIds) =>
              navigate(`/subject/jfe301/study?sections=${sectionIds.join(',')}`)
            }
            onStartByExam={(examTag, qType) =>
              navigate(`/subject/jfe301/study?exam=${examTag}&qType=${qType}`)
            }
            onBackToHome={() => navigate('/')}
          />
        )}

        {route.page === 'subject' && currentSubject.id === 'kanji-master-n3' && (
          <KanjiMasterN3Selector
            lessons={currentSubject.lessons}
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
            lessons={currentSubject.lessons}
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
              lessons={currentSubject.lessons}
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
            selectedSectionIds={route.sections && route.sections.length > 0 ? route.sections : selectedSectionIds}
            range={route.range}
            examFilter={examFilter}
            qTypeFilter={qTypeFilter}
            lessons={currentSubject.lessons}
            onBackToSelector={() => goBack()}
          />
        )}
      </main>

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
