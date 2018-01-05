package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.EconomicZoneTouristResourceRank;

import java.util.List;

public interface EconomicZoneTouristResourceRankService {
    List<EconomicZoneTouristResourceRank> getQuarterData(Integer year, Integer quarter);
}
