package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.ClassifyData;
import com.bbdservice.sichuan.service.ClassifyTypeService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/5.
 */
@RequestMapping(value = "/tourismProduct")
@RestController
public class TourismProductController {
     @Autowired
     private ClassifyTypeService classifyTypeService;
    @ApiOperation(value = "/旅游产品分类")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "String",defaultValue = "1"),
            @ApiImplicitParam(name="dataType",value = "类型,取值[supply,spend],默认supply供给",paramType = "query",dataType = "String",defaultValue = "supply"),
            @ApiImplicitParam(name="date",value = "选择日期,String类型YYYY-MM-DD格式",paramType = "query",dataType = "String",defaultValue = "2017-04-12")
    })
    @GetMapping(value = "/type")
    public Response getProductType(@RequestParam(name = "productType",defaultValue = "1") Long productType, String dataType, String date) throws Exception {
        Long year=Long.parseLong(date.substring(0,4));
        Long month=Long.parseLong(date.substring(5,7));
        List<ClassifyData> classifyDataList=null;
         String data;
        if(dataType.equals("supply")){
             data=1+"";
        }else if(dataType.equals("spend")){
             data=0+"";
        }else{
            throw new Exception("类型错误");
        }
        classifyDataList=classifyTypeService.getClassifyDataByDataTypeAndYearAndMonthAndProductType(data,year,month,productType);
        return Response.success(classifyDataList);
    }
}
