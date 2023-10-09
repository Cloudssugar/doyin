import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style.css";'
      }
    }
  },

  //反向代理
  server: {
    host: '192.168.28.166',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://43.138.15.137:3000', //实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
