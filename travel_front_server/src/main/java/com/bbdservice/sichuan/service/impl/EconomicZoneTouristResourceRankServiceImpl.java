package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.EconomicZoneTouristResourceRankRepository;
import com.bbdservice.sichuan.entity.EconomicZoneTouristResourceRank;
import com.bbdservice.sichuan.service.EconomicZoneTouristResourceRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicZoneTouristResourceRankServiceImpl implements EconomicZoneTouristResourceRankService {
    @Autowired
    private EconomicZoneTouristResourceRankRepository economicZoneTouristResourceRankRepository;
    @Override
    public List<EconomicZoneTouristResourceRank> getQuarterData(Integer year, Integer quarter) {
        return economicZoneTouristResourceRankRepository.getQuarterData(year, quarter);
    }
}
