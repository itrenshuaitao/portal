<template>
    <div class="card">
        <div class="img">
            <img :src="products.productsImg" alt="">
        </div>
        <div class="text">
            <h2 class="text-overflow">{{products.productsName}}</h2>
            <p>{{products.productsSubtitle}}</p>
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
    height: 342px;
    padding: 16px;
    background-color: #f7f7f7;
    border: 1px solid rgb(255, 255, 255);
    border-radius: 4px;
    transition: all .3s;
    cursor: pointer;


    .img {
        border-radius: 4px;
        margin: 0 auto;
        overflow: hidden;

        img {
            width: 100%;
            transition: all .3s;

        }
    }

    &:hover {
        // box-shadow: 0px 18px 30px rgba(220, 220, 220, 0.5);
        background: rgb(255, 255, 255), linear-gradient(-51.95deg, rgba(246, 246, 250, 1) 93%, rgba(254, 255, 254, 1) 3%);
        border: 1px solid rgb(0, 75, 146);
        box-shadow: 0px 8px 15px rgba(196, 196, 196, 0.5);
        border-radius: 4px;
        transform: scale(1.003);

        .img {

            img {
                transform: scale(1.1);
            }
        }
        .text h2{
            color: rgb(0, 75, 146);
        }

    }

    .text {
        text-align: center;
        margin-bottom: 24px;

        h2 {
            color:rgb(62, 73, 84);
            font-size: 24px;
            font-weight: 500;
            line-height: 24px;
            -webkit-line-clamp: 1;

        }

        p {
            color: rgb(108, 123, 139);
            font-size: 16px;
            font-weight: 400;
            line-height: 16px;
            margin-top: 9px;
        }

    }


}
</style>