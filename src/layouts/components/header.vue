<template>
  <el-header>
    <div class="logo">
      <img src="@/assets/img/toplogo.png" alt />
    </div>
    <el-menu default-active="/home" class="el-menu-demo" mode="horizontal" background-color="rgba(255,255,255,0)"
      :ellipsis="false" :router="true">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/products">产品</el-menu-item>
      <el-menu-item index="/solution">解决方案</el-menu-item>
      <el-menu-item index="/case">案例分享</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/video">视频中心</el-menu-item>
      <el-menu-item index="/about">关于友机</el-menu-item>
    </el-menu>
    <div class="booking">
      <el-button type="primary">预约体验</el-button>
    </div>
  </el-header>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.el-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.3);

  .logo {
    width: 113px;
    height: 32px;

    // padding: 10px;
    img {
      width: 100%;
    }
  }
}
</style>