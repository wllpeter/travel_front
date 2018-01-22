package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevCreateNewDao;
import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.service.DevCreateNewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevCreateNewServiceImpl implements DevCreateNewService {
    @Autowired
    private DevCreateNewDao devCreateNewDao;
    @Override
    public List<DevTravelCreateNew> getCreateNew(String date) {
        return devCreateNewDao.getCreateNew(date);
    }
}
