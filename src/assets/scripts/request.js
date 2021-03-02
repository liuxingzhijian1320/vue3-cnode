import axios from "axios";

var request = axios.create();
request.defaults.timeout = 20000;

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // config.headers['token'] = 123
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    // 错误日志收集
    return Promise.reject(error);
  }
);

export default request;
