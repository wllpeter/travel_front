package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdComeTouristAreaRankDao;
import com.bbdservice.sichuan.entity.ComeTouristAreaRank;
import com.bbdservice.sichuan.service.SbdComeTouristAreaRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdComeTouristAreaRankServiceImpl implements SbdComeTouristAreaRankService {
    @Autowired
    private SbdComeTouristAreaRankDao comeTouristAreaRankDao;
    @Override
    public List<ComeTouristAreaRank> getAllList(int year, int quarter, String type) {
        return comeTouristAreaRankDao.getAllList(year,quarter,type);
    }
}
