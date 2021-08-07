import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

//引入 左侧菜单状态的子树
import app from './modules/app';
import user from './modules/user';

//引入getters
import getters from './getters';

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  modules: {
    app,
    user
  }
})