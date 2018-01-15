/**
 * @description 产品价格走势图
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import {getPriceTrend} from '../../../services/ProductMonitor/ProductData';
import {colorHex, getDataZoom, dateFormat} from '../../../utils/tools';
import echarts from 'echarts';

export default class ProductPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: 1
        };

    }

    componentDidMount() {
        this.getPriceTrend();
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.setState({
                productType: productType
            }, () => {
                this.getPriceTrend();
            });
        }
    }

    getPriceTrend() {
        getPriceTrend({
            productType: this.state.productType
        }).then((res) => {
            this.print(this.handleData(res));
        });
    }

    // 处理数据
    handleData(res) {
        let xAxis = [];
        let avgPrice = [];
        let compared = [];
        res.forEach((item) => {
            xAxis.unshift(item.year + '-' + dateFormat(item.month));
            avgPrice.unshift(item.avgPrice);
            compared.unshift(item.compared);
        });
        let dataZoom = getDataZoom({
            lengthMax: xAxis.length,
            showLength: 6
        });
        return {
            xAxis,
            avgPrice,
            compared,
            dataZoom,
            zoomShow: xAxis.length > 6
        };
    }

    print(params) {
        let color = ['#00A9FF', '#32C889'];
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
                    let tooltipText = p[0].axisValue + '<br>' +
                        p[0].marker + p[0].seriesName + '：' + p[0].data + '元';
                    if (p[1]) {
                        tooltipText += '<br>' +
                            p[1].marker + p[1].seriesName + '：' + p[1].data + '%';
                    }
                    return tooltipText;
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
                bottom: params.zoomShow ? 70 : 60,
                containLabel: false
            },
            dataZoom: params.dataZoom,
            xAxis: [
                {
                    type: 'category',
                    data: params.xAxis,
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
                    data: params.avgPrice,
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
                            formatter: '{c}元'
                        }
                    }
                },
                {
                    name: '环比',
                    type: 'line',
                    yAxisIndex: 1,
                    data: params.compared,
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
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        };
        let priceMap = echarts.init(document.getElementById('product-price'));
        priceMap.setOption(option);
    }

    render() {
        let {title} = this.props;
        return <PanelCard title={`${title}产品价格走势`}>
            <div id="product-price" className="product-down-map">
            </div>
        </PanelCard>;
    }
}