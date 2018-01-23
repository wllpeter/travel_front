package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmHotWordDataDao;
import com.bbdservice.sichuan.entity.TpmProductFeeling;
import com.bbdservice.sichuan.service.TpmHotWordDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
@Service
public class TpmHotWordDataServiceImpl implements TpmHotWordDataService {
    @Autowired
    private TpmHotWordDataDao tpmHotWordDataDao;
    @Override
    public List<TpmProductFeeling> getHotWord(Integer year, Integer month, Integer type) {
        return tpmHotWordDataDao.getHotWord(year,month,type);
    }
}
