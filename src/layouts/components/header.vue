<template>
  <el-header id="header-main" v-if="!_isMobile()">
    <div class="logo">
      <img src="@/assets/img/toplogo.png" alt />
    </div>
    <el-menu :default-active="router.currentRoute.value?.fullPath" class="el-menu-demo" mode="horizontal"
      background-color="rgba(255,255,255,0)" :ellipsis="false" :router="true" default-active>
      <el-menu-item index="/home">首页</el-menu-item>
      <!-- <el-menu-item index="/products">产品</el-menu-item> -->
      <el-sub-menu popper-class="products-menu" index="/products">
        <template #title>产品</template>
        <el-menu-item index="/products">产品集合</el-menu-item>

        <el-menu-item v-for="item in productsList" :index="`/products/detail/${item.id}`">
          <span>
            <span class="titie">{{ item.productsName}}</span>
            
            <span class="sub">{{ item.productsSubtitle }}</span>
          </span>

        </el-menu-item>

      </el-sub-menu>
      <el-menu-item v-if="solutionList[0] && solutionList[0].industryType === 0" index="/solution">解决方案</el-menu-item>
      <el-menu-item v-if="caseList[0] && caseList[0].caseType === 0" index="/case">案例分享</el-menu-item>
      <el-menu-item v-if="newsList[0] && newsList[0].newsType === 0" index="/news">新闻中心</el-menu-item>
      <el-menu-item
        v-if="(videoList[0] && videoList[0].videoType === 0) || (videoTopList[0] && videoTopList[0].videoType === 0)"
        index="/video">视频中心</el-menu-item>
      <el-sub-menu index="/about">
        <template #title>关于友机</template>
        <el-menu-item index="/about">公司介绍</el-menu-item>
        <!-- <el-menu-item index="/about/recruit">人才招聘</el-menu-item> -->
        <el-menu-item index="/about/contact" style="margin-top: 10px;">联系我们</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="booking">
      <el-button class="btn" type="primary" @click="openDialog">预约体验</el-button>
    </div>
  </el-header>
  <el-header id="header-main" class="mobile-header" v-else>
    <div class="logo">
      <img src="@/assets/img/toplogo.png" alt mode="widthFix"/>
    </div>
    
    <div class="booking">
      <div class="menu" @click="handleDrawer"><img src="@/assets/img/menu.png" alt mode="widthFix"/></div>
      <el-button class="btn" type="primary" @click="openDialog">预约体验</el-button>
    </div>
  </el-header>
  <div class="dialog-main" :class="{'mobile-dialog-main':_isMobile()}">
    <el-dialog v-model="dialogFormVisible" >

      <div class="booking-dialog">
        <div class="box top">
          <p>预约体验</p>
          <p>立即拨打服务热线：400 631 9969 </p>
        </div>
        <div class="box form">
          <el-form ref="bookingRef" :model="form" :rules="rules">
            <el-form-item label="公司名称" :label-width="formLabelWidth" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请输入" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在行业" :label-width="formLabelWidth" prop="industry">
              <el-select :popper-class="_isMobile()? 'mobile-select-industry' : 'select-industry'" v-model="form.industry" clearable placeholder="请选择"
                style="width: 100%;">
                <el-option v-for="(item) in solutionList" :key="item.industryName" :label="item.industryName" :value="item.industryName"  class="select_item"/>
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" placeholder="请输入" autocomplete="off" />
            </el-form-item>

            <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
              <el-input v-model="form.tel" placeholder="请输入" autocomplete="off" />
            </el-form-item>

            <el-form-item label="备注" :label-width="formLabelWidth" class="none">
              <el-input v-model="form.message" placeholder="您遇到了哪些机械加工问题或疑问,欢迎给我们留言..." autocomplete="off" :rows="5"
                type="textarea" />
            </el-form-item>

            <p class="tip">选择友机，即刻开启智造无忧之旅！</p>
            <div class="sub-buttom pointer" @click="submitForm">
              立即预约
            </div>
          </el-form>
        </div>
      </div>


    </el-dialog>
  </div>

  <el-drawer
    title=""
    size="60%"
    v-model="drawer"
    direction="rtl">
    <!-- :default-active="router.currentRoute.value?.fullPath" -->
    <el-menu :default-active="openeds" class="mobile-el-menu-demo" active-text-color="pink"
        background-color="rgba(255,255,255,0)" :ellipsis="false" :router="true" @select="handleSelect">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-sub-menu popper-class="mobile-products-menu" index="/products">
          <template #title>产品</template>
          <el-menu-item index="/products">产品集合</el-menu-item>

          <el-menu-item v-for="item in productsList" :index="`/products/detail/${item.id}`">
            <span>
              <span class="titie">{{ item.productsName}}</span>
              
              <span class="sub">{{ item.productsSubtitle }}</span>
            </span>

          </el-menu-item>

        </el-sub-menu>
        <el-menu-item v-if="solutionList[0] && solutionList[0].industryType === 0" index="/solution">解决方案</el-menu-item>
        <el-menu-item v-if="caseList[0] && caseList[0].caseType === 0" index="/case">案例分享</el-menu-item>
        <el-menu-item v-if="newsList[0] && newsList[0].newsType === 0" index="/news">新闻中心</el-menu-item>
        <el-menu-item
          v-if="(videoList[0] && videoList[0].videoType === 0) || (videoTopList[0] && videoTopList[0].videoType === 0)"
          index="/video">视频中心</el-menu-item>
        <el-sub-menu index="/about">
          <template #title>关于友机</template>
          <el-menu-item index="/about">公司介绍</el-menu-item>
          <el-menu-item index="/about/contact" style="margin-top: 10px;">联系我们</el-menu-item>
        </el-sub-menu>
      </el-menu>
  </el-drawer>
