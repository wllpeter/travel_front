package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdGeDiShuaKaDao;
import com.bbdservice.sichuan.entity.CityForeignDealAmount;
import com.bbdservice.sichuan.service.SbdGeDiShuaKaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdGeDiShuaKaServiceImpl implements SbdGeDiShuaKaService {
    @Autowired
    private SbdGeDiShuaKaDao sbdGeDiShuaKaDao;
    @Override
    public List<CityForeignDealAmount> getAllList(int year, int month) {
        return sbdGeDiShuaKaDao.getAllList(year,month);
    }
}
