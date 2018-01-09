package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmSupplyConsumeCountDao;
import com.bbdservice.sichuan.entity.SupplyConsumeCount;
import com.bbdservice.sichuan.service.SupplyConsumeCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
@Service
public class TpmSupplyConsumeCountServiceImpl implements SupplyConsumeCountService {
    @Autowired
    private TpmSupplyConsumeCountDao tpmSupplyConsumeCountDao;
    @Override
    public List<SupplyConsumeCount> getAllList(Integer productType,Integer dataType, Integer year, Integer prevYear) {
        return tpmSupplyConsumeCountDao.getAllList(productType,dataType,year,prevYear);
    }

    @Override
    public List<SupplyConsumeCount> getWithOutDataType(Integer productType, Integer year, Integer prevYear) {
        return tpmSupplyConsumeCountDao.getWithOutDataType(productType,year,prevYear);
    }
}
