/**
 * @description 旅游产品监测
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import {LEFT_NAV_DATA} from '../../constants/productMonitor/leftNav';
import ProductClassify from './component/ProductClassify';
import ProductEvaluate from './component/ProductEvaluate';
import './style.scss';

export default class ProductMonitor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="productMonitor">
            {/* 左侧nav切换*/}
            <div className="left-nav-box">
                <ul className="left-nav">
                    {
                        LEFT_NAV_DATA.map((item, index) => {
                            return <li key={index} className={index === 0 ? 'active' : ''}>
                                <i className={`iconfont ${item.icon}`}></i>
                                <p>{item.name}</p>
                            </li>;
                        })
                    }
                </ul>
            </div>
            <div className="product-container">
                <Row className="mb-20">
                    <Col span={18}>
                        <Row className="mb-20">
                            <Col span={8}>
                                <PanelCard title="旅游产品分类" zoomRequired={false} monthRequired={true}>
                                    <ProductClassify></ProductClassify>
                                </PanelCard>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={15}>
                                <PanelCard title="旅游产品综合评价" zoomRequired={false} monthRequired={false}>
                                    <ProductEvaluate></ProductEvaluate>
                                </PanelCard>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <PanelCard title="旅游产品好评榜" zoomRequired={false} monthRequired={true}>

                        </PanelCard>
                    </Col>
                </Row>
            </div>
        </div>;
    }
}