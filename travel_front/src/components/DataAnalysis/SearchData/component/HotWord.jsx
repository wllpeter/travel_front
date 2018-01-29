/**
 * @description 搜索关注热词云
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import AdCharts from '../../../../utils/adCharts';
import Modal from '../../../commonComponent/Modal';
import {getHeaderOptions} from '../../../../utils/tools';
import {getHotword} from '../../../../services/DataAnalysis/searchData';

export default class TrafficType extends Component {
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
        let times = nextProps.timeRange.quarter;
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
                        this.fetchHotword();
                    });
                }
            }),

            year: time.year || null,
            quarter: time.monthOrQuarter || null
        }, () => {
            this.fetchHotword();
        });
    }

    // 搜索关注热词云
    fetchHotword() {
        getHotword({
            year: this.state.year,
            quarter: this.state.quarter
        }).then(data => {
            let hotWords = [];
            if (data && data.length) {
                hotWords = data.map(item => {
                    return {
                        name: item.hotWord,
                        value: item.searchCount
                    };
                });

                this.setState({
                    hotWords: hotWords
                }, () => {
                    this.renderHotWordData();
                    if (this.state.visible) {
                        this.renderHotWordData(true);
                    }
                });
            }
        });
    }

    // 搜索关注热词云
    renderHotWordData(visible) {
        AdCharts.wordCloudChart({
            chartId: visible ? 'searchHotwordCloud2' : 'searchHotwordCloud',
            sizeRange: visible ? [24, 160] : [12, 120],
            series: [this.state.hotWords]
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
            <PanelCard title="搜索关注热词云" enlarge={this.showModal.bind(this)}
                       className="bg-grey" {...panelProps}>
                <div id="searchHotwordCloud" style={{width: '100%', height: 300}}/>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.fetchHotword.bind(this)();
            }}>
                <PanelCard className="map-card" title="搜索关注热词云"
                           zoomOutRequired={true} {...panelProps}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="searchHotwordCloud2" style={{width: '100%', height: 460}}/>
                </PanelCard>
            </Modal>
        </div>;
    }
}