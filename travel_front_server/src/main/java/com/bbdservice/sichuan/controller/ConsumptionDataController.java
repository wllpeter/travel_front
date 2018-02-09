package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.service.*;
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


import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@RestController
@RequestMapping("/consumptionData")
@Api(description = "消费大数据")
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
        for(ComeConsumeTouristCityRank c:list){
            c.setPersonCount(TwoPointUtils.getTwo(c.getPersonCount()));
        }
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
        for(ComeTouristAreaRank c:list){
              c.setPersonTimes(TwoPointUtils.getTwo(c.getPersonTimes()));
        }
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
        for(IndustryConsumeBusinessRank i:list){
              i.setAvgSingleConsume(TwoPointUtils.getTwo(i.getAvgSingleConsume()));
         }
        return Response.success(list);
    }

    @ApiOperation(value = "全省旅游消费情况",notes = "consumeAmount 交易金额 、 consumeAmountCompare交易金额同比增加 、" +
            "consumeTimes 交易笔数 、 consumeTimesCompare交易笔数同比增加 、swipeTimes刷卡人次 、swipeTimesCompare刷卡人次同比增加 ")
    @GetMapping(value = "/getProvinceTravelConsume")
    public Response getProvinceTravle(){
        List<String> list=null;
        List<String> key= Arrays.asList("consumeAmount","consumeAmountCompare","consumeTimes","consumeTimesCompare","swipeTimes","swipeTimesCompare","single","year","month");
        list=sbdProvinceTravelConsumeService.getAllList();
        return Response.success(putKey(key,list));
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
        for(TravelConsumeAnalyse t:list){
            t.setSwipeTimes(TwoPointUtils.getTwo(t.getSwipeTimes()));
            t.setConsumeTimes(TwoPointUtils.getTwo(t.getConsumeTimes()));
            t.setConsumeAmount(TwoPointUtils.getTwo(t.getConsumeAmount()));
        }
        return Response.success(list);
    }

    @ApiOperation(value = "合并UI图上右4个图标功能 刷卡  交易 ",notes = "A(外地游客刷卡消费) B(各地市外地游客刷卡消费) C(外地游客交易笔数分析) D(各地市外地游客交易笔数)")
    @ApiImplicitParams({
            @ApiImplicitParam(name="year",value = "年",paramType = "query",dataType = "Integer",defaultValue = "2017"),
            @ApiImplicitParam(name="month",value = "月",paramType = "query",dataType = "Integer",defaultValue = "1"),
            @ApiImplicitParam(name="type",value = "类型 A(外地游客刷卡消费) B(各地市外地游客刷卡消费) C(外地游客交易笔数分析) D(各地市外地游客交易笔数)",paramType = "query",dataType = "String",defaultValue = "A")
    })
    @GetMapping(value = "/getShuaKaAndJiaoYiInfo")
    public Response getWaiDiYoukeShuaKaAnalyse(Integer year,Integer month,String type){
        List<ForeignTouristSwipeAmountAnalyse> listA=null;//外地游客刷卡
        List<CityForeignDealAmount> cityLeft=null;//各地游客刷卡
        List<ForeignTouristConsumeTimesAnalyse> listB=null;//外地游客交易笔数
        List<CityForeignDealTime> cityRight=null;//各地游客交易
        switch (type){
            //  外地刷卡
            case "A":
                listA=sbdWaidiShuaKaService.getAllList(year,month);
                for(ForeignTouristSwipeAmountAnalyse f:listA){
                   f.setSwipeAmount(TwoPointUtils.getTwo(f.getSwipeAmount()));
                }
                return Response.success(listA);
                //各地刷卡
            case "B":
                cityLeft=sbdGeDiShuaKaService.getAllList(year,month);
                for(CityForeignDealAmount c:cityLeft){
                    c.setDealAmount(TwoPointUtils.getTwo(c.getDealAmount()));
                }
                return Response.success(cityLeft);
            case "C":
                listB=sbdWaiDiJiaoYiService.getAllList(year,month);
                for(ForeignTouristConsumeTimesAnalyse f:listB){
                    f.setConsumeTimes(TwoPointUtils.getTwo(f.getConsumeTimes()));
                }
                return Response.success(listB);
            case "D":
                cityRight=sbdGediJiaoYiService.getAllList(year,month);
                for(CityForeignDealTime c:cityRight){
                    c.setDealTime(TwoPointUtils.getTwo(c.getDealTime()));
                }
                return Response.success(cityRight);
        }
        return Response.success();
    }
    public  List<JSONObject> putKey(List<String> keyList, List<String> valueList){
        List<JSONObject> result=new ArrayList<>();
        for(int i=0;i<valueList.size();i++){
            JSONObject jsonObject=new JSONObject();
            JSONArray valueArray = JSONArray.fromObject(valueList.get(i));
            for(int j=0;j<9;j++){
                Object o=valueArray.get(j);
                if(o.equals(null)){
                    jsonObject.put(keyList.get(j),"-");
                    continue;
                }
                String value=valueArray.get(j).toString().replace("%","");
                switch (j){
                    case 0:
                    case 2:
                    case 4:
                        value=TwoPointUtils.getTwo(value);
                        break;
                    case 1:
                    case 3:
                        value=TwoPointUtils.getFour(value);
                        break;
                }
                jsonObject.put(keyList.get(j),value);
            }
            int year=Integer.parseInt(valueArray.getString(7))-1;
            int month=Integer.parseInt(valueArray.getString(8));
            String lastSingle=sbdProvinceTravelConsumeService.getLast(year,month);
            if(lastSingle==null){
                jsonObject.put("singleCompare","-");
            }else{
                String  singleCompare=String.format("%.2f", (valueArray.getDouble(6)-Double.parseDouble(lastSingle))/Double.parseDouble(lastSingle)*100).toString();
                jsonObject.put("singleCompare",singleCompare);
            }
            result.add(jsonObject);
        }
        return result;
    }
}
