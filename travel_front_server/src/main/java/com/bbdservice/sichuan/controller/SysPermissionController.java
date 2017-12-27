package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.SysPermission;
import com.bbdservice.sichuan.service.SysPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lixudong on 2017/12/13.
 */
@RestController
@RequestMapping("/permission")
public class SysPermissionController {
    @Autowired
    private SysPermissionService permissionService;

    @RequestMapping(method = RequestMethod.POST)
    public Response add(@RequestBody SysPermission permission) {
        return Response.success(permissionService.save(permission));
    }

    @RequestMapping(value = "/{permissionId}", method = RequestMethod.DELETE)
    public Response delete(@PathVariable String permissionId) {
        return Response.success(permissionService.deleteByPermissionId(permissionId));
    }

    @RequestMapping(value = "/list/{permissionId}/{userId}/{type}", method = RequestMethod.GET)
    public Response list(@PathVariable String permissionId, @PathVariable String userId, @PathVariable String type) {
        return Response.success(permissionService.find(permissionId, userId, type));
    }
}
