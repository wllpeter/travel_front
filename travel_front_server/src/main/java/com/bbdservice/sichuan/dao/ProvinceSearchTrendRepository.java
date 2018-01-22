package com.bbdservice.sichuan.dao;

import com.bbdservice.sichuan.entity.ProvinceSearchTrend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProvinceSearchTrendRepository extends JpaRepository<ProvinceSearchTrend,Long>{
    void deleteByYearAndDeletedFalse(Integer year);
    List<ProvinceSearchTrend> findByYearAndDeletedFalse(Integer year);
}
