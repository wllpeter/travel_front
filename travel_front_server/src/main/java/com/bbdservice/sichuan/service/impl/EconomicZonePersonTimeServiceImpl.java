package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.EconomicZonePersonTimeRepository;
import com.bbdservice.sichuan.entity.EconomicZonePersonTime;
import com.bbdservice.sichuan.service.EconomicZonePersonTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicZonePersonTimeServiceImpl implements EconomicZonePersonTimeService {
    @Autowired
    private EconomicZonePersonTimeRepository economicZonePersonTimeRepository;
    @Override
    public List<EconomicZonePersonTime> getQuarterData(Integer year, Integer quarter) {
        return this.economicZonePersonTimeRepository.getQuarterData(year, quarter);
    }
}
