package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SearchPersonAge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchPersonAgeRepository extends JpaRepository<SearchPersonAge,Long>{
    @Query("select  s from SearchPersonAge s where s.year =?1 and s.month =?2 and s.deleted=0")
    List<SearchPersonAge> getMonthData(Integer year, Integer month);
}
