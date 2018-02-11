package com.bbdservice.sichuan.controller;

import com.bbdservice.sichuan.base.Response;
import com.bbdservice.sichuan.entity.*;
import com.bbdservice.sichuan.entity.enums.ResidenceZoneEnums;
import com.bbdservice.sichuan.entity.enums.EconomicZoneEnums;
import com.bbdservice.sichuan.entity.enums.FlowTypeEnums;
import com.bbdservice.sichuan.entity.enums.TrafficTypeEnums;
import com.bbdservice.sichuan.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.util.*;

/**
 * 客情大数据控制层
 */
@RequestMapping("/customer_data")
@RestController
@Api(description = "客情大数据")
public class CustomerController {
    @Autowired
    private SichuanTouristAgeService sichuanTouristAgeService;
    @Autowired
    private SichuanTouristGenderRatioService sichuanTouristGenderRatioService;
    @Autowired
    private SichuanFlowAnalyseSerivce sichuanFlowAnalyseSerivce;
    @Autowired
    private EconomicZonePersonTimeService economicZonePersonTimeService;
    @Autowired
    private EconomicZoneTouristResidenceTimeService economicZoneTouristResidenceTimeService;
    @Autowired
    private EconomicZoneTouristResourceRankService economicZoneTouristResourceRankService;
    @Autowired
    private EconomicZoneTrafficTypeService economicZoneTrafficTypeService;
    @Autowired
    private CountryTourAgeService countryTourAgeService;
    @Autowired
    private CountryTourPotentialService countryTourPotentialService;
    @Autowired
    private CountryTourResidenceZoneService countryTourResidenceZoneService;
    @Autowired
    private CountryTourPersonTimeTripService countryTourPersonTimeTripService;
    @Autowired
    private CountryTourFlowAnalyseReceptionService countryTourFlowAnalyseReceptionService;
    @ApiOperation(value = "获得四川省游客分析")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
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
                DecimalFormat d = new DecimalFormat("#.00");
                if(StringUtils.isNotEmpty(sfa.getPersonTime().toString())) {
                    String personTime = d.format(Float.valueOf(sfa.getPersonTime()) / 10000);
                    sfa.setPersonTimeView(Float.valueOf(personTime));
                }
                if(StringUtils.isNotEmpty(sfa.getPersonCount().toString())) {
                    String personCount = d.format(Float.valueOf(sfa.getPersonCount()) / 10000);
                    sfa.setPersonCountView(Float.valueOf(personCount));
                }
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
        genderData.put("data",retGenderData);
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

    @GetMapping("/zone_customer_times/{year}/{quarter}")
    @ApiOperation(value = "五大经济区客游人次")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getZoneCustomerTimes(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        if(null == year || null == quarter || year.equals("") || quarter.equals("")){
            return Response.error("传递参数有误");
        }
        List<EconomicZonePersonTime> ret = this.economicZonePersonTimeService.getQuarterData(year, quarter);
        DecimalFormat d = new DecimalFormat("#.00");
        for(EconomicZonePersonTime economicZonePersonTime:ret){
            if(null != economicZonePersonTime.getPersonTime()) {
                String temp = d.format(Float.valueOf(economicZonePersonTime.getPersonTime()) / 10000);
                economicZonePersonTime.setPersonTimeView(Float.valueOf(temp));
            }
        }
        return Response.success(ret);
    }

