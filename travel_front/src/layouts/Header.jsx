import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {getSession, remove} from '../utils/storage';
import {Link} from 'react-router';
import {logOut} from '../services/Login/login';
import Modal from '../components/commonComponent/Modal';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: getSession('user').userName,
            visible: false
        };
    }

    openLogOut(){
        this.setState({visible: true});
    }

    closeLogOut(){
        this.setState({visible: false});
    }

    // 登出
    logOut() {
        logOut({}).then(() => {
            remove('user');
            hashHistory.push('/login');
        });
    }

    render() {
        let {userName, visible} = this.state;
        return <div className="app-header">
            <h2><a className="app-logo"></a></h2>
            {
                <div className="user-info">
                    <i className="iconfont icon-user"></i>
                    &nbsp;&nbsp;{userName}&nbsp;&nbsp;
                    <a onClick={this.openLogOut.bind(this)}>注销</a>
                </div>
            }
            <ul className="header-nav-list">
                <li><Link to="developmentIndex" activeClassName="active">旅游发展指数</Link></li>
                <li><Link to="marketMonitor" activeClassName="active">旅游市场监测</Link></li>
                <li><Link to="productMonitor" activeClassName="active">旅游产品监测</Link></li>
                <li className="pos-r">
                    <Link onClick={(e) => {
                        e.preventDefault();
                    }} to="data" activeClassName="active">
                        旅游大数据分析&nbsp;<i className="iconfont icon-xiangxia"></i></Link>
                    <ul className="header-nav-sublist">
                        <Link to="data/touristData" activeClassName="active">客情大数据</Link>
                        <Link to="data/consumptionData" activeClassName="active">消费大数据</Link>
                        <Link to="data/searchData" activeClassName="active">搜索大数据</Link>
                    </ul>
                </li>
                <li><Link to="dataReport" activeClassName="active">旅游大数据报告</Link></li>
            </ul>
            <div className="logout-box">
                <Modal visible={visible}>
                    <div className="logout-content">
                        <i className="iconfont icon-close" onClick={this.closeLogOut.bind(this)}></i>
                        <p>是否退出登录？</p>
                        <div className="logout-btn">
                            <a className="logout-cancel" onClick={this.closeLogOut.bind(this)}>取消</a>
                            <a className="logout-confirm" onClick={this.logOut}>确定</a>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>;
    }
}