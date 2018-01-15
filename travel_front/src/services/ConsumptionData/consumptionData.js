import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 全省旅游消费情况
export function getProvinceCustomerData(data) {
    return Ajax({
        url: '/consumptionData/getProvinceTravelConsume',
        type: HttpMethod.GET,
        data: data
    });
}