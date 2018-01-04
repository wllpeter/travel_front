package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SichuanFlowAnalyse;

import java.util.List;

public interface SichuanFlowAnalyseSerivce {
    List<SichuanFlowAnalyse> getByYear(Integer year);
}
