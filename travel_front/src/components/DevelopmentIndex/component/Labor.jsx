/**
 * @description 旅游劳动投入
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import {getLaborInputData} from '../../../services/DevelopmentIndex/development';
import {getHeaderOptions} from '../../../utils/tools';

export default class Reputation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            visible: false,
            year: null,
            month: null,
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.laborInput;
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
                timeSelectRequired: true,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.getLaborInputData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getLaborInputData();
        });
    }

    getLaborInputData() {
        getLaborInputData({
            year: this.state.year,
            month: this.state.month
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

    render() {
        let {visible, items, panelProps} = this.state;
        return <div>
            <PanelCard className="map-card" title="旅游劳动投入" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div className="dev-down-map" style={{padding: '0 20px', 'lineHeight': 2.2}}>
                    <table className="mt-table mt-table-noborder col-1-al">
                        <thead>
                        <tr>
                            <th className="pl-12 labor_td">地区</th>
                            <th>活跃指数</th>
                            <th>增速</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items && items.map((item, index) => {
                                return <tr key={index}>
                                    <td className="labor_td">{item.area}</td>
                                    <td>{item.laborInput}</td>
                                    <td>{(item.compare * 100).toFixed(2) + '%'}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard className="map-card" title="旅游劳动投入"  {...panelProps}
                           narrow={this.handleCancel.bind(this)} zoomOutRequired={true}>
                    <div className="dev-down-map labor-big" style={{padding: '0 20px'}} style={{'height': '460px'}}>
                        <table className="mt-table mt-table-noborder col-1-al table-big">
                            <thead>
                            <tr>
                                <th>地区</th>
                                <th>活跃指数</th>
                                <th>增速</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items && items.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.area}</td>
                                        <td>{item.laborInput}</td>
                                        <td>{(item.compare * 100).toFixed(2) + '%'}</td>
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