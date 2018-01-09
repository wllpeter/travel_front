package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeReception;
import com.bbdservice.sichuan.entity.CountryTourPotentialReception;
import com.bbdservice.sichuan.entity.CountryTourPotentialTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourPotentialReceptionRepository extends JpaRepository<CountryTourPotentialReception,Long>{
    @Query("select c from CountryTourPotentialReception c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourPotentialReception> getQuarterData(Integer year, Integer quarter);
}
