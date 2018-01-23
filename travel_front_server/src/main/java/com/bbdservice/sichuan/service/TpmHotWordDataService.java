package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.TpmProductFeeling;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/23.
 */
public interface TpmHotWordDataService {
    List<TpmProductFeeling> getHotWord(Integer year, Integer month, Integer type);
}
