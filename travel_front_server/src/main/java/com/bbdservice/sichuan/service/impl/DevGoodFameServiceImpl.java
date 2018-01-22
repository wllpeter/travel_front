package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevGoodFameDao;
import com.bbdservice.sichuan.entity.DevTravelGoodFame;
import com.bbdservice.sichuan.service.DevGoodFameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevGoodFameServiceImpl implements DevGoodFameService {
    @Autowired
    private DevGoodFameDao devGoodFameDao;
    @Override
    public List<DevTravelGoodFame> getGoodFame() {
        return devGoodFameDao.getGoodFame();
    }
}
