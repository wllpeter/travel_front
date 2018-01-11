package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ClassifyData;
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
    @Query(nativeQuery = true,value = "select year,`month` from tpm_classify_data where year is not null and month is not null GROUP by year desc,month desc")
    List<String> getClassifyData();

    /**
     * 好评榜
     * @return
     */
    @Query(nativeQuery = true,value = "select year,month from tpm_opinion_rank where year is not null and month is not null group by year desc, month desc")
    List<String> getOpinionRank();

    @Query(nativeQuery = true,value = "select  year,month from tpm_keyword_rank where year is not null and month is not null GROUP  by year desc, month desc")
    List<String> getGoodWords();

    //消费大数据

    /**
     * 外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_foreign_tourist_swipe_amount_analyse where year is not null and month is not null GROUP  by year desc, month desc")
    List<String> getWaiDiShuaKa();
    /**
     * 外地游客交易笔数分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_foreign_tourist_consume_times_analyse where year is not null and month is not null GROUP  by year desc, month desc")
    List<String> getWaiDiJiaoYi();

    /**
     * 各地市外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_city_foreign_deal_amount where year is not null and month is not null GROUP  by year desc, month desc")
    List<String> getGeDiShuaKa();

    @Query(nativeQuery = true,value = "select  year,month from sbd_city_foreign_deal_time where year is not null and month is not null GROUP  by year desc, month desc")
    List<String> getGediJiaoYi();

    /**
     * 高消费游客来源城市排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_come_consume_tourist_city_rank where year is not null and `quarter` is not null GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanGaoXiaoFei();

    /**
     * 入川游客来源地排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_come_tourist_area_rank where year is not null and `quarter` is not null GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanSource();

    /**
     * 旅游消费分析
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_travel_consume_analyse where year is not null and `quarter` is not null GROUP  by year desc, `quarter` desc")
    List<String> getLvYouXiaoFei();

    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_industry_consume_business_rank where year is not null and `quarter` is not null GROUP  by year desc, `quarter` desc")
    List<String> getGeHangYe();

    /**
     * 客情大数据模块
     * @return
     */
    //四川省游客性别分布
    @Query(nativeQuery = true,value = "select year,`quarter` from cbd_sichuan_tourist_gender_ratio where year is not null and `quarter` is not null GROUP  by year desc , `quarter` desc ")
    List<String> getSiChuanYouKeSex();

    //乡村游客分析-接待
    @Query(nativeQuery = true,value = "select year,`quarter` from cbd_country_tour_flow_analyse_reception where year is not null and `quarter` is not null GROUP  by year desc , `quarter` desc ")
    List<String> getXiangCunYouKeJieDai();

    //乡村游客分析-出行
    @Query(nativeQuery = true,value = "select year ,`quarter` from cbd_country_tour_potential_trip where year is not null and `quarter` is not null GROUP BY year desc, `quarter` desc")
    List<String> getXiangCunYouChuXing();

    //五大经济区客游人次
    @Query(nativeQuery = true,value = "select year ,`quarter` from cbd_economic_zone_person_time where year is not null and `quarter` is not null GROUP BY year desc, `quarter` desc ")
    List<String> getFiveZonePersonTimes();

    //游客停留时长
    @Query(nativeQuery = true,value = "select year ,`quarter` from cbd_economic_zone_tourist_residence_time where year is not null and `quarter` is not null GROUP BY year desc, `quarter` desc")
    List<String> getTouristStayTime();

    //五大经济区游客来源排名
    @Query(nativeQuery = true,value = "select year ,`quarter` from cbd_economic_zone_tourist_resource_rank where year is not null and `quarter` is not null GROUP BY year desc, `quarter` desc ")
    List<String> getTouristRank();

    //游客交通方式
    @Query(nativeQuery = true,value = "select year ,`quarter` from cbd_economic_zone_traffic_type where year is not null and `quarter` is not null GROUP BY year desc, `quarter` desc")
    List<String> getTrafficType();

    /**
     * 搜索大数据模块
     * @return
     */
    //全省旅游搜索热力图
    @Query(nativeQuery = true,value = "select year,`month` from search_province_hot where year is not null and month is not null GROUP  by year desc , month desc ")
    List<String> getProvinceHot();

    //热词云
    @Query(nativeQuery = true,value = "select year,`quarter` from search_hot_word where year is not null and `quarter` is not null GROUP  by year desc , `quarter` desc ")
    List<String> getHotWords();

    //搜索人群年龄分布
    @Query(nativeQuery = true,value = "select year,`month` from search_person_age where year is not null and month is not null GROUP  by year desc , `month` desc ")
    List<String> getPersonAge();

    //搜索人来源地
    @Query(nativeQuery = true,value = "select year,`month` from search_person_resource where year is not null and month is not null GROUP  by year desc , `month` desc ")
    List<String> getPersonResources();

    //搜索景点偏好地
    @Query(nativeQuery = true,value = "select year,`month` from search_preference_area where year is not null and month is not null GROUP  by year desc , `month` desc ")
    List<String> getJingDian();
}
