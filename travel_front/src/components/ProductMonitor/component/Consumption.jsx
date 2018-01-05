/**
 * @description 旅游产品供给/消费总量
 */
import React, {Component} from 'react';
import adCharts from '../../../utils/adCharts';

export default class Consumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1
        };
    }

    componentDidMount() {
        this.print();
    }

    print() {
        adCharts.barChart({
            chartId: 'consumption-map',
            legend: [],
            legendShow: false,
            gridTop: 40,
            gridBottom: 20,
            barWidth: 40,
            unit: '万元',
            xAxisData: ['7月', '8月', '9月', '10月', '11月', '12月'],
            series: [[600, 800, 700, 400, 650, 300]]
        });
    }

    render() {
        let {type} = this.state;
        return <div className="switch-btn-box">
            <div className="switch-btn">
                <div className={`switch-btn-left ${type === 1 ? 'switch-btn-active' : ''}`}>供给
                </div>
                <div className={`switch-btn-right ${type === 2 ? 'switch-btn-active' : ''}`}>消费
                </div>
            </div>
            <div id="consumption-map" className="product-map">
            </div>
        </div>;
    }
}