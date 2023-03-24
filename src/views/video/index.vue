<template>
    <div class="video-center">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="video-list">
            <div class="carousel">
                <div class="left">
                    <div v-if="isVideoVisible" class="video">
                        <VideoPlay :video_url="videoObj.videoImgs" :poster="videoObj.videoImg"
                            @switchVideoUrl="switchVideoUrl">
                        </VideoPlay>
                    </div>
                    <div class="info">
                        <h2>{{ videoObj.videoName }} </h2>
                        <p>
                            {{ videoObj.videoTimes }}
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
                <div v-for="item in videoList" class="item pointer" @click="handleClick(item)">
                    <img class="" :src="item.videoImg">
                    <div class="info">
                        <h2>{{ item.videoName }} </h2>
                        <p>
                            {{ item.videoTimes }}
                        </p>
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: center;">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize"
                    :total="pagination.total" @current-change="(value) => getVideoList(value)" />
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
    queryTopVideoList().then(({ code, data }) => {
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
    nextTick(() => {
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


                .video {
                    width: 100%;

                    border-radius: 4px;
                    overflow: hidden;
                }

                .info {
                    margin-left: 16px;

                    h2 {
                        margin-top: 16px;
                        margin-bottom: 7px;
                        color: rgb(62, 73, 84);
                        font-size: 24px;
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
                        background: linear-gradient(180.00deg, rgba(250, 251, 253, 0.05) 0%, rgba(242, 243, 245, 0.73) 154%);
                        backdrop-filter: blur(5.44px);
                        border-radius: 4px;
                        color: rgb(62, 73, 84);
                        font-size: 20px;
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
                height: 230px;
                margin-bottom: 40px;
                margin-right: 24px;
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
                        margin-bottom: 7px;
                        color: rgb(62, 73, 84);
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 28px;

                        p {
                            color: rgb(108, 123, 139);
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 20px;

                        }
                    }
                }

            }
        }
    }
}
</style>