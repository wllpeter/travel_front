package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.IndustryConsumeBusinessRank;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdIndustryConsumeBusinessRankService {
    List<IndustryConsumeBusinessRank> getAllList(int year, int quarter, String industry);
}
