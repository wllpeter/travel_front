import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 旅游市场监测条件
export function getMarketMonitorCondition (data) {
    return Ajax({
        url: '/aboutYearCondition/getMarketMonitor',
        type: HttpMethod.GET,
        data: data
    });
}

// 省内旅游活跃度
export function provinceActiveData (data) {
    return Ajax({
        url: '/marketTravel/provinceActive',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游行业活跃度-四川省
export function getProvinceAndFiveData (data) {
    return Ajax({
        url: '/marketTravel/getProvinceAndFiveData',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游行业活跃度-某一区域
export function getEconomicAndCityData (data) {
    return Ajax({
        url: '/marketTravel/getEconomicAndCity',
        type: HttpMethod.GET,
        data: data
    });
}