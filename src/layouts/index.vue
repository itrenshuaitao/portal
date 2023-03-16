<template>
    <HeaderPage ref="refHeader" />
    <el-main>
        <router-view />
    </el-main>
    <AsidePage @open-booking-dialog="openBookingDialog" />
    <FooterPage @open-booking-dialog="openBookingDialog" />
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from "vuex";
import HeaderPage from './components/header.vue';
import FooterPage from './components/footer.vue';
import AsidePage from './components/aside.vue';
import {getBanner } from '@/api/index'
const { proxy } = getCurrentInstance();
const store = useStore();
const refHeader = ref(null)
const openBookingDialog = () => {
    proxy.$refs.refHeader.openDialog()
}

onMounted(()=>{
    let params = {
        pageIndex:1,
        pageSize:10
    }
    getBanner(params).then(({code,data})=>{
        if(code===0){
            store.commit('setBannerList',data)
        }
    })
})
const handleClick = () => {

    const params = {
        url: "http://jsonplaceholder.typicode.com/posts/2",
    };
    proxy.$get(params).then((data) => {
    }).catch((e) => {

    })
}

</script>

<style lang='scss' scoped>
.el-main {
    padding: 0;
    // background-color: rgba(220, 220, 220, 0.5);
    overflow: hidden;
    // margin-top: 58px;
}
</style>