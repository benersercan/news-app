import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://newsapi.org/v2',
  //     changeOrigin: true,
  //     rewrite: path => path.replace(/^\/api/, '')
  //   }
  // },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/src/scss',
      '@util': '/src/util',
      '@services': '/src/services',
      '@hooks': '/src/hooks',
    }
  }
})
