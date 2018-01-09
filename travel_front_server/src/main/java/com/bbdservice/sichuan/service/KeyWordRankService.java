package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.KeywordRank;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface KeyWordRankService {
    List<KeywordRank> getAllKeyWordRank(Integer productType, Integer year, Integer month);
}
