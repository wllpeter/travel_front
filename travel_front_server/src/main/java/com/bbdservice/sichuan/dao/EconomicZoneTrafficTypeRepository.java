package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.EconomicZoneTrafficType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EconomicZoneTrafficTypeRepository extends JpaRepository<EconomicZoneTrafficType,Long> {
    @Query("select e from EconomicZoneTrafficType e where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<EconomicZoneTrafficType> getQuarterData(Integer year, Integer quarter);
}