</template>

<script setup>
  import { reactive, ref, onMounted, nextTick, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router';
  import { useStore } from "vuex";
  import { _isMobile } from '@/utils/index'

  import { queryProductsList, queryIndustryList, queryCaseList, queryNewsList, queryVideoList, queryTopVideoList, bookingSendmail } from "@/api/index"
  const { proxy } = getCurrentInstance()

  const store = useStore();
  let router = useRouter()

  const solutionList = ref([])
  const productsList = ref([])
  const caseList = ref([])
  const newsList = ref([])
  const videoList = ref([])
  const videoTopList = ref([])
  const openeds = ref('/products')

  const drawer = ref(false)

  const handleDrawer = () =>{
    drawer.value = true
  }



  const dialogFormVisible = ref(false)
  const formLabelWidth = '4.86111vw'

  const form = reactive({
    name: '',
    companyName: '',
    tel: '',
    industry: '',
    message: '',
  })
  const rules = reactive({
    companyName: [{
      required: true,
      message: '请输入公司名称',
      trigger: 'blur',
    }],
    name: [{
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }],
    industry: [{
      required: true,
      message: '请选择行业',
      trigger: 'blur'
    }],
    tel: [
      { required: true, message: '请输入电话', trigger: 'blur' },
      { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
    ]
  })
  const openDialog = () => {
    dialogFormVisible.value = true
    clearForm()
  }


  onMounted(() => {
    getProductsList()
    getSolutionList()
    getAllCaseList(1)
    getNewsList(1)
    getVideoList(1)

    nextTick(() => {
      window.onscroll = function () {
        var headerMain = document.getElementById('header-main');
        if (window.pageYOffset >= 50) {
          headerMain.classList.add('fixed');
        } else {
          headerMain.classList.remove('fixed');
        }
      }
    })
  })

  const submitForm = () => {
    proxy.$refs.bookingRef.validate((valid, fields) => {
      if (valid) {

        const { name, companyName, tel, industry, message } = form
        console.log('校验通过', form)
        let data = {
          text: `官网预约体验--用户信息：公司名称：${companyName},所在行业：${industry},姓名：${name},电话：${tel},留言：${message}}`
        }
        bookingSendmail(data).then(({ code }) => {
          if (code == 200) {
            dialogFormVisible.value = false
          }
        })

      } else {
        console.log('校验不通过', fields)
      }
    })
  }
  const clearForm = () => {
    form.name = '',
      form.companyName = '',
      form.tel = '',
      form.industry = '',
      form.message = ''
  }

  const getProductsList = () => {
    const params = {
      pageIndex: 1,
      pageSize: 1000,
      sort: 1
    }
    queryProductsList(params).then(({ code, data }) => {
      if (code === 0) {
        productsList.value = data
        store.commit('setProductsList', data)
      }
    })
  }
  const getSolutionList = () => {

    const params = {
      pageIndex: 1,
      pageSize: 1000,
      sort: 1
    }
    queryIndustryList(params).then(({ code, data }) => {
      if (code === 0) {
        solutionList.value = data
        store.commit('setSolutionList', data)

      }
    })
  }

  const getAllCaseList = (pageIndex) => {
    const params = {
      pageIndex,
      pageSize: 3,
      sort: 1
    }
    queryCaseList(params).then(({ code, data }) => {
      if (code === 0) {
        caseList.value = data
        store.commit('setCaseList', data)

      }
    })
  }
  const getNewsList = (pageIndex) => {

    const params = {
      pageIndex,
      pageSize: 3,
      sort: 1
    }
    queryNewsList(params).then(({ code, data }) => {
      if (code === 0) {
        newsList.value = data
        store.commit('setNewsList', data)

      }
    })
  }

  const getVideoList = (pageIndex) => {
    const params = {
      pageIndex,
      pageSize: 3,
      sort: 1
    }
    queryVideoList(params).then(({ code, data }) => {
      if (code === 0) {
        videoList.value = data
        store.commit('setVideoList', data)

      }
    })
    queryTopVideoList(params).then(({ code, data }) => {
      if (code === 0) {
        videoTopList.value = data
        store.commit('setVideoTopList', data)

      }
    })
  }

  const handleSelect = () => {
    drawer.value = false
  }

  defineExpose({
    openDialog
  })
</script>
<style>
.el-drawer__close-btn{
  font-size: 20PX !important;
  color: #fff !important;
}
.el-drawer{
    background-color: #3E4954 !important;
    color: pink !important;
    width: 100vw !important;
    height: 100vh !important;
}
</style>

<style lang='scss' scoped>
.el-header {
  position: fixed;
  padding: 0 120px;
  left: 0;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.6);

  &.fixed {
    background-color: #fff;
  }

  .logo {
    width: 113px;
    height: 32px;

    // padding: 10px;
    img {
      width: 100%;
    }
  }

  :deep(.el-menu--horizontal>.el-menu-item.is-active) {
    font-size: 16px;
    padding: 0;
    margin: 0 var(--el-menu-base-level-padding);
    color: rgb(0, 75, 146) !important;
    font-weight: 500;
    border-bottom: 2px solid rgb(0, 75, 146);
  }


  :deep(.el-menu--horizontal>.el-menu-item) {

    font-weight: 400;
  }


  .booking {
    .btn {
      background: linear-gradient(114.70deg, rgba(25, 108, 255, 1.00) 0%, rgba(0, 84, 167, 1.00) 100%);
      box-shadow: inset 0px -1px 4px rgba(200, 232, 255, 0.41);
      backdrop-filter: blur(21.75px);

      border-radius:
        4px;
    }
  }

  .el-menu-demo {
    border: none;

  }

}
.mobile-header{
  height: 160px;
  line-height: 160px;
  padding: 0;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  .logo{
    width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .booking {
    height: 100%;
    display: flex;
    .menu{
      width: 300px;
      height: 160px;
      margin-right: 30px;
      img{
        width: 100%;
      }
    }
    .btn {
      height: 100%;
      width: 100%;
      background: linear-gradient(114.70deg, rgba(25, 108, 255, 1.00) 0%, rgba(0, 84, 167, 1.00) 100%);
      // box-shadow: inset 0px -1px 4px rgba(200, 232, 255, 0.41);
      // backdrop-filter: blur(21.75px);
      font-size: 32px;
      border-radius: 4px;
    }
  }
}


.products-menu {
  .el-menu-item {
    .sub {
    transform: scale(0.9) !important;
    color: #666666;
  }
  .titie{
    display: inline-block;
    width: 60px;
  }
  
  }

  .is-active>.sub {
    color: #409eff;
    ;
  }

}

.el-drawer{
  padding: 0;
  .el-menu{
    border-right: none !important;
  }
  .mobile-el-menu-demo{
    height: 100%;
    font-size: 40px !important;
    :deep(.el-menu--horizontal>.el-menu-item.is-active) {
      font-size: 16px;
      padding: 0;
      margin: 0 var(--el-menu-base-level-padding);
      color: rgb(0, 75, 146) !important;
      font-weight: 500;
      border-bottom: 2px solid rgb(0, 75, 146);
    }
    .el-menu-item{
      height: 180px;
      line-height: 180px;
      font-size: 60px;
      color: #fff;
      border-bottom: 1px solid #999;
    }
    :deep(.el-sub-menu__title){
      font-size: 60px ;
      height: 180px;
      line-height: 180px;
      color: #fff;
    }
    :deep(.el-sub-menu .el-sub-menu__icon-arrow){
      font-size: 60px;
    }
    .el-sub-menu{
      border-bottom: 1px solid #999;
    }
    .el-sub-menu .is-active{
      border: none;
    }
    
    .el-sub-menu .el-menu-item{
      position: relative;
      font-size: 40px;
      height:120px;
      line-height:120px;
      border: none;
      margin-left: 40px;
      // background: pink;
      &::after {
        position: absolute;
        content: "";
        top: 38px;
        left: -8px;
        position: absolute;
        width: 20px;
        height:40px;
        background-color: #1296db;
      }
    }

  }
}



.select-industry {
  .el-select-dropdown__item {
    font-size: 14px;
    font-family: AliPuHui55;

  }
}
.mobile-select-industry{
  // height: 80PX;
  .el-select-dropdown__item {
    height: 20PX;
    line-height: 20PX;
    font-size: 16PX;
    font-family: AliPuHui55;

  }
}


.dialog-main {
  :deep(.el-dialog) {
    background: rgb(246, 246, 246);
    width: 606px;
    padding: 0;
    border-radius: 24px;
    overflow: hidden;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
    }



    .booking-dialog {
      display: flex;
      justify-content: flex-start;
      color: #fff;
      flex-direction: column;
      align-items: center;
      width: 606px;
      font-family: AliPuHui55;

      .box {
        vertical-align: top;
        width: 100%;

        :deep(.el-form-item__label) {
          font-size: small;
        }


        &.top {
          width: 100%;
          background: linear-gradient(270.00deg, rgba(114.75, 164.25, 191.25, 1.00) 0%, rgba(0, 20.97, 136.61, 1.00) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 152px;

          &::after {
            content: '';
            display: block;
            width: 935.5px;
            height: 127px;
            margin-top: 16px;
            background: rgb(246, 246, 246);
            border-radius: 50% / 100% 100% 0 0;
          }

          :nth-child(1) {
            color: rgb(255, 255, 255);
            font-family: AliPuHui55;
            font-size: 24px;
            font-weight: 600;
            line-height: 34px;
            margin-top: 26px;
          }

          :nth-child(2) {
            margin-top: 7px;

          }
        }

        &.form {
          padding: 0 50px 0 20px;
          box-sizing: border-box;

          .el-form-item__label {
            font-family: AliPuHui55;
            opacity: 0.85;
            font-size: 14px;
            font-weight: 400;
            line-height: 32px;
            text-align: justify;
            text-align-last: justify;
            display: block;
            word-break: break-all;
            text-justify: distribute;
            position: relative;
            padding-right: 14px;

            &::after {
              content: '*';
              position: absolute;
              left: -10px;
              color: red;
            }

            &::before {
              display: none;
            }

          }

          .none .el-form-item__label {
            &::after {
              display: none;

            }
          }



          .tip {
            color: rgb(0, 75, 146);
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: center;
          }

          .sub-buttom {
            width: 125px;
            height: 42px;
            margin: 40px auto;
            background: rgb(52, 79, 145);
            box-shadow: 2px 2px 10px rgba(82, 125, 167, 0.32);
            border-radius: 52px;
            color: rgb(255, 255, 255);
            font-size: 16px;
            font-weight: 400;
            line-height: 42px;
            letter-spacing: 0px;
            text-align: center;
          }
        }
      }
    }
  }
}
.mobile-dialog-main {
  margin: 0 10PX;
  :deep(.el-dialog) {
    width: 96%;
    padding: 0;
    border-radius: 24px;
    background-color: rgb(246, 246, 246);
    overflow: hidden;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
    }


    .booking-dialog {
      display: flex;
      justify-content: flex-start;
      color: #fff;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-family: AliPuHui55;

      .box {
        vertical-align: top;
        width: 100%;

        :deep(.el-form-item__label) {
          font-size: small;
        }


        &.top {
          width: 100%;
          background: linear-gradient(270.00deg, rgba(114.75, 164.25, 191.25, 1.00) 0%, rgba(0, 20.97, 136.61, 1.00) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 220px;

          &::after {
            content: '';
            display: block;
            width: 935.5px;
            height: 40px;
            margin-top: 60px;
            background: rgb(246, 246, 246);
            border-radius: 50% / 100% 100% 0 0;
          }

          :nth-child(1) {
            color: rgb(255, 255, 255);
            font-family: AliPuHui55;
            font-size: 50px;
            font-weight: 600;
            line-height: 34px;
            margin-top: 30px;
            margin-bottom: 20px;
          }

          :nth-child(2) {
            font-size: 40px;
          }
        }

        &.form {
          margin-top: 10PX;
          padding: 0 50px 0 20px;
          box-sizing: border-box;
          .el-form-item{
            display: flex;
            align-items: center;
            margin-bottom: 16PX;
            
          }
          .el-select .el-input__wrapper,.el-input__inner{
            height: 36PX;
            font-size: 40px;
          }
          .el-textarea__inner{
            height: 60PX; 
            font-size: 40px;         
          }
          input::placeholder{
            font-size: 36px;
          }
          textarea::placeholder{
            font-size: 36px;
          }
          .el-form-item__error{
            font-size: 40px;
          }
          .el-form-item__label {
            width:22% !important;
            font-family: AliPuHui55;
            opacity: 0.85;
            font-size: 60px;
            font-weight: 400;
            line-height: 32px;
            text-align: justify;
            text-align-last: justify;
            display: block;
            word-break: break-all;
            text-justify: distribute;
            position: relative;
            padding-right: 6px;
            padding-left:6PX;

            &::after {
              content: '*';
              position: absolute;
              left: -10px;
              color: red;
            }

            &::before {
              display: none;
            }

          }

          .none .el-form-item__label {
            &::after {
              display: none;
            }
          }



          .tip {
            color: rgb(0, 75, 146);
            font-size: 32px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: center;
          }

          .sub-buttom {
            width: 300px;
            height: 102px;
            line-height: 102px;
            margin: 40px auto;
            background: rgb(52, 79, 145);
            box-shadow: 2px 2px 10px rgba(102, 125, 167, 0.32);
            border-radius: 52px;
            color: rgb(255, 255, 255);
            font-size: 42px;
            font-weight: 400;
            letter-spacing: 0px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>