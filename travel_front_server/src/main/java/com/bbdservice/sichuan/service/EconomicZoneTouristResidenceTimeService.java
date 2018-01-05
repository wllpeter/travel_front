package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.EconomicZoneTouristResidenceTime;

import java.util.List;

public interface EconomicZoneTouristResidenceTimeService {
    List<EconomicZoneTouristResidenceTime> getQuarterData(Integer year, Integer quarter);
}
