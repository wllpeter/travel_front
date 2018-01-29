/**
 * @description 搜索人群来源地
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import AdCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getHeaderOptions} from '../../../../utils/tools';
import {getSearchPersonAge, getSearchPersonSource} from '../../../../services/DataAnalysis/searchData';

export default class SearchPeopleAge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            month: null,
            panelProps: null
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
                        this.fetchSearchPersonAge();
                    });
                }
            }),

            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.fetchSearchPersonAge();
        });
    }

    // 搜索人群年龄分布
    fetchSearchPersonAge() {
        getSearchPersonAge({
            year: this.state.year,
            month: this.state.month
        }).then(data => {
            if (data && data.length) {
                let peopleAge = [];
                peopleAge = data.map(item => {
                    return {
                        name: item.ageZone,
                        value: ((item.ratio - 0) * 100).toFixed(2) - 0
                    };
                });

                this.setState({
                    peopleAge
                }, () => {
                    this.renderPersonAgeData();
                    if (this.state.visible) {
                        this.renderPersonAgeData(true);
                    }
                });
            }
        });
    }

    // 搜索人群年龄分布
    renderPersonAgeData(visible) {
        AdCharts.pieChart({
            chartId: visible ? 'searchPeopleAgePieChart2' : 'searchPeopleAgePieChart',
            legend: ['18以下', '18-24', '25-34', '35-44', '45-54', '55-64', '65以上'],
            legendIcon: 'circle',
            legendOrient: 'horizontal',
            legendLeft: '65%',
            borderWidth: 10,
            legendSize: visible ? 16 : 14,
            labelFontSize: visible ? 16 : 12,
            itemGap: 20,
            borderColor: '#203a59',
            data: this.state.peopleAge
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
        let {visible, panelProps} = this.state;
        return <div>
            <PanelCard title="搜索人群年龄分布" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div id="searchPeopleAgePieChart" style={{width: '100%', height: 300}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchSearchPersonAge.bind(this)();
            }}>
                <PanelCard className="map-card" title="搜索人群年龄分布"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="searchPeopleAgePieChart2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}