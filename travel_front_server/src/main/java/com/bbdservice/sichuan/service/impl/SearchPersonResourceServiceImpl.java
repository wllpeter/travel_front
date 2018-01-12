package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.ProvinceCityRepository;
import com.bbdservice.sichuan.dao.SearchPersonResourceRepository;
import com.bbdservice.sichuan.entity.ProvinceCity;
import com.bbdservice.sichuan.entity.SearchHotWord;
import com.bbdservice.sichuan.entity.SearchPersonResource;
import com.bbdservice.sichuan.service.SearchPersonResourceService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

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
    @Autowired
    private ProvinceCityRepository provinceCityRepository;
    @Override
    public List<SearchPersonResource> getMonthData(Integer year, Integer month) {
        List<SearchPersonResource> ret = this.searchPersonResourceRepository.getMonthData(year,month);
        if(null != ret && ret.size() > 0){
            return ret;
        }

        List<ProvinceCity> provinces = this.provinceCityRepository.getProvinceName();
        List<ProvinceCity> citys = this.provinceCityRepository.getCityName();
        Map<String,String> cityMap = new HashMap<>();
        Map<String,BigDecimal> provinceMap = new HashMap<>();
        String cityName = null;
        String provinceName = null;
        Integer parentId = null;
        Integer provinceId = null;
        //得到城市与省对应关系的map
        for (ProvinceCity city: citys) {
            cityName = city.getName();
            parentId = (int)city.getParentId();
            for (ProvinceCity province:provinces) {
                provinceId = (int)province.getId();
                if(parentId.equals(provinceId)){
                    provinceName = province.getName();
                    cityMap.put(cityName,provinceName);
                }
                continue;
            }
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

        String c_name = null;
        String p_name = null;
        BigDecimal ratio = null;
        //得到省占比的map
        for(SearchPersonResource searchPersonResource:ret ){
            c_name = searchPersonResource.getResourcePlace();
            if(cityMap.containsKey(c_name)){
                p_name = cityMap.get(c_name);
                ratio = new BigDecimal(searchPersonResource.getRatio());
                if(provinceMap.containsKey(p_name)){
                    provinceMap.put(p_name,provinceMap.get(p_name).add(ratio));
                }else{
                    provinceMap.put(p_name,ratio);
                }
            }
            continue;
        }
        List<SearchPersonResource> final_ret = new ArrayList<>();
        for(String pro_name :provinceMap.keySet()){
            SearchPersonResource srp = new SearchPersonResource();
            srp.setResourcePlace(pro_name);
            srp.setRatio(provinceMap.get(pro_name).toString());
            srp.setYear(year);
            srp.setMonth(month);
            final_ret.add(srp);
        }
        this.searchPersonResourceRepository.save(final_ret);
        return final_ret;
    }
}
