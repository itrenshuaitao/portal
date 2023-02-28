<template>
    <div class="show-imgs-container" @mouseover="data.isIn = true" @mouseout="data.isIn = false">
        <el-carousel ref="refCarousel" :interval="data.cutTime" arrow="never" :autoplay="data.autoplay" trigger="click"
            :indicator-position="data.autoplay ? '' : 'none'" @change="handleChange">
            <el-carousel-item v-for="(item, index) in data.list" :key="index">
                <!--视频播放器 -->
                <img v-if="item.type === '0'" src="@/assets/img/test1.jpg" alt="这是图片" class="banner" />
                <div v-else class="my_video">
                    <vue3VideoPlay :id="'myVideoPlayer' + index" v-bind="data.options" :src="item.url" @play="onPlay"
                        @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay" @ended="onEnded" />
                </div>
                <div class="text-position">
                    <div class="title">
                        <Transition name="my-transition" appear>
                            <p>友机 · 智能加工过程监控系统</p>
                        </Transition>
                    </div>
                    <div class="title2">
                        <Transition name="my-transition" appear>
                            <p>断刀 | 崩刃 | 撞刀</p>
                        </Transition>
                    </div>
                    <div class="desc">
                        <Transition name="my-transition" appear>
                            <p>实时监控每把刀具每次加工的功率变化，在发生异常时自动停机；
                                换型时自动学习，自动监控，操作简单；
                                适用范围广，不限刀具数量和机床类型</p>
                        </Transition>
                    </div>
                    <Transition name="my-transition" class="desc2-transition" appear>
                        <div class="desc2">
                            <p>保护刀具和机床、减少废品提高品质，让自动化生产更加稳定</p>
                        </div>

                    </Transition>
                    <Transition name="my-transition" class="link" appear>

                        <div class="more">

                            <router-link to="/">了解更多</router-link>

                        </div>
                    </Transition>


                </div>


            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>

import { reactive, toRefs, ref, onMounted, toRaw, getCurrentInstance } from "vue";
import MyTransition from "@/components/Transition.vue"
const { proxy } = getCurrentInstance()
const refCarousel = ref(null);
let data = reactive({
    autoplay: false,//是否自动切换
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
        width: '100%',
        height: '100%',
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
    // let container = document.getElementsByClassName("show-imgs-container")[0]
    // container.addEventListener("mouseover", function (e) {
    //     container.classList.add('on-mouse-over')
    // })
    // container.addEventListener("mouseout", function (e) {
    //     container.classList.remove('on-mouse-over')
    //     data.autoplay = true
    //     // proxy.$refs.refCarousel.next()
    // })
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
    let isHover = document.getElementsByClassName("show-imgs-container")[0].classList.contains("on-mouse-over")
    if (!isHover) {
        data.autoplay = true
        proxy.$refs.refCarousel.next()

    }
    // console.log(proxy.$refs.refCarousel)
}

</script>
<style lang="scss">
.show-imgs-container {
    width: 100%;
    height: 100vh;

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

        .my_video {
            pointer-events: none
        }

        video {
            width: 100%;
            height: 100%;
            position: fixed;
            display: inline-block;
            vertical-align: baseline;
            object-fit: fill; //消除留白
        }

        .d-play-btn {
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

        .text-position {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            z-index: 1;

            .my-transition-enter-active {
                transition: all 0.3s ease-out;
            }

            .my-transition-enter-active.desc2-transition {
                transition-delay: 0.9s;
            }

            .my-transition-enter-active.link {
                transition-delay: 1.2s;
            }

            .my-transition-leave-active {
                transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
            }

            .my-transition-enter-from,
            .my-transition-leave-to {
                transform: translateY(50px);
                opacity: 0;
            }

            .title {
                visibility: visible;

                .my-transition-enter-active {
                    transition-delay: 0s;
                }
            }

            .title2 {
                margin: 20px 0;

                .my-transition-enter-active {
                    transition-delay: 0.3s;
                }
            }

            .desc {
                font-size: 14px;
                line-height: 22px;

                .my-transition-enter-active {
                    transition-delay: 0.6s;
                }
            }

            .desc2 {
                line-height: 30px;
                font-size: 14px;
                background-color: #fff;
                border-radius: 20px;
                color: #236cf0;
                margin: 20px 0;
                padding: 0 30px;
                display: inline-block;
            }

            .more {
                width: 160px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                border-radius: 20px;
                border: solid 1px #ffffff;
                margin: 0 auto;



                a {
                    color: #ffffff;
                }
            }


        }
    }
}
</style>