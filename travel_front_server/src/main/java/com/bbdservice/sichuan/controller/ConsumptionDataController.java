package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.service.*;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;


/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@RestController
@RequestMapping("/consumptionData")
public class ConsumptionDataController {
      @Autowired
      private SbdConsumeTouristCityService sbdConsumeTouristCityService;
      @Autowired
      private SbdComeTouristAreaRankService sbdComeTouristAreaRankService;
      @Autowired
      private SbdIndustryConsumeBusinessRankService sbdIndustryConsumeBusinessRankService;
      @Autowired
      private SbdProvinceTravelConsumeService sbdProvinceTravelConsumeService;
      @Autowired
      private SbdTravelConsumeAnalyseService sbdTravelConsumeAnalyseService;
      @Autowired
      private SbdWaidiShuaKaService sbdWaidiShuaKaService;
      @Autowired
      private SbdGeDiShuaKaService sbdGeDiShuaKaService;
      @Autowired
      private SbdWaiDiJiaoYiService sbdWaiDiJiaoYiService;
      @Autowired
      private SbdGediJiaoYiService sbdGediJiaoYiService;

    @ApiOperation(value = "入川高消费游客来源城市排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "int",defaultValue = "2017"),
            @ApiImplicitParam(name="quarter",value = "季度",paramType = "query",dataType = "int",defaultValue = "1")
    })
      @GetMapping(value = "/getComeConsumeTourist")
      public Response getComeConsumeTourist(int year,int quarter){
         List<ComeConsumeTouristCityRank> list=null;
         list=sbdConsumeTouristCityService.getAllList(year,quarter);
         return Response.success(list);
      }

    @ApiOperation(value = "入川游客来源地排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "int",defaultValue = "2017"),
            @ApiImplicitParam(name="quarter",value = "季度",paramType = "query",dataType = "int",defaultValue = "1"),
            @ApiImplicitParam(name="type",value = "类型 省份或城市",paramType = "query",dataType = "String",defaultValue = "省份")
    })
    @GetMapping(value = "/getComeTouristAreaRank")
    public Response getComeTouristAreaRank(int year,int quarter,String type){
        List<ComeTouristAreaRank> list=null;
        list=sbdComeTouristAreaRankService.getAllList(year,quarter,type);
        return Response.success(list);
    }

    @ApiOperation(value = "各行业刷卡消费商户排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "int",defaultValue = "2017"),
            @ApiImplicitParam(name="quarter",value = "季度",paramType = "query",dataType = "int",defaultValue = "1"),
            @ApiImplicitParam(name="industry",value = "类型  取值【餐饮 酒店 娱乐 零售】",paramType = "query",dataType = "String",defaultValue = "餐饮")
    })
    @GetMapping(value = "/getIndustryConsumeBusiness")
    public Response get(int year,int quarter,String industry){
        List<IndustryConsumeBusinessRank> list=null;
        list=sbdIndustryConsumeBusinessRankService.getAllList(year,quarter,industry);
        return Response.success(list);
    }

    @ApiOperation(value = "全省旅游消费情况",notes = "consumeAmount 交易金额 、 consumeAmountCompare交易金额同比增加 、" +
            "consumeTimes 交易笔数 、 consumeTimesCompare交易笔数同比增加 、swipeTimes刷卡人次 、swipeTimesCompare刷卡人次同比增加 ")
    @GetMapping(value = "/getProvinceTravelConsume")
    public Response getProvinceTravle(){
        List<ProvinceTravelConsume> list=null;
        list=sbdProvinceTravelConsumeService.getAllList();
        return Response.success(list);
    }

    @ApiOperation(value = "旅游消费交易分析")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "int",defaultValue = "2017"),
            @ApiImplicitParam(name="quarter",value = "季度",paramType = "query",dataType = "int",defaultValue = "1"),
            @ApiImplicitParam(name="industry",value = "类型  取值【餐饮 酒店】",paramType = "query",dataType = "String",defaultValue = "餐饮")
    })
    @GetMapping(value = "/getTravelConsumeAnalyse")
    public Response getTravelConsumeAnalyse(int year,int quarter,String industry){
        List<TravelConsumeAnalyse> list=null;
        list=sbdTravelConsumeAnalyseService.getAllList(year,quarter,industry);
        return Response.success(list);
    }

    @ApiOperation(value = "合并UI图上右4个图标功能 刷卡  交易 ",notes = "A(外地游客刷卡消费) B(各地市外地游客刷卡消费) C(外地游客交易笔数分析) D(各地市外地游客交易笔数)")
    @ApiImplicitParams({
            @ApiImplicitParam(name="date",value = "日期 YYYY-MM-dd格式 String类型",paramType = "query",dataType = "String",defaultValue = "2017-01-12"),
            @ApiImplicitParam(name="type",value = "类型 A(外地游客刷卡消费) B(各地市外地游客刷卡消费) C(外地游客交易笔数分析) D(各地市外地游客交易笔数)",paramType = "query",dataType = "String",defaultValue = "A")
    })
    @GetMapping(value = "/getShuaKaAndJiaoYiInfo")
    public Response getWaiDiYoukeShuaKaAnalyse(String date,String type){
        int year=Integer.parseInt(date.substring(0,4));
        int month=Integer.parseInt(date.substring(5,7));

        List<ForeignTouristSwipeAmountAnalyse> listA=null;//外地游客刷卡
        List<CityForeignDealAmount> cityLeft=null;//各地游客刷卡
        List<ForeignTouristConsumeTimesAnalyse> listB=null;//外地游客交易笔数
        List<CityForeignDealTime> cityRight=null;//各地游客交易
        switch (type){
            //  外地刷卡
            case "A":
                listA=sbdWaidiShuaKaService.getAllList(year,month);
                return Response.success(listA);
                //各地刷卡
            case "B":
                cityLeft=sbdGeDiShuaKaService.getAllList(year,month);
                return Response.success(cityLeft);
            case "C":
                listB=sbdWaiDiJiaoYiService.getAllList(year,month);
                return Response.success(listB);
            case "D":
                cityRight=sbdGediJiaoYiService.getAllList(year,month);
                return Response.success(cityRight);
        }
        return Response.success();
    }
}
