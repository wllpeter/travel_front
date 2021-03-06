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
        if (!nextProps.timeRange) {
            return;
        }
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
            res.sort((a, b) => {
                return b[key] - a[key];
            });
            res.forEach((item) => {
                xAxisData.push(item.city);
                data.push(item[key]);
            });
            this.print({
                xAxisData,
                zoomShow: xAxisData.length > 5,
                data
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
            gridTop: 60 * sizeRatio,
            unit: this.props.unit,
            barWidth: 22 * sizeRatio,
            yAxisNameFontSize: 12,
            gridBottom: (params.zoomShow ? 60 : 20) * sizeRatio,
            yAxisName: this.props.unitName,
            dataZoom: getDataZoom({
                lengthMax: params.xAxisData.length,
                showLength: 5,
                zoomHeight: 15 * sizeRatio
            }),
            sizeRatio
        });
    }

    render() {
        let {panelProps} = this.state;
        let {elementId, title} = this.props;
        return <PanelCard title={title} {...panelProps}>
            <div id={elementId} style={{width: '100%', height: 300 * sizeRatio}}></div>
        </PanelCard>;
    }
}