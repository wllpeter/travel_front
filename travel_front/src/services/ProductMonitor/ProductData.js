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

// 旅游产品好评榜
export function getOpinionRank(data) {
    return Ajax({
        url: '/tourismProduct/getOpinionRank',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游产品热词搜索排行榜
export function getKeyWordRank(data) {
    return Ajax({
        url: '/tourismProduct/getKeyWordRank',
        type: HttpMethod.GET,
        data: data
    });
}

// 旅游产品产品价格走势
export function getPriceTrend(data) {
    return Ajax({
        url: '/tourismProduct/getPriceTrend',
        type: HttpMethod.GET,
        data: data
    });
}