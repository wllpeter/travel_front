import echarts from 'echarts';

/**
 * @description 从上到下，依次为柱状图, 雷达图，饼图，线图(折线或面积图),地图,数据区域缩放,百分比柱状图，多Y轴不同类型混合图
 * @type {{barChart: AD_CHART.barChart, radarChart: AD_CHART.radarChart, pieChart: AD_CHART.pieChart, lineChart: AD_CHART.lineChart, mapChart: AD_CHART.mapChart, zoomMap: AD_CHART.zoomMap, percentBarChart: AD_CHART.percentBarChart, multiYaxisTypeChart: AD_CHART.multiYaxisTypeChart}}
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
                                fontSize: 14
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
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                left: '30%'
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
            },
            legend: {
                data: params.legend,
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
            series: seriesData
        };
        if (params.unit) {
            options.tooltip.formatter = (p) => {
                return p[0].axisValue + '<br>' + p[0].marker + p[0].data + params.unit;
            };
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
                        name: params.legend[i],
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
                    fontSize: 14
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
                        fontSize: 15,
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
                    if (params.showLable) {
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param.name}</b></p>
                                <p>占比<span class = "color-blue">${param.percent}%</span></p>
                            <div>`;
                    } else {
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param.marker}${param.name}</b></p>
                                <p>${param.value}${params.unit ? params.unit : ''}</p>
                                <p>占比<span class = "color-blue">${param.percent}%</span></p>
                            <div>`;
                    }
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
                orient: 'vertical',
                top: params.legendTop || 140,
                height: params.legendHeight === undefined ? 'auto' : params.legendHeight,
                right: params.legendRight === undefined ? 40 : params.legendRight,
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
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
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: params.tooltipTrigger === undefined ? 'none' : params.tooltipTrigger, // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: 'rgba(192, 224, 248, .8)'
                    },
                    snap: true
                },
                backgroundColor: 'rgba(255,255,255,1)',
                // formatter: '{b}:{c}',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                padding: [10, 10, 10, 10],
                formatter: function (param) {
                    let info = '';
                    if (params.specialFormatter === 'gaugeTendChart') {
                        let newDate = param[0].name.substring(0, 4) + '-' + param[0].name.substring(4, 6);
                        info = `<div class="gaugeTend-tip">
                                <p class="title">${newDate}</p>
                                <p class="tip-msg">口碑值：
                                    <span>${param[0].value > 0 ? '+' + param[0].value : param[0].value} </span>
                                </p>
                                <p  class="tip-msg">总体舆情情感：
                                    <span >${param[0].value > 0 ? '正面' : param[0].value === 0 ? '中性' : '负面'} </span>
                                </p>
                            <div>`;
                    } else if (params.specialFormatter === 'averageProfit') {
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                                ${(param[1] ? `<p style="text-align: left;font-size: 14px">${param[1].seriesName}<span class = "color-blue" style="color:${param[1].color}">${param[1].value}% </span></p>` : '')}
                                ${(param[0] ? `<p style="text-align: left;font-size: 14px">${param[0].seriesName}<span class = "color-blue" style="color:${param[0].color}">${param[0].value}%</span></p>` : '')}
                            <div>`;
                    } else if (params.specialFormatter === 'eventLineChart') {
                        let data = param[0].data;
                        let newDate = data.news_pubdate.substring(0, 4) + '-' + data.news_pubdate.substring(4, 6) + '-' + data.news_pubdate.substring(6, 8);
                        info = `<div >
                                <p >${newDate}</p>
                                <p >舆情总量：${data.news_all_count}</p>
                                <p >负面舆情数：${data.news_minus_count}</p>
                                <p >正面舆情数：${data.news_positive_count}</p>
                                <p >中性舆情数：${data.news_middle_count}</p>
                            <div>`;
                    } else if (params.specialFormatter === 'eventTrend') {
                        info = `<div class = "mapTooltip pieTooltip">
                                    <p>${param[0].name}：<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    } else if (params.specialFormatter === 'detailTrend') {
                        info = param[0].name + '<br/>';
                        for (let i = 0; i < param.length; i++) {
                            let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                            info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                        }
                    } else if (params.specialFormatter === 'recrutment') {
                        info = param[0].name + '<br/>';
                        for (let i = 0; i < param.length; i++) {
                            let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                            info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                        }
                    } else {
                        info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param[0].name}</b></p>
                                <p>${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }
                    return info;
                }
            },
            legend: {
                data: params.legend,
                show: params.legendShow === undefined ? true : params.legendShow,
                itemWidth: params.regionLegend === undefined ? 6 : 25,
                itemHeight: params.regionLegend === undefined ? 6 : 14,
                icon: params.legendIcon === undefined ? null : params.legendIcon,
                top: params.legendTop === undefined ? '5%' : params.legendTop,
                right: params.legendRight === undefined ? 'center' : params.legendRight,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '12'
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
                        color: params.labelTextColor === undefined ? 'rgba(255, 255, 255, 0.95)' : params.labelTextColor
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
        LineChart.setOption(options);
        // $(window).resize(function () {
        //     LineChart.resize();
        // });
    },
    mapChart: function (params, callback) {
        let mapTypeName = city ? city : province;
        let idHaiNan = false;
        if (province === '海南省' && city === '') {
            idHaiNan = true;
        }
        echarts.registerMap(mapTypeName, data);
        var mapChart = echarts.init(document.getElementById(params.chartId));
        mapChart.setOption(
            {
                center: idHaiNan ? [110.388793, 18.796216] : '',
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: [10, 10, 20, 10],
                    trigger: 'item',
                    borderWidth: 0,
                    extraCssText: 'box-shadow: -3px 3px 14px 4px #053a6b',
                    textStyle: {
                        color: '#333333',
                        fontSize: '14'
                    },
                    formatter: function (param) {
                        let data = param.data.value;
                        let changeMonitorCompany = '';
                        if (data[8] > 0) {
                            changeMonitorCompany = '+' + data[8];
                        } else if (data[8] < 0) {
                            changeMonitorCompany = data[8];
                        }
                        let changeHighCompany = '';
                        if (data[7] > 0) {
                            changeHighCompany = '+' + data[7];
                        } else if (data[7] < 0) {
                            changeHighCompany = data[7];
                        }
                        let highCollect = data[5] ? data[5] : '- -';
                        return city ?
                            `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>` :
                            `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>监测地区<span class = "color-blue">${data[4]}</span>个</p>
                                    <p>高危聚集区<span class = "color-blue">${highCollect}</span></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>`;
                    }
                },
                geo: {
                    type: 'map',
                    zoom: idHaiNan ? 4 : 1,
                    map: mapTypeName,
                    mapType: mapTypeName,
                    label: {
                        normal: {
                            show: opt.labelShow ? true : false,
                            textStyle: {
                                color: opt.textColor ? opt.textColor : '#fff'
                            }
                        },
                        emphasis: {
                            show: opt.labelShow ? true : false,
                            textStyle: {
                                color: opt.textColor ? opt.textColor : '#fff'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: opt.areaColor ? opt.areaColor : 'none',
                            borderColor: opt.borderColor ? opt.borderColor : 'none'
                        },
                        emphasis: {
                            areaColor: opt.areaColorEmp ? opt.areaColorEmp : 'none' // 鼠标放上去的效果
                        }
                    }
                },
                series: [{
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: opt.scatterdata,
                    symbolSize: function (val) {
                        // 任意一点的半径为a+（b-a）/（最大企业量-最小企业量）*（该点企业量-最小点企业量）
                        // 最大点半径限制为b，最小为a
                        let simple = 0;
                        if (val[2]) {
                            simple = opt.highMax === opt.highMin ? 10 : 10 + (30 - 10) / (opt.highMax - opt.highMin) * (val[2] - opt.highMin);
                        }
                        return simple;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#fdde62',
                            shadowBlur: 10,
                            shadowColor: '#ECDA6B'
                        }
                    },
                    zlevel: 1
                },
                    {
                        name: 'categoryA',
                        type: 'map',
                        geoIndex: 0,
                        tooltip: {
                            show: true,
                            formatter: function (param) {
                                let data = opt.formatterArr[param.name];
                                if (data) {
                                    let changeMonitorCompany = '';
                                    if (data[8] > 0) {
                                        changeMonitorCompany = '+' + data[8];
                                    } else if (data[8] < 0) {
                                        changeMonitorCompany = data[8];
                                    }
                                    let changeHighCompany = '';
                                    if (data[7] > 0) {
                                        changeHighCompany = '+' + data[7];
                                    } else if (data[7] < 0) {
                                        changeHighCompany = data[7];
                                    }
                                    let highCollect = data[5] ? data[5] : '- -';
                                    return city ?
                                        `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>` :
                                        `<div class = "mapTooltip">
                                    <p class = "title"><b>${param.name}</b></p>
                                    <p>监测地区<span class = "color-blue">${data[4]}</span>个</p>
                                    <p>高危聚集区<span class = "color-blue">${highCollect}</span></p>
                                    <p>高危企业数<span class = "color-blue">${data[2]}</span>家<span class = "color-yellow">${changeHighCompany}</span></p>
                                    <p>监控企业数<span class = "color-blue">${data[6]}</span>家<span class = "color-yellow">${changeMonitorCompany}</span></p>
                                <div>`;
                                }

                            }
                        }
                    }]
            });
        mapChart.on('click', function (param) {
            if (mapback) {
                mapback(param.name);
            }
            mapChart.setOption({
                geo: {
                    regions: [{
                        name: param.name,
                        selected: true
                    }]
                }
            });
        });
    },
    zoomMap: function (params, callback) {
        // 十六进制颜色转为RGB格式
        let colorHex = (color, opacity) => {
            let sColor = color.toLowerCase();
            // 十六进制颜色值的正则表达式
            let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 如果是16进制颜色
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    let sColorNew = '#';
                    for (let i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                // 处理六位的颜色值
                let sColorChange = [];
                for (let i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
                }
                if (opacity) {
                    return 'RGBA(' + sColorChange.join(',') + ',' + opacity + ')';
                }
                return 'RGB(' + sColorChange.join(',') + ')';
            }
            return sColor;
        };

        const len = 24; // 定义数据长度为24
        // 制造假数据
        let getData = (m) => {
            let getRandomArr = (n, index) => {
                let arr = [];
                for (let i = 0; i < n; i++) {
                    let a = Math.ceil(Math.random() * 100) + 100 + 60 * (5 - index);
                    arr.push(a);
                }
                return arr;
            };
            let data = [];
            for (let i = 0; i < m; i++) {
                data.push(getRandomArr(len, i));
            }
            return data;
        };

        let getYearMonth = (m) => {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            // 补全月份格式
            let fn = (num) => {
                if (num < 10) {
                    return '0' + num;
                }
                return num;
            };
            let output = [];
            for (let i = 0; i < m; i++) {
                if (month === 0) {
                    --year;
                    month = 12;
                }
                output.unshift(year + '-' + fn(month));
                month--;
            }
            return output;
        };

        // 拿到数据区处理数据
        let legend = ['四川省', '成都平原经济区', '川东北经济区', '攀西经济区', '川西北经济区', '川南经济区'];
        let color = ['#B6DC74', '#32C889', '#0CBBC6', '#1B76D3', '#00A9FF', '#3459C5'];
        let data = getData(legend.length);
        let xAxis = getYearMonth(len);

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
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
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
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    backgroundColor: params.zoomBackground || '#1F3A59',
                    // handleIcon: 'M230 80 A 45 45, 0, 1, 0, 231 80 Z',
                    fillerColor: params.zoomFiller || '#165B8A',
                    borderColor: 'transparent',
                    // handleSize: '50%',
                    handleStyle: {
                        color: '#00A8FD'
                    },
                    start: params.start || 75,
                    end: params.end || 100
                }
            ],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
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
    multiYaxisTypeChart: function(params, callback) {
        let multiTypeChart = null;
        if(params && params.chartId) {
            multiTypeChart = echarts.init(document.getElementById(params.chartId));
            multiTypeChart.showLoading();
        }

        let seriesData = [];
        if(params.series && params.series.length) {
            for(var i = 0, len = params.series.length; i < len; i++) {
                let seriesItem = {
                    name: params.legend ? params.legend[i] : '',
                    type: params.series[i].type,
                    data: params.series[i].data,
                    label: {
                        normal: {
                            show: false,
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
                }

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
                formatter: function(params) {
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
            dataZoom: [
                {
                    type: 'slider',
                    backgroundColor: params.zoomBackground || '#1F3A59',
                    fillerColor: params.zoomFiller || '#165B8A',
                    borderColor: 'transparent',
                    handleStyle: {
                        color: '#00A8FD'
                    },
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.95)'
                    },
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    filterMode: 'empty',
                    start: 0,
                    end: 100
                }
            ],
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
        }


        if(options) {
            multiTypeChart.hideLoading();
            multiTypeChart.setOption(options);
        }
    }

};

export default AD_CHART;