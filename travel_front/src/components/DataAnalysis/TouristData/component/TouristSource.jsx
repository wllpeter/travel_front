/**
 * @description 五大经济区游客来源排名
 */
import React, {Component} from 'react';
import {Select} from 'mtui/index';
import PanelCard from '../../../commonComponent/PanelCard';
import Modal from '../../../commonComponent/Modal';
import {getZoneTouristResourceRank} from '../../../../services/DataAnalysis/touristData';
import {getHeaderOptions} from '../../../../utils/tools';

const Option = Select.Option;

export default class TouristSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            quarter: null,
            panelProps: null,
            peopleSourceRank: {},
            economicZoneSelected: 'CHENG_DU'        // 默认选择的是成都平原经济区
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        if (this.state.panelProps) {
            return;
        }
        let times = nextProps.timeRange.touristRank;
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
                        this.fetchFiveZoneTouristRank();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.fetchFiveZoneTouristRank();
        });
    }

    /**
     * @description 获取五大经济区游客来源排名
     * @param params
     */
    fetchFiveZoneTouristRank() {
        getZoneTouristResourceRank({
            year: this.state.year,
            quarter: this.state.quarter
        }).then(data => {
            if (data) {
                this.setState({
                    peopleSourceRank: data
                });
            }
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
        let {visible, panelProps, peopleSourceRank, economicZoneSelected} = this.state;
        const economicZone = [
            {
                name: '成都平原经济区',
                value: 'CHENG_DU'
            },
            {
                name: '川南经济区',
                value: 'CHUAN_NAN'
            },
            {
                name: '川东北经济区',
                value: 'CHUAN_DONG'
            },
            {
                name: '攀西经济区',
                value: 'PAN_XI'
            },
            {
                name: '川西北生态经济区',
                value: 'CHUAN_XI'
            }
        ];
        return <div>
            <PanelCard title="五大经济区游客来源排名" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <Select trigger="click" className="economic-zone" value={economicZoneSelected}
                        onChange={(e) => {
                            this.setState({economicZoneSelected: e.target.value});
                        }}>
                    {
                        economicZone.map((zone, index) => {
                            return <Option value={zone.value} key={index}>{zone.name}</Option>;
                        })
                    }
                </Select>
                <div style={{height: 300 * sizeRatio, overflow: 'hidden'}}>
                    <table className="mt-table mt-table-noborder col-1-al" style={{height: 280 * sizeRatio}}>
                        <thead>
                        <tr>
                            <th className="pl-12">排名</th>
                            <th>省份</th>
                            <th>游客量(万)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (peopleSourceRank[economicZoneSelected] && peopleSourceRank[economicZoneSelected].data) &&
                            peopleSourceRank[economicZoneSelected].data.map((rank, index) => {
                                return <tr key={index}>
                                    <td>{'0' + (index + 1)}</td>
                                    <td>{rank.resourceProvince || '--'}</td>
                                    <td>{rank.personCountView || '--'}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchFiveZoneTouristRank.bind(this)();
            }}>
                <PanelCard title="五大经济区游客来源排名"
                           className="bg-grey" zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <Select trigger="click" className="economic-zone"
                            style={{marginTop: 15}}
                            value={economicZoneSelected}
                            onChange={(e) => {
                                this.setState({economicZoneSelected: e.target.value});
                            }}>
                        {
                            economicZone.map((zone, index) => {
                                return <Option value={zone.value} key={index}>{zone.name}</Option>;
                            })
                        }
                    </Select>
                    <div style={{height: 460, overflow: 'hidden'}}>
                        <table className="mt-table mt-table-noborder col-1-al table-big" style={{height: 280}}>
                            <thead>
                            <tr>
                                <th className="pl-12">排名</th>
                                <th>省份</th>
                                <th>游客量(万)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (peopleSourceRank[economicZoneSelected] && peopleSourceRank[economicZoneSelected].data) &&
                                peopleSourceRank[economicZoneSelected].data.map((rank, index) => {
                                    return <tr key={index}>
                                        <td>{'0' + (index + 1)}</td>
                                        <td>{rank.resourceProvince || '--'}</td>
                                        <td>{rank.personCountView || '--'}</td>
                                    </tr>;
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </PanelCard>
            </Modal>
        </div>;
    }
}