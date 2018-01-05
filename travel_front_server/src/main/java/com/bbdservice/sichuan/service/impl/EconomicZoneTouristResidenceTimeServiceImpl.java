package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.EconomicZoneTouristResidenceTimeRepository;
import com.bbdservice.sichuan.entity.EconomicZoneTouristResidenceTime;
import com.bbdservice.sichuan.service.EconomicZoneTouristResidenceTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicZoneTouristResidenceTimeServiceImpl implements EconomicZoneTouristResidenceTimeService{
    @Autowired
    private EconomicZoneTouristResidenceTimeRepository economicZoneTouristResidenceTimeRepository;
    @Override
    public List<EconomicZoneTouristResidenceTime> getQuarterData(Integer year, Integer quarter) {
        return economicZoneTouristResidenceTimeRepository.getQuarterData(year, quarter);
    }
}
