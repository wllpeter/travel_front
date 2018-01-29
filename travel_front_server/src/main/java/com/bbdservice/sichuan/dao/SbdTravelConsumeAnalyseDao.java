package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.TravelConsumeAnalyse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 旅游消费交易分析
 */
public interface SbdTravelConsumeAnalyseDao extends JpaRepository<TravelConsumeAnalyse,Long> {
    @Query(value = "select t from TravelConsumeAnalyse t where t.deleted=0 and t.year=?1 and t.quarter=?2 and t.industry=?3 and t.modifyId is null")
    List<TravelConsumeAnalyse> getAllList(int year,int quarter,String industry);
}
