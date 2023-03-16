
import china from "@/assets/china.json";
const chinaJson = JSON.parse(JSON.stringify(china))
export const getSalesOption = () => {
   
var mergeProvinces = function(chinaJson, names, properties) {
	var features = chinaJson.features;
	var polygons = [];
	// 将指定省的polygon保存下来，并将省的数据从地图中删除
	for(var i = 0, iLen = names.length; i < iLen; i++) {
		for(var j = 0, jLen = features.length; j < jLen; j++) {
			if(features[j].properties.name.includes(names[i])) {
				polygons = polygons.concat(features[j].geometry.coordinates);
				features.splice(j, 1);
				break;
			}
		}
	}
	// 构建新的合并区域
	var feature = {
		type: "Feature",
		id: "" + features.length,
		properties: {
			name: properties.name || ""
		},
		geometry: {
			type: "Polygon",
			coordinates: polygons
		}
	};
	if(properties.cp) {
		feature.properties.cp = properties.cp;
	}
 
	// 将新的合并区域添加到地图中
	features.push(feature);
};

    var params = {
        names: [//把各个大区的省份用二维数组分开
            ['北京', '天津', '河北', '山西', '山东', "河南"],
            ["黑龙江", "吉林", "辽宁", '内蒙古'],
            ['江苏', '安徽', '浙江', '福建', '上海', '台湾'],
            [],
            ['广东', '广西', '湖南', '湖北', '江西', '海南', '香港', '澳门'],
            ['重庆', '四川', '云南', '西藏', '贵州'],
            ['陕西', '甘肃', '青海', '宁夏', '新疆']
        ],
        properties: {//自定义大区的名字，要和上面的大区省份一一对应
            name: ['华北区', '东北区', '华东区', '', '中南区', '西南区', '西北区'],
            cp: [//经纬度可以自己随意定义
                [115.24, 37.04],
                [120.32, 44.50],
                [121.28, 30.13],
                [114.20, 30.32],
                [113.00, 24.08],
                [104.04, 29.39],
                [96.49, 37.03]
            ]
        }
    };
    // 如果时候五大区，您就修改上面的数据，不能山删掉，可以空着
    mergeProvinces(chinaJson, params.names, params.properties);

    console.log('11111', JSON.stringify(chinaJson))

    var data = [//地图数据
        {
            "name": "东北区",
            "value": 3685,
            "color": "#90ca88"
        },
        {
            "name": "华北区",
            "value": 7342,
            "color": "#f09b7a"
        },
        {
            "name": "华南",
            "value": 21416,
            "color": "yellow"
        },
        {
            "name": "华东区",
            "value": 25314,
            "color": "#7ab8e2"
        },
        {
            "name": "中南区",
            "value": 2500,
            "color": "#f1bd4c"
        },
        {
            "name": "西南区",
            "value": 10427,
            "color": "#c1e2cf"
        },
        {
            "name": "西北区",
            "value": 2440,
            "color": "#edb365"
        },
        {
            "name": "南海诸岛",
            "value": 2440,
            "color": "#f1bd4c"
        }
    ];

    var customSettings = [];
    data.forEach(function (item, index) {
        customSettings.push({
            name: item.name,
            itemStyle: {
                normal: {
                    areaColor: item.color,
                    color: item.color,
                },
            }
        })
    })

  const       option = {
    tooltip: {
        show: false,// 是否显示提示
        formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
        }//数据格式化
    },
    geo: {
        map: 'china',
        zoom: 1,//视角缩放比例
        roam: true, 
        center: [108.5525, 34.3227],
        label: {
            normal: {
                show: true,
                color: 'rgba(0,0,0,0.7)',// 大区文本颜色
                fontSize: '10',
            }
        },
        itemStyle: {

        },
        regions: customSettings   // 设置大区单独的样式。
    },
    series: [
        {
            name: '',
            type: 'map',
            geoIndex: 0,
            zlevel: 1,
            data: data
        }
    ]
};


    return {
        option,
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
