import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api/articles': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/cartoon': {
        target: 'http://localhost:8085',
        changeOrigin: true,
      }
    }
  }
})
