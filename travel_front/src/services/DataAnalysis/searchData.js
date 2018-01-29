import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';


/**
 * @description 获取搜索大数据中所有的时间选项
 * @returns {Object}
 */
export function getConsumptionDataOptions() {
    return Ajax({
        url: '/aboutYearCondition/getSearchBigData',
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取全省旅游搜索热力图
 * @param year 年份
 * @param month 月份
 * @returns {Object}
 */
export function getProvinceHotSearch([year, month]) {
    return Ajax({
        url: `/search_big_data/province_hot_search/${year}/${month}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取全省旅游搜索热度趋势图
 * @param year
 * @returns {Object}
 */
export function getProvinceSearchTrend([year]) {
    return Ajax({
        url: `/search_big_data/province_search_trend/${year}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 搜索关注热词云
 * @param year  年份
 * @param quarter 季度
 * @returns {Object}
 */
export function getHotword(params) {
    return Ajax({
        url: `/search_big_data/hot_word/${params.year}/${params.quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取人群来源地
 * @param year
 * @param month
 * @returns {Object}
 */
export function getSearchPersonSource(params) {
    return Ajax({
        url: `/search_big_data/search_person_resource/${params.year}/${params.month}`,
        type: HttpMethod.GET,
        data: null
    })
}

/**
 * @description 获取景点偏好地
 * @param year
 * @param month
 * @returns {Object}
 */
export function getSearchPreferenceArea([year, month]) {
    return Ajax({
        url: `/search_big_data/search_preference_area/${year}/${month}`,
        type: HttpMethod.GET,
        data: null
    })
}

/**
 * @description 搜索人群年龄分布
 * @param year 年份
 * @param month 月份
 * @returns {Object}
 */
export function getSearchPersonAge([year, month]) {
    return Ajax({
        url: `/search_big_data/search_person_age/${year}/${month}`,
        type: HttpMethod.GET,
        data: null
    });
}