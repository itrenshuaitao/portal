import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'video.js/dist/video-js.min.css'
import 'element-plus/dist/index.css'
import "@/assets/css/index.scss";
import App from './App.vue'
// router
import router from './router/index';
import store from './store/index';

import { apiGet, apiPost } from "./api/common";


const app = createApp(App);

//全局方法挂载
app.config.globalProperties.$get = apiGet;
app.config.globalProperties.$post = apiPost;
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount('#app')
