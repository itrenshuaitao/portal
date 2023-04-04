<template>
    <div>
        <Banner :imgSrc="bannerImg" />
        <div class="tab">
            <el-button v-if="companylist[0]?.companyType == 0" :type="plain" link :class="active == '1' && 'active'"
                @click="() => handleTabClick('1')">企业介绍</el-button>
            <el-button v-if="companylist[2]?.companyType == 0" :type="plain" link class="news"
                :class="active == '2' && 'active'" @click="() => handleTabClick('2')">企业文化</el-button>
            <el-button v-if="companylist[3]?.companyType == 0" :type="plain" link :class="active == '3' && 'active'"
                @click="() => handleTabClick('3')">发展历程</el-button>
            <el-button v-if="companylist[4]?.companyType == 0" :type="plain" link :class="active == '4' && 'active'"
                @click="() => handleTabClick('4')">服务网络</el-button>
            <el-button v-if="companylist[5]?.companyType == 0" :type="plain" link :class="active == '5' && 'active'"
                @click="() => handleTabClick('5')">荣誉证书</el-button>
        </div>
        <template v-if="companylist[0]?.companyType == 0">
            <div class="title1 title">
                <span data-desc="company profile"></span>

                企业介绍
            </div>
            <div class="synopsis" v-html="findfirm.firmProducts">
            </div>
        </template>

        <div v-if="companylist[1]?.companyType == 0" class="core-data">
            <div class="item" v-for="(item, index) in coredata">
                <span>
                    <number class="number" :ref="'number' + index" :from="0" :to="item.coredataData" :duration="5"
                        easing="Power1.easeOut" animationPaused />+
                </span>
                <span>
                    {{ item.coredataName }}
                </span>

            </div>
        </div>
        <template v-if="companylist[2]?.companyType == 0">
            <div class="title2 title">
                <span data-desc="enterprise culture"></span>

                企业文化
            </div>
            <div class="culture">
                <div>
                    <i :style="`background-image: url(${img1});`"></i>
                    <p>使命</p>
                    <p>{{ findCulture.cultureMission }} </p>
                </div>
                <div>
                    <i :style="`background-image: url(${img2});`"></i>

                    <p>愿景</p>
                    <p>{{ findCulture.cultrueVision }} </p>
                </div>
                <div>
                    <i :style="`background-image: url(${img3});`"></i>


                    <p>价值观</p>
                    <p>
                        {{ findCulture.cultrueValues }}
                    </p>
                </div>


            </div>
        </template>
        <template v-if="companylist[3]?.companyType == 0">
            <div class="title3 title">
                <span data-desc="development history"></span>

                发展历程
            </div>
            <div class="history" :style="historyImg !== '' && `background-image: url('${historyImg}');`">
                <el-carousel ref="refCarousel" :autoplay="false" indicator-position="none" arrow="never" height="539px"
                    @change="(i) => historyActive = i">
                    <el-carousel-item class="item" v-for="item in historyList">
                        <div class="node" v-for="node in item">
                            <div class="icon-dot">
                                <div></div>
                            </div>
                            <div class="right">
                                <p class="time">{{ node.historyYear }}</p>
                                <div class="text"> {{ node.historyDetail }}</div>
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="position">
                    <div class="left pointer" @click="proxy.$refs.refCarousel.prev()"></div>
                    <div class="right pointer" @click="proxy.$refs.refCarousel.next()"></div>
                    <div>{{ historyActive + 1 }}</div>
                    <div> / {{ historyList.length }}</div>
                </div>
            </div>
        </template>
        <template v-if="companylist[4]?.companyType == 0">
            <div class="title4 title">
                <span data-desc="service network"></span>
                服务网络
            </div>
            <MapView></MapView>
        </template>
        <template v-if="companylist[5]?.companyType == 0">
            <div class="title5 title">
                <span data-desc="certificate of honor"></span>

                荣誉证书
            </div>

            <el-carousel height="700px" :autoplay="false" indicator-position="none">
                <el-carousel-item v-for="arr in findCertList" :key="item">
                    <div class="certificate">

                        <div :class="`box top ${arr[0]?.length < 3 && 'special'}`">
                            <div class="item" v-for="topItem in arr[0]" @click="() => showImage(topItem)">
                                <div class="icon-dot">
                                    <div></div>
                                </div>
                                <img :src="topItem.certImg" />
                                <div class="image-mask"></div>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div :class="`box bottom ${arr[1]?.length == 2 && 'special'}`">
                            <div class="item" v-for="bottomItem in arr[1]" @click="() => showImage(bottomItem)">
                                <div class="icon-dot">
                                    <div></div>
                                </div>
                                <img :src="bottomItem.certImg" />
                                <div class="image-mask"></div>
                            </div>

                        </div>
                    </div>

                </el-carousel-item>
            </el-carousel>

            <el-image-viewer v-if="showImageViewer" @close="showImageViewer = false" hide-on-click-modal
                :url-list="imgViewerUrlList" />

        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, getCurrentInstance, toRaw, nextTick } from "vue"

