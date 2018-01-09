package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.CountryTourAgeReceptionRepository;
import com.bbdservice.sichuan.dao.CountryTourAgeTripRepository;
import com.bbdservice.sichuan.entity.CountryTourAgeReception;
import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.service.CountryTourAgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourAgeServiceImpl implements CountryTourAgeService {
    @Autowired
    private CountryTourAgeTripRepository countryTourAgeTripRepository;
    @Autowired
    private CountryTourAgeReceptionRepository countryTourAgeReceptionRepository;
    @Override
    public List<CountryTourAgeTrip> getTripData(Integer year, Integer quarter) {
        return this.countryTourAgeTripRepository.getQuarterData(year,quarter);
    }

    @Override
    public List<CountryTourAgeReception> getReceptionData(Integer year, Integer quarter) {
        return this.countryTourAgeReceptionRepository.getQuarterData(year,quarter);
    }
}
