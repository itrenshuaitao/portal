<template>
    <div>
        <Banner :imgSrc="bannerImg" />
        <img class="img" :src="backgroundImgUrl" alt="">
        <div class="base-list"  :class="{'mobile-base-list':_isMobile()}">
            <div class="content">
                <div v-for="(item,index) in mapList" :key="index">
                    <h2>{{ item.name }}</h2>
                    <p>电话：{{ item.tel }}</p>
                    <p>邮箱：{{ item.email }}</p>
                    <p>地址：{{ item.address }}</p>
                </div>
            </div>
        </div>
        <div v-if="mapList.length" style="padding: 50px 120px;" :class="{'mobile-mapContainer':_isMobile()}">
            <baidu-map :map-list="mapList" ref="mapRef" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, getCurrentInstance, toRaw, nextTick } from "vue"
import Banner from "@/components/Banner.vue"
import BaiduMap from "@/components/baiduMap.vue"
import { queryContactImg, queryContactMap } from "@/api/index"

import { queryBannerImg } from "@/utils/index"
import { _isMobile } from '@/utils/index'
const bannerImg = ref('')
const backgroundImgUrl = ref('')
const mapList = ref([])
onMounted(() => {
    bannerImg.value = queryBannerImg(8)
    initPageData()
})

const initPageData = () => {
    queryContactImg().then(({ code, data }) => {
        // console.log(data);
        if (code == 0 && data.length != 0) {
            backgroundImgUrl.value = data[0].usImg
        }
    })
    queryContactMap().then(({ code, data }) => {
        if (code == 0) {
            let arr = []
            for (let i = 0; i < 4; i++) {
                arr.push({
                    name: data[0][`mapBase${i + 1}`],
                    tel: data[0][`mapPhone${i + 1}`],
                    email: data[0][`mapEmail${i + 1}`],
                    address: data[0][`mapAddress${i + 1}`],
                    mapAxis: data[0][`mapAxis${i + 1}`].split(',')
                })
            }
            mapList.value = arr
        }
    })

}
</script>

<style lang='scss' scoped>
.img {
    width: 100%;
}

.base-list {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 290px;
    background-image: url('@/assets/img/bg.png');
    background-position: 3% -120px;
    background-size: 104% 410px;
    background-repeat: no-repeat;
    padding: 35px 60px;
    box-sizing: border-box;


    .content {
        height: 218px;
        background: linear-gradient(180.00deg, rgba(250, 251, 253, 0.15) 0%, rgba(242, 243, 245, 0.7) 100%);
        box-shadow: inset 0px -1px 7px rgba(147, 147, 147, 0.41);
        backdrop-filter: blur(4.87px);
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        font-family: AliPuHui55;

        div {
            h2 {

                color: rgb(62, 73, 84);
                font-size: 18px;
                font-weight: 600;
                line-height: 25px;
                margin-bottom: 16px;
            }

            p {
                color: rgb(108, 123, 139);
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                margin-bottom: 8px;
            }
        }
    }
}
.mobile-base-list {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 660px;
    background-image: url('@/assets/img/bg.png');
    background-position: 3% -120px;
    background-size: 100% 810px;
    background-repeat: no-repeat;
    padding: 35px 60px;
    box-sizing: border-box;


    .content {
        height: 600px;
        background: linear-gradient(180.00deg, rgba(250, 251, 253, 0.15) 0%, rgba(242, 243, 245, 0.7) 100%);
        box-shadow: inset 0px -1px 7px rgba(147, 147, 147, 0.41);
        backdrop-filter: blur(4.87px);
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        font-family: AliPuHui55;

        div {
            width: 48%;
            margin-bottom: 20px;
            h2 {

                color: rgb(62, 73, 84);
                font-size: 38px;
                font-weight: 600;
                line-height: 45px;
                margin-bottom: 16px;
            }

            p {
                color: rgb(108, 123, 139);
                font-size: 34px;
                font-weight: 400;
                line-height: 40px;
                margin-bottom: 8px;
            }
        }
    }
}
.mobile-mapContainer{
    padding: 50px 40px !important;
}
</style>