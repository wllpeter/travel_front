/**
 *  @description 封装了一些本项目用到的方法
 * */

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
 * */
export function getDataZoom(params) {
    let start = 0;
    let showZoom = false;
    if (params.showLength && params.lengthMax) {
        if (params.showLength < params.lengthMax) {
            start = 100 - params.showLength / params.lengthMax * 100;
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
            zoomLock: true,
            handleStyle: {
                color: '#00A8FD'
            },
            textStyle: {
                color: '#fff'
            },
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