import echarts from 'echarts';
import $ from 'jquery';
import {colorHex, getDataZoom, deepClone} from '../utils/tools';

let mapChart = null;

/**
 *  @description 从上到下，依次为柱状图, 雷达图，饼图，线图(折线或面积图),地图(有纵向子级),地图(散点或视觉映射),数据区域缩放,百分比柱状图，多Y轴不同类型混合图, 词云图
 * @type {{barChart: AD_CHART.barChart, radarChart: AD_CHART.radarChart, pieChart: AD_CHART.pieChart, lineChart: AD_CHART.lineChart, mapLevelChart: AD_CHART.mapLevelChart, mapChart: AD_CHART.mapChart, zoomMap: AD_CHART.zoomMap, percentBarChart: AD_CHART.percentBarChart, multiYaxisTypeChart: AD_CHART.multiYaxisTypeChart, wordCloudChart: AD_CHART.wordCloudChart}}
 */
const AD_CHART = {
    barChart: function (params, callback) {
        let BarChart = echarts.init(document.getElementById(params.chartId));
        let seriesData = [];
        // 同一颜色
        if (params.unUnitColor === undefined) {
            for (let i = 0; i < params.series.length; i++) {
                let item = {
                    type: 'bar',
                    name: params.legend[i], // params.legend[i],
                    barGap: '0',
                    barWidth: params.barWidth === undefined ? '22' : params.barWidth,
                    stack: params.stack === undefined ? null : params.stack,
                    itemStyle: {
                        normal: {
                            barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius // 圆角度数
                        },
                        emphasis: {
                            barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius
                        }
                    },
                    label: {
                        normal: {
                            show: params.seriesLabelShow === undefined ? false : params.seriesLabelShow,
                            formatter: '{c}',
                            position: 'right',
                            offset: [4, 0],
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'sans-serif',
                                fontSize: params.itemSize || 14
                            }
                        }
                    },
                    data: params.series[i]
                };
                seriesData.push(item);
            }
        }

        let options = {
            color: params.colors === undefined ? ['#00a9ff', '#32c889', '#fe6321'] : params.colors,
            grid: {
                left: params.gridLeft === undefined ? '22' : params.gridLeft,
                top: params.gridTop === undefined ? '22' : params.gridTop,
                bottom: params.gridBottom === undefined ? '22' : params.gridBottom,
                right: params.gridRight === undefined ? '22' : params.gridRight,
                containLabel: params.containLabel === undefined ? true : params.containLabel
            },
            title: {
                text: params.title === undefined ? '' : params.title,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: params.titleSize || '14'
                },
                // left: '30%',
                right: params.titleRight || 'auto'
            },
            tooltip: {
                trigger: params.trigger || 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                // formatter: (p) => {
                //     console.log(p);
                // },
                confine: true
            },
            legend: {
                data: params.legend,
                right: params.legendRight === undefined ? 'right' : params.legendRight,
                icon: params.legendIcon === undefined ? '' : params.legendIcon,
                show: params.legendShow === undefined ? true : params.legendShow,
                orient: params.legendOrient === undefined ? 'horizontal' : 'vertical',
                itemGap: params.legendItemGap === undefined ? 20 : params.legendItemGap,
                top: params.legendTop === undefined ? '5%' : params.legendTop,
                itemWidth: params.legendWidth || 8,
                itemHeight: params.legendHeight || 8,
                textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: params.legendSize || 12
                }
            },
            xAxis: {
                type: params.row === undefined ? 'category' : 'value',
                data: params.xAxisData,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.xsplitLineShow === undefined ? false : params.xsplitLineShow,
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.xAxisLineShow === undefined ? true : params.xAxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#5d7288' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: params.xAxisLabelShow === undefined ? true : params.xAxisLabelShow,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor,
                        fontSize: params.labelTextFontSize || 14
                    }
                }
            },
            yAxis: {
                type: params.row === undefined ? 'value' : 'category',
                data: params.yAxisData,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                nameLocation: 'end',
                nameTextStyle: {
                    color: params.nameTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.nameTextColor,
                    fontSize: params.yAxisNameFontSize || 14
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.ysplitLineShow === undefined ? false : params.ysplitLineShow, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yAxisLineShow === undefined ? true : params.yAxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#5d7288' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: true,
                    margin: 20,
                    height: 80,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor,
                        fontSize: params.labelTextSize === undefined ? 14 : params.labelTextSize
                    }
                }
            },
            dataZoom: params.dataZoom || null,
            series: seriesData
        };
        if (params.unit) {
            options.tooltip.formatter = (p) => {
                return p[0].axisValue + '<br>' + p[0].marker + p[0].data + params.unit;
            };
        }
        if (params.dataZoom) {
            options.dataZoom = params.dataZoom;
        }
        BarChart.setOption(options, true);
        if (callback) {
            BarChart.on('click', function (param) {
                callback(param);
            });
        }
    },
    radarChart: function (params, callback) {
        let RadarChart = echarts.init(document.getElementById(params.chartId));
        let seriesData = [];
        RadarChart.showLoading();

        for (let i = 0; i < params.series.length; i++) {
            let seriesItem = {
                type: 'radar',
                name: params.legend[i],
                symbol: 'circle',
                data: [
                    {
                        value: params.series[i],
                        name: params.legend[i]
                    }
                ]
            };
            seriesData.push(seriesItem);
        }
        let options = {
            color: params.colors,
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                }
            },
            legend: {
                show: params.legendShow === undefined ? true : params.legendShow,
                data: params.legend === undefined ? [] : params.legend,
                top: params.legendTop || '60%',
                right: params.legendRight || '30',
                orient: 'vertical',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 20,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: params.legendSize || 14
                }
            },
            tooltip: {
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                }
            },
            radar: {
                nameGap: 20, // 指示器名称和指示器轴的距离
                radius: params.radarRadius || 100,
                center: ['40%', '60%'],
                shape: 'circle', // 雷达图绘制类型，支持 'polygon' 和 'circle'。
                startAngle: 90,  // 起始角度
                splitNumber: params.splitNumber || 5,
                splitArea: {
                    areaStyle: {
                        color: [
                            '#4b617a'
                        ]
                    }
                },
                triggerEvent: true,
                axisLabel: {
                    textStyle: {
                        show: true,
                        align: 'center',
                        color: 'red'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#7b8998', // 中间的米字线
                        type: 'solid' // 米字线类型
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#203a59' // 弧的分隔线
                    }
                },
                name: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: params.fontSize || 14
                    }
                },
                indicator: params.indicator
            },
            series: seriesData
        };
        RadarChart.hideLoading();
        RadarChart.setOption(options);
        // RadarChart.on('mouseover', function (param) {
        //     param.event.event.preventDefault();
        //     if (param.targetType === 'axisName') {
        //         let tipDemo = document.getElementById('radar-lable-tip');
        //         let offsetX = param.event.offsetX;
        //         let offsetY = param.event.offsetY;
        //         let newX = offsetX;
        //         let newY = offsetY;
        //         if (offsetX >= 250) {
        //             newX = offsetX - 190;
        //         }
        //
        //         if (newY >= 250) {
        //             newY = offsetY - 170;
        //         } else {
        //             newY = offsetY + 20;
        //         }
        //         tipDemo.innerHTML = params.tipsText[param.name.split('\n')[0]];
        //         tipDemo.style.top = newY + 'px';
        //         tipDemo.style.left = newX + 'px';
        //         tipDemo.style.display = 'block';
        //     }
        // });
        // RadarChart.on('mouseout', function (param) {
        //     if (param.targetType === 'axisName') {
        //         param.event.event.preventDefault();
        //         let tipDemo = document.getElementById('radar-lable-tip');
        //         tipDemo.innerHTML = '';
        //         tipDemo.style.display = 'none';
        //     }
        // });
    },
    pieChart: function (params, callback) {
        let PieChart = echarts.init(document.getElementById(params.chartId));
        let options = {
            color: params.color === undefined ? ['#ddcf73', '#b6dd74', '#32c889', '#0dbbc7', '#00a9ff', '#1b75d3', '#3559c5', '#3459C5'] : params.color,
            tooltip: {
                trigger: 'item',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                formatter: function (param) {
                    let info = '';
                    info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param.name}</b></p>
                                <p>占比<span class = "color-blue">${param.percent}%</span></p>
                            <div>`;
                    return info;
                }
            },
            title: {
                show: params.titleShow === undefined ? false : params.titleShow,
                text: params.title,
                x: 'center',
                bottom: params.titleBottom === undefined ? '10%' : params.titleBottom,
                textStyle: params.titleStyle === undefined ? {
                    color: '#cecece',
                    fontSize: 16
                } : params.titleStyle
            },
            legend: {
                show: params.legendShow === undefined ? true : params.legendShow,
                data: params.legend === undefined ? [] : params.legend,
                icon: params.legendIcon === undefined ? '' : params.legendIcon,
                orient: params.legendOrient || 'vertical',
                left: params.legendLeft || 'auto',
                top: params.legendTop || 140,
                width: params.legendWidth || 'auto',
                height: params.legendHeight === undefined ? 'auto' : params.legendHeight,
                right: params.legendRight === undefined ? 40 : params.legendRight,
                itemWidth: 8,
                itemHeight: 8,
                itemGap: params.itemGap || 10,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: params.legendSize || 14
                }
            },
            series: {
                name: params.name,
                type: 'pie',
                radius: params.radius === undefined ? ['40%', '75%'] : params.radius,
                center: params.center === undefined ? ['40%', '50%'] : params.center,
                data: params.data,
                minAngle: 7,
                label: {
                    normal: {
                        show: params.labelShow === undefined ? true : params.labelShow,
                        position: 'inside',
                        formatter: function (p) {
                            return p.percent + '%';
                        },
                        textStyle: {
                            fontSize: params.labelFontSize === undefined ? 12 : params.labelFontSize,
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontFamily: 'microsoft yahei'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: params.labelLineShow === undefined ? false : params.labelLineShow,
                        length: params.length === undefined ? 15 : params.length,
                        length2: params.length2 === undefined ? 20 : params.length2,
                        smooth: 0.2
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: params.borderWidth === undefined ? 0 : params.borderWidth,
                        borderColor: params.borderColor === undefined ? 'rgba(0, 0, 0, 0)' : params.borderColor
                    }
                }

            }
        };
        PieChart.setOption(options);
    },
    lineChart: function (params, callback) {
        let LineChart = echarts.init(document.getElementById(params.chartId));
        let gradientColor = params.gradientColor === undefined ? [
            [{offset: 0, color: 'rgb(244, 250, 254)'}, {offset: 1, color: 'rgb(130, 201, 238)'}],
            [{offset: 0, color: '#258dee'}, {offset: 1, color: '#258dee'}],
            [{offset: 0, color: '#74c6f5'}, {offset: 1, color: '#74c6f5'}]
        ] : params.gradientColor; // 渐变颜色
        let lineColor = ['#32c889', '#00a9ff'];
        let seriesData = [];
        let areaStyle = {};

        for (let i = 0; i < params.series.length; i++) {
            if (params.graphic === undefined) {
                areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i])
                    }
                };
            } else {
                areaStyle = {};
            }
            let item = {
                type: 'line',
                symbol: params.symbol === undefined ? 'emptyCircle' : params.symbol,
                symbolSize: params.symbolSize === undefined ? 4 : params.symbolSize,
                showSymbol: params.showSymbol === undefined ? true : params.showSymbol,
                smooth: params.smooth === undefined ? true : params.smooth, // 是否平滑显示
                name: params.legend[i],
                stack: params.stack === undefined ? null : params.stack,
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: params.lineStyleColor === undefined ? lineColor[i] : params.lineStyleColor[i],
                        opacity: params.lineStyleOpacity === undefined ? '0.5' : params.lineStyleOpacity,
                        width: params.lineStyleWidth === undefined ? 2 : params.lineStyleWidth
                    }
                },
                itemStyle: {
                    normal: params.itemStyle === undefined ? {
                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                        shadowBlur: 5
                    } : params.itemStyle
                },
                cursor: 'pointer',
                areaStyle: params.full === undefined ? areaStyle : params.graphic === undefined ? {normal: {}} : {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i])
                    }
                },
                data: params.series[i]
            };
            seriesData.push(item);
        }
        let options = {
            color: params.colors === undefined ? ['#24a9ee', '#ffdb6b', '#fe6321'] : params.colors,
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                left: '30%'
            },
            grid: {
                width: params.width === undefined ? 'auto' : params.width,
                left: params.left === undefined ? '10%' : params.left,
                top: params.top === undefined ? 60 : params.top,
                right: params.right === undefined ? '10%' : params.right,
                bottom: params.bottom === undefined ? 60 : params.bottom
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                axisPointer: {
                    lineStyle: {
                        color: '#0785CB'
                    }
                }
            },
            legend: {
                data: params.legend,
                show: params.legendShow === undefined ? true : params.legendShow,
                itemWidth: params.regionLegend === undefined ? 8 : 25,
                itemHeight: params.regionLegend === undefined ? 8 : 14,
                itemGap: params.itemGap || 'auto',
                icon: params.legendIcon === undefined ? null : params.legendIcon,
                top: params.legendTop === undefined ? '5%' : params.legendTop,
                right: params.legendRight === undefined ? 'center' : params.legendRight,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: 13
                }
            },
            xAxis: {
                position: params.xPosition === undefined ? null : params.xPosition,
                name: params.xName === undefined ? null : params.xName,
                nameGap: 10,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#333',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                },
                boundaryGap: params.xBoundaryGap === undefined ? true : params.xBoundaryGap,
                data: params.xAxisData,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showSplitLine === undefined ? false : params.showSplitLine
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#51687f' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor,
                        fontSize: 14
                    },
                    interval: 'auto' // params.interval === undefined ? 'auto' : params.interval
                }
            },
            yAxis: {
                max: params.max === undefined ? null : params.max,
                min: params.min === undefined ? null : params.min,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                splitNumber: params.ySplitNumber === undefined ? null : params.ySplitNumber,
                nameTextStyle: {
                    color: params.nameTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.nameTextColor,
                    fontSize: 14
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showySplitLine === undefined ? false : params.showySplitLine, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yxisLineShow === undefined ? true : params.yxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#51687f' : params.axisLineColor
                    }
                },
                axisLabel: {
                    formatter: params.transformYAxis === undefined ? '{value}' : '{value}%',
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor
                    }
                },
                splitArea: {
                    show: params.splitAreaShow === undefined ? false : params.splitAreaShow,
                    areaStyle: {
                        color: ['#fafdff']
                    }
                }
            },
            series: seriesData
        };
        if (params.dataZoom) {
            options.dataZoom = params.dataZoom;
        }
        LineChart.setOption(options);
        return LineChart;
        // $(window).resize(function () {
        //     LineChart.resize();
        // });
    },
    mapLevelChart: function (params, callback) {
        let name = params.mapTypeName;

        $.get('/static/data/map/' + name + '.json', function (geoJson) {
            if (params.cityName) {
                let features = [];
                geoJson.features.forEach(item => {
                    if (params.cityName === item.properties.name) {
                        features.push(item);
                    }
                });
                geoJson.features = features;
            }

            echarts.registerMap(name, geoJson);

            // 已存在的实例解除绑定事件
            if (mapChart) {
                mapChart.off();
            }

            mapChart = echarts.init(document.getElementById(params.chartId));

            let seriesData = [];

            if (params.series && params.series.length) {
                for (var i = 0; i < params.series.length; i++) {
                    let item = {
                        name: (params.legend && params.legend.length) ? params.legend[i] : '',
                        type: 'map',
                        map: name,
                        mapType: name,
                        roam: params.roam === undefined ? true : params.roam,
                        zoom: params.zoom || 1.1,
                        // scaleLimit: params.scaleLimit || {
                        //     min: 1,
                        //     max: 2.5
                        // },
                        left: params.left || '14%',
                        top: params.top || 25,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontSize: 14
                                }
                            },
                            emphasis: {
                                show: true,
                                color: '#ffffff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#0C2A4C',
                                borderWidth: 1
                            },
                            emphasis: {
                                areaColor: '',
                                borderColor: '#ffffff',
                                borderWidth: 2,
                                color: '#fff'
                            }
                        },
                        data: params.series[i]
                    };

                    seriesData.push(item);
                }
            }

            let options = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: '#1F3A59',
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    padding: 7,
                    textStyle: {
                        lineHeight: 56
                    },
                    formatter: params.formatter
                },
                visualMap: {
                    min: 0,
                    max: params.max || 500,
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
                        color: params.color || ['#2e70b8', '#00a6ff', '#02c4bc', '#35d77c', '#9bdb74', '#abdd73']
                    }
                },
                series: seriesData
            };
            mapChart.setOption(options, true);

            mapChart.on('click', function (param) {
                if (callback) {
                    callback(param.name);
                }
            });
        });
    },
    mapChart: function (params, callback) {
        let name = params.mapTypeName;

        $.get(params.mapAddress, function (geoJson) {
            echarts.registerMap(name, geoJson);

            let mapChart = echarts.init(document.getElementById(params.chartId));

            let seriesData = [];

            if (params.series && params.series.length) {
                for (var i = 0; i < params.series.length; i++) {
                    let item = Object.assign({}, params.seriesOption[i], {data: params.series[i]});
                    seriesData.push(item);
                }
            }

            let options = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: '#1F3A59',
                    borderWidth: 1,
                    borderColor: '#ffffff',
                    padding: 7,
                    textStyle: {
                        lineHeight: 56
                    },
                    formatter: params.formatter
                },
                geo: params.geo || null,
                visualMap: params.visualMap || null,
                series: seriesData
            };
            mapChart.setOption(options);
        });
    },
    zoomMap: function (params, callback) {
        // 拿到数据区处理数据
        let legend = params.legend;
        let color = ['#B6DC74', '#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let data = params.data;
        let xAxis = params.xAxis;

        let series = data.map((item, index) => {
            return {
                name: legend[index],
                type: 'line',
                smooth: false,
                symbol: 'circle',
                symbolSize: 7,
                showSymbol: true,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                label: {
                    emphasis: {
                        show: true,
                        fontSize: 16,
                        position: [20, 0],
                        color: '#ffffff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: color[index],
                        borderColor: colorHex(color[index], 0.27),
                        borderWidth: 12
                    }
                },
                data: item
            };
        });

        let option = {
            backgroundColor: params.backgroundColor || '#082749',
            title: {
                show: false,
                text: '旅游发展指数',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#00A9FF'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                axisPointer: {
                    lineStyle: {
                        color: '#0785CB'
                    }
                }
            },
            legend: {
                show: params.legendShow,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                width: '100%',
                top: 20,
                itemGap: 13,
                data: legend,
                right: '6%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                left: params.left || '6%',
                right: params.right || '6%',
                bottom: params.bottom || '16%',
                top: '12%',
                show: false,
                containLabel: false
            },
            dataZoom: getDataZoom({
                zoomBackground: params.zoomBackground || '#1F3A59',
                zoomFiller: params.zoomFiller || '#165B8A',
                lengthMax: xAxis.length,
                showLength: params.showLength || 6
            }),
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                scale: true,
                axisLabel: {
                    color: '#ffffff',
                    textStyle: {
                        fontSize: params.fontSize || 16
                    }
                },
                axisLine: {
                    lineStyle: {
                        show: false,
                        color: '#52687F'
                    }
                },
                data: xAxis
            }],
            yAxis: [{
                type: 'value',
                name: '',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#52687F'
                    }
                },
                axisLabel: {
                    margin: 10,
                    color: '#ffffff',
                    textStyle: {
                        fontSize: params.fontSize || 16
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            series: series
        };

        let zoomMap = echarts.init(document.getElementById(params.chartId));

        zoomMap.setOption(option);

        return zoomMap;
    },
    percentBarChart: function (params, callback) {
        let percentChart = echarts.init(document.getElementById(params.chartId));
        let seriesData = [];
        for (let i = 0; i < params.series.length; i++) {
            let item = {
                type: 'bar',
                barWidth: params.barWidth === undefined ? '22' : params.barWidth,
                barGap: i === 0 ? '0' : '-100%',
                stack: params.stack === undefined ? null : params.stack,
                itemStyle: {
                    normal: {
                        barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius // 圆角度数
                    },
                    emphasis: {
                        barBorderRadius: params.barBorderRadius === undefined ? 0 : params.barBorderRadius
                    }
                },
                label: {
                    normal: {
                        show: !i,
                        formatter: function (data) {
                            return params.series[params.series.length - 1][data.dataIndex] + '%';
                        },
                        position: params.labelPos === undefined ? 'right' : params.labelPos,
                        offset: params.labelOffset === undefined ? [4, 0] : params.labelOffset,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            fontFamily: 'sans-serif',
                            fontSize: params.labelFontSize === undefined ? 14 : params.labelFontSize
                        }
                    }
                },
                data: params.series[i]
            };
            seriesData.push(item);
        }

        let options = {
            color: params.colors === undefined ? ['#00a9ff', '#32c889', '#fe6321'] : params.colors,
            grid: {
                left: params.gridLeft === undefined ? '22' : params.gridLeft,
                top: params.gridTop === undefined ? '22' : params.gridTop,
                bottom: params.gridBottom === undefined ? '22' : params.gridBottom,
                right: params.gridRight === undefined ? '22' : params.gridRight,
                containLabel: params.containLabel === undefined ? true : params.containLabel
            },
            title: {
                text: params.title === undefined ? '' : params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: params.titleFontSize === undefined ? '14' : params.titleFontSize
                },
                top: params.titleTop === undefined ? '8' : params.titleTop,
                left: params.titleLeft === undefined ? '30%' : params.titleLeft
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                confine: true
                // formatter: function(param){
                //     let info = '';
                //     if(params.specialFormatter === 'averageLoanDateFormatter'){
                //         info =  `<div class = "mapTooltip pieTooltip">
                //                 <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                //                 ${param[1] ? `<p style="text-align: left;font-size: 14px">${param[1].seriesName}<span class = "color-blue" style="color:${param[1].color.colorStops[0].color}">${param[1].value === '0.0' ? '--' : param[1].value} (月) </span></p>` : ''}
                //                 ${param[0] ? `<p style="text-align: left ;font-size: 14px">${param[0].seriesName}<span class = "color-blue" style="color:${param[0].color.colorStops[0].color}">${param[0].value === '0.0' ? '--' : param[0].value} (月) </span></p>` : ''}
                //             <div>`;
                //     } else if(params.specialFormatter === 'bangdan'){
                //         info = `<div class = "mapTooltip pieTooltip">
                //                 <p>${param[0].name}：<span class = "color-yellow">${param[0].value } </span>${params.unit ? params.unit : ''}</p>
                //             <div>`;
                //     }else{
                //         info = `<div class = "mapTooltip pieTooltip">
                //                 <p class = "title"><b>${param[0].name}</b></p>
                //                 <p>${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                //             <div>`;
                //     }
                //     return info;
                // }
            },
            legend: {
                data: params.legend === undefined ? null : params.legend,
                right: params.legendRight === undefined ? 'right' : params.legendRight,
                icon: params.legendIcon === undefined ? '' : params.legendIcon,
                show: params.legendShow === undefined ? true : params.legendShow,
                orient: params.legendOrient === undefined ? 'horizontal' : 'vertical',
                itemGap: params.legendItemGap === undefined ? 20 : params.legendItemGap,
                top: params.legendTop === undefined ? '5%' : params.legendTop,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '12'
                }
            },
            xAxis: {
                type: params.row === undefined ? 'category' : 'value',
                data: params.xAxisData,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.xsplitLineShow === undefined ? false : params.xsplitLineShow,
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.xAxisLineShow === undefined ? true : params.xAxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#5d7288' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: params.xAxisLabelShow === undefined ? true : params.xAxisLabelShow,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor
                    }
                }
            },
            yAxis: {
                type: params.row === undefined ? 'value' : 'category',
                data: params.yAxisData,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                nameLocation: 'end',
                nameTextStyle: {
                    color: params.nameTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.nameTextColor,
                    fontSize: 14
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.ysplitLineShow === undefined ? false : params.ysplitLineShow, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yAxisLineShow === undefined ? true : params.yAxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#5d7288' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: params.yAxisLabelShow === undefined ? true : params.yAxisLabelShow,
                    margin: params.labelMargin === undefined ? 10 : params.labelMargin,
                    height: 80,
                    textStyle: {
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor,
                        fontSize: params.labelTextSize === undefined ? 14 : params.labelTextSize
                    }
                }
            },
            series: seriesData
        };
        percentChart.setOption(options, true);
        if (callback) {
            percentChart.on('click', function (param) {
                callback(param);
            });
        }
    },
    multiYaxisTypeChart: function (params, callback) {
        let multiTypeChart = null;
        if (params && params.chartId) {
            multiTypeChart = echarts.init(document.getElementById(params.chartId));
            multiTypeChart.showLoading();
        }

        let seriesData = [];
        if (params.series && params.series.length) {
            for (var i = 0, len = params.series.length; i < len; i++) {
                let seriesItem = {
                    name: params.legend ? params.legend[i] : '',
                    type: params.series[i].type,
                    data: params.series[i].data,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true,
                            position: 'top',
                            formatter: params.series[i].formatter,
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontSize: 14
                            }
                        }
                    },
                    yAxisIndex: params.series[i].yAxisIndex,
                    barWidth: params.barWidth
                };

                seriesData.push(seriesItem);
            }
        }

        let options = {
            color: params.colors,
            grid: {
                containLabel: true,
                top: 72,
                left: 42,
                right: 32,
                bottom: 52
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#00a9ff'
                    }
                },
                formatter: function (params) {
                    var res = params[0].name;

                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].seriesType === 'line') {
                            res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
                        } else {
                            res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '万元';
                        }
                    }
                    return res;

                }
            },
            legend: {
                data: params.legend || [],
                icon: params.legendIcon || 'rect',
                orient: params.orient ? 'vertical' : 'horizontal',
                top: 38,
                right: '12%',
                itemGap: 35,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: 14
                }
            },
            dataZoom: getDataZoom({
                zoomBackground: params.zoomBackground || '#1F3A59',
                zoomFiller: params.zoomFiller || '#165B8A',
                lengthMax: params.lengthMax,
                showLength: params.showLength || 6
            }),
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: 14
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#51687f',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: params.xAxisData || []
                }
            ],
            yAxis: params.yAxis || [],
            series: seriesData
        };

        if (options) {
            multiTypeChart.hideLoading();
            multiTypeChart.setOption(options);
        }
    },
    wordCloudChart: function (params, callback) {
        let wordCloudChart = echarts.init(document.getElementById(params.chartId));

        let seriesData = [];
        if (params.series) {
            for (var i = 0; i < params.series.length; i++) {
                let item = {
                    name: (params.legend && params.legend.length > 0) ? params.legend[i] : '',
                    type: 'wordCloud',
                    size: ['90%', '90%'],
                    sizeRange: params.sizeRange || [12, 120],
                    rotationRange: [-45, 45],
                    rotationStep: 10,
                    shape: 'circle',
                    textPadding: 0,
                    autoSize: {
                        enable: true,
                        minSize: 12
                    },
                    textStyle: {
                        normal: {
                            color: '#00AFEC'
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: params.series[i]
                };

                seriesData.push(item);
            }
        }
        let options = {
            backgroundColor: '#1F3A59',
            tooltip: {
                show: true,
                backgroundColor: '#1F3A59',
                borderWidth: 1,
                borderColor: '#ffffff',
                padding: 7,
                textStyle: {
                    lineHeight: 56
                }
            },
            series: seriesData
        };

        wordCloudChart.setOption(options);

        if (callback) {
            callback(params);
        }
    }
};

export default AD_CHART;