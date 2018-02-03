package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ClassifyData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.io.ObjectStreamClass;
import java.util.List;
import java.util.Set;

/**
 * Created by 陈亚兰 on 2018/1/11.
 */
public interface AboutYearConditionDao extends JpaRepository<ClassifyData,Long> {
    /**旅游产品分类
     * @return
     */
    @Query(nativeQuery = true,value = "select year,`month`,'月' as type from tpm_classify_data where year is not null and month is not null and deleted = 0 GROUP by year desc,month desc")
    List<String> getClassifyData();

    /**
     * 好评榜
     * @return
     */
    @Query(nativeQuery = true,value = "select year,month,'月' as type from tpm_opinion_rank where year is not null and month is not null and deleted = 0 group by year desc, month desc")
    List<String> getOpinionRank();

    /**
     * 热词榜
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from tpm_keyword_rank where year is not null and month is not null and deleted = 0 GROUP  by year desc, month desc")
    List<String> getGoodWords();

    /**
     * 产品评价热词云
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from tpm_hotword_data where year is not null and month is not null and deleted = 0 GROUP  by year desc, month desc")
    List<String> getProductHotWords();

    //消费大数据

    /**
     * 外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from sbd_foreign_tourist_swipe_amount_analyse where year is not null and month is not null and deleted = 0 GROUP  by year desc, month desc")
    List<String> getWaiDiShuaKa();
    /**
     * 外地游客交易笔数分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from sbd_foreign_tourist_consume_times_analyse where year is not null and month is not null and deleted = 0 GROUP  by year desc, month desc")
    List<String> getWaiDiJiaoYi();

    /**
     * 各地市外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from sbd_city_foreign_deal_amount where year is not null and month is not null and deleted = 0  GROUP  by year desc, month desc")
    List<String> getGeDiShuaKa();

    /**
     * 各地市外地游客交易笔数分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month,'月' as type from sbd_city_foreign_deal_time where year is not null and month is not null and deleted = 0 GROUP  by year desc, month desc")
    List<String> getGediJiaoYi();

    /**
     * 高消费游客来源城市排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` ,'季' as type from sbd_come_consume_tourist_city_rank where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanGaoXiaoFei();

    /**
     * 入川游客来源地排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter`,'季' as type from sbd_come_tourist_area_rank where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanSource();

    /**
     * 旅游消费分析
     */
    @Query(nativeQuery = true,value = "select  year,`quarter`,'季' as type from sbd_travel_consume_analyse where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc, `quarter` desc")
    List<String> getLvYouXiaoFei();

    @Query(nativeQuery = true,value = "select  year,`quarter`,'季' as type from sbd_industry_consume_business_rank where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc, `quarter` desc")
    List<String> getGeHangYe();

