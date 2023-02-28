import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import "@/assets/css/index.scss";
import App from './App.vue'
// router
import router from './router/index';
import store from './store/index';

import { apiGet, apiPost } from "./api/common";


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//全局方法挂载
app.config.globalProperties.$get = apiGet;
app.config.globalProperties.$post = apiPost;
app.use(router);
app.use(ElementPlus);
app.use(vue3videoPlay);
app.use(store);
app.mount('#app')
