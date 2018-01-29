/**
 * @description 产品评价热词云
 */
import React, {Component} from 'react';
import echarts from 'echarts';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';
import {getProductHotWords} from '../../../services/ProductMonitor/ProductData';
import {getHeaderOptions} from '../../../utils/tools';
import wordcloud from 'echarts-wordcloud';

export default class HotWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            productType: 1,
            year: '2018',
            panelProps: null,
            month: '1'
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let productType = nextProps.productType;
        if (this.state.productType !== productType) {
            this.setState({
                productType: productType
            });
        }
        let times = nextProps.timeRange.hotWords;
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
                        this.getProductHotWords();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getProductHotWords();
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

    print(visible, data) {
        let option = {
            title: {
                text: ''
            },
            backgroundColor: '#1F3A59',
            tooltip: {
                show: true,
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                }
            },
            series: [{
                name: '产品评价热词云',
                type: 'wordCloud',
                size: ['90%', '90%'],
                sizeRange: visible ? [24, 100] : [12, 60],
                rotationRange: [-45, 45],
                rotationStep: 10,
                shape: 'circle',
                textPadding: 15,
                autoSize: {
                    enable: true,
                    minSize: 12
                },
                textStyle: {
                    normal: {
                        color: '#00AFEC'
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data: [{
                    name: 'Jayfee',
                    value: 666
                }, {
                    name: 'Nancy',
                    value: 520
                }]
            }]
        };

        option.series[0].data = data;

        let id = visible ? 'hotWord-map2' : 'hotWord-map';

        let hotWord = echarts.init(document.getElementById(id));

        hotWord.setOption(option);
    }

    // 获取热词云数据
    getProductHotWords() {
        let {visible} = this.state;
        getProductHotWords({
            productType: this.state.productType,
            year: this.state.year,
            month: this.state.month
        }).then((res) => {
            let data = res.map((item) => {
                return {
                    name: item.keyWord,
                    value: item.counts
                };
            });
            this.print(false, data);
            if (visible) {
                this.print(true, data);
            }
        });
    }

    render() {
        let {panelProps, visible} = this.state;
        return <div>
            <PanelCard title="产品评价热词云"  {...panelProps}
                       enlarge={this.showModal.bind(this)}>
                <div id="hotWord-map" className="product-down-map"></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getProductHotWords.bind(this)('hotWord-map2');
            }}>
                <div className="hotWord-zoom">
                    <PanelCard title="产品评价热词云" {...panelProps}
                               zoomOutRequired={true}
                               narrow={this.handleCancel.bind(this)}>
                        <div id="hotWord-map2"></div>
                    </PanelCard>
                </div>
            </Modal>
        </div>;
    }
}