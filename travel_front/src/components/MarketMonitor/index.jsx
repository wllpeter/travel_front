/**
 * @description 旅游市场监测
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import AD_CHART from '../../utils/adCharts';
import 'antd/lib/grid/style';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AD_CHART.pieChart({
            chartId: 'pieChart',
            borderWidth: 6,
            borderColor: '#203a59',
            radius: ['35%', '55%'],
            legend: [{
                name: '旅游出行',
                icon: 'circle'
            },
            {
                name: '旅游住宿',
                icon: 'circle'
            },
            {
                name: '旅游餐饮',
                icon: 'circle'
            },
            {
                name: '旅游浏览',
                icon: 'circle'
            },
            {
                name: '旅游购物',
                icon: 'circle'
            },
            {
                name: '旅游娱乐',
                icon: 'circle'
            },
            {
                name: '旅游综合服务',
                icon: 'circle'
            }],
            data: [{
                value: 10,
                name: '旅游出行'
            },
            {
                value: 324,
                name: '旅游住宿'
            },
            {
                value: 438,
                name: '旅游餐饮'
            },
            {
                value: 23,
                name: '旅游浏览'
            },
            {
                value: 99,
                name: '旅游购物'
            },
            {
                value: 39,
                name: '旅游娱乐'
            },
            {
                value: 43,
                name: '旅游综合服务'
            }]
        });

        AD_CHART.barChart({
            chartId: 'companyBarChart',
            barWidth: '16',
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: '企业(家)',
            legend: ['存量企业', '增量企业'],
            legendIcon: 'circle',
            legendRight: '22',
            series: [[233, 322, 100, 200], [323, 323, 320, 330]]
        });

        AD_CHART.barChart({
            chartId: 'industryBarChart',
            barWidth: '14',
            row: true,
            xAxisLineShow: false,
            yAxisLineShow: false,
            xAxisLabelShow: false,
            yAxisData: ["投资总额".padEnd(22, ' '), "投资次数".padEnd(22, ' '), "迁移申请次数".padEnd(18, ' '), "搜索新闻结果数".padEnd(16, ' '), "分支机构开设数量".padEnd(14, ' '), "企业变更备案类别数".padEnd(12, ' '), "企业变更备案次数".padEnd(14, ' '), "经营状态指标".padEnd(18, ' ')],
            legend: ['行业活跃度指标详情'],
            legendShow: false,
            gridLeft: '5%',
            gridTop: 20,
            seriesLabelShow: true,
            series: [[95.32, 85.32, 95.23, 57.32, 95.32, 85.32, 95.23, 57.32]]
        })
    }

    render() {
        return <div className="market-monitor">
            <Row className="mb-20">
                <Col span={ 24 }>
                    <PanelCard title="旅游行业活跃度" zoomRequired={ false }>
                        <Row>
                            <Col span={ 12 } className="br-line" lg={ 24 } xl={ 12 }>
                                <div style={{ width: '100%', height: '100%'}}>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>
                                    地图地图地图地图地图地图<br/>

                                </div>
                            </Col>
                            <Col span={ 5 } className="br-line" lg={ 12 } xl={ 5 }>
                                <PanelCard title="四川省旅游行业活跃度" monthRequired={ false } zoomRequired={ false } className="custom-style">
                                    <ul className="ul-list">
                                        <li><label>活跃度:</label>90.76</li>
                                        <li><label>环比:</label>1.32%</li>
                                        <li><label>存量企业:</label>100</li>
                                        <li><label>增量企业:</label>200</li>
                                    </ul>
                                </PanelCard>
                                {/* 分隔线 */}
                                <div className="separate-line"></div>
                                <PanelCard title="分行业活跃度" monthRequired={ false } zoomRequired={ false } className="custom-style">
                                    <table className="mt-table mt-table-noborder col-1-al">
                                        <thead>
                                            <tr>
                                                <th className="pl-12">行业</th>
                                                <th>活跃度</th>
                                                <th>增速</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 100 }}>旅游出行</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>旅游住宿</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>旅游餐饮</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>旅游浏览</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>旅游购物</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </PanelCard>
                            </Col>
                            <Col span={ 7 } lg={ 12 } xl={ 7 }>
                                <PanelCard title="行业活跃度指标详情" monthRequired={ false } zoomRequired={ false }>
                                    <div id="industryBarChart" style={{ width: '100%', height: 400 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>
            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="省内旅游行业构成" className="bg-grey">
                        <div id="pieChart" style={{ height: 400, width: '100%'}}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="省内活跃度排行榜" className="bg-grey">
                        <table className="mt-table mt-table-noborder">
                            <thead>
                                <tr>
                                    <th>地区</th>
                                    <th>活跃度</th>
                                    <th>增速</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>成都</td>
                                    <td>96.5</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>德阳</td>
                                    <td>93</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>阿坝</td>
                                    <td>96.5</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>成都</td>
                                    <td>96.5</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>德阳</td>
                                    <td>93</td>
                                    <td>15%</td>
                                </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="省内涉旅企业数量变更" className="bg-grey">
                        <div id="companyBarChart" style={{ width: '100%', height: 400}}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="省内涉旅行业网络信息监控" className="bg-grey">
                        <ul>
                            <li>世界关注中国旅游指数</li>
                            <li>世界关注中国旅游指数</li>
                            <li>世界关注中国旅游指数</li>
                            <li>世界关注中国旅游指数</li>
                            <li>世界关注中国旅游指数</li>
                        </ul>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}