<template>
    <HeaderPage />
    <el-main>
        <router-view />
        <div>
            <el-button @click="handleClick"> test</el-button>
        </div>
    </el-main>
    <FooterPage />
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useStore } from "vuex";
import HeaderPage from './components/header.vue';
import FooterPage from './components/footer.vue';
const { proxy } = getCurrentInstance();
const store = useStore();
const handleClick = () => {
    console.log('handleClick', proxy)
    store.commit('increment')
    console.log(store.state.count)
    const params = {
    url: "http://jsonplaceholder.typicode.com/posts/2",
  };
    proxy.$get(params).then((data) => 
    {
        console.log(data)
    }).catch((e) =>{

    })
}

</script>

<style lang='scss' scoped>
.el-main {
    background-color: pink;
    margin-top: 58px;
}
</style>