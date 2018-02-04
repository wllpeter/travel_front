/**
 * @description 客情大数据
 */
import React, {Component} from 'react';
import PanelCard from '../../commonComponent/PanelCard';
import adCharts from '../../../utils/adCharts';
import {Row, Col} from 'antd';
import 'antd/lib/grid/style';
import maleIcon from '../../../assets/images/male.png';
import femaleIcon from '../../../assets/images/female.png';
import {
    getTouristDataOptions,
    getProvinceCustomerData,
    getCountyData
} from '../../../services/DataAnalysis/touristData';
import {Map} from 'immutable';
import {getHeaderOptions} from '../../../utils/util';
import ToggleButtonGroup from '../../commonComponent/ToggleButtonGroup';
import {getDataZoom} from '../../../utils/tools';
import {Select} from 'mtui/index';
import FiveEconomicZone from './component/FiveEconomicZone';
import TouristStay from './component/TouristStay';
import TouristSource from './component/TouristSource';
import TrafficType from './component/TrafficType';
import '../style.scss';

const Option = Select.Option;

let analysisIndexObj = {};

let provinceTouristQuarter = 0;
let countryTouristQuarter = 0;
let provinceTimer = null;
let countryTimer = null;

export default class TouristData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 省游客分析
            provinceTouristData: Map({
                ageData: null,          // 游客年龄分布
                genderData: [],       // 游客性别分布
                flowData: null          // 游客流量分析
            }),
            villageTouristData: Map({
                ageData: null,             // 年龄分析
                consumptionPotential: {
                    potentialLevels: [],
                    data: []
                },   // 消费潜力
                tripTime: []                // 乡村游时长
            }),
            villageActive: 'jieDai-2',    // 默认激活的为接待按钮，值为2
            optionsData: {
                chuXing: null,          // 乡村游客分析-出行
                jieDai: null,           // 乡村游客分析-接待
                sex: null               // 四川省游客性别分布
            },
            flowAnalysis: Map({
                province: [],                          // 省游客流量分析
                country: []                            // 乡村游客流量分析
            }),                                         // 游客流量分析选项和数据
            peopleTimeData: {
                citys: [],
                data: []
            }                       // 乡村游出游人次
        };
    }

    /**
     * @description 渲染四川省游客分析
     */
    renderProvinceTouristData(quarter) {
        const {provinceTouristData, flowAnalysis, selectedFlowAnalysisIndex} = this.state;
        console.log(provinceTouristData.get('ageData'))
        // 四川省游客年龄分布图
        if (provinceTouristData.get('ageData') && provinceTouristData.get('ageData').length) {
            adCharts.pieChart({
                chartId: 'provinceAgePieChart',
                legend: ['20以下', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65以上'],
                legendIcon: 'circle',
                borderWidth: 6,
                borderColor: '#072848',
                legendTop: 80,
                legendHeight: 150,
                legendRight: '10%',
                color: ['#dc9473', '#ddcf73', '#b6dd74', '#32c889', '#0dbbc7', '#00a9ff', '#1b75d3', '#3559c5', '#5334c5', '#9e35c5', '#df5fa8'],
                center: ['30%', '50%'],
                data: provinceTouristData.get('ageData')
            });
        }

        // 四川省客流量分析
        if (flowAnalysis.toObject() && flowAnalysis.get('province').length) {
            let lineChart = adCharts.lineChart({
                chartId: 'provinceFlowLineChart',
                legend: ['人次', '人数'],
                legendIcon: 'circle',
                legendRight: '12%',
                legendTop: '0',
                itemGap: 35,
                xAxisData: ['1季度', '2季度', '3季度', '4季度'],
                yAxisName: '流量 (万)',
                smooth: false,
                graphic: false,
                top: 30,
                right: 30,
                bottom: 40,
                colors: ['#32c889', '#00a9ff'],
                series: flowAnalysis.get('province')[selectedFlowAnalysisIndex].data
            });

            provinceTouristQuarter = quarter;
            let step = lineChart.getWidth() / 5;
            lineChart.dispatchAction({
                type: 'showTip',
                // 屏幕上的 x 坐标
                x: step * quarter,
                // 屏幕上的 y 坐标
                y: 100
            });
            if (provinceTimer) {
                clearInterval(provinceTimer);
                provinceTimer = null;
            }
            provinceTimer = setInterval(() => {
                lineChart.dispatchAction({
                    type: 'showTip',
                    // 屏幕上的 x 坐标
                    x: step * quarter,
                    // 屏幕上的 y 坐标
                    y: 100
                });
            }, 5000);
        }
    }

    /**
     * @description 渲染乡村游游客分析
     */
    renderCountryTouristData(quarter) {

        const {villageTouristData, flowAnalysis, selectedCountryFlowAnalysisIndex, peopleTimeData} = this.state;
        const {citys, data} = peopleTimeData;
        // console.log(villageTouristData.get('ageData'));
        // 乡村游游客年龄分析
        if (villageTouristData.get('ageData') && villageTouristData.get('ageData').length) {
            adCharts.pieChart({
                chartId: 'villageAgePieChart',
                legend: ['20以下', '20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65以上'],
                legendIcon: 'circle',
                borderWidth: 6,
                borderColor: '#072848',
                legendTop: 80,
                legendHeight: 150,
                legendRight: '10%',
                color: ['#dc9473', '#ddcf73', '#b6dd74', '#32c889', '#0dbbc7', '#00a9ff', '#1b75d3', '#3559c5', '#5334c5', '#9e35c5', '#df5fa8'],
                center: ['30%', '50%'],
                data: villageTouristData.get('ageData')
            });
        }

        let consumptionPotential = villageTouristData.get('consumptionPotential');

        if (consumptionPotential.data.length && consumptionPotential.potentialLevels.length) {
            // 乡村游消费潜力分布
            adCharts.percentBarChart({
                chartId: 'villageConsumptionBarChart',
                title: '释义: 星级越高，消费者潜力越强',
                titleLeft: 20,
                titleFontSize: 12,
                legendShow: false,
                xAxisData: consumptionPotential.potentialLevels,
                barWidth: 13,
                labelFontSize: 12,
                gridTop: 60,
                gridLeft: 0,
                yAxisLineShow: false,
                yAxisLabelShow: false,
                xAxisLineShow: false,
                colors: ['#415870', '#00a9ff'],
                labelOffset: [0, -10],
                labelMargin: 0,
                labelPos: 'top',
                series: [new Array(consumptionPotential.potentialLevels.length).fill(100), consumptionPotential.data]
            });
        }

        if (villageTouristData.get('tripTime') && villageTouristData.get('tripTime').length) {
            // 乡村游时长分布
            adCharts.percentBarChart({
                chartId: 'villageDurationPercentBarChart',
                legendShow: false,
                yAxisData: ['120h以上'.padEnd(7, ' '), '96h-120h', '72h-96h'.padEnd(8, ' '), '48h-72h'.padEnd(8, ' '), '24h-48h'.padEnd(8, ' '), '12h-24h'.padEnd(8, ' '), '6h-12h'.padEnd(9, ' ')],
                row: true,
                barWidth: 8,
                colors: ['#415870', '#00a9ff'],
                gridRight: 70,
                yAxisLineShow: false,
                xAxisLineShow: false,
                xAxisLabelShow: false,
                series: [[100, 100, 100, 100, 100, 100, 100], villageTouristData.get('tripTime')]
            });
        }

        // 乡村游客流量分析
        if (this.state.villageActive.startsWith('jieDai') && selectedCountryFlowAnalysisIndex !== undefined) {
            let lineChart = adCharts.lineChart({
                chartId: 'villageFlowLineChart',
                legend: ['人次', '人数'],
                legendIcon: 'circle',
                legendRight: '12%',
                legendTop: '0',
                itemGap: 35,
                xAxisData: ['1季度', '2季度', '3季度', '4季度'],
                yAxisName: '流量 (万)',
                smooth: false,
                graphic: false,
                top: 30,
                right: 30,
                bottom: 40,
                colors: ['#32c889', '#00a9ff'],
                series: flowAnalysis.get('country')[selectedCountryFlowAnalysisIndex].data
            });
            countryTouristQuarter = quarter;
            let step = lineChart.getWidth() / 5;
            lineChart.dispatchAction({
                type: 'showTip',
                // 屏幕上的 x 坐标
                x: step * quarter,
                // 屏幕上的 y 坐标
                y: 100
            });
            if (countryTimer) {
                clearInterval(countryTimer);
                countryTimer = null;
            }
            countryTimer = setInterval(() => {
                lineChart.dispatchAction({
                    type: 'showTip',
                    // 屏幕上的 x 坐标
                    x: step * quarter,
                    // 屏幕上的 y 坐标
                    y: 100
                });
            }, 5000);
        }

        // 乡村游出游人次
        if (this.state.villageActive.startsWith('chuXing') && citys && data) {
            adCharts.barChart({
                chartId: 'villageOutingBarChart',
                legend: ['乡村游出游人次'],
                legendShow: false,
                gridTop: 30,
                gridBottom: 40,
                dataZoom: getDataZoom({
                    lengthMax: citys.length,
                    showLength: 7
                }),
                xAxisData: citys,
                yAxisName: '流量 (万)',
                series: [data]
            });

        }

    }

    componentDidMount() {
        analysisIndexObj = {
            province: 0,
            country: 0
        };
        // 1. 获取客情大数据的时间选项组
        getTouristDataOptions().then(data => {
            this.setState({
                optionsData: data
            }, () => {
                // 初始化默认数据
                this.fetchProvinceCustomerData([data.sex[0].year, data.sex[0].monthOrQuarter]);
                this.fetchCountyData([data.jieDai[0].year, data.jieDai[0].monthOrQuarter]);
            });
        });
    }

    /**
     * @description 获取四川省游客分析数据
     * @param params
     */
    fetchProvinceCustomerData = (params) => {
        getProvinceCustomerData(params).then(data => {
            let {age_data, gender_data, flow_data} = data;
            // 处理年龄数据
            if (age_data && age_data.data && age_data.data.length) {
                let ageData = age_data.data;
                let ageSeriesData = ageData.map((ageSeries) => {
                    return {
                        name: ageSeries.ageZone,
                        value: Number(ageSeries.ratio) * 100
                    };
                });
                if (ageSeriesData && ageSeriesData.length) {
                    this.setState(({provinceTouristData}) => ({
                        provinceTouristData: provinceTouristData.set('ageData', ageSeriesData)
                    }), () => {
                        this.renderProvinceTouristData(params[1]);
                    });
                }
            }

            // 处理性别数据
            if (gender_data && gender_data.data && gender_data.data.length) {
                let genderData = gender_data.data;
                let genderSeriesData = new Array(2);

                // 男放第一个元素，女则为第二个元素
                genderData.forEach(genderSeries => {
                    genderSeriesData[genderSeries.gender === '男' ? 0 : 1] = (genderSeries.genderRatio * 100).toFixed(2) + '%';
                });

                if (genderSeriesData && genderSeriesData.length) {
                    this.setState(({provinceTouristData}) => ({
                        provinceTouristData: provinceTouristData.set('genderData', genderSeriesData)
                    }));
                }
            }

            // 处理流量分析
            if (flow_data && flow_data.length) {
                let provinceFlowAnalysis = this.state.flowAnalysis.get('province');
                provinceFlowAnalysis.splice(0, provinceFlowAnalysis.length);
                for (let item of flow_data) {
                    for (let [key, value] of Object.entries(item)) {
                        provinceFlowAnalysis.push({
                            name: value.name,
                            value: key,
                            data: [value.data.map((dataItem) => {
                                return dataItem.personTimeView;
                            }), value.data.map(dataItem => {
                                return dataItem.personCountView;
                            })]
                        });
                    }
                }
                this.setState(({flowAnalysis, selectedFlowAnalysisIndex}) => ({
                    flowAnalysis: this.state.flowAnalysis,
                    selectedFlowAnalysisIndex: analysisIndexObj.province
                }), () => {
                    this.renderProvinceTouristData(params[1]);  // 默认传数组第一个元素
                });
            }
        });
    };

    /**
     * @description 获取乡村游游客分析
     * @params params
     */
    fetchCountyData = (params) => {
        let activeType = this.state.villageActive;

        params.push(activeType.split('-')[1]);

        getCountyData(params).then(data => {
            let {
                country_tour_age_reception,
                country_tour_person_Time_reception,
                country_tour_potential_reception,
                country_tour_residence_zone_reception
            } = data;

            let {
                country_tour_age_trips,
                country_tour_person_Time_Trips,
                country_tour_potential_trips,
                country_tour_residence_zone_trips
            } = data;

            let countryTourAge = activeType.startsWith('jieDai') ? country_tour_age_reception : country_tour_age_trips;
            let countryTourPotential = activeType.startsWith('jieDai') ? country_tour_potential_reception : country_tour_potential_trips;
            let countryTourResidenceZone = activeType.startsWith('jieDai') ? country_tour_residence_zone_reception : country_tour_residence_zone_trips;

            // 处理年龄数据
            let ageSeriesData = null;

            if (countryTourAge && countryTourAge.length) {
                ageSeriesData = countryTourAge.map((ageSeries) => {
                    return {
                        name: ageSeries.ageZone,
                        value: (Number(ageSeries.ratio) * 100).toFixed(2) - 0
                    };
                });
            }

            // 处理乡村游消费潜力分布数据
            let potentialData = {
                potentialLevels: [],
                data: []
            };

            if (countryTourPotential && countryTourPotential.length) {
                countryTourPotential.sort((a, b) => {
                    return a.potential - b.potential;
                });

                countryTourPotential.forEach((potentialSeries) => {
                    potentialData.potentialLevels.push(potentialSeries.potential + '星');
                    potentialData.data.push(Number(potentialSeries.ratio).toFixed(2) - 0);
                });
            }

            // 乡村游时长分布
            let tripTimeData = null;

            if (countryTourResidenceZone && countryTourResidenceZone.length) {
                tripTimeData = countryTourResidenceZone.map((time) => {
                    return (Number(time.ratio) * 100).toFixed(2) - 0;
                }).reverse();
            }

            if (ageSeriesData && ageSeriesData.length && potentialData && tripTimeData && tripTimeData.length) {
                this.setState(({villageTouristData}) => ({
                    villageTouristData: villageTouristData.set('ageData', ageSeriesData)
                        .set('consumptionPotential', potentialData)
                        .set('tripTime', tripTimeData)
                }), () => {
                    this.renderCountryTouristData(params[1]);
                });
            }

            // 处理流量分析
            let countryFlowAnalysis = this.state.flowAnalysis.get('country');

            if (country_tour_person_Time_reception) {
                countryFlowAnalysis.splice(0, countryFlowAnalysis.length);
                for (let [key, value] of Object.entries(country_tour_person_Time_reception)) {
                    countryFlowAnalysis.push({
                        name: value.name,
                        value: key,
                        data: [value.data.map((dataItem) => {
                            return Number((dataItem.personTime / 10000 - 0).toFixed(2));
                        }), value.data.map(dataItem => {
                            return Number((dataItem.personCount / 10000 - 0).toFixed(2));
                        })]
                    });
                }
                this.state.flowAnalysis.set('country', countryFlowAnalysis.reverse());
                this.setState(({flowAnalysis, selectedCountryFlowAnalysisIndex}) => ({
                    flowAnalysis: this.state.flowAnalysis,
                    selectedCountryFlowAnalysisIndex: analysisIndexObj.country
                }), () => {
                    this.renderCountryTouristData(params[1]);  // 默认传数组第一个元素
                });
            }

            // 乡村游出游人次
            let countryTourPeopleTime = country_tour_person_Time_Trips;

            let peopleTimeData = this.state.peopleTimeData;

            if (countryTourPeopleTime && countryTourPeopleTime.length) {
                countryTourPeopleTime.forEach(item => {
                    item.city = item.city.length > 5 ? item.city.substr(0, 2) : item.city;
                    peopleTimeData.citys.push(item.city);
                    peopleTimeData.data.push(Number((item.personTime / 10000).toFixed(2)));
                });

                this.setState({
                    peopleTimeData
                }, () => {
                    this.renderCountryTouristData(params[1]);
                });
            }

        });
    };

    /**
     * @description 获取PanelCard头部选项
     * @param options 各种选项
     * @param getDataFunc 获取数据的回调
     * @returns {{timeSelectRequired: *, zoomRequired: *, options: *}}
     */
    getHeaderOptions(options, getDataFunc) {
        let callback = function (year, monthOrQuarter) {
            getDataFunc && getDataFunc([year, monthOrQuarter]);
        };
        return getHeaderOptions(options, this.state.optionsData, callback);
    }

    // 流量分析下拉选择
    flowAnalysisSelect = (e, type) => {
        let index = e.target.value;
        analysisIndexObj[type] = index;
        if (type === 'province') {
            this.setState({
                selectedFlowAnalysisIndex: index
            }, () => {
                this.renderProvinceTouristData(provinceTouristQuarter);
            });
        }

        if (type === 'country') {
            this.setState({
                selectedCountryFlowAnalysisIndex: e.target.value
            }, () => {
                this.renderCountryTouristData(countryTouristQuarter);
            });
        }
    };

    render() {

        const {provinceTouristData, flowAnalysis, selectedFlowAnalysisIndex, selectedCountryFlowAnalysisIndex, optionsData} = this.state;
        const {genderData} = provinceTouristData.toObject();

        const provinceFlowAnalysis = flowAnalysis.get('province');
        const countryFlowAnalysis = flowAnalysis.get('country');

        const countryTripOptions = {
            clickBack: (buttonInfo) => {

                if (buttonInfo) {
                    this.setState({
                        villageActive: buttonInfo.buttonName.includes('接待') ? 'jieDai-2' : 'chuXing-1'
                    }, () => {
                        this.fetchCountyData([this.state.optionsData[this.state.villageActive.split('-')[0]][0].year, this.state.optionsData[this.state.villageActive.split('-')[0]][0].monthOrQuarter]);
                    });
                }
            },
            buttons: [
                {
                    buttonName: '接待',
                    value: '2'
                },
                {
                    buttonName: '出行',
                    value: '1'
                }
            ]
        };

        return <div className="tourist-data">
            <Row>
                <Col span={12} lg={24} xl={12}>
                    <PanelCard
                        title="四川省游客分析" {...this.getHeaderOptions([true, false, 'sex', true], this.fetchProvinceCustomerData)}
                        className="br-line" headerClassName="header-bg color-white month-top-12">
                        <Row>
                            <Col span={12}>
                                <PanelCard title="四川省游客年龄分布">
                                    <div id="provinceAgePieChart" style={{width: '100%', height: 260}}></div>
                                </PanelCard>
                            </Col>
                            <Col span={12}>
                                <PanelCard title="四川省游客性别分布">
                                    <div className="sex-distribution">
                                        <div className="total male-total">
                                            <img src={maleIcon} alt="男性"/>
                                            <div className="info-data">
                                                <span>男性<em>{genderData[0] || '0%'}</em></span>
                                                <div className="data-bar male-bar"
                                                     style={{width: genderData[0] || '0%'}}></div>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <img src={femaleIcon} alt="女性"/>
                                            <div className="info-data">
                                                <span>女性<em>{genderData[1] || '0%'}</em></span>
                                                <div className="data-bar female-bar"
                                                     style={{width: genderData[1] || '0%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <PanelCard title="四川省游客流量分析">
                                    <Select trigger="click" className="flow-analysis"
                                            value={selectedFlowAnalysisIndex !== undefined ? selectedFlowAnalysisIndex : ' '}
                                            onChange={(e) => this.flowAnalysisSelect(e, 'province')}>
                                        {
                                            (provinceFlowAnalysis && provinceFlowAnalysis.length > 0) && provinceFlowAnalysis.map((item, index) => {
                                                return <Option value={index} key={index}>{item.name}</Option>;
                                            })
                                        }
                                    </Select>
                                    <div id="provinceFlowLineChart" style={{width: '100%', height: 260}}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
                <Col span={12} lg={24} xl={12}>
                    <PanelCard
                        title="乡村游游客分析"  {...this.getHeaderOptions([true, false, this.state.villageActive.split('-')[0], true], this.fetchCountyData)}
                        headerClassName="header-bg color-white month-top-12">
                        <ToggleButtonGroup {...countryTripOptions}
                                           style={{'position': 'absolute', 'top': 15, 'right': 195}}/>
                        <Row>
                            <Col span={12}>
                                <PanelCard title="乡村游游客年龄分析" zoomRequired={false} timeSelectRequired={false}>
                                    <div id="villageAgePieChart" style={{width: '100%', height: 260}}></div>
                                </PanelCard>
                            </Col>
                            <Col span={12}>
                                <PanelCard title="乡村游消费潜力分布" zoomRequired={false} timeSelectRequired={false}>
                                    <div id="villageConsumptionBarChart" style={{width: '100%', height: 260}}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            {
                                this.state.villageActive.startsWith('jieDai') ? (<Col span={16}>
                                        <PanelCard title="乡村游客流量分析" zoomRequired={false} timeSelectRequired={false}>
                                            <Select trigger="click" className="flow-analysis"
                                                    value={selectedCountryFlowAnalysisIndex !== undefined ? selectedCountryFlowAnalysisIndex : ' '}
                                                    onChange={(e) => this.flowAnalysisSelect(e, 'country')}>
                                                {
                                                    (countryFlowAnalysis && countryFlowAnalysis.length > 0) && countryFlowAnalysis.map((item, index) => {
                                                        return <Option value={index} key={index}>{item.name}</Option>;
                                                    })
                                                }
                                            </Select>
                                            <div id="villageFlowLineChart" style={{width: '100%', height: 260}}></div>
                                        </PanelCard>
                                    </Col>) :
                                    (<Col span={16}>
                                        <PanelCard title="乡村游出游人次" zoomRequired={false} timeSelectRequired={false}>
                                            <div id="villageOutingBarChart" style={{width: '100%', height: 260}}></div>
                                        </PanelCard>
                                    </Col>)
                            }

                            <Col span={8}>
                                <PanelCard title="乡村游时长分布" zoomRequired={false} timeSelectRequired={false}>
                                    <div id="villageDurationPercentBarChart" style={{width: '100%', height: 260}}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>

            <Row gutter={2}>
                <Col span={6} lg={12} xl={6}>
                    <FiveEconomicZone timeRange={optionsData}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <TouristStay timeRange={optionsData}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <TouristSource timeRange={optionsData}/>
                </Col>
                <Col span={6} lg={12} xl={6}>
                    <TrafficType timeRange={optionsData}/>
                </Col>
            </Row>
        </div>;
    }
}