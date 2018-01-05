/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import {REGION_DATA} from '../../../constants/developmentIndex/region';
import AD_CHART from '../../../utils/adCharts';

export default class Economics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regionType: 2 // 1为全国，2为经济区
        };
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print(this.state.regionType);
        });
    }

    print(type) {
        let series = type === 1 ? [[233, 322, 100]] : [[233, 322, 100], [323, 323, 320], [140, 200, 180], [120, 160, 234], [203, 222, 123]];
        let color = type === 1 ? ['#B6DC74'] : ['#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let legend = type === 1 ? ['四川省'] : REGION_DATA;
        AD_CHART.barChart({
            chartId: 'dev-index-economics',
            barWidth: '16',
            xAxisData: ['2017-07', '2017-08', '2017-09'],
            yAxisName: '',
            legend: legend,
            gridTop: 100,
            legendShow: false,
            legendRight: '22',
            colors: color,
            series: series
        });
    }

    // 点击按钮选择区域
    chooseRegion(type) {
        type = ~~type;
        if (type === this.state.type) {
            return;
        }
        this.setState({
            regionType: type
        }, () => {
            this.print(type);
        });
    }

    render() {
        let {regionType} = this.state;
        return <div className="index-economics-box">
            <div className="economics-btn">
                <div className={`economics-btn-left ${regionType === 1 ? 'economics-btn-active' : ''}`}
                     onClick={() => {
                         this.chooseRegion(1);
                     }}>全省
                </div>
                <div className={`economics-btn-right ${regionType === 2 ? 'economics-btn-active' : ''}`}
                     onClick={() => {
                         this.chooseRegion(2);
                     }}>经济区
                </div>
            </div>
            <div id="dev-index-economics" className="dev-down-map">
            </div>
        </div>;

    }
};