    @GetMapping("/zone_tourists_residence_time/{year}/{quarter}")
    @ApiOperation(value = "五大经济区游客停留时长")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getZoneTouristsResidenceTime(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        if(null == year || null == quarter || year.equals("") || quarter.equals("")){
            return Response.error("传递参数有误");
        }
        List<EconomicZoneTouristResidenceTime> economicZoneTouristResidenceTimes = this.economicZoneTouristResidenceTimeService.getQuarterData(year, quarter);
        Map<String,Object> zone = new HashMap<>();
        DecimalFormat b = new DecimalFormat("#.00");
        for(ResidenceZoneEnums residenceZoneEnums : ResidenceZoneEnums.values()){
            Map<String,Object> zoneData = new HashMap<>();
            zoneData.put("residence_zone",residenceZoneEnums.getName());
            List<EconomicZoneTouristResidenceTime> zoneDatas = new ArrayList<>();
            for(EconomicZoneTouristResidenceTime economicZoneTouristResidenceTime : economicZoneTouristResidenceTimes){
                if(economicZoneTouristResidenceTime.getResidenceZone().equals(residenceZoneEnums.getName())){
                    if(null != economicZoneTouristResidenceTime.getPersonCount()) {
                        float prensonCountView = Float.valueOf(b.format(Float.valueOf(economicZoneTouristResidenceTime.getPersonCount()) / 10000));
                        economicZoneTouristResidenceTime.setPersonCountView(prensonCountView);
                    }
                    zoneDatas.add(economicZoneTouristResidenceTime);
                    continue;
                }
            }
            zoneData.put("data",zoneDatas);
            zone.put(residenceZoneEnums.name(),zoneData);
        }
        return Response.success(zone);
    }

