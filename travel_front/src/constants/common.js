// http协议method
export const HttpMethod = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PUT: 'put'
}

// http协议头Content-Type
export const ContentType = {
    JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded'
}

// http返回的响应信息
export const ResponseInfo = {
    500: '网络繁忙, 请稍后再试',
    SYSTEM_ERROR: '网络繁忙, 请稍后再试',
    BROWSER_ERROR: '网络繁忙, 请稍后再试',
    RESPONSE_ERROR: '请求数据异常',
    DATA_TRANSFORM_ERROR: '数据转换异常'
};