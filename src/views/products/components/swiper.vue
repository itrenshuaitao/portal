
<template>
    <div id="certify">
        <div class="swiper-container" >
            <div class="swiper-wrapper">
                <div class="swiper-slide"  :class="{'mobile-swiper-slide':_isMobile()}">
                    <div class="text">
                        <h2>UJ-PMS智能加工过程监控系统</h2>
                        <p> 通过采集机床NC运行数据（程序号、刀具号、转速、进给倍率等）以及传感器数据（功率、振动），进行综合数据分析，提取每把刀具每次加工的加工曲线（去除主轴加减速以及不同转速下的摩擦力）进行实时监控
                        </p>
                    </div>

                    <div class="dimback">
                        <img class="img" src="@/assets/img/PMS.jpg" alt="UJ-PMS智能加工过程监控系统">
                    </div>



                </div>
                <div class="swiper-slide" :class="{'mobile-swiper-slide':_isMobile()}">

                    <div class="text">
                        <h2>UJ-TOM刀具管理系统</h2>
                        <p> 基于联网监控机床刀具加工，实时采集刀具全生命周期管理、刀具流转管理、采购优化等，对刀具加工过程异常监控，减少刀具提前报废对刀仪数据对接，准确快速</p>
                    </div>
                    <div class="dimback">
                        <img class="img" src="@/assets/img/TOM.jpg" alt="UJ-TOM刀具管理系统">
                    </div>



                </div>
                <div class="swiper-slide" :class="{'mobile-swiper-slide':_isMobile()}">


                    <div class="text">
                        <h2>UJ-IOM生产制造协同系统</h2>
                        <p>实现最基础的设备运行状态数据之外，对于设备加工时的工艺和机械参数的监控，有利于收集产品质量检验所需的各项检验指标值，实现加工过程中的质量实时把控，降低由于自动化机器连续作业，且没有采取质量异常制动，从而导致的连续质量报废的损失
                        </p>
                    </div>
                    <div class="dimback">
                        <img class="img" src="@/assets/img/IOM.jpg" alt="UJ-IOM生产制造协同系统">

                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from "vue"


import Swiper from "swiper"
import SwiperCore, { Autoplay } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/navigation';
import { _isMobile } from '@/utils/index'
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
        loopedSlides: 3,
        autoplay: {
            delay: 3000,
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
                    let translate = slideProgress * modify * 22.08333 + 'vw';
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
            setTransition: function (_, transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            },



            slideChange: function (swiper) {
                emits('slideChange', swiper.realIndex);
            }
        }

    })

})

const slideTo = (index) => {
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



#certify {

    .swiper-slide {
        width: 675px;
        height: 379px;
        background: #fff;


        .text {
            position: absolute;
            padding: 80px 45px;
            z-index: 1;

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

        .dimback {
            width: 100%;
            height: 100%;
            background: #000000;

            .img {
                opacity: 0.5;
            }
        }
    }
    .mobile-swiper-slide {
        width: 675px;
        height: 479px;
        background: #fff;


        .text {
            position: absolute;
            padding: 40px 30px;
            z-index: 1;

            h2 {
                color: rgb(241, 241, 241);
                font-size: 40px;
                font-weight: 500;
                line-height: 40px;
                margin-bottom: 14px;
            }

            p {
                color: rgb(241, 241, 241);
                font-size: 32px !important;
                font-weight: 400;
                line-height: 50px;
                zoom: 0.83;
            }
        }

        .img {
            width: 100%;
            height: 100%;
            border-radius: 4px;


        }

        .dimback {
            width: 100%;
            height: 100%;
            background: #000000;

            .img {
                opacity: 0.5;
            }
        }
    }
}
</style>





