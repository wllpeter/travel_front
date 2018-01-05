/**
 * @description 旅游旅游产品综合评价
 */
import React, {Component} from 'react';
import echarts from 'echarts';

export default class ProductEvaluate extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.print();
    }

    print() {
        let option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'cross'}
            },
            toolbox: {
                show: false
            },
            legend: {
                data: ['综合评价', '环比']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '综合评价',
                    min: 0,
                    max: 5,
                    interval: 1,
                    axisLabel: {
                        formatter: '{value} 分'
                    }
                },
                {
                    type: 'value',
                    name: '环比',
                    min: 0,
                    max: 30,
                    interval: 6,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                {
                    name: '综合评价',
                    type: 'line',
                    data: [2.0, 4.9, 3.2, 3, 2, 4]
                },
                {
                    name: '环比',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [20, 15, 39, 22, 17, 30]
                }
            ]
        };
        let evaluateMap = echarts.init(document.getElementById('evaluate-map'));

        evaluateMap.setOption(option);
    }

    render() {
        return <div id="evaluate-map" className="product-map">
        </div>;
    }
}