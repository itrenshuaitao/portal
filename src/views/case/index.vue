<template>
    <div class="case">
        <Banner 
            :imgSrc="bannerImg">
        </Banner>
        <div class="container">
            <div>
                <span class="label">
                    行业：
                </span>
                <span>
                    <el-button :class="`industry ${active=='all'&&'active'}`" round @click="()=>handleIndustryClick('all')">全部</el-button>

                    <el-button   round v-for="item in solutionList" @click="()=>handleIndustryClick(item.id)" :class="`industry ${active==item.id&&'active'}`">{{ item.industryName }}</el-button>
                </span>
            </div>
            <div class="case-list">
                <div class="item" v-for="item in caseList">
                    <ItemCard :case="item"/>
                </div>
            </div>
            <div style="display: flex;justify-content: center;">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize" :total="pagination.total" @current-change="paginationChange" />
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { ref, onMounted, reactive} from "vue"

import ItemCard from "@/components/caseCard.vue"
import Banner from "@/components/Banner.vue"
import { queryCaseList, queryIndustryCaseList, queryIndustryList } from "@/api/index"
import {queryBannerImg} from "@/utils/index"


const active = ref("all")
const solutionList = ref([])
const caseList = ref([])
const caseListAll = ref([])
const pagination = reactive({
    total:0,
    pageSize:9
})
const bannerImg=ref('')


const items = ref([
    { type: '', label: '全部' },
    { type: '', label: '军工行业' },
    { type: '', label: '汽车行业' },
    { type: '', label: '模具行业' },
    { type: '', label: '其他行业' },

])

onMounted(() => {
    getSolutionList()
    getAllCaseList(1)
    bannerImg.value=queryBannerImg(3)

})
const getSolutionList = () => {

    const params = {
        pageIndex: 1,
        pageSize: 1000
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
        pageSize: pagination.pageSize
    }
    queryCaseList(params).then(({ code, data,totalResults }) => {
        if (code === 0) {
            caseList.value = data
            pagination.total=totalResults
        }
    })
}
const getCaseList = (caseIndustryId ) => {
    queryIndustryCaseList({ caseIndustryId }).then(({ code, data }) => {
        if (code === 0) {
            caseListAll.value = data
            caseList.value =data.slice(0,9)
            paginationTotal.value=data.length
        }
    })
}
const handleIndustryClick = (id) => {
    active.value=id
    if(id==='all'){
        getAllCaseList(1)
    }else{
        getCaseList(id)
    }
}
const paginationChange = (value) => {
    if(active.value=='all'){
        getAllCaseList(value)
    }else{
        caseList.value =caseListAll.value.slice((value-1)*9,value*9)
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
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: 0px;
            &.active{
                background-color:#ecf5ff;
                color:#409eff;
            }
        }

        .case-list {
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