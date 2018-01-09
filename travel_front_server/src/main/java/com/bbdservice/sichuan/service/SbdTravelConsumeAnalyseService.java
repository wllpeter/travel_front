package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.TravelConsumeAnalyse;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdTravelConsumeAnalyseService {
    List<TravelConsumeAnalyse> getAllList(int year, int quarter, String industry);
}
