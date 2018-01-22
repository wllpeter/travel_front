package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.MarketIndustryPartDao;
import com.bbdservice.sichuan.entity.MarketIndustryPart;
import com.bbdservice.sichuan.service.MarketIndustryPartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class MarketIndustryPartServiceImpl implements MarketIndustryPartService {
    @Autowired
    private MarketIndustryPartDao marketIndustryPartDao;
    @Override
    public MarketIndustryPart getMarketIndustryPart(String date) {
        return marketIndustryPartDao.getMarketIndustryPart(date);
    }
}
