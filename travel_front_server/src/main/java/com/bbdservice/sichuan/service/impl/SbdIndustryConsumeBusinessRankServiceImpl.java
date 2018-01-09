package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SbdIndustryConsumeBusinessDao;
import com.bbdservice.sichuan.entity.IndustryConsumeBusinessRank;
import com.bbdservice.sichuan.service.SbdIndustryConsumeBusinessRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
@Service
public class SbdIndustryConsumeBusinessRankServiceImpl implements SbdIndustryConsumeBusinessRankService {
    @Autowired
    private SbdIndustryConsumeBusinessDao sbdIndustryConsumeBusinessDao;
    @Override
    public List<IndustryConsumeBusinessRank> getAllList(int year, int quarter, String industry) {
        return sbdIndustryConsumeBusinessDao.getAllList(year,quarter,industry);
    }
}
