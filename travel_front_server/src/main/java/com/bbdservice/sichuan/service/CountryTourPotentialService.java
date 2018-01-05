package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CountryTourAgeReception;
import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.CountryTourPotentialReception;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;

import java.util.List;

public interface CountryTourPotentialService {
    /**
     * 获取本季度的消费潜力分布数据
     * @return
     */
    List<CountryTourPotentialTrip> getTripData(Integer year, Integer quarter);
    /**
     * 获取本季度的消费潜力分布数据
     * @return
     */
    List<CountryTourPotentialReception> getReceptionData(Integer year, Integer quarter);
}
