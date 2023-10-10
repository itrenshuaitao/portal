<template>
    <div class="news-center" :class="{'mobile-news-center':_isMobile()}">
        <el-carousel ref="refCarousel" indicator-position="none" arrow="never" :autoplay="false">
            <el-carousel-item v-for="item in props.newsList" :key="item">
                <div class="text">
                    <p class="news-title">
                        {{ item.newsName }}
                    </p>
                    <p class="news-desc" v-html="item.detail">
                         </p>
                    <p class="time">
                        {{ item.newsTime.replace(/-/g,"/") }}
                    </p>
                    <div class="to-desc" @click="proxy.$router.push('./news/detail/' + item.id)">查看详情</div>
                </div>
                <div class="imgBox">
                    <!-- <img :src="item.newsImg" alt="" fit="contain"/> -->
                    <img :src="item.newsImg" alt="" style="object-fit: contain;">

                </div>
            </el-carousel-item>

        </el-carousel>
        <div class="left pointer" @click="proxy.$refs.refCarousel.prev()"></div>
        <div class="right pointer" @click="proxy.$refs.refCarousel.next()"></div>

        <div class="_more pointer" @click="toNews">
            <span style="margin-right: 10px;">
                查看更多新闻
            </span>
            <el-icon style="transform: rotate(270deg);">
                <DArrowLeft />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"
import { _isMobile } from '@/utils/index'
const props = defineProps(['newsList'])
const { proxy } = getCurrentInstance()
const toNews = () => {
    proxy.$router.push("./news")
}

</script>

<style lang='scss' scoped>
.news-center {
    padding: 0 132px;
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
        height:435px;

        .el-carousel__item {
            display: flex;
            // justify-content: space-between;

            &>div {
                height: 100%;
                border-radius: 4px;
                overflow: hidden;

                img {
                    width: 704px;
                    height: 100%;
                }
            }

            .text {
                width: 452px;
                position: relative;
                margin-right: 16px;
                // height: 466px;
                background: linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);
                border-radius: 4px;
                padding: 50px 32px 20px 32px;
                box-sizing: border-box;

                .news-title {
                    font-size: 24px;
                    font-weight: 400;
                    color: #3E4954;
                    line-height: 36px;
                    margin-bottom: 24px;
                }

                .news-desc {
                    opacity: 0.85;
                    color: rgb(108, 123, 139);
                    font-family: AliPuHui55;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 20px;
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
                    color: rgb(108, 123, 139);
                    font-family: AliPuHui55;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 20px;
                    margin-bottom: 18px;
                    text-align: right;
                }

                .to-desc {
                    width: 112px;
                    height: 40px;
                    text-align: center;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.5);
                    box-shadow: inset 0px -1px 4px 0px rgba(0, 75, 146, 0.65);
                    border-radius: 20px;
                    backdrop-filter: blur(8px);
                    font-size: 16px;
                    color: #004B92;
                    line-height: 38px;
                    cursor: pointer;
                    position: absolute;
                    bottom: 23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }

    ._more {
        margin: 46px auto;
        color: rgb(108, 123, 139);
        font-family: AliPuHui55;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        width: 140px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.mobile-news-center{
    position: relative;
    .left {
        width: 60px;
        height: 60px;
        background-image: url('@/assets/img/left.png');
        background-size: 60px 60px;
        background-repeat: no-repeat;
        position: absolute;
        top: 213px;
        left: 40px;
    }

    .right {
        width: 60px;
        height: 60px;
        background-image: url('@/assets/img/right.png');
        background-size: 60px 60px;
        background-repeat: no-repeat;
        position: absolute;
        top: 213px;
        right: 40px;
    }
    &:deep(.el-carousel__container) {
        height:435px;

        .el-carousel__item {
            display: flex;
            // justify-content: space-between;

            &>div {
                height: 100%;
                border-radius: 4px;
                overflow: hidden;

                img {
                    width: 704px;
                    height: 100%;
                }
            }

            .text {
                width: 66%;
                position: relative;
                margin-right: 16px;
                background: linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);
                border-radius: 4px;
                padding: 10px 12px 20px 32px;
                box-sizing: border-box;

                .news-title {
                    font-size: 22px;
                    font-weight: 400;
                    color: #3E4954;
                    line-height: 36px;
                    margin-bottom: 24px;
                }

                .news-desc {
                    opacity: 0.85;
                    color: rgb(108, 123, 139);
                    font-family: AliPuHui55;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 40px;
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
                    -webkit-line-clamp: 3;
                    /* 显示的行数 */
                    line-clamp: 3;
                }

                .time {
                    color: rgb(108, 123, 139);
                    font-family: AliPuHui55;
                    font-size: 28px;
                    font-weight: 500;
                    line-height: 20px;
                    margin-bottom: 18px;
                    text-align: right;
                }

                .to-desc {
                    width: 34%;
                    height: 80px;
                    text-align: center;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.5);
                    box-shadow: inset 0px -1px 4px 0px rgba(0, 75, 146, 0.65);
                    border-radius: 20px;
                    backdrop-filter: blur(8px);
                    font-size: 32px;
                    color: #004B92;
                    line-height: 80px;
                    cursor: pointer;
                    position: absolute;
                    bottom: 23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            .imgBox{
                width: 34%;
                img{
                    width: 100%;
                }
            }
            
        }
    }
    ._more{
        margin: 46px auto;
        color: rgb(108, 123, 139);
        font-family: AliPuHui55;
        font-size: 28px;
        font-weight: 400;
        line-height: 20px;
        width: 100%;
        height: 36px;
    }
}
</style>