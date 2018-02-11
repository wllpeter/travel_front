/**
 * @description 行业构成
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import AD_CHART from '../../../utils/adCharts';
import {getProvinceIndustryData} from '../../../services/MarketMonitor/marketMonitor';
import {getHeaderOptions} from '../../../utils/tools';

export default class IndustryComposition extends Component {
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
        let times = nextProps.timeRange.provinceIndustryPart;
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
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.getProvinceIndustryData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getProvinceIndustryData();
        });
    }

    getProvinceIndustryData() {
        getProvinceIndustryData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            let describe = res.describe;
            let industry = res.industry;
            let keys = Object.keys(res.describe);
            let data = [];
            let legend = [];
            keys.forEach(key => {
                let name = describe[key].split('企业')[0];
                legend.push({
                    name: name,
                    icon: 'circle'
                });
                data.push({
                    name: name,
                    value: industry[key]
                });
            });
            this.print({data, legend});
            if (this.state.visible) {
                this.print({data, legend}, true);
            }
        });
    }

    print(params, visible) {
        AD_CHART.pieChart({
            chartId: visible ? 'pieChart2' : 'pieChart',
            borderWidth: visible ? 8 : 6 * sizeRatio,
            borderColor: '#203a59',
            legend: params.legend,
            legendSize: visible ? 16 : 12 * sizeRatio,
            labelFontSize: visible ? 16 : 12 * sizeRatio,
            sizeRatio: visible ? 1 : sizeRatio,
            legendTop: 28 * sizeRatio + '%',
            legendRight: '6%',
            data: params.data
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
            <PanelCard title="省内旅游行业构成" className="bg-grey" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div id="pieChart" style={{width: '100%', height: 300 * sizeRatio}}></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getProvinceIndustryData.bind(this)();
            }}>
                <PanelCard title="省内旅游行业构成" className="bg-grey" {...panelProps}
                           narrow={this.handleCancel.bind(this)} zoomOutRequired={true}>
                    <div id="pieChart2" style={{width: '100%', height: 460}}></div>
                </PanelCard>
            </Modal>
        </div>;
    }
}