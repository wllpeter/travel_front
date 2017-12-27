package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.entity.vo.PermissionVO;

import java.util.List;

/**
 * Created by lixudong on 2017/12/4.
 */
public interface SysPermissionService {
    PermissionVO selectByUserId(String userId, String type);

    PermissionVO selectByRoleId(String roleId, String type);

    boolean save(SysPermission permission);

    boolean deleteByPermissionId(String permissionId);

    PermissionVO find(String permissionId, String userId, String type);

    List<SysPermission> selectByUserId(String userId);
}
