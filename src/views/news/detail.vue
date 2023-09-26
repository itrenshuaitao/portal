<template>
    <div class="detail-wrapper">
        <p v-html="content.newsDetail" :class="{'mobile-news-detail-wrapper':_isMobile()}"></p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { queryNewsById } from "@/api/index"
import { _isMobile } from '@/utils/index'
const route = useRoute()
const content = ref('')
onMounted(() => {
    queryNewsById({ id: route.params.id }).then(({code, data}) => {

        if (code == 0) {

            content.value = data[0]
        }
    })
})


</script>

<style lang='scss' scoped>

</style>
<style>
.mobile-news-detail-wrapper p span{
    font-size: 36px !important;
}
</style>