/**
 * @description 搜索大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import { Row, Col } from 'antd';
import AdCharts from '../../utils/adCharts';
import 'antd/lib/grid/style';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AdCharts.pieChart({
            chartId: 'searchPeopleAgePieChart',

        })
    }

    render() {
        return <div className="tourist-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="全省旅游搜索热力图" zoomRequired={ false }>

                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="全省旅游搜索热度趋势" zoomRequired={ false }>

                    </PanelCard>
                </Col>
            </Row>

            <Row>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索关注热词云">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索人群来源地">

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索景点偏好地">
                        <table className="mt-table mt-table-noborder w-95 mt-50">
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>景区</th>
                                    <th>占比</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>九寨沟</td>
                                    <td>30%</td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>峨眉山</td>
                                    <td>28%</td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>青城山-都江堰</td>
                                    <td>23%</td>
                                </tr>
                                <tr>
                                    <td>04</td>
                                    <td>西岭雪山</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>05</td>
                                    <td>稻城亚山</td>
                                    <td>18%</td>
                                </tr>
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索人群年龄分布">
                        <div className="searchPeopleAgePieChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}