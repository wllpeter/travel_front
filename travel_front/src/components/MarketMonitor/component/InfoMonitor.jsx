/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';

export default class InfoMonitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {

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

    render() {
        let {visible} = this.state;
        return <div>
            <PanelCard title="省内涉旅行业网络信息监控" className="bg-grey network-info" zoomRequired={true}
                       enlarge={this.showModal.bind(this)} timeSelectRequired={true}>
                <ul style={{ height: 300 }}>
                    <li><a href="#">世界关注中国旅游指数</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">江苏旅游局携手途牛共推"水韵江苏"旅游新产品</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">航班酒店订单取消 &nbsp; 火山喷发冲击印尼旅游业</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">延吉市积极探索本地化"互联网+旅游"发展模式</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">50条冬季京郊旅游线路推出</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">我国将在2020年前培育100家国家工业旅游示范基地</a><span className="info-time">1分钟前</span></li>
                    <li><a href="#">江苏旅游局携手途牛共推"水韵江苏"旅游新产品</a><span className="info-time">1分钟前</span></li>
                </ul>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="省内旅游行业构成" className="bg-grey network-info network-big" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <ul style={{ height: 460 }}>
                        <li><a href="#">世界关注中国旅游指数</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">江苏旅游局携手途牛共推"水韵江苏"旅游新产品</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">航班酒店订单取消 &nbsp; 火山喷发冲击印尼旅游业</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">延吉市积极探索本地化"互联网+旅游"发展模式</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">50条冬季京郊旅游线路推出</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">我国将在2020年前培育100家国家工业旅游示范基地</a><span className="info-time">1分钟前</span></li>
                        <li><a href="#">江苏旅游局携手途牛共推"水韵江苏"旅游新产品</a><span className="info-time">1分钟前</span></li>
                    </ul>
                </PanelCard>
            </Modal>
        </div>;
    }
}