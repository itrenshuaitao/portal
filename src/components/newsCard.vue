<template>
    <div class="card" :class="{'mobile-card':_isMobile()}">
        <div class="img">
            <img :src="news.newsImg" alt="">
        </div>
        <div class="text">
            <h2 class="text-overflow">{{ news.newsName }}</h2>
            <p>{{ news.newsTime.replace(/-/g, "/") }}</p>
        </div>
    </div>
</template>

<script setup>
import { _isMobile } from '@/utils/index'
const props = defineProps(['news'])
</script>

<style lang='scss' scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 321px;
    padding: 16px;
    background-color: #f7f7f7;
    border: 1px solid rgb(255, 255, 255);

    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;
    font-family: AliPuHui55;


    .img {
        border-radius: 4px;
        overflow: hidden;

        img {
            width: 100%;
            height: 217px;
            transition: all .3s;

        }
    }

    &:hover {
        // box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
        border: 1px solid rgb(0, 75, 146);
        border-radius: 4px;
        transform: scale(1.003);
        background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 100%);
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);

        .img {

            img {
                transform: scale(1.1);
            }
        }

        .text h2 {
            color: rgb(0, 75, 146);
        }

    }

    .text {
        text-align: center;
        margin-bottom: 24px;
        font-family: AliPuHui55;

        h2 {
            color: rgb(62, 73, 84);
            font-size: 18px;
            font-weight: 500;
            line-height: 24px;
            -webkit-line-clamp: 1;

        }

        p {
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin-top: 9px;
        }

    }


}
.mobile-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 510px;
    padding: 16px;
    background-color: #f7f7f7;
    border: 1px solid rgb(255, 255, 255);

    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;
    font-family: AliPuHui55;


    .img {
        border-radius: 4px;
        overflow: hidden;

        img {
            width: 100%;
            height: 360px;
            transition: all .3s;

        }
    }

    &:hover {
        // box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
        border: 1px solid rgb(0, 75, 146);
        border-radius: 4px;
        transform: scale(1.003);
        background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 100%);
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);

        .img {

            img {
                transform: scale(1.1);
            }
        }

        .text h2 {
            color: rgb(0, 75, 146);
        }

    }

    .text {
        text-align: center;
        // margin-bottom: 24px;
        // font-family: AliPuHui55;

        h2 {
            color: rgb(62, 73, 84);
            font-size: 36px;
            font-weight: 500;
            line-height: 56px;
            -webkit-line-clamp: 1;
            // margin-top: 20px;

        }

        p {
            color: rgb(108, 123, 139);
            font-size: 34px;
            font-weight: 400;
            line-height: 38px;
            margin-top: 16px;
        }

    }


}
</style>