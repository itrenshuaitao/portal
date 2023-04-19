<template>
    <div class="recruit">
        <Banner :imgSrc="bannerImg" />
        <img class="img" :src="backgroundImgUrl" alt="">
        <div class="page-title">
            <span data-desc="recruitment information"></span>
            招聘信息
        </div>
        <div class="submit">
            <p>可投简历至邮箱：jiaie.gao@ujoin-tech.com</p>
            <el-button class="sub-btn" :dark="isDark" plain @click="postClick">我要应聘</el-button>
            <el-dialog v-model="dialogFormVisible" destroy-on-close width="26%" title="填写信息" @open="clearFormLabelAlign">
                <el-form label-position="right" ref="subForm" :rules="rules" label-width="80px" :model="formLabelAlign"
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
                    <div >
                        <el-form-item label="备注" class="none">
                            <el-input v-model="formLabelAlign.remark" type="textarea" />
                        </el-form-item>
                    </div>

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
                    <div>
                        <p>职位描述</p>




                        <div :class="`description ${moreObj.descData.includes(item.id) ? 'show' : 'hidden'}`">
                            {{ item.jobDescription }}
                            <i class="icon" @click="moreClick(item.id, 'desc')"></i>
                        </div>

                    </div>
                    <div>
                        <p>任职资格</p>
                        <div :class="`description ${moreObj.jobShipData.includes(item.id) ? 'show' : 'hidden'}`">
                            {{ item.jobShip }}
                            <i class="icon" @click="moreClick(item.id, 'jobShip')"></i>

                        </div>

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

let moreObj = reactive({
    descData: [],
    jobShipData: []
})
onMounted(() => {

    bannerImg.value = queryBannerImg(7)

    initPageData()
    // handleSubResume()
})


const moreClick = (id, type) => {
    if (type === 'desc') {
        if (moreObj.descData.indexOf(id) === -1) {
            moreObj.descData.push(id)

        } else {
            moreObj.descData.splice(moreObj.descData.indexOf(id), 1)
        }
    } else {
        if (moreObj.jobShipData.indexOf(id) === -1) {
            moreObj.jobShipData.push(id)

        } else {
            moreObj.jobShipData.splice(moreObj.jobShipData.indexOf(id), 1)
        }
    }

}

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
    proxy.$refs.subForm.validate((valid, err) => {
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
        } else {
            console.error(formLabelAlign, err)
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
@import "@/assets/css/index.scss";

.recruit {
    .img {
        width: 100%;
    }


    .submit {
        margin: 0 90px;
        height: 175px;
        background-image: url('@/assets/img/submit.png');
        background-repeat: no-repeat;
        background-size: 100%;
        margin-bottom: 82px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 28px;

        :deep(.el-dialog) {
            font-family: AliPuHui55 !important;

            .el-form-item__label {
                font-size: 16px;
                font-family: AliPuHui55;
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
            .none .el-form-item__label{
                &::after {
                    display: none;

                }
            }
        }

        p {
            color: rgb(62, 73, 84);
            font-size: 18px;
            font-weight: 500;
            line-height: 41px;
            margin-bottom: 32px;
        }

        .sub-btn {
            width: 156px;
            height: 52px;
            color: rgb(69, 104, 128);
            font-size: 24px;
            font-weight: 500;
            line-height: 53px;
            background-color: rgb(179, 194, 208);
            border-radius: 41px;
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
        align-items: flex-start;

        &:nth-last-of-type(-n+2) {
            margin-bottom: -90px;
        }

        .item {
            width: calc((100vw - 310px)/2);
            min-height: 272px;
            background: rgba(66, 159, 219, 0.08);
            border-radius: 16px;
            margin-bottom: 136px;
            border: 1px solid rgb(66, 159, 219);
            display: flex;
            position: relative;
            padding-bottom: 27px;


            .left {
                margin-left: 18px;

                .job-name {
                    width: 154px;
                    height: 189px;
                    padding: 14px 31px 25px 22px;
                    box-sizing: border-box;
                    background: linear-gradient(180.00deg, rgba(25.36, 131.04, 199.22, 1.00) 0%, rgba(66, 159, 219, 0.8) 100%);
                    box-shadow: 14px 15px 40px rgba(0, 84, 137, 0.25);
                    border-radius: 24px;
                    position: relative;
                    top: -60px;
                    color: rgb(255, 255, 255);
                    font-weight: 400;

                    p {
                        margin-bottom: 10px;
                        font-size: 12px;
                        line-height: 18px;
                    }

                    p:nth-child(1) {
                        margin-bottom: 8px;
                        font-family: Noto Sans SC;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 30px;
                    }


                    div {
                        position: absolute;
                        right: 14px;
                        bottom: 16px;
                        font-size: 12px;
                        line-height: 18px;
                    }
                }

                .line {
                    position: absolute;
                    top: 109px;

                    left: 37px;
                    width: 114px;
                    height: 60px;
                    background-image: url('@/assets/img/line.png');
                    background-repeat: no-repeat;
                    background-size: 114px 60px;
                }

                .sub {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 108px;
                    height: 36px;
                    background: rgb(255, 191, 137);
                    box-shadow: 5px 6px 23px rgba(255, 133, 43, 0.46);
                    border-radius: 8px;
                    text-align: center;
                    color: rgb(140, 64, 0);
                    font-size: 16px;
                    font-weight: 500;
                    margin-left: 31px;
                    margin-top: -44px;
                }
            }

            .right {
                margin-left: 43px;
                margin-top: 31px;
                margin-right: 20px;

                .description {
                    // @include show_line(4);
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    position: relative;
                    color: rgb(164, 164, 164);
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 21px;

                    &.show {
                        white-space: pre-wrap;
                        .icon {
                            transform: rotateX(180deg);
                        }
                    }

                    &.hidden {
                        display: -webkit-box;

                        overflow: hidden;
                        max-height: 88px;

                        &:after {
                            content: "...";
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            padding-right: 134px;
                            padding-left: 4px;
                            background: #F0F7FC;

                        }

                    }





                    .icon {
                        z-index: 1;
                        position: absolute;
                        bottom: 8px;
                        right: 4px;
                        display: block;
                        width: 10px;
                        height: 6px;
                        float: right;
                        clear: both;
                        margin-top: -74px;
                        background-image: url("@/assets/img/path (1).png");
                        background-size: 10px 6px;
                        background-repeat: no-repeat;
                        cursor: pointer;
                    }
                }



                div {
                    p:nth-child(1) {
                        position: relative;
                        color: rgb(125, 125, 125);
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 27px;
                        margin-bottom: 5px;
                        font-family: Noto Sans SC;

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
                        height: 95px;
                        @include show_line(4);
                        position: relative;
                        line-height: 20px;
                        max-height: 40px;
                        color: rgb(164, 164, 164);
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 21px;
                        // margin-bottom: 36px;

                    }
                }
            }
        }
    }

    .more {
        color: rgb(13, 44, 77);
        font-family: AliPuHui55;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 66px;
    }
}
</style>