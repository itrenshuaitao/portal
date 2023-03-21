<template>
    <div class="recruit">
        <Banner :imgSrc="bannerImg" />
        <img class="img" :src="backgroundImgUrl" alt="">
        <div class="title">招聘信息</div>
        <div class="submit">
            <p>可投简历至邮箱：jiaie.gao@ujoin-tech.com</p>
            <el-button class="sub-btn" :dark="isDark" plain @click="dialogFormVisible = true">我要应聘</el-button>
            <el-dialog v-model="dialogFormVisible" width="35%" title="填写信息" @open="clearFormLabelAlign">
                <el-form label-position="right" ref="subForm" :rules="rules" label-width="100px" :model="formLabelAlign"
                    style="max-width: 460px">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formLabelAlign.name" />
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="formLabelAlign.tel" />
                    </el-form-item>
                    <el-form-item label="附件信息" prop="filePath">
                        <el-upload ref="uploadRef" v-model="formLabelAlign.filePath" :limit="1" accept=".pdf"
                            class="upload-demo" :action="uploadUrl" :on-success="handleAvatarSuccess">
                            <template #trigger>
                                <el-button type="primary">上传简历</el-button>
                            </template>
                            <span class="el-upload__tip">
                                支持png、pdf等格式
                            </span>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="formLabelAlign.remark" type="textarea" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleSubResume">
                            提交
                        </el-button>
                    </span>
                    <div class="tip">
                        若符合录用条件，我们将在5个工作日内联系您
                    </div>
                </template>
            </el-dialog>
        </div>
        <div class="job-list">
            <div v-for="item in jobList" class="item">
                <div class="left">
                    <div class="job-name">
                        <p>{{ item.jobName }}</p>
                        <p>{{ item.jobQname }}</p>
                        <p>{{ ['', '全职', '兼职', '实习'][item.jobQuality] }}</p>
                        <p>{{ item.jobExperience }}</p>
                        <div class="city">
                            <el-icon>
                                <Location />
                            </el-icon>
                            杭州
                        </div>
                    </div>
                    <div class="sub pointer" @click="postClick">
                        <el-icon>
                            <Position />

                        </el-icon>
                        <span class="pointer" style="z-index: 2">
                            点击投递
                        </span>
                    </div>
                    <div class="line"></div>

                </div>
                <div class="right">
                    <div class="description">
                        <p>职位描述</p>
                        <p>{{ item.jobDescription }}</p>
                    </div>
                    <div class="Qualifications ">
                        <p>任职资格</p>
                        <p>
                            {{ item.jobShip }}
                        </p>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="pagination.total > jobList.length" class="more pointer" @click="updataJobList">
            下拉查看更多
            <el-icon style="transform: rotate(270deg);">
                <DArrowLeft />
            </el-icon>
        </div>
        <div v-if="pagination.total === jobList.length" class="more">已经到底了</div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, getCurrentInstance, toRaw, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus";
import Banner from "@/components/Banner.vue"
import { queryBannerImg } from "@/utils/index"
import { queryRecruitimgList, queryJobList, subResume } from "@/api/index"
const { proxy } = getCurrentInstance()
const uploadUrl = ref(
    import.meta.env.VITE_API_DOMAIN + import.meta.env.VITE_UPLOAD_URL
);
const bannerImg = ref('')
const backgroundImgUrl = ref('')
const jobList = ref([])
const dialogFormVisible = ref(false)
const pagination = reactive({
    total: 0,
    pageIndex: 1
})
const formLabelAlign = reactive({
    name: '',
    tel: '',
    remark: '',
    filePath: ''
})
const rules = reactive({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    tel: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
    ],
    filePath: [{ required: true, message: '请上传附件', trigger: 'change' }]
})
onMounted(() => {

    bannerImg.value = queryBannerImg(7)

    initPageData()
    // handleSubResume()
})


const postClick = () => {
    dialogFormVisible.value = true
    clearFormLabelAlign()
}
const clearFormLabelAlign = () => {
    formLabelAlign.name = ''
    formLabelAlign.tel = ''
    formLabelAlign.remark = ''
    formLabelAlign.filePath = ''
}
const handleAvatarSuccess = (response, uploadFile) => {
    if (response.code === 200) {
        formLabelAlign.filePath = response.data.picture
        ElMessage.success("上传成功!");
    } else {
        ElMessage.error("上传失败!");
    }
};
const handleSubResume = () => {
    const { filePath, name, tel, remark } = formLabelAlign;
    proxy.$refs.subForm.validate((valid) => {
        if (valid) {
            const data = {
                filePath,
                simpleMailMessage: {
                    text: `姓名：${name}; 联系电话：${tel}; 备注：${remark}`
                }
            }
            subResume(data).then(({ code, data }) => {
                if (code == 200) {
                    dialogFormVisible.value = false
                }
            })
        }
    })


}

