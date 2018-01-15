import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 消费大数据条件
export function getSpendBigData(data) {
    return Ajax({
        url: '/aboutYearCondition/getSpendBigData',
        type: HttpMethod.GET,
        data: data
    });
}

// 全省旅游消费情况
export function getProvinceCustomerData(data) {
    return Ajax({
        url: '/consumptionData/getProvinceTravelConsume',
        type: HttpMethod.GET,
        data: data
    });
}

// 外地游客刷卡消费金额分析
export function getShuaKaAndJiaoYiInfo(data) {
    return Ajax({
        url: '/consumptionData/getShuaKaAndJiaoYiInfo',
        type: HttpMethod.GET,
        data: data
    });
}

// 入川高消费游客来源城市排名
export function getComeConsumeTourist(data) {
    return Ajax({
        url: '/consumptionData/getComeConsumeTourist',
        type: HttpMethod.GET,
        data: data
    });
}

// 入川游客来源地排名
export function getComeTouristAreaRank(data) {
    return Ajax({
        url: '/consumptionData/getComeTouristAreaRank',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游消费交易分析
export function getTravelConsumeAnalyse(data) {
    return Ajax({
        url: '/consumptionData/getTravelConsumeAnalyse',
        type: HttpMethod.GET,
        data: data
    });
}

// 各行业刷卡消费商户排名
export function getIndustryConsumeBusiness(data) {
    return Ajax({
        url: '/consumptionData/getIndustryConsumeBusiness',
        type: HttpMethod.GET,
        data: data
    });
}