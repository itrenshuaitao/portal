<template>
    <div class="video-center" :class="{'mobile-video-center':_isMobile()}">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="video-list">
            <div class="carousel">
                <div class="left">
                    <div v-show="isVideoVisible" class="video">
                        <VideoPlay v-if="isVideoVisible" :video_url="videoObj.videoImgs" :poster="videoObj.videoImg"
                            @switchVideoUrl="switchVideoUrl">
                        </VideoPlay>
                    </div>
                    <div class="info">
                        <h2>{{ videoObj.videoName }} </h2>
                        <p>
                            {{ videoObj?.videoTimes?.replace(/-/g, "/") }}
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div v-for="item in topVideoList" class="item" :style="`background-image: url(${item.videoImg});`"
                        @click="() => changeVideoObj(item)">
                        <div class="name">{{ item.videoName }}</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div v-for="(item,index) in videoList" class="item pointer" @click="handleClick(item)" :key="index"> 
                    <img class="" :src="item.videoImg">
                    <div class="info">
                        <h2>{{ item.videoName }} </h2>
                        <p>
                            {{ item?.videoTimes?.replace(/-/g, "/") }}
                        </p>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: center;" class="_pagination">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize" prev-text="上一页"
                    next-text="下一页" :total="pagination.total" @current-change="(value) => getVideoList(value)" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRaw, nextTick } from "vue"
import Banner from "@/components/Banner.vue"
import VideoPlay from "@/components/video.vue"
import { queryVideoList, queryTopVideoList } from "@/api/index"
import { queryBannerImg } from "@/utils/index"
import { _isMobile } from '@/utils/index'

const bannerImg = ref('')
const videoList = ref([])
const topVideoList = ref([])
const isVideoVisible = ref(false)
const videoObj = ref({})
const pagination = reactive({
    total: 0,
    pageSize: 12
})


onMounted(() => {
    bannerImg.value = queryBannerImg(5)
    getVideoList(1)
    getTopVideoList()

})

const getVideoList = (pageIndex) => {
    const params = {
        pageIndex,
        pageSize: pagination.pageSize,
        sort: 1
    }
    queryVideoList(params).then(({ code, data, totalResults }) => {
        if (code === 0) {
            videoList.value = data
            pagination.total = totalResults
        }
    })
}
const getTopVideoList = () => {
    queryTopVideoList({ pageIndex: 1, pageSize: 999, sort: 1 }).then(({ code, data }) => {
        if (code === 0) {
            topVideoList.value = data.slice(0, 3)
            isVideoVisible.value = true
            videoObj.value = data[0]
        }
    })
}
const switchVideoUrl = () => {
    isVideoVisible.value = false

    let index = toRaw(topVideoList.value).findIndex(i => i.videoImgs === videoObj.value.videoImgs) === topVideoList.value.length - 1 ? 0 : toRaw(topVideoList.value).findIndex(i => i.videoImgs === videoObj.value.videoImgs) + 1

    videoObj.value = toRaw(topVideoList.value[index])
    nextTick(() => {
        isVideoVisible.value = true
    })

}
const changeVideoObj = (obj) => {
    isVideoVisible.value = false
    videoObj.value = toRaw(obj)
    nextTick(async () => {
        await window.scrollTo({
            top: _isMobile() ? 0 : 400,
            behavior: "smooth"
        });

        isVideoVisible.value = true

    })



}

const handleClick = (obj) => {
    //   window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    changeVideoObj(obj)

}
</script>

