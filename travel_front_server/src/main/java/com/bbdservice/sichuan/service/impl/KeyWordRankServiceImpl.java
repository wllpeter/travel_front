package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmKeyWordRankDao;
import com.bbdservice.sichuan.entity.KeywordRank;
import com.bbdservice.sichuan.service.KeyWordRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
@Service
public class KeyWordRankServiceImpl implements KeyWordRankService {
    @Autowired
    private TpmKeyWordRankDao keyWordRankDao;
    @Override
    public List<KeywordRank> getAllKeyWordRank(Integer productType, Integer year, Integer month) {
        return keyWordRankDao.getAllKeyWordRank(productType,year,month);
    }
}
