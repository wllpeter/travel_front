import React, { Component } from 'react';
import { Router, Route } from 'react-router';

// App 入口
import App from './components/App';
// 旅游发展指数
import DevelopmentIndex from './components/DevelopmentIndex';
// 旅游市场监测
import MarketMonitor from './components/MarketMonitor';
// 旅游产品监测
import ProductMonitor from './components/ProductMonitor';
// 客情大数据(旅游大数据分析)
import TouristData from './components/DataAnalysis/TouristData';
// 消费大数据(旅游大数据分析)
import ConsumptionData from './components/DataAnalysis/ConsumptionData/ConsumptionData';
// 搜索大数据(旅游大数据分析)
import SearchData from './components/DataAnalysis/SearchData';
// 旅游大数据报告
import DataReport from './components/DataReport';

import { clear } from './utils/storage';

class Routers extends Component {
    constructor(props) {
        super(props);
    }

    // 清除用户信息
    clearAll = () => {
        clear();
    }

    render() {
        return (
            <Router history={ this.props.history }>
                <Route path="/login" onEnter={ this.clearAll }/>
                <Route path="/" component={ App }>
                    <Route path="developmentIndex" component={ DevelopmentIndex }/>
                    <Route path="marketMonitor" component={ MarketMonitor }/>
                    <Route path="productMonitor" component={ ProductMonitor }/>
                    <Route path="touristData" component={ TouristData }/>
                    <Route path="consumptionData" component={ ConsumptionData }/>
                    <Route path="searchData" component={ SearchData }/>
                    <Route path="dataReport" component={ DataReport }/>
                </Route>

            </Router>
        );
    }
}

export default Routers;