import Banner from "@/components/Banner.vue"
import MapView from "./components/maptest.vue"
import img1 from "@/assets/img/x-ab1.png"
import img2 from "@/assets/img/x-ab2.png"
import img3 from "@/assets/img/x-ab3.png"
import { queryCompanylist, queryFindfirmById, queryFindcoredataById, queryFindCultureById, queryFindhistoryById, queryFindCertById } from "@/api/index"
import { queryBannerImg } from "@/utils/index"
const { proxy } = getCurrentInstance()
const bannerImg = ref('')
const active = ref("1")
const historyActive = ref(0)

const companylist = ref([])
const findfirm = ref('')
const historyImg = ref('')
const coredata = ref([])
const findCulture = ref({})
const historyList = ref([])
const findCertList = ref([])
const imgViewerUrlList = ref([])
const showImageViewer = ref(false)
const refCarousel = ref(null);
const number0 = ref(null)
const number1 = ref(null)
const number2 = ref(null)
const number3 = ref(null)
const number4 = ref(null)
onMounted(async () => {

    bannerImg.value = queryBannerImg(6)
    await initPageData()
    nextTick(() => {
        window.addEventListener("scroll", showDiv);
    })

})
//页面卸载
onUnmounted(() => {
    window.removeEventListener("scroll", showDiv);
});
const showDiv = () => {
    if (companylist.value[1]?.companyType == 0) {

        //获取滚动条距离页面顶部的距离，如果滚动条距离页面距离大于目标元素距离页面顶部的距离，则目标元素已经往上滚动，且超出了当前可视区域，则给该元素添加fixed属性
        const el = document.querySelector('.core-data').getBoundingClientRect()
        const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const offsetTop = el.top
        const offsetBottom = el.bottom;
        const scrollTop = document.documentElement.scrollTop
        const top = offsetTop - scrollTop
        // 进入可视区域
        if (top <= viewPortHeight && offsetBottom >= 0) {
            [0, 1, 2, 3, 4].map(item => {
                proxy.$refs[`number${item}`][0].play()
            })
        } else {
        }
    }

}

const handleTabClick = (val) => {
    active.value = val
    let toHeight = document.querySelector(`.title${val}`).offsetTop

    window.scrollTo({
        top: toHeight - 90,
        behavior: "smooth"
    });
}

