/**
 * @description 旅游发展指数
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import AD_CHART from '../../../utils/adCharts';
import {getIndexData} from '../../../services/DevelopmentIndex/development';
import {PARTICLES_OPTION} from '../../../constants/developmentIndex/particles';
import {INDEX_NAME} from '../../../constants/developmentIndex/developmentIndex';
import {handleDevelopmentIndex} from '../../../utils/tools';
import 'particles.js';

export default class DevelopmentIndexMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        particlesJS('particles-js', PARTICLES_OPTION, function () {
            console.log('callback - particles.js config loaded');
        });
        this.getIndexData();
    }

    print(params) {
        let myChart = AD_CHART.zoomMap({
            chartId: 'dev-index-map',
            backgroundColor: 'rgba(128, 128, 128, 0)',
            legendShow: true,
            ...params
        });
        this.props.getIndexMap(myChart);
        let initX = 130;
        let step = 130;
        myChart.dispatchAction({
            type: 'showTip',
            // 屏幕上的 x 坐标
            x: initX,
            // 屏幕上的 y 坐标
            y: 100
        });
        setInterval(() => {
            initX += step;
            if (initX === step * 7) {
                initX = step;
            }
            myChart.dispatchAction({
                type: 'showTip',
                // 屏幕上的 x 坐标
                x: initX,
                // 屏幕上的 y 坐标
                y: 100
            });
        }, 5000);
        myChart.on('datazoom', (p) => {
            console.log(p);
        });
    }

    // 获取数据
    getIndexData() {
        getIndexData().then(res => {
            this.print(handleDevelopmentIndex(INDEX_NAME, res, 'travelIndex'));
        });
    }

    render() {
        return <PanelCard title="旅游发展指数">
            <div id="particles-js">
                <div id="dev-index-map" className="dev-index-map"/>
            </div>
        </PanelCard>;
    }
}