<template>
  <div class="product">
  
    <Banner title="产品中心" subTitle="产品-以机床监控为核心的数字化工厂解决方案" color="rgb(62, 73, 84)" imgSrc="https://easyv.assets.dtstack.com/homepage/common/assets/images/market-consultation/search_bg.jpg"></Banner>

    <div class="tab">
      <el-button :type="plain" link :class="active == '1' && 'active'"
        @click="() => handleTabClick('1')">产品集合</el-button>
      <el-button :type="plain" link class="news" :class="active == '2' && 'active'"
        @click="() => handleTabClick('2')">产品亮点</el-button>
      <el-button :type="plain" link :class="active == '3' && 'active'"
        @click="() => handleTabClick('3')">产品案例</el-button>
    </div>
    <div class="title1 title">产品集合</div>
    <div class="title2 title">产品亮点</div>
    <div class="title3 title">产品案例</div>
  </div>
</template>
  
<script setup>
import Banner from "@/components/Banner.vue"

import { ref } from "vue"
const active = ref("1")
const handleTabClick = (val) => {
  active.value = val
  let toHeight = document.querySelector(`.title${val}`).offsetTop

  window.scrollTo({
    top: toHeight - 90,
    behavior: "smooth"
  });
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
}

.product-content {
  margin: 0 auto;
  background-color: #fff;
}
</style>