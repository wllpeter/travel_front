package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SearchPreferenceArea;

import java.util.List;

public interface SearchPreferenceAreaService {
    List<SearchPreferenceArea> getMonthData(Integer year, Integer month);
}
