package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bbdservice.sichuan.dao.ProvinceHostSearchRepository;
import com.bbdservice.sichuan.dao.SearchCityRepository;
import com.bbdservice.sichuan.entity.ProvinceHostSearch;
import com.bbdservice.sichuan.entity.SearchCity;
import com.bbdservice.sichuan.service.ProvinceHotSearchService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProvinceHotSearchServiceImpl implements ProvinceHotSearchService{
    @Autowired
    private ProvinceHostSearchRepository provinceHostSearchRepository;
    @Autowired
    private SearchCityRepository searchCityRepository;
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    private static final String SEARCH_RANK_CITY = "3";
    @Override
    public List<ProvinceHostSearch> getMonthData(Integer year, Integer month) {
        List<ProvinceHostSearch> ret = this.provinceHostSearchRepository.findQuarterData(year,month);
        if(null != ret && ret.size() > 0){
            return ret;
        } else{
            String ts = System.currentTimeMillis()+"";
            String secretKey = null;
            try {
                secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, SEARCH_RANK_CITY,ts);
            } catch (Exception e) {
                e.printStackTrace();
            }
            ret = new ArrayList<>();
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
                    .concat(SEARCH_RANK_CITY)
                    //.concat("32")
                    .concat("&st=")
                    //.concat("1452355200")
                    .concat(st)
                    .concat("&et=")
                    .concat(et)
                    .concat("&districtId=")
                    .concat("32&pageSize=25");
            String data = HttpRequestUtils.sendGet(dataUrl);
            Map<String,Object> jsonObject = JSON.parseObject(data, Map.class);
            Map<String,JSONArray> temp = JSON.parseObject(jsonObject.get("data").toString(),Map.class);
            List<String> list = new ArrayList<>();
            list=JSON.parseArray(temp.get("items").toString(),String.class);
            for(String item :list){
                Map<String,Object> params = JSON.parseObject(item, Map.class);
                String name = params.get("name").toString();
                int searchCount = Integer.valueOf(params.get("searchCount").toString());
                ProvinceHostSearch provinceHostSearch = new ProvinceHostSearch(name,searchCount,year,month);
                ret.add(provinceHostSearch);
            }
        }
        this.provinceHostSearchRepository.save(ret);
        return ret;
    }
}
