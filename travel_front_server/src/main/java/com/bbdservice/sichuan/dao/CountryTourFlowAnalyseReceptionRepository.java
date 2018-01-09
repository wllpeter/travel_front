package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.CountryTourAgeTrip;
import com.bbdservice.sichuan.entity.CountryTourFlowAnalyseReception;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountryTourFlowAnalyseReceptionRepository extends JpaRepository<CountryTourFlowAnalyseReception, Long>{
    @Query("select c from CountryTourFlowAnalyseReception c where year =?1 and modify_id is null and deleted = 0")
    List<CountryTourFlowAnalyseReception> getQuarterData(Integer year);
}
