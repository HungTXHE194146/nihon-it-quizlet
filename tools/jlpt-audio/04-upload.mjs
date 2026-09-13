// Bước 4 của pipeline audio: tải file nghe đã nén lên kho Cloudflare R2 (kho đóng, không công khai).
//
// Chạy:  node tools/jlpt-audio/04-upload.mjs [--only n3-2025-07] [--dry-run]
//
// Cần 4 biến môi trường (đặt trong shell, hoặc trong .env.local ở gốc repo — file đó đã ignore):
//   R2_ACCOUNT_ID  R2_ACCESS_KEY_ID  R2_SECRET_ACCESS_KEY  R2_BUCKET
// Khoá API tạo ở Cloudflare Dashboard → R2 → Manage API tokens, quyền "Object Read & Write",
// giới hạn đúng bucket này. Xem hướng dẫn đầy đủ ở api/README.md, mục "Kho audio 聴解 (R2)".
//
// Tải lên theo đúng `key` đã ghi trong data/_audio_build/exams/<examId>.json (bước 3), nên file
// nào đã có trên kho (cùng key = cùng hash nội dung) thì bỏ qua — chạy lại bao nhiêu lần cũng được.
//
// Dùng lại đúng hàm ký URL của server (api/_lib/r2.ts): Node ≥ 22.18 chạy thẳng được file .ts.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { BUILD_ROOT, REPO_ROOT, mb } from './lib.mjs';

const { presignR2, r2ConfigFromEnv } = await import(pathToFileURL(path.join(REPO_ROOT, 'api', '_lib', 'r2.ts')).href);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyIndex = args.indexOf('--only');
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : null;

function loadEnvLocal() {
  const envPath = path.join(REPO_ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

loadEnvLocal();
const cfg = r2ConfigFromEnv(process.env);
if (!cfg && !dryRun) {
  console.error('Thiếu biến R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET (shell hoặc .env.local).');
  process.exit(1);
}

const examsDir = path.join(BUILD_ROOT, 'exams');
const files = fs.existsSync(examsDir) ? fs.readdirSync(examsDir).filter((f) => f.endsWith('.json')) : [];
if (files.length === 0) {
  console.error('Chưa có đề nào ở data/_audio_build/exams — chạy bước 3 trước.');
  process.exit(1);
}

let uploaded = 0;
let skipped = 0;
for (const f of files) {
  const exam = JSON.parse(fs.readFileSync(path.join(examsDir, f), 'utf8'));
  if (only && exam.exam.id !== only) continue;

  for (const track of exam.exam.audio ?? []) {
    const local = path.join(BUILD_ROOT, 'dist', track.key.replace(/^choukai\//, ''));
    if (!fs.existsSync(local)) {
      console.log(`${track.key}  LỖI — không thấy file cục bộ ${local}`);
      continue;
    }
    if (dryRun) {
      console.log(`${track.key}  (dry-run) ${mb(fs.statSync(local).size)}`);
      continue;
    }

    const head = await fetch(await presignR2(cfg, 'HEAD', track.key, 300), { method: 'HEAD' });
    if (head.ok && Number(head.headers.get('content-length')) === track.bytes) {
      console.log(`${track.key}  đã có trên kho, bỏ qua`);
      skipped += 1;
      continue;
    }

    const body = fs.readFileSync(local);
    const res = await fetch(await presignR2(cfg, 'PUT', track.key, 900), {
      method: 'PUT',
      body,
      headers: {
        'content-type': 'audio/mpeg',
        // Tên file có hash nội dung: một khoá không bao giờ đổi nội dung.
        'cache-control': 'private, max-age=31536000, immutable',
      },
    });
    if (!res.ok) {
      console.log(`${track.key}  LỖI ${res.status}: ${(await res.text()).slice(0, 300)}`);
      process.exitCode = 1;
      continue;
    }
    console.log(`${track.key}  đã tải lên  ${mb(body.length)}`);
    uploaded += 1;
  }
}

console.log(`\nTải lên ${uploaded}, bỏ qua ${skipped}.`);
if (uploaded + skipped > 0) {
  console.log('Nhớ: bucket cần CORS cho phép GET từ domain web — xem api/README.md.');
}
