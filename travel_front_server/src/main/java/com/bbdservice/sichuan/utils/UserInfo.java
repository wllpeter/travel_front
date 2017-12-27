package com.bbdservice.sichuan.utils;

import com.bbdservice.sichuan.entity.vo.UserInfoVO;

/**
 * Created by lixudong on 2017/12/7.
 */
public class UserInfo implements AutoCloseable {

    private static final ThreadLocal<UserInfoVO> current = new ThreadLocal<UserInfoVO>();


    public UserInfo(UserInfoVO userInfoVO) {
        current.set(userInfoVO);
    }

    public static UserInfoVO getCurrentUser() {
        return current.get();
    }

    public void close() {
        current.remove();
    }
}
