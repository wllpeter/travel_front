/**
 * @description 产品价格走势图
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class ProductPrice extends Component {
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
                        p[0].marker + p[0].seriesName + '：' + p[0].data + '元' + '<br>' +
                        p[1].marker + p[1].seriesName + '：' + p[1].data + '%';
                }
            },
            toolbox: {
                show: false
            },
            legend: {
                icon: 'circle',
                data: ['平均价格', '环比'],
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
                    name: '价格',
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
                            return p + '元';
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
                    name: '平均价格',
                    type: 'line',
                    smooth: true,
                    data: [2.0, 4.9, 3.2, 3, 2, 4],
                    itemStyle: {
                        normal: {
                            color: color[0],
                            borderColor: colorHex(color[0], 0.27),
                            borderWidth: 12
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00a2f5' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#1F3A59' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    label: {
                        emphasis: {
                            show: true,
                            fontSize: 16,
                            position: [20, 0],
                            color: '#ffffff',
                            formatter: (p) => {
                                return p.data + '元';
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
                                return p.data + '%';
                            }
                        }
                    }
                }
            ]
        };
        let priceMap = echarts.init(document.getElementById('product-price'));
        priceMap.setOption(option);
    }

    render() {
        return <div id="product-price" className="product-down-map">
        </div>;
    }
}