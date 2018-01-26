/**
 * @description 旅游发展指数
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import DevelopmentIndexMap from './component/DevelopmentIndexMap';
import DevelopmentIndexRadar from './component/DevelopmentIndexRadar';
import RegionMap from './component/RegionMap';
import Economics from './component/Economics';
import ComfortDegree from './component/ComfortDegree';
import Reputation from './component/Reputation';
import Labor from './component/Labor';
import {getTravelDevData} from '../../services/DevelopmentIndex/development';
import 'antd/lib/grid/style';
import './style.scss';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRange: {}
        };
    }

    componentDidMount() {
        getTravelDevData().then(res => {
            this.setState({timeRange: res});
        });
    }

    render() {
        return <div className="developmentIndex">
            <Row className="mb-20">
                <Col span={6} lg={8} xl={6}>
                    <DevelopmentIndexRadar {...this.state}/>
                </Col>
                <Col span={12} lg={16} xl={12}>
                    <DevelopmentIndexMap/>
                </Col>
                <Col span={6} lg={24} xl={6}>
                    <RegionMap {...this.state}/>
                </Col>
            </Row>
            <Row className="mb-20" style={{margin: 0}}>
                <Col span={6} lg={12} xl={6}>
                    <Economics/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <ComfortDegree/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <Reputation/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <Labor {...this.state}/>
                </Col>
            </Row>
        </div>;
    }
}