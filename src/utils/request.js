//1.引入 axios
import axios from 'axios';

//引入提示信息
import {
  Message
} from 'element-ui';
import store from '@/store/index';

//2.创建axios 实例
const service = axios.create({
  //3.配置baseURL 
  baseURL: process.env.VUE_APP_URL,
  timeout: 10 * 60 * 1000 //10分钟  
})

//4. 请求拦截
service.interceptors.request.use(
  (config) => {
    //配置 请求拦截中的token,是添加Authorization还是添加user-token取决于后台的设置
    // config.headers['user-token'] = store.state.user.token;
    config.headers.Authorization = store.state.user.token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

//5.响应拦截
service.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.code != 666) {
      Message({
        message: data.msg,
        type: "error"
      })
    }
    return data;
  },
  (err) => {
    return Promise.reject(err);
  }
)


const get = (url, data = {}) => {
  return service.get(url, {
    params: data
  });
}
const post = (url, data = {}) => {
  return service.post(url, data);
}

//6.导出
export default {
  get,
  post
};