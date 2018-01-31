import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 获取pdf列表
export function getPdfList(data) {
    return Ajax({
        url: '/report/getPdfListByType',
        type: HttpMethod.GET,
        data: data
    });
}

// 获取pdf详情
export function getReport(data) {
    return Ajax({
        url: `/report/${data.id}`,
        type: HttpMethod.GET,
        data: data
    });
}