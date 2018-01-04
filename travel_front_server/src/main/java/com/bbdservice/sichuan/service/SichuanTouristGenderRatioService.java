package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SichuanTouristGenderRatio;

import java.util.List;

public interface SichuanTouristGenderRatioService {

    List<SichuanTouristGenderRatio> getByYearAndQuarter(Integer year, Integer quarter);
}
