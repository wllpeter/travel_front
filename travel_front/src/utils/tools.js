/**
 *  @description 封装了一些本项目用到的方法
 * */
import React from 'react';
import {Select} from 'mtui/index';

const Option = Select.Option;

// 十六进制颜色转为RGBA格式
export function colorHex(color, opacity) {
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
}

/**
 *  @description 根据不同的参数获取echarts的dataZoom
 *  @params  params.zoomBackground底部滑动框的背景颜色
 *          params.zoomFiller底部滑动框的填充颜色
 *          params.lengthMax数据的总长度
 *          params.showLength用于展示的数据长度
 *          params.zoomHeight滚动条的高度
 * */
export function getDataZoom(params) {
    let start = 0;
    let showZoom = false;
    if (params.showLength && params.lengthMax) {
        if (params.showLength < params.lengthMax) {
            start = 100 - 100 / (params.lengthMax - 1) * (params.showLength - 1);
            showZoom = true;
        }
    }

    return [
        {
            type: 'slider',
            show: showZoom,
            backgroundColor: params.zoomBackground || '#1F3A59',
            // handleIcon: 'M230 80 A 45 45, 0, 1, 0, 231 80 Z',
            fillerColor: params.zoomFiller || '#165B8A',
            borderColor: 'transparent',
            zoomLock: false,
            handleStyle: {
                color: '#00A8FD'
            },
            textStyle: {
                color: 'transparent'
            },
            height: params.zoomHeight || 20,
            start: start,
            end: 100
        },
        {
            type: 'inside',
            show: showZoom,
            backgroundColor: params.zoomBackground || '#1F3A59',
            // handleIcon: 'M230 80 A 45 45, 0, 1, 0, 231 80 Z',
            fillerColor: params.zoomFiller || '#165B8A',
            borderColor: 'transparent',
            zoomLock: false,
            handleStyle: {
                color: '#00A8FD'
            },
            textStyle: {
                color: 'transparent'
            },
            bottom: params.zoomBottom || 'auto',
            start: start,
            end: 100
        }
    ];
}

// 补全显示的月份和日期
export function dateFormat(n) {
    if (n.toString().length < 2) {
        n = '0' + n;
    }
    return n;
}

export function getHeaderOptions(options) {
    let defaultValue = '';

    if (options.data && options.data.length) {
        let firstOption = options.data[0];
        defaultValue = firstOption.year + '-' + firstOption.monthOrQuarter;
        options.timeSelectRequired = true;
    }

    return {
        timeSelectRequired: options.timeSelectRequired,
        zoomRequired: options.zoomRequired,
        clickBack: options.clickBack,
        defaultValue,
        options: (options.data && options.data.length > 0) ? options.data.map((option, index) => {
            return <Option key={index}
                           value={option.year + '-' + option.monthOrQuarter}>{`${ option.year }年${ option.monthOrQuarter }${ options.isQuarter ? '季度' : option.monthOrQuarter ? '月' : ''}`}</Option>;
        }) : null
    };
}

// 深克隆
export function deepClone(obj) {
    let proto = Object.getPrototypeOf(obj);
    return Object.assign({}, Object.create(proto), obj);
}

// 处理旅游发展指数数据
export function handleDevelopmentIndex(names, res, type) {
    let legend = Object.keys(names);
    let getArrByNum = (num) => {
        let arr = [];
        let data = [];
        for (let i = 0; i < num; i++) {
            arr.push(null);
            data.push([]);
        }
        return {arr, data};
    };
    let timeObj = {};
    res.forEach((item) => {
        if (timeObj[item.date] === undefined) {
            timeObj[item.date] = getArrByNum(legend.length).arr;
        }
        timeObj[item.date][names[item.area]] = item[type];
    });
    let xAxis = [];
    let data = getArrByNum(legend.length).data;
    for (let key in timeObj) {
        xAxis.unshift(key.replace('.', '-'));
        timeObj[key].forEach((val, index) => {
            data[index].unshift(val);
        });
    }
    return {legend, xAxis, data};
}

/*
* tooltip 的定位函数
* */

export function tooltipPoistion(pos, params, el, elRect, size) {
    let obj = {};
    if (pos[0] > size.viewSize[0] / 2) {
        let left = pos[0] - size.contentSize[0] - 30;
        if (left < 10) {
            left = 10;
        }
        obj.left = left;
    } else {
        let right = size.viewSize[0] - (pos[0] + size.contentSize[0] + 30);
        if (right < 10) {
            right = 10;
        }
        obj.right = right;
    }
    if (pos[1] > size.viewSize[1] / 2) {
        let top = pos[1] - size.contentSize[1] - 30;
        if (top < 10) {
            top = 10;
        }
        obj.top = top;
    } else {
        let bottom = size.viewSize[1] - (pos[1] + size.contentSize[1] + 30);
        if (bottom < 10) {
            bottom = 10;
        }
        obj.bottom = bottom;
    }
    return obj;
}