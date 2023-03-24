<template>
  <el-header id="header-main">
    <div class="logo">
      <img src="@/assets/img/toplogo.png" alt />
    </div>
    <el-menu :default-active="router.currentRoute.value?.matched[1]?.path" class="el-menu-demo" mode="horizontal"
      background-color="rgba(255,255,255,0)" :ellipsis="false" :router="true">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/products">产品</el-menu-item>
      <el-menu-item v-if="solutionList[0] && solutionList[0].industryType === 0" index="/solution">解决方案</el-menu-item>
      <el-menu-item v-if="caseList[0] && caseList[0].caseType === 0" index="/case">案例分享</el-menu-item>
      <el-menu-item v-if="newsList[0] && newsList[0].newsType === 0" index="/news">新闻中心</el-menu-item>
      <el-menu-item v-if="videoList[0] && videoList[0].videoType === 0" index="/video">视频中心</el-menu-item>
      <el-sub-menu index="/about">
        <template #title>关于友机</template>
        <el-menu-item index="/about">公司介绍</el-menu-item>
        <el-menu-item index="/about/recruit">人才招聘</el-menu-item>
        <el-menu-item index="/about/contact">联系我们</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="booking">
      <el-button type="primary" @click="openDialog">预约体验</el-button>
    </div>
  </el-header>

  <el-dialog v-model="dialogFormVisible">

    <div class="booking-dialog">
      <div class="box left">
        <p>预约体验</p>
        <p>请提交需求，我们马上跟您取得联系</p>
        <p>立即拨打服务热线：400 631 9969 </p>
      </div>
      <div class="box right">
        <el-form ref="bookingRef" :model="form" :rules="rules" label-position="top">
          <el-form-item label="公司名称" :label-width="formLabelWidth" prop="companyName">
            <el-input v-model="form.companyName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司所在行业" :label-width="formLabelWidth" prop="industry">
            <el-select v-model="form.industry" clearable placeholder="请选择" style="width: 100%;">
              <el-option v-for="(item) in solutionList" :label="item.industryName" :value="item.industryName" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item label="您的电话" :label-width="formLabelWidth" prop="tel">
            <el-input v-model="form.tel" autocomplete="off" />
          </el-form-item>

          <el-form-item label="您遇到了哪些机械加工问题或疑问，欢迎给我们留言" :label-width="formLabelWidth">
            <el-input v-model="form.message" autocomplete="off" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">
              立即预约
            </el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>


  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

import {queryProductsList, queryIndustryList, queryCaseList, queryNewsList, queryVideoList, bookingSendmail } from "@/api/index"
const { proxy } = getCurrentInstance()

const store = useStore();
let router = useRouter()

const solutionList = ref([])
const caseList = ref([])
const newsList = ref([])
const videoList = ref([])



const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

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
    sort:1
  }
  queryProductsList(params).then(({ code, data }) => {
    if (code === 0) {
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
    }
  })
}

defineExpose({
  openDialog
})
</script>

<style lang='scss' scoped>
.el-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.3);

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

  .el-menu-demo {
    border: none;
  }
}

.booking-dialog {
  display: flex;
  justify-content: space-between;
  color: #fff;

  .box {
    width: 46%;
    vertical-align: top;

    :deep(.el-form-item__label) {
      font-size: small;
    }

    &.left {
      padding: 40px 20px;
      background-image: url('https://img95.699pic.com/photo/40015/4163.jpg_wh860.jpg');
      background-repeat: no-repeat;
      background-size: 340px 560px;


      :nth-child(1) {
        font-size: 28px;
        font-weight: 700;
        line-height: 28px;
      }

      :nth-child(2) {
        margin: 30px 0 100px 0;
      }
    }
  }
}
</style>