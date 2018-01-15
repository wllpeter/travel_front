/**
 * @description 消费大数据
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import ProvinceTravelConsume from './component/ProvinceTravelConsume';
import CardMoney from './component/CardMoney';
import CityMoney from './component/CityMoney';
import ComeConsumeTourist from './component/ComeConsumeTourist';
import ComeTouristAreaRank from './component/ComeTouristAreaRank';
import ConsumptionTrade from './component/ConsumptionTrade';
import IndustryConsumeBusiness from './component/IndustryConsumeBusiness';
import {getSpendBigData} from '../../../services/ConsumptionData/consumptionData';
import 'antd/lib/grid/style';
import '../style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRange: null
        };
    }

    componentDidMount() {
        // 获取时间选择范围
        this.getSpendBigData();
    }

    getSpendBigData() {
        getSpendBigData({}).then((res) => {
            this.setState({timeRange: res});
        });
    }

    render() {
        const cardMoney = {
            elementId: 'cardMoneyPieChart',
            type: 'A',
            dataKey: 'swipeAmount',
            title: '外地游客刷卡消费金额分析',
            timeType: 'waiDiShuaKa'
        };

        const tradeAmount = {
            elementId: 'tradeAmountPieChart',
            type: 'C',
            dataKey: 'consumeTimes',
            title: '外地游客交易笔数分析',
            timeType: 'waiDiJiaoYi'
        };

        const cityCardMoney = {
            elementId: 'cityCardMoneyPieChart',
            type: 'B',
            dataKey: 'dealAmount',
            title: '各地市外地游客刷卡消费金额分析',
            timeType: 'geDiShuaKa'
        };

        const cityTradeAmount = {
            elementId: 'cityTradeAmountPieChart',
            type: 'D',
            dataKey: 'dealTime',
            title: '各地市外地游客交易笔数分析',
            timeType: 'geDiJiaoYi'
        };

        return <div className="consumption-data">
            <Row>
                <Col span={12} lg={24} xl={12}>
                    <ProvinceTravelConsume></ProvinceTravelConsume>
                </Col>
                <Col span={12} lg={24} xl={12}>
                    <Row>
                        <Col span={12}>
                            <CardMoney {...this.state} {...cardMoney}></CardMoney>
                        </Col>
                        <Col span={12}>
                            <CardMoney {...this.state} {...tradeAmount}></CardMoney>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <CityMoney {...this.state} {...cityCardMoney}></CityMoney>
                        </Col>
                        <Col span={12}>
                            <CityMoney {...this.state} {...cityTradeAmount}></CityMoney>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={2}>
                <Col span={6} lg={12} xl={6}>
                    <ComeConsumeTourist  {...this.state}></ComeConsumeTourist>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <ComeTouristAreaRank  {...this.state}></ComeTouristAreaRank>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <ConsumptionTrade  {...this.state}></ConsumptionTrade>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <IndustryConsumeBusiness {...this.state}></IndustryConsumeBusiness>
                </Col>
            </Row>
        </div>;
    }
}