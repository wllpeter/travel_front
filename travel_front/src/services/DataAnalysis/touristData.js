import {HttpMethod} from '../../constants/common';
import Ajax from '../../utils/Ajax';

/**
 * @description 获取四川省游客分析
 * @param year 年份
 * @param quarter 季度
 * @returns {Object} Promise对象
 */
export function getProvinceCustomerData([year, quarter]) {
    return Ajax({
        url: `/customer_data/province_customer_data/${year}/${quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取乡村游数据
 * @param year 年份
 * @param quarter  季度
 * @param type  类型
 * @returns {Object}
 */
export function getCountyData([year, quarter, type]) {
    return Ajax({
        url: `/customer_data/country_data/${year}/${quarter}/${type}`,
        type: HttpMethod.GET,
        cache: true,
        data: null
    });
}

/**
 * @description 获取五大经济区客游人次
 * @param year 年份
 * @param quarter  季度
 * @returns {Object}
 */
export function getZoneCustomerTimes(params) {
    return Ajax({
        url: `/customer_data/zone_customer_times/${params.year}/${params.quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取五大经济区游客停留时长
 * @param year 年份
 * @param quarter 季度
 * @returns {Object}
 */
export function getZoneTouristResidentTime(params) {
    return Ajax({
        url: `/customer_data/zone_tourists_residence_time/${params.year}/${params.quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取五大经济区游客来源排名
 * @param year 年份
 * @param quarter 季度
 * @returns {Object}
 */
export function getZoneTouristResourceRank(params) {
    return Ajax({
        url: `/customer_data/zone_tourists_resource_rank/${params.year}/${params.quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取五大经济区游客交通方式
 * @param year 年份
 * @param quarter 季度
 * @returns {Object}
 */
export function getZoneTouristTrafficType(params) {
    return Ajax({
        url: `/customer_data/zone_tourists_traffic_type/${params.year}/${params.quarter}`,
        type: HttpMethod.GET,
        data: null
    });
}

/**
 * @description 获取客情大数据中所有的时间选项
 * @returns {Object}
 */
export function getTouristDataOptions() {
    return Ajax({
        url: '/aboutYearCondition/getCustBigData',
        type: HttpMethod.GET,
        data: null
    });
}