package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ProvinceHostSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProvinceHostSearchRepository extends JpaRepository<ProvinceHostSearch, Long>{
    @Query("select p from ProvinceHostSearch p where deleted = 0 and modify_id is null and year =?1 and month =?2")
    List<ProvinceHostSearch> findQuarterData(Integer year, Integer month);
}
