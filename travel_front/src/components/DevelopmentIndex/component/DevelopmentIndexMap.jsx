/**
 * @description 旅游发展指数
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AD_CHART from '../../../utils/adCharts';
import {PARTICLES_OPTION} from '../../../constants/developmentIndex/particles';
import 'particles.js';

export default class DevelopmentIndexMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AD_CHART.zoomMap({
            chartId: 'dev-index-map',
            backgroundColor: 'rgba(128, 128, 128, 0)',
            legendShow: true
        });
        particlesJS('particles-js', PARTICLES_OPTION, function () {
            console.log('callback - particles.js config loaded');
        });
    }

    render() {
        return <PanelCard title="旅游发展指数" zoomRequired={false} timeSelectRequired={false}>
            <div id="particles-js">
                <div id="dev-index-map" className="dev-index-map"></div>
            </div>
        </PanelCard>;
    }
}