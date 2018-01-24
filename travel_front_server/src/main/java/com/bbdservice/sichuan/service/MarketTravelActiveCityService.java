package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.MarketHangYeActiveCity;

import java.util.Map;

/**
 * Created by 陈亚兰 on 2018/1/24.
 */
public interface MarketTravelActiveCityService {
    Map getCityAndFiveArea(String area,String date);
    MarketHangYeActiveCity getOneCity(String area,String date);
}
