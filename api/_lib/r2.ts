/**
 * Ký link tạm (presigned URL) cho Cloudflare R2 theo chuẩn AWS Signature V4.
 *
 * Tự viết bằng Web Crypto thay vì kéo cả `@aws-sdk/client-s3` vào Edge Function chỉ để ký
 * một URL. File này CỐ Ý không import gì: nó chạy được ở cả Edge runtime (`api/jlpt/audio.ts`)
 * lẫn Node (`tools/jlpt-audio/04-upload.mjs` dùng lại để tải file lên), vì chỉ cần
 * `crypto.subtle`, `TextEncoder` và `Date`.
 *
 * Link ký theo kiểu query string (X-Amz-Signature nằm trên URL) nên trình duyệt tải thẳng từ
 * R2, không đi vòng qua Vercel — file nghe 14 MB mà proxy qua Edge Function thì vừa chậm vừa
 * tốn băng thông của Vercel.
 */

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export interface PresignInput {
  method: 'GET' | 'PUT' | 'HEAD';
  host: string;
  /** Đường dẫn CHƯA mã hoá, bắt đầu bằng "/". */
  path: string;
  region: string;
  service: string;
  accessKeyId: string;
  secretAccessKey: string;
  expiresSec: number;
  now?: Date;
}

const encoder = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(key: ArrayBuffer, data: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
}

/** Mã hoá RFC 3986 đúng kiểu AWS: `encodeURIComponent` còn chừa lại `!'()*`, AWS thì không. */
function awsEncode(value: string, keepSlash: boolean): string {
  const encoded = encodeURIComponent(value).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return keepSlash ? encoded.replace(/%2F/g, '/') : encoded;
}

export async function presignUrl(input: PresignInput): Promise<string> {
  const now = input.now ?? new Date();
  // 2026-09-14T10:11:12.345Z → 20260914T101112Z
  const amzDate = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const dateStamp = amzDate.slice(0, 8);
  const scope = `${dateStamp}/${input.region}/${input.service}/aws4_request`;
  const canonicalUri = awsEncode(input.path, true);

  const canonicalQuery = [
    ['X-Amz-Algorithm', 'AWS4-HMAC-SHA256'],
    ['X-Amz-Credential', `${input.accessKeyId}/${scope}`],
    ['X-Amz-Date', amzDate],
    ['X-Amz-Expires', String(input.expiresSec)],
    ['X-Amz-SignedHeaders', 'host'],
  ]
    .map(([k, v]) => `${awsEncode(k, false)}=${awsEncode(v, false)}`)
    .sort()
    .join('&');

  const canonicalRequest = [
    input.method,
    canonicalUri,
    canonicalQuery,
    `host:${input.host}\n`,
    'host',
    'UNSIGNED-PAYLOAD',
  ].join('\n');

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    scope,
    toHex(await crypto.subtle.digest('SHA-256', encoder.encode(canonicalRequest))),
  ].join('\n');

  let signingKey = await hmac(encoder.encode(`AWS4${input.secretAccessKey}`).buffer as ArrayBuffer, dateStamp);
  signingKey = await hmac(signingKey, input.region);
  signingKey = await hmac(signingKey, input.service);
  signingKey = await hmac(signingKey, 'aws4_request');
  const signature = toHex(await hmac(signingKey, stringToSign));

  return `https://${input.host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
}

export function presignR2(
  cfg: R2Config,
  method: PresignInput['method'],
  key: string,
  expiresSec: number
): Promise<string> {
  return presignUrl({
    method,
    host: `${cfg.accountId}.r2.cloudflarestorage.com`,
    path: `/${cfg.bucket}/${key}`,
    region: 'auto',
    service: 's3',
    accessKeyId: cfg.accessKeyId,
    secretAccessKey: cfg.secretAccessKey,
    expiresSec,
  });
}

/** null = server chưa được cấu hình kho audio (thiếu ít nhất một biến). */
export function r2ConfigFromEnv(env: Record<string, string | undefined> = process.env): R2Config | null {
  const accountId = env.R2_ACCOUNT_ID;
  const accessKeyId = env.R2_ACCESS_KEY_ID;
  const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
  const bucket = env.R2_BUCKET;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) return null;
  return { accountId, accessKeyId, secretAccessKey, bucket };
}
