package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.service.SearchCityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 搜索大数据
 */
@RestController
@RequestMapping("/search_big_data")
public class SearchController {
    @Autowired
    private SearchCityService searchCityService;
    @GetMapping("search_city_list")
    public Response getCityList(){
        return Response.success(searchCityService.getCityList());
    }

    public Response getProvinceHotSearch(){
        return null;
    }
}
