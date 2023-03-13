<template>
    <div class="video-center">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="video-list">
            <div class="carousel">
                <div class="left">
                    <div v-if="isVideoVisible" class="video">
                        <VideoPlay :video_url="videoObj.videoImgs" :poster="videoObj.videoImg" @switchVideoUrl="switchVideoUrl">
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
                <div v-for="item in 10" class="item"></div>
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
        pageSize: pagination.pageSize
    }
    queryVideoList(params).then(({ code, data, totalResults }) => {
        if (code === 0) {
            console.log(data)
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

    let index = toRaw(topVideoList.value).findIndex(i => i.videoImgs === videoObj.value.videoImgs) === 2 ? 0 : toRaw(topVideoList.value).findIndex(i => i.videoImgs === videoObj.value.videoImgs) + 1

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
</script>

<style lang='scss' scoped>
.video-center {
    .video-list {
        margin: 60px 120px 30px 120px;

        .carousel {
            display: flex;
            justify-content: space-between;

            .left {
                .video {
                    width: calc(100vw - 584px);
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
                margin-left: 24px;

                .item {
                    position: relative;
                    width: 282px;
                    height: 158px;
                    background-color: aliceblue;
                    margin-bottom: 24px;
                    border-radius: 4px;
                    background-repeat: no-repeat;
                    background-size: 282px 158px;

                    .name {
                        box-sizing: border-box;
                        position: absolute;
                        bottom: 0;
                        width: 282px;
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
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {

                width: calc(25% - 18px);
                height: 208px;
                background-color: pink;
                margin-bottom: 40px;
                margin-right: 24px;
                border-radius: 4px;

                &:nth-of-type(4n+0) {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>