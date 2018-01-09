package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CountryTourResidenceZoneReception;
import com.bbdservice.sichuan.entity.CountryTourResidenceZoneTrip;

import java.util.List;

public interface CountryTourResidenceZoneService {
    List<CountryTourResidenceZoneTrip> getTripData(Integer year, Integer quarter);
    List<CountryTourResidenceZoneReception> getReceptionData(Integer year, Integer quarter);
}
