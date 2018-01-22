package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketProvinceChangeDao;
import com.bbdservice.sichuan.entity.MarketChange;
import com.bbdservice.sichuan.service.MarketChangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class MarketChangeServiceImpl implements MarketChangeService {
    @Autowired
    private MarketProvinceChangeDao marketProvinceChangeDao;

    @Override
    public List<MarketChange> getChange(String date) {
        return marketProvinceChangeDao.getMarketChange(date);
    }
}
