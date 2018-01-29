package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ForeignTouristConsumeTimesAnalyse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 外地游客交易笔数分析
 */
public interface SbdWaiDiJiaoYiDao extends JpaRepository<ForeignTouristConsumeTimesAnalyse,Long> {
    @Query(value = "select f from ForeignTouristConsumeTimesAnalyse f where f.deleted=0 and f.year=?1 and f.month=?2 and f.modifyId is null")
    List<ForeignTouristConsumeTimesAnalyse> getAllList(int year, int month);
}
