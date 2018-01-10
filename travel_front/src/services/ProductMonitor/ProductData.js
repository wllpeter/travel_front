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