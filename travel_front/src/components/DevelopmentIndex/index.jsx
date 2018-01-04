/**
 * @description 旅游发展指数
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import DevelopmentIndexMap from './component/DevelopmentIndexMap';
import DevelopmentIndexRadar from './component/DevelopmentIndexRadar';
import 'antd/lib/grid/style';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="developmentIndex">
            <Row className="mb-20">
                <Col span={ 6 }>
                    <PanelCard  title="指数雷达图" zoomRequired={ false }>
                        <DevelopmentIndexRadar></DevelopmentIndexRadar>
                    </PanelCard>
                </Col>
                <Col span={ 12 }>
                    <PanelCard  title="旅游发展指数" zoomRequired={ false } monthRequired = {false}>
                        <DevelopmentIndexMap></DevelopmentIndexMap>
                    </PanelCard>
                </Col>
                <Col span={ 6 }>
                    <PanelCard  title="旅游创新度" zoomRequired={ false }>

                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}