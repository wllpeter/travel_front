package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.SysRole;
import com.bbdservice.sichuan.service.SysPermissionService;
import com.bbdservice.sichuan.service.SysRoleService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lixudong on 2017/12/6.
 */
@RestController
@RequestMapping("/role")
public class SysRoleController extends BaseController {
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SysPermissionService permissionService;

    @ApiOperation(value = "角色分页查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysRole", value = "角色对象", required = true, paramType = "body", dataType = "SysRole")
    })
    @RequestMapping(value = "/page", method = RequestMethod.POST)
    public Response page(@RequestBody SysRole sysRole) {
        return Response.success(sysRoleService.findPage(sysRole));
    }

    @ApiOperation(value = "添加角色")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysRole", value = "角色对象", required = true, paramType = "body", dataType = "SysRole"),
            @ApiImplicitParam(name = "permissionIds", value = "账号权限id", paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "configureIds", value = "配置权限id", paramType = "path", dataType = "String")
    })
    @RequestMapping(method = RequestMethod.POST)
    public Response add(@RequestBody SysRole sysRole, String[] permissionIds, String[] configureIds) {
        return Response.success(sysRoleService.save(sysRole, permissionIds, configureIds));
    }

    @ApiOperation(value = "角色详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleId", value = "角色id", required = true, paramType = "path", dataType = "String"),
    })
    @RequestMapping(value = "/{roleId}", method = RequestMethod.GET)
    public Response find(@PathVariable String roleId) {
        return Response.success(sysRoleService.findByRoleId(roleId));
    }

    @ApiOperation(value = "角色删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleId", value = "角色id", required = true, paramType = "path", dataType = "String"),
    })
    @RequestMapping(value = "/{roleId}", method = RequestMethod.DELETE)
    public Response delete(@PathVariable String roleId) {
//        List<SysPermission> permissionList = permissionService.selectByRoleId(sysRole.getRoleId());
//        if (permissionList != null || permissionList.size() == 0){
//            return Response.error(getMessage("Role.Error.CannotDelete"));
//        }
        sysRoleService.deleteByRoleId(roleId);
        return Response.success();
    }

    @ApiOperation(value = "角色更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysRole", value = "角色对象", required = true, paramType = "body", dataType = "SysRole"),
            @ApiImplicitParam(name = "permissionIds", value = "权限id", required = true, paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "configureIds", value = "配置权限id", paramType = "path", dataType = "String")
    })
    @RequestMapping(method = RequestMethod.PUT)
    public Response update(@RequestBody SysRole role, String[] permissionIds, String[] configureIds) {
        sysRoleService.update(role, permissionIds, configureIds);
        return Response.success();
    }
}
