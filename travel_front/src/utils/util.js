import classnames from 'classnames';
import React from 'react';
import { Select } from 'mtui/index';
const Option = Select.Option;

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}


export function isFormData(obj){
    return obj instanceof FormData;
}


export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    document.cookie = name + '=' + encodeURI(value);
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

export function clearCookie(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date( 0).toUTCString();
        }
    }
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}

/**
 * @desc 生成一个随机id
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

export function signKeyWords(str, words = [], color = '#00AFE3'){
    if(words.length < 1) {return str;}

    var map = {}, reg, items;
    var regStr = `(${words.join('|')})`;

    words.forEach(function (e) {
        e !== '' && (map[e] = true);
    });
    reg = new RegExp(regStr, 'g');

    items = str.replace(reg, '#$1#').split(/#+/);

    var result = [];

    for(var i = 0; i < items.length; i++){
        if(items[i] === '') {continue;}
        if(map[items[i]]){
            result.push(`<strong style="color: ${color};">${items[i]}</strong>`);
        }else {
            result.push(`<span>${items[i]}</span>`);
        }
    }

    return result.join('');
}

export function getTagClassName(name) {
    var blueTag = false;
    if(name.indexOf('存续') !== -1 || name.indexOf('在营') !== -1 || name.indexOf('登记') !== -1 || name.indexOf('在业') !== -1){
        blueTag = true;
    }
    return classnames({'tag': true, 'tag-blue': blueTag, 'tag-red': !blueTag});
}

/**
 * @desc 通过URL搜索对象获取url参数, 如www.xxx.com?a=1&b=2, getURLParam('a') return 1
 */
export function getURLParam(name){
    if(isBlank(name)){
        return;
    }
    // var urlQuery = getURLQuery();
    var urlQuery = getQueryParams();
    return urlQuery[name];
}
export function dateFormat(formatDate) {
    return formatDate.replace(/(.{4})(.{2})/, '$1-$2-');
}
/*
* 获取 url 参数，因为 this.props.location.query 不能得到带有 # 的参数，所以添加此方法
* */
export function getQueryParams() {
    let obj = {}, name, value;
    let str = location.href;
    let num = str.indexOf('?');
    str = str.substr(num + 1);
    const arr = str.split('&');
    for(let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            obj[name] = value;
        }
    }
    return obj;
}
/**
 * 检查元素是否在数组中
 * @param arr
 * @param obj
 * @returns {boolean}
 */
export function contains(arr, obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @constructor
 */
export function random(min, max){
    min = min || -90;
    max = max || 90;
    return min + Math.floor(Math.random() * (max - min));
}

/**
 * 指定位置插入字符串
 * @param str
 * @param flg
 * @param sn
 * @returns {string}
 */
export function insert_flg(str, flg, sn){
    let newstr = '';
    for(let i =  0; i < str.length; i += sn){
        let tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
    }
    return newstr;
}

/**
 * @description 转换百分比为数字，并且如果是小数，保留两位小数
 * @param percentStr  百分比字符串
 * @returns {number}  数字
 */
export function revertPercentToNumber(percentStr) {
    if(isString(percentStr) && percentStr.indexOf('%') !== -1) {
        let number =  Number(percentStr.substring(0, percentStr.length - 1));
        if(isNaN(number)) {
            throw new Error('此字符串不能转换成数字')
        }

        return Number(number.toFixed(2));
    }
}

/**
 * @description 获取Panel头部选项
 * @param timeSelectRequired  是否需要时间选择(月份，季度)
 * @param zoomRequired 是否需要放大按钮
 * @param name
 * @param isQuarter 是否是季度
 * @param callback 点击时间选择后的回调
 * @returns {{timeSelectRequired: *, zoomRequired: *, options: *}}
 */
export function getHeaderOptions([timeSelectRequired, zoomRequired, name, isQuarter = false], optionsData, callback = null) {
    let defaultValue = '';

    if(name && optionsData[name] && optionsData[name].length) {
        let firstOption = optionsData[name][0];
        defaultValue = firstOption.year + '-' + firstOption.monthOrQuarter;
    }

    return {
        timeSelectRequired,
        zoomRequired,
        defaultValue,
        clickBack: callback,
        options: name ? (optionsData[name] && optionsData[name].length > 0) && optionsData[name].map((option, index) => {
                return <Option key={ index } value={ option.year + '-' + option.monthOrQuarter }>{ `${ option.year }年${ option.monthOrQuarter }${ isQuarter ? '季度' : '月'}` }</Option>
            }) : null
    }
}