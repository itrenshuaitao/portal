<template>
    <div>
        <div class="my_video_video" v-if="!_isMobile()">
            <vue3VideoPlay  v-bind="options" :poster="poster" @ended="onEnded" />
        </div>
        <div class="my_video_video" v-if="_isMobile()">
            <vue3VideoPlay v-bind="optionsMobile" :poster="poster" @ended="onEnded" />
        </div>
    </div>
</template>
    
<script>

import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
import { reactive, toRefs,onMounted,ref,nextTick } from "vue";
import { _isMobile } from '@/utils/index'
import { ElLoading } from "element-plus";


export default {
    components: {
        vue3VideoPlay,
    },
    props: ['video_url', 'poster'],
    setup(props,context) {
        let data = reactive({
            options: {
                width: "100%", //播放器高度
                height: "100%", //播放器高度
                color: "#409eff", //主题色
                title: "", //视频名称
                src: props.video_url, //视频源
                muted:true, //静音
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                autoPlay: true, //自动播放
                loop: false, //循环播放
                mirror: false, //镜像画面
                // ligthOff: true, //关灯模式
                volume: 0.3, //默认音量大小
                control: true, //是否显示控制
                controlBtns: [
                    "audioTrack",
                    "quality",
                    "speedRate",
                    "volume",
                    "setting",
                    "pip",
                    "pageFullScreen",
                    "fullScreen",
                ], //显示所有按钮,
            },
            optionsMobile: {
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], // 可选的播放速度
                width: "100%",
                height: "100%",
                control: false, //是否显示控制器
                autoplay: true, // 是否自动播放
                loop: false, // 是否开启循环播放
                muted: false, //非静音
                volume: 0.3, //默认音量大小
                preload: "metadata", // 自动预加载
                language: "zh-CN", // 语言，'en', 'zh-cn', 'zh-tw'
                aspectRatio: "16:9", // 播放器高宽占比（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                src: props.video_url, //视频源
                notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true, // 是否显示当前时间和持续时间的分隔符，"/"
                    durationDisplay: true, // 是否显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间
                    fullscreenToggle: true, // 是否显示全屏按钮
                },
            },
            poster: props.poster
        });

        const loadingInstance = ref(null)

        const onPlay = (ev) => {
            nextTick(() => {
                loadingInstance.value.close();
            });
        };

        const onLoadstart = (ev) => {
            let options = {
                target: ".my_video_video",
                background: "rgba(255, 255, 255, 0)",
            };
            loadingInstance.value = ElLoading.service(options);
        };

        const onEnded = (ev) => {
            context.emit('switchVideoUrl')
        };

        // onMounted(() => {
        //     console.log( props.video_url);
        // });

        return {
            _isMobile,
            loadingInstance,
            onPlay,
            onLoadstart,
            onEnded,
            ...toRefs(data)
        }
    }
};

</script>
    
    