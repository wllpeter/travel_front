package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.EconomicZoneTrafficType;

import java.util.List;

public interface EconomicZoneTrafficTypeService {
    List<EconomicZoneTrafficType> getQuarterData(Integer year, Integer quarter);
}
