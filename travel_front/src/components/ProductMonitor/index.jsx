/**
 * @description 旅游产品监测
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import {LEFT_NAV_DATA} from '../../constants/productMonitor/leftNav';
import ProductClassify from './component/ProductClassify';
import ProductEvaluate from './component/ProductEvaluate';
import Consumption from './component/Consumption';
import PraiseList from './component/PraiseList';
import HotWord from './component/HotWord';
import ProductPrice from './component/ProductPrice';
import HotWordRank from './component/HotWordRank';
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
                    <Col span={18} lg={ 16 } xl={ 18 }  >
                        <Row className="mb-20">
                            <Col span={1}></Col>
                            <Col span={8} lg={ 23 } xl={ 8 }>
                                <ProductClassify></ProductClassify>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={14} lg={ 23 } xl={ 14 }>
                                <ProductEvaluate></ProductEvaluate>
                            </Col>
                        </Row>
                        <Row className="mb-20">
                            <Col span={1}></Col>
                            <Col span={23}>
                                <Consumption></Consumption>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} lg={ 8 } xl={ 6 }  >
                        <Col span={24} className="product-praise">
                            <PanelCard title="旅游产品好评榜" zoomRequired={false} monthRequired={true}>
                                <PraiseList></PraiseList>
                            </PanelCard>
                        </Col>
                    </Col>
                    <Col span={6}  lg={ 8 } xl={ 6 }  className="product-down">
                        <HotWord></HotWord>
                    </Col>
                    <Col span={12} lg={ 16 } xl={ 12 } className="product-down">
                        <PanelCard title="旅游产品价格走势" zoomRequired={false} monthRequired={false}>
                            <ProductPrice></ProductPrice>
                        </PanelCard>
                    </Col>
                    <Col span={6} lg={ 8 } xl={ 6 }  className="product-down">
                        <PanelCard title="产品热词搜索指数排行榜" zoomRequired={true} monthRequired={true}>
                            <HotWordRank></HotWordRank>
                        </PanelCard>
                    </Col>
                </Row>
            </div>
        </div>;
    }
}