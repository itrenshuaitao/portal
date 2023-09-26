<template>
    <div class="core-data" :class="{'mobile-core-data':_isMobile()}">
        <div v-for="item in props.coreDataList">
            <!-- <number class="number" :ref="'number' + 1" :from="1000" :to="1000" :duration="5" easing="Power1.easeOut"
                animationPaused /> -->
            <p class="number">{{ item.coredataData }}</p>
            <span>{{ item.coredataName }}</span>

        </div>


    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue"
import { _isMobile } from '@/utils/index'
const { proxy } = getCurrentInstance()

const number1 = ref(null)
const number2 = ref(null)
const number3 = ref(null)
const divTop = ref(0)

const props = defineProps(['coreDataList'])


onMounted(() => {
    divTop.value = document.querySelector('.core-data').offsetTop
    // window.addEventListener("scroll", showDiv);
})

//页面卸载
onUnmounted(() => {
    // window.removeEventListener("scroll", showDiv);
});
const showDiv = () => {
    //获取滚动条距离页面顶部的距离，如果滚动条距离页面距离大于目标元素距离页面顶部的距离，则目标元素已经往上滚动，且超出了当前可视区域，则给该元素添加fixed属性
    const offset = proxy.$el.getBoundingClientRect(); // vue中，使用this.$el获取当前组件的根元素
    const offsetTop = offset.top;
    const offsetBottom = offset.bottom;
    const offsetHeight = offset.height;
    // 进入可视区域
    if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
        [1, 2, 3].map(item => {
            proxy.$refs[`number${item}`].play()
        })
    } else {
        // proxy.$refs.number1.pause()
    }

}

</script>
<style lang='scss' scoped>
.core-data {
    width: 80%;
    margin: 40px auto;
    background: linear-gradient(308deg, #F6F6FA 0%, #FEFFFE 100%);
    box-shadow: 5px 2px 24px 0px rgba(220, 220, 220, 0.5);
    border-radius: 4px;
    border: 2px solid #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    div {
        width: 25%;
        text-align: center;
        padding: 12px 0;
        display: flex;
        display: flex;
        justify-content: center;
        flex-direction: column;


        span {
            color: rgb(108, 123, 139);
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            margin-top: 14px;
        }

        .number {
            color: rgb(0, 75, 146);
            font-family: DIN;
            font-size: 28px;
            font-weight: 500;
            line-height: 36px;
        }
    }


}
.mobile-core-data{
    width: 90%;
    div {
        width: 50%;
        text-align: center;
        padding: 30px 0;
        display: flex;
        display: flex;
        justify-content: center;
        flex-direction: column;


        span {
            color: rgb(108, 123, 139);
            font-family: PingFang SC;
            font-size: 30px;
            font-weight: 400;
            line-height: 22px;
            margin-top: 14px;
        }

        .number {
            color: rgb(0, 75, 146);
            font-family: DIN;
            font-size: 40px;
            font-weight: 500;
            line-height: 36px;
            margin-bottom: 20px;
        }
    }
}
</style>