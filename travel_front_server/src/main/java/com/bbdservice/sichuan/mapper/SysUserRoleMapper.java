package com.bbdservice.sichuan.mapper;

import com.bbdservice.sichuan.entity.SysUserRole;
import com.bbdservice.sichuan.utils.MyMapper;
import org.apache.ibatis.annotations.Param;

public interface SysUserRoleMapper extends MyMapper<SysUserRole> {
    void deleteByUserId(@Param("userId") String userId);
}