import { defineConfig } from 'vite';
import viteconfig from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    viteconfig(),
    VitePWA({
      manifest: {
        name: 'NotesRus',
        short_name: 'NotesRus',
        start_url: '.',
        icons: [
          {
            src: './assets/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: './assets/images/android-chrome-192x192.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        theme_color: '#000',
        background_color: '#FFF',
        orientation: 'landscape',
        display: 'standalone',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/api');
            },
            handler: 'CacheFirst' as const,
            options: {
              cacheName: 'static',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@/': './',
    },
  },
  server: {
    hmr: true,
  },
});
