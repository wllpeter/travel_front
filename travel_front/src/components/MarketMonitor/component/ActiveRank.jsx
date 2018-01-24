/**
 * @description 省内活跃度排行榜
 */
import React, {Component} from 'react';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';

export default class ActiveRank extends Component {
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
            <PanelCard title="省内活跃度排行榜" className="bg-grey" zoomRequired={true}
                       enlarge={this.showModal.bind(this)} timeSelectRequired={true}>
                <table className="mt-table mt-table-noborder" style={{ height: 280 }}>
                    <thead>
                    <tr>
                        <th>地区</th>
                        <th>活跃度</th>
                        <th>增速</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>成都</td>
                        <td>96.5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>德阳</td>
                        <td>93</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>阿坝</td>
                        <td>96.5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>成都</td>
                        <td>96.5</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>德阳</td>
                        <td>93</td>
                        <td>15%</td>
                    </tr>
                    </tbody>
                </table>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="省内活跃度排行榜" className="bg-grey" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <table className="mt-table mt-table-noborder table-big">
                        <thead>
                        <tr>
                            <th>地区</th>
                            <th>活跃度</th>
                            <th>增速</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>成都</td>
                            <td>96.5</td>
                            <td>15%</td>
                        </tr>
                        <tr>
                            <td>德阳</td>
                            <td>93</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>阿坝</td>
                            <td>96.5</td>
                            <td>15%</td>
                        </tr>
                        <tr>
                            <td>成都</td>
                            <td>96.5</td>
                            <td>15%</td>
                        </tr>
                        <tr>
                            <td>德阳</td>
                            <td>93</td>
                            <td>15%</td>
                        </tr>
                        </tbody>
                    </table>
                </PanelCard>
            </Modal>
        </div>;
    }
}