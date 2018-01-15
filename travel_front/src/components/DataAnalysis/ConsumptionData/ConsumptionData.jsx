/**
 * @description 消费大数据
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AdCharts from '../../../utils/adCharts';
import {Row, Col} from 'antd';
import PercentBar from '../../commonComponent/PercentBar';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import ProvinceTravelConsume from './component/ProvinceTravelConsume';
import CardMoney from './component/CardMoney';
import CityMoney from './component/CityMoney';
import ComeConsumeTourist from './component/ComeConsumeTourist';
import ComeTouristAreaRank from './component/ComeTouristAreaRank';
import ConsumptionTrade from './component/ConsumptionTrade';
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
        const cardConsumption = {
            clickBack: () => {

            },
            buttons: [
                {
                    buttonName: '餐饮',
                    value: ''
                },
                {
                    buttonName: '酒店',
                    value: ''
                },
                {
                    buttonName: '娱乐',
                    value: ''
                },
                {
                    buttonName: '零售',
                    value: ''
                }
            ]
        };

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
                    <PanelCard title="各行业刷卡消费商户排名" className="bg-grey card-consumption">
                        <ToggleButtonGroup {...cardConsumption}/>
                        <table className="mt-table mt-table-noborder wrapper w-95 mt-50 ">
                            <thead>
                            <tr>
                                <th>排名</th>
                                <th>商户名称</th>
                                <th>平均单笔消费金额</th>
                                <th>刷卡总笔数</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>翠园</td>
                                <td>1130.2</td>
                                <td>6813</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>好利来</td>
                                <td>1130.2</td>
                                <td>6813</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>红杏酒家</td>
                                <td>1130.2</td>
                                <td>6813</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>海底捞</td>
                                <td>1130.2</td>
                                <td>6813</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>爱达乐</td>
                                <td>1130.2</td>
                                <td>6813</td>
                            </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}