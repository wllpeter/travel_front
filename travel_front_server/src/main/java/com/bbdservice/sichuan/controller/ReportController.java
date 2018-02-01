package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.PdfDO;
import com.bbdservice.sichuan.service.ReportService;
import com.bbdservice.sichuan.utils.Base64Utils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.hibernate.result.Outputs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Base64;
import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@Api(value = "大数据报告")
@RestController
@RequestMapping(value = "/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/getPdfListByType")
    @ApiOperation(value = "根据类型展示所有文件", notes = "届时")
    public Response getListByType() {
        List<PdfDO> list = reportService.getPdfList();
        return Response.success(list);
    }


    @GetMapping("/{id}")
    @ApiOperation(value = "文件详情")
    @ApiImplicitParam(name = "id", value = "id", defaultValue = "50", paramType = "path", dataType = "Long")
    public Response getPdfById(@PathVariable Long id) throws IOException {
        PdfDO p = reportService.getPdfLiu(id);
        if(p==null){
            return Response.error("不存在本id");
        }
        String address= Base64Utils.getFromBased64(p.getAddress());
        p.setAddress(address);
        return Response.success(p);
    }


}
