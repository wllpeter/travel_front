package com.bbdservice.sichuan.service.impl;

import com.bbdservice.sichuan.dao.SichuanFlowAnalyseRepository;
import com.bbdservice.sichuan.entity.SichuanFlowAnalyse;
import com.bbdservice.sichuan.service.SichuanFlowAnalyseSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SichuanFlowAnalyseSerivceImpl implements SichuanFlowAnalyseSerivce{
    @Autowired
    private SichuanFlowAnalyseRepository sichuanFlowAnalyseRepository;


    @Override
    public List<SichuanFlowAnalyse> getByYear(Integer year) {
        return sichuanFlowAnalyseRepository.getByYear(year);
    }
}
