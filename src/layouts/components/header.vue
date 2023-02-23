<template>
       <el-header>
        <div class="logo">
          <img src="@/assets/img/toplogo.png" alt />
        </div>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/products">产品</el-menu-item>
          <el-menu-item index="/solution">解决方案</el-menu-item>
          <el-menu-item index="/case">案例分享</el-menu-item>
          <el-menu-item index="/news">新闻中心</el-menu-item>
          <el-menu-item index="/video">视频中心</el-menu-item>
          <el-menu-item index="/about">关于友机</el-menu-item>
        </el-menu>
      </el-header>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1240px;
  margin: 0 auto;
  //background-color: #fff;

  .logo {
    width: 280px;
    // padding: 10px;
    img {
      width: 100%;
      line-height: 60px;
      background-color: #3924b8;
    height: 60px;
    }
  }
}
</style>