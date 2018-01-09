package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ProvinceSearchTrend;

import java.util.Date;
import java.util.List;

public interface ProvinceSearchTrendService {
    List<ProvinceSearchTrend> getTrendData(Integer year);
}
