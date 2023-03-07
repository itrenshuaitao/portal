<template>
    <div class="solution">

        <Banner title="解决方案" subTitle="以机床监控为核心的数字化工厂解决方案" color="rgb(255, 255, 255)"
            imgSrc="https://easyv.assets.dtstack.com/homepage/common/assets/images/market-consultation/search_bg.jpg">
        </Banner>
        <div class="tab">
            <el-button :type="plain" link :class="active == '1' && 'active'"
                @click="() => handleTabClick('1')">解决方案</el-button>
            <el-button :type="plain" link class="news" :class="active == '2' && 'active'"
                @click="() => handleTabClick('2')">行业痛点</el-button>
            <el-button :type="plain" link :class="active == '3' && 'active'"
                @click="() => handleTabClick('3')">解决案例</el-button>
        </div>
        <template v-if="solutionList[0]?.industryType === 0">
            <div class="title1 title">解决方案</div>
            <swiper class="swiper-container" loop :space-between="6" :slides-per-view="5"
                :autoplay="{ autoplay: true, pauseOnMouseEnter: true }" @slideChange="slideChange">
                <swiper-slide class="swiper-slide" v-for="item in solutionList" :key="item.id" :solution_id="item.id"
                    @mouseenter="mouseOver">
                    <img style="width:100%; height: 328px" :src="item.industryImg" alt="">
                    <div class="itemDiv">
                        <div class="icon">
                            <img src="https://www.rootcloud.com/vancheerfile/Images/2021/10/20211022110621109.png" alt="">
                        </div>
                        <div class="name">{{ item.industryName }}</div>
                        <div class="msg">
                            {{ item.industryTitle }} </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            </swiper>
        </template>

        <div class="title2 title">行业痛点</div>
        <div class="problem">
            <div>
                <h2>{{ problemList[2]?.industryPainpoint }}</h2>
                <p>
                    Ivy过程监控系统通过采集机床NC运行数据（程序号、刀具号、转速、进给倍率等）以及传感器数据（功率、振动），进行综合数据分析，提取每把刀具每次加工的加工曲线（去除主轴加减速以及不同转速下的摩擦力）进行实时监控。
UJ-iCDS撞机保护        碰撞监控系统通过在机床主轴附近安装振动传感器，在发生碰撞的一瞬间(1ms响应)根据异常加剧的振动信号识别碰撞，并在识别到碰撞后快速停止机床进行保护，防止进一步的伤害。    </p>
            </div>
            <div class="list">
                <div v-for="(item,index) in problemList" :class="`item item${index+1}`">{{ item.industryName }}</div>
            </div>
            <div class="img">
                <img style="" :src="problemList[2]?.industryPainpointImg" alt="">
                <div class="more" @click="() => proxy.$router.push('/case')">
                    查看更多痛点
                </div>
            </div>
        </div>
        <div class="title3 title">解决案例</div>
        <!-- <div class="case-list">
            <div class="item" v-for="item in 3">
                <CaseCard />
            </div>
            <div class="more" @click="() => proxy.$router.push('/case')">
                查看更多案例
            </div>
        </div> -->


    </div>
</template>
    
<script setup>
import { ref, onMounted, toRaw, computed } from "vue"
import CaseCard from "@/components/caseCard.vue"
import Banner from "@/components/Banner.vue"
import { Swiper, SwiperSlide, } from 'swiper/vue';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
import { queryIndustryList } from "@/api/index"

SwiperCore.use([Autoplay]);

const active = ref("1")
const solutionList = ref([])
const problemList = ref([])

onMounted(() => {
    getSolutionList()
})
const getSolutionList = () => {

    const params = {
        pageIndex: 1,
        pageSize: 1000
    }
    queryIndustryList(params).then(({ code, data }) => {
        if (code === 0) {
            solutionList.value = data
    problemList.value=data.slice(0,5)

        }
    })
}
const handleTabClick = (val) => {
    active.value = val
    let toHeight = document.querySelector(`.title${val}`).offsetTop

    window.scrollTo({
        top: toHeight - 90,
        behavior: "smooth"
    });
}

