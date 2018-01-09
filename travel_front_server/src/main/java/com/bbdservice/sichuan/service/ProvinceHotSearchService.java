package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ProvinceHostSearch;

import java.util.List;

public interface ProvinceHotSearchService {
    List<ProvinceHostSearch> getMonthData(Integer year, Integer month);
}
