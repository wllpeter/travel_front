package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourResidenceZoneReception;
import com.bbdservice.sichuan.entity.CountryTourResidenceZoneTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourResidenceZoneReceptionRepository extends JpaRepository<CountryTourResidenceZoneReception,Long>{
    @Query("select c from CountryTourResidenceZoneReception c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourResidenceZoneReception> getQuarterData(Integer year, Integer quarter);
}
