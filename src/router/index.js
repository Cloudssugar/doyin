import { createRouter, createWebHistory } from 'vue-router' // history
// createWebHashHistory hash

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home.vue') 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/login.vue'),
    meta: {
      keepAlive: true // 组件需要缓存
    }
  },
  {
    path: '/attention',
    name: 'attention',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/attention/attention.vue') 
  },{
    path: '/shool',
    name: 'shool',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/shool.vue') 
  },{
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/message.vue') 
  },{
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/my/my.vue') 
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