const initPageData = () => {
    queryRecruitimgList().then(({ code, data }) => {
        if (code == 0) {
            backgroundImgUrl.value = data[0].img
        }
    })
    getJobList(pagination.pageIndex)

}

const getJobList = (pageIndex) => {
    let params = {
        pageIndex,
        pageSize: 6
    }
    queryJobList(params).then(({ code, data, totalResults }) => {
        if (code == 0) {
            pagination.total = totalResults
            pagination.pageIndex = pageIndex
            if (pageIndex === 1) {
                jobList.value = data
            } else {
                jobList.value = jobList.value.concat(data)
            }
        }

    })

}

const updataJobList = () => {
    getJobList(pagination.pageIndex + 1)
}
</script>
<style lang='scss' scoped>
.recruit {
    .img {
        width: 100%;
    }

    .title {
        height: 56px;
        font-size: 40px;
        color: #3E4954;
        line-height: 47px;
        text-align: center;
        margin: 40px 0;
    }

    .submit {
        margin: 0 90px;
        height: 242px;
        background-image: url('@/assets/img/submit.png');
        background-repeat: no-repeat;
        margin-bottom: 82px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
            color: rgb(62, 73, 84);
            font-size: 28px;
            font-weight: 500;
            line-height: 41px;
            margin-bottom: 32px;
        }

        .sub-btn {
            width: 228px;
            height: 74px;
            color: rgb(69, 104, 128);
            font-size: 36px;
            font-weight: 500;
            line-height: 53px;
            background-color: rgb(179, 194, 208);
            // &:hover{
            //     color: #fff;
            // }
        }

        .tip {
            color: #b99898;
            font-size: 12px;
            margin-top: 8px;
        }
    }

    .job-list {
        margin: 142px 90px 0 90px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &:nth-last-of-type(-n+2) {
            margin-bottom: -90px;
        }

        .item {
            width: calc((100vw - 260px)/2);
            height: 378px;
            background: rgba(66, 159, 219, 0.08);
            border-radius: 16px;
            margin-bottom: 136px;
            display: flex;
            position: relative;
            padding-bottom: 27px;


            .left {
                margin-left: 18px;

                .job-name {
                    width: 226px;
                    height: 322px;
                    padding: 14px 31px 25px 22px;
                    box-sizing: border-box;
                    background: linear-gradient(180.00deg, rgba(25.36, 131.04, 199.22, 1.00) 0%, rgba(66, 159, 219, 0.50) 100%);
                    box-shadow: 14px 15px 40px rgba(0, 84, 137, 0.25);
                    border-radius: 24px;
                    position: relative;
                    top: -60px;
                    color: rgb(255, 255, 255);
                    font-weight: 400;

                    p {
                        margin-bottom: 10px;
                    }

                    p:nth-child(1) {
                        font-size: 32px;
                        font-weight: 500;
                        line-height: 47px;
                        margin-bottom: 24px;
                    }

                    p:nth-child(2) {
                        font-size: 18px;
                        line-height: 27px;
                    }

                    p:nth-child(3),
                    p:nth-child(4) {
                        font-size: 20px;
                        line-height: 30px;
                    }

                    div {
                        position: absolute;
                        right: 31px;
                        bottom: 25px;
                        font-size: 28px;
                    }
                }

                .line {
                    position: absolute;
                    bottom: 68px;
                    left: 32px;
                    width: 171px;
                    height: 90px;
                    background-image: url('@/assets/img/line.png');
                    background-repeat: no-repeat;
                    background-size: 171px 90px;
                }

                .sub {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 169px;
                    height: 53px;
                    background: rgb(255, 191, 137);
                    box-shadow: 5px 6px 23px rgba(255, 133, 43, 0.46);
                    border-radius: 8px;
                    text-align: center;
                    color: rgb(140, 64, 0);
                    font-size: 26px;
                    font-weight: 500;
                    margin-left: 31px;
                    margin-top: -20px;
                }
            }

            .right {
                margin-left: 43px;
                margin-top: 31px;

                div {
                    p:nth-child(1) {
                        position: relative;
                        color: rgb(125, 125, 125);
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 27px;
                        margin-bottom: 5px;

                        &::after {
                            content: '';
                            background: rgb(255, 191, 137);
                            position: absolute;
                            width: 4px;
                            height: 18px;
                            left: -12px;
                            top: 6px;

                        }
                    }

                    p:nth-child(2) {

                        color: rgb(164, 164, 164);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 21px;
                        margin-bottom: 36px;

                    }
                }
            }
        }
    }

    .more {
        color: rgba(0, 108, 166, 0.47);
        font-size: 24px;
        font-weight: 400;
        line-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 66px;
    }
}
</style>