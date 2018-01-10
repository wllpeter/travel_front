import qs from 'qs';
import axios from 'axios';
import { hashHistory } from 'react-router';
import config from '../config/config';
import devConfig from '../config/config.dev';
import { ResponseInfo } from '../constants/common';
import { HttpMethod, ContentType } from '../constants/common';
import { Tip, LoadingModal } from 'mtui/index';
import { isString, isArray, isFormData, isBlank, isEmpty, isNotEmpty, isNotBlank, isObject } from './util';

/**
 * @desc 使用axios第三方库访问后台服务器, 返回封装过后的Promise对象.
 * @param {string} url 请求的接口地址, 格式: "/xxx...".
 * @param {string} domain 跨域请求的域名地址, 如: http://www.baidu.com
 * @param {string} type HTTP请求方式, 默认GET.
 * @param {string} contentType HTTP请求头的Content-Type, 如: 'application/x-www-form-urlencoded'
 * @param {object} data 请求的数据, object对象格式.
 * @param {function} onUpload 上传文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} onDownload 下载文件过程中的回调函数, 接收progressEvent参数.
 * @param {function} cancel 取消请求的回调函数, 接收cancel参数, 当执行cancel()参数时请求被取消.
 * @param {number} timeout 配置请求超时时间, 为毫秒数, 默认从配置文件读取.
 * @param {boolean} loading 是否开启loading动画, 默认 type 为 POST 的请求显示.
 * @param {boolean} cache 是否开启缓存, 开启后同样的请求(url相同, 参数相同), 第二次请求时会直接返回缓存数据, 不会请求后台数据, 默认false.
 * @param {boolean} handleError 是否自动处理接口报错情况, 默认true.
 * @return {object} - 返回一个promise的实例对象.
 */
export default function Ajax({url = null,
                                         domain = null,
                                         type = HttpMethod.GET,
                                         contentType = config.ajaxPromise.contentType,
                                         data = null,
                                         onUpload = null,
                                         onDownload = null,
                                         cancel = null,
                                         timeout = config.ajaxPromise.timeout,
                                         loading = null,
                                         cache = false,
                                         handleError = true}) {
    var getData;
    var postData;
    var cancelToken;
    var crossDomain = false;

    if (isEmpty(url)) {
        return Promise.resolve();
    }

    if (type === HttpMethod.POST || type === HttpMethod.PUT) {
        postData = data;
        // 根据配置的 contentType 对数据进一步处理
        switch (contentType){
            case ContentType.FORM_URLENCODED:
                if(isNotEmpty(postData) && !isFormData(postData)){
                    postData = qs.stringify(postData, {allowDots: true});
                }
                break;
        }
    } else {
        getData = data;
    }

    if (isNotEmpty(domain)) {
        crossDomain = true;
    }

    if (__DEV__) {
        // 开发模式都是跨域调用后台接口
        crossDomain = true;
        if(isEmpty(domain)){
            domain = devConfig.DEV_API_SERVER;
        }
    }

    if (isNotEmpty(cancel)) {
        cancelToken = new axios.CancelToken(cancel);
    }

    if(!cache) {
        url += '?t=' + new Date().getTime();
    }

    if (__DEV__) {
        log({url, domain, type, data}, 'Request');
    }

    showLoading();

    var promise = new Promise(function (resolve, reject) {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.headers.post['Content-Type'] = contentType + ';charset=UTF-8';

        var httpRequest = axios({
            method: type,
            baseURL: domain,
            url: url,
            timeout: timeout,
            params: getData,
            data: postData,
            withCredentials: crossDomain,
            onUploadProgress: onUpload,
            onDownloadProgress: onDownload,
            cancelToken: cancelToken
        }).then(function (response) {
            hideLoading();

            if (isBlank(response.data)) {
                console.error(ResponseInfo['RESPONSE_ERROR'], response);
                reject(response);
            } else {
                var responseData = response.data;
                if (isString(responseData)) {
                    try {
                        responseData = JSON.parse(responseData);
                    } catch (e) {
                        try {
                            /* eslint-disable no-eval */
                            responseData = eval('(' + responseData + ')');
                            /* eslint-enable no-eval */
                        } catch (e) {
                            console.error(ResponseInfo['DATA_TRANSFORM_ERROR'], e);
                            reject(e);
                            return;
                        }
                    }
                }

                if (__DEV__) {
                    log(responseData, 'Response');
                }
                /**
                 * 请求成功, 只会返回data中的数据
                 */
                if (responseData.status === 'SUCCESS') {
                    resolve(responseData.result);
                    /**
                     * 请求失败, 会返回所有数据
                     */
                } else {
                    reject(responseData);
                    if(handleError){
                        var errorMsg = processError(responseData);
                        if(isNotBlank(errorMsg)){
                            Tip.error(errorMsg);
                        }
                    }
                }
            }
        }).catch(function (error) {
            hideLoading(error.config, loading);
            // 服务端返回的异常
            if (error.response) {
                if(handleError){
                    Tip.error(ResponseInfo['SYSTEM_ERROR']);
                }
                console.error(error.response);
                reject(error.response);
                // 浏览器抛出的异常, 不同浏览器可能有不同的行为
            } else {
                if(handleError){
                    setTimeout(() => {
                        Tip.error(ResponseInfo['BROWSER_ERROR']);
                    }, 1000);
                }
                console.error(error);
                reject(error);
            }
        });
    });

    return promise;
}

function showLoading() {
    LoadingModal.show('loading');
}

function hideLoading() {
    LoadingModal.hide();
}

/**
 * 处理异常返回, 根据后端同事返回的code进行相应的处理
 */
function processError(response) {
    var errorMessage;
    switch (response.code) {
        case 403:
            hashHistory.push('/noPermission');
            break;
        case 405:
            hashHistory.push('/noAcount');
            break;
        case 406:
        case 407:   // 没有登陆
            hashHistory.push('/noAuthority');
            break;
        case 500:   // 系统异常
            errorMessage = ResponseInfo[500];
            break;
        case 401:   // 没有权限访问
        // TODO: 预留处理, 走默认处理
        default:    // 未知错误
            errorMessage = response.msg;
    }
    return errorMessage;
}

function log(data, title) {
    /* eslint-disable no-console */
    if (title) {
        console.log(title + ' start');
    }
    console.log(data);
    if (console.table && isArray(data.result)) {
        // console.table(data.result);
    }

    if(console.table && isObject(data.result) && isArray(data.result.list)) {
        // console.table(data.result.list);
    }

    if (title) {
        console.log(title + ' end');
    }
    /* eslint-enable no-console */
}

Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
        .catch(function (reason) {
            // 抛出一个全局错误
            setTimeout(() => {
                throw reason;
            }, 0);
        });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback(value)).then(() => value),
        reason => P.resolve(callback(reason)).then(() => {
            throw reason;
        })
    );
};