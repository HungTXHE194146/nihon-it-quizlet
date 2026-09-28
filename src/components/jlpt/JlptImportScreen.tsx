import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Upload,
  FileJson,
  ClipboardCopy,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Trash2,
  Download,
  Eye,
  ShieldCheck,
  ShieldQuestion,
  CloudOff,
  Loader2,
  Play,
  Bug,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useJlptOwner } from '../../hooks/useJlptOwner';
import { jlptExamsApi } from '../../lib/api';
import {
  MONDAI_TYPES,
  REPORT_ISSUE_TYPES,
  type JlptImportFile,
  type JlptLevel,
  type MondaiType,
  type QuestionReport,
} from '../../lib/jlpt/schema';
import type { StoredJlptExam } from '../../lib/jlpt/schema';
import { parseImportJSON, validateImportFile, asImportFile, type ValidationResult } from '../../lib/jlpt/validate';
import { suggestLinkedItemKeys } from '../../lib/jlpt/linkSuggest';
import { toStoredExam, toSyncPayload, fromSyncPayload, type JlptSyncPayload } from '../../lib/jlpt/convert';
import { listStoredExams, putStoredExam, deleteStoredExam, listAttempts, listReports, deleteReport } from '../../lib/jlpt/db';
import { pendingReviewIdsOf } from '../../lib/jlpt/attemptLogic';
import type { JlptAttempt } from '../../lib/jlpt/schema';
import { buildAiPrompt, buildFixPrompt } from '../../lib/jlpt/aiPrompt';

const LEVELS: JlptLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];

interface JlptImportScreenProps {
  onBackToHome: () => void;
  onStartExam: (examId: string) => void;
}

/**
 * Một dòng trong màn xem trước nhập nhiều đề cùng lúc (ticket 011).
 *
 * Không dùng chung state với luồng dán/1-file cũ (`rawInput`/`parsedFile`/`validation`) — hai
 * luồng xem trước khác hình dạng hẳn (1 đề xem chi tiết có preview câu 1, nhiều đề chỉ cần
 * xem trạng thái từng dòng), gộp chung sẽ chỉ làm rối cả hai.
 */
