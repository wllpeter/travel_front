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

let timer = null;

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
        let chartWidth = myChart.getWidth();
        let fn = (num) => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            let initX = chartWidth * .06;
            let step = chartWidth * .88 / num;
            let positionX = initX;
            myChart.dispatchAction({
                type: 'showTip',
                // 屏幕上的 x 坐标
                x: positionX,
                // 屏幕上的 y 坐标
                y: 100
            });
            timer = setInterval(() => {
                positionX += step;
                if (positionX > initX + step * num) {
                    positionX = initX;
                }
                myChart.dispatchAction({
                    type: 'showTip',
                    // 屏幕上的 x 坐标
                    x: positionX,
                    // 屏幕上的 y 坐标
                    y: 100
                });
            }, 5000);
        };
        // 初始化移动
        fn(6);

        // 当chart发生缩放时需要重新计算出横向的坐标个数
        let len = params.xAxis.length;

        myChart.on('datazoom', (p) => {
            if (p.batch) {
                let zoomData = p.batch[0];
                let start = zoomData.start;
                let end = zoomData.end;
                let num = (end - start) * (len - 1) / 100 + 1;
                fn(num);
            } else {
                let start = p.start;
                let end = p.end;
                let num = (end - start) * (len - 1) / 100 + 1;
                console.log(len);
                fn(num);
            }
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