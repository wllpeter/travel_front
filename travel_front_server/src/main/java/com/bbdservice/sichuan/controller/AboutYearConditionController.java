package com.bbdservice.sichuan.controller;


import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.service.AboutYearConditionService;
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

    @GetMapping(value = "/travelProductMonitor")
    public Response getThird(){
        Map<String,List> map=new HashMap<>();
        List<String> setClassify=aboutYearConditionService.getClassifyData();
        List<String> opinionRank=aboutYearConditionService.getOpinionRank();
        List<String> goodWords=aboutYearConditionService.getGoodWords();
        List<String> key= Arrays.asList("year","monthOrQuarter");
        map.put("classify",putKey(key,setClassify));
        map.put("opinion",putKey(key,opinionRank));
        map.put("goodWords",putKey(key,goodWords));
        return Response.success(map);
    }

    @GetMapping(value = "/spendBigData")
    public Response getSpendBigData(){
        Map<String,List> map=new HashMap<>();
        List<String> key= Arrays.asList("year","monthOrQuarter");
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
    public static List<JSONObject> putKey(List<String> keyList, List<String> valueList){
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