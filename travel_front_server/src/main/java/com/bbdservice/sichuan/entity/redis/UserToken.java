package com.bbdservice.sichuan.entity.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 * Created by lixudong on 2017/12/4.
 */
@RedisHash(value = "userToken", timeToLive = 3600)
public class UserToken implements Serializable {

    private static final long serialVersionUID = -7316506086217025169L;

    @Id
    private String loginName;

    private String token;

    private Set<String> permissions;

    private Date expireDate;

    public UserToken(String loginName, String token, Set<String> permissions, Date expireDate) {
        this.loginName = loginName;
        this.token = token;
        this.permissions = permissions;
        this.expireDate = expireDate;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Set<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<String> permissions) {
        this.permissions = permissions;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }
}
