/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import AD_CHART from '../../../utils/adCharts';
import {getProvinceChangeData} from '../../../services/MarketMonitor/marketMonitor';
import {getHeaderOptions} from '../../../utils/tools';

export default class EnterprisesNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: '2017',
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.provinceChange;
        this.getHeaderOptions(times);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        if (this.state.panelProps) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                zoomRequired: true,
                clickBack: (year, month) => {
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-';
                    this.setState({
                        year: year,
                        panelProps
                    }, () => {
                        this.getProvinceChangeData();
                    });
                }
            }),
            year: time.year || null
        }, () => {
            this.getProvinceChangeData();
        });
    }

    getProvinceChangeData() {
        getProvinceChangeData({
            year: this.state.year
        }).then(res => {
            let cunData = [null, null, null, null];
            let increaseData = [null, null, null, null];
            res = res.sort((a, b) => {
                return a.date > b.date;
            });
            res.forEach(item => {
                let index = item.date.split('Q')[1] - 1;
                cunData[index] = (item.cun / 10000).toFixed(4);
                increaseData[index] = (item.increase / 10000).toFixed(4);
            });
            this.print({cunData, increaseData});
            if (this.state.visible) {
                this.print({cunData, increaseData}, true);
            }
        });
    }

    print(params, visible) {
        let ratio = visible ? 1 : sizeRatio;
        AD_CHART.barChart({
            chartId: visible ? 'companyBarChart2' : 'companyBarChart',
            barWidth: visible ? 24 : 16 * ratio,
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: '企业(万家)',
            legend: ['存量企业', '增量企业'],
            legendIcon: 'circle',
            legendRight: 22 * ratio,
            gridBottom: 25 * ratio,
            gridTop: 80 * ratio,
            legendSize: visible ? 16 : 12 * ratio,
            sizeRatio: ratio,
            formatter: (p) => {
                return `${p[0].name}<br/>${p[0].marker}${p[0].seriesName}：${p[0].data || '-'}万<br/>${p[1].marker}${p[1].seriesName}：${p[1].data || '-'}万`;
            },
            series: [params.cunData, params.increaseData]
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
            <PanelCard title="省内涉旅企业数量变更" className="bg-grey" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div id="companyBarChart" style={{width: '100%', height: 300 * sizeRatio}}></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getProvinceChangeData();
            }}>
                <PanelCard title="省内涉旅企业数量变更" className="bg-grey" {...panelProps}
                           narrow={this.handleCancel.bind(this)} zoomOutRequired={true}>
                    <div id="companyBarChart2" style={{width: '100%', height: 460}}></div>
                </PanelCard>
            </Modal>
        </div>;
    }
}