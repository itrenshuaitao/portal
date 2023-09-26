<template>
    <div class="detail-wrapper">
        <div v-html="content.caseDetail" :class="{'mobile-case-detail-wrapper':_isMobile()}"></div>
    </div>
</template>

<script setup>
import { ref, onMounted,nextTick } from "vue"
import { useRoute } from 'vue-router'
import { queryCaseById } from "@/api/index"
import { _isMobile } from '@/utils/index'
const route = useRoute()
const content = ref('')
onMounted(() => {
    queryCaseById({ id: route.params.id }).then(({code, data}) => {

        if (code == 0) {

            content.value = data[0]
            if(_isMobile()){
                nextTick(() => {
                    let all = document.getElementsByClassName('mobile-case-detail-wrapper')[0]
                    let allImg = all.getElementsByTagName('img') 
                    for (let i = 0; i < allImg.length; i++) {
                        allImg[i].style.width = '100%'
                        // allImg[0].style.width = '100%'
                        // allImg[allImg.length-1].style.width = '100%'
                        // allImg[allImg.length-3].style.width = '50%'
                    }
                })
                
            }
        }
    })
    
})


</script>

<style lang='scss' scoped>

</style >
<style lang='scss'>
.mobile-case-detail-wrapper p span{
    font-size: 36px !important;
}
// .mobile-case-detail-wrapper{
//     img{
//         width: 300% !important;
//     }
//     img:last-child{
//         width: 100% !important;
//     }
// }

</style>