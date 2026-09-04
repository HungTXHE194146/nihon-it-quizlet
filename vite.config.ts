import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
