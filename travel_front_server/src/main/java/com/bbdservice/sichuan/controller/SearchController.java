package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.SearchPersonResource;
import com.bbdservice.sichuan.entity.SearchPreferenceArea;
import com.bbdservice.sichuan.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 搜索大数据
 */
@RestController
@RequestMapping("/search_big_data")
@Api(description = "搜索大数据")
public class SearchController {
    @Autowired
    private SearchCityService searchCityService;
    @Autowired
    private ProvinceHotSearchService provinceHotSearchService;
    @Autowired
    private ProvinceSearchTrendService provinceSearchTrendService;
    @Autowired
    private SearchHotWordService searchHotWordService;
    @Autowired
    private SearchPersonResourceService searchPersonResourceService;
    @Autowired
    private SearchPreferenceAreaService searchPreferenceAreaService;
    @Autowired
    private SearchPersonAgeService searchPersonAgeService;
    @GetMapping("search_city_list")
    public Response getCityList(){
        return Response.success(searchCityService.getCityList());
    }

    @GetMapping("province_hot_search/{year}/{month}")
    @ApiOperation(value = "全省旅游搜索热力图")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "month", value = "月份", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getProvinceHotSearch(@PathVariable("year")Integer year, @PathVariable("month")Integer month){
        return Response.success(provinceHotSearchService.getMonthData(year,month));
    }

    @GetMapping("province_search_trend/{year}")
    @ApiOperation(value = "全省旅游搜索热度趋势图")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getProvinceSearchTrend(@PathVariable("year")Integer year){
        return Response.success(provinceSearchTrendService.getTrendData(year));
    }

    @GetMapping("hot_word/{year}/{quarter}")
    @ApiOperation(value = "搜索关注热词云")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getHotWord(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        return Response.success(searchHotWordService.getQuaterData(year, quarter));
    }

    @GetMapping("search_person_resource/{year}/{month}")
    @ApiOperation(value = "搜索人群来源地")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "month", value = "月份", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getSearchPersonResource(@PathVariable("year")Integer year, @PathVariable("month")Integer month){
        return Response.success(searchPersonResourceService.getMonthData(year, month));
    }

    @GetMapping("search_preference_area/{year}/{month}")
    @ApiOperation(value = "搜索景点偏好地")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "month", value = "月份", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getSearchPreferenceArea(@PathVariable("year")Integer year, @PathVariable("month")Integer month){
        return Response.success(searchPreferenceAreaService.getMonthData(year, month));
    }

    @GetMapping("search_person_age/{year}/{month}")
    @ApiOperation(value = "搜索人群年龄分布")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "month", value = "月份", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getSearchPersonAge(@PathVariable("year")Integer year, @PathVariable("month")Integer month){
        return Response.success(searchPersonAgeService.getMonthData(year, month));
    }
}
