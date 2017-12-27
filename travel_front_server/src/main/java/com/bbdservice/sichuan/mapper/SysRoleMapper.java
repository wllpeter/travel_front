package com.bbdservice.sichuan.mapper;

import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.utils.MyMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface SysRoleMapper extends MyMapper<SysRole> {
    List<SysRole> selectByUserId(@Param("userId") String userId);

    SysRole selectByRoleId(@Param("roleId") String roleId);

    void deleteByRoleId(@Param("roleId") String roleId);

    List<SysRole> findPage(Map<String, Object> map);

    List<SysRole> findList(@Param("departmentType") String departmentType, @Param("userType")String userType);

    void update(SysRole role);
}