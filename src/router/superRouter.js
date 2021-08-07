import Layout from '@/views/layout'
import adminRouter from './adminRouter'
export default [
  // 管理员路由
  ...adminRouter,

  // 超级管理员特有的路由，特有用户管理路由
  {
    name: 'user',
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    // 存放路由变量
    meta: {
      title: '用户管理',
      icon: 'icon-yonghu'
    },

    children: [{
        name: 'UserList',
        path: 'list',
        component: () => import("@/views/user/list.vue"),
        meta: {
          title: '用户列表',
          icon: 'icon-liebiao'
        }
      },
      {
        name: 'UserAdd',
        path: 'add',
        component: () => import("@/views/user/add.vue"),
        meta: {
          title: '添加用户',
          icon: 'icon-tianjia'
        }
      },
      {
        name: 'UserEdit',
        path: 'edit',
        component: () => import("@/views/user/edit.vue"),
        meta: {
          title: '编辑用户',
          icon: 'icon-bianji',

          // 该路由不在页面显示
          hidden: true
        }
      },
    ]
  },
]