package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.redis.UserToken;

/**
 * Created by lixudong on 2017/12/4.
 */
public interface UserTokenService {
    UserToken find(String loginName);

    UserToken save(UserToken userToken);

    void delete(UserToken userToken);

    void delete(String loginName);
}
