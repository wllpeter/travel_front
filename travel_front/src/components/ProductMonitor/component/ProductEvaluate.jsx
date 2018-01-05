/**
 * @description 旅游旅游产品综合评价
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class ProductEvaluate extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.print();
    }

    print() {
        let color = ['#00A9FF', '#32C889'];
        // 十六进制颜色转为RGB格式
        let colorHex = (color, opacity) => {
            let sColor = color.toLowerCase();
            // 十六进制颜色值的正则表达式
            let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 如果是16进制颜色
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    let sColorNew = '#';
                    for (let i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                // 处理六位的颜色值
                let sColorChange = [];
                for (let i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
                }
                if (opacity) {
                    return 'RGBA(' + sColorChange.join(',') + ',' + opacity + ')';
                }
                return 'RGB(' + sColorChange.join(',') + ')';
            }
            return sColor;
        };
        let option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                axisPointer: {
                    lineStyle: {
                        color: '#0785CB'
                    }
                },
                formatter: (p) => {
                    return p[0].axisValue + '<br>' +
                        p[0].marker + p[0].seriesName + '：' + p[0].data + '分' + '<br>' +
                        p[1].marker + p[1].seriesName + '：' + p[1].data + '%';
                }
            },
            toolbox: {
                show: false
            },
            legend: {
                icon: 'circle',
                data: ['综合评价', '环比'],
                right: '10%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                show: false,
                containLabel: false
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['7月', '8月', '9月', '10月', '11月', '12月'],
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#52687F'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '评价',
                    nameTextStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    },
                    min: 0,
                    max: 5,
                    interval: 1,
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16
                        },
                        formatter: (p) => {
                            if (p === 0) {
                                return 0;
                            }
                            return p + '分';
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#52687F'
                        }
                    }
                },
                {
                    type: 'value',
                    name: '环比',
                    nameTextStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    },
                    min: 0,
                    max: 30,
                    interval: 10,
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16
                        },
                        formatter: '{value} %'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#52687F'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '综合评价',
                    type: 'line',
                    data: [2.0, 4.9, 3.2, 3, 2, 4],
                    itemStyle: {
                        normal: {
                            color: color[0],
                            borderColor: colorHex(color[0], 0.27),
                            borderWidth: 12
                        }
                    },
                    label: {
                        emphasis: {
                            show: true,
                            fontSize: 16,
                            position: [20, 0],
                            color: '#ffffff',
                            formatter: (p) => {
                                if (p.seriesName === '综合评价') {
                                    return p.data + '分';
                                }
                                if (p.seriesName === '环比') {
                                    return p.data + '%';
                                }
                                return p.data;
                            }
                        }
                    }
                },
                {
                    name: '环比',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [20, 15, 19, 22, 17, 30],
                    itemStyle: {
                        normal: {
                            color: color[1],
                            borderColor: colorHex(color[1], 0.27),
                            borderWidth: 12
                        }
                    },
                    label: {
                        emphasis: {
                            show: true,
                            fontSize: 16,
                            position: [20, 0],
                            color: '#ffffff',
                            formatter: (p) => {
                                if (p.seriesName === '综合评价') {
                                    return p.data + '分';
                                }
                                if (p.seriesName === '环比') {
                                    return p.data + '%';
                                }
                                return p.data;
                            }
                        }
                    }
                }
            ]
        };
        let evaluateMap = echarts.init(document.getElementById('evaluate-map'));

        evaluateMap.setOption(option);
    }

    render() {
        return <div id="evaluate-map" className="product-map">
        </div>;
    }
}