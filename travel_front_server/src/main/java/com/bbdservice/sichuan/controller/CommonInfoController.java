package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by 陈亚兰 on 2018/1/26.
 */
@RequestMapping("/common")
@RestController
@Api(description = "身份验证报错接口")
public class CommonInfoController {
    @GetMapping("/auth")
    @ApiOperation(value = "未登陆时访问接口返回信息",notes = "..")
    public Response getInfo(String info){
        return Response.error(info);
    }
}
