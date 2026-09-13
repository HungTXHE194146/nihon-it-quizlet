import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Chỉ có ở `npm run dev`: phát file nghe 聴解 đã nén ở data/_audio_build/dist (không nằm trong
 * git) tại /__dev-audio/<tên file>, để thử phần nghe mà không cần Vercel + R2.
 * src/lib/jlpt/audio.ts tự rơi về đường này khi /api/jlpt/audio không trả lời (dev).
 */
function devChoukaiAudio(): Plugin {
  const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', '_audio_build', 'dist')
  return {
    name: 'dev-choukai-audio',
    apply: 'serve',
    configureServer(server) {
      // Vite không chạy được Vercel Functions: không chặn thì nó cố biên dịch api/jlpt/audio.ts
      // như code trình duyệt và bật màn lỗi. Trả 404 để audio.ts rơi về /__dev-audio bên dưới.
      server.middlewares.use('/api/jlpt/audio', (_req, res) => {
        res.statusCode = 404
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ error: 'dev_no_api', message: 'npm run dev không chạy /api' }))
      })
      server.middlewares.use('/__dev-audio/', (req, res, next) => {
        const name = decodeURIComponent((req.url ?? '').replace(/^\//, '').split('?')[0])
        // Chỉ nhận đúng dạng tên file do tools/jlpt-audio sinh ra — không phục vụ đường dẫn tuỳ ý.
        if (!/^[a-z0-9-]+\.[a-f0-9]{8}\.mp3$/.test(name)) return next()
        const file = path.join(distDir, name)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.end()
          return
        }
        res.setHeader('content-type', 'audio/mpeg')
        res.setHeader('content-length', String(fs.statSync(file).size))
        fs.createReadStream(file).pipe(res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    devChoukaiAudio(),
    VitePWA({
      // Không tự nạp lại giữa chừng: người dùng có thể đang làm dở một đề thi 90 phút.
      // Ứng dụng hiện thông báo và để họ chọn thời điểm cập nhật.
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'NihonIT - Ôn tập Tiếng Nhật & CNTT',
        short_name: 'NihonIT',
        description:
          'Học từ vựng tiếng Nhật chuyên ngành CNTT, Kanji N3 và tiếng Anh IT bằng flashcard có lịch ôn thông minh. Chạy được cả khi không có mạng.',
        lang: 'vi',
        theme_color: '#4f46e5',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache toàn bộ mã và dữ liệu bài học (~1 MB) để mở môn bất kỳ khi offline vẫn được.
        globPatterns: ['**/*.{js,css,html,svg,ico,webmanifest}', 'pwa-*.png', 'apple-touch-icon.png'],
        // 440 ảnh đề thi nặng ~30 MB: không precache, chỉ lưu lại ảnh nào đã xem.
        globIgnores: ['**/images/**'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'nihonit-exam-images',
              expiration: { maxEntries: 250, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
