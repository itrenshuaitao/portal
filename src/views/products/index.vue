<template>
  <div class="product">

    <Banner :imgSrc="bannerImg">
    </Banner>

    <div class="tab">
      <el-button v-if="productsList[0]?.productsShow == 0" :type="plain" link :class="active == '1' && 'active'"
        @click="() => handleTabClick('1')">产品集合</el-button>
      <el-button :type="plain" link class="news" :class="active == '2' && 'active'"
        @click="() => handleTabClick('2')">产品亮点</el-button>
      <el-button v-if="productsCaseList[0]?.caseType2 == 0" :type="plain" link :class="active == '3' && 'active'"
        @click="() => handleTabClick('3')">产品案例</el-button>
    </div>
    <template v-if="productsList[0]?.productsShow == 0">
      <div class="title1 title">产品集合</div>
      <div class="product-list">
        <div class="item" v-for="item in productsList">
          <productCard :products="item" @click="() => cardClick(item.id)" />
        </div>
      </div>
    </template>

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
          <div class="text">
            <h2>UJ-iPMS过程监控</h2>
            <p> Ivy过程监控系统通过采集机床NC运行数据（程序号、刀具号、转速、进给倍率等）以及传感器数据（功率、振动），进行综合数据分析，提取每把刀具每次加工的加工曲线（去除主轴加减速以及不同转速下的摩擦力）进行实时监控。
            </p>
          </div>
          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008055ec66f250d77b.png" alt="">

        </el-carousel-item>
        <el-carousel-item>
          <div class="text">
            <h2>UJ-iCDS撞机保护</h2>
            <p> 碰撞监控系统通过在机床主轴附近安装振动传感器，在发生碰撞的一瞬间(1ms响应)根据异常加剧的振动信号识别碰撞，并在识别到碰撞后快速停止机床进行保护，防止进一步的伤害。</p>
          </div>
          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008175ec66f31696da.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <div class="text">
            <h2>UJ-IoM生产制造协同系统 </h2>
            <p> "联网数据采集是现代OEE系统应用的核心基础，通过机联网采集如：设备各种运行状态（状态、持续时间、发生次数）、生产节拍、产出数、生产工艺等参数。
              实现最基础的设备运行状态数据之外，对于设备加工时的工艺和机械参数的监控，有利于收集产品质量检验所需的各项检验指标值，实现加工过程中的质量实时把控，降低由于自动化机器连续作业，且没有采取质量异常制动，从而导致的连续质量报废的损失。"
            </p>
          </div>
          <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/20221008161117634130a5c229c.jpg" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <template v-if="productsCaseList[0]?.caseType2 == 0">
      <div class="title3 title">产品案例</div>
      <div class="case-list">
        <div class="item" v-for="item in productsCaseList">
          <CaseCard :case="item" />
        </div>

      </div>
      <div class="more" @click="() => proxy.$router.push('/case')">
        查看更多案例
      </div>
    </template>


  </div>
</template>
  
<script setup>
import { ref, getCurrentInstance, onMounted } from "vue"
import Banner from "@/components/Banner.vue"
import productCard from "@/components/productCard.vue";
import CaseCard from "@/components/caseCard.vue"
import { queryProductsList, queryCasesList } from "@/api/index"
import { queryBannerImg,handleArraySort } from "@/utils/index"


const { proxy } = getCurrentInstance();
const carousel = ref(null)
const active = ref("1")
const activeTabName = ref('0')
const productsList = ref([])
const productsCaseList = ref([])
const bannerImg = ref('')


onMounted(() => {
  getProductsList()
  getCaseList()
  bannerImg.value = queryBannerImg(1)

})


const getCaseList = () => {
  queryCasesList({ casesPlace: '0' }).then(({ code, data }) => {
    if (code === 0) {
      productsCaseList.value = data.sort((a, b) => b.caseTime < a.caseTime ? -1 : 1).slice(0, 2)
    }
  })
}
const getProductsList = () => {
  const params = {
    pageIndex: 1,
    pageSize: 1000
  }
  queryProductsList(params).then(({ code, data }) => {
    if (code === 0) {
      let list = handleArraySort(data, 'productsTopTime', 'productsTime')
      productsList.value = list
    }
  })
}

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

const cardClick = (id) => {
  proxy.$router.push('/products/detail/' + id)
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

    :deep(.el-carousel__item--card) {

      //   width: 70%;
      //   &.is-active{
      //     // transform: translateX(261.75px) scale(1);
      //   }
      .text {
        position: absolute;
        padding: 100px 45px;

        h2 {
          color: rgb(241, 241, 241);
          font-size: 24px;
          font-weight: 500;
          line-height: 34px;
          margin-bottom: 24px;
        }

        p {
          color: rgb(241, 241, 241);
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }

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
    justify-content: flex-start;
    margin-bottom: 46px;

    .item {
      width: calc((100% - 32px) / 3);
      margin-right: 16px;
    }


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
</style>