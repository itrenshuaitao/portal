import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),],
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT, // 本地服务端口
      fs: {
        // 可以为项目根目录的上一级提供服务
        allow: [".."],
      },
    },
    resolve: {
      // 设置别名
      alias: {

        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}

