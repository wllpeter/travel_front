package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.UserTokenDao;
import com.bbdservice.sichuan.entity.redis.UserToken;
import com.bbdservice.sichuan.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lixudong on 2017/12/4.
 */
@Service
public class UserTokenServiceImpl implements UserTokenService {
    @Autowired
    private UserTokenDao userTokenDao;

    @Override
    public UserToken find(String loginName) {
        return userTokenDao.findOne(loginName);
    }

    @Override
    public UserToken save(UserToken userToken) {
        return userTokenDao.save(userToken);
    }

    @Override
    public void delete(UserToken userToken) {
        userTokenDao.delete(userToken);
    }

    @Override
    public void delete(String loginName) {
        delete(userTokenDao.findOne(loginName));
    }
}
