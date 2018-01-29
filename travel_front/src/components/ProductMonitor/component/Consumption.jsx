/**
 * @description 旅游产品供给/消费总量
 */
import React, {Component} from 'react';
import adCharts from '../../../utils/adCharts';
import PanelCard from '../../commonComponent/PanelCard';
import {getSupplyConsume} from '../../../services/ProductMonitor/ProductData';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {getDataZoom, dateFormat} from '../../../utils/tools';
import {CONSUMPTION} from '../../../constants/productMonitor/switchButton';

export default class Consumption extends Component {
    constructor(props) {
        super(props);
        let productType = this.props.productType;
        this.state = {
            buttons: CONSUMPTION[productType],
            productType: productType,
            dataType: 1 // 1-供给 2-消费
        };
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.resetButtonState();
            let buttons = CONSUMPTION[productType];
            this.setState({
                buttons: buttons,
                dataType: buttons[0] ? buttons[0].dataType : 1,
                productType: productType
            }, () => {
                this.getSupplyConsume();
            });
        }
    }

    resetButtonState() {
        // 调用组件进行通信,重置按钮状态
        this.refs.getSwitchButton.resetButtonState();
    }

    componentDidMount() {
        this.getSupplyConsume();
    }

    getSupplyConsume() {
        getSupplyConsume({
            productType: this.state.productType,
            dataType: this.state.dataType
        }).then((res) => {
            this.print(this.handleData(res));
        });
    }

    // 处理数据
    handleData(res) {
        let serie = [];
        let xAxis = [];
        res = res || [];
        res.forEach((item) => {
            xAxis.unshift(item.year + '-' + dateFormat(item.month));
            serie.unshift(item.count);
        });
        let dataZoom = getDataZoom({
            lengthMax: xAxis.length,
            showLength: 6
        });
        return {
            serie,
            xAxis,
            dataZoom,
            zoomShow: xAxis.length > 6
        };
    }

    print(params) {
        adCharts.barChart({
            chartId: 'consumption-map',
            legend: [],
            legendShow: false,
            gridTop: 10,
            gridBottom: params.zoomShow ? 60 : 20,
            barWidth: 40,
            unit: '万元',
            dataZoom: params.dataZoom,
            xAxisData: params.xAxis,
            series: [params.serie]
        });
    }

    render() {
        let {title} = this.props;
        let switchProps = {
            buttons: this.state.buttons,
            style: {
                top: '20px'
            },
            clickBack: (params) => {
                this.setState({
                    dataType: params.dataType
                }, () => {
                    this.getSupplyConsume();
                });
            }
        };
        return <PanelCard title={`${title}产品供给/消费总量`}>
            <ToggleButtonGroup ref="getSwitchButton" {...switchProps}></ToggleButtonGroup>
            <div id="consumption-map" className="product-map">
            </div>
        </PanelCard>;
    }
}