package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SichuanTouristAgeRepository;
import com.bbdservice.sichuan.entity.SichuanTouristAge;
import com.bbdservice.sichuan.service.SichuanTouristAgeService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SichuanTouristAgeServiceImpl implements SichuanTouristAgeService {
    @Autowired
    private SichuanTouristAgeRepository sichuanFlowAgeRepository;
    @Override
    public List<SichuanTouristAge> getSichuanTouristAgeByQuarter(Integer year, Integer quarter) {
        List<SichuanTouristAge> result = this.sichuanFlowAgeRepository.getSichuanTouristAgeByQuarter(year,quarter);
        return result;
    }
}
