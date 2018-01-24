/**
 * @description 入川游客来源地排名
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import Modal from '../../../commonComponent/Modal';
import PercentBar from '../../../commonComponent/PercentBar';
import ToggleButtonGroup from '../../../commonComponent/ToggleButtonGroup';
import {getComeTouristAreaRank} from '../../../../services/ConsumptionData/consumptionData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class ComeTouristAreaRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            quarter: null,
            type: '城市',
            items: null,
            visible: false,
            activeIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        let times = nextProps.timeRange.sourceArea;
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
                        this.getComeTouristAreaRank();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.getComeTouristAreaRank();
        });
    }

    getComeTouristAreaRank() {
        getComeTouristAreaRank({
            year: this.state.year,
            quarter: this.state.quarter,
            type: this.state.type
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
        let {panelProps, items, visible, activeIndex} = this.state;
        let sourcePlaceRank = {
            clickBack: (params) => {
                this.setState({
                    type: params.buttonName,
                    activeIndex: params.index
                }, () => {
                    this.getComeTouristAreaRank();
                });
            },
            activeIndex: activeIndex,
            buttons: [
                {
                    buttonName: '城市'
                },
                {
                    buttonName: '省份'
                }
            ]
        };
        let style = {
            top: '60px'
        }
        return <div>
            <PanelCard title="入川游客来源地排名" {...panelProps} enlarge={this.showModal.bind(this)}
                       className="bg-grey source-place-rank consumption-down">
                <ToggleButtonGroup {...sourcePlaceRank}/>
                <table className="mt-table mt-table-noborder wrapper w-95 mt-50">
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
                                <td>{item.area}</td>
                                <td>{item.personTimes}</td>
                                <td><PercentBar percent={~~item.ratio}/></td>
                            </tr>;
                        })
                    }
                    </tbody>
                </table>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="入川游客来源地排名" {...panelProps}
                           className="bg-grey consumption-down" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <ToggleButtonGroup {...sourcePlaceRank} style={style}/>
                    <table className="mt-table mt-table-noborder wrapper w-95 mt-50">
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
                                    <td>{item.area}</td>
                                    <td>{item.personTimes}</td>
                                    <td><PercentBar percent={~~item.ratio}/></td>
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