package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.DevTravelCreateNew;
import com.bbdservice.sichuan.entity.DevTravelEonomiesScale;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/22.
 */
public interface DevEconomicService {
    List<DevTravelEonomiesScale> getCreateNewProvince();

    List<DevTravelEonomiesScale> getCreateNewQu();
}
