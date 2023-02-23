import axios from "axios";
import qs from "qs";
import store from "@/store/index.js";
// import cache from "@/plugins/cache";
import { ElNotification, ElLoading } from "element-plus";
export const request = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN, // api的base_url
  // baseURL: baseUrl,
  timeout: 1000 * 60 * 4, // request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
// 请求拦截
request.interceptors.request.use(
  (config) => {

    const type = config.headers["Content-Type"];
    if (type.indexOf("json") < 0) {
      config.data = qs.stringify(config.data);
    }
    if (store.stat?.permission.UserInfo) {
      config.headers.token = store.state.permission.UserInfo.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    if (config.data && config.data.repeatSubmit) {
      const requestObj = {
        url: config.url,
        data:
          typeof config.data === "object"
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      };
      // const sessionObj = cache.session.getJSON("sessionObj");
      if (
        sessionObj === undefined ||
        sessionObj === null ||
        sessionObj === ""
      ) {
        // cache.session.setJSON("sessionObj", requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 2000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = "数据正在处理，请勿重复提交";
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          // cache.session.setJSON("sessionObj", requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    // tryHideFullScreenLoading()
    ElNotification({
      message: "请求超时!",
      type: "error",
    });
    Promise.reject(error);
  }
);

// respone interceptor
request.interceptors.response.use(
  (response) => {
    const status = response.status;
    return response.data;

    // tryHideFullScreenLoading()
    if (status === 200) {
      const data = response.data;
      if (data.code === 0) {
        return response.data;
      } else if (data.code === 4002) {
        // 4002 登录凭证已失效，请重新登录！
        store.commit("LOGIN_OUT");
        setTimeout(() => {
          window.location.reload();
        });
      } else {
        if (data.msg) {
          ElNotification({
            message: data.msg,
            type: "warning",
          });
        } else {
          ElNotification({
            message: data.resultMsg,
            type: "warning",
          });
        }
        return response.data;
      }
    }
  },
  (error) => {
    // tryHideFullScreenLoading()
    ElNotification({
      message: error.message,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default request;
