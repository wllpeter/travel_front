/**
 * @description 旅游产品供给/消费总量
 */
import React, {Component} from 'react';
import adCharts from '../../../utils/adCharts';
import PanelCard from '../../commonComponent/PanelCard';
import {getSupplyConsume} from '../../../services/ProductMonitor/ProductData';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {getDataZoom, dateFormat} from '../../../utils/tools';

export default class Consumption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: this.props.productType,
            dataType: 1 // 1-供给 2-消费
        };
    }

    componentDidUpdate() {
        if (this.state.productType !== this.props.productType) {
            this.setState({
                productType: this.props.productType
            }, () => {
                this.getSupplyConsume();
            });
        }
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
        let switchProps = {
            buttons: [
                {buttonName: '供给', dataType: 1},
                {buttonName: '消费', dataType: 2}
            ],
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
        return <PanelCard title="旅游产品供给/消费总量" zoomRequired={false} monthRequired={false}>
            <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
            <div id="consumption-map" className="product-map">
            </div>
        </PanelCard>;
    }
}