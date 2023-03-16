<template>
    <div style="padding: 66px 120px;">
        <div ref="chart" id="echarts" style="width: 100%;height:500px;"></div>
    </div>
</template>
   
<script setup>
import * as echarts from "echarts";   //引入echarts
import china from "@/assets/china.json";
import { getSalesOption } from "./test.js"

import { onMounted, reactive, ref } from "vue";

const chart = ref();





const init = async (name) => {
    // 获取图标 初始化
    var myChart = echarts.init(document.getElementById("echarts"));

    /////////////
    const { option, chinaJson } = await getSalesOption()

    /////////////
    var geoGpsMap = {
        '1': [120.228518, 30.29953],
        '2': [120.228518, 30.29953],
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
        '无锡': [120.296448, 31.548798],
        '西安': [108.96285, 34.341785],
        '长春': [125.332618, 43.917827],
        '成都': [104.081656, 30.696074],
        '杭州': [120.228518, 30.29953],


    };

    var d1 = {
        '江苏': 10041,
        '黑龙江': 4093,
        '内蒙古': 1157,
        '吉林': 4903,
        '北京市': 2667,
        '辽宁': 8331,
        '河北': 23727,
        '天津': 681,
        '山西': 5352,
        '陕西': 38,
        '甘肃': 77,
        '宁夏': 65,
        '青海': 10,
        '新疆': 193,
        '四川': 309,
        '重庆': 77,
        '山东': 21666,
        '河南': 15717,
        '安徽': 15671,
        '湖北': 3714,
        // '浙江': 3141,
        '福建': 955,
        '江西': 4978,
        '湖南': 778,
        '贵州': 33,
        '云南': 149,
        '广东': 1124,
        '广西': 125,
        '海南': 7,
        '上海': 2155,

    };

    var d2 = {
        "江苏": 0,
        '黑龙江': 0,
        '内蒙古': 0,
        "吉林": 0,
        '北京市': 0,
        "辽宁": 0,
        "河北": 0,
        "天津": 0,
        "山西": 0,
        "陕西": 0,
        "甘肃": 0,
        "宁夏": 0,
        "青海": 0,
        "新疆": 0,
        "四川": 0,
        "重庆": 0,
        "山东": 0,
        "河南": 0,
        "安徽": 0,
        "湖北": 0,
        "浙江": 0,
        "福建": 0,
        "江西": 0,
        "湖南": 0,
        "贵州": 0,
        "云南": 0,
        "广东": 0,
        "广西": 0,
        '海南': 0,
        '上海': 0,

    };

    var d3 = {
        '江苏': 11788,
        '黑龙江': 1944,
        '内蒙古': 2954,
        '吉林': 3482,
        '北京市': 1808,
        '辽宁': 5488,
        '河北': 27035,
        '天津': 2270,
        '山西': 13623,
        '陕西': 4221,
        '甘肃': 754,
        '宁夏': 1783,
        '青海': 91,
        '新疆': 1907,
        '四川': 4905,
        '重庆': 1420,
        '山东': 39781,
        '河南': 16154,
        '安徽': 7914,
        '湖北': 6802,
        '浙江': 5812,
        '福建': 3345,
        '江西': 4996,
        '湖南': 5627,
        '贵州': 1504,
        '云南': 2725,
        '广东': 6339,
        '广西': 1009,
        '海南': 0,
        '上海': 1988,



    };

    var d4 = {
        "江苏": 0,
        '黑龙江': 0,
        '内蒙古': 0,
        "吉林": 0,
        '北京市': 0,
        "辽宁": 0,
        "河北": 0,
        "天津": 0,
        "山西": 0,
        "陕西": 0,
        "甘肃": 0,
        "宁夏": 0,
        "青海": 0,
        "新疆": 0,
        "四川": 0,
        "重庆": 0,
        "山东": 0,
        "河南": 0,
        "安徽": 0,
        "湖北": 0,
        "浙江": 0,
        "福建": 0,
        "江西": 0,
        "湖南": 0,
        "贵州": 0,
        "云南": 0,
        "广东": 0,
        "广西": 0,
        '海南': 0,
        '上海': 0,
    };

    var d5 = {
        '江苏': 159,
        '黑龙江': 5,
        '内蒙古': 54,
        '吉林': 10,
        '北京市': 0,
        '辽宁': 0,
        '河北': 1679,
        '天津': 1,
        '山西': 2698,
        '陕西': 1744,
        '甘肃': 362,
        '宁夏': 429,
        '青海': 122,
        '新疆': 731,
        '四川': 3925,
        '重庆': 1480,
        '山东': 79,
        '河南': 1017,
        '安徽': 208,
        '湖北': 1209,
        '浙江': 1418,
        '福建': 1237,
        '江西': 1004,
        '湖南': 1511,
        '贵州': 345,
        '云南': 1429,
        '广东': 2242,
        '广西': 2271,
        '海南': 59,
        '上海': 8,



    };

    var d6 = {
        "江苏": 0,
        '黑龙江': 0,
        '内蒙古': 0,
        "吉林": 0,
        '北京市': 0,
        "辽宁": 0,
        "河北": 0,
        "天津": 0,
        "山西": 0,
        "陕西": 0,
        "甘肃": 0,
        "宁夏": 0,
        "青海": 0,
        "新疆": 0,
        "四川": 0,
        "重庆": 0,
        "山东": 0,
        "河南": 0,
        "安徽": 0,
        "湖北": 0,
        "浙江": 0,
        "福建": 0,
        "江西": 0,
        "湖南": 0,
        "贵州": 0,
        "云南": 0,
        "广东": 0,
        "广西": 0,
        '海南': 0,
        '上海': 0,
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
        // [],
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
        // mapData[1].push({
        //     "year": '长春',
        //     "name": key,
        //     "value": d1[key] / 100,
        //     "value1": d2[key] / 100,
        // });
        // mapData[2].push({
        //     "year": '青岛',
        //     "name": key,
        //     "value": d3[key] / 100,
        //     "value1": d3[key] / 100,
        // });

    }

    for (var key in researchBaseMap) {
        mapData[1].push({
            "year": '杭州',
            "name": key,
            "value": 1,
            "value1": 1,
        });
    }



    echarts.registerMap('china', china);
    var convertData = function (data, n) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = n === 0 ? geoCoordMap[data[i].name] : researchBaseMap[data[i].name];
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
                zoom: 1.5,
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
        if (n == 0 || n == 1) {
            optionXyMap01.options.push({
                backgroundColor: '#013954',
                title:


                    [
                        {
                            text: n == 0 ? '业务覆盖面' : '产研基地',
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
                    //未知作用
                    // {
                    //     //文字和标志
                    //     name: 'light',
                    //     type: 'scatter',
                    //     coordinateSystem: 'geo',
                    //     data: convertData(mapData[n], n),
                    //     symbol: 'circle',
                    //     symbolSize: 1,
                    //     label: {
                    //         normal: {
                    //             formatter: '{b}',
                    //             position: 'right',
                    //             show: true
                    //         },
                    //         emphasis: {
                    //             show: true
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: 'rgb(255,255,255)'// colors[colorIndex][n]
                    //         }
                    //     }
                    // },
                    //地图？
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
                        // data: mapData[n]
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
                            scale: 4 //波纹圆环最大限制，值越大波纹越大
                        },
                        symbolSize: 3,
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
    }


    // optionXyMap01.options[0] = option




    console.log(optionXyMap01)

    // 把option设置给myChart实例
    myChart.setOption(optionXyMap01, true);


};



// 加载完就调用的方法 vue3生命周期
onMounted(() => {
    init(china);
});
</script>
   
<style scoped></style>