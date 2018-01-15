/**
 * @description 全省旅游消费情况
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import ToggleButtonGroup from '../../../commonComponent/ToggleButtonGroup';
import {getProvinceCustomerData} from '../../../../services/ConsumptionData/consumptionData';
import {dateFormat} from '../../../../utils/tools';
import AdCharts from '../../../../utils/adCharts';

let customerData = null;

export default class ComfortDegree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnShow: false
        };
    }

    componentDidMount() {
        this.getProvinceCustomerData();
    }

    print(params) {
        AdCharts.multiYaxisTypeChart({
            chartId: 'provinceTouristConsumption',
            legend: ['消费', '同比'],
            legendIcon: 'circle',
            xAxisData: params.xAxisData,
            lengthMax: params.xAxisData.length,
            colors: ['#00a9ff', '#32c889'],
            barWidth: 15,
            yAxis: [
                {
                    type: 'value',
                    name: '消费(万元)',
                    position: 'left',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontSize: 14
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: 14
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#51687f',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    type: 'value',
                    name: '同比',
                    position: 'right',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontSize: 14
                    },
                    axisLabel: {
                        formatter: '{value}%',
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: 14
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#51687f',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    yAxisIndex: 0,
                    formatter: '{c}万',
                    data: params.data[0]
                },
                {
                    type: 'line',
                    yAxisIndex: 1,
                    formatter: '{c}%',
                    data: params.data[1]
                }
            ]
        });
    }

    // 获取全省旅游消费数据
    getProvinceCustomerData() {
        getProvinceCustomerData().then((res) => {
            customerData = this.handleData(res);
            this.setState({
                btnShow: true
            });
            this.chooseType(['consumeAmount', 'consumeAmountCompare']);
        });
    }

    // 处理数据
    handleData(res) {
        let xAxisData = []; // 时间
        let data = {
            consumeAmount: [], //  交易金额
            consumeAmountCompare: [], // 交易金额同比增加
            consumeTimes: [], // 交易笔数
            consumeTimesCompare: [], // 交易笔数同比增加
            swipeTimes: [], // 刷卡人次
            swipeTimesCompare: [], // 刷卡人次同比增加
            single: [], // 单笔平均
            singleCompare: []
        };
        let keys = Object.keys(data);
        res.forEach((item) => {
            xAxisData.unshift(item.year + '-' + dateFormat(item.month));
            keys.forEach((key) => {
                data[key].unshift(item[key]);
            });
        });
        return {
            xAxisData,
            data
        };
    }

    // 选择不同的数据类型，刷新图表
    chooseType(keys) {
        this.print({
            xAxisData: customerData.xAxisData,
            data: [customerData.data[keys[0]], customerData.data[keys[1]]]
        });
    }

    render() {
        let {btnShow} = this.state;
        const consumeInfoOptions = {
            clickBack: (params) => {
                this.chooseType(params.keys);
            },
            buttons: [
                {
                    buttonName: '交易金额',
                    keys: ['consumeAmount', 'consumeAmountCompare']
                },
                {
                    buttonName: '交易笔数',
                    keys: ['consumeTimes', 'consumeTimesCompare']
                },
                {
                    buttonName: '刷卡人次',
                    keys: ['swipeTimes', 'swipeTimesCompare']
                },
                {
                    buttonName: '单笔平均',
                    keys: ['single', 'singleCompare']
                }
            ]
        };
        return <PanelCard title="全省旅游消费情况" className="province-consumption br-line" timeSelectRequired={false}
                          zoomRequired={false}>
            {
                btnShow && <ToggleButtonGroup {...consumeInfoOptions}/>
            }

            <div id="provinceTouristConsumption" style={{width: '100%', height: 640}}></div>
        </PanelCard>;
    }
}