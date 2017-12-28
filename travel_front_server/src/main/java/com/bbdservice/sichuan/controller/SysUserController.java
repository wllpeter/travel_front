package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.entity.SysUser;
import com.bbdservice.sichuan.entity.enums.Const;
import com.bbdservice.sichuan.entity.redis.UserToken;
import com.bbdservice.sichuan.entity.vo.UserInfoVO;
import com.bbdservice.sichuan.service.SysPermissionService;
import com.bbdservice.sichuan.service.SysUserService;
import com.bbdservice.sichuan.service.UserTokenService;
import com.bbdservice.sichuan.utils.HttpUtils;
import com.bbdservice.sichuan.utils.PasswordUtils;
import com.bbdservice.sichuan.utils.UserInfo;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by lixudong on 2017/11/28.
 */
@RestController
@RequestMapping("/user")
public class SysUserController extends BaseController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysPermissionService sysPermissionService;
    @Autowired
    private UserTokenService userTokenService;

    @Value("${setting.loginExpireSeconds}")
    private int loginExpireSeconds;

    @Value("${setting.token.cookie.timeout}")
    private int tokenTimeout;

    @ApiOperation(value = "用户注册")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "user", value = "用户对象", required = true, paramType = "body", dataType = "SysUser"),
            @ApiImplicitParam(name = "roleIds", value = "角色id", required = true, paramType = "path", dataType = "String"),
    })
    @RequestMapping(method = RequestMethod.POST)
    public Response add(@RequestBody SysUser user, String[] roleIds) {
        if (StringUtils.isEmpty(user.getLoginName())) {
            return Response.error(getMessage("Common.Response.User.LoginName.Null"));
        }
        if (sysUserService.findByLoginName(user.getLoginName()) != null) {
            return Response.error(getMessage("Common.Response.User.Exists"));
        }
        return Response.success(sysUserService.insert(user, roleIds));
    }


    @ApiOperation(value = "用户更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id", required = true, paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "sysUser", value = "用户对象", required = true, paramType = "body", dataType = "SysUser"),
            @ApiImplicitParam(name = "roleIds", value = "角色id", required = true, paramType = "path", dataType = "String")
    })
    @RequestMapping(value = "/{userId}", method = RequestMethod.PUT)
    public Response update(@PathVariable String userId, @RequestBody SysUser sysUser, String[] roleIds) {
        UserInfoVO userInfoVO = sysUserService.findByUserId(userId);
        if (userInfoVO == null) {
            return Response.error(getMessage("Common.Response.User.Missing"));
        }
        if (StringUtils.isEmpty(sysUser.getLoginName())) {
            return Response.error(getMessage("Common.Response.User.LoginName.Null"));
        }
        if (sysUserService.findByLoginName(sysUser.getLoginName()) != null && !sysUser.getLoginName().equals(userInfoVO.getSysUser().getLoginName())) {
            return Response.error(getMessage("Common.Response.User.Exists"));
        }
        sysUser.setUserId(userId);
        return Response.success(sysUserService.update(sysUser, roleIds));
    }

    @ApiOperation(value = "全部用户")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Response list() {
        return Response.success(sysUserService.selectAll());
    }

    @ApiOperation(value = "用户分页查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysUser", value = "用户对象", paramType = "body", dataType = "SysUser")
    })
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public Response getAll(@RequestBody SysUser sysUser) {
        PageInfo<SysUser> userList = sysUserService.findPage(sysUser);
        return Response.success(userList);
    }

    @ApiOperation(value = "用户登录")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysUser", value = "用户对象", required = true, paramType = "body", dataType = "SysUser")
    })
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response login(@RequestBody SysUser sysUser, HttpServletResponse response) {
        String loginName = sysUser.getLoginName();
        String password = sysUser.getPassword();
        if (loginName == null || password == null) {
            return Response.error(getMessage("Login.Error.NullInfo"));
        }
        UserInfoVO userInfo = sysUserService.findByLoginName(loginName);
        if (userInfo == null) {
            return Response.error(getMessage("Login.Error.CantFindUser"));
        }
        if (!PasswordUtils.verifyPassword(password, userInfo.getSysUser().getSalt(), userInfo.getSysUser().getPassword())) {
            return Response.error(getMessage("Login.Error.PasswordError"));
        }
        List<SysPermission> permissionList = sysPermissionService.selectByUserId(userInfo.getSysUser().getUserId());
        boolean canFrontShow;
        canFrontShow = permissionList.stream().filter(p -> !p.getPermissionCode().equals(Const.PermissionCode.FRONT_SHOW)).collect(Collectors.toList()).size() >0?true:false;
        if(!canFrontShow){
            return Response.error(getMessage("Login.Error.PermissionDenied"));
        }
        String token = getToken(userInfo.getSysUser());
        response.addCookie(HttpUtils
                .getCookie("loginName", userInfo.getSysUser().getLoginName(), tokenTimeout, "/", false));
        response.addCookie(HttpUtils
                .getCookie("token", token, tokenTimeout, "/", false));
        UserToken userToken = new UserToken(userInfo.getSysUser().getLoginName(), token, getPermissions(userInfo.getSysUser().getUserId()), DateUtils.addSeconds(new Date(), loginExpireSeconds));

        userTokenService.save(userToken);
        return Response.success(userInfo);
    }

    @ApiOperation(value = "用户查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id", required = true, paramType = "path", dataType = "String")
    })
    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public Response find(@PathVariable String userId) {
        return Response.success(sysUserService.findByUserId(userId));
    }

    @ApiOperation(value = "用户删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id", required = true, paramType = "path", dataType = "String"),
    })
    @RequestMapping(value = "/{userId}", method = RequestMethod.DELETE)
    public Response delete(@PathVariable String userId) {
        sysUserService.deleteByUserId(userId);
        return Response.success();
    }

    @ApiOperation(value = "修改密码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "loginName", value = "登录名", required = true, paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "oldPassword", value = "旧密码", required = true, paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "newPassword", value = "新密码", required = true, paramType = "path", dataType = "String")
    })
    @RequestMapping(value = "resetPassword", method = RequestMethod.GET)
    public Response resetPassword(String loginName, String oldPassword, String newPassword) {
        if (loginName == null || oldPassword == null || newPassword == null) {
            return Response.error(getMessage("Login.Error.NullInfo"));
        }
        UserInfoVO userInfo = sysUserService.findByLoginName(loginName);
        if (!PasswordUtils.verifyPassword(oldPassword, userInfo.getSysUser().getSalt(), userInfo.getSysUser().getPassword())) {
            return Response.error(getMessage("Login.Error.PasswordError"));
        }
        sysUserService.resetPassword(loginName, PasswordUtils.hashPassword(newPassword, userInfo.getSysUser().getSalt()));
        return Response.success();
    }

    @RequestMapping(value = "createPassword", method = RequestMethod.GET)
    public Response createPassword() {
        return Response.success(PasswordUtils.createPassWord(8));
    }

    /**
     * 生成token
     *
     * @param sysUser
     * @return
     */
    private String getToken(SysUser sysUser) {
        StringBuffer tokenString = new StringBuffer(sysUser.getLoginName());
        tokenString.append(new Date().getTime());
        return DigestUtils.md5Hex(tokenString.toString());
    }

    /**
     * 计算权限set
     *
     * @param userId
     * @return
     */
    private Set<String> getPermissions(String userId) {

        Set<String> permissionSet = new HashSet<String>();
        if (userId == null) {
            return permissionSet;
        }
        List<SysPermission> permissionList = sysPermissionService.selectByUserId(userId);
        for (SysPermission sysPermission : permissionList) {
            permissionSet.add(sysPermission.getPermissionCode());
        }
        return permissionSet;
    }
}
