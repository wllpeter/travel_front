package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.MarketChange;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketChangeService {
    List<MarketChange> getChange(String date);
}
