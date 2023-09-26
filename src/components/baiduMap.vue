<template>
    <div id="container" :style="{ height: mapHeight }">
    </div>
</template>
<script setup name="BaiduMap">
import { nextTick, ref, onMounted, toRaw } from "vue";
import { _isMobile } from '@/utils/index'
const props = defineProps(['mapList'])
const mapList = toRaw(props.mapList)


const mapHeight = ref('70vh')
onMounted(() => {
    if( _isMobile()){
        mapHeight.value = '20vh' 
    }
    initMap()
})

var labelStyle = {
    color: '#fff',
    borderRadius: '5px',
    borderColor: '#ccc',
    background: 'linear-gradient(114.70deg, rgba(25,108,255,1.00) 0%,rgba(0,84,167,1.00) 100%)',
    boxShadow: 'inset 0px -1px 4px rgba(200, 232, 255, 0.41)',
    backdropFilter: 'blur(21.75px)',
    padding: '3px',
    fontSize: '12px',
    height: '20px',
    lineHeight: '20px',
    fontFamily: '微软雅黑'
}
// console.log(mapList)
const initMap = () => {
    var map = new BMapGL.Map('container');
    map.centerAndZoom(new BMapGL.Point(119.879921, 30.611771), 7);
    map.enableScrollWheelZoom(true);
    let i = 0;
    while (i < mapList.length) {
        let marker = new BMapGL.Marker(new BMapGL.Point(mapList[i].mapAxis[0], mapList[i].mapAxis[1]));
        let label = new BMapGL.Label(mapList[i].name, {
            offset: new BMapGL.Size(-100, -25)
        })
        label.setStyle(labelStyle);
        marker.setLabel(label)
        map.addOverlay(marker);
        i++
    }
    // // 创建点标记
    // //上海
    // var marker1 = new BMapGL.Marker(new BMapGL.Point(121.428438, 31.033779));
    // var label1 = new BMapGL.Label('上海产研基地', {
    //     offset: new BMapGL.Size(-100, -25)
    // })
    // label1.setStyle(labelStyle);
    // marker1.setLabel(label1)
    // // 杭州
    // var marker2 = new BMapGL.Marker(new BMapGL.Point(120.228481, 30.299542));
    // var label2 = new BMapGL.Label('杭州产研基地', {
    //     offset: new BMapGL.Size(-100, -25)
    // })
    // label2.setStyle(labelStyle);
    // marker2.setLabel(label2)
    // // 无锡
    // var marker3 = new BMapGL.Marker(new BMapGL.Point(120.37191, 31.546136));
    // var label3 = new BMapGL.Label('无锡产研基地', {
    //     offset: new BMapGL.Size(-100, -25)
    // })
    // label3.setStyle(labelStyle);
    // marker3.setLabel(label3)
    // // 长春
    // var marker4 = new BMapGL.Marker(new BMapGL.Point());
    // var label4 = new BMapGL.Label('长春分公司', {
    //     offset: new BMapGL.Size(-100, -25)
    // })
    // label4.setStyle(labelStyle);
    // marker4.setLabel(label4)
    // // 在地图上添加点标记
    // map.addOverlay(marker1);
    // map.addOverlay(marker2);
    // map.addOverlay(marker3);
    // map.addOverlay(marker4);

}

</script>
<style>
#allmap {
    height: 100%;
    overflow: hidden;
}
</style>
  
  
  