<template>
    <div>
        <video id="my-player" ref="videoRef" class="video-js w-full h-full">
            <source
                src="https://prod-streaming-video-msn-com.akamaized.net/b7014b7e-b38f-4a64-bd95-4a28a8ef6dee/113a2bf3-3a5f-45d4-8b6f-e40ce8559da3.mp4" />
        </video>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import videojs from 'video.js'
let videoPlayer = null
const videoRef = ref(null)
const initVideo = () => {
    const options = {
        width: 960,
        height: 400,
        language: 'zh-CN', // 设置语言
        controls: true, // 是否显示控制条
        // preload: 'auto', // 预加载
        autoplay: true, // 是否自动播放
        fluid: false, // 自适应宽高
        muted: true,//设置静音
        src: "http://vjs.zencdn.net/v/oceans.ogv" // 要嵌入的视频源的源 URL
    }
    if (videoRef.value) {
        // 创建 video 实例
        console.log('video')
        videoPlayer = videojs(videoRef.value, options, onPlayerReady)
    }
}


const onPlayerReady = () => { }
onMounted(() => {
    initVideo()
})
</script>

<style lang='scss' scoped></style>