<style lang='scss' scoped>
.video-center {
    .video-list {
        margin: 60px 120px 30px 120px;
        width: calc(100% - 240px);

        .carousel {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .left {
                width: calc(75% - 4px);
                background-color: rgb(248, 248, 248);
                font-family: AliPuHui55;


                .video {
                    width: 100%;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .info {
                    margin-left: 16px;
                    padding-bottom: 23px;

                    h2 {
                        margin-top: 16px;
                        margin-bottom: 7px;
                        color: rgb(62, 73, 84);
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 34px;
                    }

                    p {
                        color: rgb(108, 123, 139);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                    }
                }
            }

            .right {
                width: calc(25% - 20px);
                font-family: AliPuHui55;

                .item {
                    position: relative;
                    // width: calc(25vw - 18px);
                    height: 158px;
                    background-color: aliceblue;
                    margin-bottom: 24px;
                    border-radius: 4px;
                    background-repeat: no-repeat;
                    background-size: 100% 158px;

                    .name {
                        box-sizing: border-box;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 50px;
                        padding: 11px 16px;
                        background: linear-gradient(180.00deg, rgba(39, 44, 54, 1), rgb(53, 61, 79) 154%);
                        backdrop-filter: blur(5.44px);
                        border-radius: 4px;
                        color: rgb(255, 255, 255);
                        font-size: 18px;
                        font-weight: 500;
                        line-height: 28px;
                    }
                }
            }
        }

        .list {
            margin-top: 56px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {

                width: calc(25% - 18px);
                height: 243px;
                margin-bottom: 24px;
                margin-right: 24px;
                background: rgba(246, 246, 250, 0.5);
                overflow: hidden;

                &:nth-of-type(4n+0) {
                    margin-right: 0;
                }

                img {
                    border-radius: 4px;

                    width: 100%;
                    height: 158px;
                }

                .info {
                    margin-left: 16px;

                    h2 {
                        margin-top: 16px;
                        margin-bottom: 8px;
                        color: rgb(62, 73, 84);
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 25px;
                        font-family: AliPuHui55;
                    }

                    p {
                        color: rgb(108, 123, 139);
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 20px;
                        font-family: AliPuHui55;
                        padding-bottom: 16px;
                    }
                }

            }
        }

        ._pagination {
            height: 32px;
            line-height: 32px;

            :deep(.el-pagination.is-background .btn-prev),
            :deep(.el-pagination.is-background .btn-next),
            :deep(.el-pager li) {
                height: 32px;
                line-height: 40px;
                font-size: 14px !important;
                color: rgb(62, 73, 84);
                background: rgb(255, 255, 255);
                border: none;
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(21.75px);
                padding: 6px 16px;

                &.is-active {
                    box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgba(0, 75, 146, 0.65);
                    backdrop-filter: blur(21.75px);
                }
            }
        }
    }
}
.mobile-video-center {
    .video-list {
        margin: 60px 80px 30px 80px;
        width: calc(100% - 160px);

        .carousel {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .left {
                width: calc(75% - 4px);
                background-color: rgb(248, 248, 248);
                font-family: AliPuHui55;


                .video {
                    width: 100%;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .info {
                    margin-left: 16px;
                    padding-bottom: 23px;

                    h2 {
                        margin-top: 16px;
                        margin-bottom: 7px;
                        color: rgb(62, 73, 84);
                        font-size: 48px;
                        font-weight: 500;
                        line-height: 60px;
                    }

                    // p {
                    //     color: rgb(108, 123, 139);
                    //     font-size: 34px;
                    //     font-weight: 400;
                    //     line-height: 20px;
                    // }
                }
            }

            .right {
                width: calc(25% - 20px);
                font-family: AliPuHui55;

                .item {
                    position: relative;
                    // width: calc(25vw - 18px);
                    height: 158px;
                    background-color: aliceblue;
                    margin-bottom: 24px;
                    border-radius: 4px;
                    background-repeat: no-repeat;
                    background-size: 100% 158px;

                    .name {
                        box-sizing: border-box;
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        height: 50px;
                        padding: 11px 6px;
                        background: linear-gradient(180.00deg, rgba(39, 44, 54, 1), rgb(53, 61, 79) 154%);
                        backdrop-filter: blur(5.44px);
                        border-radius: 4px;
                        color: rgb(255, 255, 255);
                        font-size: 28px;
                        font-weight: 500;
                        line-height: 28px;
                        zoom: 0.63;
                    }
                }
            }
        }

        .list {
            margin-top: 56px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {

                width: calc(50% - 12px);
                height: 420px;
                margin-bottom: 24px;
                margin-right: 24px;
                background: rgba(246, 246, 250, 0.5);
                overflow: hidden;

                &:nth-of-type(2n+0) {
                    margin-right: 0;
                }

                img {
                    border-radius: 4px;

                    width: 100%;
                    height: 336px;
                }

                .info {
                    margin-left: 16px;

                    h2 {
                        margin-top: 16px;
                        margin-bottom: 8px;
                        color: rgb(62, 73, 84);
                        font-size: 36px !important;
                        font-weight: 500;
                        line-height: 50px;
                        font-family: AliPuHui55;
                    }

                    p {
                        color: rgb(108, 123, 139);
                        font-size: 34px;
                        font-weight: 400;
                        line-height: 20px;
                        font-family: AliPuHui55;
                        padding-bottom: 16px;
                    }
                }

            }
        }

        ._pagination {
            height: 82px;
            line-height: 82px;
            margin-top: 30px;

            :deep(.el-pagination.is-background .btn-prev),
            :deep(.el-pagination.is-background .btn-next),
            :deep(.el-pager li) {
                width:8vw;
                height: 72px;
                line-height: 56px;
                font-size: 44px !important;
                color: rgb(62, 73, 84);
                background: rgb(255, 255, 255);
                border: none;
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
                inset 0px -1px 4px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(21.75px);
                padding: 6px 16px;

                &.is-active {
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
                inset 0px -1px 4px rgba(0, 75, 146, 0.65);
                backdrop-filter: blur(21.75px);
                }
            }
        }
    }
}
</style>