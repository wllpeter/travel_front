package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourPotentialTripRepository extends JpaRepository<CountryTourPotentialTrip,Long>{
    @Query("select c from CountryTourPotentialTrip c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourPotentialTrip> getQuarterData(Integer year, Integer quarter);
}
