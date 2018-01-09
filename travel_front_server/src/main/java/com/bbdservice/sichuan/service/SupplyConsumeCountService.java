package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SupplyConsumeCount;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface SupplyConsumeCountService {
    List<SupplyConsumeCount> getAllList(Integer productType, Integer dataType,Integer year, Integer prevYear);
    List<SupplyConsumeCount> getWithOutDataType(Integer productType, Integer year, Integer prevYear);
}
