/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AD_CHART from '../../../utils/adCharts';

export default class EnterprisesNumber extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.print();
        });
    }

    print() {
        AD_CHART.barChart({
            chartId: 'companyBarChart',
            barWidth: '16',
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: '企业(家)',
            legend: ['存量企业', '增量企业'],
            legendIcon: 'circle',
            legendRight: '22',
            gridBottom: 25,
            gridTop: 80,
            series: [[233, 322, 100, 200], [323, 323, 320, 330]]
        });
    }

    render() {
        return <PanelCard title="省内涉旅企业数量变更" className="bg-grey">
            <div id="companyBarChart" style={{width: '100%', height: 300}}></div>
        </PanelCard>;
    }
}