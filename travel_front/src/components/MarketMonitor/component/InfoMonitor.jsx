/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import moment from 'moment';
import {option} from '../../../plugins/moment/momentOption';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';
import {getInternetMonitorData} from '../../../services/MarketMonitor/marketMonitor';

// 中文，防止布置到服务器上显示成英文
moment.defineLocale('zh-cn', option);

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
        return moment(time, 'YYYY-MM-DD h:mm:ss').fromNow();
    }

    render() {
        let {visible, items} = this.state;
        return <div>
            <PanelCard title="省内涉旅行业网络信息监控" className="bg-grey network-info" zoomRequired={true}
                       enlarge={this.showModal.bind(this)}>
                <div style={{height: 300 * sizeRatio}}>
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