import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

//引入公共样式和iconfont样式
import "./assets/font/iconfont.css";
import '@/assets/styles/common.less';

Vue.config.productionTip = false

//引入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入 echarts图表
import * as echarts from 'echarts';

//将 echarts挂载到 vue原型对象上
Vue.prototype.$echarts = echarts;

//引入封装后的axios
// import request from '@/utils/request';
// 将axios挂载到原型对象上
// Vue.prototype.$axios = request; 

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')