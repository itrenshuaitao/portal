<template>
    <div class="case" :class="{'mobile-case':_isMobile()}">
        <Banner :imgSrc="bannerImg">
        </Banner>
        <div class="container">
            <div>
                <span class="label" v-if="!_isMobile()" >
                    行业：
                </span>
                <span v-if="_isMobile()">
                    <el-button  class="label" type="text">行业：</el-button>
                </span>
                <span>
                    <el-button :class="`industry ${active == 'all' && 'active'}`" round
                        @click="() => handleIndustryClick('all')">全部</el-button><br v-if="_isMobile()"/>

                    <el-button round v-for="item in solutionList" @click="() => handleIndustryClick(item.id)"
                        :class="`industry ${active == item.id && 'active'}`">{{ item.industryName }}</el-button>
                </span>
            </div>
            <div class="case-list">
                <div class="item" v-for="item in caseList">
                    <ItemCard :case="item" />
                </div>
            </div>
            <div style="display: flex;justify-content: center;" class="_pagination">
                <el-pagination background layout="prev, pager, next" :page-size="pagination.pageSize" prev-text="上一页"
                    next-text="下一页" :total="pagination.total" @current-change="paginationChange" />
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
import { _isMobile } from '@/utils/index'


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
    _isMobile() ?  pagination.pageSize = 8 : pagination.pageSize = 9
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
            solutionList.value = solutionList.value.filter(item =>{
                return item.industryName != '模具'
            })
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
        position: relative;
        z-index: 1;

        .label {
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
        }

        .industry {
            margin-bottom: 10px;
            font-family: AliPuHui55;
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

        ._pagination {
            height: 32px;
            line-height: 32px;

            :deep(.el-pagination.is-background .btn-prev),
            :deep(.el-pagination.is-background .btn-next),
            :deep(.el-pager li) {
                height: 32px;
                line-height: 40px;
                font-size: 14px !important;
                color: rgb(62, 73, 84);
                background: rgb(255, 255, 255);
                border: none;
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(21.75px);
                padding: 6px 16px;

                &.is-active {
                    box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5), inset 0px -1px 4px rgba(0, 75, 146, 0.65);
                    backdrop-filter: blur(21.75px);
                }
            }
        }

    }
}
.mobile-case {

    width: 100%;
    height: 100%;

    .container {
        padding: 24px 80px 58px 80px;
        position: relative;
        z-index: 1;

        // .label {
        //     font-size: 36px;
        //     font-weight: 500;
        //     line-height: 80px;
        //     margin-bottom: 40px;
        // }

        .industry {
            margin-bottom: 40px;
            font-family: AliPuHui55;
            font-size: 44px;
            font-weight: 400;
            height: 80px;
            line-height: 80px;
            letter-spacing: 0px;
            box-shadow: 0px -1px 4px 0 rgba(0, 0, 0, 0.15) inset, 0px 2px 5px 0px rgba(220, 220, 220, 0.5);
            backdrop-filter: blur(21.75px);
            margin-right: 20px;

            &.active {
                color: rgb(0, 75, 146);
            }
        }
        .label {
            font-size: 44px;
            font-weight: 500;
            margin-bottom: 40px;
            font-family: AliPuHui55;
            height: 80px;
            line-height: 80px;
            color: #000;
        }

        .case-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;

            .item {
                width: calc((100% - 48px) / 2);
                margin-right: 24px;
                margin-bottom: 24px;

                &:nth-of-type(3n+0) {
                    margin-right: 0;
                }
            }
        }

        ._pagination {
            height: 82px;
            line-height: 82px;
            margin-top: 30px;

            :deep(.el-pagination.is-background .btn-prev),
            :deep(.el-pagination.is-background .btn-next),
            :deep(.el-pager li) {
                width:8vw;
                height: 72px;
                line-height: 56px;
                font-size: 44px !important;
                color: rgb(62, 73, 84);
                background: rgb(255, 255, 255);
                border: none;
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
                inset 0px -1px 4px rgba(0, 0, 0, 0.15);
                backdrop-filter: blur(21.75px);
                padding: 6px 16px;

                &.is-active {
                box-shadow: 0px 2px 5px rgba(220, 220, 220, 0.5),
                inset 0px -1px 4px rgba(0, 75, 146, 0.65);
                backdrop-filter: blur(21.75px);
                }
            }
        }

    }
}
</style>