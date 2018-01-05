package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.EconomicZonePersonTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EconomicZonePersonTimeRepository extends JpaRepository<EconomicZonePersonTime,Long>{
    @Query("select e from EconomicZonePersonTime e where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<EconomicZonePersonTime> getQuarterData(Integer year, Integer quarter);
}
