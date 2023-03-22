<template>
  <div v-if="router.currentRoute.value?.matched[1]?.path !== '/home'" class="footer-booking">
    <div class="box">
      <!-- <div class="box-top">
        <div>
          <h2>
            让自动化生产更加可靠
          </h2>
        </div>

      </div> -->
      <div class="box-footer">
        <el-button class="booking-button" type="primary" color="rgb(0, 53, 106)"
          @click="$emit('openBookingDialog')">预约体验</el-button>
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
        <div class="top">
          <div>
            <p class="tel">400-631-9969</p>
            <p class="email">info@ujoin-tech.com</p>
          </div>

          <img src="@/assets/img/ico.jpg" alt />
        </div>
        <div class="bottom">
          <p>杭州产研基地： </p>

          <span>
            杭州市上城区鸿泰路128号环翼城4幢1401室
          </span>
          <p>无锡产研基地</p>
          <span>无锡市新吴区灵江路7号</span>
          <p>长春分公司：</p>
          <span>
            长春市汽车开发区乙一路盛世汽车产业园D5栋317室</span>
        </div>


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
  height: 90px;
  background-image: url(http://47.92.145.39:9003/images/20230316141447.jpg);
  background-repeat: no-repeat;
  background-size: 100% 90px;

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;

    .box-top {
      margin-top: 33px;

      margin-bottom: 20px;

      h2 {
        color: rgb(0, 53, 106);
        font-size: 28px;
        font-weight: 500;
        line-height: 33px;
        letter-spacing: 4px;
        text-align: center;
        text-shadow: #fff 2px 2px 0;

      }


    }

    .box-footer {
      .booking-button {
        width: 168px;
        height: 53px;
        font-size: 24px;
        font-weight: 400;
        line-height: 34px;
      }
    }

    .box-bottom {
      @include show_line(2);
      color: rgb(0, 53, 106);
      ;
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
    justify-content: space-around;
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
          transition: 0.3s;
          cursor: pointer;

          &:hover {
            color: #148FFA;
            transform: translateX(5px);
          }
        }
      }
    }

    .line {
      position: absolute;
      right: 38%;
      width: 1px;
      height: 90%;
      background: #D8D8D8;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: rgb(255, 255, 255);


      .top {
        display: flex;
        align-items: center;

        .tel {

          font-size: 32px;
          font-weight: 500;
          line-height: 45px;
          margin-bottom: 16px;
        }

        .email {
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
        }

        img {
          margin-left: 12px;
          width: 100px;
          height: 100px;
          padding: 10px;
        }
      }

      .bottom {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;

        p {
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 12px;
        }
   
      }


    }


  }
}
</style>