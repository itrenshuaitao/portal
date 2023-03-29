<template>
    <div class="case">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="container">
            <div>
                <span class="label">
                    行业：
                </span>
                <span>
                    <el-button :class="`industry ${active == 'all' && 'active'}`" round
                        @click="() => handleIndustryClick('all')">全部</el-button>

                    <el-button round v-for="item in solutionList" @click="() => handleIndustryClick(item.id)"
                        :class="`industry ${active == item.id && 'active'}`">{{ item.industryName }}</el-button>
                </span>
            </div>
            <div class="case-list">
                <div class="item" v-for="item in caseList">
                    <ItemCard :case="item" />
                </div>
            </div>
            <div style="display: flex;justify-content: center;" class="pagination">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize" prev-text="上一页" next-text="下一页"
                    :total="pagination.total" @current-change="paginationChange" />
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, reactive } from "vue"
import { useRoute } from 'vue-router';

import ItemCard from "@/components/caseCard.vue"
import Banner from "@/components/Banner.vue"
import { queryCaseList, queryIndustryCaseList, queryIndustryList } from "@/api/index"
import { queryBannerImg } from "@/utils/index"


const route = useRoute()

const active = ref("all")
const solutionList = ref([])
const caseList = ref([])
const caseListAll = ref([])
const pagination = reactive({
    total: 0,
    pageSize: 9
})
const bannerImg = ref('')



onMounted(() => {
    getSolutionList()
    if (route.query.solutionId) {
        handleIndustryClick(route.query.solutionId)
    } else {
        getAllCaseList(1)
    }

    bannerImg.value = queryBannerImg(3)

})
const getSolutionList = () => {

    const params = {
        pageIndex: 1,
        pageSize: 1000,
        sort: 1

    }
    queryIndustryList(params).then(({ code, data }) => {
        if (code === 0) {
            solutionList.value = data
        }
    })
}

const getAllCaseList = (pageIndex) => {
    const params = {
        pageIndex,
        pageSize: pagination.pageSize,
        sort: 1

    }
    queryCaseList(params).then(({ code, data, totalResults }) => {
        if (code === 0) {
            caseList.value = data
            pagination.total = totalResults
        }
    })
}
const getCaseList = (caseIndustryId) => {
    queryIndustryCaseList({ caseIndustryId }).then(({ code, data }) => {
        if (code === 0) {

            caseListAll.value = data
            caseList.value = data.slice(0, 9)
            pagination.total = data.length
        }
    })
}
const handleIndustryClick = (id) => {
    active.value = id
    if (id === 'all') {
        getAllCaseList(1)
    } else {
        getCaseList(id)
    }
}
const paginationChange = (value) => {
    if (active.value == 'all') {
        getAllCaseList(value)
    } else {
        caseList.value = caseListAll.value.slice((value - 1) * 9, value * 9)
    }
}


</script>
    
<style lang="scss" scoped>
.case {
    width: 100%;
    height: 100%;

    .container {
        padding: 24px 120px 58px 120px;

        .label {
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
        }

        .industry {
            margin-bottom: 10px;
            font-family: Alibaba PuHuiTi;
            font-size: 14px;
            font-weight: 400;
            height: 32px;
            line-height: 32px;
            letter-spacing: 0px;
            box-shadow: 0px -1px 4px 0 rgba(0, 0, 0, 0.15) inset, 0px 2px 5px 0px rgba(220, 220, 220, 0.5); 
            backdrop-filter: blur(21.75px);

            &.active {
                // background-color: #ecf5ff;
                color: rgb(0, 75, 146);
            }
        }

        .case-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {
                width: calc((100% - 48px) / 3);
                margin-right: 24px;
                margin-bottom: 24px;

                &:nth-of-type(3n+0) {
                    margin-right: 0;
                }
            }
        }
        .pagination{
            height: 32px;
            line-height: 32px;
            :deep(.el-pagination.is-background .btn-prev),:deep(.el-pagination.is-background .btn-next),:deep(.el-pager li){
                height: 32px;
                line-height: 40px;
                font-size: 14px !important;
                color: rgb(62, 73, 84);
                box-shadow: 0px -1px 4px 0 rgba(0, 0, 0, 0.15) inset, 0px 2px 5px 0px rgba(220, 220, 220, 0.5); 
                padding: 9px 16px;
            }
        }
        
    }
}
</style>