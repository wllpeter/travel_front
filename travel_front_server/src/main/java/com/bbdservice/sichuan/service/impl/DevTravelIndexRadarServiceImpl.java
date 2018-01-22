package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevIndexRadarDao;
import com.bbdservice.sichuan.entity.DevTravelIndexRadar;
import com.bbdservice.sichuan.service.DevTravelIndexRadarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevTravelIndexRadarServiceImpl implements DevTravelIndexRadarService {
    @Autowired
    private DevIndexRadarDao dev;
    @Override
    public List<DevTravelIndexRadar> getIndexRadar(String date) {
        return dev.getIndexRadar(date);
    }
}
