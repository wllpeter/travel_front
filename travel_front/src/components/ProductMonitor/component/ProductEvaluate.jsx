/**
 * @description 旅游产品综合评价
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import {getOverAllMerit} from '../../../services/ProductMonitor/ProductData';
import {colorHex, getDataZoom, dateFormat} from '../../../utils/tools';
import echarts from 'echarts';

export default class ProductEvaluate extends Component {
    constructor(props) {
        super(props);
        let productType = this.props.productType;
        this.state = {
            productType: productType
        };
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.setState({
                productType: productType
            }, () => {
                this.getOverAllMerit();
            });
        }
    }

    componentDidMount() {
        this.getOverAllMerit();
    }

    getOverAllMerit() {
        getOverAllMerit({
            productType: this.state.productType
        }).then((res) => {
            this.print(this.handleData(res));
        });
    }

    // 处理数据
    handleData(res) {
        let xAxis = [];
        let avgscore = [];
        let compared = [];
        res.forEach((item) => {
            xAxis.unshift(item.year + '-' + dateFormat(item.month));
            avgscore.unshift(item.avgscore);
            compared.unshift(item.compared);
        });
        let dataZoom = getDataZoom({
            lengthMax: xAxis.length,
            showLength: 6
        });
        return {
            xAxis,
            avgscore,
            compared,
            dataZoom,
            zoomShow: xAxis.length > 6
        };
    }

    print(params) {
        let color = ['#00A9FF', '#32C889'];
        const fn = (val, unit) => {
            if (val === '' || val === null || val === '' || val === '-') {
                return '-';
            }
            if (unit) {
                return val + unit;
            }
            return val;
        };
        let option = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7 * sizeRatio,
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
                        p[0].marker + p[0].seriesName + '：' + fn(p[0].data, '分');
                    if (p[1]) {
                        tooltipText += '<br>' +
                            p[1].marker + p[1].seriesName + '：' + fn(p[1].data, '%');
                    }
                    return tooltipText;
                }
            },
            toolbox: {
                show: false
            },
            legend: {
                icon: 'circle',
                data: ['综合评价', '环比'],
                right: '10%',
                itemWidth: 8 * sizeRatio,
                textStyle: {
                    fontSize: 12 * sizeRatio,
                    color: '#F1F1F3'
                }
            },
            grid: {
                show: false,
                bottom: (params.zoomShow ? 70 : 60) * sizeRatio,
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
                            fontSize: 16 * sizeRatio
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
                        fontSize: 16 * sizeRatio
                    },
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16 * sizeRatio
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
                        fontSize: 16 * sizeRatio
                    },
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: 16 * sizeRatio
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
                    data: params.avgscore,
                    itemStyle: {
                        normal: {
                            color: color[0],
                            borderColor: colorHex(color[0], 0.27),
                            borderWidth: 12 * sizeRatio
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            fontSize: 12 * sizeRatio,
                            position: [20, 0],
                            color: '#ffffff',
                            formatter: '{c}分'
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
                            borderWidth: 12 * sizeRatio
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            fontSize: 12 * sizeRatio,
                            position: [20 * sizeRatio, 0],
                            color: '#ffffff',
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        };
        let evaluateMap = echarts.init(document.getElementById('evaluate-map'));

        evaluateMap.setOption(option);
    }

    render() {
        let {title} = this.props;
        return <PanelCard title={`${title}产品综合评价`}>
            <div id="evaluate-map" className="product-map">
            </div>
        </PanelCard>;
    }
}