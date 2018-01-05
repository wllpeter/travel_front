package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.EconomicZoneTrafficType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourAgeTripRepository extends JpaRepository<CountryTourAgeTrip, Long>{
    @Query("select c from CountryTourAgeTrip c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourAgeTrip> getQuarterData(Integer year, Integer quarter);
}
