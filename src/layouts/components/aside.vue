<template>
    <el-aside class="aside">
        <ul>
            <!-- <li>
                <el-icon><Service /></el-icon>
                <p>在线咨询</p>
            </li> -->
            <li>
                <el-icon size="20">
                    <ChatDotRound />
                </el-icon>
                <p>预约<br />体验</p>
            </li>
            <li>
                <el-icon size="20">
                    <PhoneFilled />
                </el-icon>
            </li>
            <li>
                <el-icon size="20">
                    <PictureFilled />
                </el-icon>
            </li>
        </ul>
        <el-button class="top" type="primary" circle icon="top" @click="handleToTop"></el-button>

    </el-aside>
</template>

<script setup>
const handleToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
}
</script>

<style lang='scss' scoped>
.aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    position: fixed;
    top: 50%;
    right: 10px;
    z-index: 900;
    transform: translateY(-50%);

    ul {
        padding: 8px 0;
        width: 56px;
        background: #FFFFFF;
        border-radius: 28px;


        li {
            font-size: 14px;
            margin: 8px;
            width: 40px;
            height: 40px;
            box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5), inset 0px -1px 4px 0px rgba(200, 232, 255, 0.41);
            border-radius: 28px;
            backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;

            &:first-child {
                height: 80px;
            }

            &:hover {
                background-color: #148FFA;
                color: #FFFFFF;
            }
        }
    }

    .top {
        margin-top: 24px;
        width: 40px;
        height: 40px;
    }


}
</style>