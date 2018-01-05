package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CountryTourAgeReception;
import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.SichuanTouristAge;

import java.util.List;

public interface CountryTourAgeService {
    /**
     * 获取本季度的出行年龄数据
     * @return
     */
    List<CountryTourAgeTrip> getTripData(Integer year, Integer quarter);
    /**
     * 获取本季度的接待年龄数据
     * @return
     */
    List<CountryTourAgeReception> getReceptionData(Integer year, Integer quarter);
}
