package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.CityForeignDealTime;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdGediJiaoYiService {
    List<CityForeignDealTime> getAllList(int year, int month);
}
