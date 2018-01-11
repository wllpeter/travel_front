/**
 * @description 产品评价热词云
 */
import React, {Component} from 'react';
import echarts from 'echarts';
import Modal from '../../commonComponent/Modal';
import PanelCard from '../../commonComponent/PanelCard';
import wordcloud from 'echarts-wordcloud';

export default class HotWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.print('hotWord-map');
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

    print(id) {
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
                sizeRange: [12, 60],
                rotationRange: [-45, 45],
                rotationStep: 10,
                shape: 'circle',
                textPadding: 0,
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
        let JosnList = [];

        JosnList.push(
            {
                name: 'Jayfee',
                value: 666
            }, {
                name: 'Nancy',
                value: 520
            }, {
                name: '生活资源',
                value: '999'
            }, {
                name: '供热管理',
                value: '888'
            }, {
                name: '供气质量',
                value: '777'
            }, {
                name: '生活用水管理',
                value: '688'
            }, {
                name: '一次供水问题',
                value: '588'
            }, {
                name: '交通运输',
                value: '516'
            }, {
                name: '城市交通',
                value: '515'
            }, {
                name: '环境保护',
                value: '483'
            }, {
                name: '房地产管理',
                value: '462'
            }, {
                name: '城乡建设',
                value: '449'
            }, {
                name: '社会保障与福利',
                value: '429'
            }, {
                name: '社会保障',
                value: '407'
            }, {
                name: '文体与教育管理',
                value: '406'
            }, {
                name: '供气质量',
                value: '223'
            }, {
                name: '供电管理',
                value: '223'
            }, {
                name: '燃气管理',
                value: '152'
            }, {
                name: '教育管理',
                value: '152'
            }, {
                name: '医疗纠纷',
                value: '152'
            }
        );

        option.series[0].data = JosnList;

        let hotWord = echarts.init(document.getElementById(id));

        hotWord.setOption(option);
    }

    render() {
        let {visible} = this.state;
        return <div>
            <PanelCard title="产品评价热词云"
                       enlarge={this.showModal.bind(this)}>
                <div id="hotWord-map" className="product-down-map"></div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {this.print.bind(this)('hotWord-map2');}}>
                <div className="hotWord-zoom">
                    <PanelCard title="产品评价热词云" zoomRequired={false} timeSelectRequired={true}
                               zoomOutRequired={true}
                               narrow={this.handleCancel.bind(this)}>
                        <div id="hotWord-map2"></div>
                    </PanelCard>
                </div>
            </Modal>
        </div>;
    }
}