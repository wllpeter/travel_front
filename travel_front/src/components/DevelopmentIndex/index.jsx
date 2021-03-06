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
import echarts from 'echarts';

let indexMap = null;
let radarMap = null;

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeRange: {}
        };
    }

    componentDidMount() {
        indexMap = null;
        radarMap = null;
        getTravelDevData().then(res => {
            this.setState({timeRange: res});
        });
    }

    getIndexMap(mychart) {
        indexMap = mychart;
        indexMap.on('legendselectchanged', function (params) {
            let legendName = params.name;
            let fn = () => {
                if (radarMap) {
                    radarMap.dispatchAction({
                        type: 'legendToggleSelect',
                        name: legendName
                    });
                } else {
                    setTimeout(() => {
                        fn();
                    }, 200);
                }
            };
            fn();
        });
    }

    getRadarMap(mychart) {
        radarMap = mychart;
    }

    render() {
        return <div className="developmentIndex">
            <Row className="mb-20">
                <Col span={6}  xl={6}>
                    <DevelopmentIndexRadar {...this.state} getRadarMap={this.getRadarMap.bind(this)}/>
                </Col>
                <Col span={12}  xl={12}>
                    <DevelopmentIndexMap getIndexMap={this.getIndexMap.bind(this)}/>
                </Col>
                <Col span={6}  xl={6}>
                    <RegionMap {...this.state}/>
                </Col>
            </Row>
            <Row className="mb-20" style={{margin: 0}}>
                <Col span={6}  xl={6}>
                    <Economics/>
                </Col>
                <Col span={6}  xl={6}>
                    <ComfortDegree/>
                </Col>
                <Col span={6}  xl={6}>
                    <Reputation/>
                </Col>
                <Col span={6}  xl={6}>
                    <Labor {...this.state}/>
                </Col>
            </Row>
        </div>;
    }
}