package com.bbdservice.sichuan.controller;


import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.service.AboutYearConditionService;
import com.bbdservice.sichuan.utils.DateUtils;
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
@RequestMapping("/aboutYearCondition")
public class AboutYearConditionController {
    @Autowired
    private AboutYearConditionService aboutYearConditionService;

    @ApiOperation(value = "旅游产品监测条件")
    @GetMapping(value = "/getTravelProductMonitor")
    public Response getThird(){
        Map<String,List> map=new HashMap<>();
        List<String> setClassify=aboutYearConditionService.getClassifyData();
        List<String> opinionRank=aboutYearConditionService.getOpinionRank();
        List<String> goodWords=aboutYearConditionService.getGoodWords();
        List<String> key= Arrays.asList("year","monthOrQuarter","type");
        map.put("classify",putKey(key,setClassify));
        map.put("opinion",putKey(key,opinionRank));
        //好评榜
        map.put("goodWords",putKey(key,goodWords));
        return Response.success(map);
    }

    @ApiOperation(value = "消费大数据条件")
    @GetMapping(value = "/getSpendBigData")
    public Response getSpendBigData(){
        Map<String,List> map=new HashMap<>();
        List<String> key= Arrays.asList("year","monthOrQuarter","type");
        List<String> getWaiDiShuaKa=aboutYearConditionService.getWaiDiShuaKa();
        /**
         * 外地游客刷卡金额分析
         */
        map.put("waiDiShuaKa",putKey(key,getWaiDiShuaKa));
        /**
         * 外地游客交易笔数分析
         * @return
         */
        List<String> getWaiDiJiaoYi=aboutYearConditionService.getWaiDiJiaoYi();
        map.put("waiDiJiaoYi",putKey(key,getWaiDiJiaoYi));

        /**
         * 各地市外地游客刷卡消费金额分析
         * @return
         */
        List<String> getGeDiShuaKa=aboutYearConditionService.getGeDiShuaKa();
        map.put("geDiShuaKa",putKey(key,getGeDiShuaKa));

        /**
         * 各地交易笔数分析
         */
        List<String> getGediJiaoYi=aboutYearConditionService.getGediJiaoYi();
        map.put("geDiJiaoYi",putKey(key,getGediJiaoYi));

        /**
         * 高消费游客来源城市排名
         * @return
         */
        List<String> getRuChuanGaoXiaoFei=aboutYearConditionService.getRuChuanGaoXiaoFei();
        map.put("highSpendSourceArea",putKey(key,getRuChuanGaoXiaoFei));

        /**
         * 入川游客来源地排名
         * @return
         */
        List<String> getRuChuanSource=aboutYearConditionService.getRuChuanSource();
        map.put("sourceArea",putKey(key,getRuChuanSource));

        /**
         * 旅游消费分析
         */
        List<String> getLvYouXiaoFei=aboutYearConditionService.getLvYouXiaoFei();
        map.put("travelSpend",putKey(key,getLvYouXiaoFei));

        /**
         * 各行业
         */
        List<String> getGeHangYe=aboutYearConditionService.getGeHangYe();
        map.put("industry",putKey(key,getGeHangYe));
        return Response.success(map);
    }

    @ApiOperation("搜索大数据条件")
    @GetMapping("/getSearchBigData")
    public Response getSearchBigData(){
        Map<String,List> map=new HashMap<>();
        List<JSONObject> monthKey=new ArrayList<>();
        List<JSONObject> quarterKey=new ArrayList<>();
        List<String> key= Arrays.asList("year","monthOrQuarter","type");

        monthKey=getJsonObject(key,12,"月");
        quarterKey=getJsonObject(key,4,"季");

        map.put("month",monthKey);
        map.put("quarter",quarterKey);

        //        List<String> getProvinceHot=aboutYearConditionService.getProvinceHot();
//        map.put("provinceHot",putKey(key,getProvinceHot));
//        //热词云
//        List<String> getHotWords=aboutYearConditionService.getHotWords();
//        map.put("howWords",putKey(key,getHotWords));
//        //搜索人群年龄分布
//        List<String> getPersonAge=aboutYearConditionService.getPersonAge();
//        map.put("personAge",putKey(key,getPersonAge));
//        //搜索人来源地
//        List<String> getPersonResources=aboutYearConditionService.getPersonResources();
//        map.put("personResources",putKey(key,getPersonResources));
//        //搜索景点偏好地
//        List<String> getJingDian=aboutYearConditionService.getJingDian();
//        map.put("popularPlaces",getJingDian);
        return Response.success(map);
    }

