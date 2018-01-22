package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.DevIndexDao;
import com.bbdservice.sichuan.entity.DevTravelIndex;
import com.bbdservice.sichuan.service.DevIndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
@Service
public class DevIndexServiceImpl implements DevIndexService {
    @Autowired
    private DevIndexDao devIndexDao;
    @Override
    public List<DevTravelIndex> getDevTravelIndex() {
        return devIndexDao.getIndex();
    }
}
