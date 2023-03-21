
import china from "@/assets/china.json";
const chinaJson = JSON.parse(JSON.stringify(china))
export const getSalesOption = async () => {

    let mergeProvinces = function (chinaJson, names, properties) {//合并大区里省份的coordinates
        let features = chinaJson.features;
        let polygons = [];

        for (let i = 0; i < names.length; i++) {

            let polygonsCoordinates = [];
            for (let z = 0; z < names[i].length; z++) {
                for (let j = 0; j < features.length; j++) {
                    if (features[j].properties.name.includes(names[i][z])) {
                        // console.log(features[j].geometry.coordinates[0])
                        // if (features[j].geometry.coordinates[0].constructor == Array) {//合并coordinates
                        //     for (let l = 0; l < features[j].geometry.coordinates.length; l++) {
                        //         polygonsCoordinates.push(features[j].geometry.coordinates[l]);
                        //     }

                        // } else
                        if (features[j].geometry.coordinates.constructor == Array) {
                            for (let k = 0; k < features[j].geometry.coordinates.length; k++) {
                                for (let d = 0; d < features[j].geometry.coordinates[k].length; d++) {
                                    // for (let e = 0; e < features[j].geometry.coordinates[k][d].length; e++) {
                                    polygonsCoordinates.push(features[j].geometry.coordinates[k][d]);
                                    // }

                                }
                            }
                        }


                        break;
                    }
                }
            }
            polygons.push(polygonsCoordinates);


        }

        // 构建新的合并区域
        let newFeatures = [];

        for (let a = 0; a < names.length; a++) {
            let feature = {
                id: newFeatures.length.toString(),
                type: "FeatureCollection",
                geometry: {
                    type: "Polygon",
                    coordinates: polygons[a],
                },
                properties: {
                    name: properties.name[a] || "",
                    childNum: polygons[a].length
                },
                // temStyle: { normal: { areaColor: 'red', label: { show: false } } }
            };
            if (properties.cp[a]) {
                feature.properties.cp = properties.cp[a];
            }

            // 将新的合并区域添加到地图中
            newFeatures.push(feature);
        }



        chinaJson.features = newFeatures;

    };

    let params = {
        names: [//把各个大区的省份用二维数组分开

            ['广东', '广西', '海南', '福建', '台湾' ],//华南
            ['河南', '湖北', '湖南'],//华中
            ['黑龙江', '吉林', '辽宁', '内蒙古','北京', '天津', '山西','山东','河北'],//华北
            [ '江苏','浙江','上海','安徽','江西'],//华南
            ['重庆', '四川', '贵州', '云南', '青海','陕西','甘肃','宁夏','西藏','新疆'],//西南
   
        ],
        properties: {//自定义大区的名字，要和上面的大区省份一一对应




            name: ['华南', '华中', '华北', '华东', '大西南'],
            cp: [//经纬度可以自己随意定义
                [115.24, 37.04],
                [120.32, 44.50],
                [121.28, 30.13],
                [114.20, 30.32],
                [113.00, 24.08]
            ]
        }
    };


    // 如果时候五大区，您就修改上面的数据，不能山删掉，可以空着
   await mergeProvinces(chinaJson, params.names, params.properties);


//     var data = [//地图数据
//     {
//         "name": "华东",
//         "value": 3685,
//         "color": "#90ca88"
//     },
//     {
//         "name": "华北",
//         "value": 7342,
//         "color": "#f09b7a"
//     },
//     {
//         "name": "华中",
//         "value": 21416,
//         "color": "yellow"
//     },
//     {
//         "name": "华南",
//         "value": 25314,
//         "color": "#7ab8e2"
//     },
//     {
//         "name": "西南",
//         "value": 2500,
//         "color": "#f1bd4c"
//     },
//     {
//         "name": "西北",
//         "value": 10427,
//         "color": "#c1e2cf"
//     },
//     {
//         "name": "东北",
//         "value": 2440,
//         "color": "#edb365"
//     },
// ];

// var customSettings = [];
// data.forEach(function (item, index) {
//     customSettings.push({
//         name: item.name,
//         itemStyle: {
//             normal: {
//                 areaColor: item.color,
//                 color: item.color,
//             },
//         }
//     })
// })






    return {
        
        chinaJson
    }



    // setTimeout(function () {
    //     pRChart.dispatchAction({// 测试js设置某个模块高亮，被选中状态
    //         type: 'highlight',
    //         // 可选，系列 index，可以是一个数组指定多个系列
    //         // seriesIndex: 0,
    //         // 可选，系列名称，可以是一个数组指定多个系列
    //         // seriesName: string|Array,
    //         // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
    //         // dataIndex: number,
    //         // 可选，数据名称，在有 dataIndex 的时候忽略
    //         name: '东北区'
    //     });
    // }, 3000)

    // setTimeout(function () {
    //     console.log("22222");
    //     pRChart.dispatchAction({
    //         type: 'downplay',
    //         // 可选，系列 index，可以是一个数组指定多个系列
    //         // seriesIndex: 0,
    //         // 可选，系列名称，可以是一个数组指定多个系列
    //         // seriesName: string|Array,
    //         // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
    //         // dataIndex: number,
    //         // 可选，数据名称，在有 dataIndex 的时候忽略
    //         name: '东北区'
    //     });
    // }, 6000)
}
