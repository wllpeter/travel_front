package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.SichuanFlowAnalyse;
import com.bbdservice.sichuan.entity.SichuanTouristAge;
import com.bbdservice.sichuan.entity.SichuanTouristGenderRatio;
import com.bbdservice.sichuan.entity.enums.FlowTypeEnums;
import com.bbdservice.sichuan.service.SichuanFlowAnalyseSerivce;
import com.bbdservice.sichuan.service.SichuanTouristAgeService;
import com.bbdservice.sichuan.service.SichuanTouristGenderRatioService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * 客情大数据控制层
 */
@RequestMapping("/customer_data")
@RestController
public class CustomerController {
    @Autowired
    private SichuanTouristAgeService sichuanTouristAgeService;
    @Autowired
    private SichuanTouristGenderRatioService sichuanTouristGenderRatioService;
    @Autowired
    private SichuanFlowAnalyseSerivce sichuanFlowAnalyseSerivce;
    @ApiOperation(value = "获得四川省游客分析")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "String"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "String")
    })
    @GetMapping(value = "/province_customer_data/{year}/{quarter}")
    public Response getProvinceCustomerData(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        if(null == year || null == quarter || year.equals("") || quarter.equals("")){
            return Response.error("传递参数有误");
        }
        List<SichuanTouristAge> retAgeData = sichuanTouristAgeService.getSichuanTouristAgeByQuarter(year, quarter);
        List<SichuanTouristGenderRatio> retGenderData = sichuanTouristGenderRatioService.getByYearAndQuarter(year,quarter);
        List<SichuanFlowAnalyse> retFlowData = sichuanFlowAnalyseSerivce.getByYear(year);
        Map<String,Object> ret = new HashMap<>();
        Set<String> flowType = new HashSet<>();
        for(SichuanFlowAnalyse sfa : retFlowData){
            flowType.add(sfa.getCustomerType());
            continue;
        }
        List<Map<String,Map<String,Object>>> newFlowData = new ArrayList<>();
        for(String str : flowType){
            Map<String,List<SichuanFlowAnalyse>> temp = new HashMap<>();
            List<SichuanFlowAnalyse> tempList = new ArrayList<>();
            for(SichuanFlowAnalyse sfa : retFlowData){
                if(sfa.getCustomerType().equals(str)){
                    tempList.add(sfa);
                }
            }
            String key = null;
            for(FlowTypeEnums enums : FlowTypeEnums.values()){
                if(str.equals(enums.getName())){
                    key = enums.name();
                }
            }
            Map<String,Map<String,Object>> data = new HashMap<>();
            Map<String,Object> listData = new HashMap<>();
            listData.put("data",tempList);
            listData.put("name",str);
            data.put(key,listData);
            newFlowData.add(data);
        }
        Map<String,Object> genderData = new HashMap<>();
        Map<String,Object> ageData = new HashMap<>();
        genderData.put("legend",new String[]{"男性","女性"});
        genderData.put("data",retAgeData);
        List<String> ageLegend = new ArrayList<>();
        for(SichuanTouristAge sta : retAgeData){
            ageLegend.add(sta.getAgeZone());
            continue;
        }
        ageData.put("legend",ageLegend.toArray());
        ageData.put("data",retAgeData);
        ret.put("age_data",ageData);
        ret.put("gender_data",genderData);
        ret.put("flow_data",newFlowData);
        return Response.success(ret);
    }
}
