/**
 * @description 入川高消费游客来源城市排名
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import PercentBar from '../../../commonComponent/PercentBar';
import {getComeConsumeTourist} from '../../../../services/ConsumptionData/consumptionData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class ComeConsumeTourist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            quarter: null,
            items: null
        };
    }

    componentWillReceiveProps(nextProps) {
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
                clickBack: (year, quarter) => {
                    this.setState({
                        year: year,
                        quarter: quarter
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

    render() {
        let {panelProps, items} = this.state;
        return <PanelCard title="入川高消费游客来源城市排名" {...panelProps} className="bg-grey consumption-down">
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
                    items && items.map((item, index)=>{
                        return <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.city}</td>
                            <td>{item.personCount}</td>
                            <td><PercentBar percent={~~item.ratio}/></td>
                        </tr>;
                    })
                }
                </tbody>
            </table>
        </PanelCard>;
    }
}