interface BatchFileResult {
  /** Khoá React, không phải id đề — file lỗi (chưa parse được) thì chưa biết id đề là gì. */
  id: string;
  fileName: string;
  status: 'valid' | 'invalid' | 'saved' | 'error';
  parsedFile: JlptImportFile | null;
  validation: ValidationResult | null;
  parseError: string | null;
  /** Lỗi lúc LƯU (khác lỗi kiểm tra định dạng) — vd. hỏng khi ghi IndexedDB. */
  saveError: string | null;
}

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const JlptImportScreen: React.FC<JlptImportScreenProps> = ({ onBackToHome, onStartExam }) => {
  const { authenticated } = useAuth();
  const { ownerId, claimEpoch } = useJlptOwner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [exams, setExams] = useState<StoredJlptExam[]>([]);
  /** Lượt làm bài của chính người đang đăng nhập, gom theo mã đề — để mỗi dòng đề nói được
   * "đang làm dở" / "còn N câu chưa mổ xẻ" / "đã xong", chứ không chỉ là một dòng tĩnh. */
  const [attemptsByExam, setAttemptsByExam] = useState<Map<string, JlptAttempt[]>>(new Map());
  const [listBusy, setListBusy] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [syncNote, setSyncNote] = useState<string | null>(null);

  const [rawInput, setRawInput] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [parsedFile, setParsedFile] = useState<JlptImportFile | null>(null);
  const [linkStats, setLinkStats] = useState<{ matchedCount: number; totalChoiceCount: number } | null>(null);
  const [linkStatsBusy, setLinkStatsBusy] = useState(false);
  const [reviewedChecked, setReviewedChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  /** Chỉ khác `null` khi đang ở màn xem trước NHIỀU file (2+) cùng lúc — xem `BatchFileResult`. */
  const [batchFiles, setBatchFiles] = useState<BatchFileResult[] | null>(null);
  const [batchSaving, setBatchSaving] = useState(false);
  const [batchSaveSummary, setBatchSaveSummary] = useState<string | null>(null);

  const [promptLevel, setPromptLevel] = useState<JlptLevel>('N3');
  const [promptMondai, setPromptMondai] = useState<MondaiType>('kanji_yomi');
  const [promptCount, setPromptCount] = useState(10);
  const [promptCopied, setPromptCopied] = useState(false);

  /** Câu bị báo lỗi lúc làm bài (mục "Báo lỗi câu này") — gom theo đề để xuất lời nhắc sửa. */
  const [reports, setReports] = useState<QuestionReport[]>([]);
  const [fixPromptCopiedFor, setFixPromptCopiedFor] = useState<string | null>(null);

  const refreshLocalList = async () => {
    const list = await listStoredExams();
    list.sort((a, b) => b.updatedAt - a.updatedAt);
    setExams(list);
  };

  const refreshReports = async () => {
    const list = await listReports().catch(() => []);
    list.sort((a, b) => b.createdAt - a.createdAt);
    setReports(list);
  };

  const refreshAttempts = useCallback(async () => {
    const all = await listAttempts(ownerId).catch(() => []);
    const byExam = new Map<string, JlptAttempt[]>();
    for (const a of all) {
      const list = byExam.get(a.examId) ?? [];
      list.push(a);
      byExam.set(a.examId, list);
    }
    setAttemptsByExam(byExam);
  }, [ownerId]);

  // Nạp danh sách đề: đọc IndexedDB cục bộ trước, rồi nếu đã đăng nhập thì đối chiếu với
  // server — đề nào bên server mới hơn (hoặc máy này chưa có) thì kéo về, để mở web ở máy
  // khác (đã đăng nhập) là thấy đề luôn, không phải nhập lại từng máy.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setListBusy(true);
      setListError(null);
      try {
        await refreshLocalList();
        await refreshAttempts();
        await refreshReports();
      } catch (e) {
        if (!cancelled) setListError((e as Error).message);
      }
      if (cancelled) return;

      if (authenticated === true) {
        try {
          const remote = (await jlptExamsApi.list()) as JlptSyncPayload[];
          const local = await listStoredExams();
          const localById = new Map(local.map((e) => [e.exam.id, e]));
          let pulled = 0;
          for (const payload of remote) {
            const existing = localById.get(payload.exam.id);
            if (!existing || payload.updatedAt > existing.updatedAt) {
              await putStoredExam(fromSyncPayload(payload));
              pulled += 1;
            }
          }
          if (!cancelled && pulled > 0) {
            setSyncNote(`Đã kéo về ${pulled} đề từ máy khác.`);
            await refreshLocalList();
          }
        } catch (e) {
          if (!cancelled) setSyncNote(`Không đối chiếu được với server: ${(e as Error).message}`);
        }
      }
      if (!cancelled) setListBusy(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [authenticated, claimEpoch, refreshAttempts]);

  const runValidate = (text: string) => {
    setSaveMessage(null);
    setParseError(null);
    setValidation(null);
    setParsedFile(null);
    setLinkStats(null);

    if (!text.trim()) return;

    const parsed = parseImportJSON(text);
    if (!parsed.ok) {
      setParseError(parsed.message);
      return;
    }

    const result = validateImportFile(parsed.value);
    setValidation(result);
    if (result.errors.length === 0) {
      const file = asImportFile(parsed.value);
      setParsedFile(file);
      setReviewedChecked(false);

      setLinkStatsBusy(true);
      suggestLinkedItemKeys(file.questions)
        .then((stats) => {
          // Áp đề xuất vào bản nháp (không lưu gì) để lúc Lưu, các câu dò được thẻ đã có sẵn khoá.
          for (const [qId, choiceMap] of stats.suggestions) {
            const q = file.questions.find((qq) => qq.id === qId);
            if (!q) continue;
            for (const [i, key] of choiceMap) {
              if (q.choices[i]) q.choices[i].linkedItemKey = key;
            }
          }
          setLinkStats({ matchedCount: stats.matchedCount, totalChoiceCount: stats.totalChoiceCount });
        })
        .finally(() => setLinkStatsBusy(false));
    }
  };

  const handleFile = async (file: File) => {
    const text = await file.text();
    setRawInput(text);
    runValidate(text);
  };

  /**
   * Điểm vào chung cho cả chọn file (input `multiple`) lẫn kéo-thả nhiều file (ticket 011).
   *
   * Đúng 1 file thì vẫn đi luồng cũ — đổ vào ô dán để xem trước chi tiết + sửa tay được, thứ
   * người chỉnh một đề vẫn cần. 2+ file mới chuyển sang màn danh sách: không thể xem chi tiết
   * từng câu của hàng chục đề trên một màn mà không làm rối, nên chỉ hiện trạng thái mỗi file.
   */
  const handleFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;
    if (files.length === 1) {
      await handleFile(files[0]);
      return;
    }

    setRawInput('');
    setValidation(null);
    setParsedFile(null);
    setLinkStats(null);
    setSaveMessage(null);
    setBatchSaveSummary(null);

    const results = await Promise.all(
      files.map(async (file, i): Promise<BatchFileResult> => {
        const id = `${file.name}-${i}-${Date.now()}`;
        const text = await file.text().catch(() => null);
        if (text === null) {
          return { id, fileName: file.name, status: 'invalid', parsedFile: null, validation: null, parseError: 'Không đọc được file.', saveError: null };
        }
        const parsed = parseImportJSON(text);
        if (!parsed.ok) {
          return { id, fileName: file.name, status: 'invalid', parsedFile: null, validation: null, parseError: parsed.message, saveError: null };
        }
        const validation = validateImportFile(parsed.value);
        if (validation.errors.length > 0) {
          return { id, fileName: file.name, status: 'invalid', parsedFile: null, validation, parseError: null, saveError: null };
        }
        return { id, fileName: file.name, status: 'valid', parsedFile: asImportFile(parsed.value), validation, parseError: null, saveError: null };
      })
    );
    setBatchFiles(results);
  };

  /**
   * Nhập tất cả đề hợp lệ trong `batchFiles` bằng một thao tác — tuần tự từng file, một file
   * lưu lỗi (hoặc lỗi định dạng từ trước) không chặn các file còn lại (tiêu chí 3 của ticket).
   *
   * Không chạy `suggestLinkedItemKeys` (dò thẻ SRS tương ứng) cho từng đề như luồng 1-file:
   * việc đó quét toàn bộ kho từ vựng cho mỗi đề, hàng chục đề cùng lúc sẽ chậm rõ rệt mà đây
   * là bước "tự dò gợi ý", không bắt buộc phải có ngay lúc nhập — ai cần khớp SRS kỹ hơn vẫn
   * nhập lại đúng đề đó qua ô dán 1-file như cũ.
   */
  const handleSaveBatch = async () => {
    if (!batchFiles) return;
    setBatchSaving(true);
    setBatchSaveSummary(null);

    const examsById = new Map(exams.map((e) => [e.exam.id, e]));
    const next = [...batchFiles];
    let savedCount = 0;
    let failCount = 0;

    for (let i = 0; i < next.length; i++) {
      const entry = next[i];
      if (entry.status !== 'valid' || !entry.parsedFile) continue;
      try {
        const existing = examsById.get(entry.parsedFile.exam.id);
        // Chưa kiểm (`reviewed: false`) mặc định — không ai soát tay từng câu của từng đề
        // trong một lượt nhập hàng loạt, đánh dấu "đã kiểm" ở đây sẽ là nói dối.
        const stored = toStoredExam(entry.parsedFile, false, existing);
        await putStoredExam(stored);
        examsById.set(stored.exam.id, stored);

        let saveError: string | null = null;
        if (authenticated === true) {
          await jlptExamsApi.add(toSyncPayload(stored)).catch((e: Error) => {
            saveError = `Chưa đồng bộ lên server: ${e.message}`;
          });
        }
        next[i] = { ...entry, status: 'saved', saveError };
        savedCount += 1;
      } catch (e) {
        next[i] = { ...entry, status: 'error', saveError: (e as Error).message };
        failCount += 1;
      }
    }

    setBatchFiles(next);
    await refreshLocalList();
    setBatchSaving(false);
    setBatchSaveSummary(
      `Đã nhập ${savedCount} đề${failCount > 0 ? `, ${failCount} đề lưu thất bại (xem chi tiết ở từng dòng)` : ''}.`
    );
  };

  const handleSave = async () => {
    if (!parsedFile) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const existing = exams.find((e) => e.exam.id === parsedFile.exam.id);
      const stored = toStoredExam(parsedFile, reviewedChecked, existing);
      await putStoredExam(stored);
      await refreshLocalList();

      let msg = `Đã lưu "${stored.exam.title}" (${stored.questions.length} câu) vào máy này.`;
      if (authenticated === true) {
        try {
          await jlptExamsApi.add(toSyncPayload(stored));
          msg += ' Đã đồng bộ lên server.';
        } catch (e) {
          msg += ` Lưu cục bộ thành công nhưng CHƯA đẩy lên server: ${(e as Error).message}`;
        }
      } else {
        msg += ' Chưa đăng nhập nên chỉ có trên máy này — đăng nhập ở trang chủ để đồng bộ sang máy khác.';
      }
      setSaveMessage(msg);
      setRawInput('');
      setValidation(null);
      setParsedFile(null);
      setLinkStats(null);
    } catch (e) {
      setSaveMessage(`Lưu thất bại: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (entry: StoredJlptExam) => {
    if (!window.confirm(`Xoá đề "${entry.exam.title}"? Không thể hoàn tác.`)) return;
    try {
      await deleteStoredExam(entry.exam.id);
      if (authenticated === true) {
        // Kho đề trên server dùng chung cho mọi tài khoản nhưng chỉ người đã nhập mới xoá
        // được (api/jlpt/exams.ts). Bị từ chối thì đề vẫn còn trên server và sẽ quay lại ở
        // lần đối chiếu sau — phải nói rõ, đừng để người dùng tưởng đã xoá xong.
        await jlptExamsApi.remove(entry.exam.id).catch((e: Error) => {
          setSyncNote(`Đã xoá khỏi máy này, nhưng chưa xoá được trên server: ${e.message}`);
        });
      }
      await refreshLocalList();
    } catch (e) {
      window.alert(`Xoá thất bại: ${(e as Error).message}`);
    }
  };

  const handleToggleReviewed = async (entry: StoredJlptExam) => {
    const next: StoredJlptExam = { ...entry, reviewed: !entry.reviewed, updatedAt: Date.now() };
    try {
      await putStoredExam(next);
      if (authenticated === true) {
        await jlptExamsApi.add(toSyncPayload(next)).catch((e: Error) => {
          setSyncNote(`Đã đổi trên máy này, nhưng chưa cập nhật được lên server: ${e.message}`);
        });
      }
      await refreshLocalList();
    } catch (e) {
      window.alert(`Không cập nhật được: ${(e as Error).message}`);
    }
  };

  const handleExportEntry = (entry: StoredJlptExam) => {
    const payload = toSyncPayload(entry);
    const file: JlptImportFile = {
      formatVersion: payload.formatVersion,
      exam: payload.exam,
      groups: payload.groups,
      questions: payload.questions,
    };
    downloadJSON(`jlpt-${entry.exam.id}.json`, file);
  };

  const handleCopyPrompt = async () => {
    const text = buildAiPrompt(promptLevel, promptMondai, promptCount);
    try {
      await navigator.clipboard.writeText(text);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      window.prompt('Sao chép thủ công (Ctrl+C):', text);
    }
  };

  const handleCopyFixPrompt = async (entry: StoredJlptExam, examReports: QuestionReport[]) => {
    const payload = toSyncPayload(entry);
    const file: JlptImportFile = {
      formatVersion: payload.formatVersion,
      exam: payload.exam,
      groups: payload.groups,
      questions: payload.questions,
    };
    const text = buildFixPrompt(file, examReports);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt('Sao chép thủ công (Ctrl+C):', text);
    }
    setFixPromptCopiedFor(entry.exam.id);
    setTimeout(() => setFixPromptCopiedFor(null), 2000);
  };

  const handleDeleteReport = async (id: string) => {
    await deleteReport(id).catch(() => {});
    await refreshReports();
  };

  const reportsByExam = useMemo(() => {
    const map = new Map<string, QuestionReport[]>();
    for (const r of reports) {
      const list = map.get(r.examId) ?? [];
      list.push(r);
      map.set(r.examId, list);
    }
    return map;
  }, [reports]);

  const incompleteCount = validation?.incompleteChoiceCount ?? 0;
  const previewQuestion = parsedFile?.questions[0];

  const totalQuestionsAcrossExams = useMemo(
    () => exams.reduce((acc, e) => acc + e.questions.length, 0),
    [exams]
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative text-center mb-8">
        <button
          onClick={onBackToHome}
          className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 mb-4 sm:mb-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-red-400 dark:hover:border-red-900 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Trang chủ</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          Nhập Đề JLPT
        </h1>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-neutral-400">
          Dán JSON hoặc tải file đề đã soạn (kể cả do một AI khác soạn) — kiểm tra, xem trước, rồi lưu.
        </p>
      </div>

      {authenticated === false && (
        <div className="mb-6 flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300 rounded-2xl px-4 py-3 text-xs font-semibold">
          <CloudOff className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Chưa đăng nhập: đề nhập chỉ lưu trên máy này (IndexedDB), không đồng bộ sang máy khác.
            Đăng nhập bằng mật khẩu riêng ở trang chủ để tự động đồng bộ.
          </span>
        </div>
      )}
      {syncNote && (
        <div className="mb-6 flex items-start gap-2.5 bg-sky-50 border border-sky-200 text-sky-900 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-300 rounded-2xl px-4 py-3 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{syncNote}</span>
        </div>
      )}

      {/* Danh sách đề đã nhập */}
      <section className="mb-8">
        <h2 className="text-sm font-extrabold text-slate-700 dark:text-neutral-200 mb-3 flex items-center gap-2">
          <FileJson className="w-4 h-4 text-indigo-500 dark:text-red-400" />
          Đề đã nhập ({exams.length} đề · {totalQuestionsAcrossExams} câu)
        </h2>

        {listBusy ? (
          <div className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-8 text-center text-sm text-slate-400 dark:text-neutral-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Đang tải danh sách...
          </div>
        ) : listError ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 rounded-2xl p-4 text-xs font-bold">
            {listError}
          </div>
        ) : exams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 dark:bg-neutral-900 dark:border-neutral-700 p-8 text-center text-sm text-slate-400 dark:text-neutral-500">
            Chưa có đề nào. Dán hoặc tải một file JSON ở bên dưới để bắt đầu.
          </div>
        ) : (
          <div className="grid gap-2.5">
            {exams.map((entry) => {
              const incomplete = entry.questions.some((q) =>
                q.choices.some((c) => !c.note || !c.note.trim())
              );

              // Trạng thái làm bài của riêng người đang đăng nhập với đề này. Truyền
              // questionsById để lượt cũ (nộp trước khi web chốt sẵn wrongQuestionIds) vẫn
              // đếm được — ở màn này nội dung đề đã nằm sẵn trong tay, không tốn thêm gì.
              const questionsById = new Map(entry.questions.map((q) => [q.id, q]));
              const myAttempts = attemptsByExam.get(entry.exam.id) ?? [];
              const running = myAttempts.find((a) => a.status === 'running');
              const pending = myAttempts
                .filter((a) => a.status !== 'running')
                .map((a) => pendingReviewIdsOf(a, questionsById).length)
                .find((n) => n > 0);
              const lastDone = myAttempts
                .filter((a) => a.status !== 'running' && a.submittedAt)
                .sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0))[0];

              return (
                <div
                  key={entry.exam.id}
                  className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-4 flex flex-wrap items-center gap-3 justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-extrabold text-slate-800 dark:text-neutral-100 text-sm truncate">{entry.exam.title}</p>
                    <p className="text-xs text-slate-400 dark:text-neutral-500 font-semibold">
                      {entry.exam.level} · {entry.questions.length} câu · {entry.exam.id}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {entry.reviewed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800 rounded-full px-2 py-0.5">
                          <ShieldCheck size={11} /> Đã kiểm
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800 rounded-full px-2 py-0.5">
                          <ShieldQuestion size={11} /> Chưa kiểm
                        </span>
                      )}
                      {incomplete && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 dark:text-orange-300 dark:bg-orange-950/40 dark:border-orange-800 rounded-full px-2 py-0.5">
                          <AlertTriangle size={11} /> Chưa đầy đủ lời giải
                        </span>
                      )}

                      {/* Việc còn dở với đề này — ưu tiên hiện thứ người học làm tiếp được */}
                      {running ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-300 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800 rounded-full px-2 py-0.5">
                          <Play size={11} /> Đang làm dở
                        </span>
                      ) : pending ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 dark:text-red-300 dark:bg-red-950/30 dark:border-red-900 rounded-full px-2 py-0.5">
                          <AlertTriangle size={11} /> Còn {pending} câu chưa mổ xẻ
                        </span>
                      ) : lastDone ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 dark:text-neutral-300 dark:bg-neutral-800 dark:border-neutral-700 rounded-full px-2 py-0.5">
                          <CheckCircle2 size={11} /> Đã mổ xẻ xong
                          {lastDone.scorePercent !== undefined && ` · ${lastDone.scorePercent}%`}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => onStartExam(entry.exam.id)}
                      title="Làm bài"
                      className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      <Play size={15} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => handleToggleReviewed(entry)}
                      title={entry.reviewed ? 'Đánh dấu chưa kiểm' : 'Đánh dấu đã kiểm lại đề này'}
                      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <ShieldCheck size={15} />
                    </button>
                    <button
                      onClick={() => handleExportEntry(entry)}
                      title="Xuất file JSON"
                      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Download size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry)}
                      title="Xoá đề"
                      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Câu hỏi bị báo lỗi lúc làm bài (nút "Báo lỗi câu này" trong màn làm bài) — chỉ hiện
          khi có gì để xử lý, không làm rối màn quản lý đề trong ngày bình thường. */}
      {reportsByExam.size > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-extrabold text-slate-700 dark:text-neutral-200 mb-3 flex items-center gap-2">
            <Bug className="w-4 h-4 text-rose-500 dark:text-rose-400" />
            Câu hỏi bị báo lỗi ({reports.length} câu)
          </h2>
          <div className="grid gap-3">
            {[...reportsByExam.entries()].map(([examId, examReports]) => {
              const entry = exams.find((e) => e.exam.id === examId);
              return (
                <div
                  key={examId}
                  className="bg-white rounded-2xl border border-rose-200 dark:bg-neutral-900 dark:border-rose-900 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <p className="font-extrabold text-slate-800 dark:text-neutral-100 text-sm">
                      {entry?.exam.title ?? `Đề "${examId}" (đã bị xoá khỏi máy)`}
                      <span className="ml-1.5 font-bold text-rose-500 dark:text-rose-400">
                        · {examReports.length} câu lỗi
                      </span>
                    </p>
                    <button
                      onClick={() => entry && handleCopyFixPrompt(entry, examReports)}
                      disabled={!entry}
                      title={entry ? undefined : 'Đề đã bị xoá khỏi máy — không còn JSON gốc để nhúng vào lời nhắc'}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      {fixPromptCopiedFor === examId ? 'Đã chép!' : 'Chép lời nhắc sửa lỗi cho AI'}
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {examReports.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-start justify-between gap-3 bg-rose-50 border border-rose-100 dark:bg-rose-950/30 dark:border-rose-900 rounded-xl px-3.5 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-rose-700 dark:text-rose-300">
                            Câu "{r.questionId}" · {REPORT_ISSUE_TYPES.find((t) => t.code === r.issueType)?.label ?? r.issueType}
                          </p>
                          {r.stemSnapshot && (
                            <p className="text-xs text-slate-600 dark:text-neutral-300 font-semibold mt-0.5 truncate">
                              {r.stemSnapshot}
                            </p>
                          )}
                          {r.note && (
                            <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-semibold mt-0.5 italic">
                              "{r.note}"
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteReport(r.id)}
                          title="Xoá báo cáo này (vd. sau khi đã sửa xong)"
                          className="shrink-0 p-1.5 rounded-lg text-rose-400 hover:bg-rose-100 hover:text-rose-600 dark:text-rose-500 dark:hover:bg-rose-900/40 dark:hover:text-rose-300 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Mẫu lời nhắc cho AI khác soạn */}
      <section className="mb-8 bg-slate-900 rounded-2xl p-5 text-white">
        <h2 className="text-sm font-extrabold flex items-center gap-2 mb-3">
          <ClipboardCopy className="w-4 h-4 text-violet-300" />
          Chép mẫu lời nhắc cho AI
        </h2>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          Đưa cho một AI khác soạn (ChatGPT, Claude...) rồi dán KẾT QUẢ (JSON) của nó vào ô bên dưới.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <select
            value={promptLevel}
            onChange={(e) => setPromptLevel(e.target.value as JlptLevel)}
            className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold"
          >
            {LEVELS.map((l) => (
              <option key={l} value={l} className="text-slate-900">
                {l}
              </option>
            ))}
          </select>
          <select
            value={promptMondai}
            onChange={(e) => setPromptMondai(e.target.value as MondaiType)}
            className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold"
          >
            {MONDAI_TYPES.map((m) => (
              <option key={m} value={m} className="text-slate-900">
                {m}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={50}
            value={promptCount}
            onChange={(e) => setPromptCount(Math.max(1, Math.min(50, parseInt(e.target.value, 10) || 1)))}
            className="w-20 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold"
          />
          <button
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-500 text-white text-xs font-bold hover:bg-violet-400 transition-all cursor-pointer"
          >
            <ClipboardCopy className="w-3.5 h-3.5" />
            {promptCopied ? 'Đã chép!' : 'Chép lời nhắc'}
          </button>
        </div>
      </section>

      {/* Ô nhập */}
      <section className="bg-white rounded-2xl border border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 p-5 mb-8">
        <h2 className="text-sm font-extrabold text-slate-700 dark:text-neutral-200 mb-3">Dán JSON / tải file</h2>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
          }}
          className={`rounded-2xl border-2 border-dashed transition-colors ${
            dragOver
              ? 'border-indigo-400 bg-indigo-50 dark:border-red-500 dark:bg-red-950/30'
              : 'border-slate-200 dark:border-neutral-700 dark:bg-neutral-900'
          }`}
        >
          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Dán JSON đề vào đây, hoặc kéo thả một hay nhiều file .json..."
            rows={8}
            className="w-full p-4 rounded-2xl text-xs font-mono focus:outline-none resize-y bg-transparent dark:text-neutral-100"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => runValidate(rawInput)}
            disabled={!rawInput.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 dark:bg-red-600 dark:hover:bg-red-700 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye className="w-3.5 h-3.5" />
            Kiểm tra
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            Chọn file .json (chọn nhiều được)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        {/* Xem trước NHIỀU file cùng lúc (ticket 011) — chỉ hiện khi vừa chọn/kéo-thả 2+ file;
            1 file vẫn đi qua các khối "Kết quả kiểm tra" bên dưới như trước giờ. */}
        {batchFiles && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-extrabold text-slate-600 dark:text-neutral-300">
                {batchFiles.length} file — {batchFiles.filter((f) => f.status === 'valid' || f.status === 'saved').length} hợp lệ,{' '}
                {batchFiles.filter((f) => f.status === 'invalid' || f.status === 'error').length} lỗi
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveBatch}
                  disabled={batchSaving || !batchFiles.some((f) => f.status === 'valid')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {batchSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  Nhập tất cả đề hợp lệ ({batchFiles.filter((f) => f.status === 'valid').length})
                </button>
                <button
                  onClick={() => {
                    setBatchFiles(null);
                    setBatchSaveSummary(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Đóng danh sách
                </button>
              </div>
            </div>

            <div className="grid gap-2">
              {batchFiles.map((f) => (
                <div
                  key={f.id}
                  className={`rounded-xl border p-3 text-xs font-semibold ${
                    f.status === 'saved'
                      ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30'
                      : f.status === 'valid'
                      ? 'border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                      : 'border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-700 dark:text-neutral-200 truncate">{f.fileName}</p>
                    {f.status === 'saved' && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 size={13} /> Đã nhập
                      </span>
                    )}
                    {f.status === 'valid' && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-slate-500 dark:text-neutral-400">
                        <Eye size={13} /> Hợp lệ, chờ nhập
                      </span>
                    )}
                    {(f.status === 'invalid' || f.status === 'error') && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                        <XCircle size={13} /> {f.status === 'error' ? 'Lưu thất bại' : 'Lỗi'}
                      </span>
                    )}
                  </div>
                  {f.parsedFile && (
                    <p className="text-slate-400 dark:text-neutral-500 mt-0.5">
                      {f.parsedFile.exam.title} · {f.parsedFile.exam.level} · {f.validation?.totalQuestions} câu
                    </p>
                  )}
                  {f.parseError && <p className="text-rose-600 dark:text-rose-400 mt-1">{f.parseError}</p>}
                  {f.validation && f.validation.errors.length > 0 && (
                    <ul className="text-rose-600 dark:text-rose-400 list-disc list-inside mt-1 space-y-0.5">
                      {f.validation.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                  {f.saveError && <p className="text-amber-700 dark:text-amber-400 mt-1">{f.saveError}</p>}
                </div>
              ))}
            </div>

            {batchSaveSummary && (
              <p className="text-xs font-bold text-slate-600 dark:text-neutral-300">{batchSaveSummary}</p>
            )}
          </div>
        )}

        {/* Kết quả kiểm tra */}
        {parseError && (
          <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 rounded-2xl p-4 text-xs font-bold flex items-start gap-2">
            <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {parseError}
          </div>
        )}

        {validation && validation.errors.length > 0 && (
          <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300 rounded-2xl p-4">
            <p className="text-xs font-extrabold flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4" />
              {validation.errors.length} lỗi — chưa lưu được, sửa rồi kiểm tra lại
            </p>
            <ul className="text-xs font-semibold list-disc list-inside space-y-1">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {parsedFile && validation && validation.errors.length === 0 && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 rounded-2xl p-4">
            <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 mb-1">{parsedFile.exam.title}</p>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              {parsedFile.exam.level} · {parsedFile.groups.length} nhóm 問題 · {validation.totalQuestions} câu
              {exams.some((e) => e.exam.id === parsedFile.exam.id) && (
                <span className="text-amber-700 dark:text-amber-300"> · id đã có sẵn, Lưu sẽ GHI ĐÈ đề cũ</span>
              )}
            </p>

            {validation.warnings.length > 0 && (
              <ul className="text-xs font-semibold text-amber-800 dark:text-amber-300 list-disc list-inside space-y-1 mb-3">
                {validation.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            )}

            <p className="text-xs font-semibold text-slate-600 dark:text-neutral-300 mb-3">
              {linkStatsBusy ? (
                <span className="inline-flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" /> Đang dò thẻ SRS tương ứng...
                </span>
              ) : linkStats ? (
                `${linkStats.matchedCount}/${linkStats.totalChoiceCount} phương án dò được thẻ SRS tương ứng.`
              ) : null}
            </p>

            {previewQuestion && (
              <div className="bg-white rounded-xl border border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 p-4 mb-3">
                <p className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 mb-2">Xem thử câu 1 — hiện đúng như lúc làm bài</p>
                {previewQuestion.stem && (
                  <p className="text-sm font-bold text-slate-800 dark:text-neutral-100 mb-3">{previewQuestion.stem}</p>
                )}
                <div className="grid gap-1.5">
                  {previewQuestion.choices.map((c, i) => (
                    <div
                      key={i}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg border ${
                        i === previewQuestion.answerIndex
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {i + 1}. {c.text}
                      {c.note && <span className="block text-[11px] font-normal text-slate-400 dark:text-neutral-500 mt-0.5">{c.note}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {incompleteCount > 0 && (
              <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-neutral-300 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reviewedChecked}
                  onChange={(e) => setReviewedChecked(e.target.checked)}
                />
                Tôi đã tự soát lại đề này (đề do AI soạn nên đánh dấu "đã kiểm" trước khi dùng nghiêm túc)
              </label>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                Nhập {validation.totalQuestions} câu
              </button>
              <button
                onClick={() => {
                  setRawInput('');
                  setValidation(null);
                  setParsedFile(null);
                  setLinkStats(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 text-xs font-bold transition-all cursor-pointer"
              >
                Huỷ
              </button>
            </div>
          </div>
        )}

        {saveMessage && (
          <div className="mt-4 bg-slate-50 border border-slate-200 text-slate-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 rounded-2xl p-4 text-xs font-bold">
            {saveMessage}
          </div>
        )}
      </section>
    </div>
  );
};
