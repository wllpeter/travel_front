package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevLabarInputDao;
import com.bbdservice.sichuan.entity.DevTravelLaborInput;
import com.bbdservice.sichuan.service.DevLaborInputService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevLaborInputServiceImpl implements DevLaborInputService {
    @Autowired
    private DevLabarInputDao devLabarInputDao;
    @Override
    public List<DevTravelLaborInput> getLaborInput(String date) {
        return devLabarInputDao.getLaborInput(date);
    }
}
