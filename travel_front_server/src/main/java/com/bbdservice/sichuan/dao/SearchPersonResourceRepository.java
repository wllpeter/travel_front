package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SearchPersonResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchPersonResourceRepository extends JpaRepository<SearchPersonResource,Long>{
    @Query("select s from SearchPersonResource s where year =?1 and month =?2")
    List<SearchPersonResource> getMonthData(Integer year, Integer month);
}
