package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.redis.UserToken;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by lixudong on 2017/12/4.
 */
public interface UserTokenDao extends CrudRepository<UserToken, String> {
}
