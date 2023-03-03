<template>
  <el-footer class="footer  clearfix" v-show="isShow">
    <div class="footer-booking">

    </div>
    <div class="footer-content">
      <ul class="content-nav">

        <li>
          <p>产品</p>
          <span>PMS</span>
          <span>CDS</span>
          <span>IPS</span>
          <span>MCM</span>
          <span>TOM</span>
          <span>机床联网</span>
          <span>生产执行系统</span>
        </li>
        <li>
          <p>案例分享</p>
          <span>3C行业</span>
          <span>汽车行业</span>
          <span>医疗行业</span>
          <span>航天航空/军工行业</span>
          <span>模具行业</span>
          <span>其他通用行业</span>
        </li>
        <li>
          <p>活动中心</p>
          <span>新闻中心</span>
          <span>视频中心</span>
        </li>
        <li>
          <p>关于友机</p>
          <span>公司简介</span>
          <span>人才招聘</span>
          <span>联系我们</span>
        </li>
      </ul>
      <div class="line"></div>
      <div class="info">
        <p>400-631-9969</p>
        <p>info@ujoin-tech.com</p>
        <!-- <img src="./assets/img/ercode.png" alt /> -->

        <img src="@/assets/img/ico.jpg" alt />
        <p>杭州产研基地： <br />杭州市上城区鸿泰路128</p>
        <p>无锡产研基地： <br />无锡市新吴区灵江路7号</p>

      </div>

    </div>

  </el-footer>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,

    };
  },
}
</script>

<style lang='scss' scoped>
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  background-color: #3E4954;

  .footer-booking {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 282px;
    background-color: #2f78c2;
  }

  &-content {
    margin: 0 auto;
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;
    height: 100%;

    .content-nav {
      display: flex;
      justify-content: space-around;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 19px;

      li {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        //justify-content: center;
        align-items: flex-start;

        p {
          padding: 24px 0;
        }

        span {
          padding: 18px 0;
          line-height: 16px;
        }
      }
    }

    .line {
      position: absolute;
      right: 35%;
      width: 1px;
      height: 90%;
      background: #D8D8D8;
    }

    .info {
      img {
        width: 100px;
        height: 100px;
        padding: 10px;
        background-color: pink;
      }
    }


  }
}</style>