// Tiện ích dùng chung cho pipeline audio 聴解.
//
// Bối cảnh: mỗi đề JLPT trong `data/` có đúng MỘT file MP3 chứa cả bài nghe 40 phút
// (128 kbps stereo 44.1 kHz — thừa gấp nhiều lần so với nhu cầu của giọng nói).
// Pipeline này hạ xuống mono 48 kbps để một đề còn ~14 MB thay vì ~38 MB, vì audio
// sẽ phải tải qua mạng rồi nằm trong Cache Storage của trình duyệt — nơi dung lượng
// là tài nguyên khan hiếm và có thể bị trình duyệt thu hồi bất cứ lúc nào.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '../../..');
export const EXAM_ROOT = path.join(REPO_ROOT, 'data', 'N3_my_AI_generated_practice_exam');
/** Thư mục làm việc — đã có dòng riêng trong .gitignore. */
export const BUILD_ROOT = path.join(REPO_ROOT, 'data', '_audio_build');

// Dùng dấu gạch xuôi: Node trên Windows chấp nhận cả hai, và tránh được
// chuỗi escape trong mã nguồn.
const UNRAR_CANDIDATES = [
  'C:/Program Files/WinRAR/UnRAR.exe',
  'C:/Program Files (x86)/WinRAR/UnRAR.exe',
  'C:/Program Files/7-Zip/7z.exe',
];

export function findUnrar() {
  const hit = UNRAR_CANDIDATES.find((p) => fs.existsSync(p));
  if (!hit) {
    throw new Error(
      'Không tìm thấy UnRAR.exe hoặc 7z.exe. Cài WinRAR/7-Zip, hoặc tự giải nén thủ công.',
    );
  }
  return { exe: hit, kind: hit.endsWith('7z.exe') ? '7z' : 'unrar' };
}

export function requireTool(name, versionArg = '-version') {
  try {
    execFileSync(name, [versionArg], { stdio: 'pipe' });
  } catch {
    throw new Error(
      `Không gọi được "${name}". Cài bằng:  winget install --id Gyan.FFmpeg -e\n` +
        'rồi mở lại terminal để PATH được nạp mới.',
    );
  }
}

export function run(exe, args) {
  return execFileSync(exe, args, { stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 }).toString();
}

/**
 * ffmpeg ghi toàn bộ log chẩn đoán ra stderr kể cả khi thành công, nên execFileSync
 * bình thường sẽ ném lỗi ở những lệnh chạy đúng. Hàm này gộp stdout+stderr lại và
 * chỉ coi là lỗi khi mã thoát khác 0.
 */
export function runFfmpeg(exe, args) {
  try {
    return execFileSync(exe, args, { stdio: 'pipe', maxBuffer: 64 * 1024 * 1024 }).toString();
  } catch (err) {
    if (err.status === 0 || err.status === undefined) return String(err.stderr ?? '');
    throw new Error(`${exe} thoát với mã ${err.status}:\n${String(err.stderr ?? err.message)}`);
  }
}

export function ffprobeJson(file) {
  const out = run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration,bit_rate,size',
    '-show_entries', 'stream=channels,sample_rate,codec_name',
    '-of', 'json',
    file,
  ]);
  return JSON.parse(out);
}

export function sha256Short(file, length = 8) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, length);
}

/**
 * Chỉ những thư mục có exam.json mới được coi là "đã extract và kiểm tra" —
 * đây là quy ước của chủ dự án, và pipeline audio bám đúng theo nó để không
 * xử lý nhầm các đề chưa soát.
 */
export function listReadyExams() {
  return fs
    .readdirSync(EXAM_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(EXAM_ROOT, e.name))
    .filter((dir) => fs.existsSync(path.join(dir, 'exam.json')))
    .map((dir) => {
      const exam = JSON.parse(fs.readFileSync(path.join(dir, 'exam.json'), 'utf8'));
      const files = fs.readdirSync(dir);
      return {
        dir,
        folderName: path.basename(dir),
        examId: exam.exam.id,
        title: exam.exam.title,
        rar: files.find((f) => f.toLowerCase().endsWith('.rar')),
        mp3: files.find((f) => f.toLowerCase().endsWith('.mp3')),
        choukaiCount: exam.questions.filter((q) => q.scoringSection === 'choukai').length,
      };
    })
    .sort((a, b) => a.examId.localeCompare(b.examId));
}

export function mb(bytes) {
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function hhmmss(seconds) {
  const s = Math.round(seconds);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
