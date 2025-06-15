import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {},
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:8787',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
