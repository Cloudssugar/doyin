import { createRouter, createWebHistory } from 'vue-router' // history
// createWebHashHistory hash

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home/home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home/home.vue'),
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
    path: '/search/video',
    name: 'searchVideo',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home/searchVideo.vue')
  },
  {
    path: '/search/user',
    name: 'searchUser',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/home/searchUser.vue')
  },
  {
    path: '/attention',
    name: 'attention',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/attention/attention.vue')
  },
  {
    path: '/shool',
    name: 'shool',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/shool.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/message.vue')
  },
  {
    path: '/vermicelli',
    name: 'vermicelli',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/vermicelli.vue')
  },
  {
    path: '/zan',
    name: 'zan',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/zan.vue')
  },
  {
    path: '/at',
    name: 'at',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/at.vue')
  },
  {
    path: '/review',
    name: 'review',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/review.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/message/contact.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: 'importPage' */ '../views/my/my.vue'),
    children: [
      {
        path: 'video',
        name: 'video',
        component: () => import(/* webpackChunkName: "about" */ '../views/my/video.vue')
      },
      {
        path: 'videoAndDesc',
        name: 'videoAndDesc',
        component: () => import(/* webpackChunkName: "about" */ '../views/my/videoAndDesc.vue')
      },
      {
        path: 'likes',
        name: 'likes',
        component: () => import(/* webpackChunkName: "about" */ '../views/my/likes.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫 ————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  // 登录和注册  首页界面进行选择
  if (to.path === '/login'  || to.path === '/home') {
    next()
  } else {
    // 如果没有 userId 就去登录
    if (!localStorage.getItem('userId')) {
      next({
        path: '/login'
      })
    } else {
      // 不写代表直接可以过去
      next()
    }
  }
})

export default router
