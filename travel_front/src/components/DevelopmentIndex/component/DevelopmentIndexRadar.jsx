/**
 * @description 旅游发展指数雷达图
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class DevelopmentIndexRadar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print();
        });
    }

    print() {
        // 制造假数据
        let color = ['#B6DC74', '#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let option = {
            title: {
                text: ''
            },
            legend: {
                data: []
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                }
            },
            radar: [
                {
                    indicator: [
                        {text: '创新度'},
                        {text: '美誉度'},
                        {text: '劳动投入'},
                        {text: '经济规模'},
                        {text: '舒适度'}
                    ],
                    center: ['50%', '50%'],
                    radius: '65%',
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#FFFFFF'
                        },
                        fontSize: 16
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['#1F3A59', '#1F3A59', '#1F3A59', '#1F3A59'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    itemStyle: {
                        emphasis: {
                            // color: 各异,
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: [
                        {
                            value: [100, 100, 100, 100, 100],
                            name: '全省',
                            lineStyle: {
                                normal: {
                                    color: color[0]
                                }
                            }
                        },
                        {
                            value: [90, 90, 95, 87, 93],
                            name: '成都平原经济区',
                            lineStyle: {
                                normal: {
                                    color: color[1]
                                }
                            }
                        },
                        {
                            value: [95, 80, 75, 79, 85],
                            name: '川东北经济区',
                            lineStyle: {
                                normal: {
                                    color: color[2]
                                }
                            }
                        },
                        {
                            value: [70, 60, 80, 65, 74],
                            name: '攀西经济区',
                            lineStyle: {
                                normal: {
                                    color: color[3]
                                }
                            }
                        },
                        {
                            value: [82, 40, 68, 83, 68],
                            name: '川西北经济区',
                            lineStyle: {
                                normal: {
                                    color: color[4]
                                }
                            }
                        },
                        {
                            value: [65, 74, 63, 53, 77],
                            name: '川南经济区',
                            lineStyle: {
                                normal: {
                                    color: color[5]
                                }
                            }
                        }
                    ]
                }
            ]
        };
        let radarMap = echarts.init(document.getElementById('dev-index-radar'));

        radarMap.setOption(option);
    }

    render() {
        return <div id="dev-index-radar" className="dev-index-map">
        </div>;
    }
}