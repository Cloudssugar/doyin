import { createRouter, createWebHistory } from 'vue-router' // history
// createWebHashHistory hash

const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/login', //  登录注册页
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: {
      keepAlive: true // 组件需要缓存
    }
  },
  {
    path: '/search/video',
    name: 'searchVideo',
    component: () => import('../views/home/searchVideo.vue')
  },
  {
    path: '/search/user',
    name: 'searchUser',
    component: () => import('../views/home/searchUser.vue')
  },
  {
    path: '/attention',
    name: 'attention',
    component: () => import('../views/attention/attention.vue')
  },
  {
    path: '/shoot',
    name: 'shoot',
    component: () => import('../views/shoot/shoot.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message/message.vue')
  },
  {
    path: '/vermicelli',
    name: 'vermicelli',
    component: () => import('../views/message/vermicelli.vue')
  },
  {
    path: '/zan',
    name: 'zan',
    component: () => import('../views/message/zan.vue')
  },
  {
    path: '/at',
    name: 'at',
    component: () => import('../views/message/at.vue')
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('../views/message/review.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/message/contact.vue')
  },
  {
    path: '/chat/:id?',
    name: 'chat',
    component: () => import('../views/message/chat.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my/my.vue'),
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
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/userinfo.vue')
  },
  {
    path: '/follow',
    name: 'follow',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/follow.vue')
  },
  {
    path: '/myvermicelli',
    name: 'myvermicelli',
    component: () => import(/* webpackChunkName: "about" */ '../views/my/myvermicelli.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫 ————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  // 登录和注册  首页界面进行选择
  if (to.path === '/login' || to.path === '/home') {
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

// 进入页面的标题
router.afterEach((to, from) => {
  if (to.path === '/home') {
    document.title = '抖音记录美好生活'
  }
  if (to.path === '/attention') {
    document.title = '动态'
  }
  if (to.path === '/shoot') {
    document.title = '发布视频'
  }
  if (to.path === '/message') {
    document.title = '消息'
  }
  if (to.path === '/my/videoAndDesc') {
    document.title = '我的'
  }
})

export default router
