package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CountryTourPersonTimeTrip;

import java.util.List;

public interface CountryTourPersonTimeTripService {
    List<CountryTourPersonTimeTrip> getQuarterData(Integer year, Integer quarter);
}
