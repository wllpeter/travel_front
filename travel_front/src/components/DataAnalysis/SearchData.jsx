/**
 * @description 搜索大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import { Row, Col } from 'antd';
import AdCharts from '../../utils/adCharts';
import 'antd/lib/grid/style';

var geoCoordMap = {
    '海门':[121.15,31.89],
    '鄂尔多斯':[109.781327,39.608266],
    '招远':[120.38,37.35],
    '舟山':[122.207216,29.985295],
    '齐齐哈尔':[123.97,47.33],
    '盐城':[120.13,33.38],
    '赤峰':[118.87,42.28],
    '青岛':[120.33,36.07],
    '乳山':[121.52,36.89],
    '金昌':[102.188043,38.520089],
    '泉州':[118.58,24.93],
    '莱西':[120.53,36.86],
    '日照':[119.46,35.42],
    '胶南':[119.97,35.88],
    '南通':[121.05,32.08],
    '拉萨':[91.11,29.97],
    '云浮':[112.02,22.93],
    '梅州':[116.1,24.55],
    '文登':[122.05,37.2],
    '上海':[121.48,31.22],
    '攀枝花':[101.718637,26.582347],
    '威海':[122.1,37.5],
    '承德':[117.93,40.97],
    '厦门':[118.1,24.46],
    '汕尾':[115.375279,22.786211],
    '潮州':[116.63,23.68],
    '丹东':[124.37,40.13],
    '太仓':[121.1,31.45],
    '曲靖':[103.79,25.51],
    '烟台':[121.39,37.52],
    '福州':[119.3,26.08],
    '瓦房店':[121.979603,39.627114],
    '即墨':[120.45,36.38],
    '抚顺':[123.97,41.97],
    '玉溪':[102.52,24.35],
    '张家口':[114.87,40.82],
    '阳泉':[113.57,37.85],
    '莱州':[119.942327,37.177017],
    '湖州':[120.1,30.86],
    '汕头':[116.69,23.39],
    '昆山':[120.95,31.39],
    '宁波':[121.56,29.86],
    '湛江':[110.359377,21.270708],
    '揭阳':[116.35,23.55],
    '荣成':[122.41,37.16],
    '连云港':[119.16,34.59],
    '葫芦岛':[120.836932,40.711052],
    '常熟':[120.74,31.64],
    '东莞':[113.75,23.04],
    '河源':[114.68,23.73],
    '淮安':[119.15,33.5],
    '泰州':[119.9,32.49],
    '南宁':[108.33,22.84],
    '营口':[122.18,40.65],
    '惠州':[114.4,23.09],
    '江阴':[120.26,31.91],
    '蓬莱':[120.75,37.8],
    '韶关':[113.62,24.84],
    '嘉峪关':[98.289152,39.77313],
    '广州':[113.23,23.16],
    '延安':[109.47,36.6],
    '太原':[112.53,37.87],
    '清远':[113.01,23.7],
    '中山':[113.38,22.52],
    '昆明':[102.73,25.04],
    '寿光':[118.73,36.86],
    '盘锦':[122.070714,41.119997],
    '长治':[113.08,36.18],
    '深圳':[114.07,22.62],
    '珠海':[113.52,22.3],
    '宿迁':[118.3,33.96],
    '咸阳':[108.72,34.36],
    '铜川':[109.11,35.09],
    '平度':[119.97,36.77],
    '佛山':[113.11,23.05],
    '海口':[110.35,20.02],
    '江门':[113.06,22.61],
    '章丘':[117.53,36.72],
    '肇庆':[112.44,23.05],
    '大连':[121.62,38.92],
    '临汾':[111.5,36.08],
    '吴江':[120.63,31.16],
    '石嘴山':[106.39,39.04],
    '沈阳':[123.38,41.8],
    '苏州':[120.62,31.32],
    '茂名':[110.88,21.68],
    '嘉兴':[120.76,30.77],
    '长春':[125.35,43.88],
    '胶州':[120.03336,36.264622],
    '银川':[106.27,38.47],
    '张家港':[120.555821,31.875428],
    '三门峡':[111.19,34.76],
    '锦州':[121.15,41.13],
    '南昌':[115.89,28.68],
    '柳州':[109.4,24.33],
    '三亚':[109.511909,18.252847],
    '自贡':[104.778442,29.33903],
    '吉林':[126.57,43.87],
    '阳江':[111.95,21.85],
    '泸州':[105.39,28.91],
    '西宁':[101.74,36.56],
    '宜宾':[104.56,29.77],
    '呼和浩特':[111.65,40.82],
    '成都':[104.06,30.67],
    '大同':[113.3,40.12],
    '镇江':[119.44,32.2],
    '桂林':[110.28,25.29],
    '张家界':[110.479191,29.117096],
    '宜兴':[119.82,31.36],
    '北海':[109.12,21.49],
    '西安':[108.95,34.27],
    '金坛':[119.56,31.74],
    '东营':[118.49,37.46],
    '牡丹江':[129.58,44.6],
    '遵义':[106.9,27.7],
    '绍兴':[120.58,30.01],
    '扬州':[119.42,32.39],
    '常州':[119.95,31.79],
    '潍坊':[119.1,36.62],
    '重庆':[106.54,29.59],
    '台州':[121.420757,28.656386],
    '南京':[118.78,32.04],
    '滨州':[118.03,37.36],
    '贵阳':[106.71,26.57],
    '无锡':[120.29,31.59],
    '本溪':[123.73,41.3],
    '克拉玛依':[84.77,45.59],
    '渭南':[109.5,34.52],
    '马鞍山':[118.48,31.56],
    '宝鸡':[107.15,34.38],
    '焦作':[113.21,35.24],
    '句容':[119.16,31.95],
    '北京':[116.46,39.92],
    '徐州':[117.2,34.26],
    '衡水':[115.72,37.72],
    '包头':[110,40.58],
    '绵阳':[104.73,31.48],
    '乌鲁木齐':[87.68,43.77],
    '枣庄':[117.57,34.86],
    '杭州':[120.19,30.26],
    '淄博':[118.05,36.78],
    '鞍山':[122.85,41.12],
    '溧阳':[119.48,31.43],
    '库尔勒':[86.06,41.68],
    '安阳':[114.35,36.1],
    '开封':[114.35,34.79],
    '济南':[117,36.65],
    '德阳':[104.37,31.13],
    '温州':[120.65,28.01],
    '九江':[115.97,29.71],
    '邯郸':[114.47,36.6],
    '临安':[119.72,30.23],
    '兰州':[103.73,36.03],
    '沧州':[116.83,38.33],
    '临沂':[118.35,35.05],
    '南充':[106.110698,30.837793],
    '天津':[117.2,39.13],
    '富阳':[119.95,30.07],
    '泰安':[117.13,36.18],
    '诸暨':[120.23,29.71],
    '郑州':[113.65,34.76],
    '哈尔滨':[126.63,45.75],
    '聊城':[115.97,36.45],
    '芜湖':[118.38,31.33],
    '唐山':[118.02,39.63],
    '平顶山':[113.29,33.75],
    '邢台':[114.48,37.05],
    '德州':[116.29,37.45],
    '济宁':[116.59,35.38],
    '荆州':[112.239741,30.335165],
    '宜昌':[111.3,30.7],
    '义乌':[120.06,29.32],
    '丽水':[119.92,28.45],
    '洛阳':[112.44,34.7],
    '秦皇岛':[119.57,39.95],
    '株洲':[113.16,27.83],
    '石家庄':[114.48,38.03],
    '莱芜':[117.67,36.19],
    '常德':[111.69,29.05],
    '保定':[115.48,38.85],
    '湘潭':[112.91,27.87],
    '金华':[119.64,29.12],
    '岳阳':[113.09,29.37],
    '长沙':[113,28.21],
    '衢州':[118.88,28.97],
    '廊坊':[116.7,39.53],
    '菏泽':[115.480656,35.23375],
    '合肥':[117.27,31.86],
    '武汉':[114.31,30.52],
    '大庆':[125.03,46.58]
};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let mapNameType = 'sichuan';

        function randomData() {
            return Math.round(Math.random()*100);
        }

        // 全省旅游搜索热力图
        AdCharts.mapChart({
            chartId: 'visualMapContinuous',
            mapAddress: '/static/data/map/四川省.json',
            mapTypeName: mapNameType,
            visualMap: {
                min: 0,
                max: 500,
                right: 25,
                bottom: 45,
                orient: 'horizontal',
                itemWidth: 20,
                itemHeight: 250,
                text: ['高', '低'],
                calculable: true,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: 14
                },
                inRange: {
                    color: ['#2e70b8', '#00a6ff', '#02c4bc', '#35d77c', '#9bdb74', '#abdd73']
                }
            },
            seriesOption: [{
                name: '全省旅游搜索热力图',
                type: 'map',
                map: mapNameType,
                mapType: mapNameType,
                roam: true,
                zoom: 1.1,
                scaleLimit: {
                    min: 1,
                    max: 2.5
                },
                nameMap: {
                    '甘孜州': '甘孜藏族自治州',
                    '凉山州': '凉山彝族自治州',
                    '阿坝州': '阿坝藏族自治州'
                },
                left: '14%',
                top: 25,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: 14
                        }
                    }
                }
            }],
            series: [[
                {
                    name: '雅安市',
                    value: 300
                }, {
                    name: '凉山彝族自治州',
                    value: 400
                }, {
                    name: '甘孜藏族自治州',
                    value: 500,
                }, {
                    name: '阿坝藏族自治州',
                    value: 300,
                }, {
                    name: '绵阳市',
                    value: 200,
                }, {
                    name: '广元市',
                    value: 234,
                }, {
                    name: '巴中市',
                    value: 434,
                }, {
                    name: '达州市',
                    value: 324,
                }, {
                    name: '广安市',
                    value: 230,
                }, {
                    name: '南充市',
                    value: 459,
                }, {
                    name: '遂宁市',
                    value: 230,
                }, {
                    name: '资阳市',
                    value: 120,
                }, {
                    name: '德阳市',
                    value: 230,
                }, {
                    name: '成都市',
                    value: 500,
                }, {
                    name: '眉山市',
                    value: 230,
                }, {
                    name: '乐山市',
                    value: 430,
                }, {
                    name: '内江市',
                    value: 302,
                }, {
                    name: '宜宾市',
                    value: 89,
                }, {
                    name: '泸州市',
                    value: 320,
                }, {
                    name: '自贡市',
                    value: 430,
                }, {
                    name: '攀枝花市',
                    value: 309,
                }
            ]]
        });

        // 搜索人群年龄分布
        AdCharts.pieChart({
            chartId: 'searchPeopleAgePieChart',
            legend: ['18以下', '18-24', '25-34 ', '35-44 ', '45-54 ', '55-64 ', '65以上'],
            legendIcon: 'circle',
            legendOrient: 'horizontal',
            legendLeft: '65%',
            borderWidth: 10,
            itemGap: 20,
            borderColor: '#203a59',
            data: [
                {
                    name: '18以下',
                    value: 25
                },
                {
                    name: '18-24',
                    value: 25
                },
                {
                    name: '25-34 ',
                    value: 25
                },
                {
                    name: '35-44 ',
                    value: 25
                },
                {
                    name: '45-54 ',
                    value: 25
                },
                {
                    name: '55-64 ',
                    value: 25
                },
                {
                    name: '65以上',
                    value: 25
                }
            ]
        });

        // 全省旅游搜索热度趋势
        AdCharts.lineChart({
            chartId: 'provinceSearchHotLineChart',
            legend: ['旅游搜索热度趋势'],
            legendShow: false,
            xAxisData: ['10-23', '10-24', '10-25', '10-26', '10-27', '10-28', '10-29'],
            gradientColor: [[{offset: 0, color: 'rgba(0, 164, 250, 1)'}, {offset: 0.8, color: 'rgba(0, 164, 250, 0)'}]],
            lineStyleColor: ['#00a2f5'],
            smooth: true,
            stack: true,
            series: [[23, 32, 54, 84, 134, 90, 43]]
        });

        // 搜索关注热词云
        AdCharts.wordCloudChart({
            chartId: 'searchHotwordCloud',
            series: [[
                {
                    name: '生活资源',
                    value: '999'
                }, {
                    name: '供热管理',
                    value: '888'
                }, {
                    name: '供气质量',
                    value: '777'
                }, {
                    name: '生活用水管理',
                    value: '688'
                }, {
                    name: '一次供水问题',
                    value: '588'
                }, {
                    name: '交通运输',
                    value: '516'
                }, {
                    name: '城市交通',
                    value: '515'
                }, {
                    name: '环境保护',
                    value: '483'
                }, {
                    name: '房地产管理',
                    value: '462'
                }, {
                    name: '城乡建设',
                    value: '449'
                }, {
                    name: '社会保障与福利',
                    value: '429'
                }, {
                    name: '社会保障',
                    value: '407'
                }, {
                    name: '文体与教育管理',
                    value: '406'
                }, {
                    name: '供气质量',
                    value: '223'
                }, {
                    name: '供电管理',
                    value: '223'
                }, {
                    name: '燃气管理',
                    value: '152'
                }, {
                    name: '教育管理',
                    value: '152'
                }, {
                    name: '医疗纠纷',
                    value: '152'
                }
            ]]
        });

        // 搜索人群来源地
        AdCharts.mapChart({
            chartId: 'visualMapPiecewise',
            mapAddress: '/static/data/map/china.json',
            mapTypeName: 'china',
            geo: {
                show: true,
                roam: true,
                map: 'china',
                scaleLimit: [1, 2],
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#4b617a'
                    }
                }
            },
            seriesOption: [{
                name: '搜索人群来源地',
                type: 'scatter',
                coordinateSystem: 'geo',
                hoverAnimation: true,
                symbol: 'circle',
                symbolSize: function(value) {
                    return value;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }],
            seriesOption: [{
                name: '搜索人群来源地',
                type: 'scatter',
                coordinateSystem: 'geo',
                hoverAnimation: true,
                symbol: 'image://data:image/png;base64,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',
                symbolSize: function(value) {
                    return value[2];
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            }],
            series: [convertData([
                {
                    name: '北京',
                    value: randomData()
                }, {
                    name: '天津',
                    value: randomData()
                }, {
                    name: '上海',
                    value: randomData()
                }, {
                    name: '重庆',
                    value: randomData()
                }, {
                    name: '河北',
                    value: randomData()
                }, {
                    name: '河南',
                    value: randomData()
                }, {
                    name: '云南',
                    value: randomData()
                }, {
                    name: '辽宁',
                    value: randomData()
                }, {
                    name: '黑龙江',
                    value: randomData()
                }, {
                    name: '湖南',
                    value: randomData()
                }, {
                    name: '安徽',
                    value: randomData()
                }, {
                    name: '山东',
                    value: randomData()
                }, {
                    name: '新疆',
                    value: randomData()
                }, {
                    name: '江苏',
                    value: randomData()
                }, {
                    name: '浙江',
                    value: randomData()
                }, {
                    name: '江西',
                    value: randomData()
                }, {
                    name: '湖北',
                    value: randomData()
                }, {
                    name: '广西',
                    value: randomData()
                }, {
                    name: '甘肃',
                    value: randomData()
                }, {
                    name: '山西',
                    value: randomData()
                }, {
                    name: '内蒙古',
                    value: randomData()
                }, {
                    name: '陕西',
                    value: randomData()
                }, {
                    name: '吉林',
                    value: randomData()
                }, {
                    name: '福建',
                    value: randomData()
                }, {
                    name: '贵州',
                    value: randomData()
                }, {
                    name: '广东',
                    value: randomData()
                }, {
                    name: '青海',
                    value: randomData()
                }, {
                    name: '西藏',
                    value: randomData()
                }, {
                    name: '四川',
                    value: randomData()
                }, {
                    name: '宁夏',
                    value: randomData()
                }, {
                    name: '海南',
                    value: randomData()
                }, {
                    name: '台湾',
                    value: randomData()
                }, {
                    name: '香港',
                    value: randomData()
                }, {
                    name: '澳门',
                    value: randomData()
                }, {
                    name: '南海诸岛',
                    value: randomData()
                }
            ])]

        })
    }

    render() {
        return <div className="tourist-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 } >
                    <PanelCard title="全省旅游搜索热力图" zoomRequired={ false }>
                        <div id="visualMapContinuous" style={{ width: '100%', height: 600 }} className="br-line"></div>
                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="全省旅游搜索热度趋势" zoomRequired={ false }>
                        <div id="provinceSearchHotLineChart" style={{ width: '100%', height: 600 }}></div>
                    </PanelCard>
                </Col>
            </Row>

            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索关注热词云" className="bg-grey">
                        <div id="searchHotwordCloud" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索人群来源地" className="bg-grey">
                        <div id="visualMapPiecewise" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索景点偏好地" className="bg-grey">
                        <table className="mt-table mt-table-noborder w-95 mt-50">
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>景区</th>
                                    <th>占比</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>九寨沟</td>
                                    <td>30%</td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>峨眉山</td>
                                    <td>28%</td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>青城山-都江堰</td>
                                    <td>23%</td>
                                </tr>
                                <tr>
                                    <td>04</td>
                                    <td>西岭雪山</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>05</td>
                                    <td>稻城亚山</td>
                                    <td>18%</td>
                                </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索人群年龄分布" className="bg-grey">
                        <div id="searchPeopleAgePieChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}