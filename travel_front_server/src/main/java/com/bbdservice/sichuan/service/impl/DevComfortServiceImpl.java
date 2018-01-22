package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevComfortDao;
import com.bbdservice.sichuan.entity.DevTravelComfort;
import com.bbdservice.sichuan.service.DevComfortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevComfortServiceImpl implements DevComfortService {
    @Autowired
    private DevComfortDao comfortDao;
    @Override
    public List<DevTravelComfort> getComfort() {
        return comfortDao.getComfort();
    }
}
