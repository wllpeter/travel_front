import { HttpMethod } from '../../constants/common';
import Ajax from '../../utils/Ajax';

// 获取验证码
export function getIdentifyingCode (data) {
    return Ajax({
        url: '/user/getIdentifyingCode',
        type: HttpMethod.GET,
        data: data
    });
}

// 登录
export function login (data) {
    return Ajax({
        url: '/user/login',
        type: HttpMethod.POST,
        data: data
    });
}

// 注销登录
export function logOut (data) {
    return Ajax({
        url: '/user/logOut',
        type: HttpMethod.GET,
        data: data
    });
}