    /**
     * 客情大数据模块
     * @return
     */
    //四川省游客性别分布(其实是四川省游客年龄分布+四川省游客性别分布+四川省客流量分析所有数据年季)
    @Query(nativeQuery = true,value = "select DISTINCT * from (select year,`quarter`,'季' as type from cbd_sichuan_tourist_gender_ratio where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc \n" +
            "\n" +
            "            union ALL\n" +
            "            select year,`quarter`,'季' as type from cbd_sichuan_tourist_age where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            " union all \n" +
            "select year,`quarter`,'季' as type from cbd_sichuan_flow_analyse where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            " )b \n" +
            "            group by year desc ,QUARTER desc")
    List<String> getSiChuanYouKeSex();

    //乡村游客分析-接待
    @Query(nativeQuery = true,value = "select DISTINCT * from (select year,`quarter`,'季' as type from cbd_country_tour_flow_analyse_reception where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc \n" +
            "union ALL\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_age_reception where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            "union all\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_residence_zone_reception where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            "union ALL\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_potential_reception where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc) \n" +
            "b\n" +
            "group by year desc,quarter desc ")
    List<String> getXiangCunYouKeJieDai();

    //乡村游客分析-出行
    @Query(nativeQuery = true,value = "select DISTINCT * from (select year,`quarter`,'季' as type from cbd_country_tour_age_trip where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc \n" +
            "union ALL\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_person_time_trip where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            "union all\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_potential_trip where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc\n" +
            "union ALL\n" +
            "select year,`quarter`,'季' as type from cbd_country_tour_residence_zone_trip where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc) \n" +
            "b\n" +
            "group by year desc,quarter desc")
    List<String> getXiangCunYouChuXing();

    //五大经济区客游人次
    @Query(nativeQuery = true,value = "select year ,`quarter`,'季' as type from cbd_economic_zone_person_time where year is not null and `quarter` is not null and deleted = 0 GROUP BY year desc, `quarter` desc ")
    List<String> getFiveZonePersonTimes();

    //游客停留时长
    @Query(nativeQuery = true,value = "select year ,`quarter`,'季' as type from cbd_economic_zone_tourist_residence_time where year is not null and `quarter` is not null and deleted = 0 GROUP BY year desc, `quarter` desc")
    List<String> getTouristStayTime();

    //五大经济区游客来源排名
    @Query(nativeQuery = true,value = "select year ,`quarter`,'季' as type from cbd_economic_zone_tourist_resource_rank where year is not null and `quarter` is not null and deleted = 0 GROUP BY year desc, `quarter` desc ")
    List<String> getTouristRank();

    //游客交通方式
    @Query(nativeQuery = true,value = "select year ,`quarter`,'季' as type from cbd_economic_zone_traffic_type where year is not null and `quarter` is not null and deleted = 0 GROUP BY year desc, `quarter` desc")
    List<String> getTrafficType();

    /**
     * 搜索大数据模块
     * @return
     */
    //全省旅游搜索热力图
    @Query(nativeQuery = true,value = "select year,`month`,'月' as type from search_province_hot where year is not null and month is not null and deleted = 0 GROUP  by year desc , month desc ")
    List<String> getProvinceHot();


    //热词云
    @Query(nativeQuery = true,value = "select year,`quarter`,'季' as type from search_hot_word where year is not null and `quarter` is not null and deleted = 0 GROUP  by year desc , `quarter` desc ")
    List<String> getHotWords();

    //搜索人群年龄分布
    @Query(nativeQuery = true,value = "select year,`month`,'月' as type from search_person_age where year is not null and month is not null and deleted = 0 GROUP  by year desc , `month` desc ")
    List<String> getPersonAge();

    //搜索人来源地
    @Query(nativeQuery = true,value = "select year,`month`,'月' as type from search_person_resource where year is not null and month is not null and deleted = 0 GROUP  by year desc , `month` desc ")
    List<String> getPersonResources();

    //搜索景点偏好地
    @Query(nativeQuery = true,value = "select year,`month`,'月' as type from search_preference_area where year is not null and month is not null and deleted = 0 GROUP  by year desc , `month` desc ")
    List<String> getJingDian();

    /**
     * 旅游发展指数,和以上不一样，数据结构年月(季)在一个date字段里
     */
    //指数雷达图
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as month,'月' as type from dev_travel_index_radar where date is not null and deleted = 0 group by year desc,month desc")
    List<String> getIndexRadar();

    //旅游创新度
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as month,'月' as type from dev_travel_create_new where date is not null and deleted = 0 group by year desc,month desc")
    List<String> getCreateNew();

    //旅游经济规模
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as quarter,'季' as type from dev_travel_economies_scale where date is not null and deleted = 0 group by year desc,quarter desc\n")
    List<String> getEconomicScale();

    //旅游劳动输入
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as month,'月' as type from dev_travel_labor_input where date is not null and deleted = 0 group by year desc,month desc")
    List<String> getLaborInput();

    /**
     *旅游市场监测
     */
    //TODO旅游行业活跃度
    @Query(nativeQuery = true,value = "select distinct * from (select left(date,4) as year,right(date,2) as month ,'月' as type \n" +
            "from market_hang_ye_active union all\n" +
            "select left(date,4) as year,right(date,2) as month ,'月' as type \n" +
            "from market_hang_ye_active_city union ALL\n" +
            "select left(date,4) as year,right(date,2) as month,'月' as type \n" +
            "from market_hang_ye_active_province)b")
    List<String> getActive();

    //省内旅游行业构成
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as month,'月' as type from market_industry_part where date is not null and deleted = 0 group by year desc,month desc")
    List<String> getProvinceIndustryPart();

    //省内活跃度排行榜
    @Query(nativeQuery = true,value = "select left(date,4) as year,right(date,2) as month,'月' as type from market_province_active where date is not null and deleted = 0 group by year desc,month desc")
    List<String> getProvinceActive();

    //省内涉旅企业数量变更
    @Query(nativeQuery = true,value = "select left(date,4)as year,'' as month,'年' as type from market_change where deleted = 0 group by year desc")
    List<String> getProvinceChange();
}
