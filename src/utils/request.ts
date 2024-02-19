import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 6000,
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let msg = "";
    const status = error.response.status;
    switch (status) {
      case 401:
        msg = "没有登录";
        break;
      case 403:
        msg = "登录了，没有权限";
        break;
      case 404:
        msg = "没有找到资源";
        break;
      case 500:
        msg = "服务器错误";
        break;
    }

    ElMessage({
      type: "error",
      message: msg,
    });

    return Promise.reject(error);
  }
);

export default request;
