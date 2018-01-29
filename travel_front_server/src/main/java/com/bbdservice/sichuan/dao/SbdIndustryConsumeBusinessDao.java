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
    @Query(value = "select i from IndustryConsumeBusinessRank i where i.deleted=0 and i.year=?1 and i.quarter=?2 and i.industry=?3 and i.modifyId is null order by i.rank")
    List<IndustryConsumeBusinessRank> getAllList(int year,int quarter,String industry);
}
