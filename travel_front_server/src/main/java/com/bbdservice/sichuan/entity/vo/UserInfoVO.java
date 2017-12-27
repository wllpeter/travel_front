package com.bbdservice.sichuan.entity.vo;
import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.entity.SysUser;

import java.util.Set;

/**
 * Created by lixudong on 2017/12/6.
 */
public class UserInfoVO {

    private SysUser sysUser;
    private Set<SysRole> roleSet;
    private PermissionVO permission;
    private PermissionVO configure;

    public SysUser getSysUser() {
        return sysUser;
    }

    public void setSysUser(SysUser sysUser) {
        this.sysUser = sysUser;
    }

    public Set<SysRole> getRoleSet() {
        return roleSet;
    }

    public void setRoleSet(Set<SysRole> roleSet) {
        this.roleSet = roleSet;
    }

    public PermissionVO getPermission() {
        return permission;
    }

    public void setPermission(PermissionVO permission) {
        this.permission = permission;
    }

    public PermissionVO getConfigure() {
        return configure;
    }

    public void setConfigure(PermissionVO configure) {
        this.configure = configure;
    }
}
