/**
 * @description 旅游产品好评榜
 */
import React, {Component} from 'react';
import {getOpinionRank} from '../../../services/ProductMonitor/ProductData';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import PanelCard from '../../commonComponent/PanelCard';
import {dateFormat} from '../../../utils/tools';

export default class PraiseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: 1,
            dataType: 1, // 1-产品 2-景区 3-特产 4-商场
            date: '2017-09',
            items: []
        };
    }

    componentDidMount() {
        this.getOpinionRank();
    }

    getOpinionRank() {
        getOpinionRank({
            productType: this.state.productType,
            dataType: this.state.dataType,
            date: this.state.date
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
        let {items} = this.state;
        let switchProps = {
            buttons: [
                {buttonName: '产品', dataType: 1},
                {buttonName: '景区', dataType: 2}
            ],
            style: {
                top: '-5%',
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

        let panelProps = {
            monthPickerChange: this.monthPickerChange.bind(this),
            defaultValue: this.state.date
        };
        return <PanelCard title="旅游产品好评榜" zoomRequired={false} monthRequired={true}
                          {...panelProps}>
            <div className="switch-btn-box">
                <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
                <div className="praise">
                    <table className="mt-table col-1-al">
                        <thead>
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
                                        {dateFormat(item.rank)}
                                        {
                                            ~~item.upDown === 1 ?
                                                <span className="praise-icon praise-icon-up">
                                                <i className="iconfont icon-up"></i>
                                                    {item.changeNum}
                                            </span> :
                                                ~~item.upDown === 2 ?
                                                    <span className="praise-icon  praise-icon-down">
                                                <i className="iconfont icon-down"></i>
                                                        {item.changeNum}
                                            </span> :
                                                    <span className="praise-icon">
                                                &nbsp;&nbsp;
                                                        <i className="iconfont">-</i>
                                                        &nbsp;&nbsp;
                                            </span>
                                        }

                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                    <td>{item.compared + '%'}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </PanelCard>;
    }
}