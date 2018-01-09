package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdWaiDiJiaoYiDao;
import com.bbdservice.sichuan.dao.SbdWaiDiShuaKaDao;
import com.bbdservice.sichuan.entity.ForeignTouristConsumeTimesAnalyse;
import com.bbdservice.sichuan.service.SbdWaiDiJiaoYiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdWaiDiJiaoYiServiceImpl implements SbdWaiDiJiaoYiService {
    @Autowired
    private SbdWaiDiJiaoYiDao sbdWaiDiJiaoYiDao;
    @Override
    public List<ForeignTouristConsumeTimesAnalyse> getAllList(int year, int month) {
        return sbdWaiDiJiaoYiDao.getAllList(year,month);
    }
}
