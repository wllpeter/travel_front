/**
 * @description 各地市外地游客刷卡消费金额分析 和 各地市外地游客交易笔数分析
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import {getShuaKaAndJiaoYiInfo} from '../../../../services/ConsumptionData/consumptionData';
import AdCharts from '../../../../utils/adCharts';
import {getHeaderOptions, getDataZoom} from '../../../../utils/tools';

export default class CityMoney extends Component {
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

    getShuaKaAndJiaoYiInfo() {
        getShuaKaAndJiaoYiInfo({
            year: this.state.year,
            month: this.state.month,
            type: this.props.type
        }).then((res) => {
            let key = this.props.dataKey;
            let xAxisData = [];
            let data = [];
            res.forEach((item) => {
                xAxisData.push(item.city);
                data.push(item[key]);
            });
            this.print({
                xAxisData,
                data,
                zoomShow: xAxisData.length > 6
            });
        });
    }

    print(params) {
        // 各地市外地游客刷卡消费金额分析
        AdCharts.barChart({
            chartId: this.props.elementId,
            legend: [],
            legendShow: false,
            xAxisData: params.xAxisData,
            series: [params.data],
            gridTop: 60,
            unit: '万元',
            yAxisNameFontSize: 12,
            gridBottom: params.zoomShow ? 60 : 20,
            yAxisName: '消费(万元)',
            dataZoom: getDataZoom({
                lengthMax: params.xAxisData.length,
                showLength: 6
            })
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