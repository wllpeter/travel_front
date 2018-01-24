package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketTravelActiveCityDao;
import com.bbdservice.sichuan.dao.MarketTravelActiveQuDao;
import com.bbdservice.sichuan.entity.MarketHangYeActiveCity;
import com.bbdservice.sichuan.entity.MarketHangYeActiveProvince;
import com.bbdservice.sichuan.service.MarketTravelActiveCityService;
import com.bbdservice.sichuan.service.MarketTravelActiveQuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 陈亚兰 on 2018/1/24.
 */
@Service
public class MarketTravelActiveCityServiceImpl implements MarketTravelActiveCityService {
    @Autowired
    private MarketTravelActiveCityDao marketTravelActiveCityDao;
    @Autowired
    private MarketTravelActiveQuDao marketTravelActiveQuDao;
    @Override
    public Map getCityAndFiveArea(String area, String date) {
        MarketHangYeActiveProvince economic=marketTravelActiveQuDao.getOne(area,date);
        List<MarketHangYeActiveCity> city=marketTravelActiveCityDao.getList(area,date);
        Map map=new HashMap();
        map.put("economic",economic);
        map.put("city",city);
        return map;
    }

    @Override
    public MarketHangYeActiveCity getOneCity(String area, String date) {
        return marketTravelActiveCityDao.getOne(area,date);
    }
}
