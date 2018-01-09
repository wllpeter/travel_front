/**
 * @description 旅游产品分类
 */
import React, {Component} from 'react';
import AD_CHART from '../../../utils/adCharts';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';

export default class ProductClassify extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.print();
    }

    print() {
        AD_CHART.pieChart({
            chartId: 'classify-map',
            borderWidth: 6,
            legendTop: 70,
            borderColor: '#072648',
            legend: [
                {
                    name: '亲水',
                    icon: 'circle'
                },
                {
                    name: '自然景观',
                    icon: 'circle'
                },
                {
                    name: '名胜人文',
                    icon: 'circle'
                },
                {
                    name: '公园',
                    icon: 'circle'
                },
                {
                    name: '观光',
                    icon: 'circle'
                },
                {
                    name: '休闲娱乐',
                    icon: 'circle'
                },
                {
                    name: '运动拓展',
                    icon: 'circle'
                },
                {
                    name: '美食',
                    icon: 'circle'
                }],
            data: [
                {
                    value: 80,
                    name: '亲水'
                },
                {
                    value: 24,
                    name: '自然景观'
                },
                {
                    value: 23,
                    name: '名胜人文'
                },
                {
                    value: 99,
                    name: '公园'
                },
                {
                    value: 39,
                    name: '观光'
                },
                {
                    value: 68,
                    name: '休闲娱乐'
                },
                {
                    value: 43,
                    name: '运动拓展'
                },
                {
                    value: 70,
                    name: '美食'
                }]
        });
    }

    render() {
        let switchProps = {
            buttons: [
                {buttonName: '供给'},
                {buttonName: '消费'}
            ]
        };
        return <div className="switch-btn-box">
            <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
            <div id="classify-map" className="product-map">
            </div>
        </div>;
    }
}