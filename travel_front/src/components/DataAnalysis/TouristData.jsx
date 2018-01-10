/**
 * @description 客情大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import adCharts from '../../utils/adCharts';
import { Row, Col } from 'antd';
import 'antd/lib/grid/style';
import maleIcon from '../../assets/images/male.png';
import femaleIcon from '../../assets/images/female.png';
import { getProvinceCustomerData } from '../../services/DataAnalysis/touristData';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        getProvinceCustomerData(['2017', '1']).then(data => {
            console.log('获取到四川省游客分析数据:', data);
        });


        // 四川省游客年龄分布图
        adCharts.pieChart({
            chartId: 'provinceAgePieChart',
            legend: ['20以下', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65以上'],
            legendIcon: 'circle',
            borderWidth: 6,
            borderColor: '#072848',
            legendTop: 80,
            legendHeight: 150,
            legendRight: '10%',
            center: ['30%', '50%'],
            data: [
                {
                    name: '20以下',
                    value: 12
                },
                {
                    name: '20-25',
                    value: 12
                },
                {
                    name: '25-30',
                    value: 12
                },
                {
                    name: '30-35',
                    value: 12
                },
                {
                    name: '35-40',
                    value: 12
                },
                {
                    name: '40-45',
                    value: 12
                },
                {
                    name: '45-50',
                    value: 12
                },
                {
                    name: '50-55',
                    value: 12
                },
                {
                    name: '55-60',
                    value: 12
                },
                {
                    name: '60-65',
                    value: 12
                },
                {
                    name: '65以上',
                    value: 12
                }
            ]
        });

        // 四川省客流量分析
        adCharts.lineChart({
            chartId: 'provinceFlowLineChart',
            legend: ['人次', '人数'],
            legendIcon: 'circle',
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: '流量 (万)',
            smooth: false,
            graphic: false,
            colors: ['#32c889', '#00a9ff'],
            series: [[8500, 4500, 3400, 2300], [3242, 2334, 2312, 3232]]
        });

        // 乡村游游客年龄分布
        adCharts.pieChart({
            chartId: 'villageAgePieChart',
            legend: ['20以下', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65以上'],
            legendIcon: 'circle',
            borderWidth: 6,
            borderColor: '#072848',
            legendTop: 80,
            legendHeight: 150,
            legendRight: '10%',
            center: ['30%', '50%'],
            data: [
                {
                    name: '20以下',
                    value: 12
                },
                {
                    name: '20-25',
                    value: 12
                },
                {
                    name: '25-30',
                    value: 12
                },
                {
                    name: '30-35',
                    value: 12
                },
                {
                    name: '35-40',
                    value: 12
                },
                {
                    name: '40-45',
                    value: 12
                },
                {
                    name: '45-50',
                    value: 12
                },
                {
                    name: '50-55',
                    value: 12
                },
                {
                    name: '55-60',
                    value: 12
                },
                {
                    name: '60-65',
                    value: 12
                },
                {
                    name: '65以上',
                    value: 12
                }
            ]
        });

        // 乡村游出游人次
        adCharts.barChart({
            chartId: 'villageOutingBarChart',
            legend: ['乡村游出游人次'],
            legendShow: false,
            gridTop: 60,
            gridBottom: 40,
            xAxisData: ['阿坝', '巴中', '成都', '达州', '广安', '广元'],
            yAxisName: '流量 (万)',
            series: [[6000, 8000, 11000, 4000, 6500, 3000]]
        });

        // 五大经济区客游人次
        adCharts.barChart({
            chartId: 'fiveEconomicZoneBarChart',
            legend: ['五大经济区客游人次'],
            legendShow: false,
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            xAxisLineShow: false,
            xAxisLabelShow: false,
            yAxisLineShow: false,
            row: true,
            gridLeft: '5%',
            seriesLabelShow: true,
            series: [[3563, 936, 1026, 365, 450]]
        });

        // 游客停留时长
        adCharts.barChart({
            chartId: 'touristStayBarChart',
            legend: ['0-12', '13-24', '25-48', '49-72', '73-96', '97-120', '121-144', '145-360', '360+'],
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            barWidth: 14,
            colors: ['#00a9ff', '#32c889', '#ddcf73', '#1b75d3', '#3559c5', '#5334c5', '#0dbbc7', '#b6dd74', '#9e35c5'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '10',
            legendItemGap: 10,
            gridTop: 45,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: [[34, 32, 23, 12, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32]]
        });

        // 游客交通方式
        adCharts.barChart({
            chartId: 'touristTrafficWayBarChart',
            legend: ['其他', '火车', '高铁', '飞机'],
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            barWidth: 14,
            colors: ['#00a9ff', '#0dbbc7', '#32c889', '#b6dd74'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '20',
            legendItemGap: 10,
            gridTop: 45,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: [[34, 32, 23, 12, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32]]
        });

        // 乡村游消费潜力分布
        adCharts.percentBarChart({
            chartId: 'villageConsumptionBarChart',
            title: '释义: 星级越高，消费者潜力越强',
            titleLeft: 20,
            titleFontSize: 12,
            legendShow: false,
            xAxisData: ['1星','2星','3星','4星','5星','6星','7星','8星','9星','10星'],
            barWidth: 13,
            labelFontSize: 12,
            gridTop: 60,
            gridLeft: 0,
            yAxisLineShow: false,
            yAxisLabelShow: false,
            xAxisLineShow: false,
            colors: ['#415870', '#00a9ff'],
            labelOffset: [0, -10],
            labelMargin: 0,
            labelPos: 'top',
            series: [[100,100,100,100,100,100,100,100,100,100], [4.32, 7.34, 8.50, 13.98, 30.37, 18.04, 11.44, 5.80, 10.13, 0.00]]
        });

        // 乡村游时长分布
        adCharts.percentBarChart({
            chartId: 'villageDurationPercentBarChart',
            legendShow: false,
            yAxisData: ["120h以上".padEnd(7, ' '), "96h-120h", "72h-96h".padEnd(8, ' '), "48h-72h".padEnd(8, ' '), "24h-48h".padEnd(8, ' '), "12h-24h".padEnd(8, ' '), "3h-12h".padEnd(9, ' ')],
            row: true,
            barWidth: 8,
            colors: ['#415870', '#00a9ff'],
            gridRight: 70,
            yAxisLineShow: false,
            xAxisLineShow: false,
            xAxisLabelShow: false,
            series: [ [100, 100, 100, 100, 100, 100, 100], [1.9, 1.06, 1.75, 3.66, 10.85, 18.14, 62.64]]
        });
    }

    render() {
        return <div className="tourist-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="四川省游客分析" zoomRequired={ false } className="br-line">
                        <Row>
                            <Col span={ 12 }>
                                <PanelCard title="四川省游客年龄分布" zoomRequired={ false } monthRequired={ false }>
                                    <div id="provinceAgePieChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 12 }>
                                <PanelCard title="四川省游客性别分布" zoomRequired={ false } monthRequired={ false }>
                                    <div className="sex-distribution">
                                        <div className="total male-total">
                                            <img src={ maleIcon } alt="男性"/>
                                            <div className="info-data">
                                                <span>男性<em>64.77%</em></span>
                                                <div className="data-bar male-bar" style={{ width: '64.77%' }}></div>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <img src={ femaleIcon } alt="女性"/>
                                            <div className="info-data">
                                                <span>女性<em>35.23%</em></span>
                                                <div className="data-bar female-bar" style={{ width: '35.23%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <PanelCard title="四川省游客流量分析" zoomRequired={ false } monthRequired={ false }>
                                    <div id="provinceFlowLineChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="乡村游游客分析" zoomRequired={ false }>
                        <Row>
                            <Col span={ 12 }>
                                <PanelCard title="乡村游游客年龄分析" zoomRequired={ false } monthRequired={ false }>
                                    <div id="villageAgePieChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 12 }>
                                <PanelCard title="乡村游消费潜力分布" zoomRequired={ false } monthRequired={ false }>
                                    <div id="villageConsumptionBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 16 }>
                                <PanelCard title="乡村游出游人次" zoomRequired={ false } monthRequired={ false }>
                                    <div id="villageOutingBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 8 }>
                                <PanelCard title="乡村游时长分布" zoomRequired={ false } monthRequired={ false }>
                                    <div id="villageDurationPercentBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>

            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="五大经济区客游人次" className="bg-grey">
                        <div id="fiveEconomicZoneBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="游客停留时长" className="bg-grey">
                        <div id="touristStayBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="五大经济区游客来源排名" className="bg-grey">
                        <table className="mt-table mt-table-noborder col-1-al" style={{ height: 280 }}>
                            <thead>
                            <tr>
                                <th className="pl-12">排名</th>
                                <th>省份</th>
                                <th>游客量(万)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>01</td>
                                <td>重庆市</td>
                                <td>179</td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>广东省</td>
                                <td>75</td>
                            </tr>
                            <tr>
                                <td>03</td>
                                <td>江苏省</td>
                                <td>58</td>
                            </tr>
                            <tr>
                                <td>04</td>
                                <td>云南省</td>
                                <td>47</td>
                            </tr>
                            <tr>
                                <td>05</td>
                                <td>贵州省</td>
                                <td>41</td>
                            </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="游客交通方式" className="bg-grey">
                        <div id="touristTrafficWayBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}