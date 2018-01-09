package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchCityRepository;
import com.bbdservice.sichuan.entity.SearchCity;
import com.bbdservice.sichuan.service.SearchCityService;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        if(null != searchCities && searchCities.size()>0){
            return searchCities;
        }
        else {
            String secretKey = null;
            String ts = System.currentTimeMillis()+"";
            try {
                secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, "1",ts);
            } catch (Exception e) {
                e.printStackTrace();
            }
            String dataUrl = url
                    .concat("?ak=")
                    .concat(accessKey)
                    .concat("&sk=")
                    .concat(secretKey)
                    .concat("&ts=")
                    .concat(ts)
                    .concat("&aid=")
                    .concat("1");
            String ret = HttpRequestUtils.sendGet(dataUrl);
            Map<String,Object> map = JSON.parseObject(ret, Map.class);
            List<Map> data = JSON.parseArray(map.get("data").toString(),Map.class);
            List<SearchCity> searchData = new ArrayList<>();
            for(Map<String,Object> temp:data){
                SearchCity searchProvince = new SearchCity();
                searchProvince.setId(Integer.valueOf(temp.get("id").toString()));
                searchProvince.setName(temp.get("name").toString());
                searchData.add(searchProvince);
                if(null != temp.get("children")){
                    List<Map> cityData = JSON.parseArray(temp.get("children").toString(),Map.class);
                    for(Map<String,Object> cityMap:cityData){
                        SearchCity searchCity = new SearchCity();
                        searchCity.setId(Integer.valueOf(cityMap.get("id").toString()));
                        searchCity.setName(cityMap.get("name").toString());
                        searchCity.setParentId(searchProvince.getId());
                        searchData.add(searchCity);
                    }
                }
            }
            this.searchCityRepository.save(searchData);
            return searchData;
        }
    }
}
