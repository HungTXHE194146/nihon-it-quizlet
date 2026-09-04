import { useState, useEffect, useCallback } from 'react';

/** Chế độ của một phiên luyện tập. */
export type StudyMode = 'normal' | 'srs' | 'mistakes';

export type AppRoute =
  | { page: 'home' }
  | { page: 'subject'; subjectId: string }
  | { page: 'theory'; subjectId: string; lessonId: number }
  | {
      page: 'study';
      subjectId: string;
      sections?: string[];
      range?: [number, number];
      mode: StudyMode;
    }
  | { page: 'exam'; subjectId: string; examTags: string[]; qType: string; durationMin: number }
  | { page: 'mistakes' };

function parseHash(hash: string): AppRoute {
  // Chuẩn hoá hash, ví dụ "#/subject/nihon-it/theory/16" -> "/subject/nihon-it/theory/16"
  const cleanHash = hash.replace(/^#/, '').trim();

  if (!cleanHash || cleanHash === '/' || cleanHash === '/home') {
    return { page: 'home' };
  }

  // Tách phần đường dẫn và query string
  const [pathPart, queryPart] = cleanHash.split('?');
  const segments = pathPart.split('/').filter(Boolean);
  const params = new URLSearchParams(queryPart || '');

  // #/mistakes — sổ tay câu sai gộp mọi môn
  if (segments[0] === 'mistakes') {
    return { page: 'mistakes' };
  }

  // #/subject/:subjectId  (subjectId có thể là "all" cho phiên gộp mọi môn)
  if (segments[0] === 'subject' && segments[1]) {
    const subjectId = segments[1];

    // #/subject/:subjectId/theory/:lessonId
    if (segments[2] === 'theory' && segments[3]) {
      const lessonId = parseInt(segments[3], 10);
      if (!isNaN(lessonId)) {
        return { page: 'theory', subjectId, lessonId };
      }
    }

    // #/subject/:subjectId/exam?exam=de1,de2&qType=all&duration=90
    if (segments[2] === 'exam') {
      const examTags = (params.get('exam') || '').split(',').filter(Boolean);
      const durationMin = parseInt(params.get('duration') || '', 10);
      return {
        page: 'exam',
        subjectId,
        examTags,
        qType: params.get('qType') || 'all',
        durationMin: isNaN(durationMin) ? 0 : durationMin,
      };
    }

    // #/subject/:subjectId/study?sections=...&range=1-100&mode=srs
    if (segments[2] === 'study') {
      const sectionsParam = params.get('sections');
      const rangeParam = params.get('range');
      const sections = sectionsParam ? sectionsParam.split(',').filter(Boolean) : undefined;

      let range: [number, number] | undefined = undefined;
      if (rangeParam) {
        const [fromStr, toStr] = rangeParam.split('-');
        const fromNum = parseInt(fromStr, 10);
        const toNum = parseInt(toStr, 10);
        if (!isNaN(fromNum) && !isNaN(toNum)) {
          range = [fromNum, toNum];
        }
      }

      const rawMode = params.get('mode');
      const mode: StudyMode =
        rawMode === 'srs' || rawMode === 'mistakes' ? rawMode : 'normal';

      return { page: 'study', subjectId, sections, range, mode };
    }

    return { page: 'subject', subjectId };
  }

  return { page: 'home' };
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    const formatted = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`;
    if (window.location.hash === formatted) {
      setRoute(parseHash(formatted));
    } else {
      window.location.hash = formatted;
    }
  }, []);

  const replace = useCallback((path: string) => {
    const formatted = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`;
    const url = new URL(window.location.href);
    url.hash = formatted;
    window.history.replaceState(null, '', url.toString());
    setRoute(parseHash(formatted));
  }, []);

  const goBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  }, [navigate]);

  return { route, navigate, replace, goBack };
}
