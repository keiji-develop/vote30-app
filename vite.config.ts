import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // PWA機能は一時的に無効化（アイコンファイルが準備できたら有効化）
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'VOTE30選挙対策支援サイト',
    //     short_name: 'VOTE30',
    //     description: '30代の有権者を中心に、選挙に関する情報を分かりやすく提供し、より多くの方々が政治に参加できるよう支援するサイトです。',
    //     theme_color: '#6ea7b2',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })
  ],
  server: {
    port: 3000,
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  // 静的ファイルの設定
  publicDir: 'public',
  // クリーンURLのサポート
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  }
});
