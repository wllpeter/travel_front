/**
 * @description 省内活跃度排行榜
 */
import React, {Component} from 'react';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';
import {provinceActiveData} from '../../../services/MarketMonitor/marketMonitor';
import {getHeaderOptions} from '../../../utils/tools';

export default class ActiveRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            items: null,
            year: '2018',
            month: '01',
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.provinceActive;
        this.getHeaderOptions(times);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        if (this.state.panelProps) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                zoomRequired: true,
                timeSelectRequired: true,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.provinceActiveData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.provinceActiveData();
        });
    }

    provinceActiveData() {
        provinceActiveData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            this.setState({
                items: res
            });
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

    render() {
        let {visible, items, panelProps} = this.state;
        let getIncrease = (increase) => {
            return (increase * 100).toFixed(2);
        };
        return <div>
            <PanelCard title="省内活跃度排行榜" className="bg-grey" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div style={{height: 300 * sizeRatio, overflow: 'hidden'}}>
                    <table className="mt-table mt-table-noborder">
                        <thead>
                        <tr>
                            <th>地区</th>
                            <th>活跃度</th>
                            <th>增速</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items && items.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.area}</td>
                                    <td>{item.active}</td>
                                    <td>{getIncrease(item.increase)}%</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="省内活跃度排行榜" className="bg-grey"  {...panelProps}
                           narrow={this.handleCancel.bind(this)} zoomOutRequired={true}>
                    <table className="mt-table mt-table-noborder table-big">
                        <thead>
                        <tr>
                            <th>地区</th>
                            <th>活跃度</th>
                            <th>增速</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items && items.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.area}</td>
                                    <td>{item.active}</td>
                                    <td>{getIncrease(item.increase)}%</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </PanelCard>
            </Modal>
        </div>;
    }
}