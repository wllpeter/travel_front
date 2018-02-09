package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmOpinionRankDao;
import com.bbdservice.sichuan.dao.TpmOverallMeritDao;
import com.bbdservice.sichuan.entity.OverallMerit;
import com.bbdservice.sichuan.service.OverallMeritService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
@Service
public class TpmOverallMeritServiceImpl implements OverallMeritService {
   @Autowired
    private TpmOverallMeritDao overallMeritDao;

//    @Override
//    public List<OverallMerit> getAllList(Integer productType, int[] years) {
//        return overallMeritDao.getAllList(productType,years);
//    }

    @Override
    public List<OverallMerit> getAllList(Integer productType) {
        return overallMeritDao.getAllList(productType);
    }
}
