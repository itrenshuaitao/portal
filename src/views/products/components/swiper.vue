
<template>
    <div id="certify">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="text">
                        <h2>UJ-iPMS过程监控</h2>
                        <p> Ivy过程监控系统通过采集机床NC运行数据（程序号、刀具号、转速、进给倍率等）以及传感器数据（功率、振动），进行综合数据分析，提取每把刀具每次加工的加工曲线（去除主轴加减速以及不同转速下的摩擦力）进行实时监控。
                        </p>
                    </div>
                    <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008055ec66f250d77b.png"
                        alt="">


                </div>
                <div class="swiper-slide">

                    <div class="text">
                        <h2>UJ-iCDS撞机保护</h2>
                        <p> 碰撞监控系统通过在机床主轴附近安装振动传感器，在发生碰撞的一瞬间(1ms响应)根据异常加剧的振动信号识别碰撞，并在识别到碰撞后快速停止机床进行保护，防止进一步的伤害。</p>
                    </div>
                    <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/202005212008175ec66f31696da.png"
                        alt="">


                </div>
                <div class="swiper-slide">


                    <div class="text">
                        <h2>UJ-IoM生产制造协同系统 </h2>
                        <p> "联网数据采集是现代OEE系统应用的核心基础，通过机联网采集如：设备各种运行状态（状态、持续时间、发生次数）、生产节拍、产出数、生产工艺等参数。
                            实现最基础的设备运行状态数据之外，对于设备加工时的工艺和机械参数的监控，有利于收集产品质量检验所需的各项检验指标值，实现加工过程中的质量实时把控，降低由于自动化机器连续作业，且没有采取质量异常制动，从而导致的连续质量报废的损失。"
                        </p>
                    </div>
                    <img class="img" src="http://www.ujoin-tech.com/uploadfile/upfiles/20221008161117634130a5c229c.jpg"
                        alt="">

                </div>
          
            </div>
        </div>
 
    </div>
</template>

<script setup>
import { onMounted } from "vue"


import Swiper  from "swiper"
import SwiperCore, { Autoplay } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/navigation';
const emits = defineEmits(['slideChange']);
SwiperCore.use([Autoplay]);
var certifySwiper = {}
onMounted(() => {
     certifySwiper = new Swiper('#certify .swiper-container', {
        // modules: [Autoplay],
        watchSlidesProgress: true,
        slidesPerView: '1',
        centeredSlides: true,
        loop: true,
        loopedSlides:3,
        autoplay:{ 
          delay:3000,
        //   disableOnInteraction:false, //解决滑动后不能轮播的问题
        }, 

        on: {
            progress: function (progress) {
                for (let i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    let modify = 1
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.4 + 1;
                    }
                    let translate = slideProgress * modify * 318 + 'px';
                    let scale = 1 - Math.abs(slideProgress) / 5;
                    let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function (_,transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            },



            slideChange:function(swiper){
                emits('slideChange',swiper.realIndex);
            }
        }

    })

})

const slideTo = (index)=>{
    certifySwiper.slideToLoop(index)
}
defineExpose({
    slideTo
})

</script>

<style lang='scss' scoped>
#certify {
    position: relative;
    /*判断宽度设置响应式效果*/
    margin: 60px 210px
}



#certify .swiper-slide {
    width: 675px;
    height: 379px;
    background: #fff;

    .text {
        position: absolute;
        padding: 100px 45px;

        h2 {
            color: rgb(241, 241, 241);
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
            margin-bottom: 24px;
        }

        p {
            color: rgb(241, 241, 241);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }
    }

    .img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
}








</style>





