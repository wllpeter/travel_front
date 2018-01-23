package com.bbdservice.sichuan.controller;

import com.alibaba.fastjson.JSONObject;
import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@RequestMapping("/marketTravel")
@RestController
@Api(description = "旅游市场监测")
public class MarketTravelController {
    @Autowired
    private MarketIndustryPartService marketIndustryPartService;
    @Autowired
    private MarketProvinceActiveService marketProvinceActiveService;
    @Autowired
    private MarketHangYeActiveRightService marketHangYeActiveRightService;
    @Autowired
    private MarketChangeService marketChangeService;
    @Autowired
    private MarketTravelActiveQuService marketTravelActiveQuService;


    @GetMapping(value = "/provinceIndustry")
    @ApiOperation(value = "省内旅游行业构成")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",dataType = "String",defaultValue = "2018",paramType = "query"),
            @ApiImplicitParam(name="month",value = "月",dataType = "String",defaultValue = "01",paramType = "query")
    })
    public Response getProvinceIndustry(String year, String month){
        String date=year+"."+month;
        MarketIndustryPart marketIndustryPart=marketIndustryPartService.getMarketIndustryPart(date);
        Map map=new HashMap<>();
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("entertainment","旅游娱乐企业");
        jsonObject.put("food","旅游餐饮企业");
        jsonObject.put("general","旅游综合服务企业");
        jsonObject.put("go","旅游出行企业");
        jsonObject.put("live","旅游住宿企业");
        jsonObject.put("other","旅游其他");
        jsonObject.put("see","旅游游览企业");
        jsonObject.put("shopping","旅游购物企业");
        map.put("describe",jsonObject);
        map.put("industry",marketIndustryPart);
        return Response.success(map);
    }

    @GetMapping(value = "/provinceActive")
    @ApiOperation(value = "省内旅游活跃度")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",dataType = "String",defaultValue = "2018",paramType = "query"),
            @ApiImplicitParam(name="month",value = "月",dataType = "String",defaultValue = "01",paramType = "query")
    })
    public Response getProvinceActive(String year, String month){
        String date=year+"."+month;
        List<MarketProvinceActive> marketIndustryPart=marketProvinceActiveService.getMarketProvinceActive(date);
        return Response.success(marketIndustryPart);
    }

    @GetMapping(value = "/hangYeActive")
    @ApiOperation(value = "行业活跃度指标详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",dataType = "String",defaultValue = "2018",paramType = "query"),
            @ApiImplicitParam(name="month",value = "月",dataType = "String",defaultValue = "01",paramType = "query")
    })
    public Response getHangYeRight(String year, String month){
        String date=year+"."+month;
        MarketHangYeActive marketIndustryPart=marketHangYeActiveRightService.getMarketHangYe(date);
        Map map=new HashMap<>();
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("branchOrganizationNum","分支机构开设数量");
        jsonObject.put("companyChangeBeiAnTypeTimes","企业变更备案类别数");
        jsonObject.put("companyChangeTimes","企业变更次数");
        jsonObject.put("investAmount","投资总额");
        jsonObject.put("investTimes","投资次数");
        jsonObject.put("manageState","经营状态指标");
        jsonObject.put("moveApplyTimes","迁移申请次数");
        jsonObject.put("searchNewsNum","搜索新闻结果数");
        map.put("describe",jsonObject);
        map.put("industry",marketIndustryPart);
        return Response.success(map);
    }

    @GetMapping(value = "/provinceChange")
    @ApiOperation(value = "省内涉旅企业数量变更")
    @ApiImplicitParam(name="year",dataType = "String",defaultValue = "2017",paramType = "query")
    public Response getCompanyChange(String year){
        List<MarketChange> change=marketChangeService.getChange(year);
        return Response.success(change);
    }

    @GetMapping(value = "/getProvinceAndFiveData")
    @ApiOperation(value = "旅游行业活跃度-四川省")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",dataType = "String",defaultValue = "2018",paramType = "query"),
            @ApiImplicitParam(name="month",dataType = "String",defaultValue = "01",paramType = "query")
    })
    public Response getProvinceAndFive(String year,String month){
        String date=year+"."+month;
        Map map=marketTravelActiveQuService.getSiChuang(date);
        return Response.success(map);
    }



    public static List<JSONObject> putKey( List<String> keyList, List<String> valueList){
        List<JSONObject> result=new ArrayList<>();
        for(int i=0;i<valueList.size();i++){
            JSONObject jsonObject=new JSONObject();
            JSONArray valueArray = JSONArray.fromObject(valueList.get(i));
            for(int j=0;j<2;j++){
                jsonObject.put(keyList.get(j),valueArray.get(j));
            }
            result.add(jsonObject);
        }
        return result;
    }
}
