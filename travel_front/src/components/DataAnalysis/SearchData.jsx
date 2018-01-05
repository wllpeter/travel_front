/**
 * @description 搜索大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import { Row, Col } from 'antd';
import 'antd/lib/grid/style';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
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

                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="搜索人群年龄分布">

                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}