package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevEconomicDao;
import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.entity.DevTravelEonomiesScale;
import com.bbdservice.sichuan.service.DevEconomicService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevEconomicServiceImpl implements DevEconomicService {
    @Autowired
    private DevEconomicDao devEconomicDao;
    @Override
    public List<DevTravelEonomiesScale> getCreateNewProvince() {
        return devEconomicDao.getCreateNewProvince();
    }

    @Override
    public List<DevTravelEonomiesScale> getCreateNewQu() {
        return devEconomicDao.getCreateNewQu();
    }
}
