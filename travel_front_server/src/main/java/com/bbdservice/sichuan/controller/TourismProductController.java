package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.service.*;

import io.swagger.annotations.Api;
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
import java.util.*;

/**
 * Created by 陈亚兰 on 2018/1/5.
 * 旅游产品检测 页面接口
 */
@RequestMapping(value = "/tourismProduct")
@RestController
@Api(description = "旅游产品检测")
public class TourismProductController {
     @Autowired
     private ClassifyTypeService classifyTypeService;
     @Autowired
     private OpinionRankService opinionRankService;
     @Autowired
     private OverallMeritService ov;
     @Autowired
     private KeyWordRankService keyWordRankService;
     @Autowired
     private SupplyConsumeCountService su;
     @Autowired
     private PriceTrendService priceTrendService;
     @Autowired
     private TpmHotWordDataService tpmHotWordDataService;

    @ApiOperation(value = "旅游产品分类",notes = "productType值为1-5    1-旅游产品\n" +
            "            2-住宿产品\n" +
            "            3-餐饮产品\n" +
            "            4-购物产品\n" +
            "            5-娱乐产品")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "String",defaultValue = "1"),
            @ApiImplicitParam(name="dataType",value = "类型 值为1或者0  1-供给 0-消费  ",paramType = "query",dataType = "String",defaultValue = "1"),
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "Long",defaultValue = "2017"),
            @ApiImplicitParam(name="month",value = "月",paramType = "query",dataType = "Long",defaultValue = "4")
    })
    @GetMapping(value = "/getClassifyType")
    public Response getProductType( Long productType,@RequestParam(name="dataType",defaultValue ="1" ) String dataType, Long year,Long month) throws Exception {
        List<ClassifyData> classifyDataList=null;
         switch(productType+""){
             case "1":
                 classifyDataList=classifyTypeService.getClassifyDataByDataTypeAndYearAndMonthAndProductType(dataType,year,month,productType);
                 break;
             case "2":
             case "3":
             case "4":
             case "5":
                 classifyDataList=classifyTypeService.getWithoutClassifyDataList(productType,year,month);
                 break;
             default:
                 break;
         }

        return Response.success(classifyDataList);
    }

    @ApiOperation(value = "好评榜")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "String",defaultValue = "1"),
            @ApiImplicitParam(name="dataType",value = "类型,数值1-4 1-产品 2-景区 3-特产 4-商场 ",paramType = "query",dataType = "Integer",defaultValue = "1"),
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "Integer",defaultValue = "2017"),
            @ApiImplicitParam(name="month",value = "月",paramType = "query",dataType = "Integer",defaultValue = "9")
    })
    @GetMapping(value = "/getOpinionRank")
    public Response getOpinionRank(Integer productType,Integer dataType,Integer year,Integer month){
        List<OpinionRank> opinionRanks=new ArrayList<>();
        switch (productType+""){
            case "1":
            case "4":
                opinionRanks=opinionRankService.getAll(year,month,productType,dataType);
                break;
            case "2":
            case "3":
            case "5":
                opinionRanks=opinionRankService.getWithoutDataType(year,month,productType);
                break;
                default:break;
        }
        return Response.success(opinionRanks);
    }


    @ApiOperation(value = "综合评价")
    @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "Integer",defaultValue = "1")
    @GetMapping(value = "/getOverAllMerit")
    public Response getOverAllMerit(Integer productType){
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));    //获取东八区时间
        Integer year = c.get(Calendar.YEAR);    //获取年
        int[] years={year,year-1};
        List<OverallMerit> overallMerits=null;
        overallMerits=ov.getAllList(productType,years);
        return Response.success(overallMerits);
    }


    @ApiOperation(value = "热词搜索排行")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "Integer",defaultValue = "1"),
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "Integer",defaultValue = "2017"),
            @ApiImplicitParam(name="month",value = "月",paramType = "query",dataType = "Integer",defaultValue = "9")
    })
    @GetMapping(value="/getKeyWordRank")
    public Response getKeyWordRank(Integer productType,Integer year,Integer month){
        List<KeywordRank> keywordRanks=null;
        keywordRanks=keyWordRankService.getAllKeyWordRank(productType,year,month);
        return Response.success(keywordRanks);
    }

    @ApiOperation(value = "旅游产品供给/消费总量")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "Integer",defaultValue = "1"),
            @ApiImplicitParam(name="dataType",value = "数据类型 值为1和2  1-供给 2-消费",paramType = "query",dataType = "Integer",defaultValue = "1"),
    })
    @GetMapping(value = "/getSupplyConsume")
    public Response getSupplyConsume(Integer productType,Integer dataType){
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));    //获取东八区时间
        Integer year = c.get(Calendar.YEAR);    //获取年
        List<SupplyConsumeCount> list=null;
        switch (productType){
            case 1:
                list=su.getAllList(productType,dataType,year,year-1);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                list=su.getWithOutDataType(productType,year,year-1);
                break;
            default:break;

        }
        return Response.success(list);
    }

    @ApiOperation(value = "产品价格走势")
    @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "Integer",defaultValue = "1")
    @GetMapping(value = "/getPriceTrend")
    public Response getPriceTrend(Integer productType){
        Calendar c= Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));    //获取东八区时间
        Integer year = c.get(Calendar.YEAR);
        int[] years={year,year-1};
        List<PriceTrend> priceTrends=null;
        priceTrends=priceTrendService.getAllList(productType,years);
        return Response.success(priceTrends);
    }

    @ApiOperation(value = "产品评价热词云")
    @ApiImplicitParams({
            @ApiImplicitParam(name="productType",value = "产品类型",paramType = "query",dataType = "Integer",defaultValue = "1"),
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "Integer",defaultValue = "2018"),
            @ApiImplicitParam(name="month",value = "月",paramType = "query",dataType = "Integer",defaultValue = "1")
    })
    @GetMapping(value = "/getProductHotWords")
    public Response getProductHotWords(Integer productType,Integer year,Integer month){
        return Response.success(tpmHotWordDataService.getHotWord(year,month,productType));
    }
}
