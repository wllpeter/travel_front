package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.EconomicZoneTrafficTypeRepository;
import com.bbdservice.sichuan.entity.EconomicZoneTrafficType;
import com.bbdservice.sichuan.service.EconomicZoneTrafficTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicZoneTrafficTypeServiceImpl implements EconomicZoneTrafficTypeService{
    @Autowired
    private EconomicZoneTrafficTypeRepository economicZoneTrafficTypeRepository;

    @Override
    public List<EconomicZoneTrafficType> getQuarterData(Integer year, Integer quarter) {
        return economicZoneTrafficTypeRepository.getQuarterData(year, quarter);
    }
}
