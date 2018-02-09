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
    public List<SupplyConsumeCount> getAllList(Integer productType,Integer dataType) {
        return tpmSupplyConsumeCountDao.getAllList(productType,dataType);
    }

    @Override
    public List<SupplyConsumeCount> getWithOutDataType(Integer productType) {
        return tpmSupplyConsumeCountDao.getWithOutDataType(productType);
    }
}
