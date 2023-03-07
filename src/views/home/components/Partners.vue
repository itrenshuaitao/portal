<template>
    <div class="partners-container">
        <div v-for="(list, index) in props.partnerList" :class="`box to-${index % 2 === 0 ? 'right' : 'left'}`">
            <div class="imgList ">
                <img v-for="item in [...list, ...list]" :src="item.partnerImg" :alt="item.partnerName">
            </div>
        </div>




    </div>
</template>

<script setup>
const props = defineProps(['partnerList'])
</script>

<style lang='scss' scoped>
.partners-container {
    background: #F2F5F8 linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);
    padding: 40px 0;
}

.box {
    height: 78px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.imgList {
    position: absolute;
    display: flex;
}

.to-left {
    width: 80%;

    .imgList {
        animation: to-left 28s linear infinite;

    }

}

.to-right {
    width: 90%;

    .imgList {
        animation: to-right 28s linear infinite;
    }

}

img {
    height: 54px;
    width: 120px;
    float: left;
    margin-right: 16px;
    box-shadow: 5px 2px 24px 0px rgba(220, 220, 220, 0.5);
    border-radius: 4px;
}

@keyframes to-left {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}


@keyframes to-right {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}
</style>