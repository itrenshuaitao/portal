<template>
    <div class="news-center">
        <el-carousel ref="refCarousel" indicator-position="none" arrow="never" :autoplay="false">
            <el-carousel-item v-for="item in props.newsList" :key="item">
                <div class="text">
                    <p class="news-title">
                        {{ item.newsName }}
                    </p>
                    <p class="news-desc">
                        {{ item.newsTitle }} </p>
                    <p class="time">
                        {{ item.newsTime }}
                    </p>
                    <div class="to-desc" @click="proxy.$router.push('./news/detail/' + item.id)">查看详情</div>
                </div>
                <div>
                    <img :src="item.newsImg" />
                </div>
            </el-carousel-item>

        </el-carousel>
        <div class="left pointer"  @click="proxy.$refs.refCarousel.prev()"></div>
        <div class="right pointer"  @click="proxy.$refs.refCarousel.next()"></div>
        <div class="more-news" @click="toNews">
            查看更多新闻
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"
const props = defineProps(['newsList'])
const { proxy } = getCurrentInstance()
const toNews = () => {
    proxy.$router.push("./news")
}

</script>

<style lang='scss' scoped>
.news-center {
    padding: 0 160px;
    position: relative;


    .left {
        width: 40px;
        height: 40px;
        background-image: url('@/assets/img/left.png');
        background-size: 40px 40px;
        background-repeat: no-repeat;
        position: absolute;
        top: 213px;
        left: 80px;
    }

    .right {
        width: 40px;
        height: 40px;
        background-image: url('@/assets/img/right.png');
        background-size: 40px 40px;
        background-repeat: no-repeat;
        position: absolute;
        top: 213px;
        right: 80px;
    }

    &:deep(.el-carousel__container) {
        height: 466px;

        .el-carousel__item {
            display: flex;
            justify-content: space-between;

            &>div {
                width: 43%;
                height: 100%;
                border-radius: 4px;
                overflow: hidden;

                img {
                    width: 99%;
                    height: 100%;
                }
            }

            .text {
                // height: 466px;
                background: linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);
                border-radius: 4px;
                padding: 60px 32px 20px 32px;
                box-sizing: border-box;

                .news-title {
                    font-size: 26px;
                    font-weight: 400;
                    color: #3E4954;
                    line-height: 44px;
                    margin-bottom: 24px;
                }

                .news-desc {
                    font-size: 14px;
                    color: #6C7B8B;
                    line-height: 17px;
                    margin-bottom: 30px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    /* 超出部分省略号 */
                    word-break: break-all;
                    /* break-all(允许在单词内换行。) */
                    display: -webkit-box;
                    /* 对象作为伸缩盒子模型显示 */
                    -webkit-box-orient: vertical;
                    /* 设置或检索伸缩盒对象的子元素的排列方式 */
                    -webkit-line-clamp: 7;
                    /* 显示的行数 */
                    line-clamp: 7;
                }

                .time {
                    font-size: 20px;
                    color: #333333;
                    line-height: 23px;
                    margin-bottom: 18px;
                }

                .to-desc {
                    width: 112px;
                    height: 40px;
                    text-align: center;
                    background: rgba(255, 255, 255, 0.5);
                    box-shadow: inset 0px -1px 4px 0px rgba(0, 75, 146, 0.65);
                    border-radius: 20px;
                    backdrop-filter: blur(8px);
                    font-size: 16px;
                    color: #004B92;
                    line-height: 38px;
                    cursor: pointer;
                }
            }
        }
    }

    .more-news {
        margin: 46px auto;
        width: 191px;
        height: 40px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #6C7B8B;
        font-size: 24px;
        font-weight: 400;
        color: #6C7B8B;
        line-height: 40px;
        cursor: pointer;

    }
}
</style>