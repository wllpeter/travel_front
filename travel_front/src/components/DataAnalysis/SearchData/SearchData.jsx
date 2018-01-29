/**
 * @description 搜索大数据
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import {Row, Col} from 'antd';
import AdCharts from '../../../utils/adCharts';
import {
    getConsumptionDataOptions,
    getProvinceHotSearch,
    getProvinceSearchTrend,
    getSearchPreferenceArea,
    getSearchPersonAge
} from '../../../services/DataAnalysis/searchData';
import {getHeaderOptions} from '../../../utils/util';
import HotWord from './component/HotWord';
import SearchPeopleSource from './component/SearchPeopleSource';
import 'antd/lib/grid/style';

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsData: {},
            provinceMapData: [],     // 四川省旅游搜索热力图
            hotWords: [],            // 搜索关注热词
            peopleAge: []            // 年龄分布

        };
    }

    renderProvinceMapData(minMax) {
        let mapNameType = 'sichuan';

        // 全省旅游搜索热力图
        AdCharts.mapChart({
            chartId: 'visualMapContinuous',
            mapAddress: '/static/data/map/四川省.json',
            mapTypeName: mapNameType,
            visualMap: {
                min: minMax[0],
                max: minMax[1],
                right: 25,
                bottom: 45,
                orient: 'horizontal',
                itemWidth: 20,
                itemHeight: 250,
                text: ['高', '低'],
                calculable: true,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: 14
                },
                inRange: {
                    color: ['#2e70b8', '#00a6ff', '#02c4bc', '#35d77c', '#9bdb74', '#abdd73']
                }
            },
            seriesOption: [{
                name: '全省旅游搜索热力图',
                type: 'map',
                map: mapNameType,
                mapType: mapNameType,
                roam: true,
                zoom: 1.1,
                scaleLimit: {
                    min: 1,
                    max: 2.5
                },
                nameMap: {
                    '甘孜州': '甘孜藏族自治州',
                    '凉山州': '凉山彝族自治州',
                    '阿坝州': '阿坝藏族自治州'
                },
                left: '14%',
                top: 25,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: 14
                        }
                    }
                }
            }],
            series: [this.state.provinceMapData]
        });
    }

    // 搜索人群年龄分布
    renderPersonAgeData() {
        AdCharts.pieChart({
            chartId: 'searchPeopleAgePieChart',
            legend: ['18以下', '18-24', '25-34', '35-44', '45-54', '55-64', '65以上'],
            legendIcon: 'circle',
            legendOrient: 'horizontal',
            legendLeft: '65%',
            borderWidth: 10,
            itemGap: 20,
            borderColor: '#203a59',
            data: this.state.peopleAge
        });
    }

    componentDidMount() {
        let mapNameType = 'sichuan';

        function randomData() {
            return Math.round(Math.random() * 100);
        }

        // 获取搜索大数据所有的时间日期数据
        getConsumptionDataOptions().then(data => {
            this.setState({
                optionsData: data
            }, () => {
                this.fetchProvinceHotSearch([data.month[0].year, data.month[0].monthOrQuarter]);
                this.fetchSearchPreferenceArea([data.month[0].year, data.month[0].monthOrQuarter]);
                this.fetchSearchPersonAge([data.month[0].year, data.month[0].monthOrQuarter]);
                this.fetchProvinceSearchTrend([new Date().getFullYear() - 1]);
            });
        });

        // 全省旅游搜索热度趋势
        AdCharts.lineChart({
            chartId: 'provinceSearchHotLineChart',
            legend: ['旅游搜索热度趋势'],
            legendShow: false,
            xAxisData: ['10-23', '10-24', '10-25', '10-26', '10-27', '10-28', '10-29'],
            gradientColor: [[{offset: 0, color: 'rgba(0, 164, 250, 1)'}, {offset: 0.8, color: 'rgba(0, 164, 250, 0)'}]],
            lineStyleColor: ['#00a2f5'],
            smooth: true,
            stack: true,
            series: [[23, 32, 54, 84, 134, 90, 43]]
        });

    }

    // 获取全省旅游搜索热力图
    fetchProvinceHotSearch(params) {
        getProvinceHotSearch(params).then(data => {
            let provinceMapData = [];
            let minMax = [0, 0];

            if (data && data.length) {
                provinceMapData = data.map((item) => {
                    minMax[0] = Math.min(minMax[0], item.searchCount);
                    minMax[1] = Math.max(minMax[1], item.searchCount);

                    if (item.name.includes('凉山')) {
                        item.name += '彝族自治州';
                    } else if (item.name.includes('甘孜') || item.name.includes('阿坝')) {
                        item.name += '藏族自治州';
                    } else {
                        item.name += '市';
                    }

                    return {
                        name: item.name,
                        value: item.searchCount
                    };
                });

                this.setState({
                    provinceMapData
                }, () => {
                    this.renderProvinceMapData(minMax);
                });
            }
        });
    }

    // 获取人群来源地
    fetchProvinceSearchTrend(params) {
        getProvinceSearchTrend(params).then(data => {
            console.log('获取人群来源地:', data);
        });
    }

    // 获取景点偏好地
    fetchSearchPreferenceArea(params) {
        getSearchPreferenceArea(params).then(data => {
            if (data && data.length) {
                this.setState({
                    preferenceArea: data
                });
            }
        });
    }

    // 搜索人群年龄分布
    fetchSearchPersonAge(params) {
        getSearchPersonAge(params).then(data => {
            if (data && data.length) {
                let peopleAge = [];

                peopleAge = data.map(item => {
                    return {
                        name: item.ageZone,
                        value: ((item.ratio - 0) * 100).toFixed(2) - 0
                    };
                });

                this.setState({
                    peopleAge
                }, () => {
                    this.renderPersonAgeData();
                });
            }
        });
    }

    /**
     * @description 获取PanelCard头部选项
     * @param options 各种选项
     * @param getDataFunc 获取数据的回调
     * @returns {{timeSelectRequired: *, zoomRequired: *, options: *}}
     */
    getHeaderOptions(options, getDataFunc) {
        let callback = function (year, monthOrQuarter) {
            console.log('year:', year, 'monthOrQuarter:', monthOrQuarter);
            getDataFunc && getDataFunc([year, monthOrQuarter]);
        };
        return getHeaderOptions(options, this.state.optionsData, callback);
    }

    render() {

        const {preferenceArea, optionsData} = this.state;

        return <div className="tourist-data">
            <Row>
                <Col span={12} lg={24} xl={12}>
                    <PanelCard title="全省旅游搜索热力图"
                               zoomRequired={false} {...this.getHeaderOptions([true, false, 'month'], this.fetchProvinceHotSearch.bind(this))}>
                        <div id="visualMapContinuous" style={{width: '100%', height: 600}} className="br-line"></div>
                    </PanelCard>
                </Col>
                <Col span={12} lg={24} xl={12}>
                    <PanelCard title="全省旅游搜索热度趋势" zoomRequired={false}>
                        <div id="provinceSearchHotLineChart" style={{width: '100%', height: 600}}></div>
                    </PanelCard>
                </Col>
            </Row>

            <Row gutter={2}>
                <Col span={6} lg={12} xl={6}>
                    <HotWord timeRange={optionsData}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <SearchPeopleSource timeRange={optionsData}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <PanelCard title="搜索景点偏好地"
                               className="bg-grey" {...this.getHeaderOptions([true, true, 'month'], this.fetchSearchPreferenceArea.bind(this))}>
                        <table className="mt-table mt-table-noborder w-95 mb-34">
                            <thead>
                            <tr>
                                <th>排名</th>
                                <th>景区</th>
                                <th>占比</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (preferenceArea && preferenceArea.length > 0) && preferenceArea.map((area, index) => {
                                    return <tr key={index}>
                                        <td>{'0' + (index + 1)}</td>
                                        <td>{area.name}</td>
                                        <td>{Number((area.ratio - 0) * 100).toFixed(2) + '%'}</td>
                                    </tr>;
                                })
                            }
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <PanelCard title="搜索人群年龄分布"
                               className="bg-grey" {...this.getHeaderOptions([true, true, 'month'], this.fetchSearchPersonAge.bind(this))}>
                        <div id="searchPeopleAgePieChart" style={{width: '100%', height: 300}}></div>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}