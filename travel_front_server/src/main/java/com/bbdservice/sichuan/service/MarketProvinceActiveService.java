package com.bbdservice.sichuan.service;



import com.bbdservice.sichuan.entity.MarketProvinceActive;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface MarketProvinceActiveService {
    List<MarketProvinceActive> getMarketProvinceActive(String date);
}
