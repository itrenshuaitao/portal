<template>
    <div class="main-container">
        <div class="tab"
            v-if="productsList[0]?.productsShow === 0 || newsList[0]?.newsType === 0 || partnerList[0] && partnerList[0][0]?.partnerType === 0">
            <el-button v-if="productsList[0]?.productsShow === 0" :type="plain" link
                :class="active == 'products' && 'active'" @click="() => handleTabClick('products')">产品概览</el-button>
            <el-button v-if="newsList[0]?.newsType === 0" :type="plain" link class="news"
                :class="active == 'news' && 'active'" @click="() => handleTabClick('news')">新闻中心</el-button>
            <el-button v-if="partnerList[0] && partnerList[0][0]?.partnerType === 0" :type="plain" link
                :class="active == 'partners' && 'active'" @click="() => handleTabClick('partners')">合作伙伴</el-button>
        </div>
        <template v-if="productsList[0]?.productsShow === 0">
            <div class="page-title title-products">
                <span data-desc="product summary"></span>
                产品概览
            </div>

            <div class="products-main">
                <div class="products">
                    <img v-for="(item, index) in productsList" :class="activeProducts == index && 'active'"
                        :src="item.productsImg">

                </div>
                <ul class="products-slide">
                    <li v-for="(item, index) in productsList" @mouseover="activeProducts = index">
                        <div>
                            <h2>{{ item.productsName }}</h2>
                            <P>{{ item.productsSubtitle }}</P>
                            <div class="to-detail" @click="router.push(`/products/detail/${item.id}`)">
                                查看详情
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </template>

        <!-- 核心数据 -->
        <CoreData v-if="coreDataList[0]?.coredataType === 0" :coreDataList="coreDataList" />
        <template v-if="newsList[0]?.newsType === 0">
            <div class="page-title title-news">
                <span data-desc="press center"></span>
                新闻中心
            </div>
            <NewsCenter :newsList="newsList" />
        </template>
        <template v-if="partnerList[0] && partnerList[0][0]?.partnerType === 0">
            <div class="page-title title-partners">
                <span data-desc="partner"></span>
                合作伙伴
            </div>
            <Partners :partnerList="partnerList" />
        </template>


    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch, nextTick } from "vue"
import { useRouter } from "vue-router"
import CoreData from './CoreData.vue';
import NewsCenter from './NewsCenter.vue';
import Partners from './Partners.vue';
import { getHomeProductsList, getHomeCoreDataList, getHomeNewsList, getHomePartnerList } from "@/api/index"
import { handleArraySort } from "@/utils/index"

const router = useRouter()
const active = ref("products")
const activeProducts = ref(0)
const productsList = ref([])
const coreDataList = ref([])
const newsList = ref([])
const partnerList = ref([])

onMounted(() => {
    getProductsList()
    getCoreDataList()
    getNewsList()
    getPartnerList()

})

watch(productsList, async (newList, oldList) => {
    if (newList.length) {
        // await nextTick(() => sildeAddEvent())
    }
})

const getPartnerList = () => {
    const params = {
        pageIndex: 1,
        pageSize: 1000,
        sort: 1
    }
    getHomePartnerList(params).then(({ code, data }) => {
        if (code === 0) {
            let len = data.length;
            // let n = 10; //每行显示10个
            let n = data.length / 3
            // let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1);
            let lineNum = len % n === 0 ? len / n : Math.floor((len / n));
            let res = [];
            for (let i = 0; i < lineNum; i++) {
                let temp = data.slice(i * n, i * n + n);
                res.push(JSON.parse(JSON.stringify(temp)));
            }

            partnerList.value = res;
            console.log(partnerList.value);

        }
    })
}

