/**
 * @description 消费大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import AdCharts from '../../utils/adCharts';
import { Row, Col } from 'antd';
import PercentBar from '../commonComponent/PercentBar';
import 'antd/lib/grid/style';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 外地游客刷卡消费金额分析
        AdCharts.pieChart({
            chartId: 'cardMoneyPieChart',
            legend: ['成都平原经济区', '川东北经济区', '攀西经济区', '川西北经济区', '川南经济区'],
            legendIcon: 'circle',
            legendTop: 80,
            borderWidth: 10,
            borderColor: '#072848',
            legendTop: 146,
            data: [
                {
                    name: '成都平原经济区',
                    value: 25
                },
                {
                    name: '川东北经济区',
                    value: 12.5
                },
                {
                    name: '攀西经济区',
                    value: 12.5
                },
                {
                    name: '川西北经济区',
                    value: 25
                },
                {
                    name: '川南经济区',
                    value: 25
                }
            ]
        });

        // 外地游客交易笔数分析
        AdCharts.pieChart({
            chartId: 'tradeAmountPieChart',
            legend: ['成都平原经济区', '川东北经济区', '攀西经济区', '川西北经济区', '川南经济区'],
            legendIcon: 'circle',
            legendTop: 80,
            borderWidth: 10,
            borderColor: '#072848',
            legendTop: 146,
            data: [
                {
                    name: '成都平原经济区',
                    value: 25
                },
                {
                    name: '川东北经济区',
                    value: 12.5
                },
                {
                    name: '攀西经济区',
                    value: 12.5
                },
                {
                    name: '川西北经济区',
                    value: 25
                },
                {
                    name: '川南经济区',
                    value: 25
                }
            ]
        });

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

        // 各地市外地游客刷卡消费金额分析
        AdCharts.barChart({
            chartId: 'cityTradeAmountPieChart',
            legend: ['消费笔数'],
            legendShow: false,
            xAxisData: ['阿坝', '巴中', '达州', '广安', '广元'],
            series: [[30, 70, 66, 32, 53]],
            gridTop: 60,
            yAxisNameFontSize: 12,
            yAxisName: '消费(万笔)'
        });


    }

    render() {
        return <div className="consumption-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="全省旅游消费情况">

                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <Row>
                        <Col span={ 12 }>
                            <PanelCard title="外地游客刷卡消费金额分析">
                                <div id="cardMoneyPieChart" style={{ width: '100%', height: 300 }}></div>
                            </PanelCard>
                        </Col>
                        <Col span={ 12 }>
                            <PanelCard title="外地游客交易笔数分析">
                                <div id="tradeAmountPieChart" style={{ width: '100%', height: 300 }}></div>
                            </PanelCard>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={ 12 }>
                            <PanelCard title="各地市外地游客刷卡消费金额分析">
                                <div id="cityCardMoneyPieChart" style={{ width: '100%', height: 300 }}></div>
                            </PanelCard>
                        </Col>
                        <Col span={ 12 }>
                            <PanelCard title="各地市外地游客交易笔数分析">
                                <div id="cityTradeAmountPieChart" style={{ width: '100%', height: 300 }}></div>
                            </PanelCard>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="入川高消费游客来源城市排名" className="bg-grey">
                        <table className="mt-table mt-table-noborder w-95">
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
                                    <td><PercentBar percent={ 34 }/></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>广东省</td>
                                    <td>11.8</td>
                                    <td><PercentBar percent={ 25 }/></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>重庆市</td>
                                    <td>37.1</td>
                                    <td><PercentBar percent={ 10 }/></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>重庆市</td>
                                    <td>37.1</td>
                                    <td><PercentBar percent={ 10 }/></td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>重庆市</td>
                                    <td>37.1</td>
                                    <td><PercentBar percent={ 10 }/></td>
                                </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="入川游客来源地排名" className="bg-grey">
                        <table className="mt-table mt-table-noborder wrapper w-95">
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
                                <td><PercentBar percent={ 34 }/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>广东省</td>
                                <td>11.8</td>
                                <td><PercentBar percent={ 25 }/></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={ 10 }/></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={ 10 }/></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>重庆市</td>
                                <td>37.1</td>
                                <td><PercentBar percent={ 10 }/></td>
                            </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="旅游消费交易分析" className="bg-grey">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="各行业刷卡消费商户排名" className="bg-grey">

                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}