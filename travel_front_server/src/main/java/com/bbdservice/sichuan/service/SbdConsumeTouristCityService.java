package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ComeConsumeTouristCityRank;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdConsumeTouristCityService {
    List<ComeConsumeTouristCityRank> getAllList(int year, int quarter);
}
