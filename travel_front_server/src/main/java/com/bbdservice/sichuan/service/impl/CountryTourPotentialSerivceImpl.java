package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.CountryTourPotentialReceptionRepository;
import com.bbdservice.sichuan.dao.CountryTourPotentialTripRepository;
import com.bbdservice.sichuan.entity.CountryTourPotentialReception;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;
import com.bbdservice.sichuan.service.CountryTourPotentialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourPotentialSerivceImpl implements CountryTourPotentialService {
    @Autowired
    private CountryTourPotentialTripRepository countryTourPotentialTripRepository;
    @Autowired
    private CountryTourPotentialReceptionRepository countryTourPotentialReceptionRepository;
    @Override
    public List<CountryTourPotentialTrip> getTripData(Integer year, Integer quarter) {
        return this.countryTourPotentialTripRepository.getQuarterData(year,quarter);
    }

    @Override
    public List<CountryTourPotentialReception> getReceptionData(Integer year, Integer quarter) {
        return this.countryTourPotentialReceptionRepository.getQuarterData(year,quarter);
    }
}
