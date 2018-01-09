package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ComeConsumeTouristCityRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by 陈亚兰 on 2018/1/9.
 * 入川高消费游客来源城市排名
 */
public interface SbdConsumeTouristCityDao extends JpaRepository<ComeConsumeTouristCityRank,Long> {
    @Query(value = "select c from ComeConsumeTouristCityRank c where c.year=?1 and c.quarter=?2 and c.modifyId is null order by c.rank")
    List<ComeConsumeTouristCityRank> getAllList(int year,int quarter);
}
