/**
 * @description 客情大数据
 */
import React, { Component } from 'react';
import PanelCard from '../commonComponent/PanelCard';
import adCharts from '../../utils/adCharts';
import { Row, Col } from 'antd';
import 'antd/lib/grid/style';
import maleIcon from '../../assets/images/male.png';
import femaleIcon from '../../assets/images/female.png';
import { getTouristDataOptions, getProvinceCustomerData, getCountyData, getZoneCustomerTimes, getZoneTouristResidentTime, getZoneTouristResourceRank, getZoneTouristTrafficType } from '../../services/DataAnalysis/touristData';
import { Map, List } from 'immutable';
import { getHeaderOptions } from '../../utils/util';
import ToggleButtonGroup from "../commonComponent/ToggleButtonGroup";
import { Select } from 'mtui/index';
import './style.scss';

const Option = Select.Option;

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
                consumptionPotential: [],   // 消费潜力
                tripTime: []                // 乡村游时长
            }),
            fiveZonePeopleNumData: List(),   // 五大经济区客游人次
            touristDelayTimeData: List(),   // 游客停留时长
            villageActive: 'jieDai-2',    // 默认激活的为接待按钮，值为2
            optionsData: {
                chuXing: null,          // 乡村游客分析-出行
                jieDai: null,           // 乡村游客分析-接待
                sex: null,              // 四川省游客性别分布
                stayTime: null,         // 游客停留时长
                touristRank: null,      // 五大经济区游客来源排名
                touristTimes: null,     // 五大经济区客游人次
                trafficType: null       // 游客交通方式
            },
            economicZoneSelected: 'CHENG_DU',        // 默认选择的是成都平原经济区
            peopleSourceRank: [],                    // 五大经济区游客来源排名
            flowAnalysis: [],                        // 游客流量分析选项和数据
            selectedFlowAnalysisOption: {}           // 选中的流量分析选项
        };

        this.economicZoneSort = ['川西北生态经济区', '攀西经济区', '川东北经济区', '川南经济区', '成都平原经济区'];
        this.renderProvinceTouristData = this.renderProvinceTouristData.bind(this);
    }

    /**
     * @description 渲染四川省游客分析
     */
    renderProvinceTouristData() {
        const { provinceTouristData, flowAnalysis } = this.state;

        // 四川省游客年龄分布图
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

        // 四川省客流量分析
        if(flowAnalysis && flowAnalysis.length) {
            adCharts.lineChart({
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
                series: flowAnalysis[0].data
            });
        }
    }

    /**
     * @description 渲染乡村游游客分析
     */
    renderCountryTouristData() {

        const { villageTouristData } = this.state;
        // 乡村游游客年龄分析
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

        // 乡村游消费潜力分布
        adCharts.percentBarChart({
            chartId: 'villageConsumptionBarChart',
            title: '释义: 星级越高，消费者潜力越强',
            titleLeft: 20,
            titleFontSize: 12,
            legendShow: false,
            xAxisData: ['1星','2星','3星','4星','5星','6星','7星','8星','9星','10星'],
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
            series: [[100,100,100,100,100,100,100,100,100,100], villageTouristData.get('consumptionPotential')]
        });

        // 乡村游时长分布
        adCharts.percentBarChart({
            chartId: 'villageDurationPercentBarChart',
            legendShow: false,
            yAxisData: ["120h以上".padEnd(7, ' '), "96h-120h", "72h-96h".padEnd(8, ' '), "48h-72h".padEnd(8, ' '), "24h-48h".padEnd(8, ' '), "12h-24h".padEnd(8, ' '), "6h-12h".padEnd(9, ' ')],
            row: true,
            barWidth: 8,
            colors: ['#415870', '#00a9ff'],
            gridRight: 70,
            yAxisLineShow: false,
            xAxisLineShow: false,
            xAxisLabelShow: false,
            series: [ [100, 100, 100, 100, 100, 100, 100], villageTouristData.get('tripTime')]
        });
    }

    /**
     * @description 五大经济区客游人次
     */
    renderFiveZonePeopleData() {
        // 五大经济区客游人次
        adCharts.barChart({
            chartId: 'fiveEconomicZoneBarChart',
            legend: ['五大经济区客游人次'],
            legendShow: false,
            title: '单位 : 万',
            titleRight: 28,
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            xAxisLineShow: false,
            xAxisLabelShow: false,
            yAxisLineShow: false,
            row: true,
            gridLeft: '5%',
            seriesLabelShow: true,
            series: [this.state.fiveZonePeopleNumData.reverse().toArray()]
        });
    }

    /**
     * @description 游客停留时长
     */
    renderTouristDelayTimeData() {

        const { touristDelayTimeData } = this.state;

        // 游客停留时长
        adCharts.barChart({
            chartId: 'touristStayBarChart',
            legend: ['0-12', '13-24', '25-48', '49-72', '73-96', '97-120', '121-144', '145-360', '360+'],
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            barWidth: 14,
            colors: ['#00a9ff', '#32c889', '#ddcf73', '#1b75d3', '#3559c5', '#5334c5', '#0dbbc7', '#b6dd74', '#9e35c5'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '10',
            legendItemGap: 10,
            gridTop: 45,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: touristDelayTimeData.toArray()
        });
    }


    componentDidMount() {
        // 1. 获取客情大数据的时间选项组
        getTouristDataOptions().then(data => {
            console.log('时间选项组:', data);
            this.setState({
                optionsData: data
            }, () => {
                // 初始化默认数据
                this.fetchProvinceCustomerData([data.sex[0].year, data.sex[0].monthOrQuarter]);
                this.fetchCountyData([data.jieDai[0].year, data.jieDai[0].monthOrQuarter]);
                this.fetchFiveZoneData([data.touristTimes[0].year, data.touristTimes[0].monthOrQuarter]);
                this.fetchTouristDelayTime([data.stayTime[0].year, data.stayTime[0].monthOrQuarter]);
                this.fetchFiveZoneTouristRank([data.touristRank[0].year, data.touristRank[0].monthOrQuarter]);
                this.fetchFiveZoneTrafficType([data.trafficType[0].year, data.trafficType[0].monthOrQuarter]);
            });
        });

        // this.fetchProvinceCustomerData();

        // 乡村游出游人次
        adCharts.barChart({
            chartId: 'villageOutingBarChart',
            legend: ['乡村游出游人次'],
            legendShow: false,
            gridTop: 60,
            gridBottom: 40,
            xAxisData: ['阿坝', '巴中', '成都', '达州', '广安', '广元'],
            yAxisName: '流量 (万)',
            series: [[6000, 8000, 11000, 4000, 6500, 3000]]
        });

        // 游客交通方式
        adCharts.barChart({
            chartId: 'touristTrafficWayBarChart',
            legend: ['其他', '火车', '高铁', '飞机'],
            yAxisData: ['川西北生态经济区', '攀西经济区'.padEnd(14, ' '), '川东北经济区'.padEnd(12, ' '), '川南经济区'.padEnd(14, ' '), '成都平原经济区'.padEnd(10, ' ')],
            barWidth: 14,
            colors: ['#00a9ff', '#0dbbc7', '#32c889', '#b6dd74'],
            legendIcon: 'circle',
            legendRight: '10%',
            legendTop: '20',
            legendItemGap: 10,
            gridTop: 45,
            xAxisLineShow: false,
            yAxisLineShow: false,
            row: true,
            stack: true,
            series: [[34, 32, 23, 12, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32], [43, 32, 23, 32, 32]]
        });

        adCharts.lineChart({
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
            top: 10,
            right: 30,
            bottom: 40,
            colors: ['#32c889', '#00a9ff'],
            series: [[8500, 4500, 3400, 2300], [3242, 2334, 2312, 3232]]
        });

    }

    /**
     * @description 获取四川省游客分析数据
     * @param params
     */
    fetchProvinceCustomerData = (params) => {
        getProvinceCustomerData(params).then(data => {
            console.log('获取到四川省游客分析数据:', data);

            let { age_data, gender_data, flow_data } = data;

            // 处理年龄数据
            if(age_data && age_data.data && age_data.data.length) {
                let ageData = age_data.data;
                let ageSeriesData = ageData.map((ageSeries) => {
                    return {
                        name: ageSeries.ageZone,
                        value: Number(ageSeries.ratio) * 100
                    };
                });

                if(ageSeriesData && ageSeriesData.length) {
                    this.setState(({ provinceTouristData }) => ({
                        provinceTouristData: provinceTouristData.set('ageData', ageSeriesData)
                    }), () => {
                        this.renderProvinceTouristData();
                    })
                }
            }

            // 处理性别数据
            if(gender_data && gender_data.data && gender_data.data.length) {
                let genderData = gender_data.data;
                let genderSeriesData = new Array(2);

                // 男放第一个元素，女则为第二个元素
                genderData.forEach(genderSeries => {
                    genderSeriesData[genderSeries.gender === '男' ? 0 : 1] = (genderSeries.genderRatio * 100).toFixed(2) + '%';
                });

                if(genderSeriesData && genderSeriesData.length) {
                    this.setState(({ provinceTouristData }) => ({
                        provinceTouristData: provinceTouristData.set('genderData', genderSeriesData)
                    }));
                }
            }

            // 处理流量分析
            if(flow_data && flow_data.length ) {
                for(let item of flow_data) {
                    for(let [key, value] of Object.entries(item)) {
                        this.state.flowAnalysis.push({
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

                this.setState({
                    flowAnalysis: this.state.flowAnalysis,
                    selectedFlowAnalysisIndex: 0
                }, () => {
                    this.renderProvinceTouristData();
                });
            }
        });
    }

    /**
     * @description 获取乡村游游客分析
     * @params params
     */
    fetchCountyData = (params) => {
        params.push(this.state.villageActive.split('-')[1]);

        getCountyData(params).then(data => {
            console.log('乡村游游客分析:', data);

            let {
                country_tour_age_reception,
                country_tour_person_Time_reception,
                country_tour_potential_reception,
                country_tour_residence_zone_reception
            } = data;
            // 处理年龄数据
            let ageSeriesData = null;

            if(country_tour_age_reception && country_tour_age_reception.length) {
                let ageData = country_tour_age_reception;
                ageSeriesData = ageData.map((ageSeries) => {
                    return {
                        name: ageSeries.ageZone,
                        value: (Number(ageSeries.ratio) * 100).toFixed(2) - 0
                    };
                });
            }

            let consumptionPotential = country_tour_potential_reception;
            let potentialData = null;

            // 处理乡村游消费潜力分布数据
            if(consumptionPotential && consumptionPotential.length) {
                potentialData = consumptionPotential.map((potentialSeries) => {
                    return Number(potentialSeries.ratio).toFixed(2) - 0;
                });
            }

            // 乡村游时长分布
            let tripTime = country_tour_residence_zone_reception;
            let tripTimeData = null;

            if(tripTime && tripTime.length) {
                tripTimeData = tripTime.map((time) => {
                    return (Number(time.ratio) * 100).toFixed(2) - 0;
                })
            }

            if(ageSeriesData && ageSeriesData.length && potentialData && potentialData.length && tripTimeData && tripTimeData.length) {
                this.setState(({ villageTouristData }) => ({
                    villageTouristData: villageTouristData.set('ageData', ageSeriesData)
                        .set('consumptionPotential', potentialData)
                        .set('tripTime', tripTimeData)
                }), () => {
                    this.renderCountryTouristData();
                })
            }

        });
    }

    /**
     * @description 获取五大经济区客游人次
     * @param params
     */
    fetchFiveZoneData = (params) => {
        getZoneCustomerTimes(params).then(data => {
            console.log('获取五大经济区客游人次:', data);
            let customerTimes = data;

            if(customerTimes && customerTimes.length) {
                let fiveZonePeopleData = customerTimes.map(time => time.personTimeView);
                this.setState(({ fiveZonePeopleNumData }) => ({
                    fiveZonePeopleNumData: List(fiveZonePeopleData)
                }), () => {
                    this.renderFiveZonePeopleData();
                })
            }
        })
    }

    /**
     * @description 获取五大经济区游客停留时长
     * @param params
     */
    fetchTouristDelayTime = (params) => {
        getZoneTouristResidentTime(params).then(resultData => {
            console.log('获取五大经济区游客停留时长', resultData);
            let economicZoneSort = this.economicZoneSort.slice();
            let delayTime = [];

            if(economicZoneSort && economicZoneSort.length) {
                while(economicZoneSort && economicZoneSort.length) {
                    for(let itemValue of Object.values(resultData)) {
                        let { data, name } = itemValue;
                        if(name === economicZoneSort[0]) {
                            delayTime.push(data.map(item => item.personCountView - 0));
                            economicZoneSort.shift();
                            break;
                        }
                    }
                }
                console.log('结果：', delayTime);

                this.setState(({ touristDelayTimeData }) => ({
                    touristDelayTimeData: List(delayTime)
                }), () => {
                    this.renderTouristDelayTimeData();
                });
            }
        })
    }

    /**
     * @description 获取五大经济区游客来源排名
     * @param params
     */
    fetchFiveZoneTouristRank = (params) => {
        getZoneTouristResourceRank(params).then(data => {
            console.log('获取五大经济区游客来源排名', data);

            if(data) {
                this.setState({
                    peopleSourceRank: data
                });
            }
        })
    }

    /**
     * @description 获取五大经济区游客交通方式
     * @param params
     */
    fetchFiveZoneTrafficType = (params) => {
        getZoneTouristTrafficType(params).then(resultData => {
            console.log('获取五大经济区游客交通方式', resultData);
            let economicZoneSort = this.economicZoneSort.slice();
            let delayTime = [];

            if(economicZoneSort && economicZoneSort.length) {
                while(economicZoneSort && economicZoneSort.length) {
                    for(let itemValue of Object.values(resultData)) {
                        let { data, name } = itemValue;
                        if(name === economicZoneSort[0]) {
                            delayTime.push(data.map(item => item.personCount));
                            economicZoneSort.shift();
                            break;
                        }
                    }
                }
                console.log('结果：', delayTime);

                this.setState(({ touristDelayTimeData }) => ({
                    touristDelayTimeData: List(delayTime)
                }), () => {
                    this.renderTouristDelayTimeData();
                });
            }
        })
    }

    /**
     * @description 获取PanelCard头部选项
     * @param options 各种选项
     * @param getDataFunc 获取数据的回调
     * @returns {{timeSelectRequired: *, zoomRequired: *, options: *}}
     */
    getHeaderOptions(options, getDataFunc) {
        let callback = function(year, monthOrQuarter) {
            console.log('year:', year, 'monthOrQuarter:', monthOrQuarter);
            getDataFunc && getDataFunc([year, monthOrQuarter]);
        }
        return getHeaderOptions(options, this.state.optionsData, callback);
    }

    render() {

        const { provinceTouristData, peopleSourceRank, economicZoneSelected, flowAnalysis, selectedFlowAnalysisIndex} = this.state;
        const { genderData } = provinceTouristData.toObject();

        const countryTripOptions = {
            clickBack: (buttonInfo) => {

                if(buttonInfo) {
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

        const economicZone = [
            {
                name: '成都平原经济区',
                value: 'CHENG_DU'
            },
            {
                name: '川南经济区',
                value: 'CHUAN_NAN'
            },
            {
                name: '川东北经济区',
                value: 'CHUAN_DONG'
            },
            {
                name: '攀西经济区',
                value: 'PAN_XI'
            },
            {
                name: '川西北生态经济区',
                value: 'CHUAN_XI'
            }
        ];

        return <div className="tourist-data">
            <Row>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="四川省游客分析" { ...this.getHeaderOptions([true, false, 'sex', true], this.fetchProvinceCustomerData)} className="br-line" headerClassName="header-bg color-white month-top-12">
                        <Row>
                            <Col span={ 12 }>
                                <PanelCard title="四川省游客年龄分布">
                                    <div id="provinceAgePieChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 12 }>
                                <PanelCard title="四川省游客性别分布">
                                    <div className="sex-distribution">
                                        <div className="total male-total">
                                            <img src={ maleIcon } alt="男性"/>
                                            <div className="info-data">
                                                <span>男性<em>{ genderData[0] || '0%'}</em></span>
                                                <div className="data-bar male-bar" style={{ width: genderData[0] || '0%' }}></div>
                                            </div>
                                        </div>
                                        <div className="total">
                                            <img src={ femaleIcon } alt="女性"/>
                                            <div className="info-data">
                                                <span>女性<em>{ genderData[1] || '0%'}</em></span>
                                                <div className="data-bar female-bar" style={{ width: genderData[1] || '0%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <PanelCard title="四川省游客流量分析">
                                    <Select trigger="click" className="flow-analysis" value={ selectedFlowAnalysisIndex !== undefined ? selectedFlowAnalysisIndex : ' '}>
                                        {
                                            (flowAnalysis && flowAnalysis.length > 0) && flowAnalysis.map((item, index) => {
                                                return <Option value={ index } key={ index }>{ item.name }</Option>
                                            })
                                        }
                                    </Select>
                                    <div id="provinceFlowLineChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
                <Col span={ 12 } lg={ 24 } xl={ 12 }>
                    <PanelCard title="乡村游游客分析"  { ...this.getHeaderOptions([true, false, this.state.villageActive.split('-')[0], true], this.fetchCountyData)} headerClassName="header-bg color-white month-top-12">
                        <ToggleButtonGroup { ...countryTripOptions } style={{ 'position': 'absolute', 'top': 15, 'right': 195 }}/>
                        <Row>
                            <Col span={ 12 }>
                                <PanelCard title="乡村游游客年龄分析" zoomRequired={ false } timeSelectRequired={ false }>
                                    <div id="villageAgePieChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 12 }>
                                <PanelCard title="乡村游消费潜力分布" zoomRequired={ false } timeSelectRequired={ false }>
                                    <div id="villageConsumptionBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 16 } className="hide">
                                <PanelCard title="乡村游出游人次" zoomRequired={ false } timeSelectRequired={ false }>
                                    <div id="villageOutingBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 16 }>
                                <PanelCard title="乡村游客流量分析" zoomRequired={ false } timeSelectRequired={ false }>
                                    <div id="villageFlowLineChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                            <Col span={ 8 }>
                                <PanelCard title="乡村游时长分布" zoomRequired={ false } timeSelectRequired={ false }>
                                    <div id="villageDurationPercentBarChart" style={{ width: '100%', height: 260 }}></div>
                                </PanelCard>
                            </Col>
                        </Row>
                    </PanelCard>
                </Col>
            </Row>

            <Row gutter={ 2 }>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="五大经济区客游人次" className="bg-grey" { ...this.getHeaderOptions([true, true, 'touristTimes', true], this.fetchFiveZoneData)}>
                        <div id="fiveEconomicZoneBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="游客停留时长" className="bg-grey" { ...this.getHeaderOptions([true, true, 'stayTime', true], this.fetchTouristDelayTime)}>
                        <div id="touristStayBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="五大经济区游客来源排名" className="bg-grey" { ...this.getHeaderOptions([true, true, 'touristRank', true], this.fetchFiveZoneTouristRank)}>
                        <Select trigger="click" className="economic-zone" value={ this.state.economicZoneSelected } onChange={ (e) => { this.setState({economicZoneSelected: e.target.value}); }}>
                            {
                                (economicZone && economicZone.length > 0) && economicZone.map((zone, index) => {
                                    return <Option value={ zone.value } key={ index }>{ zone.name }</Option>
                                })
                            }
                        </Select>
                        <table className="mt-table mt-table-noborder col-1-al" style={{ height: 280 }}>
                            <thead>
                            <tr>
                                <th className="pl-12">排名</th>
                                <th>省份</th>
                                <th>游客量(万)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (peopleSourceRank[economicZoneSelected] && peopleSourceRank[economicZoneSelected].data.length > 0) &&
                                 peopleSourceRank[economicZoneSelected].data.map((rank, index) => {
                                    return <tr key={ index }>
                                        <td>{ '0' + (index + 1) }</td>
                                        <td>{ rank.resourceProvince || '--' }</td>
                                        <td>{ rank.personCountView || '--'}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </PanelCard>
                </Col>
                <Col span={ 6 } lg={ 12 } xl={ 6 }>
                    <PanelCard title="游客交通方式" className="bg-grey" { ...this.getHeaderOptions([true, true, 'trafficType', true], this.fetchFiveZoneTrafficType)}>
                        <div id="touristTrafficWayBarChart" style={{ width: '100%', height: 300 }}></div>
                    </PanelCard>
                </Col>
            </Row>
        </div>;
    }
}