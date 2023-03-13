<template>
  <el-header>
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
      <el-button type="primary" @click="dialogFormVisible = true">预约体验</el-button>
    </div>
  </el-header>

  <el-dialog v-model="dialogFormVisible" class="booking-dialog">
    <div class="box left">
      <p>预约体验</p>
      <p>请提交需求，我们马上跟您取得联系</p>
      <p>立即拨打服务热线：173 6707 0802</p>
    </div>
    <div class="box right">
      <el-form :model="form" label-position="top">
        <el-form-item label="姓名" :label-width="formLabelWidth" :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="form.companyName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="您的电话" :label-width="formLabelWidth" :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
        ]">
          <el-input v-model="form.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="公司所在行业" :label-width="formLabelWidth" :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
        ]">
          <el-select v-model="form.industry" placeholder="请选择">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="如果您有其他想了解的信息或疑问，欢迎给我们留言" :label-width="formLabelWidth">
          <el-input v-model="form.message" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            立即预约
          </el-button>
        </el-form-item>

      </el-form>
    </div>

  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import { queryIndustryList, queryCaseList,queryNewsList,queryVideoList } from "@/api/index"
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
  type: [],
  resource: '',
  desc: '',
})
const openDialog = () => {
  dialogFormVisible.value = true
}

onMounted(() => {
  getSolutionList()
  getAllCaseList(1)
  getNewsList(1)
  getVideoList(1)
})

const getSolutionList = () => {

  const params = {
    pageIndex: 1,
    pageSize: 1000
  }
  queryIndustryList(params).then(({ code, data }) => {
    if (code === 0) {
      solutionList.value = data
      store.commit('setSolutionList',data)

    }
  })
}

const getAllCaseList = (pageIndex) => {
  const params = {
    pageIndex,
    pageSize: 3
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
    pageSize: 3
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
    pageSize:3
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
  .box {
    display: inline-block;
    width: 50%;
    vertical-align: top;

    :deep(.el-form-item__label) {
      font-size: small;
    }

    &.left {
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