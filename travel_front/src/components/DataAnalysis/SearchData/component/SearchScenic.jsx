/**
 * @description 搜索景点偏好地
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import Modal from '../../../commonComponent/Modal';
import {getHeaderOptions} from '../../../../utils/tools';
import {getSearchPreferenceArea} from '../../../../services/DataAnalysis/searchData';

export default class SearchScenic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            month: null,
            panelProps: null,
            preferenceArea: null
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
        let times = nextProps.timeRange.month;
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
                zoomRequired: true,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.fetchSearchPreferenceArea();
                    });
                }
            }),

            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.fetchSearchPreferenceArea();
        });
    }

    // 获取景点偏好地
    fetchSearchPreferenceArea() {
        getSearchPreferenceArea({
            year: this.state.year,
            month: this.state.month
        }).then(data => {
            if (data && data.length) {
                this.setState({
                    preferenceArea: data
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
        let {visible, panelProps, preferenceArea} = this.state;
        return <div>
            <PanelCard title="搜索景点偏好地" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div style={{height: 300 * sizeRatio, overflow: 'hidden'}}>
                    <table className="mt-table mt-table-noborder w-95 mb-34">
                        <thead>
                        <tr>
                            <th>排名</th>
                            <th>景区</th>
                            <th>占比</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (preferenceArea && preferenceArea.length > 0) && preferenceArea.map((area, index) => {
                                return <tr key={index}>
                                    <td>{'0' + (index + 1)}</td>
                                    <td>{area.name}</td>
                                    <td>{Number((area.ratio - 0) * 100).toFixed(2) + '%'}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchSearchPreferenceArea.bind(this)();
            }}>
                <PanelCard className="map-card " title="搜索景点偏好地"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div style={{height: 460, overflow: 'hidden'}}>
                        <table className="mt-table mt-table-noborder w-95 mb-34 table-big">
                            <thead>
                            <tr>
                                <th>排名</th>
                                <th>景区</th>
                                <th>占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (preferenceArea && preferenceArea.length > 0) && preferenceArea.map((area, index) => {
                                    return <tr key={index}>
                                        <td>{'0' + (index + 1)}</td>
                                        <td>{area.name}</td>
                                        <td>{Number((area.ratio - 0) * 100).toFixed(2) + '%'}</td>
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