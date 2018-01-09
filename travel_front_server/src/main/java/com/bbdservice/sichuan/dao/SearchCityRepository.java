package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SearchCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchCityRepository extends JpaRepository<SearchCity,Integer>{

    @Query("select s from SearchCity s where parent_id = 32")
    List<SearchCity> findSichuanCityList();
}
