// vite.config.js
import { defineConfig } from "file:///D:/Code/%E5%B7%A5%E4%BD%9C/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/vite-project/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Code/%E5%B7%A5%E4%BD%9C/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/vite-project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Code/%E5%B7%A5%E4%BD%9C/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/vite-project/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\Code\\\u5DE5\u4F5C\\\u516C\u53F8\u5B98\u7F51\\vite-project";
var vite_config_default = ({ mode }) => {
  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      })
    ],
    server: {
      port: 8080,
      //端口号
      host: "0.0.0.0",
      //ip地址 或 '0.0.0.0' 或 "loaclhost"
      open: true,
      //启动后是否自动打开浏览器
      https: false
      // 是否开启 https
    },
    resolve: {
      // 设置别名
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXFx1NURFNVx1NEY1Q1xcXFxcdTUxNkNcdTUzRjhcdTVCOThcdTdGNTFcXFxcdml0ZS1wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDb2RlXFxcXFx1NURFNVx1NEY1Q1xcXFxcdTUxNkNcdTUzRjhcdTVCOThcdTdGNTFcXFxcdml0ZS1wcm9qZWN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Db2RlLyVFNSVCNyVBNSVFNCVCRCU5Qy8lRTUlODUlQUMlRTUlOEYlQjglRTUlQUUlOTglRTclQkQlOTEvdml0ZS1wcm9qZWN0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBiYXNlOiAnLi8nLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgdnVlSnN4KHtcbiAgICAgICAgLy8gb3B0aW9ucyBhcmUgcGFzc2VkIG9uIHRvIEB2dWUvYmFiZWwtcGx1Z2luLWpzeFxuICAgICAgfSksXSxcbiAgICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiA4MDgwLC8vXHU3QUVGXHU1M0UzXHU1M0Y3XG4gICAgICAgIGhvc3Q6ICcwLjAuMC4wJywvL2lwXHU1NzMwXHU1NzQwIFx1NjIxNiAnMC4wLjAuMCcgXHU2MjE2IFwibG9hY2xob3N0XCJcbiAgICAgICAgb3BlbjogdHJ1ZSwgLy9cdTU0MkZcdTUyQThcdTU0MEVcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcbiAgICAgICAgaHR0cHM6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcbiAgICB9LFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgLy8gXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXG4gICAgICBhbGlhczoge1xuXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gIH0pXG59XG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxvQkFBb0I7QUFDN1YsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsQ0FBQztBQUFBLElBQUU7QUFBQSxJQUNILFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFDTixNQUFNO0FBQUE7QUFBQSxNQUNOLE9BQU87QUFBQTtBQUFBLElBQ1g7QUFBQSxJQUVBLFNBQVM7QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBLFFBRUwsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLEVBRUYsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