const initPageData = () => {
    queryCompanylist().then(({ code, data }) => {
        if (code === 0) {
            companylist.value = data
        }

    })
    queryFindfirmById().then(({ code, data }) => {
        if (code === 0) {
            findfirm.value = data[0]
        }
    })
    queryFindcoredataById().then(({ code, data }) => {
        if (code === 0) {
            coredata.value = data.slice(0, 5)
        }
    })
    queryFindCultureById().then(({ code, data }) => {
        if (code === 0) {
            findCulture.value = data[0]
        }
    })
    queryFindhistoryById({ pageIndex: 1, pageSize: 500 }).then(({ code, data }) => {
        if (code === 0) {

            let index = 0;
            let newArray = [];
            while (index < data[0].historyList.length) {
                newArray.push(data[0].historyList.slice(index, index += 4));
            }
            historyImg.value = data[0].historyImg
            historyList.value = newArray
        }
    })
    queryFindCertById().then(({ code, data }) => {

        if (code === 0) {
            let index = 0;
            let newArray = [];
            while (index < data.length) {
                newArray.push(data.slice(index, index += 7));
            }

            newArray.map((arr, index) => {
                switch (arr.length) {
                    case 7:
                        newArray[index] = [arr.slice(0, 4), arr.slice(4, 7)]
                        break
                    case 5:
                        newArray[index] = [arr.slice(0, 3), arr.slice(3, 5)]
                        break
                    case 6:
                        newArray[index] = [arr.slice(0, 4), arr.slice(4, 6)]
                        break
                    default:
                        newArray[index] = [arr.slice(0, 4)]

                }
            })
            findCertList.value = newArray
        }
    })

}

const showImage = (val) => {
    showImageViewer.value = true
    imgViewerUrlList.value = [val.certImg]
}
</script>

<style lang='scss' scoped>
.icon-dot {
    div {
        position: relative;
        width: 40px;
        height: 40px;
        background: rgba(192, 228, 255, 0.25);
        box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgb(200, 232, 255);
        backdrop-filter: blur(8.15px);
        border-radius: 50%;

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 10px;
            left: 10px;
            width: 20px;
            height: 20px;
            background: linear-gradient(114.70deg, rgba(25, 108, 255, 1.00) 0%, rgba(0, 84, 167, 1.00) 46%);
            box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5);
            backdrop-filter: blur(21.75px);
            border-radius: 50%;
        }



    }
}

.tab {
    height: 60px;
    background: rgba(0, 75, 146, 0.05);
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
        font-weight: 600;
        font-family: AliPuHui55 !important;
        margin: 20px;
    }

    // .news {
    //     margin: 20px;
    // }
}

.title {
    color: rgb(62, 73, 84);
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    font-weight: 400;
    height: 56px;
    line-height: 31px;
    text-align: center;
    margin: 40px 0;
    position: relative;

    ::after {
        content: attr(data-desc);
        color: rgba(0, 0, 0, 0.15);
        font-family: YouSheBiaoTiHei;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translate(-50%, 0);
    }
}

.synopsis {
    margin: 40px 250px 60px 250px;
    padding: 40px;
    background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 90%);
    border: 2px solid rgb(255, 255, 255);
    box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
    border-radius: 8px;
}

.core-data {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 80px;
    height: 240px;
    width: 100%;
    background: linear-gradient(180.00deg, rgba(250, 251, 253, 1.00) 0%, rgba(242, 243, 245, 1.00) 100%), rgb(242, 245, 248);

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        :nth-child(1) {
            color: rgb(0, 75, 146);
            font-size: 28px;
            font-weight: 500;
            line-height: 45px;
            font-family: DIN;
        }

        :nth-child(2) {
            color: rgb(108, 123, 139);
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            font-family: PingFang SC;
        }


    }
}

.culture {
    margin: 80px 208px 120px 208px;
    height: 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        height: 100%;
        // width: calc(100% / 3);
        width: 260px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: padding 0.3s linear;

        &:hover {
            padding: 40px 30px;
            background: rgb(255, 255, 255), rgba(192, 228, 255, 0);
            box-shadow: 5px 2px 24px rgba(220, 220, 220, 0.5), inset 0px -1px 7px rgba(0, 75, 146, 0.65);
            backdrop-filter: blur(10.87px);
            border-radius: 8px;
        }

        :nth-child(1) {
            display: inline-block;
            width: 80px;
            height: 80px;
            background-repeat: no-repeat;
            margin-bottom: 6px;

        }

        :nth-child(2) {
            color: rgb(62, 73, 84);
            font-size: 20px;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: 0px;

            &::after {
                content: "";
                display: block;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                top: 10px;
                width: 24px;
                height: 2px;
                background: rgb(25, 108, 255);
                border-radius: 3px;
            }
        }

        :nth-child(3) {
            padding-top: 20px;
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            text-align: left;
        }
    }

    :nth-child(1) {
        i {
            background-position: 16px 13px;
            background-size: 54px 60px;
        }
    }

    :nth-child(2) {
        i {
            background-position: 10px 13px;
            background-size: 54px 47px;
        }
    }

    :nth-child(3) {
        i {
            background-position: 15px 13px;
            background-size: 54px 50px;
        }
    }
}

