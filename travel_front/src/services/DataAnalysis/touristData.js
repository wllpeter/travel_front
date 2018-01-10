import { HttpMethod } from '../../constants/common';
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