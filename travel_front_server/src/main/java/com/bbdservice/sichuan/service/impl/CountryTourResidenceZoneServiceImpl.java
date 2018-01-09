package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.CountryTourResidenceZoneReceptionRepository;
import com.bbdservice.sichuan.dao.CountryTourResidenceZoneTripRepository;
import com.bbdservice.sichuan.entity.CountryTourResidenceZoneReception;
import com.bbdservice.sichuan.entity.CountryTourResidenceZoneTrip;
import com.bbdservice.sichuan.service.CountryTourResidenceZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourResidenceZoneServiceImpl implements CountryTourResidenceZoneService{
    @Autowired
    private CountryTourResidenceZoneTripRepository countryTourResidenceZoneTripRepository;
    @Autowired
    private CountryTourResidenceZoneReceptionRepository countryTourResidenceZoneReceptionRepository;
    @Override
    public List<CountryTourResidenceZoneTrip> getTripData(Integer year, Integer quarter) {
        return countryTourResidenceZoneTripRepository.getQuarterData(year, quarter);
    }

    @Override
    public List<CountryTourResidenceZoneReception> getReceptionData(Integer year, Integer quarter) {
        return countryTourResidenceZoneReceptionRepository.getQuarterData(year, quarter);
    }
}
