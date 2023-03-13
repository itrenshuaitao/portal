<template>
    <div class="news">

        <Banner 
            :imgSrc="toRaw(bannerImg)">
        </Banner>
        <div class="container">
       
            <div class="news-list">
                <div class="item" v-for="item in newsList">
                    <ItemCard :news="item" @click="()=>router.push('/news/detail/'+item.id)"/>
                </div>
            </div>
            <div style="display: flex;justify-content: center;">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize" :total="pagination.total" @current-change="paginationChange" />
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, reactive,toRaw} from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import ItemCard from "@/components/newsCard.vue"
import Banner from "@/components/Banner.vue"
import { queryNewsList} from "@/api/index"
import {queryBannerImg} from "@/utils/index"
const store = useStore();
const router = useRouter()
const newsList = ref([])
const pagination = reactive({
    total:0,
    pageSize:9
})
const bannerImg=ref('')



onMounted(() => {
    getNewsList(1)
    bannerImg.value=queryBannerImg(4)
})


const getNewsList = (pageIndex) => {

    const params = {
        pageIndex,
        pageSize: pagination.pageSize
    }
    queryNewsList(params).then(({ code, data,totalResults }) => {
        if (code === 0) {
            newsList.value = data
            pagination.total=totalResults
        }
    })
}


const paginationChange = (value) => {
    getNewsList(value)
}


</script>
    
<style lang="scss" scoped>
.news {
    width: 100%;
    height: 100%;

    .container {
        padding: 24px 120px 58px 120px;

        .news-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {
                width: calc((100% - 32px) / 3);
                margin-right: 16px;
                margin-bottom: 40px;

                &:nth-of-type(3n+0) {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>