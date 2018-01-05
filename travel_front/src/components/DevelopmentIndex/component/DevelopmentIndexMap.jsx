/**
 * @description 旅游发展指数
 */
import React, {Component} from 'react';
import AD_CHART from '../../../utils/adCharts';

export default class DevelopmentIndexMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AD_CHART.zoomMap({
            chartId: 'dev-index-map',
            legendShow: true
        });
    }

    render() {
        return <div id="dev-index-map" className="dev-index-map"></div>;
    }
}