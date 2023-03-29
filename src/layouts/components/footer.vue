<template>
  <div v-if="router.currentRoute.value?.matched[1]?.path !== '/home'" class="footer-booking" :style="`background-image: url(${footerData.bottomObj?.bottomImg});`">
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
          <span v-for="item in productsList" @click="proxy.$router.push({path:'/products/detail/'+item.id})">{{ item.productsName }}</span>
       
        </li>
        <li>
          <p>案例分享</p>
          <span v-for="item in solutionList" @click="proxy.$router.push({path:'/case',query:{solutionId:item.id}})">{{ item.industryName }}</span>
        </li>
        <li>
          <p>活动中心</p>
          <span @click="proxy.$router.push('/news')">新闻中心</span>
          <span @click="proxy.$router.push('/video')">视频中心</span>
        </li>
        <li>
          <p>关于友机</p>
          <span @click="proxy.$router.push('/about')">公司介绍</span>
          <span @click="proxy.$router.push('/about/recruit')">人才招聘</span>
          <span @click="proxy.$router.push('/about/contact')">联系我们</span>
        </li>
      </ul>
      <div class="line"></div>
      <div class="info">
        <div class="top">
          <div>
            <p class="tel">{{ footerData.info?.contactBottomPhone }}</p>
            <p class="email">{{ footerData.info?.contactBottomEmail }}</p>
          </div>

          <img :src="footerData.info?.contactBottomQrcode" alt />
        </div>
        <div class="bottom">
          <p>杭州产研基地：</p>

          <span>
            {{footerData.addressList?.[0]}}
          </span>
          <p>无锡产研基地：</p>
          <span>{{footerData.addressList?.[1]}}</span>
          <p>长春分公司：</p>
          <span>
            {{footerData.addressList?.[2]}}</span>
        </div>


      </div>

    </div>

  </el-footer>
</template>

<script setup>
import { onMounted, reactive,getCurrentInstance,computed } from "vue"
import { useRouter } from 'vue-router';
import {useStore} from "vuex"
import { queryContactList,queryBottomList } from "@/api/index"

const { proxy } = getCurrentInstance()
const store = useStore();
const footerData=reactive({
  info:{},
  addressList:[],
  bottomObj:{}
})

const solutionList = computed(()=> store.state.solutionList.slice(0,6))
const productsList = computed(()=> store.state.productsList.slice(0,7))
let router = useRouter()
const isShow = true;
onMounted(() => {
  queryContactList().then(({ code, data }) => {
        if (code === 0) {
          footerData.info=data[0]
          let arr = data[0].contactBottomAddress.split("；")
          arr.map(i=>footerData.addressList.push(i))

        }
    })
    queryBottomList().then(({code, data})=>{
      if(code===0){
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
  height: 90px;
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
        font-family: Alibaba PuHuiTi 2.0;

        p {
          font-weight: 600;
          padding: 24px 0;
        }

        span {
          padding: 18px 0;
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
          font-weight: 600;
          margin-top: 20px;
          margin-bottom: 12px;
        }
        span{
          font-size: 12px;
        }

      }


    }


  }
}
</style>