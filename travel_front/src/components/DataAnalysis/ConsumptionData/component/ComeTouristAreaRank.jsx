/**
 * @description 入川游客来源地排名
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
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
            items: null
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
                    this.setState({
                        year: year,
                        quarter: quarter
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

    render() {
        let {panelProps, items} = this.state;
        let sourcePlaceRank = {
            clickBack: (params) => {
                this.setState({type: params.buttonName}, () => {
                    this.getComeTouristAreaRank();
                });
            },
            buttons: [
                {
                    buttonName: '城市'
                },
                {
                    buttonName: '省份'
                }
            ]
        };
        return <PanelCard title="入川游客来源地排名" {...panelProps} className="bg-grey source-place-rank consumption-down">
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
        </PanelCard>;
    }
}