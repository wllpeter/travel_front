/**
 * @description 旅游舒适度
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import Modal from '../../commonComponent/Modal';
import {getComfortData} from '../../../services/DevelopmentIndex/development';
import AD_CHART from '../../../utils/adCharts';
import {INDEX_NAME} from '../../../constants/developmentIndex/developmentIndex';
import {handleDevelopmentIndex} from '../../../utils/tools';

export default class ComfortDegree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        this.getComfortData();
    }

    getComfortData() {
        getComfortData().then(res => {
            let params = handleDevelopmentIndex(INDEX_NAME, res, 'comfort');
            this.print(params);
            if (this.state.visible) {
                this.print(params, true);
            }
        });
    }

    print(params, visible) {
        AD_CHART.zoomMap({
            chartId: visible ? 'dev-index-comfort2' : 'dev-index-comfort',
            backgroundColor: '#1F3A59',
            legendShow: false,
            fontSize: visible ? 16 : 12,
            showLength: 3,
            zoomBackground: '#072648',
            sizeRatio: visible ? 1 : sizeRatio,
            zoomFiller: '#054D7E',
            left: '14%',
            right: '6%',
            bottom: visible ? '20%' : '24%',
            zoomHeight: 15 * sizeRatio,
            ...params
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
        let {visible} = this.state;
        return <div>
            <PanelCard className="map-card" title="旅游舒适度" zoomRequired={true}
                       enlarge={this.showModal.bind(this)} timeSelectRequired={false}>
                <div id="dev-index-comfort" className="dev-down-map">
                </div>
            </PanelCard>
            <Modal visible={visible} onOk={() => {
                this.getComfortData.bind(this)();
            }}>
                <PanelCard className="map-card" title="旅游舒适度" zoomOutRequired={true} timeSelectRequired={false}
                           narrow={this.handleCancel.bind(this)}>
                    <div id="dev-index-comfort2" className="dev-down-map" style={{'height': '460px'}}>
                    </div>
                </PanelCard>
            </Modal>
        </div>;
    }
}