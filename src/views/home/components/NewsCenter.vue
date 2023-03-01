<template>
    <div class="news-center">
        <el-carousel indicator-position="none" :autoplay="false">
            <el-carousel-item v-for="item in 3" :key="item">
                <div class="text">
                    <p class="news-title">
                        {{ item }}用科技让复杂的制造更简单 友机技术 助力
                    </p>
                    <p class="news-desc">
                        此次MES项目正是优宝爱驾审时度势、认真研究、慎重作出的一项重大决定，希望借助华磊迅拓在制造行业23年的实施成功经验，帮助优宝爱驾将已上线的信息化系统连接起来，实现流程规范化管理，数据可视化管控，打开生产黑箱，实现数据协同一体化，从而达到降本增效，成就优宝爱驾数字化发展新格局。

                        会议要求，全体员工统一思想，明确目标，抱着积极的态度拥抱数字化变革，高度协同、全力以赴，确保项目早上线、早见效，最终推动优宝爱驾质量变革、效率变革和生产方式变革。
                    </p>
                    <p class="time">
                        2013/01/17
                    </p>
                    <div class="to-desc">查看详情</div>
                </div>
                <div>
                    <img src="@/assets/img/test1.jpg" />
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="more-news" @click="toNews">
            查看更多新闻
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance()
const toNews = () => {
    proxy.$router.push("./news")
}

</script>

<style lang='scss' scoped>
.news-center {
    padding: 0 160px;

    &:deep(.el-carousel__container) {
        height: 466px;

        .el-carousel__item {
            display: flex;
            justify-content: space-between;

            &>div {
                width: 43%;
                height: 100%;

                img {
                    width: 99%;
                    height: 100%;
                }
            }

            .text {
                background: linear-gradient(180deg, #FAFBFD 0%, #F2F3F5 100%);
                border-radius: 4px;
                padding: 60px 32px 20px 32px;

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