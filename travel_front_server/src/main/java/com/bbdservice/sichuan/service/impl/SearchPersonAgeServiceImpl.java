package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchPersonAgeRepository;
import com.bbdservice.sichuan.entity.SearchPersonAge;
import com.bbdservice.sichuan.service.SearchPersonAgeService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SearchPersonAgeServiceImpl implements SearchPersonAgeService {
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    private static final String SEARCH_PERSON_AGE = "13";
    @Autowired
    private SearchPersonAgeRepository searchPersonAgeRepository;
    @Override
    public List<SearchPersonAge> getMonthData(Integer year, Integer month) {
        List<SearchPersonAge> searchPersonAges = this.searchPersonAgeRepository.getMonthData(year, month);
        if(null != searchPersonAges && searchPersonAges.size() > 0){
            return searchPersonAges;
        }
        String secretKey = null;
        String ts = System.currentTimeMillis()+"";
        try {
            secretKey = HttpRequestUtils.createSecretKey(accessKey, apiKey, SEARCH_PERSON_AGE, ts);
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
                .concat(SEARCH_PERSON_AGE)
                .concat("&st=")
                .concat(st)
                .concat("&et=")
                .concat(et)
                .concat("&itemId=")
                .concat("75")
                .concat("&tagType=8")
                .concat("&gran=3");
        String result = HttpRequestUtils.sendGet(dataUrl);
        Map<String,Object> map = JSON.parseObject(result, Map.class);
        Map<String,Object> datas = JSON.parseObject(map.get("data").toString(),Map.class);
        return null;
    }
}
