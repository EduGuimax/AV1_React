import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// A API não envia headers CORS, então o navegador bloquearia chamadas diretas
// vindas de localhost. Em dev/preview o Vite repassa /api/* para a API.
const proxy = {
  '/api': {
    target: 'http://177.190.80.28:3005',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
})
