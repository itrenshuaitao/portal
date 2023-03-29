import axios from "axios";
import qs from "qs";
import store from "../store/index.js";
import Cookies from 'js-cookie';
import { ElMessage, ElLoading } from "element-plus";
export const request = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN, // api的base_url
  timeout: 1000 * 60 * 4, // request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
// 请求拦截
request.interceptors.request.use(
  config => {
    const type = config.headers["Content-Type"];
    if (type.indexOf("json") < 0) {
      config.data = qs.stringify(config.data);
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const status = response.status;
    // tryHideFullScreenLoading()
    if (status === 200) {
      const data = response.data;
      if (data.code === 0) {
        return response.data;
      } else if (data.code === 4002) {
        // 4002 登录凭证已失效，请重新登录！
        let gather_eam = Cookies.get('gather_eam');
        if (gather_eam == 1) {
          let backUrl = Cookies.get('backUrl')
          window.location = backUrl + 'gather'
        } else {
          store.commit("LOGIN_OUT");
          setTimeout(() => {
            window.location.reload();
          });
        }   
      } else if(data.code ===200&&data.resultMsg){
        ElMessage.success({
          message: data.resultMsg,
        });
        return response.data;
      } else {
        if (data.msg) {
          ElMessage.warning({
            message: data.msg,
          });
        } else {
          ElMessage.warning({
            message: data.resultMsg,
          });
        }
        return response.data;
      }
    }
  },
  (error) => {
    ElMessage.error({ message: error.message }); // for debug
    return Promise.reject(error);
  }
);

export default request;
