package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SearchPersonAge;

import java.util.List;

public interface SearchPersonAgeService {
     List<SearchPersonAge> getMonthData(Integer year, Integer month);
}
