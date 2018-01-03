import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="app-header">
            <h2><a>四川省旅游大数据分析平台</a></h2>
            <ul className="header-nav-list">
                <li><Link to="developmentIndex" activeClassName="active">旅游发展指数</Link></li>
                <li><Link to="marketMonitor" activeClassName="active">旅游市场监测</Link></li>
                <li><Link to="productMonitor" activeClassName="active">旅游产品监测</Link></li>
                <li className="pos-r">
                    <a>旅游大数据分析</a>
                    <ul className="header-nav-sublist">
                        <Link to="touristData" activeClassName="active">客情大数据</Link>
                        <Link to="consumptionData" activeClassName="active">消费大数据</Link>
                        <Link to="searchData" activeClassName="active">搜索大数据</Link>
                    </ul>
                </li>
                <li><Link to="dataReport" activeClassName="active">旅游大数据报告</Link></li>
            </ul>

            <div className="user-info">
                <i className="iconfont icon-user"></i>
                    &nbsp;&nbsp;admin&nbsp;&nbsp;
                <a>注销</a>
            </div>
        </div>;
    }
}