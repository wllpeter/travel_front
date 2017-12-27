package com.bbdservice.sichuan.mapper;

import com.bbdservice.sichuan.entity.SysRolePermission;
import com.bbdservice.sichuan.utils.MyMapper;
import org.apache.ibatis.annotations.Param;

public interface SysRolePermissionMapper extends MyMapper<SysRolePermission> {
    void deleteByRoleId(@Param("roleId") String roleId);
}