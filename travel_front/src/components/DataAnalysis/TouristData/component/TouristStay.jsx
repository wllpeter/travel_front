/**
 * @description 五大经济区游客停留时长
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import {List} from 'immutable';
import adCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getZoneTouristResidentTime} from '../../../../services/DataAnalysis/touristData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class TouristStay extends Component {
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
        let times = nextProps.timeRange.stayTime;
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
                        this.fetchTouristDelayTime();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.fetchTouristDelayTime();
        });
    }

    /**
     * @description 获取五大经济区游客停留时长
     * @param params
     */
    fetchTouristDelayTime() {
        getZoneTouristResidentTime({
            year: this.state.year,
            quarter: this.state.quarter
        }).then(resultData => {
            if (resultData) {
                let delayTime = [];

                for (let value of Object.values(resultData)) {
                    delayTime.push(value.data.map(item => item.personCountView));
                }

                this.setState(({touristDelayTimeData}) => ({
                    touristDelayTimeData: List(delayTime)
                }), () => {
                    this.renderTouristDelayTimeData();
                    if (this.state.visible) {
                        this.renderTouristDelayTimeData(true);
                    }
                });
            }
        });
    }

    /**
     * @description 游客停留时长
     */
    renderTouristDelayTimeData(visible) {

        const {touristDelayTimeData} = this.state;

        // 游客停留时长
        adCharts.barChart({
            chartId: visible ? 'touristStayBarChart2' : 'touristStayBarChart',
            legend: ['0-12', '13-24', '25-48', '49-72', '73-96', '97-120', '121-144', '145-360', '360+'],
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            colors: ['#00a9ff', '#32c889', '#ddcf73', '#1b75d3', '#3559c5', '#5334c5', '#0dbbc7', '#b6dd74', '#9e35c5'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '10',
            legendItemGap: 10,
            gridTop: 45,
            labelTextSize: visible ? 16 : 12,
            barWidth: visible ? 20 : 14,
            itemSize: visible ? 16 : 12,
            legendSize: visible ? 16 : 12,
            legendWidth: visible ? 12 : 8,
            legendHeight: visible ? 12 : 8,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: touristDelayTimeData.toArray()
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
            <PanelCard title="游客停留时长" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div id="touristStayBarChart" style={{width: '100%', height: 300}}></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchTouristDelayTime.bind(this)();
            }}>
                <PanelCard className="map-card" title="游客停留时长"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="touristStayBarChart2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}