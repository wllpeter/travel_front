package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.entity.SysUser;
import com.bbdservice.sichuan.entity.SysUserRole;
import com.bbdservice.sichuan.entity.vo.PermissionVO;
import com.bbdservice.sichuan.entity.vo.UserInfoVO;
import com.bbdservice.sichuan.mapper.SysRoleMapper;
import com.bbdservice.sichuan.mapper.SysUserMapper;
import com.bbdservice.sichuan.mapper.SysUserRoleMapper;
import com.bbdservice.sichuan.service.SysPermissionService;
import com.bbdservice.sichuan.service.SysUserService;
import com.bbdservice.sichuan.utils.PasswordUtils;
import com.bbdservice.sichuan.utils.UserInfo;
import com.bbdservice.sichuan.utils.UuidUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by lixudong on 2017/11/28.
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;
    @Autowired
    private SysRoleMapper sysRoleMapper;
    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;
    @Autowired
    private SysPermissionService permissionService;

    @Override
    @Transactional
    public boolean insert(SysUser record, String[] roleIds) {
        record.setUserId(UuidUtils.getUUID());
        record.setPassword(PasswordUtils.hashPassword(record.getPassword(), record.getSalt()));
        record.setCreateDate(new Date());
        record.setDeleted(false);
        sysUserMapper.insert(record);
        if (roleIds != null && roleIds.length > 0) {
            for (String roleId : roleIds) {
                if (StringUtils.isEmpty(roleId))
                    continue;
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setUserId(record.getUserId());
                sysUserRole.setRoleId(roleId);
                sysUserRole.setCreateDate(new Date());
                sysUserRoleMapper.insert(sysUserRole);
            }
        }
        return true;
    }

    @Override
    public UserInfoVO findByUserId(String userId) {
        SysUser sysUser = sysUserMapper.selectByUserId(userId);
        List<SysRole> roleList = sysRoleMapper.selectByUserId(userId);
        PermissionVO permissionVO = permissionService.find("0", userId, "get");
        PermissionVO configureVO = permissionService.find("0", userId, "set");
        UserInfoVO userInfoVO = new UserInfoVO();
        userInfoVO.setSysUser(sysUser);
        userInfoVO.setRoleSet(new HashSet<>(roleList));
        userInfoVO.setPermission(permissionVO);
        userInfoVO.setConfigure(configureVO);
        return userInfoVO;
    }

    @Override
    public UserInfoVO findByLoginName(String loginName) {
        SysUser sysUser = sysUserMapper.selectByLoginName(loginName);
        if (sysUser != null) {
            return findByUserId(sysUser.getUserId());
        }
        return null;
    }

    @Override
    public List<SysUser> selectAll() {
        return sysUserMapper.selectAll();
    }

    @Override
    @Transactional
    public boolean update(SysUser sysUser, String[] roleIds) {
        SysUser param = sysUserMapper.selectByUserId(sysUser.getUserId());
        param.setUserName(sysUser.getUserName());
        param.setEmail(sysUser.getEmail());
        param.setTelephone(sysUser.getTelephone());
        param.setMobilePhone(sysUser.getMobilePhone());
        sysUser.setModifyBy(UserInfo.getCurrentUser().getSysUser().getUserId());
        sysUser.setModifyDate(new Date());
        sysUserMapper.updateByPrimaryKey(sysUser);
        sysUserRoleMapper.deleteByUserId(sysUser.getUserId());
        if (roleIds != null && roleIds.length > 0) {
            for (String roleId : roleIds) {
                SysUserRole sysUserRole = new SysUserRole();
                sysUserRole.setUserId(sysUser.getUserId());
                sysUserRole.setRoleId(roleId);
                sysUserRole.setCreateDate(new Date());
                sysUserRoleMapper.insert(sysUserRole);
            }
        }
        return true;
    }

    @Override
    public PageInfo<SysUser> findPage(SysUser sysUser) {
        Map<String, Object> map = new HashMap<>();
        map.put("userName", sysUser.getUserName());
        map.put("state", sysUser.getState());
        map.put("type", sysUser.getType());
        if (sysUser.getPage() != null && sysUser.getRows() != null) {
            PageHelper.offsetPage((sysUser.getPage() - 1) * sysUser.getRows(), sysUser.getRows());
        }
        return new PageInfo<SysUser>(sysUserMapper.findPage(map));
    }

    @Override
    public void deleteByUserId(String userId) {
        sysUserMapper.deleteByUserId(userId);
    }

    @Override
    public void resetPassword(String loginName, String newPassword) {
        sysUserMapper.resetPassword(loginName, newPassword);
    }
}
