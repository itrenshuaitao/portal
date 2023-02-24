<template>
    <div class="product">
      <banner imgSrc="http://www.ujoin-tech.com/uploadfile/upfiles/202005211958595ec66d0395c69.png" title="产品中心" />
      <div class="product-content" v-loading="loading">
        <div class="lacking">
          <h3 class="title">传统管理模式不足</h3>
          <div class="lacking-bottom">
            <div class="lacking-bottom-item">
              <div class="lacking-bottom-item-img">
                <!-- <img src="../assets/img/product-group-icon_3.png" alt /> -->
              </div>
              <p>质量检查、安全检查以抽查为主，难免存在遗漏，留下质量安全隐患。</p>
            </div>
  
            <div class="lacking-bottom-item">
              <div class="lacking-bottom-item-img">
                <!-- <img src="../assets/img/product-group-icon_2.png" alt /> -->
              </div>
              <p>数据统计、数据分析的缺失，无法为统计、分析、项目评估等工作提供数据支撑。</p>
            </div>
  
            <div class="lacking-bottom-item">
              <div class="lacking-bottom-item-img">
                <!-- <img src="../assets/img/product-group-icon_1.png" alt /> -->
              </div>
              <p>检查工作和检查记录文件脱节，无法做到同步对应；缺少影像文档，无法做到可追溯性。</p>
            </div>
          </div>
        </div>
        <!-- 平台目标 -->
        <div class="target">
          <h3 class="title">平台目标</h3>
          <p class="eTitle">TARGET</p>
          <div class="target-img">
            <img src="../assets/img/product_group_3_img.png" alt />
          </div>
        </div>
        <!--功能模块  -->
        <div class="modular">
          <h3 class="title">功能模块</h3>
          <p class="eTitle">MODULAR</p>
          <div class="modular-content">
            <div class="modular-content-same">
              <div class="same-item">
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_1.png" alt />
                </div>
                <p>质量控制模块</p>
              </div>
              <div class="same-item">
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_2.png" alt />
                </div>
                <p>知识仓库模块</p>
              </div>
              <div class="same-item">
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_3.png" alt />
                </div>
                <p>信息流程模块</p>
              </div>
              <div class="same-item">
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_1.png" alt />
                </div>
                <p>定位复核模块</p>
              </div>
            </div>
            <div class="modular-content-center">
              <img src="../assets/img/product_group_4_img.png" alt />
            </div>
            <div class="modular-content-same">
              <div class="same-item">
                <p>信息处理模块</p>
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_5.png" alt />
                </div>
              </div>
              <div class="same-item">
                <p>材料设备模块</p>
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_6.png" alt />
                </div>
              </div>
              <div class="same-item">
                <p>进度控制模块</p>
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_7.png" alt />
                </div>
              </div>
              <div class="same-item">
                <p>安全管理模块</p>
                <div class="same-item-img">
                  <img src="../assets/img/product-group_4-icon_8.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Banner from "@/components/Banner.vue";
  export default {
    data() {
      return {
        loading: true,
      };
    },
    components: {
      Banner
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .product {
    width: 100%;
    height: 100%;
    background-color: #14679f;
  }
  
  .product-content {
    // width: 1240px;
    margin: 0 auto;
    background-color: #fff;
  }
  
  //传统管理模式不足
  .lacking {
    height: 420px;
    padding: 20px 0;
    //margin: 20px 0;
  
    .lacking-bottom {
      display: flex;
      justify-content: space-around;
      padding: 100px 100px;
  
      .lacking-bottom-item {
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        //justify-content: center;
  
        .lacking-bottom-item-img {
          width: 120px;
          height: 120px;
          background: #1667a0;
          border-radius: 50%;
          overflow: hidden;
          line-height: 160px;
        }
      }
      p {
        font-size: 16px;
        text-align: start;
        margin: 10px 0;
      }
    }
  }
  
  //平台目标
  .target {
    margin-top: 50px;
    &-img {
      margin-top: 50px;
      text-align: center;
    }
  }
  
  //
  .modular {
    margin-top: 50px;
    .modular-content {
      padding: 50px 50px;
      display: flex;
      justify-content: space-around;
    }
  }
  .modular-content-same {
    width: 182px;
    height: 405px;
  
    .same-item {
      height: 70px;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
  
      .same-item-img {
        width: 70px;
        height: 70px;
        line-height: 100px;
        background: #1667a0;
        border-radius: 50%;
        text-align: center;
      }
      p {
        color: #1667a0;
        font-weight: 700;
        line-height: 70px;
      }
    }
  }
  
  .modular-content-center {
    width: 355px;
    height: 355px;
    img {
      width: 100%;
    }
  }
  //公共样式
  .title,
  .eTitle {
    font-size: 34px;
    font-weight: 400;
    color: #333;
    text-align: center;
  }
  .eTitle {
    font-size: 30px;
    padding: 10px 0;
  }
  </style>