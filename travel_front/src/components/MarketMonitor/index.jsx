/**
 * @description 旅游市场监测
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import AD_CHART from '../../utils/adCharts';
import IndustryComposition from './component/IndustryComposition';
import ActiveRank from './component/ActiveRank';
import EnterprisesNumber from './component/EnterprisesNumber';
import InfoMonitor from './component/InfoMonitor';
import 'antd/lib/grid/style';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            industryActiveness: {
                province: {
                    mapTypeName: '四川省区域',
                    seriesData: [
                        {
                            name: '川西北经济区',
                            value: 220,
                        },
                        {
                            name: '成都平原经济区',
                            value: 330,
                        },
                        {
                            name: '川东北经济区',
                            value: 440,
                        },
                        {
                            name: '川南经济区',
                            value: 110,
                        },
                        {
                            name: '攀西经济区',
                            value: 430,
                        }
                    ]
                },
                economicZone: {
                    mapTypeName: '成都平原经济区',
                    seriesData: [
                        {
                            name: '成都市',
                            value: 220,
                        },
                        {
                            name: '德阳市',
                            value: 330,
                        },
                        {
                            name: '绵阳市',
                            value: 440,
                        },
                        {
                            name: '遂宁市',
                            value: 110,
                        },
                        {
                            name: '资阳市',
                            value: 430,
                        },
                        {
                            name: '雅安市',
                            value: 320,
                        },
                        {
                            name: '眉山市',
                            value: 120,
                        },
                        {
                            name: '乐山市',
                            value: 490,
                        }
                    ]
                },
                city: {
                    mapTypeName: '成都市',
                    seriesData: []
                }

            }
        };
    }

    // 地图选中回调
    mapCallback(params) {
        console.log('----params-----:', params);
        const { economicZone } = this.state.industryActiveness;

        this.renderMapLevelChart(economicZone.mapTypeName, economicZone.seriesData)
    }

    componentDidMount() {
        // 旅游行业活跃度
        const { province } = this.state.industryActiveness;

        this.renderMapLevelChart(province.mapTypeName, province.seriesData);

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
            gridBottom: 0,
            gridRight: 50,
            seriesLabelShow: true,
            series: [[95.32, 85.32, 95.23, 57.32, 95.32, 85.32, 95.23, 57.32]]
        })
    }

    // 渲染纵深层级地图
    renderMapLevelChart(mapTypeName, seriesData) {
        AD_CHART.mapLevelChart({
            chartId: 'mapChart',
            mapTypeName: mapTypeName,
            legend: ['旅游行业活跃度'],
            series: [seriesData]
        }, this.mapCallback.bind(this) );
    }

    render() {
        return <div className="market-monitor">
            <Row className="mb-20">
                <Col span={ 24 }>
                    <PanelCard title="旅游行业活跃度" zoomRequired={ false }>
                        <Row>
                            <Col span={ 12 } className="br-line" lg={24} xl={12}>
                                <div id="mapChart" style={{ width: '100%', height: 600 }}>
                                    <ul className="map-breadcrumb">
                                        <li><a>四川省</a></li>
                                        <li><a>成都平原经济区</a></li>
                                        <li><a>成都市</a></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col span={ 5 } className="br-line" lg={ 12 } xl={ 5 }>
                                <PanelCard title="四川省旅游行业活跃度" timeSelectRequired={ false } zoomRequired={ false } className="custom-style">
                                    <ul className="ul-list">
                                        <li><label>活跃度:</label>90.76</li>
                                        <li><label>环比:</label>1.32%</li>
                                        <li><label>存量企业:</label>100</li>
                                        <li><label>增量企业:</label>200</li>
                                    </ul>
                                </PanelCard>
                                {/* 分隔线 */}
                                <div className="separate-line"></div>
                                <PanelCard title="分行业活跃度" timeSelectRequired={ false } zoomRequired={ false } className="custom-style">
                                    <table className="mt-table mt-table-noborder col-1-al">
                                        <thead>
                                            <tr>
                                                <th className="pl-23">行业</th>
                                                <th>活跃度</th>
                                                <th>增速</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 120 }}>旅游出行</td>
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
                                            <tr>
                                                <td>旅游娱乐</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                            <tr>
                                                <td>旅游综合服务</td>
                                                <td>96.5</td>
                                                <td>15%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </PanelCard>
                            </Col>
                            <Col span={ 7 } lg={ 12 } xl={ 7 }>
                                <PanelCard title="行业活跃度指标详情" timeSelectRequired={ false } zoomRequired={ false }>
                                    <div id="industryBarChart" style={{ width: '100%', height: 535 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>
            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <IndustryComposition/>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <ActiveRank/>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <EnterprisesNumber/>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <InfoMonitor/>
                </Col>
            </Row>
        </div>;
    }
}