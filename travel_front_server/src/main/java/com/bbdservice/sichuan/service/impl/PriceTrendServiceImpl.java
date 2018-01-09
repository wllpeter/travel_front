package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmPriceTrendDao;
import com.bbdservice.sichuan.entity.PriceTrend;
import com.bbdservice.sichuan.service.PriceTrendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
@Service
public class PriceTrendServiceImpl implements PriceTrendService {
    @Autowired
    private TpmPriceTrendDao priceTrendDao;
    @Override
    public List<PriceTrend> getAllList(Integer productType,int[] years) {
        return priceTrendDao.getAllList(productType,years);
    }
}
