/**
 * @description 五大经济区客游人次
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import {List} from 'immutable';
import adCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getZoneCustomerTimes} from '../../../../services/DataAnalysis/touristData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class FiveEconomicZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            quarter: null,
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
        let times = nextProps.timeRange.touristTimes;
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
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + quarter;
                    this.setState({
                        year: year,
                        quarter: quarter,
                        panelProps
                    }, () => {
                        this.fetchFiveZoneData();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.fetchFiveZoneData();
        });
    }

    /**
     * @description 获取五大经济区客游人次
     */
    fetchFiveZoneData() {
        getZoneCustomerTimes({
            year: this.state.year,
            quarter: this.state.quarter
        }).then(data => {
            let customerTimes = data;
            if (customerTimes && customerTimes.length) {
                let fiveZonePeopleData = customerTimes.map(time => time.personTimeView);
                this.setState(({fiveZonePeopleNumData}) => ({
                    fiveZonePeopleNumData: List(fiveZonePeopleData)
                }), () => {
                    this.renderFiveZonePeopleData();
                    if (this.state.visible) {
                        this.renderFiveZonePeopleData(true);
                    }
                });
            }
        });
    }

    /**
     * @description 五大经济区客游人次
     */
    renderFiveZonePeopleData(visible) {
        // 五大经济区客游人次
        adCharts.barChart({
            chartId: visible ? 'fiveEconomicZoneBarChart2' : 'fiveEconomicZoneBarChart',
            legend: ['五大经济区客游人次'],
            legendShow: false,
            title: '单位 : 万',
            titleRight: 28,
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            xAxisLineShow: false,
            xAxisLabelShow: false,
            yAxisLineShow: false,
            row: true,
            titleSize: visible ? 18 : 14,
            labelTextSize: visible ? 16 : 14,
            barWidth: visible ? 26 : 22,
            itemSize: visible ? 16 : 14,
            gridLeft: '5%',
            gridRight: '18%',
            seriesLabelShow: true,
            series: [this.state.fiveZonePeopleNumData.reverse().toArray()]
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
            <PanelCard title="五大经济区客游人次" className="bg-grey" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div id="fiveEconomicZoneBarChart" style={{width: '100%', height: 300}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchFiveZoneData.bind(this)();
            }}>
                <PanelCard className="map-card" title="旅游舒适度"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="fiveEconomicZoneBarChart2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}