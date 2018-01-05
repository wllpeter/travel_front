package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeReception;
import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourAgeReceptionRepository extends JpaRepository<CountryTourAgeReception, Long>{
    @Query("select c from CountryTourAgeReception c where year =?1 and quarter =?2 and modify_id is null and deleted = 0")
    List<CountryTourAgeReception> getQuarterData(Integer year, Integer quarter);
}
