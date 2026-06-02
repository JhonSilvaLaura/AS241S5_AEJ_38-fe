import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api/articles': {
        target: 'https://article-extractor-api-38.onrender.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/articles/, ''),
      },
      '/api/cartoon': {
        target: 'https://cartoon-generator-api-38.onrender.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/cartoon/, ''),
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
