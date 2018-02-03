/**
 * @description 旅游经济规模
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {REGION_DATA, PROVINCE_DATA} from '../../../constants/developmentIndex/region';
import {getEconomicScale} from '../../../services/DevelopmentIndex/development';
import {getDataZoom} from '../../../utils/tools';
import AD_CHART from '../../../utils/adCharts';
import {handleDevelopmentIndex} from '../../../utils/tools';

export default class Economics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 1,
            visible: false
        };
    }

    componentDidMount() {
        this.getEconomicScale();
    }

    // 获取旅游经济规模数据
    getEconomicScale() {
        let type = this.state.activeIndex;
        getEconomicScale({type}).then(res => {
            let params = null;
            if(type === 1){
                params = {
                    ...handleDevelopmentIndex(REGION_DATA, res, 'scale'),
                    color: ['#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5']
                };
            }else{
                params = {
                    ...handleDevelopmentIndex(PROVINCE_DATA, res, 'scale'),
                    color: ['#B6DC74']
                };
            }
            this.print(params);
            if (this.state.visible) {
                this.print(params, true);
            }
        });
    }

    print(params, visible) {
        AD_CHART.barChart({
            chartId: visible ? 'dev-index-economics2' : 'dev-index-economics',
            barWidth: visible ? '22' : '16',
            xAxisData: params.xAxis,
            yAxisName: '',
            legend: params.legend,
            gridTop: 100,
            gridBottom: 50,
            legendShow: false,
            legendRight: '22',
            colors: params.color,
            series: params.data,
            labelTextSize: visible ? 16 : 12,
            labelTextFontSize: visible ? 16 : 12,
            dataZoom: getDataZoom({
                zoomBackground: '#072648',
                zoomFiller: '#054D7E',
                lengthMax: params.xAxis.length,
                showLength: 3
            })
        });
    }

    // 点击按钮选择区域
    chooseRegion(item) {
        let index = item.index;
        this.setState({
            activeIndex: index
        }, () => {
            this.getEconomicScale();
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
                    <ToggleButtonGroup {...switchProps}/>
                    <div id="dev-index-economics" className="dev-down-map">
                    </div>
                </div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getEconomicScale.bind(this)();
            }}>
                <div className="hotWord-zoom">
                    <PanelCard className="map-card" title="旅游经济规模" zoomOutRequired={true}
                               narrow={this.handleCancel.bind(this)}>
                        <div className="switch-btn-box">
                            <ToggleButtonGroup {...switchProps}/>
                            <div id="dev-index-economics2" className="dev-down-map" style={{'height': '460px'}}>
                            </div>
                        </div>
                    </PanelCard>
                </div>
            </Modal>
        </div>;

    }
};