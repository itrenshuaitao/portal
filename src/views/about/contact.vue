<template>
    <div>
        <Banner :imgSrc="bannerImg" />
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted, getCurrentInstance, toRaw, nextTick } from "vue"
import Banner from "@/components/Banner.vue"
import { queryBannerImg } from "@/utils/index"
const bannerImg = ref('')
onMounted(() => {

    bannerImg.value = queryBannerImg(8)


})
</script>

<style lang='scss' scoped></style>