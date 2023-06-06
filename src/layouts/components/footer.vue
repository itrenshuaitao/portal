<template>
  <div v-if="router.currentRoute.value?.matched[1]?.path !== '/home'" class="footer-booking"
    :style="`background-image: url(${footerData.bottomObj?.bottomImg});`">
    <div class="box">
      <!-- <div class="box-top">
        <div>
          <h2>
            让自动化生产更加可靠
          </h2>
        </div>

      </div> -->
      <div class="box-footer">
        <div class="booking-button" @click="$emit('openBookingDialog')">预约体验</div>
      </div>
    </div>
  </div>
  <el-footer class="footer  clearfix" v-show="isShow">

    <div class="footer-content">
      <ul class="content-nav">

        <li>
          <p>产品</p>
          <span v-for="item in productsList" @click="proxy.$router.push({ path: '/products/detail/' + item.id })">{{
            item.productsName }}</span>

        </li>

        <template v-if="caseList[0] && caseList[0].caseType === 0">
          <li>
            <p>案例分享</p>
            <span v-for="item in solutionList"
              @click="proxy.$router.push({ path: '/case', query: { solutionId: item.id } })">{{
                item.industryName }}</span>
          </li>
        </template>

        <li>
          <p>活动中心</p>
          <span v-if="newsList[0] && newsList[0].newsType === 0" index="/news"
            @click="proxy.$router.push('/news')">新闻中心</span>
          <span
            v-if="(videoList[0] && videoList[0].videoType === 0) || (videoTopList[0] && videoTopList[0].videoType === 0)"
            index="/video" @click="proxy.$router.push('/video')">视频中心</span>
        </li>
        <li>
          <p>关于友机</p>
          <span @click="proxy.$router.push('/about')">公司介绍</span>
          <!-- <span @click="proxy.$router.push('/about/recruit')">人才招聘</span> -->
          <span @click="proxy.$router.push('/about/contact')">联系我们</span>
        </li>
      </ul>
      <div class="line"></div>
      <div class="info">
        <div class="top">


          <img :src="footerData.info?.contactBottomQrcode" alt />
          <p class="tel">{{ footerData.info?.contactBottomPhone }}</p>
          <p class="email">{{ footerData.info?.contactBottomEmail }}</p>
        </div>
        <div class="bottom">
          <p>杭州产研基地：</p>

          <span>
            {{ footerData.addressList?.[0] }}
          </span>
          <p>无锡产研基地：</p>
          <span>{{ footerData.addressList?.[1] }}</span>
          <p>长春分公司：</p>
          <span>
            {{ footerData.addressList?.[2] }}</span>
        </div>


      </div>

    </div>

  </el-footer>
</template>

<script setup>
import { onMounted, reactive, getCurrentInstance, computed } from "vue"
import { useRouter } from 'vue-router';
import { useStore } from "vuex"
import { queryContactList, queryBottomList } from "@/api/index"

const { proxy } = getCurrentInstance()
const store = useStore();
const footerData = reactive({
  info: {},
  addressList: [],
  bottomObj: {}
})

const solutionList = computed(() => store.state.solutionList.slice(0, 6))
const productsList = computed(() => store.state.productsList.slice(0, 7))
const caseList = computed(() => store.state.caseList)
const videoList = computed(() => store.state.videoList)
const videoTopList = computed(() => store.state.videoTopList)
const newsList = computed(() => store.state.newsList)
let router = useRouter()
const isShow = true;
onMounted(() => {
  queryContactList().then(({ code, data }) => {
    if (code === 0) {
      footerData.info = data[0]
      let arr = data[0].contactBottomAddress.split("；")
      arr.map(i => footerData.addressList.push(i))

    }
  })
  queryBottomList().then(({ code, data }) => {
    if (code === 0) {
      footerData.bottomObj = data[0]
    }
  })
})
</script>

<style lang='scss' scoped>
@import "@/assets/css/index.scss";

.footer-booking {
  position: sticky;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 68px;
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
        width: 112px;
        height: 36px;


        background: rgba(0, 57, 110, 0.5);
        box-shadow: inset 0px -1px 4px rgb(255, 255, 255);
        backdrop-filter: blur(21.75px);
        border-radius: 20px;
        color: rgb(255, 255, 255);
        font-family: AliPuHui55;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
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
  // font-family: AliPuHui55;



  &-content {
    margin: 0 66px 22px 120px;
    padding-top: 22px;
    display: flex;
    justify-content: space-between;
    height: 100%;

    .content-nav {
      display: flex;
      justify-content: space-around;
      font-size: 16px;
      color: #FFFFFF;
      flex-grow: 0.3;
      line-height: 19px;

      li {
        display: flex;
        flex-direction: column;
        padding: 0 20px;
        //justify-content: center;
        margin-right: 44px;
        align-items: flex-start;
        // font-family: AliPuHui55;

        &:nth-child(4) {
          margin-right: 0;
        }

        p {
          font-weight: 600;
          padding: 12px 0;
        }

        span {
          padding: 7px 0;
          line-height: 16px;
          transition: 0.3s;
          cursor: pointer;
          font-size: 12px;

          &:hover {
            color: #148FFA;
            transform: translateX(5px);
          }
        }
      }
    }

    .line {
      // position: absolute;
      // right: 38%;
      margin:auto 0;
      width: 1px;
      height: 218px;
      background: #D8D8D8;
    }

    .info {
      flex-grow: 0.3;

      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-start;
      color: rgb(255, 255, 255);


      .top {
        display: flex;
        flex-direction: column;
        align-items: center;

        .tel {
          font-size: 20px;
          font-weight: 400;
          line-height: 28px;

          margin-bottom: 6px;
        }

        .email {
          font-size: 20px;
          font-weight: 400;
          line-height: 28px;
        }

        img {
          margin-bottom: 10px;
          // margin-top: 36px;
          width: 100px;
          height: 100px;
          padding: 10px;
        }
      }

      .bottom {
        color: rgb(255, 255, 255);
        font-size: 12px;
        font-weight: 400;
        line-height: 17px;

        :nth-child(1) {
          margin-top: 12px;
        }

        p {
          font-weight: 600;
          margin-top: 30px;
          margin-bottom: 8px;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0px;
        }

        span {
          font-size: 12px;
        }

      }


    }


  }
}</style>