/**
 * @description 全省旅游搜索热度趋势
 */
import React, {Component} from 'react';
import PanelCard from '../../../commonComponent/PanelCard';
import AdCharts from '../../../../utils/adCharts';
import {getHeaderOptions} from '../../../../utils/tools';
import {getProvinceSearchTrend} from '../../../../services/DataAnalysis/searchData';
import {getDataZoom} from '../../../../utils/tools';

const geoCoordMap = {
    '新疆': [87.68, 43.77],
    '甘肃': [103.73, 36.03],
    '青海': [101.74, 36.56],
    '拉萨': [91.11, 29.97],
    '宁夏': [106.27, 38.47],
    '内蒙古': [111.65, 40.82],
    '海南': [110.35, 20.02],
    '上海': [121.48, 31.22],
    '安徽': [117.27, 31.86],
    '江苏': [118.78, 32.04],
    '浙江': [120.19, 30.26],
    '广东': [113.23, 23.16],
    '福建': [119.3, 26.08],
    '广西': [108.33, 22.84],
    '河南': [113.65, 34.76],
    '湖北': [114.31, 30.52],
    '湖南': [113, 28.21],
    '江西': [115.89, 28.68],
    '北京': [116.46, 39.92],
    '吉林': [125.35, 43.88],
    '大连': [121.62, 38.92],
    '辽宁': [123.38, 41.8],
    '黑龙江': [126.63, 45.75],
    '天津': [117.2, 39.13],
    '山东': [117, 36.65],
    '青岛': [120.33, 36.07],
    '山西': [112.53, 37.87],
    '河北': [114.48, 38.03],
    '陕西': [108.95, 34.27],
    '四川': [104.06, 30.67],
    '重庆': [106.54, 29.59],
    '云南': [102.73, 25.04],
    '贵州': [106.63, 26.64]
};

let convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

export default class SearchPeopleSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            year: null,
            panelProps: null
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.timeRange) {
            return;
        }
        if (this.state.panelProps) {
            return;
        }
        let times = nextProps.timeRange.quarter;
        let yearObj = {};
        let timeFilter = [];
        times.forEach((time) => {
            let year = time.year;
            if (yearObj[year] === undefined) {
                yearObj[year] = true;
                timeFilter.push({year: time.year, monthOrQuarter: ''});
            }
        });
        this.getHeaderOptions(timeFilter);
    }

    getHeaderOptions(times) {
        if (!times) {
            return;
        }
        let time = times[0] || {};
        this.setState({
            panelProps: getHeaderOptions({
                data: times,
                clickBack: (year) => {
                    this.setState({
                        year: year
                    }, () => {
                        this.fetchProvinceSearchTrend();
                    });
                }
            }),
            year: time.year || null
        }, () => {
            this.fetchProvinceSearchTrend();
        });
    }

    // 获取全省旅游搜索热度趋势
    fetchProvinceSearchTrend() {
        getProvinceSearchTrend([this.state.year]).then(data => {
            let xAxisData = [],
                series = [];
            data.forEach(item => {
                let date = item.searchDate.split(' ')[0];
                let dateArr = date.split('-');
                xAxisData.push(dateArr[1] + '-' + dateArr[2]);
                series.push(item.searchCount);
            });
            this.print({xAxisData, series});
        });
    }

    print(params) {
        // 全省旅游搜索热度趋势
        AdCharts.lineChart({
            chartId: 'provinceSearchHotLineChart',
            legend: ['旅游搜索热度趋势'],
            legendShow: false,
            xAxisData: params.xAxisData,
            gradientColor: [[{offset: 0, color: 'rgba(0, 164, 250, 1)'}, {offset: 0.8, color: 'rgba(0, 164, 250, 0)'}]],
            lineStyleColor: ['#00a2f5'],
            smooth: true,
            stack: true,
            series: [params.series],
            dataZoom: getDataZoom({
                lengthMax: params.series.length,
                showLength: 6
            })
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        let {visible, panelProps} = this.state;
        return <div>
            <PanelCard title="全省旅游搜索热度趋势" {...panelProps}>
                <div id="provinceSearchHotLineChart" style={{width: '100%', height: 600}}/>
            </PanelCard>
        </div>;
    }
}