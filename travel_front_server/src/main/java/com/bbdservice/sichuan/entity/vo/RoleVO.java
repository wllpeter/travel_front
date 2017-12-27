package com.bbdservice.sichuan.entity.vo;

import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.entity.SysRole;

/**
 * Created by lixudong on 2017/12/6.
 */
public class RoleVO {
    private SysRole sysRole;
    private PermissionVO permissionVO;

    private PermissionVO configureVO;

    public SysRole getSysRole() {
        return sysRole;
    }

    public void setSysRole(SysRole sysRole) {
        this.sysRole = sysRole;
    }

    public PermissionVO getPermissionVO() {
        return permissionVO;
    }

    public void setPermissionVO(PermissionVO permissionVO) {
        this.permissionVO = permissionVO;
    }


    public PermissionVO getConfigureVO() {
        return configureVO;
    }

    public void setConfigureVO(PermissionVO configureVO) {
        this.configureVO = configureVO;
    }
}
