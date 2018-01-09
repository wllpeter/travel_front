package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ForeignTouristSwipeAmountAnalyse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 外地游客刷卡消费金额分析
 */
public interface SbdWaiDiShuaKaDao extends JpaRepository<ForeignTouristSwipeAmountAnalyse,Long>{
    @Query(value = "select f from ForeignTouristSwipeAmountAnalyse f where f.year=?1 and f.month=?2 and f.modifyId is null")
    List<ForeignTouristSwipeAmountAnalyse> getAllList(int year,int month);
}
