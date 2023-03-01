<template>
    <div class="main-container">
        <div class="tab">
            <el-button :type="plain" link :class="active == 'products' && 'active'"
                @click="() => handleTabClick('products')">产品概览</el-button>
            <el-button :type="plain" link class="news" :class="active == 'news' && 'active'"
                @click="() => handleTabClick('news')">新闻中心</el-button>
            <el-button :type="plain" link :class="active == 'partners' && 'active'" @click="() => handleTabClick('partners')">合作伙伴</el-button>
        </div>
        <div class="title title-products">产品概览</div>

        <div class="products-main">
            <div class="products">
                <img :class="activeProducts == 0 && 'active'" src="@/assets/img/test1.jpg">
                <img :class="activeProducts == 1 && 'active'" src="@/assets/img/test2.jpg">
                <img :class="activeProducts == 2 && 'active'" src="@/assets/img/test3.webp">
                <img :class="activeProducts == 3 && 'active'" src="@/assets/img/test1.jpg">
                <img :class="activeProducts == 4 && 'active'" src="@/assets/img/test2.jpg">
            </div>
            <ul class="slide">
                <li>
                    <div>
                        <h2>电子行业</h2>
                        <P>电子行业的MES系统需求主要集中在收集关键数据，及时反馈异常，防错防呆，一次做对，提升生产过程的品质稳定性，质量事故的责任界定，实现人机料法环的全面管控。</P>
                        <div class="to-detail">

                            <router-link to="/">查看详情</router-link>

                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h2>电子行业</h2>
                        <P>电子行业的MES系统需求主要集中在收集关键数据，及时反馈异常，防错防呆，一次做对，提升生产过程的品质稳定性，质量事故的责任界定，实现人机料法环的全面管控。</P>
                        <div class="to-detail">

                            <router-link to="/">查看详情</router-link>

                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h2>电子行业</h2>
                        <P>电子行业的MES系统需求主要集中在收集关键数据，及时反馈异常，防错防呆，一次做对，提升生产过程的品质稳定性，质量事故的责任界定，实现人机料法环的全面管控。</P>
                        <div class="to-detail">

                            <router-link to="/">查看详情</router-link>

                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h2>电子行业</h2>
                        <P>电子行业的MES系统需求主要集中在收集关键数据，及时反馈异常，防错防呆，一次做对，提升生产过程的品质稳定性，质量事故的责任界定，实现人机料法环的全面管控。</P>
                        <div class="to-detail">

                            <router-link to="/">查看详情</router-link>

                        </div>
                    </div>
                </li>
                <li>
                    <div>
                        <h2>电子行业</h2>
                        <P>电子行业的MES系统需求主要集中在收集关键数据，及时反馈异常，防错防呆，一次做对，提升生产过程的品质稳定性，质量事故的责任界定，实现人机料法环的全面管控。</P>
                        <div class="to-detail">

                            <router-link to="/">查看详情</router-link>

                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 核心数据 -->
        <CoreData />
        <div class="title title-news">新闻中心</div>
        <NewsCenter />
        <div class="title title-partners">合作伙伴</div>
        <Partners/>

    </div>
</template>

<script setup>
import CoreData from './CoreData.vue';
import NewsCenter from './NewsCenter.vue';
import Partners from './Partners.vue';

import { ref, onMounted, computed, watch, toRaw } from "vue"
const active = ref("products")
const activeProducts = ref(0)

onMounted(() => {
    sildeAddEvent()
})

const handleTabClick = (type) => {
    active.value = type
    let toHeight = document.querySelector(`.title-${type}`).offsetTop

    window.scrollTo({
        top: toHeight - 90,
        behavior: "smooth"
    });
}
const sildeAddEvent = () => {
    document.getElementsByClassName('slide')[0].addEventListener("mouseover", handleMouseover, false)
}

const handleMouseover = (e) => {
    const ul = document.getElementsByClassName('slide')[0];
    const arr = Array.from(ul.children);
    const index = arr.indexOf(e.target);
    if (index !== -1 && activeProducts.value !== index) {
        activeProducts.value = index
    }
}
</script>

<style lang='scss' scoped>
.main-container {
    background-color: #fff;

    .tab {
        height: 60px;
        background: #F9F9F9;
        border: 1px solid #E5E5E5;
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
            margin: 20px 0;
        }

        .news {
            margin: 20px;
        }
    }

    .title {
        height: 56px;
        font-size: 40px;
        color: #3E4954;
        line-height: 47px;
        text-align: center;
        margin: 40px 0;
    }

    .products-main {
        position: relative;



        .products {

            position: relative;

            img {
                display: none;
                opacity: 0;
                width: 100%;
                height: 80vh;
                transition: all 2s;

                &.active {
                    display: block;
                    opacity: 1;

                }



            }
        }
    }

    .slide {
        position: absolute;
        top: 0;
        height: 100%;
        overflow: hidden;


        li {
            overflow: hidden;
            position: relative;
            height: 100%;
            display: inline-block;
            width: 20%;

            &:hover {
                div {
                    top: 0%;
                }

                background-image: linear-gradient(to bottom, transparent, #0168e0);


            }

            div {
                position: relative;
                top: 45%;
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
                    margin: 0 16% 26% 16%;
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
                    margin-top: 120px;
                }
            }
        }
    }

}
</style>