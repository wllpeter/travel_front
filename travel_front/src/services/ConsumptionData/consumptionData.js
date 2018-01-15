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