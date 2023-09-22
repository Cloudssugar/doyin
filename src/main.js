import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入路由
import router from './router/index'
// rem
import './rem.js'

// 自动获焦
import focus from './utils/focus.js'
 

// 使用路由

createApp(App).use(router).use(focus).mount('#app')

