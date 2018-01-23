/**
 * @description 旅游美誉度
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AD_CHART from '../../../utils/adCharts';

export default class Reputation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let _this = this;
        setTimeout(() => {
            _this.print();
        });
    }

    print() {
        AD_CHART.zoomMap({
            chartId: 'dev-index-reputation',
            backgroundColor: '#1F3A59',
            legendShow: false,
            fontSize: 12,
            showLength: 3,
            zoomBackground: '#072648',
            zoomFiller: '#054D7E',
            left: '10%',
            right: '10%',
            bottom: '20%'
        });
    }

    render() {
        return <PanelCard className="map-card" title="旅游美誉度" zoomRequired={true} timeSelectRequired={false}>
            <div id="dev-index-reputation" className="dev-down-map">
            </div>
        </PanelCard>;
    }
}