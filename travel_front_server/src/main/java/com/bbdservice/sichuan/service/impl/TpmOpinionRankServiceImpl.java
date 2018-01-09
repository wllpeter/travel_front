package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.TpmOpinionRankDao;
import com.bbdservice.sichuan.entity.OpinionRank;
import com.bbdservice.sichuan.service.OpinionRankService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
@Service
public class TpmOpinionRankServiceImpl implements OpinionRankService {
    @Autowired
    private TpmOpinionRankDao opinionRankDao;

    @Override
    public List<OpinionRank> getWithoutDataType(Integer year, Integer month, Integer productType) {
        return opinionRankDao.getWithOutDataType(year,month,productType);
    }

    @Override
    public List<OpinionRank> getAll(Integer year, Integer month, Integer productType, Integer dataType) {
        return opinionRankDao.getAllOpinion(year,month,productType,dataType);
    }
}
