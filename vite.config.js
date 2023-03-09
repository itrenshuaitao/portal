import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),],
      server: {
        port: 8080,//端口号
        host: '0.0.0.0',//ip地址 或 '0.0.0.0' 或 "loaclhost"
        open: true, //启动后是否自动打开浏览器
        https: false, // 是否开启 https
    },

    resolve: {
      // 设置别名
      alias: {

        '@': path.resolve(__dirname, 'src'),
      },
    },

  })
}

