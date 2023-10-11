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
  // js最小拆包   配置vite.config 的 output 属性
  //   让打开那个页面，加载那个页面的js ，让之间的关联足够小
  // 按需加载 js 每个页面的 js 逻辑
  output: {
    // 最小化拆分包
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return id.toString().split('node_modules/')[1].split('/')[0].toString()
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
