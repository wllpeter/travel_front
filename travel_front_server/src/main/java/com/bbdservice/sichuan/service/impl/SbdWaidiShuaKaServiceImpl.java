package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdWaiDiShuaKaDao;
import com.bbdservice.sichuan.entity.ForeignTouristSwipeAmountAnalyse;
import com.bbdservice.sichuan.service.SbdWaidiShuaKaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdWaidiShuaKaServiceImpl implements SbdWaidiShuaKaService {
    @Autowired
    private SbdWaiDiShuaKaDao sbdWaiDiShuaKaDao;
    @Override
    public List<ForeignTouristSwipeAmountAnalyse> getAllList(int year, int month) {
        return sbdWaiDiShuaKaDao.getAllList(year,month);
    }
}
