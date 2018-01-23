package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketTravelActiveQuDao;
import com.bbdservice.sichuan.dao.SysCityDao;
import com.bbdservice.sichuan.entity.CityEntity;
import com.bbdservice.sichuan.entity.MarketHangYeActiveProvince;
import com.bbdservice.sichuan.entity.vo.SysCityVO;
import com.bbdservice.sichuan.service.MarketTravelActiveQuService;
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
    @Autowired
    private SysCityDao sysCityDao;

    @Override
    public Map getSiChuang(String date) {
        MarketHangYeActiveProvince siChuan=marketTravelActiveQuDao.getAreaData(date,"四川");
        List<MarketHangYeActiveProvince> fiveArea=marketTravelActiveQuDao.getFiveArea(date);
        List<SysCityVO> sysCityVOS=new ArrayList<>();
        for(MarketHangYeActiveProvince m:fiveArea){
            SysCityVO sysCityVO=new SysCityVO(m.getArea(),m.getActiveDegree());
            sysCityVOS.add(sysCityVO);
        }
        Map map=new HashMap();
        map.put("sichuan",siChuan);
        map.put("five",sysCityVOS);
        return map;
    }

    @Override
    public Map getEconomic(String date, String area) {
        MarketHangYeActiveProvince economic=marketTravelActiveQuDao.getAreaData(date,area);
        List<String> city=sysCityDao.getCity(area);
        return null;
    }


}
