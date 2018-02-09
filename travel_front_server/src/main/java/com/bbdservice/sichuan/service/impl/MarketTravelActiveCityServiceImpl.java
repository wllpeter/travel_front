package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketTravelActiveCityDao;
import com.bbdservice.sichuan.dao.MarketTravelActiveQuDao;
import com.bbdservice.sichuan.entity.MarketHangYeActiveCity;
import com.bbdservice.sichuan.entity.MarketHangYeActiveProvince;
import com.bbdservice.sichuan.service.MarketTravelActiveCityService;
import com.bbdservice.sichuan.service.MarketTravelActiveQuService;
import com.bbdservice.sichuan.utils.TwoPointUtils;
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
        economic.setGeneralDegree(TwoPointUtils.getTwo(economic.getGeneralDegree()));
        economic.setLiveDegree(TwoPointUtils.getTwo(economic.getLiveDegree()));
        economic.setGoDegree(TwoPointUtils.getTwo(economic.getGoDegree()));
        economic.setFoodDegree(TwoPointUtils.getTwo(economic.getFoodDegree()));
        economic.setEntertainmentDegree(TwoPointUtils.getTwo(economic.getEntertainmentDegree()));
        economic.setActiveDegree(TwoPointUtils.getTwo(economic.getActiveDegree()));
        economic.setShoppingDegree(TwoPointUtils.getTwo(economic.getShoppingDegree()));
        economic.setSeeDegree(TwoPointUtils.getTwo(economic.getSeeDegree()));
        economic.setOtherDegree(TwoPointUtils.getTwo(economic.getOtherDegree()));
        economic.setExistedCom(TwoPointUtils.getTwo(economic.getExistedCom()));
        map.put("economic",economic);
        for(MarketHangYeActiveCity m:city){
            m.setGeneralDegree(TwoPointUtils.getTwo(m.getGeneralDegree()));
            m.setLiveDegree(TwoPointUtils.getTwo(m.getLiveDegree()));
            m.setGoDegree(TwoPointUtils.getTwo(m.getGoDegree()));
            m.setFoodDegree(TwoPointUtils.getTwo(m.getFoodDegree()));
            m.setEntertainmentDegree(TwoPointUtils.getTwo(m.getEntertainmentDegree()));
            m.setActiveDegree(TwoPointUtils.getTwo(m.getActiveDegree()));
            m.setShoppingDegree(TwoPointUtils.getTwo(m.getShoppingDegree()));
            m.setSeeDegree(TwoPointUtils.getTwo(m.getSeeDegree()));
            m.setOtherDegree(TwoPointUtils.getTwo(m.getOtherDegree()));
            m.setExistedCom(TwoPointUtils.getTwo(m.getExistedCom()));
        }
        map.put("city",city);
        return map;
    }

    @Override
    public MarketHangYeActiveCity getOneCity(String area, String date) {
        return marketTravelActiveCityDao.getOne(area,date);
    }
}
