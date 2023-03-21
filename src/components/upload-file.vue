<template>
  <div class="upload">
    <div class="flex align-center">
      <!--  const fileType = ["image/jpg", "image/png", "image/jpeg"]; -->
      <el-upload
        class="avatar-uploader relative"
        :data="uploadData"
        :limit="1"
        :action="uploadUrl"
        :accept="fileType"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
      >
      <div v-if="!imageUrl">
        <el-button type="primary">{{ btnText }}</el-button>
        <div class="tips">
          <p v-for="(item, index) in tips" :key="index">{{ item }}</p>
        </div>
      </div>
      </el-upload>
    </div>
    <div class="fileContainer" v-if="imageUrl && imageUrl !== ''">
      <div class="fileItem" >
        <el-image
          style="height: 100px"
          :src="imageUrl"
          :zoom-rate="1.1"
          :preview-src-list="[imageUrl]"
        />
        <el-icon @click="handleRemove(item, index)"><Delete /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref, markRaw } from "vue";
import { Delete, QuestionFilled } from "@element-plus/icons-vue";
import { ElMessageBox,ElMessage } from "element-plus";
const { emit } = getCurrentInstance();
const props = defineProps({
  tips: Array,
  accept: String,
  btnText: String,
  imageUrl:String,
  fileType:Array,
  size: Number,
});

//上传
const VITE_UPLOAD_TYPE = import.meta.env.VITE_UPLOAD_TYPE;
const uploadUrl = ref(
  import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_UPLOAD_URL
);
const uploadData = ref({
  uploadType: VITE_UPLOAD_TYPE ? VITE_UPLOAD_TYPE : "",
});
// 上传成功
const handleAvatarSuccess = (response, uploadFile) => {
  if (response.code === 200) {
    emit('fileSuccess',response.data.fileName,props.btnText)
    ElMessage.success("上传成功!");    
  } else {
    ElMessage.error("上传失败!");
  }
};
// 超出限制
const handleExceed = ()=> {
  ElMessage.warning(
    `请删除当前文件或图片之后再上传`
  )
}

// 上传前的钩子
const beforeAvatarUpload = (rawFile) => {
  if (props.fileType.indexOf(rawFile.type) === -1) {
    ElMessage.error("请上传正确的文件格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(`上传图片大小不能超过${props.size}mb!`);
    return false;
  }
  return true;
};
//删除图片
const handleRemove = (item, index) => {
  ElMessageBox.confirm("确认要删除?", {
    type: "warning",
    icon: markRaw(QuestionFilled),
    confirmButtonText: "是",
    cancelButtonText: "否",
    showClose: false,
  }).then(() => {
    emit('imageDel')
  });
};
</script>
<style lang="scss" scoped>
.upload {
  width: 100%;
  .el-button{
    height: 28px;
    line-height: 28px;
  }

  .fileContainer {
    .fileItem{
      display: flex;
      align-items: center;
    }
    p {
      color: var(--el-color-primary);
    }
    .el-icon {
      color: var(--el-color-danger);
      margin-left: 6px;
      cursor: pointer;
    }
  }
  .tips {
    font-size: 12px;
    color: #969ba0;
    margin-left: 14px;
    p {
      line-height: 20px;
    }
  }
}
</style>
