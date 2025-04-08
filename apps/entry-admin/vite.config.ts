/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/entry-admin',
  server: {
    port: 4200,
    host: 'localhost',
    // 프록시 설정 제거
    // 모든 요청을 index.html로 리다이렉트
    open: true,
    cors: true,
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@entry/design-token': resolve(__dirname, '../../libs/design-token/src'),
      '@entry/ui': resolve(__dirname, '../../libs/ui/src'),
      '@entry/hooks': resolve(__dirname, '../../libs/hooks/src'),
      '@entry/utils': resolve(__dirname, '../../libs/utils/src'),
      '@entry/types': resolve(__dirname, '../../libs/types/src'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    },
  },
}));
