package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.entity.CountryTourPotentialReception;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;
import com.bbdservice.sichuan.service.CountryTourPotentialService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourPotentialSerivceImpl implements CountryTourPotentialService {
    @Override
    public List<CountryTourPotentialTrip> getTripData(Integer year, Integer quarter) {

        return null;
    }

    @Override
    public List<CountryTourPotentialReception> getReceptionData(Integer year, Integer quarter) {
        return null;
    }
}
