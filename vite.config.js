import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// a API não libera CORS, então o vite redireciona /api para ela
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://177.190.80.28:3005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
