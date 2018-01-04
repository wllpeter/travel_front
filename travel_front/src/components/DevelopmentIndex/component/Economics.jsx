/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import echarts from 'echarts';
import AD_CHART from '../../../utils/adCharts';

export default class Economics extends Component {
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
        AD_CHART.barChart({
            chartId: 'dev-index-economics',
            barWidth: '16',
            xAxisData: ['2017-07', '2017-08', '2017-09'],
            yAxisName: '',
            legend: [],
            legendIcon: 'circle',
            legendRight: '22',
            colors: ['#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'],
            series: [[233, 322, 100], [323, 323, 320], [140, 200, 180], [120, 160, 234], [203, 222, 123]]
        });
    }

    render() {
        return <div id="dev-index-economics" className="dev-down-map">
        </div>;
    }
}