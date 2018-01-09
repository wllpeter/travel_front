/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {REGION_DATA} from '../../../constants/developmentIndex/region';
import AD_CHART from '../../../utils/adCharts';

export default class Economics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1
        };
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print(this.state.activeIndex);
        });
    }

    print(index) {
        let series = index === 0 ? [[233, 322, 100]] : [[233, 322, 100], [323, 323, 320], [140, 200, 180], [120, 160, 234], [203, 222, 123]];
        let color = index === 0 ? ['#B6DC74'] : ['#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let legend = index === 0 ? ['四川省'] : REGION_DATA;
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
    chooseRegion(item) {
        let index = item.index;
        this.print(index);
    }

    render() {
        let switchProps = {
            buttons: [
                {buttonName: '全省'},
                {buttonName: '经济区'}
            ],
            activeIndex: this.state.activeIndex,
            clickBack: this.chooseRegion.bind(this)
        };
        return <div className="switch-btn-box">
            <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
            <div id="dev-index-economics" className="dev-down-map">
            </div>
        </div>;

    }
};