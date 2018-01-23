/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {REGION_DATA} from '../../../constants/developmentIndex/region';
import {getDataZoom} from '../../../utils/tools';
import AD_CHART from '../../../utils/adCharts';

export default class Economics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1,
            visible: false
        };
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print(this.state.activeIndex);
        });
    }

    print(index) {
        let visible = this.state.visible;
        let series = index === 0 ? [[233, 322, 100]] : [[233, 322, 100], [323, 323, 320], [140, 200, 180], [120, 160, 234], [203, 222, 123]];
        let color = index === 0 ? ['#B6DC74'] : ['#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let legend = index === 0 ? ['四川省'] : REGION_DATA;
        AD_CHART.barChart({
            chartId: visible ? 'dev-index-economics2' : 'dev-index-economics',
            barWidth: visible ? '22' : '16',
            xAxisData: ['2017-07', '2017-08', '2017-09'],
            yAxisName: '',
            legend: legend,
            gridTop: 100,
            gridBottom: 50,
            legendShow: false,
            legendRight: '22',
            colors: color,
            series: series,
            labelTextSize: visible ? 16 : 12,
            labelTextFontSize: visible ? 16 : 12,
            dataZoom: getDataZoom({
                zoomBackground: '#072648',
                zoomFiller: '#054D7E',
                lengthMax: 3,
                showLength: 2
            })
        });
    }

    // 点击按钮选择区域
    chooseRegion(item) {
        let index = item.index;
        this.print(index, this.state.visible);
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
        let {visible, activeIndex} = this.state;
        let switchProps = {
            buttons: [
                {buttonName: '全省'},
                {buttonName: '经济区'}
            ],
            activeIndex: this.state.activeIndex,
            clickBack: this.chooseRegion.bind(this)
        };
        return <div>
            <PanelCard className="map-card" title="旅游经济规模" zoomRequired={true} enlarge={this.showModal.bind(this)}>
                <div className="switch-btn-box">
                    <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
                    <div id="dev-index-economics" className="dev-down-map">
                    </div>
                </div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.print.bind(this)(activeIndex);
            }}>
                <div className="hotWord-zoom">
                    <PanelCard className="map-card" title="旅游经济规模" zoomOutRequired={true}
                               narrow={this.handleCancel.bind(this)}>
                        <div className="switch-btn-box">
                            <ToggleButtonGroup {...switchProps}></ToggleButtonGroup>
                            <div id="dev-index-economics2" className="dev-down-map" style={{'height': '460px'}}>
                            </div>
                        </div>
                    </PanelCard>
                </div>
            </Modal>
        </div>;

    }
};