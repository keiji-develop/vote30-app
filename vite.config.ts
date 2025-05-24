import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/vote30-app/',   // ← リポジトリ名と完全一致
  plugins: [
    // React (JSX/TSX) 変換
    react(),

    // ★ PWA プラグイン
    VitePWA({
      registerType: 'autoUpdate',  // 変更検知で Service Worker を自動更新
      manifest: {
        name: 'T.M.R Vote30',
        short_name: 'Vote30',
        start_url: '/vote30-app/',   // ベースと一致
        scope: '/vote30-app/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
          // ↓ 公開フォルダ (public/) にアイコン PNG を置いたらパスを合わせてください
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
