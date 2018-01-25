/**
 * @description 旅游发展指数四川省区域地图
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import echarts from 'echarts';
import $ from 'jquery';
import {REGION_MAP} from '../../../constants/developmentIndex/RegionMap';
import {getCreateNewData} from '../../../services/DevelopmentIndex/development';
import {isArray} from '../../../utils/util';
import AD_CHART from '../../../utils/adCharts';
import {getHeaderOptions} from '../../../utils/tools';

export default class RegionMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: null,
            month: null,
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        let times = nextProps.timeRange.createNew;
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
                clickBack: (year, month) => {
                    this.setState({
                        year: year,
                        month: month
                    }, () => {
                        this.getCreateNewData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getCreateNewData();
        });
    }

    getCreateNewData() {
        getCreateNewData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            let max = 0;
            let seriesData = res.map(item => {
                if (item.area === '川西北生态经济区') {
                    item.area = '川西北经济区';
                }
                if (item.createNew > max) {
                    max = item.createNew;
                }
                return {
                    name: item.area,
                    value: item.createNew
                };
            });
            this.renderMapLevelChart('四川省区域', seriesData, max);
        });
    }

    // 渲染纵深层级地图
    renderMapLevelChart(mapTypeName, seriesData, max) {
        AD_CHART.mapLevelChart({
            chartId: 'region-map',
            mapTypeName: mapTypeName,
            legend: ['旅游创新度'],
            series: [seriesData],
            zoom: .8,
            scaleLimit: [.8, .8],
            color: ['#253F98', '#6AC2EE'],
            left: '10%',
            top: 12,
            max: max
        });
    }

    testpPrint() {
        $.getJSON('/static/data/map/四川省.json', function (mapjson) {
            let mapjsonData = {
                UTF8Encoding: true,
                features: [],
                type: 'FeatureCollection'
            };
            let mapjsonObj = {};
            // 以城市名字为key值储存各个城市方便查找
            mapjson.features.forEach((item) => {
                mapjsonObj[item.properties.name] = item;
            });
            mapjsonData.features = REGION_MAP.map((region) => {
                let first = region.children[0];
                let coordinates = [];
                let encodeOffsets = [];
                region.children.forEach((name) => {
                    let city = mapjsonObj[name];
                    if (isArray(...city.geometry.coordinates)) {
                        let coordinate = [];
                        city.geometry.coordinates.forEach((val) => {
                            coordinate = [...coordinate, ...val];
                        });
                        coordinates = [...coordinates, ...coordinate];
                    } else {
                        coordinates = [...coordinates, ...city.geometry.coordinates];
                    }
                    if (isArray(...city.geometry.coordinates)) {
                        let encodeOffset = [];
                        city.geometry.encodeOffsets.forEach((val) => {
                            encodeOffset = [...encodeOffset, ...val];
                        });
                        encodeOffsets = [...encodeOffsets, ...encodeOffset];
                    } else {
                        encodeOffsets = [...encodeOffsets, ...city.geometry.encodeOffsets];
                    }
                });
                return {
                    id: mapjsonObj[first].id,   // 取第一个城市的id为id
                    type: 'Feature',
                    properties: {
                        name: region.name, // 自定义名称
                        cp: mapjsonObj[first].properties.cp,   // 取第一个城市的cp为cp
                        childNum: coordinates.length
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: coordinates,
                        encodeOffsets: encodeOffsets
                    }
                };
            });
            // console.log(mapjsonData);
            // ---------------------------------------获取二级区域的json---------------------------------------------------------
            let arr = REGION_MAP.map((region) => {
                let citys = [];
                region.children.forEach((name) => {
                    citys.push(mapjsonObj[name]);
                });
                return {
                    UTF8Encoding: true,
                    features: citys,
                    type: 'FeatureCollection'
                };
            });
            echarts.registerMap('四川省', mapjsonData);
            // console.log(JSON.stringify(mapjsonData));
            let chart = echarts.init(document.getElementById('region-map'));
            chart.setOption({
                series: [{
                    type: 'map',
                    map: '四川省'
                }]
            });
        });
    }

    render() {
        let {panelProps} = this.state;
        return <PanelCard title="旅游创新度" {...panelProps}>
            <div id="region-map" className="dev-index-map">
            </div>
        </PanelCard>;
    }
}