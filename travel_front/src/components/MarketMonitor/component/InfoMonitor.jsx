/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';
import {getInternetMonitorData} from '../../../services/MarketMonitor/marketMonitor';

export default class InfoMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: null
        };
    }

    componentDidMount() {
        this.getInternetMonitorData();
    }

    getInternetMonitorData() {
        getInternetMonitorData({
            page: 1,
            size: 100
        }).then(res => {
            this.setState({items: res});
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    // 时间处理
    handleTime(time) {
        if (!time) {
            return '';
        }
        let stamp = new Date(time).getTime();
        let nowStamp = new Date().getTime();
        let interval = nowStamp - stamp;
        if (interval < 60 * 1000) {
            return '刚刚';
        }
        if (interval < 60 * 1000 * 60) {
            return parseInt(interval / (60 * 1000)) + '分钟前';
        }
        if (interval < 60 * 1000 * 60 * 24) {
            return parseInt(interval / (60 * 1000 * 60)) + '小时前';
        }
        if (interval < 60 * 1000 * 60 * 24 * 30) {
            return parseInt(interval / (60 * 1000 * 60 * 24)) + '天前';
        }
        if (interval < 60 * 1000 * 60 * 24 * 30 * 12) {
            return parseInt(interval / (60 * 1000 * 60 * 24 * 30)) + '个月前';
        }
        return parseInt(interval / (60 * 1000 * 60 * 24 * 30 * 12)) + '年前';
    }

    render() {
        let {visible, items} = this.state;
        return <div>
            <PanelCard title="省内涉旅行业网络信息监控" className="bg-grey network-info" zoomRequired={true}
                       enlarge={this.showModal.bind(this)}>
                <div style={{height: 300}}>
                    <div style={{height: 270, overflow: 'hidden'}}>
                        <ul className="move">
                            {
                                items && items.map((item, index) => {
                                    return <li key={index}>
                                        <a href={item.url} target="_blank">{item.title}</a>
                                        <span className="info-time">{this.handleTime(item.timestamp)}</span>
                                    </li>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="省内旅游行业构成" className="bg-grey network-info network-big" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)}>
                    <div style={{height: 460, overflow: 'hidden'}}>
                        <ul className="move">
                            {
                                items && items.map((item, index) => {
                                    return <li key={index}>
                                        <a href={item.url} target="_blank">{item.title}</a>
                                        <span className="info-time">{this.handleTime(item.timestamp)}</span>
                                    </li>;
                                })
                            }
                        </ul>
                    </div>
                </PanelCard>
            </Modal>
        </div>;
    }
}