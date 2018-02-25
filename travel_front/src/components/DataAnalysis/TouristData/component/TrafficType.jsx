/**
 * @description 五大经济区游客交通方式
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import {List} from 'immutable';
import adCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getZoneTouristTrafficType} from '../../../../services/DataAnalysis/touristData';
import {getHeaderOptions} from '../../../../utils/tools';

export default class TrafficType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touristTrafficTypes: List(),    // 游客交通方式
            visible: false,
            year: null,
            quarter: null,
            panelProps: null
        };
        this.trafficTypeSort = ['其他', '火车', '高铁', '飞机'];
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
        let times = nextProps.timeRange.trafficType;
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
                        this.fetchFiveZoneTrafficType();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.fetchFiveZoneTrafficType();
        });
    }

    /**
     * @description 获取五大经济区游客交通方式
     * @param params
     */
    fetchFiveZoneTrafficType() {
        getZoneTouristTrafficType({
            year: this.state.year,
            quarter: this.state.quarter
        }).then(resultData => {
            let trafficTypeSort = this.trafficTypeSort.slice();
            let trafficTypes = [];
            if (trafficTypeSort && trafficTypeSort.length) {
                while (trafficTypeSort && trafficTypeSort.length) {
                    for (let itemValue of Object.values(resultData)) {
                        let {data, traffic_type} = itemValue;
                        if (traffic_type === trafficTypeSort[0]) {
                            trafficTypes.push(data.map(item => Number((item.personTime / 10000).toFixed(2))));
                            trafficTypeSort.shift();
                            break;
                        }
                    }
                }
                this.setState(({touristTrafficTypes}) => ({
                    touristTrafficTypes: List(trafficTypes)
                }), () => {
                    this.renderTouristTrafficTypesData();
                    if (this.state.visible) {
                        this.renderTouristTrafficTypesData(true);
                    }
                });
            }
        });
    }

    /**
     * @description 游客交通方式
     */
    renderTouristTrafficTypesData(visible) {
        // 游客交通方式
        let ratio = visible ? 1 : sizeRatio;
        adCharts.barChart({
            chartId: visible ? 'touristTrafficWayBarChart2' : 'touristTrafficWayBarChart',
            legend: this.trafficTypeSort,
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            colors: ['#00a9ff', '#0dbbc7', '#32c889', '#b6dd74'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '20',
            legendItemGap: 10,
            gridLeft: (isSmallScreen && !visible) ?  '5%' : '10%',
            gridTop: 45,
            trigger: 'item',
            labelTextSize: visible ? 16 : 12,
            barWidth: (visible ? 20 : 14) * ratio,
            itemSize: visible ? 16 : 12,
            legendSize: (visible ? 16 : 12) * ratio,
            legendWidth: visible ? 12 : 8,
            legendHeight: visible ? 12 : 8,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: this.state.touristTrafficTypes.toArray(),
            sizeRatio: ratio
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
            <PanelCard title="五大经济区游客交通方式" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div id="touristTrafficWayBarChart" style={{width: '100%', height: 300 * sizeRatio}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchFiveZoneTrafficType.bind(this)();
            }}>
                <PanelCard className="map-card" title="五大经济区游客停留时长"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="touristTrafficWayBarChart2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}