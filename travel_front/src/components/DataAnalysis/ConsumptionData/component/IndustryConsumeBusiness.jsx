/**
 * @description 各行业刷卡消费商户排名
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import ToggleButtonGroup from '../../../commonComponent/ToggleButtonGroup';
import {getIndustryConsumeBusiness} from '../../../../services/ConsumptionData/consumptionData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class IndustryConsumeBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelProps: null,
            year: null,
            quarter: null,
            industry: '餐饮',
            items: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
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
                zoomRequired: true,
                clickBack: (year, quarter) => {
                    this.setState({
                        year: year,
                        quarter: quarter
                    }, () => {
                        this.getIndustryConsumeBusiness();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.getIndustryConsumeBusiness();
        });
    }

    getIndustryConsumeBusiness() {
        getIndustryConsumeBusiness({
            year: this.state.year,
            quarter: this.state.quarter,
            industry: this.state.industry
        }).then((res) => {
            this.setState({
                items: res
            });
        });
    }

    render() {
        let {panelProps, items} = this.state;
        const cardConsumption = {
            clickBack: (params) => {
                this.setState({
                    industry: params.buttonName
                }, () => {
                    this.getIndustryConsumeBusiness();
                });
            },
            buttons: [
                {
                    buttonName: '餐饮'
                },
                {
                    buttonName: '酒店'
                },
                {
                    buttonName: '娱乐'
                },
                {
                    buttonName: '零售'
                }
            ]
        };
        return <PanelCard {...panelProps} title="各行业刷卡消费商户排名" className="bg-grey card-consumption consumption-down">
            <ToggleButtonGroup {...cardConsumption}/>
            <table className="mt-table mt-table-noborder wrapper w-95 mt-50 ">
                <thead>
                <tr>
                    <th>排名</th>
                    <th>商户名称</th>
                    <th>平均单笔消费金额</th>
                    <th>刷卡总笔数</th>
                </tr>
                </thead>

                <tbody>
                {
                    items && items.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.businessName}</td>
                            <td>{item.avgSingleConsume}</td>
                            <td>{item.totalSwipeTimes}</td>
                        </tr>;
                    })
                }
                </tbody>
            </table>
        </PanelCard>;
    }
}