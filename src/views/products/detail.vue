<template>
    <div class="detail-wrapper">
        <p v-html="content.productsDetail"></p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { queryProductsById } from "@/api/index"
const route = useRoute()
const content = ref('')
onMounted(() => {
    queryProductsById({ id: route.params.id }).then(({code, data}) => {

        if (code == 0) {

            content.value = data[0]
        }
    })
})


</script>

<style lang='scss' scoped>

</style>