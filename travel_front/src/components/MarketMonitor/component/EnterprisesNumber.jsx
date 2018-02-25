/**
 * @description  省内涉旅企业数量变更
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import AD_CHART from '../../../utils/adCharts';
import {getProvinceChangeData} from '../../../services/MarketMonitor/marketMonitor';
import {getHeaderOptions} from '../../../utils/tools';

let enterPriseType = '存量企业';

export default class EnterprisesNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: '2017',
            panelProps: null,
            activeIndex: 0
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
                cunData[index] = (item.cun / 10000).toFixed(2);
                increaseData[index] = ~~item.increase;
            });
            this.print({cunData, increaseData});
            if (this.state.visible) {
                this.print({cunData, increaseData}, true);
            }
        });
    }

    print(params, visible) {
        let data = null;
        let yAxisName = null;
        let unit = null;
        let colors = null;
        if (enterPriseType === '存量企业') {
            data = params.cunData;
            yAxisName = '企业(万家)';
            unit = '万家';
            colors = ['#00a9ff'];
        } else {
            data = params.increaseData;
            yAxisName = '企业(家)';
            unit = '家';
            colors = ['#32c889'];
        }
        let ratio = visible ? 1 : sizeRatio;
        AD_CHART.barChart({
            chartId: visible ? 'companyBarChart2' : 'companyBarChart',
            barWidth: visible ? 24 : 16 * ratio,
            xAxisData: ['1季度', '2季度', '3季度', '4季度'],
            yAxisName: yAxisName,
            legend: [],
            legendShow: false,
            gridBottom: 25 * ratio,
            gridTop: 80 * ratio,
            legendSize: visible ? 16 : 12 * ratio,
            sizeRatio: ratio,
            formatter: (p) => {
                return `${p[0].name}<br/>${p[0].marker}${enterPriseType}：${p[0].data || '-'}${unit}`;
            },
            series: [data],
            colors
        });
    }

    // 选择企业类型
    chooseType(params) {
        this.setState({activeIndex: params.index});
        enterPriseType = params.buttonName;
        this.getProvinceChangeData();
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
        let {visible, panelProps, activeIndex} = this.state;
        let switchProps = {
            buttons: [
                {buttonName: '存量企业'},
                {buttonName: '增量企业'}
            ],
            style: {
                top: '18%'
            },
            clickBack: this.chooseType.bind(this),
            activeIndex
        };
        return <div>
            <PanelCard title="省内涉旅企业数量变更" className="bg-grey" {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <ToggleButtonGroup {...switchProps}/>
                <div id="companyBarChart" style={{width: '100%', height: 300 * sizeRatio}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getProvinceChangeData();
            }}>
                <PanelCard title="省内涉旅企业数量变更" className="bg-grey" {...panelProps}
                           narrow={this.handleCancel.bind(this)} zoomOutRequired={true}>
                    <ToggleButtonGroup {...switchProps}/>
                    <div id="companyBarChart2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}