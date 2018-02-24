package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketTravelActiveQuDao;
import com.bbdservice.sichuan.dao.SysCityDao;
import com.bbdservice.sichuan.entity.CityEntity;
import com.bbdservice.sichuan.entity.MarketHangYeActiveProvince;
import com.bbdservice.sichuan.entity.vo.SysCityVO;
import com.bbdservice.sichuan.service.MarketTravelActiveQuService;
import com.bbdservice.sichuan.utils.TwoPointUtils;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
@Service
public class MarketTravelActiveQuServiceImpl implements MarketTravelActiveQuService {
    @Autowired
    private MarketTravelActiveQuDao  marketTravelActiveQuDao;


    @Override
    public Map getSiChuangAndFive(String date) {
        MarketHangYeActiveProvince province=marketTravelActiveQuDao.getOne("四川",date);
        List<MarketHangYeActiveProvince> five=marketTravelActiveQuDao.getFiveArea(date);
        List<MarketHangYeActiveProvince> fiveTwo=new ArrayList<>();
        Map map=new HashMap();
        province.setActiveDegree(TwoPointUtils.getTwo(province.getActiveDegree()));
        province.setEntertainmentDegree(TwoPointUtils.getTwo(province.getEntertainmentDegree()));
        province.setFoodDegree(TwoPointUtils.getTwo(province.getFoodDegree()));
        province.setGeneralDegree(TwoPointUtils.getTwo(province.getGeneralDegree()));
        province.setGoDegree(TwoPointUtils.getTwo(province.getGoDegree()));
        province.setLiveDegree(TwoPointUtils.getTwo(province.getLiveDegree()));
        province.setOtherDegree(TwoPointUtils.getTwo(province.getOtherDegree()));
        province.setSeeDegree(TwoPointUtils.getTwo(province.getSeeDegree()));
        province.setShoppingDegree(TwoPointUtils.getTwo(province.getShoppingDegree()));
        for(MarketHangYeActiveProvince m:five){
            m.setShoppingDegree(TwoPointUtils.getTwo(m.getShoppingDegree()));
            m.setSeeDegree(TwoPointUtils.getTwo(m.getSeeDegree()));
            m.setOtherDegree(TwoPointUtils.getTwo(m.getOtherDegree()));
            m.setGoDegree(TwoPointUtils.getTwo(m.getGoDegree()));
            m.setEntertainmentDegree(TwoPointUtils.getTwo(m.getEntertainmentDegree()));
            m.setActiveDegree(TwoPointUtils.getTwo(m.getActiveDegree()));
            m.setFoodDegree(TwoPointUtils.getTwo(m.getFoodDegree()));
            m.setLiveDegree(TwoPointUtils.getTwo(m.getLiveDegree()));
            m.setGeneralDegree(TwoPointUtils.getTwo(m.getGeneralDegree()));
            fiveTwo.add(m);
        }
        map.put("province",province);
        map.put("economicAreas",fiveTwo);
        return map;
    }
}
