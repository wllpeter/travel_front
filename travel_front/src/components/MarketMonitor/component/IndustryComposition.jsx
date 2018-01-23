/**
 * @description 行业构成
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AD_CHART from '../../../utils/adCharts';

export default class IndustryComposition extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AD_CHART.pieChart({
            chartId: 'pieChart',
            borderWidth: 6,
            borderColor: '#203a59',
            legend: [
                {
                    name: '旅游出行',
                    icon: 'circle'
                },
                {
                    name: '旅游住宿',
                    icon: 'circle'
                },
                {
                    name: '旅游餐饮',
                    icon: 'circle'
                },
                {
                    name: '旅游浏览',
                    icon: 'circle'
                },
                {
                    name: '旅游购物',
                    icon: 'circle'
                },
                {
                    name: '旅游娱乐',
                    icon: 'circle'
                },
                {
                    name: '旅游综合服务',
                    icon: 'circle'
                }],
            legendTop: '28%',
            legendRight: '6%',
            data: [
                {
                    value: 10,
                    name: '旅游出行'
                },
                {
                    value: 324,
                    name: '旅游住宿'
                },
                {
                    value: 438,
                    name: '旅游餐饮'
                },
                {
                    value: 23,
                    name: '旅游浏览'
                },
                {
                    value: 99,
                    name: '旅游购物'
                },
                {
                    value: 39,
                    name: '旅游娱乐'
                },
                {
                    value: 43,
                    name: '旅游综合服务'
                }
            ]
        });
    }

    render() {
        return <PanelCard title="省内旅游行业构成" className="bg-grey">
            <div id="pieChart" style={{ width: '100%', height: 300 }}></div>
        </PanelCard>;
    }
}