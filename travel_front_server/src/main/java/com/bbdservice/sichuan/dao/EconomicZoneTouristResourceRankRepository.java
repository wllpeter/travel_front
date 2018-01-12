package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.EconomicZonePersonTime;
import com.bbdservice.sichuan.entity.EconomicZoneTouristResourceRank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EconomicZoneTouristResourceRankRepository extends JpaRepository<EconomicZoneTouristResourceRank,Long>{
    @Query("select e from EconomicZoneTouristResourceRank e where year =?1 and quarter =?2 and modify_id is null and deleted = 0 order by rank asc")
    List<EconomicZoneTouristResourceRank> getQuarterData(Integer year, Integer quarter);
}
