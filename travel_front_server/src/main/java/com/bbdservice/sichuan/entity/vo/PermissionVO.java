package com.bbdservice.sichuan.entity.vo;

import com.bbdservice.sichuan.entity.SysPermission;

import java.util.List;

/**
 * Created by lixudong on 2017/12/13.
 */
public class PermissionVO {
    SysPermission permission;
    List<PermissionVO> children;

    public SysPermission getPermission() {
        return permission;
    }

    public void setPermission(SysPermission permission) {
        this.permission = permission;
    }

    public List<PermissionVO> getChildren() {
        return children;
    }

    public void setChildren(List<PermissionVO> children) {
        this.children = children;
    }
}
