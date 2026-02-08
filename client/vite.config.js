import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './src/config/config.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${config.api.protocol}://${config.api.host}:${config.api.port}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
