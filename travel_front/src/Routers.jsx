import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import $ from 'jquery';

// App 入口
import App from './components/App';
// 登录
import Login from './components/Login';
// 旅游发展指数
import DevelopmentIndex from './components/DevelopmentIndex';
// 旅游市场监测
import MarketMonitor from './components/MarketMonitor';
// 旅游产品监测
import ProductMonitor from './components/ProductMonitor';
// 客情大数据(旅游大数据分析)
import TouristData from './components/DataAnalysis/TouristData/TouristData';
// 消费大数据(旅游大数据分析)
import ConsumptionData from './components/DataAnalysis/ConsumptionData/ConsumptionData';
// 搜索大数据(旅游大数据分析)
import SearchData from './components/DataAnalysis/SearchData/SearchData';
// 旅游大数据报告
import DataReport from './components/DataReport';

import {clear, getSession} from './utils/storage';

class Routers extends Component {
    constructor(props) {
        super(props);
    }

    // 清除用户信息
    clearAll = () => {
    };

    enterPath(nextPath){
        let dataSession = getSession('user');
        let userId = dataSession ? dataSession.userId : ''; // 用户id 判断是否登录
        if(userId === ''){
            browserHistory.push('/app/login');
        }
        $('body').scrollTop(0);
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/app/login" component={Login} onEnter={this.clearAll}/>
                <Route path="/" component={App}>
                    <IndexRedirect to="app/developmentIndex" />
                    <Route path="app/developmentIndex" component={DevelopmentIndex} onEnter={this.enterPath}/>
                    <Route path="app/marketMonitor" component={MarketMonitor} onEnter={this.enterPath}/>
                    <Route path="app/productMonitor" component={ProductMonitor} onEnter={this.enterPath}/>
                    <Route path="app/data">
                        <Route path="touristData" component={TouristData} onEnter={this.enterPath}/>
                        <Route path="consumptionData" component={ConsumptionData} onEnter={this.enterPath}/>
                        <Route path="searchData" component={SearchData} onEnter={this.enterPath}/>
                    </Route>
                    <Route path="app/dataReport" component={DataReport} onEnter={this.enterPath}/>
                </Route>
            </Router>
        );
    }
}

export default Routers;