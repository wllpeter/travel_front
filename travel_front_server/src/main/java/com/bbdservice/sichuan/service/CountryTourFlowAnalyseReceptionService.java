package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CountryTourFlowAnalyseReception;

import java.util.List;

public interface CountryTourFlowAnalyseReceptionService {
    List<CountryTourFlowAnalyseReception> getQuarterData(Integer year);
}
