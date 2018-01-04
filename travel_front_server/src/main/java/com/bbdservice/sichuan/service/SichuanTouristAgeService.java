package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SichuanTouristAge;

import java.util.List;

public interface SichuanTouristAgeService {
    /**
     * 获取本季度的年龄数据
     * @return
     */
    List<SichuanTouristAge> getSichuanTouristAgeByQuarter(Integer year, Integer quarter);
}
