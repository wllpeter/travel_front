package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.entity.ProvinceSearchTrend;
import com.bbdservice.sichuan.service.ProvinceSearchTrendService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProvinceSearchTrendServiceImpl implements ProvinceSearchTrendService{
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    private static final String SEARCH_PROVINCE_TREND = "5";
    @Override
    public List<ProvinceSearchTrend> getTrendData(Integer year) {
        Calendar c = Calendar.getInstance();
        c.setTime( new Date());
        String secretKey = null;
        String ts = System.currentTimeMillis()+"";
        try {
            secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, SEARCH_PROVINCE_TREND,ts);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String st = DateUtils.getStartDayOfYear(year)+"";
        String et = null;
        int nowYear = c.get(Calendar.YEAR);
        int nowMonth = c.get(Calendar.MONTH);
        int nowDate = c.get(Calendar.DAY_OF_MONTH);
        if(year.intValue() != nowYear){
          et = DateUtils.getEndDayOfYear(year)+"";
        }
        else{
          et = DateUtils.getThreeDaysAgo()+"";
          if(nowMonth ==1 && nowDate <4){
              return null;
          }
        }
        String dataUrl = url
                .concat("?ak=")
                .concat(accessKey)
                .concat("&sk=")
                .concat(secretKey)
                .concat("&ts=")
                .concat(ts)
                .concat("&aid=")
                .concat(SEARCH_PROVINCE_TREND)
                .concat("&itemId=")
                .concat("32")
                .concat("&st=")
                //.concat("1452355200")
                .concat(st)
                .concat("&et=")
                .concat(et);
        String ret = HttpRequestUtils.sendGet(dataUrl);
        Map<String,Object> map = JSON.parseObject(ret, Map.class);
        String source = map.get("data").toString();
        Map<String,Object> temp = JSON.parseObject(source,Map.class);
        List<String> datas = JSON.parseArray(temp.get("items").toString(), String.class);
        List<ProvinceSearchTrend> provinceSearchTrends = new ArrayList<>();
        for(String dataTemp:datas){
            Map<String,Object> data = JSON.parseObject(dataTemp, Map.class);
            ProvinceSearchTrend p = new ProvinceSearchTrend();
            p.setSearchDate(data.get("time").toString());
            p.setCreateDate(new Date());
            p.setDeleted(false);
            p.setSearchCount(Integer.valueOf(data.get("searchCount").toString()));
            provinceSearchTrends.add(p);
        }
        return provinceSearchTrends;
    }
}
