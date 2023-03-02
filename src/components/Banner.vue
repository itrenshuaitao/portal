<template>
      <div class="banner">
            <img :src="imgSrc" />
            <div class="text" :style="`color: ${color};`">
                <p>{{title}}</p>
                <p>{{subTitle}}
                </p>
            </div>
        </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "rgb(62, 73, 84)"
    },
    imgSrc: {
      type: String,
      default: "http://www.ujoin-tech.com/uploadfile/upfiles/202005211958595ec66d0395c69.png"
    }
  }
};
</script>

<style lang="scss" scoped>
    .banner {
        position: relative;

        img {
            display: block;
            width: 100%;
            height: 342px;
        }

        .text {
            position: absolute;
            top: 0;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            :nth-child(1) {
                font-size: 58px;
                font-weight: 600;
                line-height: 60.75px;
                margin-bottom: 20px;
            }

            :nth-child(2) {
                opacity: 0.85;
                font-size: 23px;
                font-weight: 600;
                line-height: 24px;
                text-align: center;
                text-transform: uppercase;
            }
        }
    }
</style>