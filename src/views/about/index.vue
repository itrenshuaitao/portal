<template>
    <div>
        <Banner :imgSrc="bannerImg" />
        <div class="tab">
            <el-button :type="plain" link :class="active == '1' && 'active'"
                @click="() => handleTabClick('1')">企业介绍</el-button>
            <el-button :type="plain" link class="news" :class="active == '2' && 'active'"
                @click="() => handleTabClick('2')">企业文化</el-button>
            <el-button :type="plain" link :class="active == '3' && 'active'"
                @click="() => handleTabClick('3')">发展历程</el-button>
            <el-button :type="plain" link :class="active == '4' && 'active'"
                @click="() => handleTabClick('4')">服务网络</el-button>
            <el-button :type="plain" link :class="active == '5' && 'active'"
                @click="() => handleTabClick('5')">荣誉证书</el-button>
        </div>
        <div class="title1 title">企业介绍</div>
        <div class="synopsis" v-html="findfirm.firmProducts">
            </div>
        <div class="core-data">
            <div class="item" v-for="(item, index) in coredata">
                <span>
                    <number class="number" :ref="'number' + index" :from="0" :to="item.coredataData" :duration="5"
                        easing="Power1.easeOut" animationPaused />+
                </span>
                <span>
                   {{item.coredataName}}
                </span>

            </div>
        </div>
        <div class="title2 title">企业文化</div>
        <div class="culture">
            <div>
                <p>使命</p>
                <p>让复杂的制造进入无人驾驶时代 </p>
            </div>
            <div>
                <p>愿景</p>
                <p>成为暗灯工厂核心技术全球领导者</p>
            </div>
            <div>
                <p>价值观</p>
                <p>以客户为中心，做到每一份交付，对客户都是可持续的价值； 追求卓越，只做最牛的产品； 开放创新，勇敢探索一切可能性； 诚实正善，彼此信任，共同分享。</p>

            </div>


        </div>
        <div class="title3 title">发展历程</div>
        <div class="history">
            <el-carousel ref="refCarousel" :autoplay="false" indicator-position="none" arrow="never" height="539px">
                <el-carousel-item class="item" v-for="item in 4" :key="item">
                    <div class="node" v-for="node in 4">
                        <div class="left">
                            <div></div>
                        </div>
                        <div class="right">
                            <p class="time">2021</p>
                            <div class="text">你刚来可以抱怨你的手下是一群混蛋，但是如果过了一年你还在抱怨，那么你才是一个真正的混蛋</div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="position">
                <div class="left pointer" @click="proxy.$refs.refCarousel.prev()"></div>
                <div class="right pointer" @click="proxy.$refs.refCarousel.next()"></div>
                <div>3</div>
                <div> / 7</div>
            </div>
        </div>
        <div class="title4 title">服务网络</div>
        <MapView></MapView>
        <div class="title5 title">荣誉证书</div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, getCurrentInstance, toRaw } from "vue"

import Banner from "@/components/Banner.vue"
import MapView from "./components/maptest.vue"
import {queryFindfirmById,queryFindcoredataById} from "@/api/index"
import { queryBannerImg } from "@/utils/index"
const { proxy } = getCurrentInstance()
const bannerImg = ref('')
const active = ref("1")
const findfirm = ref('')
const coredata = ref([])
const refCarousel = ref(null);
const number0 = ref(null)
const number1 = ref(null)
const number2 = ref(null)
const number3 = ref(null)
const number4 = ref(null)
onMounted(() => {
    window.addEventListener("scroll", showDiv);
    bannerImg.value = queryBannerImg(6)
    initPageData()
    

})
//页面卸载
onUnmounted(() => {
    window.removeEventListener("scroll", showDiv);
});
const showDiv = () => {
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
            proxy.$refs[`number${item}`][0].restart()
        })
    } else {
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

const initPageData = ()=>{
    queryFindfirmById().then(({code,data})=>{
        if(code===0){
            findfirm.value = data[0]
        }
    })
    queryFindcoredataById().then(({code,data})=>{
        if(code===0){
            coredata.value = data.slice(0,5)
        }
    })
}
</script>

<style lang='scss' scoped>
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
        margin: 20px 20px 20px 0;
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
            color: rgb(25, 108, 255);
            font-size: 32px;
            font-weight: 600;
            line-height: 45px;
        }

        :nth-child(2) {
            color: rgb(62, 73, 84);
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
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
        width: calc(100% / 3);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.3s linear;

        &:hover {
            padding: 40px;
            background: rgb(255, 255, 255), rgba(192, 228, 255, 0);
            box-shadow: 5px 2px 24px rgba(220, 220, 220, 0.5), inset 0px -1px 7px rgba(0, 75, 146, 0.65);
            backdrop-filter: blur(10.87px);
            border-radius: 8px;
        }

        :nth-child(1) {
            margin-top: 70px;
            color: rgb(62, 73, 84);
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            letter-spacing: 0px;

            &::after {
                content: "";
                display: block;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                top: 0px;
                width: 24px;
                height: 2px;
                background: rgb(25, 108, 255);
                border-radius: 3px;
            }
        }

        :nth-child(2) {
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin-bottom: 25px;
        }
    }
}

.history {
    position: relative;
    padding: 0 120px;
    background: linear-gradient(180.00deg, rgba(250, 251, 253, 1.00) 0%, rgba(242, 243, 245, 1.00) 100%), rgb(242, 245, 248);

    .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .node {
            width: calc((100% - 465px) /2);
            height: 180px;
            margin-left: 225px;
            display: flex;

            &:nth-child(3) {
                margin-left: 0;
            }

            .left {
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
                    width: 300px;
                    padding: 16px;

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
</style>