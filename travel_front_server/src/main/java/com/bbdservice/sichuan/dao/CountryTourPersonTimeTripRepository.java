package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourPersonTimeTrip;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourPersonTimeTripRepository extends JpaRepository<CountryTourPersonTimeTrip,Long>{
    @Query("select c from CountryTourPersonTimeTrip c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourPersonTimeTrip> getQuarterData(Integer year, Integer quarter);
}
