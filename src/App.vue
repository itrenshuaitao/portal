<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routerKey = computed(() => {
    return route.path + Math.random()
})
</script>

<template>
    <router-view :key="routerKey"></router-view>
</template>

<style scoped></style>
