package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketHangYeActiveRightDao;
import com.bbdservice.sichuan.entity.MarketHangYeActive;
import com.bbdservice.sichuan.service.MarketHangYeActiveRightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class MarketHangYeActiveRightServiceImpl implements MarketHangYeActiveRightService {
    @Autowired
    private MarketHangYeActiveRightDao marketHangYeActiveRightDao;
    @Override
    public MarketHangYeActive getMarketHangYe(String date) {
        return marketHangYeActiveRightDao.getMarketHangYe(date);
    }
}
