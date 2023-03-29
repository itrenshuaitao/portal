<template>
    <div class="card">
        <div class="img">
            <img :src="products.productsImg" alt="">
        </div>
        <div class="text">
            <h2 class="text-overflow">{{ products.productsName }}</h2>
            <p>{{ products.productsSubtitle }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['products'])
</script>

<style lang='scss' scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 337px;
    padding: 16px;
    background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 100%);
    box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);
    backdrop-filter: blur(21.75px);
    font-family: AliPuHui55;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;



    .img {
        border-radius: 4px;
        overflow: hidden;
        height: 217px;

        img {
            width: 100%;
            height: 217px;
            transition: all .3s;

        }
    }

    &:hover {
        // background: linear-gradient(-51.95deg, rgba(246,246,250,1.00) 0%,rgba(254,255,254,1.00) 100%);
        border: 1px solid rgb(0, 75, 146);
        // box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);
        background: linear-gradient(-51.95deg, rgba(246, 246, 250, 1.00) 0%, rgba(254, 255, 254, 1.00) 100%);
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);
        border-radius: 4px;
        transform: scale(1.03);

        .img {

            img {
                transform: scale(1.1);
            }
        }

        .text h2 {
            color: rgb(0, 75, 146);
            font-size: 18px;
        }

    }

    .text {
        text-align: center;
        margin-bottom: 24px;
        font-family: Alibaba PuHuiTi;

        h2 {
            color: rgb(62, 73, 84);

            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
            -webkit-line-clamp: 1;

        }

        p {
            color: rgb(108, 123, 139);
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            margin-top: 6px;
        }

    }


}
</style>