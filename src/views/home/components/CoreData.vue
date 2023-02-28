<template>
    <div class="core-data">
        <div>
            <span>核心数据</span>
            <number class="number" ref="number1" :from="0" :to="1000" :duration="5" :delay="2" easing="Power1.easeOut" />

        </div>
        <div>
            <span>核心数据</span>

            <number class="number" ref="number1" :from="0" :to="1000" :duration="5" :delay="2" easing="Power1.easeOut" />

        </div>
        <div>
            <span>核心数据</span>

            <number class="number" ref="number1" :from="0" :to="1000" :duration="5" :delay="2" easing="Power1.easeOut" />

        </div>

    </div>
</template>
  
<script setup>

</script>
<style lang='scss' scoped>
.core-data {
    width: 80%;
    height: 104px;
    margin: 40px auto;
    background: linear-gradient(308deg, #F6F6FA 0%, #FEFFFE 100%);
    box-shadow: 5px 2px 24px 0px rgba(220, 220, 220, 0.5);
    border-radius: 4px;
    border: 2px solid #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    div {
        span {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6C7B8B;
            line-height: 25px;
        }

        .number {
            font-size: 36px;
            font-weight: 500;
            color: #3E4954;
            line-height: 50px;
        }
    }


}
</style>