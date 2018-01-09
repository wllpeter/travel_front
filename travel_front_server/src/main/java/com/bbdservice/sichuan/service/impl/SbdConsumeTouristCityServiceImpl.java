package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdConsumeTouristCityDao;
import com.bbdservice.sichuan.entity.ComeConsumeTouristCityRank;
import com.bbdservice.sichuan.service.SbdConsumeTouristCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdConsumeTouristCityServiceImpl implements SbdConsumeTouristCityService {
    @Autowired
    private SbdConsumeTouristCityDao sbdConsumeTouristCityDao;
    @Override
    public List<ComeConsumeTouristCityRank> getAllList(int year, int quarter) {
        return sbdConsumeTouristCityDao.getAllList(year,quarter);
    }
}
