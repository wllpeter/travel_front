package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.CountryTourPersonTimeTripRepository;
import com.bbdservice.sichuan.entity.CountryTourPersonTimeTrip;
import com.bbdservice.sichuan.service.CountryTourPersonTimeTripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourPersonTimeTripServiceImpl implements CountryTourPersonTimeTripService{
    @Autowired
    private CountryTourPersonTimeTripRepository countryTourPersonTimeTripRepository;
    @Override
    public List<CountryTourPersonTimeTrip> getQuarterData(Integer year, Integer quarter) {
        return countryTourPersonTimeTripRepository.getQuarterData(year, quarter);
    }
}
