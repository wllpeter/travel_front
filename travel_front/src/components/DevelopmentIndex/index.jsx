/**
 * @description 旅游发展指数
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import DevelopmentIndexMap from './component/DevelopmentIndexMap';
import DevelopmentIndexRadar from './component/DevelopmentIndexRadar';
import RegionMap from './component/RegionMap';
import Economics from './component/Economics';
import ComfortDegree from './component/ComfortDegree';
import Reputation from './component/Reputation';
import Labor from './component/Labor';
import 'antd/lib/grid/style';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="developmentIndex">
            <Row className="mb-20">
                <Col span={6}>
                    <PanelCard title="指数雷达图" zoomRequired={false}>
                        <DevelopmentIndexRadar></DevelopmentIndexRadar>
                    </PanelCard>
                </Col>
                <Col span={12}>
                    <PanelCard title="旅游发展指数" zoomRequired={false} monthRequired={false}>
                        <DevelopmentIndexMap></DevelopmentIndexMap>
                    </PanelCard>
                </Col>
                <Col span={6}>
                    <PanelCard title="旅游创新度" zoomRequired={false}>
                        <RegionMap></RegionMap>
                    </PanelCard>
                </Col>
            </Row>
            <Row className="mb-20" style={{margin: 0}}>
                <Col span={6}>
                    <PanelCard className="map-card" title="旅游经济规模" zoomRequired={true}>
                        <Economics></Economics>
                    </PanelCard>
                </Col>
                <Col span={6}>
                    <PanelCard className="map-card" title="旅游舒适度" zoomRequired={true} monthRequired={false}>
                        <ComfortDegree></ComfortDegree>
                    </PanelCard>
                </Col>
                <Col span={6}>
                    <PanelCard className="map-card" title="旅游美誉度" zoomRequired={true} monthRequired={false}>
                        <Reputation></Reputation>
                    </PanelCard>
                </Col>
                <Col span={6}>
                    <PanelCard className="map-card" title="旅游劳动投入" zoomRequired={true}>
                        <Labor></Labor>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}