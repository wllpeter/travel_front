/**
 * @description 产品热词排行榜
 */
import React, {Component} from 'react';
import {getKeyWordRank} from '../../../services/ProductMonitor/ProductData';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import {dateFormat, getHeaderOptions} from '../../../utils/tools';

export default class HotWordRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            productType: 1,
            year: null,
            month: null,
            panelProps: {},
            items: []
        };

    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.setState({
                productType: productType
            });
        }
        let times = nextProps.timeRange.classify;
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
                        this.getKeyWordRank();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getKeyWordRank();
        });
    }

    getKeyWordRank() {
        getKeyWordRank({
            productType: this.state.productType,
            year: this.state.year,
            month: this.state.month
        }).then((res) => {
            this.setState({items: res});
        });
    }

    // 选择日期
    monthPickerChange(dateString) {
        this.setState({date: dateString}, () => {
            this.getKeyWordRank();
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
        let {items, panelProps, visible} = this.state;
        return <div>
            <PanelCard title="产品热词搜索指数排行榜" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div className="product-down-map" style={{lineHeight: 2.2}}>
                    <table className="mt-table col-1-al">
                        <thead>
                        <tr>
                            <th>排名</th>
                            <th>产品热词</th>
                            <th>搜索指数</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        {dateFormat(item.rank)}
                                    </td>
                                    <td>{item.keyword}</td>
                                    <td>{item.wholeIndex}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </PanelCard>
            <Modal visible={visible}>
                <PanelCard title="产品热词搜索指数排行榜" {...panelProps}
                           className="bg-grey" zoomOutRequired={true}
                           narrow={this.handleCancel.bind(this)} timeSelectRequired={true}>
                    <table className="mt-table col-1-al wordRank-big">
                        <thead>
                        <tr>
                            <th>排名</th>
                            <th>产品热词</th>
                            <th>搜索指数</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        {dateFormat(item.rank)}
                                    </td>
                                    <td>{item.keyword}</td>
                                    <td>{item.wholeIndex}</td>
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