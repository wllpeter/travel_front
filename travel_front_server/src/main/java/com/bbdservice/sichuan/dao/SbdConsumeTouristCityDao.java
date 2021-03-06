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
    @Query(nativeQuery = true,value = "select * from sbd_come_consume_tourist_city_rank c where c.deleted=0 and c.year=?1 and c.quarter=?2 and c.modify_id is null order by c.rank limit 0,5")
    List<ComeConsumeTouristCityRank> getAllList(int year,int quarter);
}
