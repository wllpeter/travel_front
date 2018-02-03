package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchPreferenceAreaRepository;
import com.bbdservice.sichuan.entity.SearchPreferenceArea;
import com.bbdservice.sichuan.service.SearchPreferenceAreaService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SearchPreferenceAreaServiceImpl implements SearchPreferenceAreaService {
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    private static final String SEARCH_PREFERENCE_AREA = "4";
    @Autowired
    private SearchPreferenceAreaRepository searchPreferenceAreaRepository;
    @Override
    public List<SearchPreferenceArea> getMonthData(Integer year, Integer month) {
        List<SearchPreferenceArea> ret = this.searchPreferenceAreaRepository.getMonthData(year,month);
        if(null != ret && ret.size() > 0){
            return ret;
        }
        String secretKey = null;
        String ts = System.currentTimeMillis()+"";
        try {
            secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, SEARCH_PREFERENCE_AREA,ts);
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
                .concat(SEARCH_PREFERENCE_AREA)
                .concat("&st=")
                .concat(st)
                .concat("&et=")
                .concat(et)
                .concat("&districtId=")
                .concat("32")
                .concat("&offset=")
                .concat("0")
                .concat("&pageSize=")
                .concat("5");
        String result = HttpRequestUtils.sendGet(dataUrl);
        Map<String,Object> map = JSON.parseObject(result, Map.class);
        Map<String,Object> datas = JSON.parseObject(map.get("data").toString(),Map.class);
        List<String> strings = JSON.parseArray(datas.get("items").toString(),String.class);
        ret = new ArrayList<>();
        for(String str : strings){
            SearchPreferenceArea srp = new SearchPreferenceArea();
            Map<String,Object> params = JSON.parseObject(str,Map.class) ;
            srp.setName(params.get("name").toString());
            srp.setRatio(params.get("ratio").toString());
            srp.setYear(year);
            srp.setMonth(month);
            srp.setDeleted(false);
            srp.setSearchCount(Integer.valueOf(params.get("searchCount").toString()));
            ret.add(srp);
        }
        this.searchPreferenceAreaRepository.save(ret);
        return ret;
    }
}
