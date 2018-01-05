package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchCityRepository;
import com.bbdservice.sichuan.entity.SearchCity;
import com.bbdservice.sichuan.service.SearchCityService;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import com.bbdservice.sichuan.utils.UnicodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class SearchCityServiceImpl implements SearchCityService{
    @Autowired
    private SearchCityRepository searchCityRepository;
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;

    @Override
    public List<SearchCity> getCityList() {
        List<SearchCity> searchCities = this.searchCityRepository.findAll();
        String secretKey = null;
        try {
             secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, "1");
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(null == searchCities || searchCities.size() == 0){
            String dataUrl = url
                    .concat("?ak=")
                    .concat(accessKey)
                    .concat("&sk=")
                    .concat(secretKey)
                    .concat("&ts=")
                    .concat(System.currentTimeMillis()+"")
                    .concat("&aid=")
                    .concat("1");
            String ret = HttpRequestUtils.sendGet(dataUrl);
            Map<String,String> map = JSON.parseObject(ret, Map.class);
            String data = map.get("data");
            Map<String,String> provinces = JSON.parseObject(data, Map.class);
            List<SearchCity> searchData = new ArrayList<>();
            for(Map.Entry<String,String> province : provinces.entrySet()){
                String provinceStr = province.getValue();
                Map<String,String> provinceDetail = JSON.parseObject(provinceStr, Map.class);
                SearchCity searchProvince = new SearchCity();
                searchProvince.setId(Integer.valueOf(provinceDetail.get("id")));
                searchProvince.setName(UnicodeUtils.unicode2String(provinceDetail.get("name")));
                Map<String,String> cities = JSON.parseObject(provinceDetail.get("children"), Map.class);
                searchData.add(searchProvince);
                for(Map.Entry<String,String> city : cities.entrySet()){
                    String cityStr = city.getValue();
                    Map<String,String> cityDetail = JSON.parseObject(cityStr, Map.class);
                    SearchCity searchCity = new SearchCity();
                    searchCity.setId(Integer.valueOf(cityDetail.get("id")));
                    searchCity.setName(cityDetail.get("name"));
                    searchCity.setParentId(searchProvince.getId());
                    searchData.add(searchCity);
                }
            }
            this.searchCityRepository.save(searchData);
        }
        return null;
    }
}
