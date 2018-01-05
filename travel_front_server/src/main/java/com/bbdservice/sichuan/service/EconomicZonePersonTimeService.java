package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.EconomicZonePersonTime;

import java.util.List;

public interface EconomicZonePersonTimeService {
    List<EconomicZonePersonTime> getQuarterData(Integer year, Integer quarter);
}