.history {
    position: relative;
    padding: 0 120px;
    background: linear-gradient(180.00deg, rgba(250, 251, 253, 1.00) 0%, rgba(242, 243, 245, 1.00) 100%), rgb(242, 245, 248);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .node {
            width: calc((100% - 465px) /2);
            height: 180px;
            margin-left: 225px;
            display: flex;

            .icon-dot {
                position: relative;


                &::before {
                    content: '';
                    position: absolute;
                    width: 2px;
                    height: 138px;
                    left: 19px;
                    top: 20px;
                    background: linear-gradient(180.00deg, rgba(3, 87, 176, 1.00) 0%, rgba(21, 104, 243, 0.00) 100%);
                }
            }

            &:nth-child(3) {
                margin-left: 0;
            }



            .right {
                margin-left: 8px;

                .time {
                    color: rgb(62, 73, 84);
                    font-size: 26px;
                    font-weight: 600;
                    line-height: 36px;
                    margin-bottom: 17px;

                }

                .text {
                    white-space: pre-line;
                    width: 300px;
                    padding: 16px;
                    word-wrap: break-word;
                    color: rgb(108, 123, 139);
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                    background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 90%);
                    border: 2px solid rgb(255, 255, 255);
                    box-shadow: 5px 2px 24px rgba(220, 220, 220, 0.5);
                    border-radius: 4px;
                }
            }
        }
    }

    .position {
        display: flex;
        align-items: flex-end;
        width: 145px;
        height: 46px;
        position: absolute;
        bottom: 120px;
        right: 163px;
        color: rgb(0, 75, 146);
        font-family: Times;

        .left {
            width: 40px;
            height: 40px;
            background-image: url('@/assets/img/left.png');
            background-repeat: no-repeat;
            background-size: 40px 40px;
            margin-right: 8px;
        }

        .right {
            width: 40px;
            height: 40px;
            background-image: url('@/assets/img/right.png');
            background-repeat: no-repeat;
            background-size: 40px 40px;
            margin-right: 17px;

        }

        :nth-child(3) {
            font-size: 36px;
            font-weight: 400;
        }
    }
}

.certificate {
    height: 700px;
    // background-color: #2d7ecf;
    display: flex;
    flex-direction: column;
    align-items: center;

    .line {
        width: 1030px;
        width: calc(100vw - 410px);


        border: 2px dashed rgba(0, 84, 167, 0.32);
    }

    .box {

        .item {
            position: relative;
            margin-top: 45px;
            width: 172px;
            height: 212px;
            background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 90%);
            border: 2px solid rgb(255, 255, 255);
            box-shadow: 5px 2px 24px rgba(220, 220, 220, 0.5);
            border-radius: 4px;
            cursor: pointer;

            .image-mask {
                position: absolute;
                width: 139.68px;
                height: 187.06px;
                left: 16px;
                bottom: 12px;
                background: rgba(101, 101, 101, 0.6);
                opacity: 0;
                transition: all 0.5s;

            }

            &:hover .image-mask {
                opacity: 1;
            }

            img {
                width: 139.68px;
                height: 187.06px;
                margin: 12px 16px;
            }


        }
    }

    .top {
        width: calc(100vw - 240px);
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;

        &.special {
            justify-content: space-around;
        }

        .item {
            .icon-dot {
                position: absolute;
                bottom: -61px;
                left: 66px;
            }
        }

    }

    .bottom {
        display: flex;
        width: calc(100vw - 410px);
        justify-content: space-around;

        .item {
            .icon-dot {
                position: absolute;
                top: -68px;
                left: 66px;
            }
        }

        &.special {
            width: calc(100vw - 590px);
            justify-content: space-between;
        }
    }

}</style>