<template>
    <div class="detail-wrapper">
        <p v-html="content.caseDetail"></p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { queryCaseById } from "@/api/index"
const route = useRoute()
const content = ref('')
onMounted(() => {
    queryCaseById({ id: route.params.id }).then(({code, data}) => {

        if (code == 0) {

            content.value = data[0]
        }
    })
})


</script>

<style lang='scss' scoped>
.detail-wrapper {
    margin-top: 60px;
    padding: 0 120px;
}
</style>