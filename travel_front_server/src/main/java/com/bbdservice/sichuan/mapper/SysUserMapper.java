package com.bbdservice.sichuan.mapper;

import com.bbdservice.sichuan.entity.SysUser;
import com.bbdservice.sichuan.utils.MyMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface SysUserMapper extends MyMapper<SysUser> {
    SysUser selectByUserId(@Param("userId") String userId);

    SysUser selectByLoginName(@Param("loginName") String loginName);

    void deleteByUserId(@Param("userId") String userId);

    void resetPassword(@Param("loginName") String loginName, @Param("newPassword") String newPassword);

    List<SysUser> selectByUserName(String baseName);

    List<SysUser> findPage(Map<String, Object> map);
}