package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.IndustryConsumeBusinessRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 各行业刷卡消费商户排名
 */
public interface SbdIndustryConsumeBusinessDao extends JpaRepository<IndustryConsumeBusinessRank,Long> {
    @Query(nativeQuery = true,value = "select * from sbd_industry_consume_business_rank i where i.deleted=0 and i.year=?1 and i.quarter=?2 and i.industry=?3 and i.modify_id is null order by i.rank limit 0,5")
    List<IndustryConsumeBusinessRank> getAllList(int year,int quarter,String industry);
}
