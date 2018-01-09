package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.OpinionRank;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface OpinionRankService {
    List<OpinionRank> getWithoutDataType(Integer year, Integer month, Integer productType);
    List<OpinionRank> getAll(Integer year,Integer month,Integer productType,Integer dataType);
}
