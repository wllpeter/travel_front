package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdProvinceTravelConsumeDao;
import com.bbdservice.sichuan.entity.ProvinceTravelConsume;
import com.bbdservice.sichuan.service.SbdProvinceTravelConsumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdProvinceTravelConsumeServiceImpl implements SbdProvinceTravelConsumeService {
    @Autowired
    private SbdProvinceTravelConsumeDao sbdProvinceTravelConsumeDao;
    @Override
    public List<String> getAllList() {
        return sbdProvinceTravelConsumeDao.getAllList();
    }

    @Override
    public String getLast(Integer year, Integer month) {
        return sbdProvinceTravelConsumeDao.getLast(year,month);
    }
}