const slideChange = (val) => {
    // console.log("slide change",toRaw(val))
}
const mouseOver = (val) => {
    let list = toRaw(solutionList.value)

    let solution_id = val.target.getAttribute('solution_id')
    let index = list.findIndex(item => item.id.toString() === solution_id)
    let arr
    if (list.length > 5) {
         arr = list.slice(index - 2, index + 3)
        if (arr.length !== 5 && index > 2) {
            arr.push(...list.slice(0, 5 - arr.length))
        }else if(arr.length !== 5 && index < 2){
            arr.push(...list.slice(-(5 - arr.length)))
        }
    } else {
        arr = list
    }

    problemList.value=arr
}

</script>
    
<style lang="scss" scoped>
.solution {
    width: 100%;
    height: 100%;

    .tab {
        height: 60px;
        background: #F9F9F9;
        border: 1px solid #E5E5E5;
        padding: 0 120px;
        font-size: 14px;
        color: #3E4954;
        line-height: 17px;

        .active {
            font-size: 16px;
            color: #0054A7;
            line-height: 18px;
        }

        .el-button {
            margin: 20px 0;
        }

        .news {
            margin: 20px;
        }
    }

    .title {
        height: 56px;
        font-size: 40px;
        color: #3E4954;
        line-height: 47px;
        text-align: center;
        margin: 40px 0;
    }

    .swiper-container {

        margin: 0 120px;

        .swiper-slide {
            position: relative;
            overflow: hidden;

            img {
                display: block;

            }

            &:hover {
                .itemDiv {

                    padding-top: 6rem;

                    background: linear-gradient(180.00deg, rgba(25, 108, 255, 0) 0%, rgba(0, 75, 146, 1) 100%);
                    opacity: 0.85;
                }
            }


            .itemDiv {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                bottom: 0;
                padding-top: 16rem;
                padding-left: 16px;
                padding-bottom: 0.6rem;
                transition: All 0.8s ease;

                .icon {
                    img {
                        width: 24px;
                        height: 24px;
                        margin-bottom: 8px;
                    }
                }

                .name {
                    font-size: 20px;
                    color: #FFFFFF;
                    line-height: 24px;
                    margin-bottom: 16px;
                }

                .msg {
                    color: rgb(255, 255, 255);
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
                }
            }
        }
    }

    .problem {

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        overflow: hidden;
        align-items: center;
        height: 613px;
        padding: 0 120px;
        background: linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);

        h2 {
            color: rgb(62, 73, 84);
            font-size: 24px;
            font-weight: 500;
            line-height: 34px;
            margin-bottom: 33px;
        }

        p {
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
        }

        img {
            height: 378px;
            width: 40vw;
        }

        .img {
            margin-top: 74px;
        }

        .list {
            width: 100%;
            height: 101%;
            border: 2px solid rgba(200, 232, 255, .5);
            border-radius: 0 100% 100% 0/50%;
            border-left: none;
            margin-right: 115px;
            position: relative;

            .item {
                position: absolute;
                width: 100px;
                height: 100px;
                text-align: center;
                background: rgba(255, 255, 255, 0.25);
                box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5), inset 0px -1px 4px 0px #C8E8FF;
                backdrop-filter: blur(3px);
                border-radius: 50%;
                color: rgb(108, 123, 139);
                font-size: 20px;
                font-weight: 500;
                line-height: 100px;

            }

            .item3 {
                width: 130px;
                height: 130px;
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgb(69, 156, 222);
                backdrop-filter: blur(8.15px);
                top: 39%;
                transform: rotateY(-50%);
                right: -65px;
                color: rgb(0, 75, 146);
                font-size: 24px;
                font-weight: 500;
                line-height: 130px;
                letter-spacing: 0px;
            }

            .item1 {
                top: 10px;
                left: 50px;
            }

            .item5 {
                bottom: 20px;
                left: 50px;
            }

            .item2 {
                top: 20%;
                left: 90px;
            }


            .item4 {
                left: 90px;
                top: 63%;
            }

        }
    }

    .case-list {
        padding: 0 120px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 46px;

        .item {
            width: 32%;
        }


    }

    .more {
        margin: 46px auto;
        width: 191px;
        height: 40px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #6C7B8B;
        font-size: 24px;
        font-weight: 400;
        color: #6C7B8B;
        line-height: 40px;
        cursor: pointer;
    }

}
</style>