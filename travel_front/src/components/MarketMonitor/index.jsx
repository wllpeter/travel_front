/**
 * @description 旅游市场监测
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';
import PanelCard from '../commonComponent/PanelCard';
import AD_CHART from '../../utils/adCharts';
import IndustryComposition from './component/IndustryComposition';
import ActiveRank from './component/ActiveRank';
import EnterprisesNumber from './component/EnterprisesNumber';
import InfoMonitor from './component/InfoMonitor';
import {MAP_SIZE_POSITION, CITY_SIZE_POSITION} from '../../constants/MarketMonitor/marketMonitor';
import {
    getMarketMonitorCondition,
    getProvinceAndFiveData,
    getEconomicAndCityData,
    gethangYeActiveData
} from '../../services/MarketMonitor/marketMonitor';
import 'antd/lib/grid/style';
import './style.scss';
import {getHeaderOptions} from '../../utils/tools';

export default class TouristData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: null,
            month: null,
            panelProps: null,
            industryActiveness: {},
            regionActiveness: {},
            economicRegion: null,
            city: null,
            timeRange: {},
            activeDetail: {}
        };
    }

    // 一级地图选中回调
    mapCallback(params) {
        this.setState({
            economicRegion: params
        }, () => {
            this.getEconomicAndCityData();
        });
    }

    componentDidMount() {
        getMarketMonitorCondition().then(res => {
            this.setState({timeRange: res});
            this.getHeaderOptions(res.travelIndustryActive);
        });
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
                    let panelProps = this.state.panelProps;
                    panelProps.defaultValue = year + '-' + month;
                    this.setState({
                        year: year,
                        month: month,
                        panelProps
                    }, () => {
                        this.getProvinceAndFiveData();
                        this.gethangYeActiveData();
                    });
                }
            }),
            year: time.year || null,
            month: time.monthOrQuarter || null
        }, () => {
            this.getProvinceAndFiveData();
            this.gethangYeActiveData();
        });
    }

    print(params) {
        AD_CHART.barChart({
            chartId: 'industryBarChart',
            barWidth: '14',
            row: true,
            xAxisLineShow: false,
            yAxisLineShow: false,
            xAxisLabelShow: false,
            yAxisData: params.yAxisData,
            legend: ['行业活跃度指标详情'],
            legendShow: false,
            gridBottom: 0,
            gridRight: 50,
            seriesLabelShow: true,
            series: [params.series]
        });
    }

    // 获取行业活跃度详情信息
    gethangYeActiveData() {
        gethangYeActiveData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            let describe = res.describe || {},
                industry = res.industry || {},
                yAxisData = [],
                series = [],
                keys = Object.keys(res.describe);
            keys.forEach(key => {
                yAxisData.push(describe[key]);
                series.push(industry[key]);
            });
            this.print({yAxisData, series});
        });
    }

    // 获取四川省区域活跃度数据
    getProvinceAndFiveData() {
        getProvinceAndFiveData({
            year: this.state.year,
            month: this.state.month
        }).then(res => {
            this.setState({industryActiveness: res}, () => {
                this.printProvinceMap();
            });
        });
    }

    // 获取区域活跃度数据
    getEconomicAndCityData() {
        getEconomicAndCityData({
            year: this.state.year,
            month: this.state.month,
            area: this.state.economicRegion
        }).then(res => {
            this.setState({regionActiveness: res}, () => {
                this.printRegionMap();
            });
        });
    }

    // 处理地图数据
    handleMapData(data, type) {
        if (!data) {
            return;
        }
        let max = 0;
        let seriesData = data.map(item => {
            if (~~item.activeDegree > max) {
                max = item.activeDegree;
            }
            return {
                name: item[type],
                value: item.activeDegree
            };
        });
        return {seriesData, max};
    }

    // 获取某一个城市的数据
    handleCityData(data, name) {
        if (!data) {
            return;
        }
        let max = 0;
        let seriesData = {
            name: name,
            value: null
        };
        let chooseCity = null;
        data.forEach(item => {
            if (~~item.activeDegree > max) {
                max = item.activeDegree;
            }
            if (item.city === name) {
                chooseCity = item;
                if (item.activeDegree !== undefined) {
                    seriesData.value = item.activeDegree;
                }
            }
        });
        this.setState({
            city: name,
            activeDetail: {
                title: name,
                ...chooseCity
            }
        });
        return {seriesData: [seriesData], max};
    }

    // 获取某一区域的不同市的活跃度数据
    printRegionMap() {
        let citys = this.state.regionActiveness.city;
        let params = this.handleMapData(citys, 'city');
        let economicRegion = this.state.economicRegion;
        let other = MAP_SIZE_POSITION[economicRegion];
        this.cityMapLevelChart(this.state.economicRegion, params.seriesData, params.max, other);
        let economic = this.state.regionActiveness.economic;
        this.setState({
            city: null,
            activeDetail: {title: economic.area, ...economic}
        });
    }

    // 获取四川省区域地图和相应数据
    printProvinceMap() {
        let economicAreas = this.state.industryActiveness.economicAreas;
        let params = this.handleMapData(economicAreas, 'area');
        this.renderMapLevelChart('四川省区域', params.seriesData, params.max);
        let province = this.state.industryActiveness.province;
        this.setState({
            economicRegion: null,
            city: null,
            activeDetail: {title: province.area, ...province}
        });
    }

    // 渲染纵深层级地图
    renderMapLevelChart(mapTypeName, seriesData, max) {
        let _this = this;
        AD_CHART.mapLevelChart({
            chartId: 'mapChart',
            mapTypeName: mapTypeName,
            legend: ['旅游行业活跃度'],
            series: [seriesData],
            roam: false,
            formatter: (p) => {
                return `${p.seriesName}<br/>${_this.state.activeDetail.title}：${_this.state.activeDetail.activeDegree || '-'}<br/>${p.name}：${p.value || '-'}`;
            },
            scaleLimit: {
                min: 1.1,
                max: 1.1
            },
            title: '活跃度≥70的企业为正常活跃企业',
            max: max
        }, this.mapCallback.bind(this));
    }

    // 渲染纵深层级地图(城市)
    cityMapLevelChart(mapTypeName, seriesData, max, params) {
        let _this = this;
        AD_CHART.mapLevelChart({
            chartId: 'mapChart',
            mapTypeName: mapTypeName,
            legend: ['旅游行业活跃度'],
            series: [seriesData],
            roam: false,
            formatter: (p) => {
                return `${p.seriesName}<br/>${_this.state.activeDetail.title}：${_this.state.activeDetail.activeDegree || '-'}<br/>${p.name}：${p.value || '-'}`;
            },
            title: '活跃度≥70的企业为正常活跃企业',
            max: max,
            ...params
        }, (params) => {
            let cityParams = this.handleCityData(this.state.regionActiveness.city, params);
            let economicRegion = this.state.economicRegion;
            let other = CITY_SIZE_POSITION[params];
            this.thirdLevelChart(economicRegion, cityParams.seriesData, cityParams.max, params, other);
        });
    }

    // 第三层级地图
    thirdLevelChart(economicRegion, seriesData, max, cityName, other) {
        AD_CHART.mapLevelChart({
            chartId: 'mapChart',
            mapTypeName: economicRegion,
            legend: ['旅游行业活跃度'],
            series: [seriesData],
            roam: false,
            cityName: cityName,
            title: '活跃度≥70的企业为正常活跃企业',
            max: max,
            ...other
        });
    }

    render() {
        let {economicRegion, city, activeDetail, panelProps} = this.state;
        let per = (num) => {
            if (num === undefined || num === '') {
                return '-';
            }
            return num + '%';
        };
        return <div className="market-monitor">
            <Row className="mb-20">
                <Col span={24}>
                    <PanelCard className="market-monitor-maps" title="旅游行业活跃度" {...panelProps}>
                        <Row>
                            <Col span={12} className="br-line" lg={24} xl={12}>
                                <div className="map-box">
                                    <div id="mapChart" style={{width: '100%', height: 600}}/>
                                    <ul className="map-breadcrumb">
                                        {
                                            city && <div>
                                                <li className="breadcrumb-button">{city}</li>
                                                <li className="breadcrumb-break">></li>
                                            </div>
                                        }
                                        {
                                            economicRegion && <div>
                                                <li className="breadcrumb-button"
                                                    onClick={this.printRegionMap.bind(this)}>{economicRegion}</li>
                                                <li className="breadcrumb-break">></li>
                                            </div>
                                        }
                                        <li className="breadcrumb-button"
                                            onClick={this.printProvinceMap.bind(this)}>四川省
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col span={5} className="br-line" lg={12} xl={5}>
                                <PanelCard title={`${activeDetail.title}旅游行业活跃度`} timeSelectRequired={false}
                                           zoomRequired={false}
                                           className="custom-style">
                                    <ul className="ul-list">
                                        <li><label>活跃度:</label>{activeDetail.activeDegree || '-'}</li>
                                        <li><label>环比:</label>{per(activeDetail.hb)}</li>
                                        <li><label>存量企业:</label>{activeDetail.existedCom || '-'}</li>
                                        <li><label>增量企业:</label>{activeDetail.increaseCom || '-'}</li>
                                    </ul>
                                </PanelCard>
                                {/* 分隔线 */}
                                <div className="separate-line"/>
                                <PanelCard title="分行业活跃度" timeSelectRequired={false} zoomRequired={false}
                                           className="custom-style">
                                    <table className="mt-table mt-table-noborder col-1-al">
                                        <thead>
                                        <tr>
                                            <th className="pl-23">行业</th>
                                            <th>活跃度</th>
                                            <th>增速</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td style={{width: 120}}>旅游出行</td>
                                            <td>{activeDetail.goDegree || '-'}</td>
                                            <td>{per(activeDetail.goHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游住宿</td>
                                            <td>{activeDetail.liveDegree || '-'}</td>
                                            <td>{per(activeDetail.liveHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游餐饮</td>
                                            <td>{activeDetail.foodDegree || '-'}</td>
                                            <td>{per(activeDetail.foodHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游游览</td>
                                            <td>{activeDetail.seeDegree || '-'}</td>
                                            <td>{per(activeDetail.seeHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游购物</td>
                                            <td>{activeDetail.shoppingDegree || '-'}</td>
                                            <td>{per(activeDetail.shoppingHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游娱乐</td>
                                            <td>{activeDetail.entertainmentDegree || '-'}</td>
                                            <td>{per(activeDetail.entertainmentHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游综合服务</td>
                                            <td>{activeDetail.generalDegree || '-'}</td>
                                            <td>{per(activeDetail.generalHB)}</td>
                                        </tr>
                                        <tr>
                                            <td>旅游其他</td>
                                            <td>{activeDetail.otherDegree || '-'}</td>
                                            <td>{per(activeDetail.otherHB)}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </PanelCard>
                            </Col>
                            <Col span={7} lg={12} xl={7}>
                                <PanelCard title="行业活跃度指标详情" timeSelectRequired={false} zoomRequired={false}>
                                    <div id="industryBarChart" style={{width: '100%', height: 535}}/>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>
            <Row gutter={2}>
                <Col span={6} lg={12} xl={6}>
                    <IndustryComposition {...this.state}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <ActiveRank {...this.state}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <EnterprisesNumber {...this.state}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <InfoMonitor {...this.state}/>
                </Col>
            </Row>
        </div>;
    }
}