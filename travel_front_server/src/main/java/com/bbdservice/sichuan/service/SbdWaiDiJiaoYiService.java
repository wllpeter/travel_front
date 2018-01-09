package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ForeignTouristConsumeTimesAnalyse;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdWaiDiJiaoYiService {
    List<ForeignTouristConsumeTimesAnalyse> getAllList(int year, int month);
}
