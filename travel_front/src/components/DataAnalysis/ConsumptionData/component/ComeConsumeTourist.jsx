/**
 * @description 入川高消费游客来源城市排名
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import PercentBar from '../../../commonComponent/PercentBar';
import Modal from '../../../commonComponent/Modal';
import {getComeConsumeTourist} from '../../../../services/ConsumptionData/consumptionData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class ComeConsumeTourist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            quarter: null,
            items: null,
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        let times = nextProps.timeRange.highSpendSourceArea;
        this.getHeaderOptions(times);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                isQuarter: true,
                zoomRequired: true,
                clickBack: (year, quarter) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + quarter;
                    this.setState({
                        year: year,
                        quarter: quarter,
                        panelProps
                    }, () => {
                        this.getComeConsumeTourist();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.getComeConsumeTourist();
        });
    }

    getComeConsumeTourist() {
        getComeConsumeTourist({
            year: this.state.year,
            quarter: this.state.quarter
        }).then((res) => {
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
        let {panelProps, items, visible} = this.state;
        return <div>
            <PanelCard title="入川高消费游客来源城市排名" {...panelProps}
                       enlarge={this.showModal.bind(this)} className="bg-grey consumption-down">
                <table className="mt-table mt-table-noborder w-95 mt-50">
                    <thead>
                    <tr>
                        <th>排名</th>
                        <th>来源城市</th>
                        <th>人数(万)</th>
                        <th>占比</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items && items.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.rank}</td>
                                <td>{item.city}</td>
                                <td>{item.personCount}</td>
                                <td><PercentBar percent={(item.ratio * 100).toFixed(2)}/></td>
                            </tr>;
                        })
                    }
                    </tbody>
                </table>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="入川高消费游客来源城市排名" {...panelProps}
                           className="bg-grey consumption-down" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <table className="mt-table mt-table-noborder w-95 mt-50">
                        <thead>
                        <tr>
                            <th>排名</th>
                            <th>来源城市</th>
                            <th>人数(万)</th>
                            <th>占比</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items && items.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.rank}</td>
                                    <td>{item.city}</td>
                                    <td>{item.personCount}</td>
                                    <td width="130"><PercentBar percent={(item.ratio * 100).toFixed(2)} strokeWidth={12}/></td>
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