<template>
    <div class="show-imgs-container" @mouseover="data.isIn = true" @mouseout="data.isIn = false">
        <el-carousel ref="refCarousel" :interval="data.cutTime" arrow="always" :autoplay="data.autoplay" trigger="click"
            :indicator-position="data.autoplay ? '' : 'none'" @change="handleChange">
            <el-carousel-item v-for="(item, index) in data.list" :key="index">
                <!--视频播放器 -->
                <img v-if="item.type === '0'" src="@/assets/img/test1.jpg" alt="这是图片" class="banner" />
                <div v-else class="my_video">
                    <vue3VideoPlay :id="'myVideoPlayer' + index" v-bind="data.options" :src="item.url"
                        @play="onPlay" @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay" @ended="onEnded" />
                </div>


                <!-- <i v-show="!isPlay" class="play-btn el-icon-video-play" @click="playVideo"></i>
                <i v-show="isPlay && isIn" class="play-btn el-icon-video-pause" @click="pauseVideo"></i> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>

import { reactive, toRefs, ref, onMounted, toRaw, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()
const refCarousel = ref(null);
let data = reactive({
    autoplay: true,//是否自动切换
    isPlay: false,//播放状态
    isIn: false,//鼠标是否位于播放器内
    cutTime: 3000,//轮播时间，单位毫秒
    nowIndex: 0,
    list: [
        {
            type: '0',
            url: "@/assets/img/test1.jpg"
        },
        {
            type: '0',
            url: "@/assets/img/test2.jpg"
        },
        {
            type: '1',
            url: "https://www.runoob.com/try/demo_source/mov_bbb.mp4"
        },
        {
            type: '1',
            url: "http://vjs.zencdn.net/v/oceans.mp4"
        },
    ],
    options: {
        // playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        control: false, //是否显示控制器
        autoplay: false, // 是否自动播放
        volume: 0,
        loop: false, // 是否开启循环播放
        preload: "auto", // 自动预加载
        language: "zh-CN", // 语言，'en', 'zh-cn', 'zh-tw'
        aspectRatio: "16:9", // 播放器高宽占比（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", // url地址
        poster: "http://www.ujoin-tech.com/uploadfile/upfiles/2022051714053462833b2ecadee.jpg",
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
            timeDivider: true, // 是否显示当前时间和持续时间的分隔符，"/"
            durationDisplay: true, // 是否显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间
            fullscreenToggle: true, // 是否显示全屏按钮
        },
    },
})


onMounted(() => {
    console.log(`the component is now mounted.`)
})
// 获取走马灯的索引
const handleChange = (nowIndex, oldIndex) => {



    if (data.list[nowIndex].type === '1') {
        if (data.list[oldIndex].type === '1') {
            let video = document.getElementById(`myVideoPlayer${oldIndex}`)
            video.pause()
            video.currentTime = 0
        }
        data.autoplay = false
        let video = document.getElementById(`myVideoPlayer${nowIndex}`)
        // video.addEventListener('ended', function () {
        //     console.log(`myVideoPlayer${nowIndex}`,'添加视频结束事件')
        //     data.autoplay = true
        // })
        video.play()
    }
}
const onPlay = (ev) => {
    console.log('播放')
    data.autoplay = false

}
const onPause = (ev) => {
    // console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
    // console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
    // console.log(ev, '可以播放')
}
const onEnded = (ev) => {
    console.log(ev, '播放结束')
        data.autoplay = true;
        console.log(proxy.$refs.refCarousel)
        proxy.$refs.refCarousel.next()
}

</script>
<style lang="scss">
.show-imgs-container {
    width: 100%;
    height: 100%;

    .el-carousel {
        width: 100%;
        height: 100%;
    }

    .el-carousel__container {
        width: 100%;
        height: 100%;
    }

    .el-carousel__item {
        width: 100%;
        height: 100%;

        video {
            width: 100%;
            height: 100%;
            position: fixed;
            display: inline-block;
            vertical-align: baseline;
            object-fit: fill; //消除留白
        }
        .d-play-btn{
            display: none;
        }

        .play-btn {
            font-size: 60px;
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>