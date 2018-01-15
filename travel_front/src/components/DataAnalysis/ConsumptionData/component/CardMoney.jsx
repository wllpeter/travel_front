/**
 * @description 外地游客刷卡消费金额分析 和 外地游客交易笔数分析
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import {getShuaKaAndJiaoYiInfo} from '../../../../services/ConsumptionData/consumptionData';
import AdCharts from '../../../../utils/adCharts';
import {getHeaderOptions} from '../../../../utils/tools';

export default class CardMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            month: null
        };
    }

    componentWillReceiveProps(nextProps) {
        let key = nextProps.timeType;
        let times = nextProps.timeRange[key];
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
                clickBack: (year, month) => {
                    this.setState({
                        year: year,
                        month: month
                    }, () => {
                        this.getShuaKaAndJiaoYiInfo();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getShuaKaAndJiaoYiInfo();
        });
    }

    print(params) {
        // 外地游客刷卡消费金额分析
        AdCharts.pieChart({
            chartId: this.props.elementId,
            legend: params.legend,
            legendIcon: 'circle',
            borderWidth: 10,
            borderColor: '#072848',
            legendTop: 146,
            data: params.data
        });
    }

    getShuaKaAndJiaoYiInfo() {
        getShuaKaAndJiaoYiInfo({
            year: this.state.year,
            month: this.state.month,
            type: this.props.type
        }).then((res) => {
            let key = this.props.dataKey;
            let legend = [];
            let data = [];
            res.forEach((item) => {
                legend.push(item.economicZone);
                data.push({
                    name: item.economicZone,
                    value: item[key]
                });
            });
            this.print({
                legend,
                data
            });
        });
    }

    render() {
        let {panelProps} = this.state;
        let {elementId, title} = this.props;
        return <PanelCard title={title} {...panelProps}>
            <div id={elementId} style={{width: '100%', height: 300}}></div>
        </PanelCard>;
    }
}