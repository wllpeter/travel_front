/**
 * @description 旅游产品分类
 */
import React, {Component} from 'react';
import AD_CHART from '../../../utils/adCharts';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {getClassifyType} from '../../../services/ProductMonitor/ProductData';
import {PRODUCT_CLASSIFY} from '../../../constants/productMonitor/switchButton';
import PanelCard from '../../commonComponent/PanelCard';
import {getHeaderOptions} from '../../../utils/tools';

export default class ProductClassify extends Component {
    constructor(props) {
        super(props);
        let productType = this.props.productType;
        this.state = {
            buttons: PRODUCT_CLASSIFY[productType],
            productType: productType,
            dataType: 1, // 1-供给 0-消费
            year: null,
            month: null,
            panelProps: {}
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.classify;
        this.getHeaderOptions(times);
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.resetButtonState();
            let buttons = PRODUCT_CLASSIFY[productType];
            this.setState({
                buttons: buttons,
                dataType: buttons[0] ? buttons[0].dataType : 1,
                productType: productType
            });
        }
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.getClassifyType();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getClassifyType();
        });
    }

    resetButtonState() {
        // 调用组件进行通信,重置按钮状态
        this.refs.getSwitchButton.resetButtonState();
    }

    getClassifyType() {
        getClassifyType({
            productType: this.state.productType,
            dataType: this.state.dataType,
            year: this.state.year,
            month: this.state.month
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
            center: ['30%', '50%'],
            borderColor: '#072648',
            legend: data.legend,
            data: data.data
        });
    }

    render() {
        let {title} = this.props;
        let {panelProps} = this.state;
        let switchProps = {
            buttons: this.state.buttons,
            clickBack: (params) => {
                this.setState({
                    dataType: params.dataType
                }, () => {
                    this.getClassifyType();
                });
            }
        };

        return <PanelCard title={`${title}产品分类`} {...panelProps}>

            <div className="switch-btn-box">
                <ToggleButtonGroup ref="getSwitchButton" {...switchProps}></ToggleButtonGroup>
                <div id="classify-map" className="product-map">
                </div>
            </div>
        </PanelCard>;

    }
}