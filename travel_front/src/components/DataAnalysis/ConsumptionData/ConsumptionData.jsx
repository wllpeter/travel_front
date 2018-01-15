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
import CardMoneyPieChart from './component/CardMoneyPieChart';
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

        // 各地市外地游客刷卡消费金额分析
        AdCharts.barChart({
            chartId: 'cityCardMoneyPieChart',
            legend: ['消费金额'],
            legendShow: false,
            xAxisData: ['阿坝', '巴中', '达州', '广安', '广元'],
            series: [[30, 70, 66, 32, 53]],
            gridTop: 60,
            yAxisNameFontSize: 12,
            yAxisName: '消费(万元)'
        });

        // 各地市外地游客交易笔数分析
        AdCharts.barChart({
            chartId: 'cityTradeAmountPieChart',
            legend: ['交易笔数'],
            legendShow: false,
            xAxisData: ['阿坝', '巴中', '达州', '广安', '广元'],
            series: [[30, 70, 66, 32, 53]],
            gridTop: 60,
            yAxisNameFontSize: 12,
            yAxisName: '交易(万笔)'
        });

        // 旅游消费交易分析
        AdCharts.radarChart({
            chartId: 'consumptionTrade',
            legend: ['低端餐饮', '中端餐饮', '高端餐饮'],
            series: [[4000, 8000, 10000], [8000, 4000, 12000], [2000, 6000, 12000]],
            colors: ['#b6dd74', '#32c889', '#00a9ff'],
            indicator: [
                {text: '交易笔数'},
                {text: '交易总额'},
                {text: '刷卡人次'}
            ]
        });

    }

    getSpendBigData() {
        getSpendBigData({}).then((res) => {
            this.setState({timeRange: res});
        });
    }

    render() {
        const sourcePlaceRank = {
            clickBack: () => {

            },
            buttons: [
                {
                    buttonName: '省份',
                    value: ''
                },
                {
                    buttonName: '城市',
                    value: ''
                }
            ]
        };

        const consumptionTrade = {
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
                }
            ]
        };

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

        return <div className="consumption-data">
            <Row>
                <Col span={12} lg={24} xl={12}>
                    <ProvinceTravelConsume></ProvinceTravelConsume>
                </Col>
                <Col span={12} lg={24} xl={12}>
                    <Row>
                        <Col span={12}>
                            <CardMoneyPieChart {...this.state} {...cardMoney}></CardMoneyPieChart>
                        </Col>
                        <Col span={12}>
                            <CardMoneyPieChart {...this.state} {...tradeAmount}></CardMoneyPieChart>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <PanelCard title="各地市外地游客刷卡消费金额分析">
                                <div id="cityCardMoneyPieChart" style={{width: '100%', height: 300}}></div>
                            </PanelCard>
                        </Col>
                        <Col span={12}>
                            <PanelCard title="各地市外地游客交易笔数分析">
                                <div id="cityTradeAmountPieChart" style={{width: '100%', height: 300}}></div>
                            </PanelCard>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={2}>
                <Col span={6} lg={12} xl={6}>
                    <PanelCard title="入川高消费游客来源城市排名" className="bg-grey">
                        <table className="mt-table mt-table-noborder w-95 mt-50">
                            <thead>
                            <tr>
                                <th>排名</th>
                                <th>来源城市</th>
                                <th>人数(万)</th>
                                <th>占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>上海市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={34}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>广东省</td>
                                <td>11.8</td>
                                <td><PercentBar percent={25}/></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <PanelCard title="入川游客来源地排名" className="bg-grey source-place-rank">
                        <ToggleButtonGroup {...sourcePlaceRank}/>
                        <table className="mt-table mt-table-noborder wrapper w-95 mt-50">
                            <thead>
                            <tr>
                                <th>排名</th>
                                <th>来源城市</th>
                                <th>人数(万)</th>
                                <th>占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>上海市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={34}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>广东省</td>
                                <td>11.8</td>
                                <td><PercentBar percent={25}/></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={10}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <PanelCard title="旅游消费交易分析" className="bg-grey consumption-trade">
                        <ToggleButtonGroup {...consumptionTrade}/>
                        <div id="consumptionTrade" style={{width: '100%', height: 300}}></div>
                    </PanelCard>
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