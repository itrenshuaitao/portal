<template>
    <div class="card" @click="() => router.push('/case/detail/' + props.case.id)">
        <div class="img">
            <img :src="props.case.caseImg" alt="">
        </div>
        <div class="text">
            <h2>{{ props.case.caseName }}</h2>
            <p>{{ props.case.caseTitle }}</p>
        </div>
        <div class="action">
            <div>
                查看详情
                <i class="right-arrow"></i>
            </div>
            <div class="right">
                <div class="industry-name"
                    v-for="item in queryIndustryNameList(props.case.caseIndustryId.split(',')).slice(0, 2)">
                    {{ item }}
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
    queryIndustryNameList
} from '@/utils/index'
const router = useRouter()
const props = defineProps(['case'])

</script>

<style lang='scss' scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 370px;
    padding: 16px;
    // background-color: #f7f7f7;
    background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 100%);
    border: 1px solid rgb(255, 255, 255);
    box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;
    font-family: Alibaba PuHuiTi;


    .img {
        border-radius: 4px;
        // margin: 0 auto;
        height: 217px;

        overflow: hidden;

        img {
            width: 100%;
            height: 217px;
            transition: all .3s;

        }
    }

    &:hover {
        // box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
        background: rgb(255, 255, 255), linear-gradient(-51.95deg, rgba(246, 246, 250, 1) 93%, rgba(254, 255, 254, 1) 3%);
        border: 2px solid rgb(0, 75, 146);
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);
        border-radius: 4px;
        transform: scale(1.003);

        .img {

            img {
                transform: scale(1.1);
            }
        }

    }

    .text {
        h2 {
            color: rgb(62, 73, 84);
            font-size: 18px;
            font-weight: 500;
            line-height: 34px;
            margin-top: 20px
        }

        p {
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin-top: 9px
        }

    }

    .action {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        font-family: AliPuHui55;


        :nth-child(1) {
            color: rgb(0, 75, 146);
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0px;
            text-align: left;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: space-around;


            .right-arrow {
                margin-left: 8px;
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                background-image: url("@/assets/img/right-arrow.png");
                background-repeat: no-repeat;
            }
        }

        .right {
            display: flex;

            .industry-name {
                // width: 88px;
                padding: 0px 16px;
                height: 32px;
                background: rgb(255, 255, 255);
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgba(0, 75, 146, 0.65);
                backdrop-filter: blur(21.75px);
                border-radius: 16px;
                color: rgb(0, 75, 146);
                font-size: 14px;
                font-weight: 400;
                line-height: 32px;
                letter-spacing: 0px;
                text-align: center;
                margin-right: 10px;
            }
        }


    }
}
</style>