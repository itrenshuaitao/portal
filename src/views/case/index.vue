<template>
    <div class="case">

        <Banner title="案例分享" subTitle="以机床监控为核心的数字化工厂解决方案" color="rgb(255, 255, 255)"
            imgSrc="https://easyv.assets.dtstack.com/homepage/common/assets/images/market-consultation/search_bg.jpg">
        </Banner>
        <div class="container">
            <div>
                <span class="label">
                    行业：
                </span>
                <span>
                    <el-button class="industry" round v-for="item in items">{{ item.label }}</el-button>
                </span>
            </div>
            <div class="case-list">
                <div class="item" v-for="item in 8">
                    <ItemCard />
                </div>
            </div>
        </div>
    </div>
    
</template>
    
<script setup>
import ItemCard from "@/components/caseCard.vue"
import Banner from "@/components/Banner.vue"
import { ref } from "vue"
const active = ref("1")
const items = ref([
    { type: '', label: '全部' },
    { type: '', label: '军工行业' },
    { type: '', label: '汽车行业' },
    { type: '', label: '模具行业' },
    { type: '', label: '其他行业' },

])


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
}</style>