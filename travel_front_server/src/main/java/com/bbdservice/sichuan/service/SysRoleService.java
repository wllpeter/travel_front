package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.entity.vo.RoleVO;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
 * Created by lixudong on 2017/12/4.
 */
public interface SysRoleService {

    PageInfo<SysRole> findPage(SysRole sysRole);

    boolean save(SysRole sysRole, String[] permissionIds, String[] configureIds);

    RoleVO findByRoleId(String roleId);

    void deleteByRoleId(String roleId);

    void update(SysRole role, String[] permissionIds, String[] configureIds);
}