    @GetMapping("/zone_tourists_resource_rank/{year}/{quarter}")
    @ApiOperation(value = "五大经济区游客来源排名")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getZoneTouristsResourceRank(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        if(null == year || null == quarter || year.equals("") || quarter.equals("")){
            return Response.error("传递参数有误");
        }
        List<EconomicZoneTouristResourceRank> economicZoneTouristResourceRanks = this.economicZoneTouristResourceRankService.getQuarterData(year, quarter);
        Map<String,Object> zone = new HashMap<>();
        DecimalFormat decimalFormat = new DecimalFormat("#.00");
        for(EconomicZoneEnums economicZoneEnums : EconomicZoneEnums.values()){
                Map<String,Object> zoneData = new LinkedHashMap<>();
                zoneData.put("name",economicZoneEnums.getName());
                List<EconomicZoneTouristResourceRank> zoneDatas = new ArrayList<>();
                for(EconomicZoneTouristResourceRank economicZoneTouristResourceRank : economicZoneTouristResourceRanks){
                    if(economicZoneTouristResourceRank.getEconomicZone().equals(economicZoneEnums.getName())){
                        String resourcePersonCount ;
                        try{
                            resourcePersonCount= decimalFormat.format(Float.valueOf(economicZoneTouristResourceRank.getPersonCount())/10000);
                        }catch (Exception e){
                            resourcePersonCount="0.00";
                        }
                        economicZoneTouristResourceRank.setPersonCountView(Float.valueOf(resourcePersonCount));
                        zoneDatas.add(economicZoneTouristResourceRank);
                        continue;
                    }
                }
//                Collections.sort(zoneDatas, new Comparator<EconomicZoneTouristResourceRank>() {
//                    @Override
//                    public int compare(EconomicZoneTouristResourceRank o1, EconomicZoneTouristResourceRank o2) {
//                        return Integer.valueOf(o2.getPersonCount())-Integer.valueOf(o1.getPersonCount());
//                    }
//                });
                if(zoneDatas.size()!=0) {
                    zoneData.put("data", zoneDatas.subList(0, 5));
                }
                zone.put(economicZoneEnums.name(),zoneData);
        }
        return Response.success(zone);
    }
    @GetMapping("/zone_tourists_traffic_type/{year}/{quarter}")
    @ApiOperation(value = "五大经济区游客交通方式")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer")
    })
    public Response getZoneTrafficType(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter){
        if(null == year || null == quarter || year.equals("") || quarter.equals("")){
            return Response.error("传递参数有误");
        }
        List<EconomicZoneTrafficType> economicZoneTrafficTypes = this.economicZoneTrafficTypeService.getQuarterData(year, quarter);
        Map<String,Object> zone = new HashMap<>();
        for(TrafficTypeEnums trafficTypeEnums : TrafficTypeEnums.values()){
            Map<String,Object> zoneData = new HashMap<>();
            zoneData.put("traffic_type",trafficTypeEnums.getName());
            List<EconomicZoneTrafficType> zoneDatas = new ArrayList<>();
            int count = 0;
            for(EconomicZoneTrafficType economicZoneTrafficType : economicZoneTrafficTypes){
                if(economicZoneTrafficType.getTrafficType().equals(trafficTypeEnums.getName())){
                    zoneDatas.add(economicZoneTrafficType);

             count += (economicZoneTrafficType.getPersonTime()==null?0:economicZoneTrafficType.getPersonTime());
                    continue;
                }
            }
            for(EconomicZoneTrafficType economicZoneTrafficType : zoneDatas){
                DecimalFormat d = new DecimalFormat("#.00");
                String ratio = d.format((economicZoneTrafficType.getPersonTime()==null?0:Integer.valueOf(economicZoneTrafficType.getPersonTime()).floatValue())/count);
                economicZoneTrafficType.setPersonTimeRatio(Float.valueOf(ratio));
            }
            zoneData.put("data",zoneDatas);
            zone.put(trafficTypeEnums.name(),zoneData);
        }
        return Response.success(zone);
    }

    @GetMapping("/country_data/{year}/{quarter}/{type}")
    @ApiOperation(value = "乡村游数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "quarter", value = "季度", required = true, paramType = "path", dataType = "Integer"),
            @ApiImplicitParam(name = "type", value = "类型:1-出行，2-接待", required = true, paramType = "path", dataType = "Integer"),
    })
    public Response getCountryData(@PathVariable("year")Integer year, @PathVariable("quarter")Integer quarter,@PathVariable("type")Integer type){
        Map<String,Object> ret = new HashMap<>();
        switch (type){
            case 1:
                List<CountryTourAgeTrip> countryTourAgeTrips = this.countryTourAgeService.getTripData(year,quarter);
                List<CountryTourPotentialTrip> countryTourPotentialTrips = this.countryTourPotentialService.getTripData(year,quarter);
                List<CountryTourResidenceZoneTrip> countryTourResidenceZoneTrips = this.countryTourResidenceZoneService.getTripData(year, quarter);
                List<CountryTourPersonTimeTrip> countryTourPersonTimeTrips = this.countryTourPersonTimeTripService.getQuarterData(year,quarter);
                ret.put("country_tour_age_trips",countryTourAgeTrips);
                ret.put("country_tour_potential_trips",countryTourPotentialTrips);
                ret.put("country_tour_residence_zone_trips",countryTourResidenceZoneTrips);
                ret.put("country_tour_person_Time_Trips",countryTourPersonTimeTrips);
                break;
            case 2:
                List<CountryTourAgeReception> countryTourAgeReceptions = this.countryTourAgeService.getReceptionData(year,quarter);
                List<CountryTourPotentialReception> countryTourPotentialReceptions = this.countryTourPotentialService.getReceptionData(year,quarter);
                List<CountryTourResidenceZoneReception> countryTourResidenceZoneReceptions = this.countryTourResidenceZoneService.getReceptionData(year, quarter);
                List<CountryTourFlowAnalyseReception> countryTourFlowAnalyseReceptions = this.countryTourFlowAnalyseReceptionService.getQuarterData(year);
                Map<String,Object> zone = new HashMap<>();
                for(FlowTypeEnums flowTypeEnums : FlowTypeEnums.values()){
                    Map<String,Object> zoneData = new HashMap<>();
                    zoneData.put("name",flowTypeEnums.getName());
                    List<CountryTourFlowAnalyseReception> zoneDatas = new ArrayList<>();
                    for(CountryTourFlowAnalyseReception countryTourFlowAnalyseReception : countryTourFlowAnalyseReceptions){
                        if(countryTourFlowAnalyseReception.getCustomerType().equals(flowTypeEnums.getName())){
                            zoneDatas.add(countryTourFlowAnalyseReception);
                            continue;
                        }
                    }
                    zoneData.put("data",zoneDatas);
                    zone.put(flowTypeEnums.name(),zoneData);
                }
                ret.put("country_tour_age_reception",countryTourAgeReceptions);
                ret.put("country_tour_potential_reception",countryTourPotentialReceptions);
                ret.put("country_tour_residence_zone_reception",countryTourResidenceZoneReceptions);
                ret.put("country_tour_person_Time_reception",zone);
                break;
            default:return Response.success();
        }
        return Response.success(ret);
    }
}
