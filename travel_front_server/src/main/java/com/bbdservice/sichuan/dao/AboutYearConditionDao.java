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
    @Query(nativeQuery = true,value = "select year,`month` from tpm_classify_data GROUP by year desc,month desc")
    List<String> getClassifyData();

    /**
     * 好评榜
     * @return
     */
    @Query(nativeQuery = true,value = "select year,month from tpm_opinion_rank group by year desc, month desc")
    List<String> getOpinionRank();

    @Query(nativeQuery = true,value = "select  year,month from tpm_keyword_rank GROUP  by year desc, month desc")
    List<String> getGoodWords();

    //消费大数据

    /**
     * 外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_foreign_tourist_swipe_amount_analyse GROUP  by year desc, month desc")
    List<String> getWaiDiShuaKa();
    /**
     * 外地游客交易笔数分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_foreign_tourist_consume_times_analyse GROUP  by year desc, month desc")
    List<String> getWaiDiJiaoYi();

    /**
     * 各地市外地游客刷卡消费金额分析
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,month from sbd_city_foreign_deal_amount GROUP  by year desc, month desc")
    List<String> getGeDiShuaKa();

    @Query(nativeQuery = true,value = "select  year,month from sbd_city_foreign_deal_time GROUP  by year desc, month desc")
    List<String> getGediJiaoYi();

    /**
     * 高消费游客来源城市排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_come_consume_tourist_city_rank GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanGaoXiaoFei();

    /**
     * 入川游客来源地排名
     * @return
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_come_tourist_area_rank GROUP  by year desc, `quarter` desc")
    List<String> getRuChuanSource();

    /**
     * 旅游消费分析
     */
    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_travel_consume_analyse GROUP  by year desc, `quarter` desc")
    List<String> getLvYouXiaoFei();

    @Query(nativeQuery = true,value = "select  year,`quarter` from sbd_industry_consume_business_rank GROUP  by year desc, `quarter` desc")
    List<String> getGeHangYe();
}
