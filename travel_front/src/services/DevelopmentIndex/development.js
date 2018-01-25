import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 旅游发展指数条件
export function getTravelDevData(data) {
    return Ajax({
        url: '/aboutYearCondition/getTravelDev',
        type: HttpMethod.GET,
        data: data
    });
}

// 获取雷达图数据
export function getIndexRadarData(data) {
    return Ajax({
        url: '/devTravel/getIndexRadar',
        type: HttpMethod.GET,
        data: data
    });
}

// 获取旅游发展指数数据
export function getIndexData(data) {
    return Ajax({
        url: '/devTravel/getIndex',
        type: HttpMethod.GET,
        data: data
    });
}

// 获取旅游经济规模数据
export function getEconomicScale(data) {
    return Ajax({
        url: '/devTravel/getEconomicScale',
        type: HttpMethod.GET,
        data: data
    });
}