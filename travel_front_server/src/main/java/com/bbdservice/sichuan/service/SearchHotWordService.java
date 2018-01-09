package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SearchHotWord;

import java.util.List;

public interface SearchHotWordService{
    List<SearchHotWord> getQuaterData(Integer year, Integer quater);
}
