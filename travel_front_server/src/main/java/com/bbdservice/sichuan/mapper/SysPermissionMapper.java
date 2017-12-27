package com.bbdservice.sichuan.mapper;

import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.utils.MyMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysPermissionMapper extends MyMapper<SysPermission> {

    List<SysPermission> selectByUserId(@Param("userId") String userId, @Param("type") String type);

    List<SysPermission> selectByRoleId(@Param("roleId") String roleId, @Param("type") String type);

    void deleteByPermissionId(@Param("permissionId") String permissionId);

    List<SysPermission> findByParentId(@Param("parentId") String parentId);

    SysPermission selectByPermissionId(@Param("permissionId") String permissionId);
}