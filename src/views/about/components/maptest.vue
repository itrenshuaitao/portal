<template>
    <div style="padding: 66px 120px;">
        <div ref="chart" id="echarts" style="width: 100%;height:500px;"></div>
    </div>
</template>
   
<script setup>
import * as echarts from "echarts";   //引入echarts
import china from "@/assets/china.json";
import { queryNnetworkLists } from "@/api/index"
import { getSalesOption } from "./test.js"

import { onMounted, reactive, ref } from "vue";

const chart = ref();
// const researchBaseMap = {}




const init = async (name, networkMapObj) => {
    // 获取图标 初始化
    var myChart = echarts.init(document.getElementById("echarts"));

    /////////////
    const { chinaJson } = await getSalesOption()

    /////////////
    var geoGpsMap = {
        '1': [120.228518, 30.29953],
        '2': [121.454039, 31.245688],
    };

    var geoCoordMap = {
        '新疆': [86.61, 40.79],
        '西藏': [89.13, 30.66],
        '黑龙江': [128.34, 47.05],
        '吉林': [126.32, 43.38],
        '辽宁': [123.42, 41.29],
        '内蒙古': [112.17, 42.81],
        '北京': [116.40, 40.40],
        '宁夏': [106.27, 36.76],
        '山西': [111.95, 37.65],
        '河北': [115.21, 38.44],
        '天津': [117.04, 39.52],
        '青海': [97.07, 35.62],
        '甘肃': [103.82, 36.05],
        '山东': [118.01, 36.37],
        '陕西': [108.94, 34.46],
        '河南': [113.46, 34.25],
        '安徽': [117.28, 31.86],
        '江苏': [120.26, 32.54],
        '上海': [121.46, 31.28],
        '四川': [103.36, 30.65],
        '湖北': [112.29, 30.98],
        '浙江': [120.228518, 30.29953],
        '重庆': [107.51, 29.63],
        '湖南': [112.08, 27.79],
        '江西': [115.89, 27.97],
        '贵州': [106.91, 26.67],
        '福建': [118.31, 26.07],
        '云南': [101.71, 24.84],
        '台湾': [121.01, 23.54],
        '广西': [108.67, 23.68],
        '广东': [113.98, 22.82],
        '海南': [110.03, 19.33],
        '澳门': [113.54, 22.19],
        '香港': [114.17, 22.32],
    };

    var researchBaseMap = {
        ...networkMapObj,
        '上海': [121.454039, 31.245688],
    }
    // name: ['华南', '华中', '华北', '华东', '大西南'],

    var partitionData = {//地图数据
        '华东': [120.083441, 30.960728],
        '华北': [116.624749, 41.48417],
        '华中': [111.98863, 33.092129],
        '华南': [112.282987, 23.874974],
        '大西南': [102.201268, 32.470459],
    };


    var colors = [
        ["#1DE9B6", "#FFDB5C", "#FFDB5C", "#04B9FF", "#04B9FF"],
        ["#1DE9B6", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
        ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
        ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
    ];
    var colorIndex = 0;

    var year = ["杭州", "杭州", "杭州"];
    var mapData = [
        [],
        [],
        [],
        // [],
        // [],
        // [],
    ];

    /*柱子Y名称*/
    var categoryData = [];
    var barData = [];

    for (var key in geoCoordMap) {
        mapData[0].push({
            "year": '杭州',
            "name": key,
            "value": 1,
            "value1": 1,
        });
    }

    for (var key in researchBaseMap) {
        mapData[1].push({
            "year": '杭州',
            "name": key,
            "value": 1,
            "value1": 1,
        });
    }

    for (var key in partitionData) {
        mapData[2].push({
            "year": '杭州',
            "name": key,
            "value": 1,
            "value1": 1,
        });
    }



    echarts.registerMap('china', chinaJson);
    // echarts.registerMap('sales', chinaJson);
    var convertData = function (data, n) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = n === 0 ? geoCoordMap[data[i].name] : n === 1 ? researchBaseMap[data[i].name] : partitionData[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };



    var convertToLineData = function (data, gps, n) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var toCoord = n === 0 ? geoCoordMap[dataItem.name] : researchBaseMap[dataItem.name];
            var fromCoord = gps; //郑州
            //  var toCoord = geoGps[Math.random()*3]; 
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem.value
                }, {
                    coord: toCoord,
                }]);
            }
        }

        return res;
    };

    const optionXyMap01 = {
        timeline: {
            show: false,
            data: year,
            axisType: 'category',
            autoPlay: true,
            playInterval: 5000,
            left: '10%',
            right: '10%',
            bottom: '3%',
            width: '80%',
            //  height: null,
            label: {
                normal: {
                    textStyle: {
                        color: '#ddd'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            symbolSize: 10,
            lineStyle: {
                color: '#555'
            },
            checkpointStyle: {
                borderColor: '#777',
                borderWidth: 2
            },
            controlStyle: {
                showNextBtn: true,
                showPrevBtn: true,
                normal: {
                    color: '#666',
                    borderColor: '#666'
                },
                emphasis: {
                    color: '#aaa',
                    borderColor: '#aaa'
                }
            },

        },
        baseOption: {

            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut',
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'cubicInOut',
            grid: {
                right: '1%',
                top: '15%',
                bottom: '10%',
                width: '20%'
            },

            geo: {
                show: true,
                map: 'china',
                roam: true,
                zoom: 1.1,
                center: [113.83531246, 34.0267395887],
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
        },
        options: [
            // getSalesOption().option
        ]

    };

    for (var n = 0; n < year.length; n++) {
        optionXyMap01.options.push({
            backgroundColor: '#013954',
            title:
                [
                    {
                        text: n == 0 ? '业务覆盖面' : n == 1 ? '产研基地' : '销售服务网络',
                        // subtext: '   数据由整车物流部提供',
                        left: '35%',
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 25
                        }
                    },
                    // {
                    //     id: 'statistic',
                    //     text: year[n] + "数据统计情况",
                    //     left: '75%',
                    //     top: '8%',
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 25
                    //     }
                    // }
                ],
            series: [

                //地图
                {
                    type: 'map',
                    map: 'china',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#FFFFFF',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,

                },
                //地图点的动画效果
                {
                    //  name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(mapData[n].sort(function (a, b) {
                        return b.value - a.value;
                    }), n),
                    rippleEffect: { //涟漪特效
                        period: 4, //动画时间，值越小速度越快
                        brushType: 'stroke', //波纹绘制方式 stroke, fill
                        scale: n == 2 ? 8 : 4 //波纹圆环最大限制，值越大波纹越大
                    },
                    symbolSize: n == 2 ? 8 : 3,
                    showEffectOn: 'render',

                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: colors[colorIndex][n],
                            shadowBlur: 10,
                            shadowColor: colors[colorIndex][n]
                        }
                    },
                    zlevel: 1
                },
                //地图线的动画效果
                {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 3, //箭头指向速度，值越小速度越快
                        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'arrow', //箭头图标
                        symbolSize: 3, //图标大小
                    },
                    lineStyle: {
                        normal: {
                            color: colors[colorIndex][n],
                            width: 0.1, //尾迹线条宽度
                            opacity: 0.5, //尾迹线条透明度
                            curveness: .3 //尾迹线条曲直度
                        }
                    },
                    data: convertToLineData(mapData[n], geoGpsMap[n + 1], n)
                },
                //柱状图
                // {
                //     zlevel: 1.5,
                //     type: 'bar',
                //     symbol: 'none',
                //     itemStyle: {
                //         normal: {
                //             color: colors[colorIndex][n]
                //         }
                //     },
                //     data: barData[n]
                // }
            ]
        })
    }


    // optionXyMap01.options[0] = option






    // 把option设置给myChart实例
    myChart.setOption(optionXyMap01, true);
    ;
};



// 加载完就调用的方法 vue3生命周期
onMounted(() => {
    queryNnetworkLists().then(({ code, data }) => {
        let networkMapObj = {}
        data[0].netendList.map(item => {
            networkMapObj[item.endNetworkTerminalname] = item.endNetworkTerminalaxis.split(',')
        })
        init(china, networkMapObj);

    })

});
</script>
   
<style scoped></style>