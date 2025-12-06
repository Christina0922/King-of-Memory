import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 상대 경로 사용 (Android assets 폴더용)
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `index.js`,
        assetFileNames: `index.[ext]`
      }
    }
  },
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
    port: 1000, // King of Memory 전용 포트
    strictPort: false, // 포트가 사용 중이면 자동으로 다른 포트 찾기
  },
})

