import Router from 'vue-router';
import Vue from 'vue';
import store from '@/store/index';
Vue.use(Router);

// 基础路由,不需要权限就可以访问的路由
const baseRoutes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}]

import adminRoutes from "./adminRouter"
import superRoutes from "./superRouter"
export {
  adminRoutes,
  superRoutes
}


// 创建路由
const router = new Router({
  // mode: 'history',
  routes: baseRoutes
});



/**
 * 应用一开始加载的baseRoutes, 登录后才会根据角色添加路由
 * 若是登录之后在浏览其他页面的时候刷新页面, 则不会再去登录,而是直接读取角色的值
 * 因为使用了vuex持久化, 所有角色的值是被存储到了本地, 所以可以读取得到
 * 这段代码的目的是保证刷新后还可以继续访问页面
 */
// 获取角色
let role = store.state.user.role;
if (role == 1) {
  router.addRoutes(superRoutes);
} else if (role == 2) {
  router.addRoutes(adminRoutes);
}

/**
 * 路由守卫设置
 * @param to 即将要进入的目标路由
 * @param from 当前导航正要离开的路由
 * @param next next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 */
// 路由白名单(不需要检查就可以直接通过进行下一步的路由)
const whitList = ['/login'];
router.beforeEach((to, from, next) => {

  // 已登录
  if (store.state.user.token) {
    if (to.path === '/login') {
      next('/home');
    } else {
      next();
    }
  } else {
    // 未登录
    if (whitList.includes(to.path)) {
      // 白名单内的路由直接放过
      next();
    } else {
      next('/login');
    }

  }
})

export default router;