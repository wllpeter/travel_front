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
        this.state = {
            productType: 1,
            dataType: 1, // 1-供给 0-消费
            date: '2017-04',
            activeIndex: 0
        };
    }

    componentDidMount() {
        this.getClassifyType(this.state.date);
    }

    getClassifyType() {
        getClassifyType({
            productType: this.state.productType,
            dataType: this.state.dataType,
            date: this.state.date
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

    // 选择日期
    monthPickerChange(dateString) {
        this.setState({date: dateString}, () => {
            this.getClassifyType();
        });
    }

    render() {
        let switchProps = {
            buttons: [
                {buttonName: '供给', dataType: 1},
                {buttonName: '消费', dataType: 0}
            ],
            clickBack: (params) => {
                this.setState({
                    dataType: params.dataType
                }, () => {
                    this.getClassifyType();
                });
            }
        };
        let panelProps = {
            monthPickerChange: this.monthPickerChange.bind(this),
            defaultValue: this.state.date
        };
        return <PanelCard title="旅游产品分类" zoomRequired={false} monthRequired={true} {...panelProps}>

            <div className="switch-btn-box">
                <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
                <div id="classify-map" className="product-map">
                </div>
            </div>
        </PanelCard>;

    }
}