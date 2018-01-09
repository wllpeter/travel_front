package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.ComeTouristAreaRank;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 */
public interface SbdComeTouristAreaRankService {
    List<ComeTouristAreaRank> getAllList(int year,int quarter,String type);
}
