<template>
  <div class="product">

    <Banner title="产品中心" subTitle="产品-以机床监控为核心的数字化工厂解决方案" color="rgb(62, 73, 84)"
      imgSrc="https://easyv.assets.dtstack.com/homepage/common/assets/images/market-consultation/search_bg.jpg"></Banner>

    <div class="tab">
      <el-button :type="plain" link :class="active == '1' && 'active'" @click="() => handleTabClick('1')">产品集合</el-button>
      <el-button :type="plain" link class="news" :class="active == '2' && 'active'"
        @click="() => handleTabClick('2')">产品亮点</el-button>
      <el-button :type="plain" link :class="active == '3' && 'active'" @click="() => handleTabClick('3')">产品案例</el-button>
    </div>
    <div class="title1 title">产品集合</div>
    <div class="product-list">
      <div class="item" v-for="item in 7">
        <productCard />
      </div>
    </div>
    <div class="title2 title">产品亮点</div>
    <div class="highlights">
      <el-tabs v-model="activeTabName" stretch @tab-click="handleHighlightsClick">
        <el-tab-pane name="0">
          <template #label>
            <span class="custom-tabs-label">
              <div>
                <img src="@/assets/img/thumb_buy@1x.png" alt="">
              </div>
              <p>亮点一</p>
            </span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="1">
          <template #label>
            <span class="custom-tabs-label">
              <div>
                <img src="@/assets/img/thumb_design@1x.png" alt="">
              </div>
              <p>亮点二</p>
            </span>
          </template>
        </el-tab-pane> <el-tab-pane name="2">
          <template #label>
            <span class="custom-tabs-label">
              <div>
                <img src="@/assets/img/thumb_book@1x.png" alt="">
              </div>
              <p>亮点三</p>
            </span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-carousel ref="carousel" :interval="4000" type="card" height="380px" indicator-position="none" :autoplay="false"
        arrow="never" @change="val => activeTabName = val.toString()">
        <el-carousel-item>
          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008055ec66f250d77b.png" alt="">

        </el-carousel-item>
        <el-carousel-item>
          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008175ec66f31696da.png" alt="">
        </el-carousel-item>
        <el-carousel-item>

          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/20221008161117634130a5c229c.jpg" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="title3 title">产品案例</div>
    <div class="case-list">
      <div class="item" v-for="item in 3">
        <CaseCard />
      </div>
      <div class="more" @click="()=>proxy.$router.push('/case')">
        查看更多案例
      </div>
    </div>

  </div>
</template>
  
<script setup>
import { ref, getCurrentInstance } from "vue"
import Banner from "@/components/Banner.vue"
import productCard from "@/components/productCard.vue";
import CaseCard from "@/components/caseCard.vue"

const { proxy } = getCurrentInstance();
const carousel = ref(null)
const active = ref("1")
const activeTabName = ref('0')
const handleTabClick = (val) => {
  active.value = val
  let toHeight = document.querySelector(`.title${val}`).offsetTop

  window.scrollTo({
    top: toHeight - 90,
    behavior: "smooth"
  });
}
const handleHighlightsClick = (tab) => {
  proxy.$refs.carousel.setActiveItem(Number(tab.props.name))
}
</script>
  
<style lang="scss" scoped>
.product {
  width: 100%;
  height: 100%;


  .tab {
    height: 60px;
    background: #F9F9F9;
    border: 1px solid #E5E5E5;
    padding: 0 120px;
    font-size: 14px;
    color: #3E4954;
    line-height: 17px;

    .active {
      font-size: 16px;
      color: #0054A7;
      line-height: 18px;
    }

    .el-button {
      margin: 20px 0;
    }

    .news {
      margin: 20px;
    }
  }

  .title {
    height: 56px;
    font-size: 40px;
    color: #3E4954;
    line-height: 47px;
    text-align: center;
    margin: 40px 0;
  }

  .product-list {
    margin-left: 120px;
    margin-right: 120px;
    display: flex;

    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: row;

    .item {
      width: 31%;
      margin-bottom: 40px;
      margin-right: 24px;

      &:nth-of-type(3n+0) {
        margin-right: 0;
      }
    }
  }

  .highlights {
    padding: 40px 200px;
    background: linear-gradient(180.00deg, rgba(250, 251, 253, 1) 0%, rgba(242, 243, 245, 1) 100%), rgb(242, 245, 248);

    :deep(.el-tabs__item) {
      height: auto;
      padding-bottom: 22px;
    }

    // :deep(.el-carousel__item--card){
    //   width: 70%;
    // }

    .custom-tabs-label {
      img {
        width: 68px;
        height: 51px;

      }

      p {
        font-size: 24px;
        font-weight: 500;
        line-height: 34px;
      }
    }

    .img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }

  .case-list {
    padding: 0 120px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 46px;

    .item {
      width: 32%;
    }

    .more {
      margin: 46px auto;
      width: 191px;
      height: 40px;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #6C7B8B;
      font-size: 24px;
      font-weight: 400;
      color: #6C7B8B;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>