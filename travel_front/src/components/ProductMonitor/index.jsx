/**
 * @description 旅游产品监测
 */
import React, {Component} from 'react';
import {LEFT_NAV_DATA} from '../../constants/productMonitor/leftNav';
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
                            return <li key={index} className={index === 3 ? 'active' : ''}>
                                <i className={`iconfont ${item.icon}`}></i>
                                <p>{item.name}</p>
                            </li>;
                        })
                    }
                </ul>
            </div>
            <div className="product-container"></div>
        </div>;
    }
}