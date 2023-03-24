<template>
    <el-aside class="aside">
        <ul>
            <!-- <li>
                <el-icon><Service /></el-icon>
                <p>在线咨询</p>
            </li> -->
            <li class="booking" @click="$emit('openBookingDialog')">

            </li>
            <el-popover placement="left" title="咨询热线" :width="200" trigger="hover" :content="asideObj.sidewaysTitle3">
                <template #reference>
                    <li class="phone"> </li>
                </template>
            </el-popover>

            <el-popover placement="left" title="关注我们" :width="200" trigger="hover">
                <template #reference>
                    <li class="ico">

                    </li>
                </template>
                <img :src="asideObj.sidewaysQrcode" style="width: 138px;" />
            </el-popover>


        </ul>
        <div class="top" @click="handleToTop">

        </div>
        <!-- <el-button class="top" type="primary" circle icon="top" @click="handleToTop"></el-button> -->

    </el-aside>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { querySidewaysList } from "@/api/index"
const asideObj = ref({})
const handleToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

onMounted(() => {
    querySidewaysList().then(({ code, data }) => {
        if (code === 0) {
            asideObj.value = data[0]
        }
    })
})

</script>

<style lang='scss' scoped>
.aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
    position: fixed;
    top: 50%;
    right: 10px;
    z-index: 900;
    transform: translateY(-50%);

    ul {
        padding: 14px 0;
        width: 44px;
        background: #FFFFFF;
        border-radius: 28px;


        li {

            margin: 0 auto;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-size: 40px;
            cursor: pointer;


            &.booking {

                background-image: url(@/assets/img/booking.png);

                &:hover {
                    background-image: url(@/assets/img/booking-hover.png);
                    height: 72px;

                }

            }

            &.phone {
                background-image: url(@/assets/img/phone.png);

                &:hover {
                    background-image: url(@/assets/img/phone-hover.png);

                }
            }

            &.ico {
                background-image: url(@/assets/img/ico.png);

                &:hover {
                    background-image: url(@/assets/img/ico-hover.png);

                }
            }
        }
    }

    .top {
        cursor: pointer;

        margin-top: 24px;
        width: 40px;
        height: 40px;
        background-image: url(@/assets/img/top.png);
        background-repeat: no-repeat;
        background-size: 40px;

        &:hover {
            background-image: url(@/assets/img/top-hover.png);

        }
    }


}
</style>