    @ApiOperation("客情大数据条件")
    @GetMapping("/getCustBigData")
    public Response getCustomoBigData(){
        Map<String,List> map=new HashMap<>();
        List<String> key= Arrays.asList("year","monthOrQuarter","type");
        //四川省游客性别分布
        List<String> getSiChuanYouKeSex=aboutYearConditionService.getSiChuanYouKeSex();
        map.put("sex",putKey(key,getSiChuanYouKeSex));
        //乡村游客分析-接待
        List<String> getXiangCunYouKeJieDai=aboutYearConditionService.getXiangCunYouKeJieDai();
        map.put("jieDai",putKey(key,getXiangCunYouKeJieDai));
        //乡村游客分析-出行
        List<String> getXiangCunYouChuXing=aboutYearConditionService.getXiangCunYouChuXing();
        map.put("chuXing",putKey(key,getXiangCunYouChuXing));
        //五大经济区客游人次
        List<String> getFiveZonePersonTimes=aboutYearConditionService.getFiveZonePersonTimes();
        map.put("touristTimes",putKey(key,getFiveZonePersonTimes));
        //游客停留时长
        List<String> getTouristStayTime=aboutYearConditionService.getTouristStayTime();
        map.put("stayTime",putKey(key,getTouristStayTime));
        //五大经济区游客来源排名
        List<String> getTouristRank=aboutYearConditionService.getTouristRank();
        map.put("touristRank",putKey(key,getTouristRank));

        //游客交通方式
        List<String> getTrafficType=aboutYearConditionService.getTrafficType();
        map.put("trafficType",putKey(key,getTrafficType));
        return Response.success(map);
    }

    public static List<JSONObject> putKey(List<String> keyList, List<String> valueList){
        List<JSONObject> result=new ArrayList<>();
        for(int i=0;i<valueList.size();i++){
            JSONObject jsonObject=new JSONObject();
            JSONArray valueArray = JSONArray.fromObject(valueList.get(i));
            for(int j=0;j<3;j++){
                jsonObject.put(keyList.get(j),valueArray.get(j));
            }
            result.add(jsonObject);
        }
        return result;
    }

    public List<JSONObject> getJsonObject(List<String> keyList,int num,String type){
        List<JSONObject> result=new ArrayList<>();
        int quarter=-1;
        int month=DateUtils.getSystemMonth()-1;
        if(type.equals("月")){
            for(int i=month;i>0;i--){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put(keyList.get(0),2018);
                jsonObject.put(keyList.get(1),i);
                jsonObject.put(keyList.get(2),type);
                result.add(jsonObject);
            }
        }else{
            switch (month){
                case 1:
                case 2:
                case 3:
                    quarter=1;
                    break;
                case 4:
                case 5:
                case 6:
                    quarter=2;
                    break;
                case 7:
                case 8:
                case 9:
                    quarter=3;
                    break;
                case 10:
                case 11:
                case 12:
                    quarter=4;
                    break;
            }
            for(int j=quarter;j>0;j--){
                JSONObject jsonObject=new JSONObject();
                jsonObject.put(keyList.get(0),2018);
                jsonObject.put(keyList.get(1),j);
                jsonObject.put(keyList.get(2),type);
                result.add(jsonObject);
            }
        }
        for(int  i=num;i>0;i--){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put(keyList.get(0),2017);
            jsonObject.put(keyList.get(1),i);
            jsonObject.put(keyList.get(2),type);
            result.add(jsonObject);
        }


        return result;
    }
}