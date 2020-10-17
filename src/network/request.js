import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',	  
    timeout: 5000
  })
  //2.axios拦截器
  instance.interceptors.request.use((config) => {
      return config
  }, err => {
    console.log('请求错误拦截', err);
    return err;
  })

  instance.interceptors.response.use((response) => {
    return response.data;
  }, err => {
    console.log('响应错误拦截', err);
    if(err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break; 
        case 401: 
          err.message = '未授权的访问';
          break;
      }
    }
    return err;
  })

  //3.发送真正的网络请求
  return instance(config)
}
