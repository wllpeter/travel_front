package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.entity.SysRolePermission;
import com.bbdservice.sichuan.entity.vo.PermissionVO;
import com.bbdservice.sichuan.entity.vo.RoleVO;
import com.bbdservice.sichuan.mapper.SysRoleMapper;
import com.bbdservice.sichuan.mapper.SysRolePermissionMapper;
import com.bbdservice.sichuan.service.SysPermissionService;
import com.bbdservice.sichuan.service.SysRoleService;
import com.bbdservice.sichuan.utils.UserInfo;
import com.bbdservice.sichuan.utils.UuidUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lixudong on 2017/12/4.
 */
@Service
public class SysRoleServiceImpl implements SysRoleService {

    @Autowired
    private SysRoleMapper sysRoleMapper;
    @Autowired
    private SysRolePermissionMapper rolePermissionMapper;
    @Autowired
    private SysPermissionService permissionService;

    @Override
    public PageInfo<SysRole> findPage(SysRole sysRole) {
        Map<String, Object> map = new HashMap<>();
        map.put("roleType", sysRole.getRoleType());
        map.put("roleName", sysRole.getRoleName());
        if (sysRole.getPage() != null && sysRole.getRows() != null) {
            PageHelper.offsetPage((sysRole.getPage() - 1) * sysRole.getRows(), sysRole.getRows());
        }
        List<SysRole> sysRoleList = sysRoleMapper.findPage(map);
        return new PageInfo<SysRole>(sysRoleList);
    }

    @Override
    @Transactional
    public boolean save(SysRole sysRole, String[] permissionIds, String[] configureIds) {
        sysRole.setRoleId(UuidUtils.getUUID());
        sysRole.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
        sysRole.setCreateDate(new Date());
        sysRole.setDeleted(false);
        sysRoleMapper.insert(sysRole);
        if (permissionIds != null && permissionIds.length > 0) {
            for (String permissionId : permissionIds) {
                SysRolePermission rolePermission = new SysRolePermission();
                rolePermission.setRoleId(sysRole.getRoleId());
                rolePermission.setPermissionId(permissionId);
                rolePermission.setType("get");
                rolePermission.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
                rolePermission.setCreateDate(new Date());
                rolePermissionMapper.insert(rolePermission);
            }
        }
        if (configureIds != null && configureIds.length > 0) {
            for (String configureId : configureIds) {
                SysRolePermission rolePermission = new SysRolePermission();
                rolePermission.setRoleId(sysRole.getRoleId());
                rolePermission.setPermissionId(configureId);
                rolePermission.setType("set");
                rolePermission.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
                rolePermission.setCreateDate(new Date());
                rolePermissionMapper.insert(rolePermission);
            }
        }
        return true;
    }

    @Override
    public RoleVO findByRoleId(String roleId) {
        SysRole sysRole = sysRoleMapper.selectByRoleId(roleId);
        PermissionVO permissionVO = permissionService.selectByRoleId(roleId, "get");
        PermissionVO configureVO = permissionService.selectByRoleId(roleId, "set");
        RoleVO roleVO = new RoleVO();
        roleVO.setSysRole(sysRole);
        roleVO.setPermissionVO(permissionVO);
        roleVO.setConfigureVO(configureVO);
        return roleVO;
    }

    @Override
    @Transactional
    public void deleteByRoleId(String roleId) {
        rolePermissionMapper.deleteByRoleId(roleId);
        sysRoleMapper.deleteByRoleId(roleId);
    }

    @Override
    @Transactional
    public void update(SysRole role, String[] permissionIds, String[] configureIds) {
        if (role == null || StringUtils.isEmpty(role.getRoleId()))
            return;
        role.setModifyBy(UserInfo.getCurrentUser().getSysUser().getUserId());
        role.setModifyDate(new Date());
        sysRoleMapper.update(role);
        rolePermissionMapper.deleteByRoleId(role.getRoleId());
        if (configureIds != null && configureIds.length > 0) {
            for (String permissionId : permissionIds) {
                SysRolePermission rolePermission = new SysRolePermission();
                rolePermission.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
                rolePermission.setCreateDate(new Date());
                rolePermission.setRoleId(role.getRoleId());
                rolePermission.setPermissionId(permissionId);
                rolePermission.setType("get");
                rolePermissionMapper.insert(rolePermission);
            }
        }
        if (configureIds != null && configureIds.length > 0) {
            for (String configureId : configureIds) {
                SysRolePermission rolePermission = new SysRolePermission();
                rolePermission.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
                rolePermission.setCreateDate(new Date());
                rolePermission.setRoleId(role.getRoleId());
                rolePermission.setPermissionId(configureId);
                rolePermission.setType("set");
                rolePermissionMapper.insert(rolePermission);
            }
        }
    }
}
