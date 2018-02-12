/**
 * @description 旅游发展指数雷达图
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import {getIndexRadarData} from '../../../services/DevelopmentIndex/development';
import {RADAR_NAME} from '../../../constants/developmentIndex/radar';
import {INDEX_NAME} from '../../../constants/developmentIndex/developmentIndex';
import echarts from 'echarts';
import {getHeaderOptions} from '../../../utils/tools';

export default class DevelopmentIndexRadar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: '2017',
            month: '01'
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.indexRadar;
        this.getHeaderOptions(times);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                timeSelectRequired: true,
                clickBack: (year, month) => {
                    this.setState({
                        year: year,
                        month: month
                    }, () => {
                        this.getIndexRadarData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getIndexRadarData();
        });
    }

    // 获取雷达图数据
    getIndexRadarData() {
        getIndexRadarData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            this.handleData(res);
        });
    }

    // 处理数据
    handleData(res) {
        let colors = ['#B6DC74', '#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let indicatorKeys = Object.keys(RADAR_NAME);
        let legend = [];
        let data = res.map((item, index) => {
            legend.push(item.area);
            return {
                value: indicatorKeys.map(key => {
                    return item[key];
                }),
                name: item.area,
                lineStyle: {
                    normal: {
                        color: colors[INDEX_NAME[item.area]]
                    }
                }
            };
        });
        let getMax = (i) => {
            let max = 0;
            data.forEach((item) => {
                if (max < item.value[i] * 1) {
                    max = item.value[i] * 1;
                }
            });
            return max;
        };
        let index = 0;
        let indicator = indicatorKeys.map(key => {
            return {name: RADAR_NAME[key], max: getMax(index++)};
        });
        this.print({indicator, data, legend});
    }

    print(params) {
        let option = {
            title: {
                text: ''
            },
            legend: {
                data: params.legend,
                show: false
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
                    indicator: params.indicator,
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
                        fontSize: 16 * sizeRatio
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
                            lineStyle: {
                                width: 3
                            }
                        }
                    },
                    data: params.data
                }
            ]
        };
        let radarMap = echarts.init(document.getElementById('dev-index-radar'));

        radarMap.setOption(option);

        this.props.getRadarMap(radarMap);
    }

    render() {
        let {panelProps} = this.state;
        return <PanelCard title="指数雷达图" {...panelProps}>
            <div id="dev-index-radar" className="dev-index-map">
            </div>
        </PanelCard>;
    }
}