package com.bbdservice.sichuan.service;

import com.bbdservice.sichuan.entity.SearchPersonResource;
import io.swagger.models.auth.In;

import java.util.List;

public interface SearchPersonResourceService {
    List<SearchPersonResource> getMonthData(Integer year, Integer month);
}
