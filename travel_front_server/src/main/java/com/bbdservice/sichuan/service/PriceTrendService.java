package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.PriceTrend;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/8.
 */
public interface PriceTrendService {
    List<PriceTrend> getAllList(Integer productType,int[] years);
}
