<template>
    <div class="video-center">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="video-list">
            <div class="carousel">
                <div class="left">
                    <div class="video">
                        <VideoPlay :video_url="'https://media.w3.org/2010/05/sintel/trailer.mp4'"
                            :poster="'https://ethicalmarketingnews.com/wp-content/uploads/2018/07/fdaletters-840x480.jpg'">
                        </VideoPlay>

                    </div>
                    <div>
                        <h2>用科技让复杂的制造更简单 </h2>
                        <p>
                            2022/12/30
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div v-for="inte in 3" class="item">
                        <div>2022友机技术宣传片</div>
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
import { ref, onMounted, reactive } from "vue"
import Banner from "@/components/Banner.vue"
import VideoPlay from "@/components/video.vue"
import { queryVideoList } from "@/api/index"
import { queryBannerImg } from "@/utils/index"

const bannerImg = ref('')
const videoList = ref([])
const pagination = reactive({
    total: 0,
    pageSize: 12
})


onMounted(() => {
    bannerImg.value = queryBannerImg(5)
    getVideoList(1)
})

const getVideoList = (pageIndex) => {
    const params = {
        pageIndex,
        pageSize: pagination.pageSize
    }
    queryVideoList(params).then(({ code, data, totalResults }) => {
        if (code === 0) {
            videoList.value = data
            pagination.total = totalResults
        }
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
                }
            }

            .right {
                margin-left: 24px;

                .item {
                    width: 282px;
                    height: 158px;
                    background-color: aliceblue;
                    margin-bottom: 24px;
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

                &:nth-of-type(4n+0) {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>