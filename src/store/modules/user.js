//管理用户相关的状态值

//引入 md5
import md5 from 'md5';
import router, {
  adminRoutes,
  superRoutes
} from '@/router/index'

//引入后台接口
import $axios from '@/utils/request';

const user = {
  state: {
    username: 'super',
    realname: '超级管理员',
    role: 1,
    token: ''

    // name: getCookie("name"),//登录后的用户的中文名   保存在 cookie
    // roleid: getCookie("roleid")  //1超级管理员 2 普通用户   保存在 cookie
  },
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_REALNAME(state, payload) {
      state.realname = payload;
    },
    SET_ROLE(state, payload) {
      state.role = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    }
  },

  actions: {
    //登录动作 context ={commit,state}
    LoginAC({
      commit
    }, userInfo) {

      //写成promise的形式
      return new Promise((resolve) => {
        const {
          password
        } = userInfo;
        userInfo.password = md5(password);

        //调用后台接口
        $axios.post('/user/login', userInfo).then(res => {
          if (res.code == 666) {
            if (res.result.role == 1) {
              // 添加超级管理员权限路由
              router.addRoutes(superRoutes);
            } else if (res.result.role == 2) {
              // 添加管理员权限
              router.addRoutes(adminRoutes);
            }

            let {
              username,
              realname,
              role,
              token
            } = res.result;
            commit('SET_USERNAME', username);
            commit('SET_REALNAME', realname);
            commit('SET_ROLE', role);
            commit('SET_TOKEN', token);
            resolve(res);
          }
        })
      })

    },



    //退出操作
    LogoutAC({
      commit
    }) {
      //设置 store
      commit('SET_USERNAME', '');
      commit('SET_REALNAME', '');
      commit('SET_ROLE', '');
      commit('SET_TOKEN', '');
    }
  }
}
export default user;