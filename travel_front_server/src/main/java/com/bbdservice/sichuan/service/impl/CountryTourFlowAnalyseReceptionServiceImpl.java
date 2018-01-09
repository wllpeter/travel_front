package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.CountryTourFlowAnalyseReceptionRepository;
import com.bbdservice.sichuan.entity.CountryTourFlowAnalyseReception;
import com.bbdservice.sichuan.service.CountryTourFlowAnalyseReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryTourFlowAnalyseReceptionServiceImpl implements CountryTourFlowAnalyseReceptionService{
    @Autowired
    private CountryTourFlowAnalyseReceptionRepository countryTourFlowAnalyseReceptionRepository;
    @Override
    public List<CountryTourFlowAnalyseReception> getQuarterData(Integer year) {
        return countryTourFlowAnalyseReceptionRepository.getQuarterData(year);
    }
}
