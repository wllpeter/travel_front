import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 旅游产品分类
export function getClassifyType(data) {
    return Ajax({
        url: '/tourismProduct/getClassifyType',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游综合分析
export function getOverAllMerit(data) {
    return Ajax({
        url: '/tourismProduct/getOverAllMerit',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游产品供给
export function getSupplyConsume(data) {
    return Ajax({
        url: '/tourismProduct/getSupplyConsume',
        type: HttpMethod.GET,
        data: data
    });
}