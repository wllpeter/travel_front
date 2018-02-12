/**
 * @description 旅游消费交易分析
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import ToggleButtonGroup from '../../../commonComponent/ToggleButtonGroup';
import {getTravelConsumeAnalyse} from '../../../../services/ConsumptionData/consumptionData';
import {getHeaderOptions} from '../../../../utils/tools';
import Modal from '../../../commonComponent/Modal';
import AdCharts from '../../../../utils/adCharts';

export default class ConsumptionTrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            quarter: null,
            industry: '餐饮',
            visible: false,
            activeIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        let times = nextProps.timeRange.travelSpend;
        this.getHeaderOptions(times);
    }

    print(params, visible) {
        let getMax = (i) => {
            let max = 0;
            params.series.forEach((item) => {
                if (max < item[i] * 1) {
                    max = item[i] * 1;
                }
            });
            return max;
        };
        let ratio = visible ? 1 : sizeRatio;
        AdCharts.radarChart({
            chartId: visible ? 'consumptionTrade2' : 'consumptionTrade',
            legend: params.legend,
            series: params.series,
            radarRadius: (visible ? 150 : 100) * ratio,
            legendTop: (!visible && isSmallScreen) ? '40%' : '60%',
            itemGap: (!visible && isSmallScreen) ? 10 : 20,
            colors: ['#b6dd74', '#32c889', '#00a9ff'],
            legendSize: (visible ? 16 : 14) * ratio,
            fontSize: (visible ? 16 : 14) * ratio,
            indicator: [
                {text: '交易笔数', max: getMax(0)},
                {text: '交易总额', max: getMax(1)},
                {text: '刷卡人次', max: getMax(2)}
            ],
            formatter: (p) => {
                return `${p.seriesName}<br>交易笔数：${p.value[0]}万笔<br>交易总额：${p.value[1]}万元<br>刷卡人次：${p.value[2]}万人`;
            },
            sizeRatio: ratio
        });
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                isQuarter: true,
                zoomRequired: true,
                clickBack: (year, quarter) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + quarter;
                    this.setState({
                        year: year,
                        quarter: quarter,
                        panelProps
                    }, () => {
                        this.getTravelConsumeAnalyse();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.getTravelConsumeAnalyse();
        });
    }

    getTravelConsumeAnalyse() {
        getTravelConsumeAnalyse({
            year: this.state.year,
            quarter: this.state.quarter,
            industry: this.state.industry
        }).then((res) => {
            this.handleData(res);
        });
    }

    // 处理数据
    handleData(res) {
        let legend = [],
            series = [];
        res.forEach((item) => {
            legend.push(item.level + item.industry);
            series.push([item.swipeTimes, item.consumeAmount, item.consumeTimes]);
        });
        this.print({legend, series});
        if (this.state.visible) {
            this.print({legend, series}, true);
        }
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        let {panelProps, visible, activeIndex} = this.state;
        const consumptionTrade = {
            clickBack: (params) => {
                this.setState({
                    industry: params.buttonName,
                    activeIndex: params.index
                }, () => {
                    this.getTravelConsumeAnalyse();
                });
            },
            activeIndex,
            buttons: [
                {
                    buttonName: '餐饮'
                },
                {
                    buttonName: '酒店'
                }
            ]
        };
        return <div>
            <PanelCard title="旅游消费交易分析" {...panelProps} enlarge={this.showModal.bind(this)}
                       className="bg-grey consumption-trade consumption-down">
                <ToggleButtonGroup {...consumptionTrade}/>
                <div id="consumptionTrade" style={{width: '100%', height: 300 * sizeRatio}}></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getTravelConsumeAnalyse.bind(this)();
            }}>
                <PanelCard title="旅游消费交易分析" {...panelProps}
                           zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)}
                           className="bg-grey consumption-trade consumption-down">
                    <ToggleButtonGroup {...consumptionTrade}/>
                    <div id="consumptionTrade2" style={{width: '100%', height: 460}}></div>
                </PanelCard>
            </Modal>
        </div>;
    }
}