const getNewsList = () => {
    getHomeNewsList({ newsPlaces: 0 }).then(({ code, data }) => {
        if (code === 0) {
            let list = handleArraySort(data, 'newsTopTime', 'newsTime')
            list.map(item => {
                let test = item.newsDetail
                test = test.replace(/(\n)/g, "");
                test = test.replace(/(\t)/g, "");
                test = test.replace(/(\r)/g, "");
                test = test.replace(/<\/?[^>]*>/g, "");
                test = test.replace(/\s*/g, "");
                item.detail = test.slice(0,300)
            })
            newsList.value = list.slice(0, 3)

        }
    })
}


const getCoreDataList = () => {
    const params = {
        pageIndex: 1,
        pageSize: 100,
        sort: 1
    }
    getHomeCoreDataList(params).then(({ code, data }) => {
        if (code === 0) {
            coreDataList.value = data

        }
    })
}

const getProductsList = () => {
    getHomeProductsList({ productsPlaces: 0 }).then(({ code, data }) => {
        if (code === 0) {
            let list = handleArraySort(data, 'productsTopTime', 'productsTime')
            productsList.value = list.slice(0, 5)

        }
    })
}

const handleTabClick = (type) => {
    active.value = type
    let toHeight = document.querySelector(`.title-${type}`).offsetTop

    window.scrollTo({
        top: toHeight - 90,
        behavior: "smooth"
    });
}
const sildeAddEvent = () => {

    document.getElementsByClassName('products-slide')[0]?.addEventListener("mouseover", handleMouseover, true)
}

const handleMouseover = (e) => {

    console.log(e.target)
    const ul = document.getElementsByClassName('products-slide')[0];
    const arr = Array.from(ul.children);
    const index = arr.indexOf(e.target);
    console.log(e.target.nodeName)
    if (index !== -1 && activeProducts.value !== index && e.target.nodeName === 'LI') {
        activeProducts.value = index
    }
}
</script>

<style lang='scss' scoped>
.main-container {
    background-color: #fff;

    .tab {
        height: 60px;
        background: rgba(0, 75, 146, 0.05);
        padding: 0 120px;
        font-size: 14px;
        color: #3E4954;
        line-height: 17px;

        .active {
            font-size: 16px;
            color: #0054A7;
            line-height: 18px;
        }

        .el-button {
            font-weight: 600;
            font-family: AliPuHui55 !important;
            margin: 20px 0;
        }

        .news {
            margin: 20px;
        }
    }



    .products-main {
        position: relative;



        .products {

            position: relative;
            height: 80vh;

            img {
                display: block;
                position: absolute;
                visibility: hidden;
                opacity: 0;
                width: 100%;
                height: 80vh;
                transition: all 2s;

                &.active {
                    visibility: visible;
                    opacity: 1;

                }



            }
        }
    }

    .products-slide {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;


        li {
            overflow: hidden;
            position: relative;
            height: 100%;
            display: inline-block;
            width: 20%;

            &:hover {
                div {
                    top: 25%;
                }

                background-image: linear-gradient(to bottom, transparent, #0168e0);


            }

            div {
                position: relative;
                top: 55%;
                color: #fff;
                text-align: center;
                transition: all .3s;



                h2 {
                    font-size: 22px;
                    font-weight: bold;
                    margin-top: 50%;
                    margin-bottom: 20%;
                }

                p {
                    margin: 0 16% 12% 16%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 1.5;
                    /* 超出部分省略号 */
                    word-break: break-all;
                    /* break-all(允许在单词内换行。) */
                    display: -webkit-box;
                    /* 对象作为伸缩盒子模型显示 */
                    -webkit-box-orient: vertical;
                    /* 设置或检索伸缩盒对象的子元素的排列方式 */
                    -webkit-line-clamp: 2;
                    /* 显示的行数 */

                }

                .to-detail {
                    display: inline-block;
                    padding: 0 60px;
                    line-height: 55px;
                    background-color: #ffffff;
                    -webkit-border-radius: 28px;
                    border-radius: 28px;
                    color: #46409f;
                    margin-top: 90px;
                }
            }
        }
    }







}
</style>