import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {getSession, remove} from '../utils/storage';
import {Link} from 'react-router';
import {logOut} from '../services/Login/login';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: getSession('user').userName
        };
    }

    // 登出
    logOut() {
        logOut({}).then(() => {
            remove('user');
            hashHistory.push('/login');
        });
    }

    render() {
        let {userName} = this.state;
        return <div className="app-header">
            <h2><a>四川省旅游大数据分析平台</a></h2>
            {
                <div className="user-info">
                    <i className="iconfont icon-user"></i>
                    &nbsp;&nbsp;{userName}&nbsp;&nbsp;
                    <a onClick={this.logOut}>注销</a>
                </div>
            }
            <ul className="header-nav-list">
                <li><Link to="developmentIndex" activeClassName="active">旅游发展指数</Link></li>
                <li><Link to="marketMonitor" activeClassName="active">旅游市场监测</Link></li>
                <li><Link to="productMonitor" activeClassName="active">旅游产品监测</Link></li>
                <li className="pos-r">
                    <Link onClick={(e)=>{e.preventDefault();}} to="data" activeClassName="active">
                        旅游大数据分析&nbsp;<i className="iconfont icon-xiangxia"></i></Link>
                    <ul className="header-nav-sublist">
                        <Link to="data/touristData" activeClassName="active">客情大数据</Link>
                        <Link to="data/consumptionData" activeClassName="active">消费大数据</Link>
                        <Link to="data/searchData" activeClassName="active">搜索大数据</Link>
                    </ul>
                </li>
                <li><Link to="dataReport" activeClassName="active">旅游大数据报告</Link></li>
            </ul>
        </div>;
    }
}