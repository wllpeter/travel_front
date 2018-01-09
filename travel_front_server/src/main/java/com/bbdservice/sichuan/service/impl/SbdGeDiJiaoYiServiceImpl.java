package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdGeDiJiaoYiDao;
import com.bbdservice.sichuan.entity.CityForeignDealTime;
import com.bbdservice.sichuan.service.SbdGediJiaoYiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdGeDiJiaoYiServiceImpl implements SbdGediJiaoYiService {
    @Autowired
    private SbdGeDiJiaoYiDao sbdGeDiJiaoYiDao;
    @Override
    public List<CityForeignDealTime> getAllList(int year, int month) {
        return sbdGeDiJiaoYiDao.getAllList(year,month);
    }
}
