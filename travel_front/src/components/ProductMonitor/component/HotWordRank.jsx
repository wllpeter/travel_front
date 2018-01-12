/**
 * @description 产品热词排行榜
 */
import React, {Component} from 'react';
import {getKeyWordRank} from '../../../services/ProductMonitor/ProductData';
import PanelCard from '../../commonComponent/PanelCard';
import {dateFormat, getHeaderOptions} from '../../../utils/tools';

export default class HotWordRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: 1,
            year: null,
            month: null,
            panelProps: {},
            items: []
        };

    }

    componentDidMount() {
        this.getKeyWordRank();
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.classify;
        this.getHeaderOptions(times);
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.setState({
                productType: productType
            }, () => {
                this.getKeyWordRank();
            });
        }
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
                    this.setState({
                        year: year,
                        month: month
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

    render() {
        let {items, panelProps} = this.state;
        return <PanelCard title="产品热词搜索指数排行榜" {...panelProps}>
            <div className="product-down-map" style={{paddingTop: '40px'}}>
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
        </PanelCard>;
    }
}