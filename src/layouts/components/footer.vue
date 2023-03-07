<template>
  <div v-if="router.currentRoute.value?.matched[1]?.path !== '/home'" class="footer-booking">
    <div class="box">
      <div class="box-top">
        <div>
          <h2>
            刀具监控
          </h2>
          <p>让自动化生产更加可靠</p>
        </div>
        <div>
          <el-button type="primary" color="rgb(0, 84, 167)" @click="$emit('openBookingDialog')">预约体验</el-button>

        </div>
      </div>
      <div class="box-bottom">
        实时监控每把刀具每次加工的功率变化，一旦发生断刀、崩刃、过度磨损等常见刀具故障，和工件/刀具缺失、空加工、装夹错误等常见加工问题，系统立即通过提醒、报警和停机等方式自动干预加工过程，从而防止后续刀具损坏、批量废品、甚至机床损坏等进一步经济损失，降低生产风险和成本，提高生产稳定性和加工过程品质。
      </div>
    </div>
  </div>
  <el-footer class="footer  clearfix" v-show="isShow">

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

<script setup>
import { useRouter } from 'vue-router';
let router = useRouter()
const isShow = true;
</script>

<style lang='scss' scoped>
@import "@/assets/css/index.scss";

.footer-booking {
  position: sticky;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 290px;
  background-image: url(https://img.tukuppt.com/ad_preview/00/03/79/5c98b10ebb1ec.jpg!/fw/780);
  background-repeat: no-repeat;
  background-size: 100% 290px;

  .box {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 40px 62px 32px 62px;
    padding: 24px 100px;
    background: linear-gradient(180.00deg, rgba(250, 251, 253, 0.15294117647058825) 0%, rgba(242, 243, 245, 1) 100%);
    box-shadow: inset 0px -1px 7px rgba(200, 232, 255, 0.41);
    backdrop-filter: blur(10.87px);
    border-radius: 4px;

    .box-top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 26px;

      h2 {
        color: rgb(0, 75, 146);
        font-size: 36px;
        font-weight: 400;
        line-height: 50px;
        margin-bottom: 8px;
      }

      p {
        color: rgb(62, 73, 84);
        font-size: 24px;
        font-weight: 400;
        line-height: 34px;
      }
    }

    .box-bottom {
      @include show_line(2);
      color: rgb(62, 73, 84);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }
}

.footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  background-color: #3E4954;



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
}
</style>