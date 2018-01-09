package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchPersonResourceRepository;
import com.bbdservice.sichuan.entity.SearchHotWord;
import com.bbdservice.sichuan.entity.SearchPersonResource;
import com.bbdservice.sichuan.service.SearchPersonResourceService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class SearchPersonResourceServiceImpl implements SearchPersonResourceService{
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    private final String PERSON_RESOURCE = "38";
    @Autowired
    private SearchPersonResourceRepository searchPersonResourceRepository;
    @Override
    public List<SearchPersonResource> getMonthData(Integer year, Integer month) {
        List<SearchPersonResource> ret = this.searchPersonResourceRepository.getMonthData(year,month);
        if(null != ret && ret.size() > 0){
            return ret;
        }
        String secretKey = null;
        String ts = System.currentTimeMillis()+"";
        try {
            secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, PERSON_RESOURCE,ts);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String st = DateUtils.getFirstDayOfMonth(year,month)+"";
        String et = DateUtils.getLastDayOfMonth(year,month)+"";
        String dataUrl = url
                .concat("?ak=")
                .concat(accessKey)
                .concat("&sk=")
                .concat(secretKey)
                .concat("&ts=")
                .concat(ts)
                .concat("&aid=")
                .concat(PERSON_RESOURCE)
                .concat("&itemId=")
                .concat("32")
                .concat("&st=")
                .concat(st)
                .concat("&et=")
                .concat(et);
        String result = HttpRequestUtils.sendGet(dataUrl);
        Map<String,Object> map = JSON.parseObject(result, Map.class);
        Map<String,Object> datas = JSON.parseObject(map.get("data").toString(),Map.class);
        List<String> strings = JSON.parseArray(datas.get("items").toString(),String.class);
        ret = new ArrayList<>();
        for(String str : strings){
            SearchPersonResource srp = new SearchPersonResource();
            Map<String,Object> params = JSON.parseObject(str,Map.class) ;
            srp.setResourcePlace(params.get("name").toString());
            srp.setRatio(params.get("ratio").toString());
            srp.setYear(year);
            srp.setMonth(month);
            ret.add(srp);
        }
        this.searchPersonResourceRepository.save(ret);
        return ret;
    }
}
