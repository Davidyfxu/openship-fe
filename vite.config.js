import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 开发 / 本地预览时，把 /api 转发到 FastAPI，避免跨域
const proxy = {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react()],
  server: { host: true, proxy },
  preview: { host: true, proxy },
})
