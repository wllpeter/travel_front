package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdTravelConsumeAnalyseDao;
import com.bbdservice.sichuan.entity.TravelConsumeAnalyse;
import com.bbdservice.sichuan.service.SbdTravelConsumeAnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdTravelConsumeAnalyseServiceImpl implements SbdTravelConsumeAnalyseService {
    @Autowired
    private SbdTravelConsumeAnalyseDao sbdTravelConsumeAnalyseDao;
    @Override
    public List<TravelConsumeAnalyse> getAllList(int year, int quarter, String industry) {
        return sbdTravelConsumeAnalyseDao.getAllList(year,quarter,industry);
    }
}
