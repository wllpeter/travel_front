/**
 * @description 旅游产品好评榜
 */
import React, {Component} from 'react';
import {getOpinionRank} from '../../../services/ProductMonitor/ProductData';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import PanelCard from '../../commonComponent/PanelCard';
import {dateFormat, getHeaderOptions} from '../../../utils/tools';
import {PRAISELIST} from '../../../constants/productMonitor/switchButton';

export default class PraiseList extends Component {
    constructor(props) {
        super(props);
        let productType = this.props.productType;
        this.state = {
            panelProps: {},
            buttons: PRAISELIST[productType],
            productType: productType,
            dataType: 1, // 1-产品 2-景区 3-特产 4-商场
            year: null,
            month: null,
            items: []
        };
    }

    componentDidMount() {
        this.getOpinionRank();
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.resetButtonState();
            let buttons = PRAISELIST[productType];
            this.setState({
                buttons: buttons,
                dataType: buttons[0] ? buttons[0].dataType : 1,
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
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.getOpinionRank();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getOpinionRank();
        });
    }

    resetButtonState() {
        // 调用组件进行通信,重置按钮状态
        this.refs.getSwitchButton.resetButtonState();
    }

    getOpinionRank() {
        getOpinionRank({
            productType: this.state.productType,
            dataType: this.state.dataType,
            year: this.state.year,
            month: this.state.month
        }).then((res) => {
            this.setState({items: res});
        });
    }

    // 选择日期
    monthPickerChange(dateString) {
        this.setState({date: dateString}, () => {
            this.getOpinionRank();
        });
    }

    render() {
        let {items, buttons, panelProps} = this.state;
        let {title} = this.props;
        let switchProps = {
            buttons: buttons,
            style: {
                top: '-9%',
                right: '50%',
                transform: 'translateX(50%)'
            },
            clickBack: (params) => {
                this.setState({
                    dataType: params.dataType
                }, () => {
                    this.getOpinionRank();
                });
            }
        };

        let per = (num) => {
            if (num === undefined || num === '' || num === null) {
                return '-';
            }
            return num + '%';
        };

        return <div className="praise-box">
            <PanelCard title={`${title}产品好评榜`} {...panelProps}>
                <div className="switch-btn-box">
                    <ToggleButtonGroup ref="getSwitchButton" {...switchProps}></ToggleButtonGroup>
                    <div className="praise">
                        <table className="mt-table col-1-al">
                            <thead style={{paddingBottom: 20}}>
                            <tr>
                                <th>排名</th>
                                <th>名称</th>
                                <th>评分</th>
                                <th>环比</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items && items.length > 0 && items.map((item, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <span>{dateFormat(item.rank)}</span>
                                            <span style={{display: 'inline-block', width: 60}}>
                                            {
                                                ~~item.upDown === 1 ?
                                                    <span className="praise-icon praise-icon-up" title={item.changeNum}>
                                                <i className="iconfont icon-up"></i>
                                                        {item.changeNum > 999 ? '999+' : item.changeNum}
                                            </span> :
                                                    ~~item.upDown === 2 ?
                                                        <span className="praise-icon  praise-icon-down" title={Math.abs(item.changeNum || 0)}>
                                                <i className="iconfont icon-down"></i>
                                                            {Math.abs(item.changeNum || 0) > 999 ? '999+' : Math.abs(item.changeNum || 0)}
                                            </span> :
                                                        <span className="praise-icon">
                                                &nbsp;&nbsp;
                                                            <i className="iconfont">-</i>
                                                            &nbsp;&nbsp;
                                            </span>
                                            }
                                        </span>
                                        </td>
                                        <td className="scenic-name" title={item.name}>{item.name}</td>
                                        <td>{item.score}</td>
                                        <td>{per(item.compared)}</td>
                                    </tr>;
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </PanelCard>
        </div>;
    }
}