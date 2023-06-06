<template>
  <div
    v-if="pageData.list[0]?.sbannerShow === 0"
    class="show-imgs-container big-logo"
    @mouseover="pageData.isIn = true"
    @mouseout="handleMouseout"
  >
    <el-carousel
      ref="refCarousel"
      :interval="pageData.cutTime"
      arrow="never"
      pause-on-hover
      :autoplay="pageData.autoplay"
      trigger="click"
      indicator-position="none"
      @change="handleChange"
    >
      <el-carousel-item
        v-for="(item, index) in pageData.list"
        :key="index"
        @click="toUrl(item.sbannerUrl)"
      >
        <img
          v-if="item.fileType === 'img'"
          :src="item.sbannerImg"
          alt="这是图片"
          class="banner"
        />
        <!--视频播放器 -->

        <div v-else-if="item.fileType === 'video'" class="my_video">
          <vue3VideoPlay
            :id="'myVideoPlayer' + index"
            v-bind="pageData.options"
            :src="item.sbannerImg"
            @play="onPlay"
            @timeupdate="onTimeupdate"
            @canplay="onCanplay"
            @ended="onEnded"
            @loadstart="onLoadstart"
          />
        </div>
        <div v-if="pageData.nowIndex === index" class="text-position">
          <div v-if="item.sbannerCopy1" class="title">
            <Transition name="my-transition" appear>
              <p>{{ item.sbannerCopy1 }}</p>
            </Transition>
          </div>
          <div v-if="item.sbannerCopy2" class="title2">
            <Transition name="my-transition" appear>
              <p>{{ item.sbannerCopy2 }}</p>
            </Transition>
          </div>
          <div v-if="item.sbannerCopy3" class="desc">
            <Transition name="my-transition" appear>
              <p>{{ item.sbannerCopy3 }}</p>
            </Transition>
          </div>
          <Transition
            v-if="item.sbannerCopy4"
            name="my-transition"
            class="desc2-transition"
            appear
          >
            <div class="desc2">
              <p>{{ item.sbannerCopy4 }}</p>
            </div>
          </Transition>
          <Transition
            name="my-transition"
            v-if="item?.sbannerUrl"
            class="link"
            appear
          >
            <div class="more" @click="() => toUrl(item.sbannerUrl)">
              了解更多
            </div>
          </Transition>
        </div>
      </el-carousel-item>

      <div class="nav-slider">
        <div class="container">
          <div
            v-for="(item, index) in pageData.list"
            :class="`slide ${pageData.nowIndex == index && 'active'}`"
            @click="() => handleSlideClick(index)"
          >
            <div class="progress-bar">
              <div class="progress-bar-slide"></div>
            </div>
            <div class="progress-titel">
              <span>
                {{ item.sbannerName.slice(0, 10) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-carousel>
  </div>
  <div v-else style="margin-top: 60px" class="big-logo"></div>
</template>
<script setup>
import {
  reactive,
  toRefs,
  ref,
  onMounted,
  toRaw,
  getCurrentInstance,
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { getHomeBanner } from "@/api/index";
import { ElLoading } from "element-plus";
const { proxy } = getCurrentInstance();
const router = useRouter();
const refCarousel = ref(null);
const slideActive = ref(0);
const loadingInstance = ref(null);
let pageData = reactive({
  autoplay: true, //是否自动切换
  isPlay: false, //播放状态
  isIn: false, //鼠标是否位于播放器内
  cutTime: 3000, //轮播时间，单位毫秒
  nowIndex: 0,
  list: [],
  options: {
    // playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
    width: "100%",
    height: "100%",
    control: false, //是否显示控制器
    autoplay: true, // 是否自动播放
    loop: false, // 是否开启循环播放
    muted: true, //静音
    volume: 0, //默认音量大小
    preload: "metadata", // 自动预加载
    language: "zh-CN", // 语言，'en', 'zh-cn', 'zh-tw'
    aspectRatio: "16:9", // 播放器高宽占比（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    // src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4", // url地址
    // poster: "http://www.ujoin-tech.com/uploadfile/upfiles/2022051714053462833b2ecadee.jpg",
    notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true, // 是否显示当前时间和持续时间的分隔符，"/"
      durationDisplay: true, // 是否显示持续时间
      remainingTimeDisplay: false, // 是否显示剩余时间
      fullscreenToggle: true, // 是否显示全屏按钮
    },
  },
});

onMounted(() => {
  getListBanner();
});
//开启深度监听
watch(()=>pageData.isIn, async (newValue, oldValue) => {
  if (oldValue !== newValue) {
    pageData.autoplay = !newValue;
  }
},{
    deep:true
});

const getListBanner = () => {
  const params = {
    pageIndex: 1,
    pageSize: 100,
    sort: 1,
  };
  getHomeBanner(params).then(({ code, data }) => {
    if (code === 0) {
      let videoArr = ["flv", "avi", "mov", "mp4", "wmv"];
      let imgArr = ["jpeg", "jpg", "png", "gif"];

      data.map((item) => {
        let str = item.sbannerImg
          ?.substring(item.sbannerImg.lastIndexOf(".") + 1)
          .toLowerCase();
        item.fileType = videoArr.includes(str)
          ? "video"
          : imgArr.includes(str)
          ? "img"
          : "null";
      });
      pageData.list = data;
    //   nextTick(() => {
        if (data[0].fileType === "video") pageData.autoplay = false;
        //  let Media = document.getElementById(`myVideoPlayer0`)
        //             console.log(Media)
        //               var eventTester = function(e){
        //      Media.addEventListener(e,function(){
        //          console.log((new Date()).getTime(),e)
        //      },false);
        //  }
        //  eventTester("loadstart"); //客户端开始请求数据
        // eventTester("progress"); //客户端正在请求数据
        // eventTester("suspend"); //延迟下载
        // eventTester("abort"); //客户端主动终止下载（不是因为错误引起）
        // eventTester("loadstart"); //客户端开始请求数据
        // eventTester("progress"); //客户端正在请求数据
        // eventTester("abort"); //客户端主动终止下载（不是因为错误引起），
        // eventTester("error"); //请求数据时遇到错误
        // eventTester("stalled"); //网速失速
        // eventTester("play"); //play()和autoplay开始播放时触发
        // eventTester("pause"); //pause()触发
        // eventTester("loadedmetadata"); //成功获取资源长度
        // eventTester("loadeddata"); //
        // eventTester("waiting"); //等待数据，并非错误
        // eventTester("playing"); //开始回放
        // eventTester("canplay"); //可以播放，但中途可能因为加载而暂停
        // eventTester("canplaythrough"); //可以播放，歌曲全部加载完毕
        // eventTester("seeking"); //寻找中
        // eventTester("seeked"); //寻找完毕
        // eventTester("timeupdate"); //播放时间改变
        // eventTester("ended"); //播放结束
        // eventTester("ratechange"); //播放速率改变
        // eventTester("durationchange"); //资源长度改变
        // eventTester("volumechange"); //音量改变
    //   });
    }
  });
};

const handleMouseout = () => {
  pageData.isIn = false;
};

// 获取走马灯的索引
const handleChange = (nowIndex, oldIndex) => {
  pageData.nowIndex = nowIndex;
  if (pageData.list[nowIndex].fileType === "video") {
    if (pageData.list[oldIndex].fileType === "video") {
      let video = document.getElementById(`myVideoPlayer${oldIndex}`);
      video.pause();
      video.currentTime = 0;
    }
    pageData.autoplay = false;
    pageData.nowIndex = nowIndex;
    let video = document.getElementById(`myVideoPlayer${nowIndex}`);
    video.play();
  }else{
    pageData.isIn = false;
  }
};
const handleSlideClick = (index) => {
  pageData.nowIndex = index;
  proxy.$refs.refCarousel.setActiveItem(index);
};
const onPlay = (ev) => {
  nextTick(() => {
    loadingInstance.value.close();
  });
};

const onLoadstart = (ev) => {
  let options = {
    target: ".my_video",
    background: "rgba(255, 255, 255, 0)",
  };
  loadingInstance.value = ElLoading.service(options);
};

const onTimeupdate = (ev) => {
  // console.log(ev, '时间更新')
};
const onCanplay = (ev) => {
  // console.log(ev, '可以播放')
};
const onEnded = (ev) => {
  if (!pageData.isIn) {
    pageData.autoplay = true;
    proxy.$refs.refCarousel.next();
  } else if (!pageData.autoplay) {
    let video = document.getElementById(`myVideoPlayer${pageData.nowIndex}`);
    video.play();
  }
};
const toUrl = (url) => {
  if (url.includes("://")) {
    window.open(url);
  } else {
    router.push(url);
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index.scss";
.show-imgs-container {
  width: 100%;
  height: 100vh;
  position: relative;

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

    .banner {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .my_video {
      width: 100%;
      height: 100%;
      pointer-events: none;
      .d-loading {
        display: none !important;
        z-index: -1 !important;
      }
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
      font-family: AliPuHui55;

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
        @include show_line(1);

        visibility: visible;
        color: rgb(255, 255, 255);
        font-size: 58px;
        font-weight: 600;
        line-height: 81px;

        .my-transition-enter-active {
          transition-delay: 0s;
        }
      }

      .title2 {
        @include show_line(1);
        opacity: 0.85;
        color: rgb(255, 255, 255);
        font-size: 40px;
        font-weight: 500;
        line-height: 56px;
        margin: 20px 0;

        .my-transition-enter-active {
          transition-delay: 0.3s;
        }
      }

      .desc {
        @include show_line(2);
        font-size: 14px;
        opacity: 0.85;
        color: rgba(255, 255, 255, 0.8);
        font-size: 23px;
        font-weight: 400;
        line-height: 32px;

        .my-transition-enter-active {
          transition-delay: 0.6s;
        }
      }

      .desc2 {
        @include show_line(1);
        font-family: PingFang SC;
        height: 60px;
        color: rgb(0, 75, 146);
        font-size: 24px;
        font-weight: 400;
        line-height: 60px;
        background-color: #fff;
        border-radius: 30px;
        margin: 20px 0;
        padding: 0 30px;
        display: inline-block;
      }

      .more {
        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 20px;
        font-size: 24px;
        font-weight: 400;
        background: rgba(255, 255, 255, 0.5);
        border: solid 1px #ffffff;
        margin: 0 auto;
        cursor: pointer;
        color: rgb(0, 75, 146);

        a {
          color: #ffffff;
        }
      }
    }
  }

  .nav-slider {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 10;
    background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.4));
    padding-bottom: 24px;
    overflow: hidden;
    padding-inline: 32px;

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      justify-content: center;
      transition-property: transform;
      box-sizing: content-box;

      .slide {
        height: 80px;
        display: flex;
        flex-direction: column;
        // flex: 0 0 196px;
        margin-right: 32px;
        row-gap: 9px;
        cursor: pointer;

        .progress-bar {
          width: 24px;
          height: 3px;
          background-color: hsla(0, 0%, 100%, 0.48);
          border-radius: 2px;
          overflow: hidden;

          .progress-bar-slide {
            background-color: #009eff;
            width: 0;
            height: 100%;
          }
        }

        .progress-titel {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.32px;
          color: hsla(0, 0%, 100%, 0.48);

          // span {}
        }

        &:hover {
          .progress-bar {
            animation: widthTrans 0.3s linear forwards;
            background-color: #fff;
          }

          .progress-titel {
            color: #fff;
          }
        }

        &.active {
          .progress-bar {
            width: 100%;

            // animation: widthTrans 3s linear forwards;
            .progress-bar-slide {
              animation: expansion 0.1s linear forwards;
            }
          }

          .progress-titel {
            color: #fff;
          }
        }
      }
    }
  }
}

@keyframes widthTrans {
  0% {
    width: 12%;
  }

  40% {
    width: 110%;
  }

  80% {
    width: 95%;
  }

  100% {
    width: 100%;
  }
}

@keyframes expansion {
  100% {
    width: 100%;
  }
}
</style>