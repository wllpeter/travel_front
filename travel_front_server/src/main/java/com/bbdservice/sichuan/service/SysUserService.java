package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SysUser;
import com.bbdservice.sichuan.entity.vo.UserInfoVO;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * Created by lixudong on 2017/11/28.
 */
public interface SysUserService {
    boolean insert(SysUser record, String[] roleIds);

    UserInfoVO findByUserId(String userId);

    UserInfoVO findByLoginName(String loginName);

    List<SysUser> selectAll();

    boolean update(SysUser sysUser, String[] roleIds);

    PageInfo<SysUser> findPage(SysUser sysUser);

    void deleteByUserId(String userId);

    void resetPassword(String loginName, String newPassword);
}
