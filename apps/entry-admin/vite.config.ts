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
    // URL 리라이팅 설정 - /admin 경로와 accessToken 쿼리 파라미터가 있으면 oauth-handler.html로 리디렉션
    proxy: {
      '^/admin\\?accessToken=.*': {
        target: 'http://localhost:4200',
        rewrite: () => '/oauth-handler.html',
      },
    },
    // 모든 요청을 index.html로 리다이렉트
    open: true,
    cors: true,
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oauth: resolve(__dirname, 'public/oauth-handler.html'),
      },
    },
  },
}));
