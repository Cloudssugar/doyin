import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由
import router from './router/index'
// rem
import './rem.js'

import SocketIO from './plugins/io' // 导入插件

// 自动获焦
import focus from './utils/focus.js'
import scrollbottom from './utils/scrollbottom.js'

// 使用路由
// const app = createApp(App)
// app.use(router)
// app.use(SocketIO, {
//   // 应用
//   connection: 'http://43.138.15.137:3000' // socket服务地址
// })

createApp(App).use(router).use(focus).use(scrollbottom).use(SocketIO, {
  // 应用
  connection: 'http://43.138.15.137:3000' // socket服务地址
}).mount('#app')
