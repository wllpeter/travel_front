package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.CountryTourResidenceZoneTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourResidenceZoneTripRepository extends JpaRepository<CountryTourResidenceZoneTrip,Long>{
    @Query("select c from CountryTourResidenceZoneTrip c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourResidenceZoneTrip> getQuarterData(Integer year, Integer quarter);
}
