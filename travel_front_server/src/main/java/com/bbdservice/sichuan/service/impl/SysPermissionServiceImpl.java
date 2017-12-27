package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.entity.vo.PermissionVO;
import com.bbdservice.sichuan.mapper.SysPermissionMapper;
import com.bbdservice.sichuan.service.SysPermissionService;
import com.bbdservice.sichuan.utils.UserInfo;
import com.bbdservice.sichuan.utils.UuidUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by lixudong on 2017/12/4.
 */
@Service
public class SysPermissionServiceImpl implements SysPermissionService {

    @Autowired
    private SysPermissionMapper sysPermissionMapper;

    @Override
    public PermissionVO selectByUserId(String userId, String type) {
        return find(null, userId, type);
    }

    @Override
    public PermissionVO selectByRoleId(String roleId, String type) {
        SysPermission permission = new SysPermission();
        List<String> permissionIds = null;
        permission.setPermissionId("0");

        if (!StringUtils.isEmpty(roleId)) {
            permissionIds = sysPermissionMapper.selectByRoleId(roleId, type).stream().filter(n -> n != null).map(m -> m.getPermissionId()).collect(Collectors.toList());
        }
        PermissionVO permissionVO = new PermissionVO();
        permissionVO.setPermission(permission);
        addChildren(permissionVO, permissionIds);
        return permissionVO;
    }

    @Override
    public boolean save(SysPermission permission) {
        permission.setPermissionId(UuidUtils.getUUID());
        permission.setCreateBy(UserInfo.getCurrentUser().getSysUser().getUserId());
        permission.setCreateDate(new Date());
        permission.setDeleted(false);
        sysPermissionMapper.insert(permission);
        return true;
    }

    @Override
    public boolean deleteByPermissionId(String permissionId) {
        sysPermissionMapper.deleteByPermissionId(permissionId);
        return true;
    }

    @Override
    public PermissionVO find(String permissionId, String userId, String type) {
        SysPermission permission = new SysPermission();
        List<String> permissionIds = null;
        if (!StringUtils.isEmpty(permissionId) && !"0".equals(permissionId)) {
            permission = sysPermissionMapper.selectByPermissionId(permissionId);
        } else {
            permission.setPermissionId("0");
        }
        if (!StringUtils.isEmpty(userId)) {
            permissionIds = sysPermissionMapper.selectByUserId(userId, type).stream().filter(n -> n != null).map(m -> m.getPermissionId()).collect(Collectors.toList());
        }
        PermissionVO permissionVO = new PermissionVO();
        permissionVO.setPermission(permission);
        addChildren(permissionVO, permissionIds);
        return permissionVO;
    }

    @Override
    public List<SysPermission> selectByUserId(String userId) {
        return sysPermissionMapper.selectByUserId(userId, "get");
    }

    protected boolean addChildren(PermissionVO permissionVO, List<String> permissionIds) {
        List<SysPermission> children = sysPermissionMapper.findByParentId(permissionVO.getPermission().getPermissionId());
        if (children == null || children.size() == 0) {
            return false;
        }
        List<PermissionVO> permissionVOList = new ArrayList<>();
        for (SysPermission permission : children) {
            if (permissionIds != null && permissionIds.contains(permission.getPermissionId())) {
                PermissionVO child = new PermissionVO();
                child.setPermission(permission);
                permissionVOList.add(child);
            }
        }
        permissionVO.setChildren(permissionVOList);
        for (PermissionVO vo : permissionVOList) {
            addChildren(vo, permissionIds);
        }
        return true;
    }
}
