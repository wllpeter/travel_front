package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SichuanTouristGenderRatioRepository;
import com.bbdservice.sichuan.entity.SichuanTouristGenderRatio;
import com.bbdservice.sichuan.service.SichuanTouristGenderRatioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SichuanTouristGenderRatioServiceImpl implements SichuanTouristGenderRatioService {
    @Autowired
    private SichuanTouristGenderRatioRepository sichuanTouristGenderRatioRepository;
    @Override
    public List<SichuanTouristGenderRatio> getByYearAndQuarter(Integer year, Integer quarter) {
        return this.sichuanTouristGenderRatioRepository.getByYearAndQuarter(year, quarter);
    }
}
