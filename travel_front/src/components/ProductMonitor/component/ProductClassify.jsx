/**
 * @description 旅游产品分类
 */
import React, {Component} from 'react';
import AD_CHART from '../../../utils/adCharts';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {getClassifyType} from '../../../services/ProductMonitor/ProductData';
import PanelCard from '../../commonComponent/PanelCard';

export default class ProductClassify extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getClassifyType();
        this.state = {
            productType: 1,
            dataType: 1,
            date: '2017-04'
        };
    }

    getClassifyType() {
        getClassifyType({
            productType: 1,
            dataType: 1,
            date: '2017-04'
        }).then((res) => {
            this.print(this.handleData(res));
        });
    }

    // 处理数据
    handleData(res) {
        let legend = [];
        let data = [];
        res.forEach((item) => {
            legend.push({
                name: item.name,
                icon: 'circle'
            });
            data.push({
                name: item.name,
                value: item.count
            });
        });
        return {
            legend: legend,
            data: data
        };
    }

    // 绘制图表
    print(data) {
        AD_CHART.pieChart({
            chartId: 'classify-map',
            borderWidth: 6,
            legendTop: 70,
            borderColor: '#072648',
            legend: data.legend,
            data: data.data
        });
    }

    render() {
        let switchProps = {
            buttons: [
                {buttonName: '供给'},
                {buttonName: '消费'}
            ]
        };
        return <PanelCard title="旅游产品分类" zoomRequired={false} monthRequired={true}>

            <div className="switch-btn-box">
                <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
                <div id="classify-map" className="product-map">
                </div>
            </div>
        </PanelCard>;

    }
}