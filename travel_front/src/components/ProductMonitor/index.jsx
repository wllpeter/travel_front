/**
 * @description 旅游产品监测
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {LEFT_NAV_DATA, LEFT_NAV_NAME} from '../../constants/productMonitor/leftNav';
import ProductClassify from './component/ProductClassify';
import ProductEvaluate from './component/ProductEvaluate';
import Consumption from './component/Consumption';
import PraiseList from './component/PraiseList';
import HotWord from './component/HotWord';
import ProductPrice from './component/ProductPrice';
import HotWordRank from './component/HotWordRank';
import {productMonitorTime} from '../../services/ProductMonitor/ProductData';
import './style.scss';

export default class ProductMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: 1,
            timeRange: {},
            title: LEFT_NAV_NAME['1']
        };
    }

    componentDidMount() {
        productMonitorTime({}).then((res) => {
            this.setState({timeRange: res});
        });
    }

    // 点击左侧按钮切换不同类型
    chooseProductType(productType) {
        this.setState({
            productType: productType,
            title: LEFT_NAV_NAME[productType]
        });
    }

    render() {
        let {productType} = this.state;
        return <div className="productMonitor">
            {/* 左侧nav切换*/}
            <div className="left-nav-box">
                <ul className="left-nav">
                    {
                        LEFT_NAV_DATA.map((item, index) => {
                            return <li key={index} className={productType === item.productType ? 'active' : ''}
                                       onClick={() => {
                                           this.chooseProductType(item.productType);
                                       }}>
                                <i className={`iconfont ${item.icon}`}></i>
                                <p>{item.name}</p>
                            </li>;
                        })
                    }
                </ul>
            </div>
            <div className="product-container">
                <Row className="mb-20">
                    <Col span={18} lg={16} xl={18}>
                        <Row className="mb-20">
                            <Col span={1}></Col>
                            <Col span={8} lg={23} xl={8}>
                                <ProductClassify {...this.state}></ProductClassify>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={14} lg={23} xl={14}>
                                <ProductEvaluate {...this.state}></ProductEvaluate>
                            </Col>
                        </Row>
                        <Row className="mb-20">
                            <Col span={1}></Col>
                            <Col span={23}>
                                <Consumption {...this.state}></Consumption>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} lg={8} xl={6}>
                        <Col span={24} className="product-praise">
                            <PraiseList {...this.state}></PraiseList>
                        </Col>
                    </Col>
                    <Col span={6} lg={8} xl={6} className="product-down">
                        <HotWord {...this.state}></HotWord>
                    </Col>
                    <Col span={12} lg={16} xl={12} className="product-down">
                        <ProductPrice {...this.state}></ProductPrice>
                    </Col>
                    <Col span={6} lg={8} xl={6} className="product-down">
                        <HotWordRank {...this.state}></HotWordRank>
                    </Col>
                </Row>
            </div>
        </div>;
    }
}