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


    @Override
    public Map getSiChuangAndFive(String date) {
        MarketHangYeActiveProvince province=marketTravelActiveQuDao.getOne("四川",date);
        List<MarketHangYeActiveProvince> five=marketTravelActiveQuDao.getFiveArea(date);
        Map map=new HashMap();
        map.put("province",province);
        map.put("economicAreas",five);
        return map;
    }
}
