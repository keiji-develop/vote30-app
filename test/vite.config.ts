/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: './',
  server: {
    port: 5174,
    open: true
  },
  resolve: {
    alias: {
      '@': `${__dirname}/../src`,
      '@components': '../src/components',
      '@types': '../src/types'
    }
  }
}); 