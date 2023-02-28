<template>
    <div class="container">
        <Swiper />
        <HomeMain />
    </div>
</template>

<script setup>
import Swiper from './components/swiper.vue';
import HomeMain from './components/HomeMain.vue';
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
}
</style>