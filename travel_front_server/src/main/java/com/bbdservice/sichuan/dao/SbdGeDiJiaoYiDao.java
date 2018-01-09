package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CityForeignDealTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sun.awt.SunHints;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 各地市外地游客交易笔数分析
 */
public interface SbdGeDiJiaoYiDao extends JpaRepository<CityForeignDealTime,Long> {
    @Query(value = "select c from CityForeignDealTime c where c.year=?1 and c.month=?2 and c.modifyId is null")
    List<CityForeignDealTime> getAllList(int year, int month);
}
