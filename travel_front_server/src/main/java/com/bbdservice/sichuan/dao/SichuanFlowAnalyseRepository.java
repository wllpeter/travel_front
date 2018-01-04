package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.SichuanFlowAnalyse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SichuanFlowAnalyseRepository extends JpaRepository<SichuanFlowAnalyse, Long>{
    @Query("select d from SichuanFlowAnalyse d where year =?1 and modify_id is null and deleted = 0")
    List<SichuanFlowAnalyse> getByYear(Integer year);
}
