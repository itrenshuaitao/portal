<template>
    <div class="card">
        <div class="img">
            <img src="https://www.orbitmes.com/dist/images/plan-03.jpg" alt="">
        </div>
        <div class="text">
            <h2>武义协力机电</h2>
            <p>磨损监控是作为刀具换刀判断的依据，需要一线操作工进行学习；</p>
        </div>
        <div class="action">
            <div>
                查看详情
                <i class="right-arrow"></i>
            </div>
            <div>
                军工行业
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang='scss' scoped>
.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 440px;
    margin-bottom: 40px;
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

    }

    .text {
        h2 {
            color: rgb(62, 73, 84);
            font-size: 24px;
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
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        :nth-child(1) {
            color: rgb(0, 75, 146);
            font-size: 20px;
            font-weight: 400;
            line-height: 28px;
            letter-spacing: 0px;
            text-align: left;
            text-transform: uppercase;

            .right-arrow {
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                background-image: url("@/assets/img/right-arrow.png");
                background-repeat: no-repeat;
            }
        }

        :nth-child(2) {
            width: 88px;
            height: 32px;
            background: rgb(255, 255, 255);
            box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5) inset 0px -1px 4px rgba(0, 75, 146, 0.65);
            backdrop-filter: blur(21.75px);
            border-radius: 16px;
            color: rgb(0, 75, 146);
            font-size: 14px;
            font-weight: 400;
            line-height: 32px;
            letter-spacing: 0px;
            text-align: center;
        }
    }
}
</style>