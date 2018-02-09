package com.bbdservice.sichuan.controller;


import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.service.*;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.TwoPointUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
@RestController
@RequestMapping("/devTravel")
@Api(description = "旅游发展指数")
public class DevTravelController {
    @Autowired
    private DevTravelIndexRadarService indexRadar;
    @Autowired
    private DevIndexService devIndexService;
    @Autowired
    private DevCreateNewService createNewService;
    @Autowired
    private DevEconomicService economicService;
    @Autowired
    private DevComfortService comfortService;
    @Autowired
    private DevGoodFameService devGoodFameService;
    @Autowired
    private DevLaborInputService devLaborInputService;

    @ApiOperation(value = "指数雷达图")
    @GetMapping(value = "/getIndexRadar")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",defaultValue = "2017",paramType = "query",dataType = "String"),
            @ApiImplicitParam(name="month",value = "月",defaultValue = "01",paramType = "query",dataType = "String")
    })
    public Response getIndexRadar(String year,String month){
        String date=year+"."+month;
      List<DevTravelIndexRadar> radarList=indexRadar.getIndexRadar(date);
      for(DevTravelIndexRadar d:radarList){
          d.setComfort(TwoPointUtils.getTwo(d.getComfort()));
          d.setCreateNew(TwoPointUtils.getTwo(d.getCreateNew()));
          d.setEconomicScale(TwoPointUtils.getTwo(d.getEconomicScale()));
          d.setGoodFame(TwoPointUtils.getTwo(d.getGoodFame()));
          d.setLaborInput(TwoPointUtils.getTwo(d.getLaborInput()));
      }
      return Response.success(radarList);
    }

    @ApiOperation(value = "旅游发展指数")
    @GetMapping(value = "/getIndex")
    public Response getIndex(){
        List<DevTravelIndex> indexList=devIndexService.getDevTravelIndex();
        for(DevTravelIndex d:indexList){
            d.setTravelIndex(TwoPointUtils.getTwo(d.getTravelIndex()));
        }
        return Response.success(indexList);
    }

    @ApiOperation(value = "旅游创新度")
    @GetMapping(value = "/getCreateNew")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",defaultValue = "2017",paramType = "query",dataType = "String"),
            @ApiImplicitParam(name="month",value = "月",defaultValue = "10",paramType = "query",dataType = "String")
    })
    public Response getCreateNew(String year,String month){
        String date=year+"."+month;
        List<DevTravelCreateNew> createNew=createNewService.getCreateNew(date);
        for(DevTravelCreateNew d:createNew){
            d.setCreateNew(TwoPointUtils.getTwo(d.getCreateNew()));
        }
        return Response.success(createNew);
    }

    @ApiOperation(value = "旅游经济规模")
    @GetMapping(value = "/getEconomicScale")
    @ApiImplicitParam(name="type",value = "类型 0 全省 1经济区 ",dataType = "Integer",paramType = "query",defaultValue = "0")
    public Response getEconomicScale(Integer type){
        List<DevTravelEonomiesScale> result=new ArrayList<>();
        if(type==0){
          result=economicService.getCreateNewProvince();
        }else{
          result=economicService.getCreateNewQu();
        }
        for(DevTravelEonomiesScale d:result){
            d.setScale(TwoPointUtils.getTwo(d.getScale()));
        }
        return Response.success(result);
    }

    @ApiOperation(value = "旅游舒适度")
    @GetMapping(value = "/getComfort")
    public Response getComfort(){
        List<DevTravelComfort> result=comfortService.getComfort();
        for(DevTravelComfort d:result){
            d.setComfort(TwoPointUtils.getTwo(d.getComfort()));
        }
        return Response.success(result);
    }

    @ApiOperation(value = "旅游美誉度")
    @GetMapping(value = "/getGoodFame")
    public Response getGoodFame(){
        List<DevTravelGoodFame> result=devGoodFameService.getGoodFame();
        for(DevTravelGoodFame d:result){
            d.setGoodFame(TwoPointUtils.getTwo(d.getGoodFame()));
        }
        return Response.success(result);
    }

    @ApiOperation(value = "旅游劳动投入")
    @GetMapping(value = "/getLaborInput")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",defaultValue = "2017",paramType = "query",dataType = "String"),
            @ApiImplicitParam(name="month",value = "月",defaultValue = "01",paramType = "query",dataType = "String")
    })
    public Response getLaborInput(String year,String month){
        String date=year+"."+month;
        List<DevTravelLaborInput> laborInput=devLaborInputService.getLaborInput(date);
        for(DevTravelLaborInput d:laborInput){
            d.setLaborInput(TwoPointUtils.getTwo(d.getLaborInput()));
            d.setCompare(TwoPointUtils.getFour(d.getCompare()));
        }
        return Response.success(laborInput);
    }

}