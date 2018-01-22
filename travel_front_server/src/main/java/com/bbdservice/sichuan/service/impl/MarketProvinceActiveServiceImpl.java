package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketProvinceActiveDao;
import com.bbdservice.sichuan.entity.MarketProvinceActive;
import com.bbdservice.sichuan.service.MarketProvinceActiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class MarketProvinceActiveServiceImpl implements MarketProvinceActiveService {
    @Autowired
    private MarketProvinceActiveDao marketProvinceActiveDao;
    @Override
    public List<MarketProvinceActive> getMarketProvinceActive(String date) {
        return marketProvinceActiveDao.getMarketProvinceActive(date);
    }
}
