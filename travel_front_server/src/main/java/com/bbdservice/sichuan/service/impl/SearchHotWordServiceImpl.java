package com.bbdservice.sichuan.service.impl;

import com.alibaba.fastjson.JSON;
import com.bbdservice.sichuan.dao.SearchHotWordRepository;
import com.bbdservice.sichuan.entity.SearchHotWord;
import com.bbdservice.sichuan.service.SearchHotWordService;
import com.bbdservice.sichuan.utils.DateUtils;
import com.bbdservice.sichuan.utils.HttpRequestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SearchHotWordServiceImpl implements SearchHotWordService {
    @Value("${search.accessKey}")
    public String accessKey;
    @Value("${search.apiKey}")
    public String apiKey;
    @Value("${search.url}")
    public String url;
    @Autowired
    private SearchHotWordRepository searchHotWordRepository;
    @Override
    public List<SearchHotWord> getQuaterData(Integer year, Integer quater) {
        List<SearchHotWord> result = this.searchHotWordRepository.getQuarterData(year,quater);
        if(null != result && result.size()>0){
            return result;
        }
        String secretKey = null;
        String ts = System.currentTimeMillis()+"";
        try {
            secretKey = HttpRequestUtils.createSecretKey(accessKey,apiKey, "9",ts);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String st = DateUtils.getCurrentQuarterStartTime(year,quater)+"";
        String et = DateUtils.getCurrentQuarterEndTime(year,quater)+"";
        String dataUrl = url
                .concat("?ak=")
                .concat(accessKey)
                .concat("&sk=")
                .concat(secretKey)
                .concat("&ts=")
                .concat(ts)
                .concat("&aid=")
                .concat("9")
                .concat("&itemId=")
                .concat("32")
                .concat("&st=")
                .concat(st)
                .concat("&et=")
                .concat(et);
        String ret = HttpRequestUtils.sendGet(dataUrl);
        Map<String,Object> map = JSON.parseObject(ret, Map.class);
        Map<String,Object> datas = JSON.parseObject(map.get("data").toString(),Map.class);
        List<String> strings = JSON.parseArray(datas.get("items").toString(),String.class);
        List<SearchHotWord> shws = new ArrayList<>();
        for(String str : strings){
            SearchHotWord shw = new SearchHotWord();
            Map<String,Object> params = JSON.parseObject(str,Map.class) ;
            shw.setHotWord(params.get("point").toString());
            shw.setSearchCount(Integer.valueOf(params.get("searchCount").toString()));
            shw.setCreateDate(new Date());
            shw.setDeleted(false);
            shw.setYear(year);
            shw.setQuarter(quater);
            shws.add(shw);
        }
        this.searchHotWordRepository.save(shws);
        return  shws;
    }
}
