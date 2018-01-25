/**
 * @description 旅游发展指数四川省区域地图
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import echarts from 'echarts';
import $ from 'jquery';
import {REGION_MAP} from '../../../constants/developmentIndex/RegionMap';
import {isArray} from '../../../utils/util';

export default class RegionMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.print();
    }

    print() {
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
        return <PanelCard title="旅游创新度" zoomRequired={false}>
            <div id="region-map" className="dev-index-map">
            </div>
        </PanelCard>;
    }
}