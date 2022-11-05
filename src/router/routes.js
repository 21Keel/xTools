export default [
  // 登录页
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  // 中心页
  {
    name: 'center',
    path: '/center',
    component: () => import('@/pages/Center.vue'),
  },
  // 更新日志
  {
    name: 'system-log',
    path: '/system/log',
    component: () => import('@/pages/system/Log.vue'),
  },
  // 工时记录
  {
    name: 'work-time',
    path: '/work-time',
    component: () => import('@/pages/app/WorkTime.vue'),
  },
  // 重定向
  {
    path: '*',
    redirect: '/center',
  },
]
